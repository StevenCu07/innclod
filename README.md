Gestor de proyectos y tareas con Angular + Material Design, enfocado en una experiencia limpia, moderna y productiva.
Permite manejar proyectos, crear tareas, validarlas con formularios reactivos y todo en una interfaz tipo Trello pero optimizada.
______________________________________________________________________________

✨ Características principales

🔐 Autenticación básica con usuarios de prueba (alice / bob con clave 1234).

📂 Gestión de proyectos:

Crear, editar, eliminar proyectos.

Validaciones avanzadas (mínimo 3 caracteres, unicidad, palabras prohibidas, etc.).

✅ Gestión de tareas:

Crear, editar y marcar como completadas.

Vista en lista o tarjetas (grid).

Formularios reactivos con validaciones personalizadas.

🎨 UI con Angular Material:

Formularios con mat-form-field, mat-card, mat-icon.

Dark theme con tipografía moderna.

Feedback inmediato con mat-error y mat-hint.

⚡ Arquitectura modular:

features/projects y features/tasks bien separados.

Servicios centralizados (projects.service.ts, tasks.service.ts).

🧪 Validaciones reutilizables en shared/validators.
______________________________________________________________________________

📂 Estructura del proyecto
src/
├── app/
│   ├── core/               # Servicios base, auth, interceptors
│   ├── features/
│   │   ├── projects/       # Módulo de proyectos
│   │   │   ├── components/ # Formularios, listas, tarjetas
│   │   │   └── services/
│   │   ├── tasks/          # Módulo de tareas
│   │   │   ├── components/
│   │   │   └── services/
│   ├── shared/             # Validadores, pipes y utilidades comunes
│   └── app.module.ts
└── assets/
______________________________________________________________________________

⚙️ Instalación

Clona este repositorio:

git clone https://github.com/StevenCu07/innclod.git
cd innclod


Instala dependencias:

npm install
______________________________________________________________________________

▶️ Ejecución en desarrollo
ng serve -o


Esto abrirá la aplicación en http://localhost:4200

______________________________________________________________________________

👤 Usuarios de prueba

sofia / 1234

carlos / 1234
______________________________________________________________________________

🧩 Validadores personalizados

trimmedRequired → No permite strings vacíos ni solo espacios.

minLenTrimmed(n) → Longitud mínima ignorando espacios extra.

uniqueProjectTitle → Valida unicidad de títulos en proyectos.

forbiddenWords([...]) → Bloquea palabras no permitidas (test, demo, etc.).
