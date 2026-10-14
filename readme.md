# CuentasClarasApp 💸

> Control de gastos compartidos, claro y simple. *(nombre provisorio)*

Aplicación web fullstack para llevar el control de gastos compartidos entre varias personas (pareja, familia, compañeros de piso): registrar gastos mes a mes, asignar gastos fijos a quien se hace cargo e invitar a otras personas mediante un vínculo.

**Estado actual:** Sprint 1 en curso (registro hecho, falta validación de email y login).

## 🛠 Stack

| Capa | Tecnología |
|------|-----------|
| Frontend | HTML, CSS, JavaScript |
| Notificaciones | Toastify-js (por CDN) |
| Backend | Node.js + Express |
| Base de datos y autenticación | Supabase (PostgreSQL + Supabase Auth, sesión con JWT) |
| Emails | Resend |
| Diseño | Figma |

## ✅ Requerimientos

Estados: ✅ hecho · 🟨 en progreso · ⬜ pendiente

### Funcionales

| ID | Requerimiento | Sprint | Estado |
|----|---------------|:------:|:------:|
| RF-01 | Registrarme como usuario | 1 | ✅ |
| RF-02 | Validar el registro con un token enviado al mail | 1 | ✅ |
| RF-03 | Iniciar sesión | 1 | ⬜ |
| RF-04 | Recuperar contraseña olvidada | 2 | ⬜ |
| RF-05 | Invitar a una persona a mi control de gastos mediante un vínculo | 3 | ⬜ |
| RF-06 | Administrar participantes (eliminar) | 3 | ⬜ |
| RF-07 | Registrar gastos mes a mes con su concepto | 4 | ⬜ |
| RF-08 | Asentar gastos fijos y asignarlos a la persona responsable | 4 | ⬜ |
| RF-09 | Un administrador puede eliminar usuarios | 5 | ⬜ |

### No funcionales

| ID | Requerimiento |
|----|---------------|
| RNF-01 | Persistir los datos en Supabase |
| RNF-02 | Manejar la sesión con JWT |
| RNF-03 | Cumplir estándares de escalabilidad |

## 🗓 Roadmap por sprints

| Sprint | Objetivo | Estado |
|:------:|----------|:------:|
| 0 | Preparación: diseños en Figma, requerimientos, proyecto en Supabase, estructura base | ✅ |
| 1 | Registro, validación de email y login | 🟨 En curso |
| 2 | Recuperación de contraseña | ⬜ Próximo |
| 3 | Invitaciones y participantes | ⬜ Próximo |
| 4 | Gastos (mensuales y fijos) | ⬜ Próximo |
| 5 | Administración, escalabilidad y deploy | ⬜ Próximo |

### Detalle del Sprint 1

- [x] Pantallas de inicio de sesión y registro (HTML)
- [x] Backend Express con rutas
- [x] Registro: crea el usuario en `auth.users` y en la tabla `usuarios` (sin confirmar email)
- [x] Validación de contraseñas en el front con mensajes (Toastify)
- [x] Capa `service` del backend
- [x] Validación de email con Resend
- [ ] Login y manejo del JWT
- [ ] Middleware para proteger rutas

## 🗃 Modelo de datos

### Tabla actual: `usuarios`

El `id` es el mismo de `auth.users` (Supabase Auth guarda la contraseña y la sesión; esta tabla guarda los datos de perfil).

```sql
create table public.usuarios (
  id uuid not null primary key,
  name text,
  last_name text,
  email text,
  is_verified boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | uuid | Igual al id de `auth.users` |
| name | text | Nombre |
| last_name | text | Apellido |
| email | text | Correo electrónico |
| is_verified | boolean | `false` hasta que valide el email |
| created_at | timestamptz | Fecha de creación |

### Tablas futuras (pendientes, se definen en su sprint)

- ⬜ Sprint 3: participantes e invitaciones
- ⬜ Sprint 4: gastos
- ⬜ Sprint 5: rol de administrador

## 🔌 API

| Método | Ruta | Descripción | Estado |
|--------|------|-------------|:------:|
| POST | `/api/auth/register` | Registro de usuario | ✅ |
| GET | `/api/auth/verify` | Validar email | ✅ |
| POST | `/api/auth/login` | Iniciar sesión | ⬜ |

*(Se agregan más rutas a medida que avanzan los sprints.)*

## ⚙️ Instalación

```bash
git clone <url-del-repositorio>
cd cuentasclaras-app
npm install
cp .env.example .env   # completar las variables
npm run dev
```

## 🔐 Variables de entorno

```env
PORT=3000
SUPABASE_URL=
SUPABASE_KEY=
RESEND_API_KEY=
APP_URL=http://localhost:3000
```

> ⚠️ Nunca subas el archivo `.env` al repositorio.

## 🧠 Decisiones técnicas

- **Supabase Auth:** maneja contraseñas y JWT, en lugar de implementarlos a mano.
- **Tabla `usuarios` aparte de `auth.users`:** guarda nombre y apellido, que Supabase Auth no tiene como columnas propias.
- **Confirmar contraseña:** se valida solo en el front, no se guarda.
- **Toastify-js por CDN:** muestra los mensajes de error y éxito en pantalla. Se carga con `<script>` y no con npm porque el front es HTML plano sin bundler, y el navegador no puede resolver paquetes de `node_modules`.

## 👤 Autor

**Charly**: Desarrollador Fullstack JavaScript
