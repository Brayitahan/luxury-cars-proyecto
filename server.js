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

const app = express();
const PUERTO = process.env.PORT || 3000;
const ADMIN_CODE = process.env.ADMIN_CODE || "Mono14723";
const JWT_SECRET = process.env.JWT_SECRET || uuidv4();
const JWT_EXPIRA = "24h";
const DIR_COMENTARIOS = path.join(__dirname, "data", "comentarios.json");
const DIR_TRABAJOS = path.join(__dirname, "data", "trabajos.json");
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

function leerJSON(ruta) {
  try {
    const raw = fs.readFileSync(ruta, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function guardarJSON(ruta, lista) {
  fs.writeFileSync(ruta, JSON.stringify(lista, null, 2), "utf-8");
}

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

app.get("/api/comentarios", (_req, res) => {
  res.json(leerJSON(DIR_COMENTARIOS));
});

app.post("/api/comentarios", (req, res) => {
  const { nombre, comentario, auto } = req.body;

  if (!nombre || !comentario) {
    return res.status(400).json({ error: "El nombre y el comentario son obligatorios." });
  }

  const nuevo = {
    id: uuidv4(),
    nombre: sanitizar(nombre).slice(0, 80),
    comentario: sanitizar(comentario).slice(0, 500),
    auto: sanitizar(auto || "").slice(0, 80),
    fecha: new Date().toISOString(),
  };

  if (!nuevo.nombre || !nuevo.comentario) {
    return res.status(400).json({ error: "El nombre y el comentario no pueden estar vacíos." });
  }

  const lista = leerJSON(DIR_COMENTARIOS);
  lista.unshift(nuevo);
  guardarJSON(DIR_COMENTARIOS, lista);

  res.status(201).json(nuevo);
});

/* ---- INVENTARIO ---- */

app.get("/api/trabajos", (_req, res) => {
  res.json(leerJSON(DIR_TRABAJOS));
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

    const nuevo = {
      id: uuidv4(),
      titulo: sanitizar(titulo).slice(0, 100),
      servicio: sanitizar(servicio).slice(0, 60),
      descripcion: sanitizar(descripcion).slice(0, 300),
      before: "img/inventario/" + req.files.before[0].filename,
      after: "img/inventario/" + req.files.after[0].filename,
      proceso: proceso,
      fecha: new Date().toISOString(),
    };

    const lista = leerJSON(DIR_TRABAJOS);
    lista.unshift(nuevo);
    guardarJSON(DIR_TRABAJOS, lista);

    res.status(201).json(nuevo);
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
  const lista = leerJSON(DIR_TRABAJOS);
  var idx = lista.findIndex(function (t) { return t.id === req.params.id; });

  if (idx === -1) {
    limpiarArchivos(req.files);
    return res.status(404).json({ error: "Trabajo no encontrado." });
  }

  var existente = lista[idx];

  if (req.body.titulo) existente.titulo = sanitizar(req.body.titulo).slice(0, 100);
  if (req.body.servicio) existente.servicio = sanitizar(req.body.servicio).slice(0, 60);
  if (req.body.descripcion) existente.descripcion = sanitizar(req.body.descripcion).slice(0, 300);

  var promesas = [];

  if (req.files) {
    if (req.files.before) promesas.push(validarImagen(req.files.before[0].path));
    if (req.files.after) promesas.push(validarImagen(req.files.after[0].path));
    if (req.files.proceso) {
      req.files.proceso.forEach(function (f) { promesas.push(validarImagen(f.path)); });
    }
  }

  Promise.all(promesas).then(function () {
    if (req.files) {
      if (req.files.before) {
        eliminarArchivo(existente.before);
        existente.before = "img/inventario/" + req.files.before[0].filename;
      }
      if (req.files.after) {
        eliminarArchivo(existente.after);
        existente.after = "img/inventario/" + req.files.after[0].filename;
      }
      if (req.files.proceso) {
        (existente.proceso || []).forEach(eliminarArchivo);
        existente.proceso = req.files.proceso.map(function (f) {
          return "img/inventario/" + f.filename;
        });
      }
    }

    lista[idx] = existente;
    guardarJSON(DIR_TRABAJOS, lista);
    res.json(existente);
  }).catch(function (err) {
    limpiarArchivos(req.files);
    res.status(400).json({ error: err.message });
  });
});

app.delete("/api/trabajos/:id", requiereAdmin, function (req, res) {
  const lista = leerJSON(DIR_TRABAJOS);
  var idx = lista.findIndex(function (t) { return t.id === req.params.id; });

  if (idx === -1) {
    return res.status(404).json({ error: "Trabajo no encontrado." });
  }

  var trabajo = lista[idx];
  eliminarArchivo(trabajo.before);
  eliminarArchivo(trabajo.after);
  (trabajo.proceso || []).forEach(eliminarArchivo);

  lista.splice(idx, 1);
  guardarJSON(DIR_TRABAJOS, lista);

  res.json({ mensaje: "Trabajo eliminado." });
});

app.listen(PUERTO, () => {
  console.log("Servidor corriendo en http://localhost:" + PUERTO);
});
