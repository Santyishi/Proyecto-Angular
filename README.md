# Proyecto Angular - Gestión de Cursos

Este proyecto fue desarrollado como parte de la **entrega final del curso de Angular en Coderhouse**.  
La aplicación permite gestionar **alumnos, cursos, inscripciones y usuarios** mediante componentes modulares, utilizando Angular CLI, Angular Material, json-server y Formularios Reactivos.

---

## ✅ Funcionalidades Principales

### 🎓 Gestión de Alumnos, Cursos, Inscripciones y Usuarios
- Altas, bajas y modificaciones usando formularios reactivos.
- Visualización mediante tablas dinámicas de Angular Material.
- Restricciones por rol: Admin vs. Usuario.
- Generación automática de IDs secuenciales tipo Excel.
- Conexión a una API REST simulada con json-server.

### 🧭 Interfaz de Usuario
- Navbar lateral y Toolbar superior para navegación fluida.
- Estilizado limpio, responsive y accesible con Angular Material.
- Rutas con Lazy Loading y rutas hijas por sección.

### 🔐 Autenticación y Autorización
- Inicio de sesión con autenticación por rol.
- Guards para proteger rutas según el perfil del usuario.

### 🧱 Estructuración del Código
- Modularización en `core`, `shared` y `features`.
- Servicios que devuelven observables desde API REST simulada.
- Separación clara de responsabilidades por Feature Module.

### 🧪 Pruebas Unitarias
- Servicios y componentes con pruebas unitarias (Ej: StudentsService, CoursesComponent).

---

## 🛠️ Tecnologías utilizadas

- Angular CLI
- Angular Material
- Angular Routing con Lazy Loading
- Reactive Forms
- TypeScript
- HTML5 / SCSS
- json-server
- Jasmine / Karma

---

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── core/               # Servicios de autenticación y guards
│   ├── shared/             # Pipes, directivas, componentes comunes
│   ├── features/           # Módulos funcionales
│   │   ├── students/
│   │   ├── courses/
│   │   ├── enrollments/
│   │   └── users/
│   ├── app-routing.module.ts
│   └── app.component.*
├── assets/
├── environments/
db.json                      # API REST simulada con json-server
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

Acceder desde: [http://localhost:4200](http://localhost:4200)

### 4. Ejecutar json-server

```bash
npx json-server --watch db.json
```

Acceder a la API REST simulada desde: [http://localhost:3000](http://localhost:3000)

---

## 🏁 Versión de Producción (`dist/`)

La carpeta `dist/` fue generada utilizando el comando:

```bash
ng build --configuration production
```

> ⚠️ Debido a que `dist/` está ignorado por defecto en `.gitignore`, se forzó su agregado manual al repositorio para cumplir con los requisitos de entrega.

---

## 🧪 Pruebas Unitarias

Ejecutar los tests con:

```bash
ng test
```

Resultados esperados: todos los tests deben pasar (StudentsService, CoursesComponent, etc).

---

## 📌 Estado del Proyecto

✔️ Cumple con todos los requisitos funcionales y técnicos.  
✔️ Modularización completa.  
✔️ json-server integrado.  
✔️ Guards, roles y autenticación.  
✔️ Pruebas unitarias funcionales.  
✔️ Documentación incluida.  
✔️ Carpeta `dist/` agregada para revisión.

---

## 🧑‍💻 Autor

Proyecto realizado por **Santyishi** como entrega final del curso de Angular en Coderhouse.
