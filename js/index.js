/*
    index.js
    - Eliminado el toggle manual del menú: ahora lo maneja
      data-bs-toggle="collapse" del navbar de Bootstrap.
    - showProducts() genera cards con la estructura de la GRILLA
      de Bootstrap: cada producto va dentro de un <div class="col">
      para que row-cols-* del padre controle las columnas según
      el breakpoint (Mobile First).
*/

// Botón "Finalizar compra" dentro del offcanvas → ir a la página de pago
document
    .querySelector(".checkout-btn")
    .addEventListener("click", () => {
        window.location.href = "./pages/pago.html";
    });

const contenedor = document.getElementById("productos-destacados");
const buscador = document.getElementById("search-product");

buscador.addEventListener("input", e => {
    const texto = e.target.value.toLowerCase().trim();
    const resultados = productos.filter(
        producto => producto.nombre.toLowerCase().includes(texto)
    );
    showProducts(resultados);
    actualizarBotones();
});

function showProducts(listaProductos) {
    contenedor.innerHTML = "";

    listaProductos.forEach(producto => {

        // Cada card va dentro de un <div class="col"> para integrarse
        // con row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4
        const col = document.createElement("div");
        col.classList.add("col");

        const existe = carrito.some(p => p.nombre === producto.nombre);

        // .card / .card-body / .card-title son COMPONENTES de Bootstrap
        col.innerHTML = `
            <div class="card producto-card h-100">
                <img src="${producto.imagen}" alt="${producto.nombre}" class="card-img-top">
                <div class="card-body d-flex flex-column">
                    <h3 class="card-title">${producto.nombre}</h3>
                    <p class="precio mb-3">S/ ${producto.precio}</p>

                    <div class="acciones d-flex gap-2 mt-auto">
                        <button class="btn btn-carrito flex-fill ${existe ? 'remove-mode' : ''}">
                            ${existe ? '❌ Quitar' : '🛒 Agregar'}
                        </button>
                        <button class="btn btn-detalle flex-fill">👁 Ver</button>
                    </div>
                </div>
            </div>
        `;

        contenedor.appendChild(col);

        const btnCarrito = col.querySelector(".btn-carrito");
        const btnDetalle = col.querySelector(".btn-detalle");

        btnCarrito.addEventListener("click", () => {
            const yaEsta = carrito.some(p => p.nombre === producto.nombre);
            if (yaEsta) quitarDelCarrito(producto.nombre);
            else agregarAlCarrito(producto);
        });

        btnDetalle.addEventListener("click", () => openModal(producto));
    });
}

async function init() {
    await loadModal();
    showProducts(productos);
    actualizarBotones();
}

init();
