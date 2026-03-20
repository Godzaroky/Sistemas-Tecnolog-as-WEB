// ETIQUETAS
const habilidades = ["JavaScript", "HTML", "CSS","SQL","APIs"];

// FUNCION PARA RENDERIZAR ETIQUETAS
const mostrarEtiquetas = (lista) => {
    const contenedor = document.querySelector("#etiquetas");

    lista.forEach((habilidad) => {
        const span = document.createElement("span");
        span.classList.add("etiqueta");
        span.textContent = habilidad;

        contenedor.appendChild(span)
    });
};

const cargarUsuarios = async () => {
    const estado = document.querySelector("#estado");

    estado.textContent = "Cargando...";

    try {
        const respuesta = await fetch("https://api.github.com/users/octocat");
        const datos = await respuesta.json();

        const perfil = construirPerfil(datos);
        renderizarPerfil(perfil);
        mostrarEtiquetas(habilidades);
        
        estado.textContent = "";

        console.log(datos);

    } catch (error) {
        estado.textContent = "Error al cargar usuarios";
        console.error(error);
    }
};

const construirPerfil = (datos) => {
    return {
    nombre: datos.name,
    usuario: "@" + datos.login,
    email: datos.email || "No disponible",
    ciudad: datos.location || "Sin ubicacion",
    avatar: datos.avatar_url 
    };
};

const renderizarPerfil = (perfil) => {
    document.querySelector("#nombre").textContent = perfil.nombre;
    document.querySelector("#usuario").textContent = perfil.usuario;
    document.querySelector("#email").textContent = perfil.email;
    document.querySelector("#ciudad").textContent = perfil.ciudad;
    document.querySelector("#avatar").src = perfil.avatar;
}