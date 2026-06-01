
const carrito = [];

const cartSidebar =
    document.getElementById("cart-sidebar");

const cartItems =
    document.getElementById("cart-items");

document
    .getElementById("open-cart")
    .addEventListener("click", () => {
        cartSidebar.classList.add("active");
    });

document
    .getElementById("close-cart")
    .addEventListener("click", () => {
        cartSidebar.classList.remove("active");
    });

function agregarAlCarrito(producto) {
    carrito.push(producto);

    renderCarrito();
    actualizarBotones();
    showNotification(
        `${producto.nombre} agregado al carrito`,
        "success"
    );
}

function quitarDelCarrito(nombreProducto) {
    const index = carrito.findIndex(
        producto => producto.nombre === nombreProducto
    );

    if (index !== -1) {
        carrito.splice(index, 1);

        renderCarrito();
        actualizarBotones();
        
        showNotification(
            `${nombreProducto} eliminado del carrito`,
            "warning"
        );
    }
}

function actualizarBotones() {
    document
        .querySelectorAll(".producto-card")
        .forEach(card => {

            const nombre =
                card.querySelector("h3").textContent.trim();

            const boton =
                card.querySelector(".btn-carrito");

            const existe = carrito.some(
                p => p.nombre.trim() === nombre
            );

            if (existe) {
                boton.textContent = "❌ Quitar";
                boton.classList.add("remove-mode");
            } else {
                boton.textContent = "🛒 Agregar";
                boton.classList.remove("remove-mode");
            }
        });
}

function renderCarrito() {

    if (!carrito.length) {

    cartItems.innerHTML =
        '<p class="empty-cart">Tu carrito está vacío</p>';

    document.getElementById(
        "cart-total"
    ).textContent = "Total: S/ 0";

    return;
}

    cartItems.innerHTML = "";

    let total = 0;

    carrito.forEach(producto => {

        total += Number(
            producto.precio
                .replace("S/", "")
                .replace(",", "")
                .trim()
        );

        cartItems.innerHTML += `
        <div class="cart-item">
            <h4>${producto.nombre}</h4>
            <p>${producto.precio}</p>

            <button
                class="remove-item"
                onclick="quitarDelCarrito('${producto.nombre}')">
                ❌ Quitar
            </button>
        </div>
        `;
    });

    document.getElementById(
        "cart-total"
    ).textContent =
        `Total: S/ ${total.toLocaleString()}`;
}