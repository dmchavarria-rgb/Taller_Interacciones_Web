# Taller_Interacciones_Web
Descripción
Este proyecto implementa un evaluador académico interactivo utilizando HTML5, Bootstrap y JavaScript.
Permite ingresar datos de estudiantes, calcular promedios, asignar becas según carrera, clasificar rendimiento académico y generar un historial con estadísticas del curso.

# Funcionalidades principales
Ingreso de datos: nombre, carrera y cuatro notas con decimales.

Cálculo de promedios: promedio general y promedio especial sin la nota más baja.

Clasificación académica: Aprobado, Recuperación o Reprobado.

Rendimiento académico: Alto, Medio, Básico o Bajo.

Asignación de becas:

TI → Promedio > 18 → Beca 100%

Software → Promedio > 17 → Beca 80%

Sistemas → Promedio > 16 → Beca 60%

Historial global de estudiantes evaluados.

Validación de nombres repetidos.

Tabla de estudiantes con botón para listar.

Estadísticas del curso: aprobados, recuperación, reprobados y promedio general.

Búsqueda por nombre.

Ranking académico: ordenado de mayor a menor promedio.

Identificación del mejor y peor promedio.

Visualización en formato JSON del objeto estudiante.

🛠️ Tecnologías utilizadas
HTML5 → estructura del formulario.

Bootstrap 5 → estilos y componentes visuales.

JavaScript (ES6) → lógica de cálculo, validaciones y manipulación del DOM.

# Estructura del proyecto
Taller_Interacciones_Web`

```
└── 📁 Taller_Interacciones_Web
    ├── 📕 Informe_Taller_Chavarria_Dayana.pdf
    ├── 📝 README.md
    ├── 📄 app.js
    └── 🌐 index.html
```

# Uso del sistema
Abrir index.html en el navegador.

Ingresar nombre, carrera y cuatro notas.

Presionar Evaluar para calcular resultados.

Visualizar:

Promedio general y especial.

Estado académico y rendimiento.

Beca asignada con colores Bootstrap.

Objeto estudiante en formato JSON.

Usar los botones adicionales para:

Listar estudiantes en tabla.

Ver estadísticas del curso.

Buscar estudiante por nombre.

Generar ranking y mostrar mejor/peor promedio.

# Pruebas realizadas
Se ingresaron estudiantes con diferentes carreras y promedios.

Se verificó la correcta asignación de becas.

Se comprobó la validación de nombres repetidos.

Se probó la búsqueda y ranking.

# Resultados
El sistema cumple con los 20 ejercicios planteados, integrando lógica de programación, manipulación del DOM y diseño visual.

# Conclusiones
JavaScript permite construir evaluadores académicos dinámicos y prácticos.

La modularización en funciones facilita la comprensión y mantenimiento.

Bootstrap mejora la presentación visual y la experiencia del usuario.

# Bibliografía
MDN Web Docs - JavaScript (developer.mozilla.org in Bing)

Bootstrap 5 Documentación

Haverbeke, M. Eloquent JavaScript.
