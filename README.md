
# Proyecto Angular - Gestión de Cursos

Este proyecto fue desarrollado como parte de la **entrega final del curso de Angular en Coderhouse**.  
La aplicación permite gestionar **alumnos, cursos e inscripciones** mediante componentes modulares, utilizando Angular CLI, Angular Material y Formularios Reactivos.

---

## ✅ Funcionalidades Principales

### 🎓 Gestión de Alumnos, Cursos e Inscripciones
- Altas, bajas y modificaciones usando formularios reactivos.
- Visualización mediante tablas dinámicas de Angular Material.

### 🧭 Interfaz de Usuario
- Navbar lateral y Toolbar superior para navegación fluida.
- Estilizado limpio y responsive con Angular Material.

### 🧱 Estructuración del Código
- Cada entidad está separada como un Feature Module.
- Datos mockeados gestionados desde arrays en TypeScript.

---

## 🛠️ Tecnologías utilizadas

- Angular CLI
- Angular Material
- TypeScript
- Reactive Forms
- HTML5 / SCSS
- Routing con lazy loading

---

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── core/
│   ├── shared/
│   ├── modules/
│   │   └── dashboard/
│   │       ├── pages/
│   │       │   ├── students/
│   │       │   ├── courses/
│   │       │   └── enrollments/
│   │       └── dashboard.component.*
```

---

## 🚀 Cómo ejecutar el proyecto

### Clonar el repositorio

```bash
git clone https://github.com/Santyishi/Proyecto-Angular.git
cd Proyecto-Angular
```

### Instalar dependencias

```bash
npm install
```

### Ejecutar en modo desarrollo

```bash
ng serve
```

Acceder desde: [http://localhost:4200](http://localhost:4200)

---

## 🏁 Versión de Producción (`dist/`)

La carpeta `dist/` fue generada utilizando el comando:

```bash
ng build --configuration production
```

> ⚠️ Debido a que `dist/` está ignorado por defecto en `.gitignore`, se forzó su agregado manual al repositorio para cumplir con los requisitos de entrega.

---

## 📌 Estado del Proyecto

✔️ Proyecto completado cumpliendo con los requisitos funcionales y técnicos solicitados.  
✔️ Documentación incluida.  
✔️ Carpeta `dist/` incluida para revisión.

---

## 🧑‍💻 Autor

Proyecto realizado por **Santyishi** como entrega final del curso de Angular.
