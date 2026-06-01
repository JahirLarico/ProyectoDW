//Validaciones 
document
    .getElementById("purchase-form")
    .addEventListener("submit", e => {

        e.preventDefault();

        const telefono =
            document.getElementById("telefono").value;

        const tarjeta =
            document.getElementById("tarjeta").value;

        const cvv =
            document.getElementById("cvv").value;

        if (!/^\d{9}$/.test(telefono)) {
            alert(
                "El teléfono debe tener 9 dígitos"
            );
            return;
        }

        if (!/^\d{16}$/.test(tarjeta)) {
            alert(
                "La tarjeta debe tener 16 dígitos"
            );
            return;
        }

        if (!/^\d{3}$/.test(cvv)) {
            alert(
                "El CVV debe tener 3 dígitos"
            );
            return;
        }
        //Notifiacion
        showNotification(
            "Compra realizada correctamente",
            "success"
        );
        //Redireccionamiento
        setTimeout(() => {
            window.location.href = "../index.html";
        }, 2500);
    });