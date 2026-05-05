# Mapa Narrativo — Caio: Sem Saída?

## Visão geral

A história é dividida em 3 atos:
- **Ato 1** — Contexto (cenas sem escolha)
- **Ato 2** — Dilemas (ramificações com decisões)
- **Ato 3** — Finais (3 desfechos possíveis)

---

## Cenas e conexões

### ATO 1 — Contexto

| ID | Local | Tipo | Próxima |
|----|-------|------|---------|
| `inicio` | Cubatão — Comunidade do Sítio | Narrativa | `familia` |
| `familia` | Dentro do barraco — Madrugada | Narrativa | `escola` |
| `escola` | Rua principal — Manhã cinza | Narrativa | `primeira_escolha` |

---

### ATO 2 — Dilemas

#### Bifurcação 1: Portão da escola
**Cena:** `primeira_escolha`

| Escolha | Destino |
|---------|---------|
| Ir com Biel | `caminho_biel` |
| Resolver a matrícula | `caminho_escola` |

---

#### Ramo A — Biel

| ID | Local | Tipo | Próxima |
|----|-------|------|---------|
| `caminho_biel` | Beco dos fundos | Narrativa | `segunda_escolha_biel` |

**Bifurcação 2A:** `segunda_escolha_biel`

| Escolha | Destino |
|---------|---------|
| Entregar o embrulho | `final_negativo` 🔴 |
| Devolver e se afastar | `virada` |

**Bifurcação 3 (Virada):** `virada`

| Escolha | Destino |
|---------|---------|
| Ir ao Jovem Aprendiz | `caminho_sao_vicente` |
| Desistir | `final_neutro` ⚪ |

---

#### Ramo B — Escola

| ID | Local | Tipo | Próxima |
|----|-------|------|---------|
| `caminho_escola` | Escola — Sala da diretora | Narrativa | `segunda_escolha_escola` |

**Bifurcação 2B:** `segunda_escolha_escola`

| Escolha | Destino |
|---------|---------|
| Bolsa em São Vicente | `caminho_sao_vicente` |
| Sair com Biel | `segunda_escolha_biel` (convergência) |

---

#### Ramo C — São Vicente (convergente)

| ID | Local | Tipo | Próxima |
|----|-------|------|---------|
| `caminho_sao_vicente` | São Vicente — Centro de formação | Narrativa | `terceira_escolha` |

**Bifurcação 3C:** `terceira_escolha`

| Escolha | Destino |
|---------|---------|
| Aceitar emprego | `final_neutro` ⚪ |
| Escola técnica | `final_positivo` 🟢 |

---

### ATO 3 — Finais

| ID | Tipo | Cor |
|----|------|-----|
| `final_negativo` | Tragédia — ficha criminal | 🔴 |
| `final_neutro` | Sobrevivência — trabalho honesto | ⚪ |
| `final_positivo` | Superação — escola técnica | 🟢 |

---

## Diagrama ASCII completo

```
[inicio]
   │
[familia]
   │
[escola]
   │
[primeira_escolha] ──────────────────────────────────┐
   │                                                  │
   ▼ (Biel)                                           ▼ (Escola)
[caminho_biel]                               [caminho_escola]
   │                                                  │
[segunda_escolha_biel] ◄──────────────── [segunda_escolha_escola]
   │                │                                 │
   │ (embrulho)     │ (devolve)                       │ (São Vicente)
   ▼                ▼                                 │
[final_negativo] [virada]                             │
    🔴              │                                 │
                    │ (vai)         ┌─────────────────┘
                    ▼               ▼
              [caminho_sao_vicente] ◄── (convergência dos ramos B e virada)
                    │
              [terceira_escolha]
                    │                │
                    │ (emprego)      │ (escola técnica)
                    ▼                ▼
              [final_neutro]   [final_positivo]
                  ⚪                🟢

              (também alcançável de [virada] → desistir)
```

---

## Contagem de cenas por tipo

| Tipo | Quantidade |
|------|-----------|
| Cenas narrativas (sem escolha) | 6 |
| Cenas com escolha | 5 |
| Finais | 3 |
| **Total** | **14** |

---

## Caminhos possíveis

1. `inicio → familia → escola → primeira_escolha → caminho_biel → segunda_escolha_biel → final_negativo` 🔴
2. `... → segunda_escolha_biel → virada → final_neutro` ⚪
3. `... → segunda_escolha_biel → virada → caminho_sao_vicente → terceira_escolha → final_neutro` ⚪
4. `... → segunda_escolha_biel → virada → caminho_sao_vicente → terceira_escolha → final_positivo` 🟢
5. `... → caminho_escola → segunda_escolha_escola → segunda_escolha_biel → ...` (mesmo que ramos acima)
6. `... → caminho_escola → segunda_escolha_escola → caminho_sao_vicente → terceira_escolha → final_neutro` ⚪
7. `... → caminho_escola → segunda_escolha_escola → caminho_sao_vicente → terceira_escolha → final_positivo` 🟢
