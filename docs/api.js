// API para comunicação com o backend
class API {
  // Usar o mesmo domínio para evitar problemas de CORS
  static BASE_URL = window.location.origin + '/api';
  
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
  
  // Obter ranking global
  static async obterRanking(limite = 10, pagina = 1) {
    try {
      // Usar localStorage para armazenamento local (sem backend real)
      return this.obterRankingLocal();
    } catch (error) {
      console.error('Erro na API:', error);
      // Fallback para ranking local
      return this.obterRankingLocal();
    }
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
  
  static obterRankingLocal() {
    const pontuacoes = JSON.parse(localStorage.getItem('pontuacoes') || '[]');
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    
    // Ordenar por pontuação (maior para menor)
    pontuacoes.sort((a, b) => b.pontuacao - a.pontuacao);
    
    // Limitar a 10 resultados
    const top10 = pontuacoes.slice(0, 10);
    
    // Formatar para o formato da API
    const ranking = top10.map((p, index) => {
      const usuario = usuarios.find(u => u.id === p.usuario_id);
      return {
        posicao: index + 1,
        nome: usuario ? usuario.nome : 'Desconhecido',
        pontuacao: p.pontuacao,
        checkpoint: p.checkpoint,
        fase: p.fase,
        data: p.data
      };
    });
    
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
