document.getElementById('eventForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message');

    if (!email) {
        message.textContent = 'Por favor, insira seu email.';
        message.style.color = '#ff4c4c'; // Cor para mensagem de erro
        return;
    }

    // Aqui você pode adicionar a lógica para enviar o email para o servidor ou outra ação necessária.

    message.textContent = `Email ${email} cadastrado com sucesso!`;
    message.style.color = 'white';

    // Limpar o formulário após o sucesso (opcional)
    document.getElementById('eventForm').reset();
});
