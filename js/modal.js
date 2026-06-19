
var existe
var prod
function openModal(producto) {
    prod = producto
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
    
    updateBtn();
}

function closeModal() {
    document
        .getElementById("product-modal")
        .classList.remove("active");
}

function btnAction() {
    if (existe) {
        quitarDelCarrito(prod.nombre);
    } else {
        agregarAlCarrito(prod);
    }
    updateBtn();
}

function updateBtn() {
    existe = carrito.some(
        p => p.nombre === prod.nombre
    );
    const btn = document.getElementById("modal-cart-btn")
    if (existe) {
        btn.textContent = "Quitar"
        btn.classList.add("remove-mode")
    } else {
        btn.textContent = "Agregar"
        btn.classList.remove("remove-mode")
    }
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

        document.getElementById("modal-cart-btn")
            .addEventListener("click", btnAction);

    } catch (error) {
        console.error(error);
    }
}

document.addEventListener("keydown", (key) => {
    if (key.key === "Escape") closeModal();
})