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
//-------------------*/
//--|obtener_datos|--*/
//-------------------*/
function obtenerDatos() {
    try {
        const datos = localStorage.getItem("admision_escolar");
        if (!datos) {
            return null;
        }
        const inscripcion = JSON.parse(datos);
        const campos = [
            "nombre",
            "documento",
            "edad",
            "grado",
            "correo",
            "telefono",
            "acudiente",
            "observaciones"
        ];
        if (!inscripcion || typeof inscripcion !== "object") {
            return null;
        }
        const datosValidos = campos.every(function(campo) {
            return typeof inscripcion[campo] === "string";
        });
        return datosValidos ? inscripcion : null;
    } catch (error) {
        console.error("No se pudieron recuperar los datos:", error);
        return null;
    }
}
function guardarDatos() {
    const datos = {
        nombre: nombre.value.trim(),
        documento: documento.value.trim(),
        edad: edad.value,
        grado: grado.value,
        correo: correo.value.trim(),
        telefono: telefono.value.trim(),
        acudiente: acudiente.value.trim(),
        observaciones: observaciones.value.trim()
    };
    try {
        localStorage.setItem("admision_escolar", JSON.stringify(datos));
        mostrarDatos(datos);
        mensaje.textContent = "La inscripción fue guardada correctamente.";
        return true;
    } catch (error) {
        console.error("No se pudieron guardar los datos:", error);
        mensaje.textContent = "No fue posible guardar la inscripción.";
        return false;
    }
}
//-------------------*/
//--|mostrar_datos|--*/
//-------------------*/
function mostrarDatos(datos) {
    datosGuardados.replaceChildren();
    if (!datos) {
        const texto = document.createElement("p");
        texto.textContent = "No hay información guardada.";
        datosGuardados.appendChild(texto);
        return;
    }
    const campos = [
        ["Estudiante", datos.nombre],
        ["Documento", datos.documento],
        ["Edad", datos.edad],
        ["Grado", datos.grado],
        ["Correo", datos.correo],
        ["Teléfono", datos.telefono],
        ["Acudiente", datos.acudiente],
        ["Observaciones", datos.observaciones]
    ];
    campos.forEach(function(campo) {
        const parrafo = document.createElement("p");
        const etiqueta = document.createElement("strong");
        etiqueta.textContent = `${campo[0]}: `;
        parrafo.appendChild(etiqueta);
        parrafo.appendChild(document.createTextNode(campo[1] || "No especificado"));
        datosGuardados.appendChild(parrafo);
    });
}
//---------------------*/
//--|restaurar_datos|--*/
//---------------------*/
function restaurarDatos() {
    const datos = obtenerDatos();
    if (!datos) {
        mensaje.textContent = "No existen datos guardados para restaurar.";
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
    limpiarErrores();
    mensaje.textContent = "Los datos fueron restaurados correctamente.";
}
function limpiarErrores() {
    const campos = formulario.querySelectorAll("input, select, textarea");
    campos.forEach(function(campo) {
        campo.removeAttribute("aria-invalid");
    });
}
function limpiarFormulario() {
    formulario.reset();
    limpiarErrores();
    mensaje.textContent = "El formulario fue limpiado. La inscripción guardada se conserva.";
}
function eliminarDatos() {
    const confirmar = confirm("¿Deseas eliminar la inscripción guardada?");
    if (!confirmar) {
        return;
    }
    try {
        localStorage.removeItem("admision_escolar");
        formulario.reset();
        limpiarErrores();
        mostrarDatos(null);
        mensaje.textContent = "La inscripción fue eliminada.";
    } catch (error) {
        console.error("No se pudo eliminar la inscripción:", error);
        mensaje.textContent = "No fue posible eliminar la inscripción.";
    }
}
//------------------------*/
//--|validar_formulario|--*/
//------------------------*/
function validarFormulario() {
    limpiarErrores();
    const camposObligatorios = [
        {
            campo: nombre,
            mensaje: "Escribe el nombre del estudiante."
        },
        {
            campo: documento,
            mensaje: "Escribe el documento del estudiante."
        },
        {
            campo: edad,
            mensaje: "Ingresa una edad válida entre 1 y 120 años."
        },
        {
            campo: grado,
            mensaje: "Selecciona el grado del estudiante."
        }
    ];
    for (const elemento of camposObligatorios) {
        const campo = elemento.campo;
        if (!campo.value.trim() || !campo.checkValidity()) {
            mensaje.textContent = elemento.mensaje;
            campo.setAttribute("aria-invalid", "true");
            campo.focus();
            return false;
        }
    }
    if (correo.value.trim() && !correo.checkValidity()) {
        mensaje.textContent = "Ingresa un correo electrónico válido.";
        correo.setAttribute("aria-invalid", "true");
        correo.focus();
        return false;
    }
    return true;
}
//--------------------*/
//--|evento_guardar|--*/
//--------------------*/
guardar.addEventListener("click", function() {
    mensaje.textContent = "";
    if (validarFormulario()) {
        guardarDatos();
    }
});
limpiar.addEventListener("click", limpiarFormulario);
restaurar.addEventListener("click", restaurarDatos);
eliminar.addEventListener("click", eliminarDatos);
function cargarDatos() {
    const datos = obtenerDatos();
    mostrarDatos(datos);
    if (datos) {
        nombre.value = datos.nombre;
        documento.value = datos.documento;
        edad.value = datos.edad;
        grado.value = datos.grado;
        correo.value = datos.correo;
        telefono.value = datos.telefono;
        acudiente.value = datos.acudiente;
        observaciones.value = datos.observaciones;
    }
}
cargarDatos();