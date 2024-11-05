// Seleciona o campo de entrada onde o usuário insere seu palpite
const guessInput = document.getElementById('guess');

// Seleciona o botão que o usuário clica para enviar o palpite
const submitButton = document.getElementById('submit');

// Seleciona o elemento onde mensagens de feedback serão exibidas
const message = document.getElementById('message');

// Seleciona a lista onde o histórico de tentativas será mostrado
const historyList = document.getElementById('history');

// Gera um número aleatório entre 1 e 100 e o armazena na variável randomNumber
let randomNumber = Math.floor(Math.random() * 100) + 1;

// Recupera o histórico de tentativas do localStorage, ou inicia um array vazio se não houver tentativas armazenadas
let attempts = JSON.parse(localStorage.getItem('attempts')) || [];

// Função para atualizar a lista de tentativas anteriores na interface
function updateHistory() {
    // Limpa a lista de tentativas antes de atualizá-la
    historyList.innerHTML = '';
    
    // Para cada tentativa registrada, cria um novo item de lista e o adiciona à lista
    attempts.forEach(attempt => {
        const li = document.createElement('li'); // Cria um novo elemento de lista
        li.textContent = attempt; // Define o texto do item como a tentativa
        historyList.appendChild(li); // Adiciona o item à lista de histórico
    });
}

// Função que lida com a lógica do jogo quando o usuário envia um palpite
function handleGuess() {
    // Converte o valor do campo de entrada para um número inteiro
    const guess = parseInt(guessInput.value);
    
    // Verifica se o palpite é um número válido entre 1 e 100
    if (isNaN(guess) || guess < 1 || guess > 100) {
        message.textContent = 'Por favor, insira um número válido entre 1 e 100.'; // Mensagem de erro
        return; // Sai da função se o palpite não for válido
    }

    // Adiciona o palpite ao histórico de tentativas
    attempts.push(guess);
    
    // Armazena o histórico atualizado no localStorage
    localStorage.setItem('attempts', JSON.stringify(attempts));
    
    // Atualiza a lista de tentativas na interface
    updateHistory();

    // Compara o palpite do usuário com o número gerado
    if (guess === randomNumber) {
        message.textContent = 'Parabéns! Você acertou!'; // Mensagem de vitória
        // Reiniciar o jogo
        randomNumber = Math.floor(Math.random() * 100) + 1; // Gera um novo número aleatório
        attempts = []; // Limpa o histórico de tentativas
        localStorage.removeItem('attempts'); // Remove o histórico do localStorage
    } else if (guess < randomNumber) {
        message.textContent = 'Tente um número maior.'; // Indica que o palpite foi muito baixo
    } else {
        message.textContent = 'Tente um número menor.'; // Indica que o palpite foi muito alto
    }

    // Limpa o campo de entrada após cada palpite
    guessInput.value = '';
}

// Adiciona um evento ao botão para chamar a função handleGuess quando clicado
submitButton.addEventListener('click', handleGuess);

// Atualiza a lista de tentativas quando a página é carregada
updateHistory();
