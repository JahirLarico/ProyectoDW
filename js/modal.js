function openModal(producto) {
    const modal = document.getElementById("product-modal");

    if (!modal) {
        console.error("Modal no cargado");
        return;
    }

    document.getElementById("modal-image").src =
        producto.imagen;

    document.getElementById("modal-title").textContent =
        producto.nombre;

    document.getElementById("modal-price").textContent =
        producto.precio;

    document.getElementById("modal-description").textContent =
        producto.descripcion;

    modal.classList.add("active");
}

function closeModal() {
    document
        .getElementById("product-modal")
        .classList.remove("active");
}

async function loadModal() {
    try {
        const response = await fetch("./modals/modal.html");

        if (!response.ok) {
            throw new Error("No se pudo cargar el modal");
        }

        const html = await response.text();

        document.body.insertAdjacentHTML(
            "beforeend",
            html
        );

        document
            .querySelector(".close-modal")
            .addEventListener("click", closeModal);

    } catch (error) {
        console.error(error);
    }
}