document.getElementById('eventForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message');

    if (!email) {
        message.textContent = 'Por favor, insira seu email.';
        message.style.color = '#ff4c4c'; // Cor para mensagem de erro
        return;
    }

    fetch('http://node-container:3000/notify', { // Certifique-se de que o servidor está rodando na porta correta
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            evento: 'Cadastro de email para notificação'
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro na resposta do servidor');
        }
        return response.text();
    })
    .then(result => {
        message.textContent = result;
        message.style.color = 'white';
    })
    .catch(error => {
        console.error('Erro:', error); // Adiciona logging para debugging
        message.textContent = 'Erro ao enviar notificação.';
        message.style.color = '#ff4c4c'; // Cor para mensagem de erro
    });
});
