# CuentasClarasApp 💸

> Control de gastos compartidos, claro y simple. *(nombre provisorio)*

![Estado](https://img.shields.io/badge/estado-en%20desarrollo-yellow)
![Node](https://img.shields.io/badge/node-%3E%3D18-green)
![Licencia](https://img.shields.io/badge/licencia-MIT-blue)

## 📌 Descripción

CuentasClarasApp es una aplicación web fullstack para llevar el control de gastos compartidos entre varias personas (pareja, familia, compañeros de piso). Permite registrar gastos mes a mes, asignar gastos fijos a quien se hace cargo de ellos e invitar a otras personas mediante un vínculo.

**Problema que resuelve:** *(completar: ¿por qué existe la app? ¿quién la usa?)*

## 📑 Índice

1. [Stack tecnológico](#-stack-tecnológico)
2. [Requerimientos](#-requerimientos)
3. [Diseño](#-diseño)
4. [Arquitectura](#-arquitectura)
5. [Modelo de datos](#-modelo-de-datos)
6. [API](#-api)
7. [Instalación](#-instalación)
8. [Variables de entorno](#-variables-de-entorno)
9. [Scripts](#-scripts)
10. [Roadmap por sprints](#-roadmap-por-sprints)
11. [Estructura del proyecto](#-estructura-del-proyecto)
12. [Decisiones técnicas](#-decisiones-técnicas)
13. [Contribuir](#-contribuir)
14. [Autor](#-autor)

## 🛠 Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Frontend | HTML, CSS, JavaScript |
| Backend | Node.js + Express |
| Base de datos | Supabase (PostgreSQL) |
| Autenticación | JWT |
| Emails | Resend |
| Diseño | Figma |
| Deploy | *(pendiente: Vercel / Render / ...)* |

## ✅ Requerimientos

### Funcionales

| ID | Requerimiento | Sprint | Estado |
|----|---------------|--------|--------|
| RF-01 | Como usuario quiero registrarme | 1 | ⬜ |
| RF-02 | Validar el registro mediante token enviado al mail | 1 | ⬜ |
| RF-03 | Recuperar contraseña olvidada | 2 | ⬜ |
| RF-04 | Enviar un vínculo para invitar a una persona a mi control de gastos | 3 | ⬜ |
| RF-05 | Administrar la tabla de participantes (eliminar) | 3 | ⬜ |
| RF-06 | Registrar gastos mes a mes | 4 | ⬜ |
| RF-07 | Asentar gastos fijos y asignarlos a la persona responsable | 4 | ⬜ |
| RF-08 | Registrar el concepto del gasto | 4 | ⬜ |
| RF-09 | Un administrador puede eliminar usuarios | 5 | ⬜ |

> Estados: ⬜ pendiente · 🟨 en progreso · ✅ hecho

### No funcionales

| ID | Requerimiento |
|----|---------------|
| RNF-01 | Persistencia de datos en Supabase |
| RNF-02 | Sesión mediante tokens JWT |
| RNF-03 | Cumplir estándares de escalabilidad |

## 🎨 Diseño

Prototipos realizados en Figma:

| Inicio de sesión | Registro |
|------------------|----------|
| ![Login](docs/img/login.png) | ![Registro](docs/img/registro.png) |

🔗 Link a Figma: *(pegar acá)*

## 🏗 Arquitectura

```
Cliente (HTML/JS)  ──HTTP──►  API Express  ──►  Supabase (PostgreSQL)
                                  │
                                  └──►  Resend (emails de validación / recuperación / invitación)
```

*(Opcional: reemplazar por un diagrama más prolijo.)*

## 🗃 Modelo de datos

*(Borrador a refinar en el sprint 1-2)*

- **usuarios**: id, nombre, apellido, email, password_hash, rol, verificado, created_at
- **tokens_verificacion**: id, usuario_id, token, tipo (registro / recuperación), expira_en
- **grupos** (control de gastos): id, nombre, admin_id
- **participantes**: grupo_id, usuario_id
- **invitaciones**: id, grupo_id, token, email, expira_en
- **gastos**: id, grupo_id, concepto, monto, fecha, pagado_por, es_fijo, responsable_id

## 🔌 API

*(Documentar cada endpoint a medida que se implementa)*

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| POST | `/api/auth/register` | Registro de usuario | No |
| GET | `/api/auth/verify/:token` | Validar email | No |
| POST | `/api/auth/login` | Iniciar sesión | No |
| POST | `/api/auth/forgot-password` | Solicitar recuperación | No |
| POST | `/api/auth/reset-password` | Restablecer contraseña | No |

## ⚙️ Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/<usuario>/cuentasclaras-app.git
cd cuentasclaras-app

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env

# 4. Levantar el servidor en desarrollo
npm run dev
```

## 🔐 Variables de entorno

```env
PORT=3000
SUPABASE_URL=
SUPABASE_KEY=
JWT_SECRET=
JWT_EXPIRES_IN=1d
RESEND_API_KEY=
APP_URL=http://localhost:3000
```

> ⚠️ Nunca subas el archivo `.env` al repositorio.

## 📜 Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor en modo desarrollo |
| `npm start` | Servidor en producción |

## 🗓 Roadmap por sprints

### Sprint 0 – Preparación
- [x] Diseños en Figma (inicio y registro)
- [x] Definición de requerimientos
- [ ] Repositorio y estructura base
- [ ] Proyecto en Supabase

### Sprint 1 – Registro y validación
- [ ] Pantalla de registro (RF-01)
- [ ] Envío de token por email (RF-02)
- [ ] Login con JWT

### Sprint 2 – Recuperación de contraseña
- [ ] RF-03

### Sprint 3 – Invitaciones y participantes
- [ ] RF-04, RF-05

### Sprint 4 – Gastos
- [ ] RF-06, RF-07, RF-08

### Sprint 5 – Administración
- [ ] RF-09
- [ ] Revisión de escalabilidad y deploy

## 📁 Estructura del proyecto

```
cuentasclaras-app/
├── client/
│   ├── index.html
│   ├── registro.html
│   ├── css/
│   └── js/
├── server/
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── services/
│   │   └── config/
│   └── app.js
├── docs/
│   └── img/
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## 🧠 Decisiones técnicas

*(Registrar acá el porqué de cada decisión importante: por qué JWT, por qué Supabase, cómo se hashean las contraseñas, etc.)*

## 🤝 Contribuir

1. Hacer un fork
2. Crear una rama: `git checkout -b feature/nueva-funcionalidad`
3. Commit: `git commit -m "feat: descripción"`
4. Push y Pull Request

## 👤 Autor

**Charly** – Desarrollador Fullstack JavaScript