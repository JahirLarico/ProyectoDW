/*
    pago.js
    - loadData() ahora renderiza cada item del resumen con la clase
      .item (estilizada en pagoStyle.css). La grilla del layout
      (formulario + resumen) la hace Bootstrap en pago.html.
*/

const contenedor = document.getElementById("productos-resumen");
const totalTag = document.getElementById("total");

function loadData(productos) {
    if (!productos || productos.length === 0) {
        contenedor.innerHTML = `<p class="text-muted">No hay productos en el carrito</p>`;
        totalTag.textContent = "S/ 0";
        return;
    }

    productos.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("item");
        card.innerHTML = `
            <p class="mb-0">${producto.nombre}</p>
            <span class="fw-bold">S/ ${producto.precio}</span>
        `;
        contenedor.appendChild(card);
    });

    const total = productos.reduce(
        (acc, prod) => acc + Number(prod.precio),
        0
    );
    totalTag.textContent = `Total: S/ ${total.toLocaleString()}`;
}

loadData(carrito);

document.getElementById("purchase-form").addEventListener("submit", e => {
    e.preventDefault();

    const telefono = document.getElementById("telefono").value;
    const tarjeta = document.getElementById("tarjeta").value;
    const cvv = document.getElementById("cvv").value;

    if (!/^\d{9}$/.test(telefono)) {
        showNotification("El teléfono debe tener 9 dígitos", "error");
        return;
    }
    if (!/^\d{16}$/.test(tarjeta)) {
        showNotification("La tarjeta debe tener 16 dígitos", "error");
        return;
    }
    if (!/^\d{3}$/.test(cvv)) {
        showNotification("El CVV debe tener 3 dígitos", "error");
        return;
    }

    showNotification("Compra realizada correctamente", "success");
    localStorage.removeItem("carrito"); // limpiamos el carrito tras comprar
    setTimeout(() => { window.location.href = "../Index.html"; }, 2500);
});
