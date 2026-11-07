/* MYRAA Pink Character Home: visual layer only. No changes to Gemini, chat, native permissions, or Memory Packs. */
(() => {
  'use strict';
  const PREFERENCE = 'myraa.pink.home.enabled.v1';
  const byId = id => document.getElementById(id);
  const find = selectors => document.querySelector(selectors);
  const safeSave = enabled => { try { localStorage.setItem(PREFERENCE, enabled ? 'true' : 'false'); } catch (_) {} };
  const safeRead = () => { try { return localStorage.getItem(PREFERENCE) !== 'false'; } catch (_) { return true; } };
  const button = (icon, label, action) => '<button type="button" data-pink-action="' + action + '" aria-label="' + label + '" title="' + label + '"><span aria-hidden="true">' + icon + '</span><small>' + label + '</small></button>';
  let x = 0, y = 0, scale = 1, tilt = 0;
  let art, portrait, app, status, caption;
  const statusNote = message => {
    const notice = byId('notice');
    if (notice) notice.textContent = message;
    if (caption) caption.textContent = message;
  };
  const clickExisting = selectors => {
    const target = find(selectors);
    if (!target) return false;
    if (typeof target.click === 'function') { target.click(); return true; }
    if (typeof target.showModal === 'function') { target.showModal(); return true; }
    return false;
  };
  const adjust = () => {
    if (!art) return;
    art.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0) scale(' + scale + ') rotateY(' + tilt + 'deg)';
  };
  const enable = yes => {
    document.body.classList.toggle('pink-real-home', yes);
    document.body.classList.toggle('pink-orb-fallback', !yes);
    safeSave(yes);
    if (yes) statusNote('2D character preview. Real 3D model not installed.');
    else statusNote('Original interactive orb is active.');
  };
  const action = name => {
    switch (name) {
      case 'chat': {
        const c = find('.conversation');
        if (c) { c.classList.toggle('expanded'); statusNote('Conversation history opened.'); }
        else statusNote('Chat screen is unavailable in this build.');
        break;
      }
      case 'voice':
        if (!clickExisting('#voice,[aria-label="Start voice"],[data-action="voice"]')) statusNote('Voice control is unavailable in this build.');
        break;
      case 'tools':
      case 'background':
      case 'dress':
        if (!clickExisting('#theme-open,#settings-open,#open-settings')) statusNote('Theme or settings panel is not available.');
        if (name === 'dress') statusNote('Outfit changing requires a licensed, rigged 3D character. Gallery previews are available.');
        break;
      case 'character':
        enable(!document.body.classList.contains('pink-real-home'));
        break;
      case 'effects':
        document.body.classList.toggle('pink-effects-off');
        statusNote(document.body.classList.contains('pink-effects-off') ? 'Glow effects paused.' : 'Glow effects enabled.');
        break;
      case 'rotate':
        tilt = (tilt + 12) % 36;
        adjust();
        statusNote('Flat image tilt only. Full 3D rotation needs a rigged model.');
        break;
      case 'move':
        x = (x + 16) % 64 - 24;
        adjust();
        statusNote('Preview shifted. You can also drag the picture.');
        break;
      case 'zoom-in':
        scale = Math.min(1.7, +(scale + 0.1).toFixed(2));
        adjust();
        break;
      case 'zoom-out':
        scale = Math.max(0.7, +(scale - 0.1).toFixed(2));
        adjust();
        break;
      case 'reset':
        x = 0; y = 0; scale = 1; tilt = 0; adjust();
        statusNote('Preview view reset.');
        break;
      case 'home':
        enable(true);
        break;
      case 'assistant':
        enable(false);
        break;
      case 'memory':
        if (!clickExisting('#memory-open,[data-tab="memory"],[data-view="memory"],[aria-label="Memory"]')) {
          if (!clickExisting('#settings-open,#open-settings')) statusNote('Memory screen is not linked to this navigation yet.');
          else statusNote('Open existing Memory settings. No Memory Pack data was modified.');
        }
        break;
      case 'routines':
        if (!clickExisting('#routines-open,[data-tab="routines"],[data-view="routines"],[aria-label="Routines"]'))
          statusNote('Routines screen is not linked in this build.');
        break;
      case 'settings':
        if (!clickExisting('#settings-open,#open-settings,#theme-open')) statusNote('Settings panel unavailable.');
        break;
    }
  };
  function mount() {
    app = byId('app');
    portrait = find('#app .portrait');
    if (!app || !portrait || byId('pink-character-stage')) return false;
    const widgets = document.createElement('div');
    widgets.className = 'pink-status-widgets';
    widgets.innerHTML =
      '<div class="pink-status-card"><b><span class="pink-live-dot" aria-hidden="true"></span><span id="pink-connect">Voice</span></b><small>Here with you...</small></div>' +
      '<button class="pink-weather-card" type="button" data-pink-action="tools"><span aria-hidden="true">☀️</span><span><b>Weather</b><small>Open Tools for live details</small></span></button>';
    portrait.appendChild(widgets);

    const stage = document.createElement('div');
    stage.id = 'pink-character-stage';
    stage.className = 'pink-character-stage';
    stage.innerHTML = '<div class="pink-halo-ring" aria-hidden="true"></div>' +
      '<img id="pink-character-art" src="./pink-character.jpg" alt="Pink anime-style MYRAA character concept, currently a 2D preview" draggable="false">' +
      '<div class="pink-platform" aria-hidden="true"></div>' +
      '<span id="pink-character-caption" class="pink-character-caption">Character preview · 2D</span>';
    portrait.appendChild(stage);
    art = byId('pink-character-art');
    caption = byId('pink-character-caption');
    art.onerror = () => { art.hidden = true; statusNote('Character art missing. Switch to the original orb.'); };
    let point = null;
    art.addEventListener('pointerdown', e => {
      if (e.button !== 0) return;
      point = { px: e.clientX, py: e.clientY, x, y };
      if (art.setPointerCapture) art.setPointerCapture(e.pointerId);
    });
    art.addEventListener('pointermove', e => {
      if (!point) return;
      x = Math.max(-72, Math.min(72, point.x + e.clientX - point.px));
      y = Math.max(-70, Math.min(70, point.y + e.clientY - point.py));
      adjust();
    });
    art.addEventListener('pointerup', () => { point = null; });
    art.addEventListener('pointercancel', () => { point = null; });

    const left = document.createElement('aside');
    left.className = 'pink-left-rail';
    left.setAttribute('aria-label', 'Character mode navigation');
    left.innerHTML = [
      button('▤', 'Chat', 'chat'), button('♩', 'Voice', 'voice'),
      button('◇', 'Tools', 'tools'), button('⬡', 'Character', 'character'),
      button('♧', 'Dress Up', 'dress'), button('▧', 'Background', 'background'),
      button('✧', 'Effects', 'effects')
    ].join('');
    portrait.appendChild(left);

    const right = document.createElement('aside');
    right.className = 'pink-right-rail';
    right.setAttribute('aria-label', 'Preview controls');
    right.innerHTML = [
      button('⟳', 'Rotate', 'rotate'), button('✥', 'Move', 'move'),
      button('⊕', 'Zoom +', 'zoom-in'), button('⊖', 'Zoom −', 'zoom-out'),
      button('↺', 'Reset', 'reset')
    ].join('');
    portrait.appendChild(right);

    const nav = document.createElement('nav');
    nav.className = 'pink-bottom-nav';
    nav.setAttribute('aria-label', 'Main navigation');
    nav.innerHTML = [
      button('⌂', 'Home', 'home'), button('✦', 'Assistant', 'assistant'),
      button('▤', 'Memory', 'memory'), button('▦', 'Routines', 'routines'),
      button('⚙', 'Settings', 'settings')
    ].join('');
    app.appendChild(nav);
    app.addEventListener('click', e => {
      const target = e.target.closest('[data-pink-action]');
      if (!target) return;
      e.preventDefault(); action(target.getAttribute('data-pink-action'));
    });
    const updateStatus = () => {
      const source = byId('connection');
      const label = byId('pink-connect');
      if (!label) return;
      const text = source?.textContent?.trim();
      label.textContent = text && text.length < 80 ? text : 'Voice status';
      document.body.classList.toggle('pink-voice-connected', /connected|listening|live/i.test(text || ''));
    };
    updateStatus();
    if (byId('connection') && window.MutationObserver) {
      new MutationObserver(updateStatus).observe(byId('connection'), { childList: true, subtree: true, characterData: true });
    }
    enable(safeRead());
    return true;
  }
  function start() {
    let tries = 0;
    const timer = setInterval(() => {
      tries += 1;
      if (mount() || tries > 40) clearInterval(timer);
    }, 250);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();