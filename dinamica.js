// script.js

document.getElementById('eventForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nomeJogo = document.getElementById('nomeJogo').value.trim();
    const message = document.getElementById('message');

    if (!nomeJogo) {
        message.textContent = 'Por favor, insira o nome do jogo.';
        message.style.color = '#ff4c4c'; // Cor para mensagem de erro
        return;
    }

    // Aqui você pode adicionar a lógica para buscar o preço do jogo ou qualquer outra ação necessária.

    message.textContent = `Buscando preço para o jogo "${nomeJogo}"...`;
    message.style.color = 'white';

    // Limpar o formulário após o sucesso (opcional)
    document.getElementById('eventForm').reset();
});
