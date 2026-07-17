const btnEvaluar = document.getElementById("btnEvaluar");
const btnLimpiar = document.getElementById("btnLimpiar");

btnEvaluar.addEventListener("click", evaluarEstudiante);
btnLimpiar.addEventListener("click", limpiarFormulario);

// ==================== HISTORIAL GLOBAL ====================
let historialEstudiantes = [];

function evaluarEstudiante(){
    const nombre = document.getElementById("nombre").value.trim();
    const carrera = document.getElementById("carrera").value;
    const nota1Texto = document.getElementById("nota1").value;
    const nota2Texto = document.getElementById("nota2").value;
    const nota3Texto = document.getElementById("nota3").value;
    const nota4Texto = document.getElementById("nota4").value;

    if(nombre === "" || carrera === "" || nota1Texto === "" || nota2Texto === "" || nota3Texto === "" || nota4Texto === ""){
        mostrarResultado("Debe completar todos los campos.", "danger")
        return;
    }

    const notas = [Number(nota1Texto), Number(nota2Texto), Number(nota3Texto), Number(nota4Texto)];

    if(existeNotaInvalida(notas)){
        mostrarResultado("Cada nota debe estar entre 0 y 20", "warning")
        return;
    }

    const promedio = calcularPromedio(notas);
    const estado = clasificarEstado(promedio);
    const mayorMenor = notaMayorMenor(notas);
    const aprobadoReprobado = contarEstado(notas);

    // Rendimiento académico
    let rendimiento = "";
    if (promedio >= 18) rendimiento = "Alto";
    else if (promedio >= 14) rendimiento = "Medio";
    else if (promedio >= 10) rendimiento = "Básico";
    else rendimiento = "Bajo";

    // Beca académica
    let beca = "Sin beca";
    if (carrera === "TI" && promedio >= 18) beca = "100%";
    else if (carrera === "Software" && promedio >= 17) beca = "80%";
    else if (carrera === "Sistema" && promedio >= 16) beca = "60%";

    const estudiante = {
        nombre: nombre,
        carrera: carrera,
        notas: notas,
        promedio: promedio,
        estado: estado,
        mayorMenor: mayorMenor,
        aprobadoReprobado: aprobadoReprobado,
        rendimiento: rendimiento,
        beca: beca
    };

    // 👉 Guardar en historial
    guardarEnHistorial(estudiante);

    mostrarResultado(construirMensaje(estudiante), obtenerColorEstado(estado));
    mostrarResultadoBeca(estudiante.nombre, estudiante.carrera, estudiante.promedio);
    mostrarJSON(estudiante);
    console.table(estudiante);
}

function calcularPromedio(notas){
    let suma = 0;
    for(let i = 0; i < notas.length; i++){
        suma += notas[i];
    }
    return suma / notas.length;
}

function clasificarEstado(promedio){
    if(promedio >= 14){
        return "Aprobado";
    }else if(promedio >= 10){
        return "Recuperación";
    }else{
        return "Reprobado";
    }
}

function existeNotaInvalida(notas){
    for(const nota of notas){
        if(Number.isNaN(nota) || nota < 0 || nota > 20){
            return true;
        }
    }
}

function obtenerColorEstado(estado){
    switch(estado){
        case "Aprobado": return "success";
        case "Recuperación": return "warning";
        case "Reprobado": return "danger";
        default: return "secondary";
    }
}

function notaMayorMenor(notas){
    let mayorMenor = [notas[0], notas[0]];
    for(const nota of notas){
        if(nota > mayorMenor[0]) mayorMenor[0] = nota;
        if(nota < mayorMenor[1]) mayorMenor[1] = nota;
    }
    return mayorMenor;
}

function contarEstado(notas){
    let aprobadoReprobado = [0,0];
    for(const nota of notas){
        if(nota >= 14) aprobadoReprobado[0]++;
        else aprobadoReprobado[1]++;
    }
    return aprobadoReprobado;
}

function construirMensaje(estudiante){
    return `${estudiante.nombre} obtiene ${estudiante.promedio.toFixed(2)} en la carrera de ${estudiante.carrera}. 
    Nota más alta: ${estudiante.mayorMenor[0]}, Nota más baja: ${estudiante.mayorMenor[1]}.
    Aprobó en ${estudiante.aprobadoReprobado[0]} materias y reprobó en ${estudiante.aprobadoReprobado[1]}.`;
}

function mostrarResultado(mensaje, color) {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.className = 'alert alert-' + color;
    resultadoDiv.textContent = mensaje;
}

function mostrarJSON(estudiante){
    const salida = document.getElementById("salidaJSON");
    salida.classList.remove("d-none");
    salida.textContent = JSON.stringify(estudiante, null, 2);
}

function limpiarFormulario(){
    document.getElementById("nombre").value = "";
    document.getElementById("carrera").value = "";
    document.getElementById("nota1").value = "";
    document.getElementById("nota2").value = "";
    document.getElementById("nota3").value = "";
    document.getElementById("nota4").value = "";
    document.getElementById("resultado").className = "alert mt-4 d-none";
    document.getElementById("salidaJSON").className = "bg-dark text white p-3 rounded d-none";
    document.getElementById("beca").className = "alert mt-4 d-none";
}

function mostrarResultadoBeca(nombre, carrera, promedio) {
    const becaDiv = document.getElementById('beca');
    let mensaje = "";

    if (carrera === "TI" && promedio >= 18) {
        mensaje = `¡Excelente! ${nombre} obtiene una beca del 100% `;
        becaDiv.className = "alert alert-success";
    } else if (carrera === "Software" && promedio >= 17) {
        mensaje = `¡Muy bien! ${nombre} obtiene una beca del 80% `;
        becaDiv.className = "alert alert-primary";
    } else if (carrera === "Sistema" && promedio >= 16) {
        mensaje = `¡Felicitaciones! ${nombre} obtiene una beca del 60% `;
        becaDiv.className = "alert alert-warning";
    } else {
        mensaje = `${nombre}, no cumple con los requisitos para obtener una beca.`;
        becaDiv.className = "alert alert-secondary";
    }
    becaDiv.classList.remove("d-none");
    becaDiv.textContent = mensaje;
}

// ==================== GUARDAR EN HISTORIAL ====================
function guardarEnHistorial(estudiante) {
    if (historialEstudiantes.some(e => e.nombre === estudiante.nombre)) {
        alert("Ya existe un estudiante con ese nombre en el historial.");
        return;
    }
    historialEstudiantes.push(estudiante);
}

// ==================== LISTAR ESTUDIANTES ====================
function listarEstudiantes() {
    const tablaDiv = document.getElementById("tablaEstudiantes");
    tablaDiv.innerHTML = "";

    if (historialEstudiantes.length === 0) {
        tablaDiv.innerHTML = "<p class='text-muted'>No hay estudiantes registrados.</p>";
        return;
    }

    let tabla = `<table class="table table-striped">
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Carrera</th>
                <th>Promedio</th>
                <th>Estado</th>
                <th>Rendimiento</th>
                <th>Beca</th>
            </tr>
        </thead>
        <tbody>`;

    historialEstudiantes.forEach(est => {
        tabla += `<tr>
            <td>${est.nombre}</td>
            <td>${est.carrera}</td>
            <td>${est.promedio.toFixed(2)}</td>
            <td>${est.estado}</td>
            <td>${est.rendimiento}</td>
            <td>${est.beca}</td>
        </tr>`;
    });

    tabla += "</tbody></table>";
    tablaDiv.innerHTML = tabla;

    document.getElementById("totalEstudiantes").textContent = 
        `Total de estudiantes evaluados: ${historialEstudiantes.length}`;

    estadisticasCurso();
}

// ==================== ESTADÍSTICAS DEL CURSO ====================
function estadisticasCurso() {
    let aprobados = historialEstudiantes.filter(e => e.estado === "Aprobado").length;
    let recuperacion = historialEstudiantes.filter(e => e.estado === "Recuperación").length;
    let reprobados = historialEstudiantes.filter(e => e.estado === "Reprobado").length;

    document.getElementById("estadisticasCurso").innerHTML = `
        <h5>Estadísticas del curso</h5>
        <p>Aprobados: ${aprobados}</p>
        <p>Recuperación: ${recuperacion}</p>
        <p>Reprobados: ${reprobados}</p>
    `;
}
 
