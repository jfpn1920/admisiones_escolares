/*----------------------------------------*/
/*--|funcionalidad_admisiones_escolares|--*/
/*----------------------------------------*/
const formulario = document.getElementById("formularioInscripcion");
const nombre = document.getElementById("nombre");
const documento = document.getElementById("documento");
const edad = document.getElementById("edad");
const grado = document.getElementById("grado");
const correo = document.getElementById("correo");
const telefono = document.getElementById("telefono");
const acudiente = document.getElementById("acudiente");
const observaciones = document.getElementById("observaciones");
const guardar = document.getElementById("guardar");
const limpiar = document.getElementById("limpiar");
const restaurar = document.getElementById("restaurar");
const eliminar = document.getElementById("eliminar");
const datosGuardados = document.getElementById("datosGuardados");
const mensaje = document.getElementById("mensaje");
/*------------------------------------*/
/*--|obtener_datos|-------------------*/
/*------------------------------------*/
function obtenerDatos() {
    const datos = localStorage.getItem("admision_escolar");
    if (datos) {
        return JSON.parse(datos);
    }
    return null;
}
/*------------------------------------*/
/*--|guardar_datos|-------------------*/
/*------------------------------------*/
function guardarDatos() {
    const datos = {
        nombre: nombre.value,
        documento: documento.value,
        edad: edad.value,
        grado: grado.value,
        correo: correo.value,
        telefono: telefono.value,
        acudiente: acudiente.value,
        observaciones: observaciones.value
    };
    localStorage.setItem(
        "admision_escolar",
        JSON.stringify(datos)
    );
    mostrarDatos(datos);
    mensaje.textContent =
        "La inscripción fue guardada correctamente.";
}
/*------------------------------------*/
/*--|mostrar_datos|-------------------*/
/*------------------------------------*/
function mostrarDatos(datos) {
    if (!datos) {
        datosGuardados.innerHTML =
            "<p>No hay información guardada.</p>";
        return;
    }
    datosGuardados.innerHTML = `
        <p><strong>Estudiante:</strong> ${datos.nombre}</p>
        <p><strong>Documento:</strong> ${datos.documento}</p>
        <p><strong>Edad:</strong> ${datos.edad}</p>
        <p><strong>Grado:</strong> ${datos.grado}</p>
        <p><strong>Correo:</strong> ${datos.correo}</p>
        <p><strong>Teléfono:</strong> ${datos.telefono}</p>
        <p><strong>Acudiente:</strong> ${datos.acudiente}</p>
        <p><strong>Observaciones:</strong> ${datos.observaciones}</p>
    `;
}
/*------------------------------------*/
/*--|restaurar_datos|-----------------*/
/*------------------------------------*/
function restaurarDatos() {
    const datos = obtenerDatos();
    if (!datos) {
        mensaje.textContent =
            "No existen datos guardados.";
        return;
    }
    nombre.value = datos.nombre;
    documento.value = datos.documento;
    edad.value = datos.edad;
    grado.value = datos.grado;
    correo.value = datos.correo;
    telefono.value = datos.telefono;
    acudiente.value = datos.acudiente;
    observaciones.value = datos.observaciones;
    mensaje.textContent =
        "Los datos fueron restaurados correctamente.";
}
/*------------------------------------*/
/*--|limpiar_formulario|--------------*/
/*------------------------------------*/
function limpiarFormulario() {
    formulario.reset();
    mensaje.textContent =
        "El formulario fue limpiado.";
}
/*------------------------------------*/
/*--|eliminar_datos|------------------*/
/*------------------------------------*/
function eliminarDatos() {
    localStorage.removeItem("admision_escolar");
    formulario.reset();
    mostrarDatos(null);
    mensaje.textContent =
        "La inscripción fue eliminada.";
}
/*------------------------------------*/
/*--|validar_formulario|--------------*/
/*------------------------------------*/
function validarFormulario() {
    if (nombre.value.trim() === "") {
        mensaje.textContent =
            "Escribe el nombre del estudiante.";
        nombre.focus();
        return false;
    }
    if (documento.value.trim() === "") {
        mensaje.textContent =
            "Escribe el documento del estudiante.";
        documento.focus();
        return false;
    }
    if (grado.value === "") {
        mensaje.textContent =
            "Selecciona el grado del estudiante.";
        grado.focus();
        return false;
    }
    return true;
}
/*------------------------------------*/
/*--|evento_guardar|------------------*/
/*------------------------------------*/
guardar.addEventListener("click", function() {
    if (validarFormulario()) {
        guardarDatos();
    }
});
/*------------------------------------*/
/*--|eventos_de_botones|--------------*/
/*------------------------------------*/
limpiar.addEventListener("click", limpiarFormulario);
restaurar.addEventListener("click", restaurarDatos);
eliminar.addEventListener("click", eliminarDatos);
/*------------------------------------*/
/*--|cargar_datos|--------------------*/
/*------------------------------------*/
function cargarDatos() {
    const datos = obtenerDatos();
    if (datos) {
        mostrarDatos(datos);
    } else {
        mostrarDatos(null);
    }
}
/*------------------------------------*/
/*--|iniciar_proyecto|----------------*/
/*------------------------------------*/
cargarDatos();