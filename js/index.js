const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active");
});

document
    .querySelector(".checkout-btn")
    .addEventListener("click", () => {

        window.location.href =
            "./pages/pago.html";

    });


const contenedor = document.getElementById("productos-destacados");

const buscador =
    document.getElementById("search-product");

buscador.addEventListener("input", e => {

    const texto =
        e.target.value.toLowerCase().trim();

    const resultados = productos.filter(
        producto =>
            producto.nombre
                .toLowerCase()
                .includes(texto)
    );

    showProducts(resultados);
    actualizarBotones();
});

function showProducts(listaProductos) {

    contenedor.innerHTML = "";

    listaProductos.forEach(producto => {

        const card = document.createElement("div");

        card.classList.add("producto-card");

        const existe = carrito.some(
            p => p.nombre === producto.nombre
        );

        card.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p class="precio">S/ ${producto.precio}</p>

            <div class="acciones">
                <button class="btn-carrito ${existe ? 'remove-mode' : ''}">
                    ${existe ? '❌ Quitar' : '🛒 Agregar'}
                </button>

                <button class="btn-detalle">
                    👁 Ver
                </button>
            </div>
        `;

        contenedor.appendChild(card);

        const btnCarrito = card.querySelector(".btn-carrito");
        const btnDetalle = card.querySelector(".btn-detalle");

        btnCarrito.addEventListener("click", () => {

            const existe = carrito.some(
                p => p.nombre === producto.nombre
            );

            if (existe) {
                quitarDelCarrito(producto.nombre);
            } else {
                agregarAlCarrito(producto);
            }
        });

        btnDetalle.addEventListener("click", () => {
            openModal(producto);
        });
    });
}

async function init() {
    await loadModal();

    showProducts(productos);
    actualizarBotones();
}

init();



