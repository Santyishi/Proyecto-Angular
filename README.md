# 📚 Proyecto Angular - Gestión de Cursos

Este proyecto fue desarrollado como parte de la **entrega final del curso de Angular en Coderhouse**.  
La aplicación permite gestionar **alumnos, cursos, inscripciones y usuarios** mediante componentes modulares, autenticación por roles y manejo de estado global con NgRx.

---

## ✅ Funcionalidades Principales

### 🎓 Gestión de Entidades
- Altas, bajas y modificaciones usando formularios reactivos.
- Visualización de Alumnos, Cursos, Inscripciones y Usuarios en tablas.
- Acciones con restricción por rol (modificar/eliminar solo para administradores).
- Generación automática de IDs secuenciales tipo Excel para cursos e inscripciones.
- Vista de detalle para cada alumno y curso con opción de desinscripción.
- Conexión a API REST simulada con json-server o mockapi.io.

### 🔐 Autenticación y Autorización
- Inicio de sesión con credenciales y perfil (administrador o usuario).
- Guards que restringen el acceso a rutas según el rol.
- Logout funcional con redirección al login.

### 🧭 Interfaz de Usuario
- Navbar lateral dinámico según perfil.
- Toolbar superior con:
  - Nombre de la aplicación.
  - Título dinámico por ruta.
  - Usuario logueado.
- Diseño responsive y accesible con Angular Material.

### 🧱 Arquitectura del Código
- Modularización completa: `core`, `shared`, `features`.
- Servicios que devuelven observables conectados a API externa.
- Lazy Loading y rutas hijas en cada módulo.
- Separación clara de responsabilidades por módulo funcional.

### 🧠 Manejo de Estado con NgRx
- Store global (`app store`) para:
  - Usuario logueado.
  - Título actual de la ruta.
- Feature stores individuales (`auth`, `students`, `courses`, `users`, etc).
- Implementación de:
  - Acciones (`actions`)
  - Reducers (`reducers`)
  - Selectores (`selectors`)
  - Efectos (`effects`) para comunicación con servicios.
- Estado reactivo y centralizado en toda la aplicación.

---

## 🛠️ Tecnologías Utilizadas

- Angular CLI
- Angular Material
- NgRx (Store, Effects, Reducers, Selectors)
- TypeScript
- RxJS
- Reactive Forms
- json-server
- Jasmine / Karma
- Bootstrap (desde angular.json)
- HTML5 / SCSS

---

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── core/               # Servicios, guards, lógica global
│   ├── shared/             # Pipes, directivas, componentes reutilizables
│   ├── state/              # NgRx app store (auth, title, etc.)
│   ├── modules/
│   │   ├── auth/           # Login y autenticación
│   │   └── dashboard/
│   │       └── pages/
│   │           ├── students/
│   │           ├── courses/
│   │           ├── enrollments/
│   │           └── users/
│   ├── app-routing.module.ts
│   └── app.component.*
├── assets/
├── environments/
db.json                      # Simulación de backend con json-server
```

---

## 🚀 Cómo ejecutar el proyecto

### 1. Clonar el repositorio

```bash
git clone https://github.com/Santyishi/Proyecto-Angular.git
cd Proyecto-Angular
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Ejecutar Angular en modo desarrollo

```bash
ng serve
```

Abrir en: [http://localhost:4200](http://localhost:4200)

### 4. Ejecutar json-server

```bash
npx json-server --watch db.json
```

API simulada: [http://localhost:3000](http://localhost:3000)

---

## 🧪 Pruebas Unitarias

Ejecutar los tests con:

```bash
ng test
```

Resultados esperados: deben ejecutarse correctamente los tests de servicios y componentes clave como `StudentsService`, `CoursesComponent`, etc.

---

## 🏁 Versión de Producción (`dist/`)

El proyecto fue compilado para producción con:

```bash
ng build --configuration production
```

> ⚠️ La carpeta `dist/` fue incluida manualmente en el repositorio debido a los requerimientos de entrega, ya que normalmente está en `.gitignore`.

---

## 📌 Estado del Proyecto

✔️ Cumple con todos los requisitos funcionales y técnicos.  
✔️ Arquitectura limpia, modular, escalable.  
✔️ NgRx implementado de forma completa.
✔️ API externa simulada correctamente integrada.  
✔️ Autenticación, guards, roles y navegación funcional.  
✔️ Pruebas unitarias disponibles.  
✔️ Documentación incluida.  
✔️ Carpeta `dist/` agregada para revisión.

---

## 👨‍💻 Autor

**Santyishi**  
Proyecto realizado como entrega final del curso de Angular en Coderhouse.  
[GitHub](https://github.com/Santyishi)
