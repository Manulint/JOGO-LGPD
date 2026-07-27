// API para comunicação com o backend
class API {
  // Usar o mesmo domínio para evitar problemas de CORS
  static BASE_URL = window.location.origin + '/api';

  // ============================================================
  // RANKING COMPARTILHADO (Google Sheets via Google Apps Script)
  // Cole aqui a URL do seu Web App (termina em /exec).
  // Deixe "" para usar apenas o ranking local deste navegador.
  static RANKING_URL = "https://script.google.com/macros/s/AKfycbzC8d7TfxVbC20KQAQm6dG-B4YQ4YJFrkp9CygBQKzZxhli6UGeaeQCl-Vy5KSu_Ceb/exec";
  // ============================================================

  // Salva a pontuação no ranking. Tenta o Google Sheets (se configurado)
  // e SEMPRE guarda uma cópia local como backup.
  static async salvarPontuacao(nome, pontuacao, checkpoint) {
    // Backup local sempre
    try {
      this.registrarPontuacaoPorNomeLocal(nome, pontuacao, checkpoint);
    } catch (e) {
      console.error('Erro ao salvar pontuação local:', e);
    }

    // Envia para o Google Sheets, se houver URL configurada
    if (this.RANKING_URL) {
      try {
        await fetch(this.RANKING_URL, {
          method: 'POST',
          // text/plain evita o "preflight" de CORS do Apps Script
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({ action: 'save', nome, pontuacao, checkpoint })
        });
      } catch (e) {
        console.error('Erro ao enviar pontuação para o Google Sheets:', e);
      }
    }
  }
  
  // Registrar ou recuperar usuário
  static async registrarUsuario(nome) {
    try {
      // Usar localStorage para armazenamento local (sem backend real)
      return this.registrarUsuarioLocal(nome);
    } catch (error) {
      console.error('Erro na API:', error);
      // Fallback para armazenamento local em caso de falha
      return this.registrarUsuarioLocal(nome);
    }
  }
  
  // Registrar tentativa
  static async registrarTentativa(usuarioId) {
    try {
      // Usar localStorage para armazenamento local (sem backend real)
      return this.registrarTentativaLocal(usuarioId);
    } catch (error) {
      console.error('Erro na API:', error);
      // Fallback para armazenamento local
      return this.registrarTentativaLocal(usuarioId);
    }
  }
  
  // Registrar pontuação
  static async registrarPontuacao(usuarioId, pontuacao, checkpoint, fase) {
    try {
      // Usar localStorage para armazenamento local (sem backend real)
      return this.registrarPontuacaoLocal(usuarioId, pontuacao, checkpoint, fase);
    } catch (error) {
      console.error('Erro na API:', error);
      // Fallback para armazenamento local
      return this.registrarPontuacaoLocal(usuarioId, pontuacao, checkpoint, fase);
    }
  }
  
  // Obter ranking global (Google Sheets se configurado, senão local)
  static async obterRanking(limite = 10, pagina = 1) {
    if (this.RANKING_URL) {
      try {
        const resp = await fetch(this.RANKING_URL + '?action=ranking');
        const dados = await resp.json();
        return { ranking: dados.ranking || [] };
      } catch (error) {
        console.error('Erro ao obter ranking do Google Sheets, usando local:', error);
        return this.obterRankingLocal();
      }
    }
    return this.obterRankingLocal();
  }
  
  // Obter histórico de pontuações de um usuário
  static async obterHistoricoUsuario(usuarioId) {
    try {
      // Usar localStorage para armazenamento local (sem backend real)
      return this.obterHistoricoUsuarioLocal(usuarioId);
    } catch (error) {
      console.error('Erro na API:', error);
      // Fallback para histórico local
      return this.obterHistoricoUsuarioLocal(usuarioId);
    }
  }
  
  // Métodos de armazenamento local
  
  static registrarUsuarioLocal(nome) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    
    // Verificar se usuário já existe
    let usuario = usuarios.find(u => u.nome === nome);
    
    if (usuario) {
      usuario.ultimo_acesso = new Date().toISOString();
    } else {
      usuario = {
        id: Date.now(),
        nome,
        data_criacao: new Date().toISOString(),
        ultimo_acesso: new Date().toISOString()
      };
      usuarios.push(usuario);
    }
    
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    
    // Contar tentativas
    const tentativas = JSON.parse(localStorage.getItem('tentativas') || '[]');
    const totalTentativas = tentativas.filter(t => t.usuario_id === usuario.id).length;
    
    return {
      id: usuario.id,
      nome: usuario.nome,
      tentativas: totalTentativas
    };
  }
  
  static registrarTentativaLocal(usuarioId) {
    const tentativas = JSON.parse(localStorage.getItem('tentativas') || '[]');
    
    const novaTentativa = {
      id: Date.now(),
      usuario_id: usuarioId,
      data: new Date().toISOString()
    };
    
    tentativas.push(novaTentativa);
    localStorage.setItem('tentativas', JSON.stringify(tentativas));
    
    return {
      id: novaTentativa.id,
      total_tentativas: tentativas.filter(t => t.usuario_id === usuarioId).length
    };
  }
  
  static registrarPontuacaoLocal(usuarioId, pontuacao, checkpoint, fase) {
    const pontuacoes = JSON.parse(localStorage.getItem('pontuacoes') || '[]');
    
    const novaPontuacao = {
      id: Date.now(),
      usuario_id: usuarioId,
      pontuacao,
      checkpoint,
      fase,
      data: new Date().toISOString()
    };
    
    pontuacoes.push(novaPontuacao);
    localStorage.setItem('pontuacoes', JSON.stringify(pontuacoes));
    
    // Calcular posição no ranking
    const posicao = pontuacoes.filter(p => p.pontuacao > pontuacao).length + 1;
    
    return {
      id: novaPontuacao.id,
      ranking: posicao
    };
  }
  
  // Salva a pontuação localmente já indexada por nome do jogador.
  static registrarPontuacaoPorNomeLocal(nome, pontuacao, checkpoint) {
    const pontuacoes = JSON.parse(localStorage.getItem('pontuacoes_nome') || '[]');
    pontuacoes.push({
      nome: String(nome || 'Anônimo'),
      pontuacao: parseInt(pontuacao, 10) || 0,
      checkpoint: parseInt(checkpoint, 10) || 0,
      data: new Date().toISOString()
    });
    localStorage.setItem('pontuacoes_nome', JSON.stringify(pontuacoes));
  }

  static obterRankingLocal() {
    const pontuacoes = JSON.parse(localStorage.getItem('pontuacoes_nome') || '[]');

    // Mantém apenas a MELHOR pontuação de cada jogador
    const melhores = {};
    pontuacoes.forEach(p => {
      const nome = p.nome || 'Anônimo';
      if (!melhores[nome] || p.pontuacao > melhores[nome].pontuacao) {
        melhores[nome] = p;
      }
    });

    const ranking = Object.values(melhores)
      .sort((a, b) => b.pontuacao - a.pontuacao)
      .slice(0, 10)
      .map((p, index) => ({
        posicao: index + 1,
        nome: p.nome,
        pontuacao: p.pontuacao,
        checkpoint: p.checkpoint,
        data: p.data
      }));

    return { ranking };
  }
  
  static obterHistoricoUsuarioLocal(usuarioId) {
    const pontuacoes = JSON.parse(localStorage.getItem('pontuacoes') || '[]');
    
    // Filtrar por usuário e ordenar por pontuação
    const pontuacoesUsuario = pontuacoes
      .filter(p => p.usuario_id === usuarioId)
      .sort((a, b) => b.pontuacao - a.pontuacao);
    
    return {
      pontuacoes: pontuacoesUsuario.map(p => ({
        pontuacao: p.pontuacao,
        checkpoint: p.checkpoint,
        fase: p.fase,
        data: p.data
      }))
    };
  }
}
