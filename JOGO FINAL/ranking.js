class RankingManager {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.rankingGlobal = [];
        if (!this.container) {
            console.error(`Elemento com ID '${containerId}' não encontrado.`);
        }
    }

    async inicializar() {
        await this.atualizarRanking();
    }

    async atualizarRanking() {
        if (!this.container) return;
        this.container.innerHTML = '<p class="carregando-ranking">Carregando ranking...</p>'; // Mensagem de carregamento
        try {
            // Usar API local para obter ranking (conforme api.js)
            const resultado = API.obterRankingLocal(); // Chamada direta ao método local
            this.rankingGlobal = resultado.ranking || [];
            this.renderizarRanking();
        } catch (erro) {
            console.error('Erro ao carregar ranking:', erro);
            this.container.innerHTML = '<p class="erro-ranking">Erro ao carregar o ranking.</p>';
        }
    }

    renderizarRanking() {
        if (!this.container) return;

        if (!this.rankingGlobal.length) {
            this.container.innerHTML = '<p class="sem-pontuacoes">Ainda não há pontuações registradas. Jogue para entrar no ranking!</p>';
            return;
        }

        // Limpa o container antes de adicionar a tabela
        this.container.innerHTML = '';

        const tabela = document.createElement('table');
        tabela.className = 'ranking-tabela';

        const thead = document.createElement('thead');
        thead.innerHTML = `
            <tr>
                <th>#</th>
                <th>Jogador</th>
                <th>Pontos</th>
            </tr>
        `;
        tabela.appendChild(thead);

        const tbody = document.createElement('tbody');
        this.rankingGlobal.forEach((item, index) => {
            const linha = document.createElement('tr');
            // Adiciona classes para estilização (ex: top 3)
            if (index === 0) linha.classList.add('rank-1');
            if (index === 1) linha.classList.add('rank-2');
            if (index === 2) linha.classList.add('rank-3');

            linha.innerHTML = `
                <td class="posicao">${index + 1}</td>
                <td class="nome">${item.nome}</td>
                <td class="pontuacao">${item.pontuacao}</td>
            `;
            tbody.appendChild(linha);
        });
        tabela.appendChild(tbody);

        this.container.appendChild(tabela);
    }
}

// Instanciar e inicializar o ranking quando o DOM estiver pronto
// Esta parte será movida ou ajustada no script.js principal
// document.addEventListener('DOMContentLoaded', () => {
//     const rankingManager = new RankingManager('ranking-lista');
//     rankingManager.inicializar();
// });
