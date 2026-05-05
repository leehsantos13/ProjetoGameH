# Caio — Sem Saída?
### História Interativa em Pixel Art | Baixada Santista

> *"A superação raramente é um salto. É um passo por dia, em chão irregular."*

---

## Sobre o projeto

**Caio — Sem Saída?** é um jogo de narrativa interativa (visual novel) desenvolvido como HTML puro, sem dependências de framework. A história acompanha Caio, um jovem de 15 anos que vive em extrema vulnerabilidade social na região da Baixada Santista — com pais dependentes químicos, fome real e ausência de oportunidades.

O objetivo do jogo é mostrar, com respeito e honestidade, os dilemas reais enfrentados por jovens nessa situação: as pressões do ambiente, as escolhas impossíveis entre sobreviver agora e construir um futuro, e os diferentes caminhos que essas escolhas abrem ou fecham.

---

## Funcionalidades

- 14 cenas com narrativa detalhada em estilo pixel art descritivo
- 4 cenas puramente narrativas de contexto (sem escolhas)
- 3 pontos de decisão com 2 opções cada
- **3 finais distintos:**
  - 🔴 Final Negativo — consequências do envolvimento com o crime
  - ⚪ Final Neutro — sobrevivência honesta, sem ascensão ainda
  - 🟢 Final Positivo — superação via educação e oportunidade
- Animação de digitação de texto (skip com clique)
- Fundo gerado proceduralmente em Canvas 2D (pixel art dinâmico)
- Barra de progresso e contador de cenas
- 100% responsivo — funciona em mobile e desktop
- Zero dependências externas (apenas Google Fonts)

---

## Estrutura do projeto

```
caio-sem-saida/
│
├── index.html          # Entrada principal do jogo
│
├── src/
│   ├── style.css       # Estilos completos (tema pixel art escuro)
│   ├── story.js        # Dados da história (objeto STORY indexado por id)
│   ├── renderer.js     # Renderizador de cenários em Canvas 2D
│   └── main.js         # Engine do jogo (fluxo, digitação, escolhas)
│
├── assets/
│   └── story.json      # História completa em JSON puro (portável)
│
└── docs/
    └── mapa-narrativo.md   # Diagrama textual do fluxo de cenas
```

---

## Como rodar

### Opção 1 — Abrir direto no navegador
```bash
# Clone o repositório
git clone https://github.com/seu-usuario/caio-sem-saida.git
cd caio-sem-saida

# Abra o index.html no navegador
open index.html        # macOS
xdg-open index.html    # Linux
start index.html       # Windows
```

### Opção 2 — Servidor local (recomendado)
```bash
# Com Python
python3 -m http.server 8080

# Com Node.js (npx)
npx serve .

# Acesse: http://localhost:8080
```

### Opção 3 — GitHub Pages
Ative o GitHub Pages no repositório apontando para a branch `main` / pasta raiz. O jogo estará acessível em:
```
https://seu-usuario.github.io/caio-sem-saida/
```

---

## Mapa narrativo

```
[inicio] → [familia] → [escola] → [primeira_escolha]
                                        │
                    ┌───────────────────┴──────────────────┐
                    ▼                                       ▼
            [caminho_biel]                         [caminho_escola]
                    │                                       │
                    ▼                                       ▼
          [segunda_escolha_biel]              [segunda_escolha_escola]
                    │                                  │         │
            ┌───────┴──────┐                           │         │
            ▼              ▼                           ▼         ▼
    [final_negativo]   [virada]          [caminho_sao_vicente]  [segunda_escolha_biel]
                           │                       │
                    ┌──────┴──────┐        [terceira_escolha]
                    ▼             ▼              │         │
            [caminho_sao_vicente] [final_neutro] ▼         ▼
                                        [final_neutro] [final_positivo]
```

---

## Tecnologias

| Tecnologia | Uso |
|---|---|
| HTML5 | Estrutura do jogo |
| CSS3 | Tema pixel art, animações, responsividade |
| JavaScript (ES5+) | Engine, renderizador canvas, fluxo narrativo |
| Canvas 2D API | Geração procedural dos cenários |
| Google Fonts | VT323 + Press Start 2P (pixel fonts) |

---

## Arquitetura de dados

Cada cena segue o seguinte schema:

```json
{
  "id": "string",
  "location": "string",
  "mood": "dark | tense | hope | end_bad | end_neutral | end_good",
  "moodLabel": "string",
  "bgType": "string",
  "texto": "string",
  "opcoes": [
    { "texto": "string", "proximo": "string" }
  ],
  "next": "string (opcional — próxima cena automática)",
  "isEnd": "boolean (opcional)",
  "endType": "bad | neutral | good (opcional)"
}
```

O arquivo `assets/story.json` contém a história completa em JSON puro, desacoplada do código — pode ser importada em outras plataformas, engines ou adaptada para outros formatos narrativos.

---

## Extensões sugeridas

- [ ] Adicionar trilha sonora ambiente (Web Audio API)
- [ ] Sprites de personagens em pixel art
- [ ] Sistema de save/load via localStorage
- [ ] Mais ramificações e cenas intermediárias
- [ ] Tradução para inglês / espanhol
- [ ] Versão mobile empacotada com Capacitor ou PWA

---

## Contexto e intenção

Este projeto não glorifica violência, crime ou qualquer comportamento ilegal. O caminho negativo existe para mostrar consequências reais, não para romantizá-las. A história foi construída com respeito pela realidade de milhões de jovens brasileiros que enfrentam condições semelhantes às de Caio — e que merecem narrativas que os vejam com dignidade.

---

## Licença

MIT — livre para usar, modificar e distribuir com atribuição.

---

*Desenvolvido com VT323, Press Start 2P e muita empatia.*
