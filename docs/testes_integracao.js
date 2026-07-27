// Integração e testes do fluxo completo
document.addEventListener('DOMContentLoaded', async () => {
    console.log('Iniciando testes de integração...');
    
    // Inicializar gerenciador de ranking
    window.rankingManager = new RankingManager();
    await rankingManager.inicializar();
    
    // Verificar se todos os componentes foram carregados
    const componentesNecessarios = [
        { nome: 'API', objeto: window.API },
        { nome: 'RankingManager', objeto: window.rankingManager },
        { nome: 'Perguntas LGPD', objeto: window.perguntasLGPD }
    ];
    
    let todosComponentesCarregados = true;
    
    componentesNecessarios.forEach(componente => {
        if (!componente.objeto) {
            console.error(`Componente ${componente.nome} não foi carregado corretamente.`);
            todosComponentesCarregados = false;
        } else {
            console.log(`Componente ${componente.nome} carregado com sucesso.`);
        }
    });
    
    if (!todosComponentesCarregados) {
        alert('Erro ao carregar componentes do jogo. Por favor, recarregue a página.');
        return;
    }
    
    // Inicializar UI
    inicializarUI();
    
    // Mostrar ranking inicial
    rankingManager.mostrarRankingInicial();
    
    console.log('Testes de integração concluídos com sucesso.');
});

// Sobrescrever funções do jogo para integrar com o sistema de ranking

// Função para iniciar jogo com nome
async function iniciarJogoComNome() {
    const inputNome = document.getElementById('input-nome');
    nomeUsuario = inputNome.value.trim();
    
    if (nomeUsuario.length < 3) {
        alert('Por favor, digite um nome com pelo menos 3 caracteres.');
        return;
    }
    
    try {
        // Registrar usuário na API
        const usuario = await API.registrarUsuario(nomeUsuario);
        
        // Definir usuário atual no gerenciador de ranking
        rankingManager.setUsuario(usuario);
        
        // Registrar tentativa
        await rankingManager.registrarTentativa();
        
        // Ocultar painel de login
        document.querySelector('.painel-login').style.display = 'none';
        document.querySelector('.painel-ranking').style.display = 'none';
        
        // Iniciar jogo
        reiniciarJogo();
        
        console.log('Jogo iniciado com usuário:', usuario);
    } catch (error) {
        console.error('Erro ao iniciar jogo:', error);
        alert('Erro ao iniciar jogo. Por favor, tente novamente.');
    }
}

// Sobrescrever função de finalizar jogo
const finalizarJogoOriginal = finalizarJogo;
finalizarJogo = async function() {
    // Chamar função original
    finalizarJogoOriginal();
    
    // Registrar pontuação na API
    if (rankingManager && rankingManager.usuarioAtual) {
        try {
            await rankingManager.registrarPontuacao(pontuacao, checkpointAtual, faseAtual);
            
            // Mostrar ranking e histórico
            rankingManager.mostrarRankingGameOver();
            
            console.log('Pontuação registrada com sucesso:', pontuacao);
        } catch (error) {
            console.error('Erro ao registrar pontuação:', error);
        }
    }
    
    // Adicionar animação de explosão
    criarAnimacaoExplosao();
};

// Sobrescrever função de verificar resposta
const verificarRespostaOriginal = verificarResposta;
verificarResposta = function(respostaUsuario, respostaCorreta) {
    // Chamar função original
    verificarRespostaOriginal(respostaUsuario, respostaCorreta);
    
    // Adicionar animação de resposta incorreta se errou
    if (respostaUsuario !== respostaCorreta) {
        criarAnimacaoRespostaIncorreta();
    }
};

// Sobrescrever função de reiniciar jogo
const reiniciarJogoOriginal = reiniciarJogo;
reiniciarJogo = async function() {
    // Registrar nova tentativa
    if (rankingManager && rankingManager.usuarioAtual) {
        try {
            await rankingManager.registrarTentativa();
        } catch (error) {
            console.error('Erro ao registrar tentativa:', error);
        }
    }
    
    // Chamar função original
    reiniciarJogoOriginal();
};

// Função para criar animação de explosão
function criarAnimacaoExplosao() {
    const animacaoContainer = document.getElementById('animacao-game-over');
    
    // Criar elemento de explosão
    const explosao = document.createElement('div');
    explosao.className = 'explosao';
    animacaoContainer.appendChild(explosao);
    
    // Remover após animação
    setTimeout(() => {
        if (explosao.parentNode) {
            explosao.parentNode.removeChild(explosao);
        }
    }, 500);
}

// Função para criar animação de resposta incorreta
function criarAnimacaoRespostaIncorreta() {
    // Criar elemento de flash vermelho
    const flash = document.createElement('div');
    flash.className = 'resposta-incorreta-animacao';
    document.body.appendChild(flash);
    
    // Remover após animação
    setTimeout(() => {
        if (flash.parentNode) {
            flash.parentNode.removeChild(flash);
        }
    }, 500);
}

// Função para testar todos os fluxos
async function testarFluxosCompletos() {
    console.log('Iniciando testes de fluxos completos...');
    
    // Testar registro de usuário
    const usuario = await API.registrarUsuario('Testador');
    console.log('Usuário registrado:', usuario);
    
    // Testar registro de tentativa
    const tentativa = await API.registrarTentativa(usuario.id);
    console.log('Tentativa registrada:', tentativa);
    
    // Testar registro de pontuação
    const pontuacao = await API.registrarPontuacao(usuario.id, 500, 5, 6);
    console.log('Pontuação registrada:', pontuacao);
    
    // Testar obtenção de ranking
    const ranking = await API.obterRanking();
    console.log('Ranking obtido:', ranking);
    
    // Testar obtenção de histórico
    const historico = await API.obterHistoricoUsuario(usuario.id);
    console.log('Histórico obtido:', historico);
    
    console.log('Testes de fluxos completos concluídos com sucesso.');
}

// Executar testes se estiver em modo de desenvolvimento
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    setTimeout(testarFluxosCompletos, 3000);
}
