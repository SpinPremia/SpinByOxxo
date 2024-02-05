document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
        document.querySelector(".container-bienvenida img").classList.add("show");
    }, 100);
});

function comenzarEncuesta() {
    window.location.href = "encuesta.html";
}