/**
 * Ranking do JOGO-LGPD (PRODERJ Adventures) usando Google Sheets.
 *
 * COMO USAR:
 * 1. Crie uma planilha nova no Google Sheets.
 * 2. Menu Extensões > Apps Script.
 * 3. Apague o conteúdo padrão e cole TODO este arquivo.
 * 4. Clique em Implantar (Deploy) > Nova implantação.
 *    - Tipo: "App da Web" (Web app)
 *    - Executar como: Eu (você)
 *    - Quem tem acesso: "Qualquer pessoa" (Anyone)
 * 5. Copie a URL gerada (termina em /exec) e cole no api.js do jogo
 *    (constante RANKING_URL).
 */

const SHEET_NAME = 'Ranking';

function doGet(e) {
  return handle(e);
}

function doPost(e) {
  return handle(e);
}

function handle(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const sheet = getSheet();
    let payload = (e && e.parameter) || {};

    // Se veio via POST com corpo JSON (o jogo envia como text/plain)
    if (e && e.postData && e.postData.contents) {
      try {
        payload = JSON.parse(e.postData.contents);
      } catch (err) {
        // mantém e.parameter se o corpo não for JSON válido
      }
    }

    if (payload.action === 'save') {
      const nome = String(payload.nome || 'Anônimo').substring(0, 20);
      const pontuacao = parseInt(payload.pontuacao, 10) || 0;
      const checkpoint = parseInt(payload.checkpoint, 10) || 0;
      sheet.appendRow([new Date(), nome, pontuacao, checkpoint]);
      return json({ ok: true });
    }

    // Padrão: devolve o ranking (melhor pontuação por jogador, top 10)
    return json({ ranking: getRanking(sheet) });
  } finally {
    lock.releaseLock();
  }
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['Data', 'Nome', 'Pontuacao', 'Checkpoint']);
  }
  return sheet;
}

function getRanking(sheet) {
  const values = sheet.getDataRange().getValues();
  const melhores = {};

  // Linha 0 é o cabeçalho; começa em 1
  for (let i = 1; i < values.length; i++) {
    const nome = values[i][1];
    const pontuacao = parseInt(values[i][2], 10) || 0;
    const checkpoint = values[i][3];
    if (!nome) continue;

    if (!melhores[nome] || pontuacao > melhores[nome].pontuacao) {
      melhores[nome] = { nome: nome, pontuacao: pontuacao, checkpoint: checkpoint };
    }
  }

  return Object.values(melhores)
    .sort((a, b) => b.pontuacao - a.pontuacao)
    .slice(0, 10);
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
