# JOGO-LGPD — PRODERJ Adventures

Jogo educativo estilo *endless runner* sobre a Governança de TIC e a LGPD no âmbito do PRODERJ. Corra com o robô, desvie dos obstáculos e responda às perguntas nos checkpoints para avançar!

## 🎮 Jogar

**[▶ Jogar agora](https://manulint.github.io/JOGO-LGPD/)**

> O link acima funciona depois que o GitHub Pages estiver ativado (Settings → Pages → Branch: `main` / pasta `/docs`).

## 📁 Estrutura

Os arquivos do jogo ficam na pasta [`docs/`](docs/):

- `index.html` — página principal
- `script.js` — lógica do jogo
- `perguntas_proderj.js` — banco de perguntas do quiz
- `ranking.js` — ranking de pontuações
- `api.js` — camada de dados (hoje via `localStorage`)
- `estilo.css` / `animacoes.css` — estilos e animações
- `imagens/` — sprites e imagens

## 💻 Rodar localmente

Basta abrir `docs/index.html` no navegador.
