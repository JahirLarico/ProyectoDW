/*
    modal.js
    Ahora el modal es un componente nativo de Bootstrap 5 (.modal).
    Usamos bootstrap.Modal.getOrCreateInstance() para abrirlo/cerrarlo
    en vez de classList.add('active') manual.
*/

var existe;
var prod;
var bsModalInstance; // instancia única de bootstrap.Modal

function openModal(producto) {
    prod = producto;
    const modalEl = document.getElementById("product-modal");
    if (!modalEl) { console.error("Modal no cargado"); return; }

    document.getElementById("modal-image").src = producto.imagen;
    document.getElementById("modal-title").textContent = producto.nombre;
    document.getElementById("modal-price").textContent = `S/ ${producto.precio}`;
    document.getElementById("modal-description").textContent = producto.descripcion;

    // Reutilizamos la instancia para que Bootstrap maneje backdrop, focus, ESC, etc.
    bsModalInstance = bootstrap.Modal.getOrCreateInstance(modalEl);
    bsModalInstance.show();

    updateBtn();
}

function closeModal() {
    if (bsModalInstance) bsModalInstance.hide();
}

function btnAction() {
    if (existe) quitarDelCarrito(prod.nombre);
    else agregarAlCarrito(prod);
    updateBtn();
}

function updateBtn() {
    existe = carrito.some(p => p.nombre === prod.nombre);
    const btn = document.getElementById("modal-cart-btn");
    if (existe) {
        btn.textContent = "❌ Quitar del carrito";
        btn.classList.add("remove-mode");
    } else {
        btn.textContent = "🛒 Agregar al carrito";
        btn.classList.remove("remove-mode");
    }
}

async function loadModal() {
    try {
        const response = await fetch("./modals/modal.html");
        if (!response.ok) throw new Error("No se pudo cargar el modal");
        const html = await response.text();
        document.body.insertAdjacentHTML("beforeend", html);

        // Bootstrap ya maneja el botón .btn-close con data-bs-dismiss,
        // pero conservamos el listener del botón "Agregar/Quitar".
        document.getElementById("modal-cart-btn")
            .addEventListener("click", btnAction);
    } catch (error) {
        console.error(error);
    }
}

// ESC ya lo maneja Bootstrap automáticamente, pero lo dejamos por compatibilidad.
document.addEventListener("keydown", (key) => {
    if (key.key === "Escape") closeModal();
});
