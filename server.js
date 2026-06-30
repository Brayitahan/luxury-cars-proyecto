require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const { fileTypeFromFile } = require("file-type");
const db = require("./db");

const app = express();
const PUERTO = process.env.PORT || 3000;
const ADMIN_CODE = process.env.ADMIN_CODE || "Mono14723";
const JWT_SECRET = process.env.JWT_SECRET || uuidv4();
const JWT_EXPIRA = "24h";
const DIR_SUBIDAS = path.join(__dirname, "img", "inventario");

if (!fs.existsSync(DIR_SUBIDAS)) {
  fs.mkdirSync(DIR_SUBIDAS, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, DIR_SUBIDAS);
  },
  filename: function (_req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, uuidv4() + ext);
  },
});

const tiposPermitidos = ["image/jpeg", "image/png", "image/webp"];

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: function (_req, file, cb) {
    const permitidos = [".jpg", ".jpeg", ".png", ".webp"];
    const ext = path.extname(file.originalname).toLowerCase();
    if (!permitidos.includes(ext)) {
      return cb(new Error("Solo se permiten archivos JPG, PNG y WebP."));
    }
    cb(null, true);
  },
});

app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

const loginLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: { error: "Demasiados intentos. Espera un minuto." },
});

function sanitizar(texto) {
  return texto.replace(/<[^>]*>/g, "").trim();
}

function limpiarArchivos(files) {
  if (!files) return;
  Object.values(files).forEach(function (arr) {
    arr.forEach(function (f) {
      fs.unlink(f.path, function () {});
    });
  });
}

function validarImagen(ruta) {
  return fileTypeFromFile(ruta).then(function (tipo) {
    if (!tipo || !tiposPermitidos.includes(tipo.mime)) {
      fs.unlink(ruta, function () {});
      throw new Error("El archivo " + path.basename(ruta) + " no es una imagen válida.");
    }
    return true;
  });
}

function eliminarArchivo(rutaRelativa) {
  var absoluta = path.join(__dirname, rutaRelativa);
  fs.unlink(absoluta, function () {});
}

/* ---- LOGIN ---- */

app.post("/api/admin/login", loginLimiter, (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: "Código requerido." });
  }

  if (code !== ADMIN_CODE) {
    return res.status(401).json({ error: "Código incorrecto." });
  }

  const token = jwt.sign(
    { rol: "admin", timestamp: Date.now() },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRA }
  );

  res.json({ token });
});

/* ---- COMENTARIOS ---- */

app.get("/api/comentarios", function (_req, res) {
  db.query("SELECT * FROM comentarios ORDER BY fecha DESC").then(function (result) {
    res.json(result.rows);
  }).catch(function (err) {
    res.status(500).json({ error: err.message });
  });
});

app.post("/api/comentarios", function (req, res) {
  const { nombre, comentario, auto } = req.body;

  if (!nombre || !comentario) {
    return res.status(400).json({ error: "El nombre y el comentario son obligatorios." });
  }

  var n = sanitizar(nombre).slice(0, 80);
  var c = sanitizar(comentario).slice(0, 500);
  var a = sanitizar(auto || "").slice(0, 80);

  if (!n || !c) {
    return res.status(400).json({ error: "El nombre y el comentario no pueden estar vacíos." });
  }

  var id = uuidv4();
  var fecha = new Date().toISOString();

  db.query(
    "INSERT INTO comentarios (id, nombre, comentario, auto, fecha) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [id, n, c, a, fecha]
  ).then(function (result) {
    res.status(201).json(result.rows[0]);
  }).catch(function (err) {
    res.status(500).json({ error: err.message });
  });
});

/* ---- INVENTARIO ---- */

app.get("/api/trabajos", function (_req, res) {
  db.query("SELECT * FROM trabajos ORDER BY fecha DESC").then(function (result) {
    res.json(result.rows.map(function (t) {
      t.proceso = t.proceso || [];
      return t;
    }));
  }).catch(function (err) {
    res.status(500).json({ error: err.message });
  });
});

function requiereAdmin(req, res, next) {
  const header = req.headers["authorization"];
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Autenticación requerida." });
  }

  const token = header.split(" ")[1];

  try {
    jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: "Sesión expirada o inválida. Ingresa de nuevo." });
  }
}

app.post("/api/trabajos", requiereAdmin, upload.fields([
  { name: "before", maxCount: 1 },
  { name: "after", maxCount: 1 },
  { name: "proceso", maxCount: 10 },
]), function (req, res) {
  const { titulo, servicio, descripcion } = req.body;

  if (!titulo || !servicio || !descripcion) {
    limpiarArchivos(req.files);
    return res.status(400).json({ error: "El título, servicio y descripción son obligatorios." });
  }

  if (!req.files || !req.files.before || !req.files.after) {
    return res.status(400).json({ error: "Debes subir las imágenes de antes y después." });
  }

  var rutas = [req.files.before[0].path, req.files.after[0].path];
  var proceso = [];

  if (req.files.proceso) {
    req.files.proceso.forEach(function (f) { rutas.push(f.path); });
  }

  Promise.all(rutas.map(validarImagen)).then(function () {
    if (req.files.proceso) {
      req.files.proceso.forEach(function (f) {
        proceso.push("img/inventario/" + f.filename);
      });
    }

    var id = uuidv4();
    var t = sanitizar(titulo).slice(0, 100);
    var s = sanitizar(servicio).slice(0, 60);
    var d = sanitizar(descripcion).slice(0, 300);
    var before = "img/inventario/" + req.files.before[0].filename;
    var after = "img/inventario/" + req.files.after[0].filename;
    var fecha = new Date().toISOString();

    return db.query(
      "INSERT INTO trabajos (id, titulo, servicio, descripcion, before, after, proceso, fecha) VALUES ($1, $2, $3, $4, $5, $6, $7::jsonb, $8) RETURNING *",
      [id, t, s, d, before, after, JSON.stringify(proceso), fecha]
    );
  }).then(function (result) {
    res.status(201).json(result.rows[0]);
  }).catch(function (err) {
    limpiarArchivos(req.files);
    res.status(400).json({ error: err.message });
  });
});

app.put("/api/trabajos/:id", requiereAdmin, upload.fields([
  { name: "before", maxCount: 1 },
  { name: "after", maxCount: 1 },
  { name: "proceso", maxCount: 10 },
]), function (req, res) {
  db.query("SELECT * FROM trabajos WHERE id = $1", [req.params.id]).then(function (result) {
    if (result.rows.length === 0) {
      limpiarArchivos(req.files);
      throw { status: 404, message: "Trabajo no encontrado." };
    }

    var existente = result.rows[0];
    var titulo = req.body.titulo ? sanitizar(req.body.titulo).slice(0, 100) : existente.titulo;
    var servicio = req.body.servicio ? sanitizar(req.body.servicio).slice(0, 60) : existente.servicio;
    var descripcion = req.body.descripcion ? sanitizar(req.body.descripcion).slice(0, 300) : existente.descripcion;
    var before = existente.before;
    var after = existente.after;
    var proceso = existente.proceso || [];

    var promesas = [];

    if (req.files) {
      if (req.files.before) promesas.push(validarImagen(req.files.before[0].path));
      if (req.files.after) promesas.push(validarImagen(req.files.after[0].path));
      if (req.files.proceso) {
        req.files.proceso.forEach(function (f) { promesas.push(validarImagen(f.path)); });
      }
    }

    return Promise.all(promesas).then(function () {
      if (req.files) {
        if (req.files.before) {
          eliminarArchivo(existente.before);
          before = "img/inventario/" + req.files.before[0].filename;
        }
        if (req.files.after) {
          eliminarArchivo(existente.after);
          after = "img/inventario/" + req.files.after[0].filename;
        }
        if (req.files.proceso) {
          (existente.proceso || []).forEach(eliminarArchivo);
          proceso = req.files.proceso.map(function (f) {
            return "img/inventario/" + f.filename;
          });
        }
      }

      return db.query(
        "UPDATE trabajos SET titulo = $1, servicio = $2, descripcion = $3, before = $4, after = $5, proceso = $6::jsonb WHERE id = $7 RETURNING *",
        [titulo, servicio, descripcion, before, after, JSON.stringify(proceso), req.params.id]
      );
    });
  }).then(function (result) {
    res.json(result.rows[0]);
  }).catch(function (err) {
    if (err.status) {
      return res.status(err.status).json({ error: err.message });
    }
    limpiarArchivos(req.files);
    res.status(400).json({ error: err.message });
  });
});

app.delete("/api/trabajos/:id", requiereAdmin, function (req, res) {
  db.query("SELECT * FROM trabajos WHERE id = $1", [req.params.id]).then(function (result) {
    if (result.rows.length === 0) {
      throw { status: 404, message: "Trabajo no encontrado." };
    }

    var trabajo = result.rows[0];
    eliminarArchivo(trabajo.before);
    eliminarArchivo(trabajo.after);
    (trabajo.proceso || []).forEach(eliminarArchivo);

    return db.query("DELETE FROM trabajos WHERE id = $1", [req.params.id]);
  }).then(function () {
    res.json({ mensaje: "Trabajo eliminado." });
  }).catch(function (err) {
    if (err.status) {
      return res.status(err.status).json({ error: err.message });
    }
    res.status(500).json({ error: err.message });
  });
});

db.iniciar().then(function () {
  app.listen(PUERTO, () => {
    console.log("Servidor corriendo en http://localhost:" + PUERTO);
  });
}).catch(function (err) {
  console.error("Error al conectar con la base de datos:", err);
  process.exit(1);
});
