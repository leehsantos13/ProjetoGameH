/**
 * main.js
 * Engine do jogo "Caio — Sem Saída?"
 * Controla: fluxo de cenas, digitação de texto, escolhas, progresso e finais.
 */

(function () {
  'use strict';

  // ── Estado global ──────────────────────────────────────────────
  let visitedCount = 0;
  const TOTAL_SCENES = 14;   // usado no cálculo da barra de progresso
  const TYPE_SPEED   = 18;   // ms por caractere na animação de digitação

  // ── Mapa de mood → classe CSS ──────────────────────────────────
  const MOOD_CLASS = {
    dark:        'mood-dark',
    tense:       'mood-tense',
    hope:        'mood-hope',
    end_bad:     'mood-end-bad',
    end_neutral: 'mood-end-neutral',
    end_good:    'mood-end-good'
  };

  // ── Rótulos dos finais ─────────────────────────────────────────
  const END_TITLES = {
    bad:     'FIM — CAMINHO DO CUSTO',
    neutral: 'FIM — CAMINHO DA SOBREVIVÊNCIA',
    good:    'FIM — CAMINHO DA SUPERAÇÃO'
  };

  // ── Refs de DOM ────────────────────────────────────────────────
  const progressFill  = document.getElementById('progressFill');
  const sceneLocation = document.getElementById('sceneLocation');
  const sceneMood     = document.getElementById('sceneMood');
  const sceneText     = document.getElementById('sceneText');
  const choicesArea   = document.getElementById('choicesArea');

  // ── Utilitários ────────────────────────────────────────────────

  /**
   * typeText — anima o texto caractere a caractere
   * @param {HTMLElement} el   - elemento alvo
   * @param {string}      text - texto completo
   * @param {Function}    cb   - callback ao terminar
   */
  function typeText(el, text, cb) {
    el.textContent = '';
    let i = 0;

    // Clique/toque adianta a digitação
    function skipTyping() {
      el.textContent = text;
      clearTimeout(timer);
      el.removeEventListener('click', skipTyping);
      if (cb) cb();
    }
    el.addEventListener('click', skipTyping, { once: true });

    let timer;
    function next() {
      if (i < text.length) {
        el.textContent += text[i++];
        el.scrollTop = el.scrollHeight;
        timer = setTimeout(next, TYPE_SPEED);
      } else {
        el.removeEventListener('click', skipTyping);
        if (cb) cb();
      }
    }
    next();
  }

  /**
   * updateProgress — atualiza barra e contador
   */
  function updateProgress() {
    visitedCount++;
    const pct = Math.min(95, Math.round((visitedCount / TOTAL_SCENES) * 100));
    progressFill.style.width = pct + '%';
  }

  /**
   * buildChoices — monta botões de escolha ou botão "continuar"
   * @param {Object} scene
   */
  function buildChoices(scene) {
    choicesArea.innerHTML = '';

    if (scene.isEnd) {
      buildEndScreen(scene);
      return;
    }

    if (scene.opcoes && scene.opcoes.length > 0) {
      scene.opcoes.forEach(function (op) {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.textContent = op.texto;
        btn.addEventListener('click', function () {
          showScene(op.proximo);
        });
        choicesArea.appendChild(btn);
      });
    } else if (scene.next) {
      const btn = document.createElement('button');
      btn.className = 'continue-btn';
      btn.textContent = '▶ CONTINUAR';
      btn.addEventListener('click', function () {
        showScene(scene.next);
      });
      choicesArea.appendChild(btn);
    }
  }

  /**
   * buildEndScreen — monta a tela de final
   * @param {Object} scene
   */
  function buildEndScreen(scene) {
    const wrap = document.createElement('div');
    wrap.className = 'end-screen end-' + scene.endType;

    const title = document.createElement('div');
    title.className = 'end-title';
    title.textContent = END_TITLES[scene.endType] || 'FIM';
    wrap.appendChild(title);

    const restartBtn = document.createElement('button');
    restartBtn.className = 'restart-btn';
    restartBtn.textContent = '↺ RECOMEÇAR A HISTÓRIA';
    restartBtn.addEventListener('click', function () {
      visitedCount = 0;
      showScene('inicio');
    });
    wrap.appendChild(restartBtn);

    choicesArea.appendChild(wrap);
  }

  // ── Função principal ───────────────────────────────────────────

  /**
   * showScene — exibe uma cena pelo id
   * @param {string} sceneId
   */
  function showScene(sceneId) {
    const scene = STORY[sceneId];
    if (!scene) {
      console.error('[Caio] Cena não encontrada:', sceneId);
      return;
    }

    updateProgress();

    // Localização e mood
    sceneLocation.textContent = scene.location || '';
    sceneMood.className  = 'scene-mood ' + (MOOD_CLASS[scene.mood] || 'mood-dark');
    sceneMood.textContent = scene.moodLabel || '';

    // Fundo pixel art
    drawPixelBackground(scene.bgType || 'night_rain');

    // Limpa escolhas anteriores
    choicesArea.innerHTML = '';

    // Anima o texto e depois exibe as escolhas
    typeText(sceneText, scene.texto, function () {
      buildChoices(scene);
    });
  }

  // ── Inicialização ──────────────────────────────────────────────
  showScene('inicio');

})();
