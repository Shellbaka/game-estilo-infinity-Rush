const pipe = document.querySelector('.pipe');
const mario = document.querySelector('.mario');
const botaoReiniciar = document.getElementById('botaoReiniciar'); // Alteração aqui: Selecionando o botão pelo ID
const clouds = document.querySelector('.clouds');

let jogoAtivo = true; // Variável de controle do estado do jogo
let nuvensAnimando = true; // Variável de controle da animação das nuvens

// Função para animação de salto do Mario
const leap = () => {
    if (!jogoAtivo) return; // Verifica se o jogo está ativo antes de permitir o salto
    mario.classList.add('Leap');

    setTimeout(() => {
        mario.classList.remove('Leap');
    }, 500);
}

// Loop principal do jogo
const loop = setInterval(() => {
    if (!jogoAtivo) return; // Verifica se o jogo está ativo antes de continuar

    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    // Condição de colisão
    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 120) {
        // Parar animações e exibir tela de game over
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = './imagens/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';

        botaoReiniciar.style.display = 'block';
        
        // Limpar o loop de jogo
        clearInterval(loop);

        // Desativa o jogo
        jogoAtivo = false;

        // Para a animação das nuvens
        if (nuvensAnimando) {
            clouds.style.animation = 'none';
            nuvensAnimando = false;
        }
    }
}, 10);

// ... Seu código JavaScript existente ...

// Função para incrementar a pontuação em 20 pontos a cada segundo
function aumentarPontuacao() {
    if (!jogoAtivo) return; // Verifica se o jogo está ativo antes de incrementar a pontuação
    pontuacao += 20;
    atualizarPlacar();
}
// ... Seu código JavaScript existente ...

// Inicializa o placar com zero
let pontuacao = 0;

// Função para atualizar o placar
function atualizarPlacar() {
    const scoreElement = document.querySelector('.score');
    scoreElement.textContent = pontuacao;
}

// Função para incrementar a pontuação em 20 pontos a cada segundo
function aumentarPontuacao() {
    pontuacao += 20;
    atualizarPlacar();
}

// Função para reiniciar o jogo
function reiniciar() {
    
    window.location.href = window.location.href;
    // Reinicia a pontuação
    pontuacao = 0;
    atualizarPlacar();
}

// Adiciona evento de clique ao botão de reinício
botaoReiniciar.addEventListener('click', reiniciar);

// Adiciona evento de salto quando uma tecla é pressionada
document.addEventListener('keydown', leap);

// Atualiza a pontuação a cada segundo (aumentando em 20 pontos)
setInterval(aumentarPontuacao, 1000);

// Chama a função para iniciar o placar
atualizarPlacar();
