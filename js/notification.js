function showNotification(message, type = "success") {
    let container = document.getElementById("notification-container");

    // Revisar si no existe el contenedor
    if (!container) {
        container = document.createElement("div");
        container.id = "notification-container";

        container.style.position = "fixed";
        container.style.top = "20px";
        container.style.right = "20px";
        container.style.display = "flex";
        container.style.flexDirection = "column";
        container.style.gap = "10px";
        container.style.zIndex = "9999";

        document.body.appendChild(container);
    }

    const notification = document.createElement("div");
    notification.classList.add("notification", type);
    notification.textContent = message;

    container.appendChild(notification);

    setTimeout(() => {
        notification.classList.add("hide");

        notification.addEventListener("animationend", () => {
            notification.remove();
        });
    }, 2000);
}