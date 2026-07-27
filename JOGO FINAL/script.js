// Script principal do jogo Mario Bros - PRODERJ Adventures
document.addEventListener("DOMContentLoaded", function() {
    // Variáveis globais
     const telaInicial = document.getElementById("tela-inicial");
    const telaJogo = document.getElementById("tela-jogo");
    const modalRegras = document.getElementById("modal-regras");
    let vidas = 4;
const totalVidas = 4;
// Pontos descontados a cada vida perdida (bater em obstáculo ou errar pergunta)
const PENALIDADE_POR_VIDA = 150;
// Bônus por completar todos os 10 checkpoints
const BONUS_CONCLUSAO = 500;
let tempoInicioJogo = 0;
let tempoFimJogo = 0;
    let Mario;
    let pontuacao = 0;   // placar mostrado (sobe jogando, cai ao perder vida)
    let distancia = 0;   // progresso interno que dispara os checkpoints (só sobe)
    let checkpointAtual = 0;
    let checkpoints = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
    let jogoAtivo = false;
    let ultimoCheckpoint = 0;
    let intervaloPontuacao;
    let intervaloColisao;
    let velocidadeJogo = 2.5;
    let perguntaAtiva = false;
    let imunidadeAtiva = false;
    let tempoImunidade = 3000;
    let perguntasUsadas = [];
    let obstaculosAtivos = [];
    let faseAtual = 1;
    let nomeUsuario = "";
    let tentativas = 0;
    let jogoPausado = false;
let intervaloObstaculos = null;
    // Instância do RankingManager
    let rankingManager = null;

    // Configurações de velocidade
    const velocidadesPorCheckpoint = [2.5, 2.3, 2.1, 1.9, 1.7, 1.5, 1.3, 1.1, 1.0, 0.9];

    // Tipos de obstáculos
    const tiposObstaculos = {
        CANO_BAIXO: "cano-baixo",
        CANO_MEDIO: "cano-medio",
        CANO_ALTO: "cano-alto"
    };

    function criarAnimacaoVitoria() {
    const telaVitoria = document.createElement('div');
    telaVitoria.className = 'tela-vitoria';
    telaVitoria.id = 'tela-vitoria';

    // Cálculo da pontuação final — usa a MESMA fórmula da morte, para ser consistente
    let tempoTotal = Math.floor((tempoFimJogo - tempoInicioJogo) / 1000);
    let vidasPerdidas = totalVidas - vidas;
    const pontuacaoFinal = calcularPontuacao();

    telaVitoria.innerHTML = `
        <div class="mensagem-vitoria">
            <h2>PARABÉNS!</h2>
            <p>Você completou todos os 10 checkpoints!</p>
            <p>Tempo: ${tempoTotal} segundos</p>
            <p>Vidas perdidas: ${vidasPerdidas}</p>
            <p><strong>Pontuação final: ${pontuacaoFinal}</strong></p>
            <button id="btn-vitoria" class="btn-vitoria">Voltar ao Menu</button>
        </div>
    `;

    document.body.appendChild(telaVitoria);

    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = -10 + 'px';
        confetti.style.animationDelay = Math.random() * 3 + 's';
        telaVitoria.appendChild(confetti);
    }

    telaVitoria.style.display = 'flex';

    document.getElementById('btn-vitoria').addEventListener('click', voltarAoMenu);
}

function verificarVitoria() {
    if (checkpointAtual >= 10) {
        pararJogo();
        tempoFimJogo = Date.now();
        const pontuacaoFinal = calcularPontuacao();
        criarAnimacaoVitoria();

        // Registrar pontuação usando pontuacaoFinal
        if (usuarioId) {
            API.registrarPontuacaoLocal(usuarioId, pontuacaoFinal, checkpointAtual, faseAtual)
                .then(() => {
                    if (rankingManager) {
                        rankingManager.atualizarRanking();
                    }
                });
        }
    }
}

    // Configuração de fases
    const configFases = [
        {}, // Índice 0 não usado
        { // Fase 1 (checkpoints 1-5)
            obstaculos: [tiposObstaculos.CANO_BAIXO],
            probabilidades: [100],
            intervaloMin: 2000,
            intervaloMax: 3000
        },
        { // Fase 2 (checkpoints 6-10)
            obstaculos: [tiposObstaculos.CANO_BAIXO, tiposObstaculos.CANO_MEDIO],
            probabilidades: [60, 40],
            intervaloMin: 1800,
            intervaloMax: 2800
        },
        { // Fase 3 (após checkpoint 10)
            obstaculos: [tiposObstaculos.CANO_BAIXO, tiposObstaculos.CANO_MEDIO, tiposObstaculos.CANO_ALTO],
            probabilidades: [40, 40, 20],
            intervaloMin: 1600,
            intervaloMax: 2600
        }
    ];

    // Inicialização
    inicializarEventos();
    inicializarRanking(); // Inicializa o ranking na carga inicial

    function inicializarRanking() {
        if (!rankingManager) {
            rankingManager = new RankingManager("ranking-lista");
        }
        rankingManager.inicializar();
    }

    function inicializarEventos() {
        document.getElementById("btn-comecar").addEventListener("click", iniciarJogoComNome);
        document.getElementById("btn-regras").addEventListener("click", abrirRegras);
        document.getElementById("fechar-regras").addEventListener("click", fecharRegras);

        document.getElementById("btn-pause").addEventListener("click", togglePause);
        document.getElementById("btn-continuar").addEventListener("click", togglePause);
        document.getElementById("btn-voltar-menu-pause").addEventListener("click", voltarAoMenu);

        // Eventos de teclado e toque
        document.addEventListener("keydown", function(event) {
            if (event.code === "Space" && jogoAtivo && !perguntaAtiva) {
                event.preventDefault();
                pular();
            }
        });
        document.getElementById("btn-pause").addEventListener("click", function() {
        if (jogoAtivo && !perguntaAtiva) {
            togglePause();
        }
    });
    
    document.getElementById("btn-continuar").addEventListener("click", function() {
        if (!jogoAtivo && !perguntaAtiva) {
            togglePause();
        }
    });
    
    document.getElementById("btn-voltar-menu-pause").addEventListener("click", function() {
        togglePause(); // Despausa antes de voltar ao menu
        voltarAoMenu();
    });

        document.addEventListener("click", function(event) {
    // Elementos que não devem disparar o pulo quando clicados
    const elementosExcluidos = [
        "btn-pause",
        "btn-continuar",
        "btn-voltar-menu-pause",
        "btn-reiniciar",
        "btn-checkpoint",
        "btn-voltar-menu",
        "input-nome",
        "btn-comecar",
        "btn-regras",
        "fechar-regras"
    ];
    
    // Verifica se o clique foi em um elemento excluído ou em seus filhos
    let elementoClicado = event.target;
    let devePular = true;
    
    while (elementoClicado) {
        if (elementosExcluidos.includes(elementoClicado.id) || 
            elementoClicado.classList.contains('opcao-btn') ||
            elementoClicado.classList.contains('btn-pause')) {
            devePular = false;
            break;
        }
        elementoClicado = elementoClicado.parentElement;
    }
    
    // Verifica também se o clique foi no ranking
    const rankingContainer = document.getElementById("ranking-container");
    if (rankingContainer && rankingContainer.contains(event.target)) {
        devePular = false;
    }
    
    // Verifica se o clique foi no painel de pause
    const painelPause = document.getElementById("painel-pause");
    if (painelPause && painelPause.contains(event.target)) {
        devePular = false;
    }
    
    // Apenas pula se todas as condições forem atendidas
    if (jogoAtivo && !perguntaAtiva && devePular) {
        pular();
    }
});
    }

   function togglePause() {
    if (perguntaAtiva) return;

    const painelPause = document.getElementById("painel-pause");
    const estaPausado = painelPause.style.display === "flex";

    if (estaPausado) {
        painelPause.style.display = "none";
        jogoAtivo = true;
        jogoPausado = false;

        document.querySelectorAll(".obstaculo").forEach(obstaculo => {
            obstaculo.getAnimations().forEach(animacao => animacao.play());
        });

        intervaloPontuacao = setInterval(atualizarPontuacao, 100);
        intervaloColisao = setInterval(verificarColisao, 20);
        agendarProximoObstaculo();

    } else {
        painelPause.style.display = "flex";
        jogoAtivo = false;
        jogoPausado = true;

        document.querySelectorAll(".obstaculo").forEach(obstaculo => {
            obstaculo.getAnimations().forEach(animacao => animacao.pause());
        });

        clearInterval(intervaloPontuacao);
        clearInterval(intervaloColisao);
        cancelarGeracaoObstaculos();
    }
}

    function abrirRegras() {
        modalRegras.style.display = "flex";
    }

    function fecharRegras() {
        modalRegras.style.display = "none";
    }

    async function iniciarJogoComNome() {
        const inputNome = document.getElementById("input-nome");
        nomeUsuario = inputNome.value.trim();

        if (nomeUsuario.length < 3) {
            alert("Por favor, digite um nome com pelo menos 3 caracteres.");
            return;
        }

        // Registrar usuário e obter ID
        try {
            const dadosUsuario = await API.registrarUsuarioLocal(nomeUsuario);
            usuarioId = dadosUsuario.id;
            tentativas = dadosUsuario.tentativas;
            // Atualizar ranking para destacar o usuário atual (se necessário)
            // rankingManager.setUsuario({ id: usuarioId, nome: nomeUsuario }); // Descomentar se quiser destacar
            // await rankingManager.atualizarRanking(); 
        } catch (error) {
            console.error("Erro ao registrar usuário:", error);
            alert("Erro ao registrar usuário. Tente novamente.");
            return;
        }

        telaInicial.style.display = "none";
        telaJogo.style.display = "block";
        // Incrementar tentativas via API (se necessário, mas já feito no registrar)
        // await API.registrarTentativaLocal(usuarioId);
        inicializarElementosJogo();
        iniciarJogo();
    }

    // Função incrementarTentativas removida, pois a lógica está em registrarUsuarioLocal
      function incrementarTentativas() {
        const dadosUsuario = JSON.parse(localStorage.getItem(`usuario_${nomeUsuario}`)) || { tentativas: 0 };
        dadosUsuario.tentativas++;
        localStorage.setItem(`usuario_${nomeUsuario}`, JSON.stringify(dadosUsuario));
        tentativas = dadosUsuario.tentativas;
    }

    function inicializarElementosJogo() {
        Mario = document.querySelector(".Mario");
        if (!Mario) {
            console.error("Elemento Mario não encontrado!");
            return; // Impede a continuação se Mario não for encontrado
        }
        Mario.style.width = "200px"; // Garante tamanho fixo
        Mario.style.bottom = "0";
        Mario.style.left = "50px";

        // Limpar obstáculos antigos
        document.querySelectorAll(".obstaculo").forEach(el => el.remove());

        // Criar painéis de UI
        criarPainelPontuacao();
        criarPainelGameOver();
        criarPainelPerguntas();
    }

    function criarPainelPontuacao() {
        const painelExistente = document.querySelector(".painel-pontuacao");
        if (painelExistente) painelExistente.remove();

        const painelPontuacao = document.createElement("div");
        painelPontuacao.className = "painel-pontuacao";
        painelPontuacao.innerHTML = `
            <div>Pontuação: <span id="contador-pontuacao">0</span></div>
            <div>Checkpoint: <span id="contador-checkpoint">0/10</span></div>
             <div> <span id="contador-fase"></span></div>
            <div class="vidas-container">Vidas: <span id="contador-vidas">${"❤️".repeat(totalVidas)}</span></div>
            <div class="checkpoint-bar-container">
                <div class="checkpoint-bar" id="checkpoint-bar"></div>
            </div>
        `;
        telaJogo.appendChild(painelPontuacao);
 
    }

    function atualizarVidasUI() {
        const contadorVidas = document.getElementById("contador-vidas");
        if (contadorVidas) {
            contadorVidas.innerHTML = "❤️".repeat(vidas) + "♡".repeat(totalVidas - vidas);
        }
    }

    function atualizarBarraCheckpoint() {
        if (checkpointAtual >= 10) return;

        const proximoCheckpoint = checkpoints[checkpointAtual];
        const progresso = (distancia - (checkpointAtual > 0 ? checkpoints[checkpointAtual - 1] : 0)) /
                         (proximoCheckpoint - (checkpointAtual > 0 ? checkpoints[checkpointAtual - 1] : 0));

        const barra = document.getElementById("checkpoint-bar");
        if (barra) {
             barra.style.width = `${Math.min(100, progresso * 100)}%`;
        }
    }

   function criarPainelGameOver() {
        const painelExistente = document.querySelector(".painel-game-over");
        if (painelExistente) painelExistente.remove();
        
        const painelGameOver = document.createElement("div");
        painelGameOver.className = "painel-game-over";
        painelGameOver.style.display = "none";
        painelGameOver.innerHTML = `
            <h2>Game Over</h2>
            <p>Pontuação: <span id="pontuacao-final">0</span></p>
            <div id="animacao-game-over" class="animacao-game-over"></div>
            <button id="btn-reiniciar">Reiniciar</button>
            <button id="btn-checkpoint" style="display: none;">Continuar do Checkpoint</button>
            <button id="btn-voltar-menu">Menu Principal</button>
        `;
        telaJogo.appendChild(painelGameOver);
        
        document.getElementById("btn-reiniciar").addEventListener("click", reiniciarJogo);
        document.getElementById("btn-checkpoint").addEventListener("click", continuarDoCheckpoint);
        document.getElementById("btn-voltar-menu").addEventListener("click", voltarAoMenu);
    }

    function criarPainelPerguntas() {
        const painelExistente = document.querySelector(".painel-perguntas");
        if (painelExistente) painelExistente.remove();

        const painelPerguntas = document.createElement("div");
        painelPerguntas.className = "painel-perguntas";
        painelPerguntas.style.display = "none";
        painelPerguntas.innerHTML = `
            <h2>Checkpoint!</h2>
            <div class="pergunta-container">
                <p id="pergunta-texto">Pergunta aparecerá aqui</p>
                <div id="opcoes-container"></div>
            </div>
        `;
        telaJogo.appendChild(painelPerguntas);
    }

   function voltarAoMenu() {
    pararJogo();
    telaJogo.style.display = "none";
    telaInicial.style.display = "block";
    
    // Remover tela de vitória se existir
    const telaVitoria = document.getElementById('tela-vitoria');
    if (telaVitoria) {
        telaVitoria.remove();
    }
    
    inicializarRanking(); // Atualiza o ranking ao voltar para o menu
}

    function iniciarJogo() {
        // Resetar variáveis
    pontuacao = 0;
    distancia = 0;
    checkpointAtual = 0;
    ultimoCheckpoint = 0;
    faseAtual = 1;
    jogoAtivo = true;
    perguntaAtiva = false;
    imunidadeAtiva = false;
    perguntasUsadas = [];
    obstaculosAtivos = [];
    vidas = totalVidas;
    tempoInicioJogo = Date.now();

    // Garantir que o painel de pause está escondido
    document.getElementById("painel-pause").style.display = "none";
// Reset Mario
    Mario.src = "imagens/battlebot_run.gif";
    Mario.style.width = "200px";
    Mario.style.bottom = "0";
    Mario.style.left = "50px";
    Mario.classList.remove("pulo", "imunidade");

        // Update UI
    document.getElementById("contador-pontuacao").textContent = "0";
    document.getElementById("contador-checkpoint").textContent = "0/10";
    document.getElementById("contador-fase").textContent = "";
    document.querySelector(".painel-game-over").style.display = "none";
    atualizarVidasUI();
    const painelGameOver = document.querySelector(".painel-game-over");
        if (painelGameOver) painelGameOver.style.display = "none";
        atualizarVidasUI();
        atualizarBarraCheckpoint(); // Resetar barra

// Limpar intervalos antigos
clearInterval(intervaloPontuacao);
clearInterval(intervaloColisao);
cancelarGeracaoObstaculos(); // novo método

// Iniciar loops do jogo
intervaloPontuacao = setInterval(atualizarPontuacao, 100);
intervaloColisao = setInterval(verificarColisao, 20);
iniciarGeracaoObstaculos();
    }

    function pararJogo() {
    jogoAtivo = false;
    clearInterval(intervaloPontuacao);
    clearInterval(intervaloColisao);
    cancelarGeracaoObstaculos(); // novo método

    // Não pausar animações se estivermos no modo pause
    if (document.getElementById("painel-pause").style.display !== "flex") {
        document.querySelectorAll(".obstaculo").forEach(obstaculo => {
            const animacao = obstaculo.getAnimations()[0];
            if (animacao) animacao.pause();
        });
    }
}


    function reiniciarJogo() {
        pararJogo();
        const painelGameOver = document.querySelector(".painel-game-over");
        if (painelGameOver) painelGameOver.style.display = "none";
        document.querySelectorAll(".obstaculo").forEach(el => el.remove());
        iniciarJogo();
    }

    function continuarDoCheckpoint() {
    pararJogo();
    document.querySelector(".painel-game-over").style.display = "none";
    document.querySelectorAll(".obstaculo").forEach(el => el.remove());
    
    // Continuar do último checkpoint
    pontuacao = ultimoCheckpoint;
    distancia = ultimoCheckpoint;
    faseAtual = checkpointAtual + 1;
    atualizarDisplayPontuacao();
    //document.getElementById("contador-fase").textContent = faseAtual;
    
    // Resetar o estado do personagem
    Mario.src = "imagens/battlebot_run.gif"; // Volta para a imagem de corrida
    Mario.style.width = "200px";
    Mario.style.bottom = "0";
    Mario.classList.remove("pulo", "imunidade");
    
    jogoAtivo = true;
    perguntaAtiva = false;
    
    // Reiniciar loops do jogo
    intervaloPontuacao = setInterval(atualizarPontuacao, 100);
    intervaloColisao = setInterval(verificarColisao, 20);
    iniciarGeracaoObstaculos();
    iniciarGeracaoObstaculos();
    
    // Dar imunidade ao continuar
    ativarImunidade(tempoImunidade);
}

    function atualizarPontuacao() {
    if (!jogoAtivo || perguntaAtiva) return;

    pontuacao++;   // placar sobe
    distancia++;   // progresso sobe
    atualizarDisplayPontuacao();
    atualizarBarraCheckpoint();

    // Verificar checkpoint (a cada 100 de progresso)
    if (checkpoints.includes(distancia)) {
        checkpointAtual = checkpoints.indexOf(distancia) + 1;
        ultimoCheckpoint = distancia;
        document.getElementById("contador-checkpoint").textContent = `${checkpointAtual}/10`;
        atingirCheckpoint();
        
        // Verificar se completou todos os checkpoints
        verificarVitoria();
    
    }

    // Atualizar fase 
    const novaFase = Math.floor(checkpointAtual / 1) + 1;
    if (novaFase > faseAtual && novaFase <= 10) {
        faseAtual = novaFase;
        atualizarVelocidadeJogo();
    }

}

    function atingirCheckpoint() {
        pararJogo();
        perguntaAtiva = true;
        mostrarPergunta();
    }

    function mostrarPergunta() {
        const perguntasDoNivel = perguntasProderj.filter(p => p.nivel <= checkpointAtual && !perguntasUsadas.includes(perguntasProderj.indexOf(p)));
        
        if (perguntasDoNivel.length === 0) {
            // Resetar perguntas usadas se não houver mais perguntas disponíveis
            perguntasUsadas = perguntasUsadas.filter(idx => perguntasProderj[idx].nivel > checkpointAtual);
        }
        
        const pergunta = perguntasDoNivel.length > 0 
            ? perguntasDoNivel[Math.floor(Math.random() * perguntasDoNivel.length)]
            : perguntasProderj[Math.floor(Math.random() * perguntasProderj.length)];
        
        perguntasUsadas.push(perguntasProderj.indexOf(pergunta));
        
        document.getElementById("pergunta-texto").textContent = pergunta.pergunta;
        const opcoesContainer = document.getElementById("opcoes-container");
        opcoesContainer.innerHTML = "";
        
        pergunta.opcoes.forEach((opcao, index) => {
            const botao = document.createElement("button");
            botao.className = "opcao-btn";
            botao.textContent = opcao;
            botao.dataset.index = index;
            botao.addEventListener("click", () => verificarResposta(index, pergunta.resposta));
            opcoesContainer.appendChild(botao);
        });
        document.querySelector(".painel-perguntas").style.display = "flex";
    }

     function verificarResposta(respostaUsuario, respostaCorreta) {
    const botoes = document.querySelectorAll(".opcao-btn");
    botoes.forEach(botao => {
        botao.disabled = true;
        const index = parseInt(botao.dataset.index);
        if (index === respostaCorreta) {
            botao.classList.add("resposta-correta");
        } else if (index === respostaUsuario && respostaUsuario !== respostaCorreta) {
            botao.classList.add("resposta-incorreta");
        }
    });

    if (respostaUsuario === respostaCorreta) {
        setTimeout(() => {
            document.querySelector(".painel-perguntas").style.display = "none";
            jogoAtivo = true;
            perguntaAtiva = false;
            intervaloPontuacao = setInterval(atualizarPontuacao, 100);
            intervaloColisao = setInterval(verificarColisao, 20);
            iniciarGeracaoObstaculos();
            ativarImunidade(tempoImunidade);
        }, 1500);
    } else {
        // Adicionar animação de perder vida ao errar pergunta
        criarAnimacaoPerderVida();
        
        // Tremor na tela
        telaJogo.classList.add('tela-tremendo');
        setTimeout(() => telaJogo.classList.remove('tela-tremendo'), 300);
        
        vidas--;
        atualizarVidasUI();
        pontuacao = Math.max(0, pontuacao - PENALIDADE_POR_VIDA); // desconta ao errar a pergunta
        atualizarDisplayPontuacao();

        if (vidas <= 0) {
            setTimeout(() => {
                document.querySelector(".painel-perguntas").style.display = "none";
                gameOver();
            }, 1500);
        } else {
            setTimeout(() => {
                // Show new question if still has lives
                mostrarPergunta();
            }, 1500);
        }
    }
}

function atualizarVidasUI() {
    const vidasContainer = document.querySelector(".vidas-container");
    if (vidasContainer) {
        vidasContainer.innerHTML = `Vidas: ${'❤️'.repeat(vidas)}${'♡'.repeat(totalVidas - vidas)}`;
    }
}


    function verificarColisao() {
    if (!jogoAtivo || perguntaAtiva || imunidadeAtiva) return;
    
    const marioRect = Mario.getBoundingClientRect();
    const marioBottom = parseInt(window.getComputedStyle(Mario).getPropertyValue("bottom"));
    
    document.querySelectorAll(".obstaculo").forEach(obstaculo => {
        const obstaculoRect = obstaculo.getBoundingClientRect();
        
        const margemHorizontal = 100;
        const margemVertical = 5;
        
        const estaAcima = marioBottom > obstaculoRect.height - margemVertical;
        const colisaoHorizontal = (
            marioRect.right > obstaculoRect.left + margemHorizontal && 
            marioRect.left < obstaculoRect.right - margemHorizontal
        );
        
        if (colisaoHorizontal && !estaAcima) {
            // Animação de perder vida
            criarAnimacaoPerderVida();
            
            // Tremor na tela
            telaJogo.classList.add('tela-tremendo');
            setTimeout(() => telaJogo.classList.remove('tela-tremendo'), 300);
            
            vidas--;
            atualizarVidasUI();
            pontuacao = Math.max(0, pontuacao - PENALIDADE_POR_VIDA); // desconta ao bater no obstáculo
            atualizarDisplayPontuacao();
            obstaculo.remove();
            
            if (vidas <= 0) {
                gameOver();
            } else {
                ativarImunidade(1000);
            }
        }
    });
}

function criarAnimacaoPerderVida() {
    const animacao = document.createElement('div');
    animacao.className = 'animacao-perder-vida';
    
    const mensagem = document.createElement('div');
    mensagem.className = 'mensagem-perder-vida';
    mensagem.textContent = `-1 VIDA!`;
    animacao.appendChild(mensagem);
    
    document.body.appendChild(animacao);
    
    setTimeout(() => {
        animacao.remove();
    }, 1000);
}

function pular() {
    if (!jogoAtivo || perguntaAtiva || Mario.classList.contains("pulo")) return;
    
    Mario.classList.add("pulo");
    
    // Reset da posição vertical antes do pulo
    Mario.style.bottom = "0";
    
    // Força um reflow para garantir que a animação reinicie
    void Mario.offsetWidth;
    
    // Aplica a animação de pulo
    const puloAnimacao = Mario.animate([
        { bottom: '0', easing: 'ease-out' },
        { bottom: '250px', easing: 'ease-in' },
        { bottom: '0', easing: 'ease-in' }
    ], {
        duration: 800,
        fill: 'forwards'
    });
    
    puloAnimacao.onfinish = () => {
        Mario.classList.remove("pulo");
        Mario.style.bottom = "0"; // Garante que volte exatamente ao chão
    };
}

    async function gameOver(motivo = "") {
        pararJogo();
        tempoFimJogo = Date.now();
        Mario.src = "imagens/game over robo.png"; // Imagem de game over
        Mario.style.width = "150px"; // Ajustar tamanho se necessário
        Mario.style.bottom = "0"; // Garantir que esteja no chão

        const painelGameOver = document.querySelector(".painel-game-over");
       const pontuacaoFinal = calcularPontuacao(); // calcular antes de usar
       document.getElementById("pontuacao-final").textContent = pontuacaoFinal;
        if (painelGameOver) painelGameOver.style.display = "flex";

        // Animação de game over
        const animacaoContainer = document.getElementById("animacao-game-over");
        animacaoContainer.innerHTML = `
            <img src="imagens/game over robo.png" class="img-game-over">
            <div class="texto-game-over">Fim de Jogo!</div>
        `;

        // Registrar pontuação
        if (usuarioId) {
            try {
                await API.registrarPontuacaoLocal(usuarioId, pontuacaoFinal, checkpointAtual, faseAtual);
                // Atualizar ranking imediatamente após registrar pontuação
                if (rankingManager) {
                    await rankingManager.atualizarRanking();
                }
            } catch (error) {
                console.error("Erro ao registrar pontuação:", error);
            }
        }
    }

    function formatarTempo(segundos) {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    return `${minutos}:${segundosRestantes.toString().padStart(2, '0')}`;
}

    function ativarImunidade(duracao) {
        if (imunidadeAtiva) return;
        
        imunidadeAtiva = true;
        Mario.classList.add("imunidade");
        
        setTimeout(() => {
            imunidadeAtiva = false;
            Mario.classList.remove("imunidade");
        }, duracao);
    }
    let timeoutObstaculo = null;
function criarObstaculo() {
    const config = configFases[Math.min(faseAtual, configFases.length - 1)] || configFases[1];
    const tipoObstaculo = escolherObstaculoAleatorio(config.obstaculos, config.probabilidades);
    
    const obstaculo = document.createElement("img");
    obstaculo.src = "imagens/pipe.png";
    obstaculo.className = `obstaculo ${tipoObstaculo}`;
    obstaculo.style.right = "-80px";
    obstaculo.style.bottom = "0";

    if (tipoObstaculo === tiposObstaculos.CANO_MEDIO) {
        obstaculo.style.height = "120px";
    } else if (tipoObstaculo === tiposObstaculos.CANO_ALTO) {
        obstaculo.style.height = "150px";
    } else {
        obstaculo.style.height = "100px";
    }

    telaJogo.appendChild(obstaculo);

    const animacao = obstaculo.animate([
        { right: "-80px" },
        { right: "100%" }
    ], {
        duration: velocidadeJogo * 1000,
        easing: "linear"
    });

    animacao.onfinish = () => obstaculo.remove();
}

function iniciarGeracaoObstaculos() {
    cancelarGeracaoObstaculos();
    agendarProximoObstaculo();
}

function cancelarGeracaoObstaculos() {
    clearTimeout(timeoutObstaculo);
}

function agendarProximoObstaculo() {
    if (!jogoAtivo || jogoPausado || perguntaAtiva) return;

    const config = configFases[Math.min(faseAtual, configFases.length - 1)];
    const intervalo = Math.random() * (config.intervaloMax - config.intervaloMin) + config.intervaloMin;
    timeoutObstaculo = setTimeout(() => {
        criarObstaculo();
        agendarProximoObstaculo();
    }, intervalo);
}

    /*function gerarObstaculo() {
        if (!jogoAtivo || perguntaAtiva) return;
        
        const config = configFases[Math.min(faseAtual, configFases.length - 1)] || configFases[1];
        const tipoObstaculo = escolherObstaculoAleatorio(config.obstaculos, config.probabilidades);
        
        const obstaculo = document.createElement("img");
        obstaculo.src = "imagens/pipe.png";
        obstaculo.className = `obstaculo ${tipoObstaculo}`;
        obstaculo.style.right = "-80px";
        obstaculo.style.bottom = "0";
        
        // Definir altura baseada no tipo
        if (tipoObstaculo === tiposObstaculos.CANO_MEDIO) {
            obstaculo.style.height = "120px";
        } else if (tipoObstaculo === tiposObstaculos.CANO_ALTO) {
            obstaculo.style.height = "150px";
        } else {
            obstaculo.style.height = "100px";
        }
        
        telaJogo.appendChild(obstaculo);
        
        // Animação do obstáculo
        const animacao = obstaculo.animate([
            { right: "-80px" },
            { right: "100%" }
        ], {
            duration: velocidadeJogo * 1000,
            easing: "linear"
        });
        
        // Remover obstáculo após animação
        animacao.onfinish = () => obstaculo.remove();
        
        // Agendar próximo obstáculo
        const intervalo = Math.random() * (config.intervaloMax - config.intervaloMin) + config.intervaloMin;
        intervaloObstaculos = setTimeout(gerarObstaculo, intervalo);
    }

    */

    function escolherObstaculoAleatorio(tipos, probabilidades) {
        const total = probabilidades.reduce((sum, prob) => sum + prob, 0);
        const random = Math.random() * total;
        let acumulado = 0;
        
        for (let i = 0; i < tipos.length; i++) {
            acumulado += probabilidades[i];
            if (random <= acumulado) {
                return tipos[i];
            }
        }
        
        return tipos[0];
    }
    function atualizarVelocidadeJogo() {
        velocidadeJogo = velocidadesPorCheckpoint[Math.min(checkpointAtual, velocidadesPorCheckpoint.length - 1)];
    }

    // Função para carregar ranking (chamada ao voltar ao menu)
    function carregarRanking() {
        if (rankingManager) {
            rankingManager.atualizarRanking();
        }
    }

    

// Pontuação ÚNICA do jogo.
// O placar (pontuacao) sobe enquanto o jogador avança e cai
// PENALIDADE_POR_VIDA a cada vida perdida (bater ou errar), mas nunca
// trava: continua subindo a partir do valor descontado. Ao completar
// todos os checkpoints, soma BONUS_CONCLUSAO.
function calcularPontuacao() {
    const bonusConclusao = checkpointAtual >= 10 ? BONUS_CONCLUSAO : 0;
    return Math.max(0, Math.floor(pontuacao + bonusConclusao)); // Nunca fica negativa
}

// Atualiza o número mostrado na tela com a pontuação atual (já com descontos).
function atualizarDisplayPontuacao() {
    const el = document.getElementById("contador-pontuacao");
    if (el) el.textContent = calcularPontuacao();
}

}); // Fim do DOMContentLoaded

