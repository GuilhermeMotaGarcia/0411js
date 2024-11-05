// Configuração inicial do jogo
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const gameOverScreen = document.getElementById('gameOver');
const scoreElement = document.getElementById('score');

const gridSize = 20; // Tamanho de cada bloco (segmento da cobra e maçã)
const canvasSize = 500; // Tamanho do canvas
let snake = [{ x: 10 * gridSize, y: 10 * gridSize }]; // Posição inicial da cobra
let direction = { x: gridSize, y: 0 }; // Direção inicial da cobra (movimento para a direita)
let food = generateFood(); // Posição inicial da comida
let score = 0;
let gameInterval;
let gameTime = 30; // Tempo de duração do jogo (em segundos)
let gameTimer;

// Recuperar pontuação da sessão
let storedScore = sessionStorage.getItem('score');
if (storedScore) {
    score = parseInt(storedScore);
}

// Função para gerar comida em uma posição aleatória
function generateFood() {
    return {
        x: Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize,
        y: Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize
    };
}

// Função de iniciar ou reiniciar o jogo
function startGame() {
    score = 0;
    snake = [{ x: 10 * gridSize, y: 10 * gridSize }];
    direction = { x: gridSize, y: 0 };
    food = generateFood();
    gameOverScreen.classList.add('hidden');
    sessionStorage.setItem('score', score); // Salvar pontuação inicial
    scoreElement.textContent = score;
    gameInterval = setInterval(gameLoop, 100);
    startTimer();
}

// Função que desenha a cobra e a comida
function draw() {
    ctx.clearRect(0, 0, canvasSize, canvasSize); // Limpa o canvas a cada quadro

    // Desenha a comida
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);

    // Desenha a cobra
    ctx.fillStyle = 'lime';
    for (let i = 0; i < snake.length; i++) {
        ctx.fillRect(snake[i].x, snake[i].y, gridSize, gridSize);
    }

    // Atualiza a pontuação na tela
    scoreElement.textContent = score;
}

// Função que move a cobra
function moveSnake() {
    const newHead = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    // Verifica se a cobra bateu nas bordas ou nela mesma
    if (
        newHead.x < 0 || newHead.x >= canvasSize ||
        newHead.y < 0 || newHead.y >= canvasSize ||
        snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)
    ) {
        clearInterval(gameInterval);
        clearInterval(gameTimer);
        gameOverScreen.classList.remove('hidden');
        sessionStorage.setItem('score', score); // Salva a pontuação final no sessionStorage
        return;
    }

    snake.unshift(newHead); // Adiciona o novo segmento da cabeça
    if (newHead.x === food.x && newHead.y === food.y) {
        score++; // Aumenta a pontuação
        food = generateFood(); // Gera uma nova comida
        sessionStorage.setItem('score', score); // Atualiza a pontuação no sessionStorage
    } else {
        snake.pop(); // Remove o último segmento (cauda) se não tiver comido
    }

    draw(); // Atualiza a tela
}

// Função principal do jogo
function gameLoop() {
    moveSnake();
}

// Função de controle do teclado
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' && direction.y === 0) {
        direction = { x: 0, y: -gridSize };
    } else if (e.key === 'ArrowDown' && direction.y === 0) {
        direction = { x: 0, y: gridSize };
    } else if (e.key === 'ArrowLeft' && direction.x === 0) {
        direction = { x: -gridSize, y: 0 };
    } else if (e.key === 'ArrowRight' && direction.x === 0) {
        direction = { x: gridSize, y: 0 };
    }
});

// Função para iniciar o cronômetro do jogo
function startTimer() {
    let timeLeft = gameTime;
    const timerElement = document.createElement('p');
    document.body.appendChild(timerElement);
    timerElement.textContent = `Tempo restante: ${timeLeft}s`;

    gameTimer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Tempo restante: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(gameTimer);
            clearInterval(gameInterval);
            gameOverScreen.classList.remove('hidden');
            gameOverScreen.querySelector('h1').textContent = 'Tempo esgotado!';
            sessionStorage.setItem('score', score); // Salva a pontuação final no sessionStorage
        }
    }, 1000);
}

// Função de reinício do jogo
function restartGame() {
    startGame();
}

// Inicia o jogo ao carregar a página
startGame();
