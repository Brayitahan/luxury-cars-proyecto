const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL && process.env.DATABASE_URL.includes("railway") ? { rejectUnauthorized: false } : false,
});

async function iniciar() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS trabajos (
        id TEXT PRIMARY KEY,
        titulo TEXT NOT NULL,
        servicio TEXT NOT NULL,
        descripcion TEXT NOT NULL,
        before TEXT NOT NULL,
        after TEXT NOT NULL,
        proceso JSONB DEFAULT '[]'::jsonb,
        fecha TEXT NOT NULL
      )
    `);
    await client.query(`
      CREATE TABLE IF NOT EXISTS comentarios (
        id TEXT PRIMARY KEY,
        nombre TEXT NOT NULL,
        comentario TEXT NOT NULL,
        auto TEXT DEFAULT '',
        fecha TEXT NOT NULL
      )
    `);

    const res = await client.query("SELECT COUNT(*)::int AS count FROM trabajos");
    if (res.rows[0].count === 0) {
      await sembrar(client);
    }
  } finally {
    client.release();
  }
}

async function sembrar(client) {
  const trabajos = [
    {
      id: "seed-bmw",
      titulo: "BMW Serie 3",
      servicio: "Pintura completa",
      descripcion: "Restauración completa de pintura con acabado de alto brillo y capa de protección cerámica.",
      before: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&h=400&fit=crop",
      after: "https://images.unsplash.com/photo-1556189250-72ba2ba823b0?w=600&h=400&fit=crop",
      proceso: [],
      fecha: "2026-06-15T00:00:00Z",
    },
    {
      id: "seed-mustang",
      titulo: "Ford Mustang GT",
      servicio: "Pintura completa",
      descripcion: "Cambio de color completo a rojo brillante con capa de protección cerámica de 5 años.",
      before: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=400&fit=crop",
      after: "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?w=600&h=400&fit=crop",
      proceso: [],
      fecha: "2026-06-20T00:00:00Z",
    },
    {
      id: "seed-porsche-proceso",
      titulo: "Porsche 911 Carrera",
      servicio: "Pintura personalizada",
      descripcion: "Transformación completa con pintura personalizada azul metalizado.",
      before: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=600&h=400&fit=crop",
      after: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop",
      proceso: [
        "https://images.unsplash.com/photo-1619642913040-3c1e6f7d6a8f?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1619642913100-8f5b7e4b7b4a?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1558618666-fcd25c85f82f?w=600&h=400&fit=crop",
      ],
      fecha: "2026-07-01T00:00:00Z",
    },
  ];

  for (const t of trabajos) {
    await client.query(
      "INSERT INTO trabajos (id, titulo, servicio, descripcion, before, after, proceso, fecha) VALUES ($1, $2, $3, $4, $5, $6, $7::jsonb, $8) ON CONFLICT DO NOTHING",
      [t.id, t.titulo, t.servicio, t.descripcion, t.before, t.after, JSON.stringify(t.proceso), t.fecha]
    );
  }

  const comentarios = [
    { id: "ejemplo-1", nombre: "Andrés Mejía", comentario: "Traje un Mazda 3 con la pintura quemada por el sol. Lo devolvieron con un brillo húmedo que no esperaba. Ya van tres conocidos que les pedí el número.", auto: "Mazda 3", fecha: "2026-06-25T14:30:00.000Z" },
    { id: "ejemplo-2", nombre: "Carolina Ramírez", comentario: "Chocaron mi camioneta y pensé que ese color ya no se conseguía. Lograron igualar el tono exacto y la reparación quedó invisible. Cumplieron en cuatro días.", auto: "Toyota Hilux", fecha: "2026-06-20T10:15:00.000Z" },
    { id: "ejemplo-3", nombre: "Felipe Rojas", comentario: "Hice el paquete completo: latonería, pintura, polichada y cerámica. El resultado fue mejor de lo que imaginaba. Mi BMW parece recién salido del concesionario.", auto: "BMW 320i", fecha: "2026-06-15T09:00:00.000Z" },
    { id: "ejemplo-4", nombre: "Laura Vargas", comentario: "Solo iba a cotizar un golpe y terminé dejando el carro completo. La confianza que me dio el diagnóstico fue lo que me convenció. Quedó perfecto.", auto: "Mazda CX-5", fecha: "2026-06-10T16:45:00.000Z" },
    { id: "ejemplo-5", nombre: "Diego Torres", comentario: "La polichada que le hicieron a mi Audi quedó con un brillo espejo que dura hasta hoy. La atención personalizada marca la diferencia.", auto: "Audi A4", fecha: "2026-06-05T11:30:00.000Z" },
  ];

  for (const c of comentarios) {
    await client.query(
      "INSERT INTO comentarios (id, nombre, comentario, auto, fecha) VALUES ($1, $2, $3, $4, $5) ON CONFLICT DO NOTHING",
      [c.id, c.nombre, c.comentario, c.auto, c.fecha]
    );
  }
}

async function query(text, params) {
  const client = await pool.connect();
  try {
    return await client.query(text, params);
  } finally {
    client.release();
  }
}

module.exports = { iniciar, query };
