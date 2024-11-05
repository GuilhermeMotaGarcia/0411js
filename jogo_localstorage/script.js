// Seleciona os elementos HTML
const blackOption = document.getElementById('blackOption');
const whiteOption = document.getElementById('whiteOption');
const message = document.getElementById('message');
const historyList = document.getElementById('history');

// Recupera o histórico de escolhas do localStorage ou cria um array vazio se não existir
let choicesHistory = JSON.parse(localStorage.getItem('choicesHistory')) || [];

// Função para atualizar o histórico na interface
function updateHistory() {
    historyList.innerHTML = '';
    choicesHistory.forEach(choice => {
        const li = document.createElement('li');
        li.textContent = choice;
        historyList.appendChild(li);
    });
}

// Função para mover o botão "Branco" para uma posição aleatória dentro da tela
function moveWhiteButton() {
    const maxWidth = window.innerWidth - whiteOption.offsetWidth;
    const maxHeight = window.innerHeight - whiteOption.offsetHeight;

    const randomX = Math.random() * maxWidth; // Posição aleatória no eixo X
    const randomY = Math.random() * maxHeight; // Posição aleatória no eixo Y

    whiteOption.style.left = `${randomX}px`;
    whiteOption.style.top = `${randomY}px`;
}

// Função que lida com a escolha do jogador
function handleChoice(color) {
    if (color === 'Branco') {
        // Adiciona a escolha ao histórico e armazena no localStorage
        choicesHistory.push(`Escolheu a cor: ${color}`);
        localStorage.setItem('choicesHistory', JSON.stringify(choicesHistory));

        // Atualiza o histórico na interface
        updateHistory();

        // Exibe mensagem
        message.textContent = 'Você escolheu branco! Agora, o botão branco está fugindo de você!';
    }
}

// Adiciona eventos para os botões
blackOption.addEventListener('click', function() {
    choicesHistory.push('Escolheu a cor: Preto');
    localStorage.setItem('choicesHistory', JSON.stringify(choicesHistory));
    updateHistory();
    message.textContent = 'Você escolheu preto! O jogo acabou.';
});

whiteOption.addEventListener('click', function() {
    handleChoice('Branco');
});

// Adiciona um evento para o mouse se mover perto do botão branco
whiteOption.addEventListener('mouseover', function() {
    moveWhiteButton(); // Move o botão para uma nova posição aleatória
});

// Atualiza o histórico na interface
updateHistory();
