/*
    carrito.js
    - Eliminado el manejo manual de cartSidebar.classList.add('active'):
      ahora el carrito es un OFFCANVAS de Bootstrap y se abre/cierra
      con data-bs-toggle / data-bs-dismiss desde el HTML.
    - actualizarBotones() ahora busca el título dentro de .card-title
      (estructura nueva basada en .card de Bootstrap).
    - renderCarrito() usa .list-group de Bootstrap para los items.
*/

const carrito = getLclStrg("carrito") !== null ? getLclStrg("carrito") : [];
const cartItems = document.getElementById("cart-items");
const counter = carrito.length || 0;
function agregarAlCarrito(producto) {
    let productosLS = getLclStrg("carrito") === null
        ? []
        : JSON.parse(localStorage.getItem("carrito"));

    productosLS.push(producto);
    setLclStrg("carrito", JSON.stringify(productosLS));
    carrito.push(producto);

    renderCarrito();
    actualizarBotones();
    showNotification(`${producto.nombre} agregado al carrito`, "success");
}

function quitarDelCarrito(nombreProducto) {
    const index = carrito.findIndex(p => p.nombre === nombreProducto);
    if (index !== -1) {
        carrito.splice(index, 1);
        setLclStrg("carrito", JSON.stringify(carrito));
        if (carrito.length === 0) localStorage.removeItem("carrito") ;
        renderCarrito();
        actualizarBotones();
        showNotification(`${nombreProducto} eliminado del carrito`, "warning");
    }
}

function actualizarBotones() {
    document.querySelectorAll(".producto-card").forEach(card => {
        // Antes era card.querySelector("h3"). Mantenemos h3 porque
        // en la nueva card de Bootstrap el título sigue siendo <h3 class="card-title">.
        const tituloEl = card.querySelector(".card-title") || card.querySelector("h3");
        if (!tituloEl) return;
        const nombre = tituloEl.textContent.trim();

        const boton = card.querySelector(".btn-carrito");
        if (!boton) return;

        const existe = carrito.some(p => p.nombre.trim() === nombre);

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
    // Guarda: en pago.html no existe el offcanvas del carrito.
    // Sin esta verificación el script reventaría al cargarse en esa página.
    if (!cartItems) return;

    if (!carrito.length) {
        cartItems.innerHTML =
            '<p class="empty-cart text-center text-muted">Tu carrito está vacío</p>';
        document.getElementById("cart-total").textContent = "Total: S/ 0";
        document.getElementById("car-counter").textContent = 0;
        return;
    }

    cartItems.innerHTML = "";
    let total = 0;

    carrito.forEach(producto => {
        total += Number(
            producto.precio.toString().replace("S/", "").replace(",", "").trim()
        );

        // .cart-item con estilos propios (no necesitamos list-group para no romper el JS previo)
        cartItems.innerHTML += `
            <div class="cart-item">
                <h4>${producto.nombre}</h4>
                <p class="mb-1">S/ ${producto.precio}</p>
                <button class="remove-item btn btn-sm" onclick="quitarDelCarrito('${producto.nombre}')">
                    ❌ Quitar
                </button>
            </div>
        `;
    });

    document.getElementById("cart-total").textContent =
        `Total: S/ ${total.toLocaleString()}`;

        console.log(carrito.length)
    document.getElementById("car-counter").textContent = carrito.length !== 0 ? carrito.length : 0;
    // console.log(carrito.length)
}

renderCarrito();
