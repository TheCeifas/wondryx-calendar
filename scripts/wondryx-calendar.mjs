const MODULE_ID = "wondryx-calendar";
const MODULE_ROOT = `modules/${MODULE_ID}`;
const PARTICLES_FX_MODULE_ID = "particule-fx";

const MONTHS = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
const WEEKDAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const LONG_WEEKDAYS = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];

const PHASES = [
  { key: "new", name: "Lua Nova", visibility: "0% visível" },
  { key: "crescent", name: "Lua Crescente", visibility: "25% visível" },
  { key: "first", name: "Quarto Crescente", visibility: "50% visível" },
  { key: "gibbous", name: "Lua Gibosa Crescente", visibility: "78% visível" },
  { key: "full", name: "Lua Cheia", visibility: "100% visível" },
  { key: "waning", name: "Lua Minguante", visibility: "25% visível" },
  { key: "last", name: "Quarto Minguante", visibility: "50% visível" },
  { key: "blood", name: "Lua de Sangue", visibility: "Evento lunar especial" },
  { key: "blue", name: "Lua Azul", visibility: "Evento lunar especial" },
  { key: "eclipse", name: "Eclipse Lunar", visibility: "Evento lunar especial" },
  { key: "sun", name: "Sol Radiante", visibility: "Corpo celeste diurno" }
];

const SEASONS = [
  { key: "spring", name: "Primavera", range: "21 de Março – 20 de Junho" },
  { key: "summer", name: "Verão", range: "21 de Junho – 22 de Setembro" },
  { key: "autumn", name: "Outono", range: "23 de Setembro – 20 de Dezembro" },
  { key: "winter", name: "Inverno", range: "21 de Dezembro – 20 de Março" }
];

const WEATHER_TYPES = {
  fog: { name: "Névoa", icon: "≋", temp: 8, description: "Céu encoberto com névoa e chuvas ocasionais.", humidity: 92, wind: "12 km/h NE", air: "Boa", pollen: "Baixo", rain: 65 },
  clear: { name: "Céu limpo", icon: "☀", temp: 18, description: "Céu aberto, luz clara e vento moderado.", humidity: 48, wind: "7 km/h L", air: "Excelente", pollen: "Médio", rain: 5 },
  rain: { name: "Chuva", icon: "🌧", temp: 11, description: "Chuva constante, nuvens densas e piso encharcado.", humidity: 96, wind: "18 km/h SO", air: "Boa", pollen: "Muito baixo", rain: 90 },
  storm: { name: "Tempestade", icon: "⛈", temp: 9, description: "Trovoadas, rajadas fortes e chuva volumosa.", humidity: 98, wind: "36 km/h O", air: "Regular", pollen: "Muito baixo", rain: 100 },
  snow: { name: "Neve", icon: "❄", temp: -3, description: "Neve contínua, vento gelado e baixa visibilidade.", humidity: 86, wind: "20 km/h N", air: "Boa", pollen: "Nulo", rain: 75 }
};

const THEMES = {
  purple: "Roxo", pink: "Rosa", red: "Vermelho", blue: "Azul",
  yellow: "Amarelo", white: "Branco", black: "Preto"
};

const UPDATE_CATEGORIES = {
  news: { name: "Notícias", icon: "fa-solid fa-newspaper" },
  event: { name: "Eventos", icon: "fa-solid fa-masks-theater" },
  notice: { name: "Avisos", icon: "fa-solid fa-shield-halved" }
};

const FORECAST = [
  ["Qua", "🌧", "8°", "65%"], ["Qui", "🌧", "6°", "70%"],
  ["Sex", "≋", "5°", "40%"], ["Sáb", "🌤", "4°", "20%"],
  ["Dom", "🌥", "7°", "10%"], ["Seg", "🌤", "9°", "15%"],
  ["Ter", "🌧", "8°", "55%"]
];

const FX_DEFINITIONS = {
  rain: {
    label: "Chuva intensa", icon: "🌧", type: "rain", effectId: "apiMacro_wondryxRain_p",
    description: "Chuva procedural sobre toda a cena.",
    options: { direction: 90, density: 0.18, speed: 1, alpha: 0.88 }
  },
  snow: {
    label: "Neve", icon: "❄", type: "snow", effectId: "apiMacro_wondryxSnow_p",
    description: "Flocos de neve sobre toda a cena.",
    options: { direction: 110, density: 0.12, speed: 0.8, alpha: 0.9 }
  },
  fog: {
    label: "Névoa baixa", icon: "≋", type: "fog", effectId: "apiMacro_wondryxFog_p",
    description: "Partículas de névoa para reduzir a clareza visual.",
    options: { direction: 25, density: 0.11, speed: 0.35, alpha: 0.55 }
  }
};

const PARTICLES_FX_PRESETS = [
  { key: "flash-light", label: "Clarão", icon: "✦", method: "spray", motion: "flash", color: "light" },
  { key: "explosion-fire", label: "Explosão de fogo", icon: "🔥", method: "spray", motion: "explosion", color: "fire" },
  { key: "ray-ice", label: "Raio de gelo", icon: "❄", method: "spray", motion: "ray", color: "ice" },
  { key: "aura-poison", label: "Aura venenosa", icon: "☠", method: "gravit", motion: "aura", color: "poison" },
  { key: "vortex-death", label: "Vórtice sombrio", icon: "◉", method: "gravit", motion: "vortex", color: "death" },
  { key: "sonar-cyber", label: "Pulso arcano", icon: "◇", method: "spray", motion: "sonar", color: "cyber" }
];

const DEFAULT_STATE = {
  year: 1885,
  month: 0,
  day: 3,
  minutes: 1420,
  phase: "gibbous",
  season: "winter",
  weather: "fog",
  theme: "purple",
  background: "",
  fxByScene: {},
  updates: {},
  events: {
    "1885-01-03": [
      { name: "Reunião do Conselho", time: "19:00", visibility: "Público", color: "purple" },
      { name: "Movimentação na Doca", time: "22:00", visibility: "Mestre", color: "red" }
    ]
  }
};

const clone = value => foundry.utils.deepClone(value);
const esc = value => foundry.utils.escapeHTML(String(value ?? ""));
const dateKey = (year, month, day) => `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

let state = clone(DEFAULT_STATE);
let activeTab = "updates";
let sceneLightTimer;
let updateFilter = "all";
let pendingUpdateAttachments = [];

Hooks.once("init", () => {
  game.settings.register(MODULE_ID, "state", {
    scope: "world", config: false, type: Object, default: clone(DEFAULT_STATE)
  });
  game.settings.register(MODULE_ID, "showTimebar", {
    name: "Exibir barra compacta de tempo",
    hint: "Mostra a barra arrastável de horário e clima.",
    scope: "client", config: true, type: Boolean, default: true, onChange: mountInterface
  });
  game.settings.register(MODULE_ID, "timebarCollapsed", {
    scope: "client", config: false, type: Boolean, default: false
  });
  game.settings.register(MODULE_ID, "playersCanOpen", {
    name: "Jogadores podem abrir o calendário",
    hint: "Permite que jogadores visualizem o calendário. Alterações mundiais continuam reservadas ao mestre.",
    scope: "world", config: true, type: Boolean, default: true, restricted: true, onChange: mountInterface
  });
  game.settings.register(MODULE_ID, "syncSceneLight", {
    name: "Sincronizar horário com a iluminação da cena",
    hint: "Ao arrastar a barra, o mestre altera environment.darknessLevel da cena atual.",
    scope: "world", config: true, type: Boolean, default: true, restricted: true
  });
});

Hooks.once("ready", () => {
  state = mergeState(game.settings.get(MODULE_ID, "state"));
  mountInterface();
});

Hooks.on("updateSetting", setting => {
  if (setting.key !== `${MODULE_ID}.state`) return;
  state = mergeState(setting.value);
  renderAll();
});

Hooks.on("canvasReady", () => renderAll());

function mergeState(value) {
  const merged = foundry.utils.mergeObject(clone(DEFAULT_STATE), value ?? {}, { inplace: false, recursive: true });
  merged.events ??= {};
  merged.updates ??= {};
  merged.fxByScene ??= {};
  return merged;
}

function canOpen() {
  return game.user.isGM || game.settings.get(MODULE_ID, "playersCanOpen");
}

function mountInterface() {
  document.querySelector("#wondryx-calendar-shell")?.remove();
  document.querySelector("#wondryx-calendar-toggle")?.remove();
  document.querySelector("#wondryx-timebar")?.remove();
  if (!canOpen()) return;

  if (game.settings.get(MODULE_ID, "showTimebar")) {
    document.body.insertAdjacentHTML("beforeend", timebarMarkup());
    bindTimebar();
  } else {
    document.body.insertAdjacentHTML("beforeend", `<button id="wondryx-calendar-toggle" data-theme="${state.theme}" title="Abrir Wondryx Calendar"><i class="fa-solid fa-calendar-days"></i></button>`);
    document.querySelector("#wondryx-calendar-toggle").addEventListener("click", toggleCalendar);
  }
}

function toggleCalendar() {
  const existing = document.querySelector("#wondryx-calendar-shell");
  if (existing) return existing.remove();
  document.body.insertAdjacentHTML("beforeend", calendarMarkup());
  bindCalendar();
  renderAll();
}

function timebarMarkup() {
  return `<section id="wondryx-timebar" class="wcal-timebar" data-theme="${state.theme}">
    <button class="wcal-time-season" data-action="next-season-bar" title="Alterar estação">
      <span data-role="bar-weather-icon" hidden></span>
      <i data-role="bar-season-icon"></i><strong data-role="bar-season"></strong>
    </button>
    <div class="wcal-time-main">
      <div class="wcal-time-track"><span class="wcal-track-sun">☀</span><div class="wcal-slider-wrap"><input type="range" min="0" max="1439" value="${state.minutes}" data-role="time" ${game.user.isGM ? "" : "disabled"}><i data-role="time-orb" hidden></i></div><span class="wcal-track-moon">☾</span></div>
      <div class="wcal-time-info"><strong data-role="clock"></strong><small data-role="date-label"></small></div>
    </div>
    <div class="wcal-time-chip" data-role="bar-weather"></div>
    <div class="wcal-time-chip" data-role="bar-rain"></div>
    <button data-action="toggle-timebar" aria-pressed="false"><i class="fa-solid fa-window-minimize"></i></button>
    <button data-action="open" title="Abrir calendário"><i class="fa-solid fa-calendar-days"></i></button>
  </section>`;
}

function calendarMarkup() {
  return `<section id="wondryx-calendar-shell" class="wcal-shell" data-theme="${state.theme}">
    <header class="wcal-header" data-drag-handle>
      <div class="wcal-brand"><i class="fa-solid fa-compass"></i><span>Wondryx Calendar<small>tempo, clima e histórias</small></span></div>
      <nav>
        <button data-tab="updates"><i class="fa-solid fa-newspaper"></i> Atualizações do Dia</button>
        <button data-tab="calendar"><i class="fa-solid fa-calendar-days"></i> Calendário</button>
        <button data-tab="climate"><i class="fa-solid fa-cloud-rain"></i> Clima</button>
        <button data-tab="effects"><i class="fa-solid fa-wand-sparkles"></i> Efeitos da Cena</button>
        <button data-tab="settings"><i class="fa-solid fa-gear"></i> Configurações</button>
      </nav>
      <button class="wcal-close" data-action="close" title="Fechar">×</button>
    </header>

    <main class="wcal-dashboard" data-view="${activeTab}">
      <section class="wcal-left-column">
        <section class="wcal-calendar-panel wcal-frame">
          <div class="wcal-month-head"><button data-action="prev-month">‹</button><h2 data-role="month-title"></h2><button data-action="next-month">›</button></div>
          <div class="wcal-week">${WEEKDAYS.map(day => `<span>${day}</span>`).join("")}</div>
          <div class="wcal-days" data-role="days"></div>
        </section>
        <section class="wcal-events wcal-frame">
          <h3 data-role="event-title"></h3>
          <div data-role="events"></div>
          <button data-action="add-event"><i class="fa-solid fa-circle-plus"></i> Adicionar evento</button>
        </section>
      </section>

      <section class="wcal-center-column">
        <section class="wcal-weather-hero wcal-frame">
          <img class="wcal-weather-background" data-role="weather-background" alt="">
          <div class="wcal-sky-body" data-role="sky-body"><img src="${MODULE_ROOT}/assets/moon-blood-illustrated.webp"></div>
          <div class="wcal-weather-now"><span data-role="weather-name"></span><strong data-role="weather-temp"></strong><p data-role="weather-description"></p></div>
          <dl>
            <div><dt>💧 Umidade</dt><dd data-role="weather-humidity"></dd></div>
            <div><dt>≋ Vento</dt><dd data-role="weather-wind"></dd></div>
            <div><dt>✿ Pólen</dt><dd data-role="weather-pollen"></dd></div>
            <div><dt>◉ Ar</dt><dd data-role="weather-air"></dd></div>
          </dl>
        </section>
        <section class="wcal-forecast-panel wcal-frame">
          <h3>Previsão para os próximos 7 dias</h3>
          <div class="wcal-forecast" data-role="forecast"></div>
        </section>
        <section class="wcal-weather-options wcal-frame">
          <h3>Alterar clima</h3>
          <div>${Object.entries(WEATHER_TYPES).map(([key, item]) => `<button data-weather="${key}"><i>${item.icon}</i><span>${item.name}</span></button>`).join("")}</div>
        </section>
      </section>

      <aside class="wcal-right-column">
        <div class="wcal-orbit-row">
          <button class="wcal-celestial-card wcal-frame" data-action="open-phases">
            <h3 data-role="celestial-title">Fase Lunar</h3>
            <div class="wcal-moon" data-role="moon"><img src="${MODULE_ROOT}/assets/moon-blood-illustrated.webp"></div>
            <strong data-role="phase-name"></strong><small data-role="phase-visibility"></small>
          </button>
          <button class="wcal-season-card wcal-frame" data-action="next-season">
            <h3>Estação Atual</h3><img src="${MODULE_ROOT}/assets/seasons-wheel.webp">
            <strong data-role="season-name"></strong><small data-role="season-range"></small>
          </button>
        </div>
        <section class="wcal-effects wcal-frame">
          <header><h3>🌲 Efeitos da Cena</h3><span>Mestre / Assistente</span></header>
          <div data-role="fx-list"></div>
          ${game.user.isGM ? '<button class="wcal-light-button" data-action="apply-light"><i class="fa-solid fa-moon"></i> Aplicar iluminação atual</button>' : ""}
        </section>
      </aside>
    </main>

    <section class="wcal-settings-panel" data-role="settings-panel" hidden>
      <div class="wcal-settings-card wcal-frame">
        <h2>Personalização visual</h2>
        <p>As cores abaixo alteram somente o degradê de destaque. O dourado e a legibilidade permanecem.</p>
        <div class="wcal-theme-grid">${Object.entries(THEMES).map(([key, name]) => `<button data-theme-choice="${key}"><i></i><span>${name}</span></button>`).join("")}</div>
      </div>
      <div class="wcal-settings-card wcal-frame">
        <h2>Imagem de fundo</h2>
        <p>Escolha uma imagem do Foundry para o painel central de clima.</p>
        <label>Caminho da imagem<input type="text" data-role="background-path" value="${esc(state.background)}" placeholder="${MODULE_ROOT}/assets/calendar-city.webp"></label>
        <div class="wcal-settings-actions"><button data-action="browse-background"><i class="fa-solid fa-folder-open"></i> Procurar</button><button data-action="save-background">Aplicar</button><button data-action="reset-background">Restaurar padrão</button></div>
      </div>
      <div class="wcal-settings-card wcal-frame">
        <h2>Integrações</h2>
        <p data-role="fxmaster-status"></p>
        <p>A iluminação utiliza o campo oficial <code>environment.darknessLevel</code> do Foundry v14.</p>
      </div>
    </section>

    <section class="wcal-updates-panel" data-role="updates-panel" hidden>
      <aside class="wcal-updates-scene wcal-frame">
        <div class="wcal-updates-hero">
          <img data-role="updates-background" alt="">
          <div class="wcal-updates-moon" data-role="updates-moon"><img src="${MODULE_ROOT}/assets/moon-blood-illustrated.webp" alt=""></div>
          <div class="wcal-updates-weather"><span data-role="updates-weather-name"></span><strong data-role="updates-weather-temp"></strong><p data-role="updates-weather-description"></p></div>
          <dl><div><dt>💧 Umidade</dt><dd data-role="updates-humidity"></dd></div><div><dt>≋ Vento</dt><dd data-role="updates-wind"></dd></div><div><dt>✿ Pólen</dt><dd data-role="updates-pollen"></dd></div><div><dt>◉ Ar</dt><dd data-role="updates-air"></dd></div></dl>
        </div>
        <div class="wcal-updates-calendar">
          <div class="wcal-month-head"><button data-update-month="-1">‹</button><h2 data-role="updates-month-title"></h2><button data-update-month="1">›</button></div>
          <div class="wcal-week">${WEEKDAYS.map(day => `<span>${day}</span>`).join("")}</div>
          <div class="wcal-mini-days" data-role="updates-days"></div>
        </div>
      </aside>
      <section class="wcal-chronicle wcal-frame">
        <header class="wcal-chronicle-head">
          <div><span class="wcal-kicker">Crônica de Valedouro</span><h2>Atualizações do Dia</h2><p data-role="updates-date"></p></div>
          ${game.user.isGM ? '<button data-action="add-update"><i class="fa-solid fa-plus"></i> Adicionar atualização</button>' : ""}
        </header>
        <nav class="wcal-update-filters">
          <button data-update-filter="all" class="active"><i class="fa-solid fa-layer-group"></i> Todas</button>
          <button data-update-filter="news"><i class="fa-solid fa-newspaper"></i> Notícias</button>
          <button data-update-filter="event"><i class="fa-solid fa-masks-theater"></i> Eventos</button>
          <button data-update-filter="notice"><i class="fa-solid fa-shield-halved"></i> Avisos</button>
        </nav>
        <div class="wcal-update-feed" data-role="update-feed"></div>
      </section>
    </section>

    <div class="wcal-phase-picker" data-role="phase-picker" hidden></div>
    <div class="wcal-modal-layer" data-role="event-modal" hidden>
      <form class="wcal-event-dialog">
        <header><div><span class="wcal-kicker">Novo registro</span><h2>Adicionar evento</h2></div><button type="button" data-action="cancel-event">×</button></header>
        <label>Nome do evento<input name="name" required maxlength="80" autocomplete="off"></label>
        <div class="wcal-form-row"><label>Horário<input name="time" type="time" value="20:00"></label><label>Visibilidade<select name="visibility"><option>Público</option><option>Mestre</option></select></label></div>
        <label>Descrição<textarea name="description" rows="3" maxlength="240"></textarea></label>
        <footer><button type="button" data-action="cancel-event">Cancelar</button><button type="submit"><i class="fa-solid fa-floppy-disk"></i> Salvar evento</button></footer>
      </form>
    </div>
    <div class="wcal-modal-layer" data-role="update-modal" hidden>
      <form class="wcal-update-dialog">
        <header><div><span class="wcal-kicker">Novo registro</span><h2>Adicionar atualização</h2></div><button type="button" data-action="cancel-update">×</button></header>
        <div class="wcal-form-row"><label>Título<input name="title" required maxlength="100" autocomplete="off"></label><label>Categoria<select name="category"><option value="news">Notícias</option><option value="event">Eventos</option><option value="notice">Avisos</option></select></label></div>
        <div class="wcal-form-row"><label>Horário<input name="time" type="time" value="12:00"></label><label>Visibilidade<select name="visibility"><option>Público</option><option>Mestre</option></select></label></div>
        <label>Indicador celeste<select name="celestial"><option value="none">Nenhum</option><option value="current">Lua ou Sol atual</option><option value="blood">Lua de Sangue</option><option value="sun">Sol</option></select></label>
        <label>Texto da atualização<textarea name="description" rows="4" maxlength="600" required></textarea></label>
        <section class="wcal-attachment-box"><header><div><strong>Anexos</strong><small>Imagens e documentos PDF</small></div><button type="button" data-action="browse-attachment"><i class="fa-solid fa-paperclip"></i> Adicionar arquivo</button></header><div data-role="pending-attachments"><p>Nenhum arquivo anexado.</p></div></section>
        <footer><button type="button" data-action="cancel-update">Cancelar</button><button type="submit"><i class="fa-solid fa-floppy-disk"></i> Publicar atualização</button></footer>
      </form>
    </div>
  </section>`;
}

function bindTimebar() {
  const bar = document.querySelector("#wondryx-timebar");
  if (!bar) return;
  makeDraggable(bar, bar);
  bar.querySelector('[data-action="open"]').addEventListener("click", toggleCalendar);
  bar.querySelector('[data-action="toggle-timebar"]').addEventListener("click", () => {
    game.settings.set(MODULE_ID, "timebarCollapsed", !game.settings.get(MODULE_ID, "timebarCollapsed"));
    applyTimebarCollapsed(bar);
  });
  applyTimebarCollapsed(bar);
  bar.querySelector('[data-action="next-season-bar"]').addEventListener("click", event => {
    event.stopPropagation();
    cycleSeason();
  });
  const slider = bar.querySelector('[data-role="time"]');
  slider.addEventListener("input", event => {
    state.minutes = Number(event.currentTarget.value);
    renderTimebar();
    scheduleSceneDarkness();
  });
  slider.addEventListener("change", persist);
  renderTimebar();
}

function applyTimebarCollapsed(bar) {
  const collapsed = game.settings.get(MODULE_ID, "timebarCollapsed");
  const button = bar.querySelector('[data-action="toggle-timebar"]');
  bar.classList.toggle("is-collapsed", collapsed);
  button.setAttribute("aria-pressed", String(collapsed));
  button.title = collapsed ? "Expandir barra de tempo" : "Minimizar barra de tempo";
  button.firstElementChild.className = collapsed ? "fa-solid fa-window-maximize" : "fa-solid fa-window-minimize";
}

function bindCalendar() {
  const shell = document.querySelector("#wondryx-calendar-shell");
  makeDraggable(shell, shell.querySelector("[data-drag-handle]"));
  shell.querySelector('[data-action="close"]').addEventListener("click", () => shell.remove());
  shell.querySelectorAll("[data-tab]").forEach(button => button.addEventListener("click", () => setActiveTab(button.dataset.tab)));
  shell.querySelector('[data-action="prev-month"]').addEventListener("click", () => moveMonth(-1));
  shell.querySelector('[data-action="next-month"]').addEventListener("click", () => moveMonth(1));
  shell.querySelector('[data-action="open-phases"]').addEventListener("click", togglePhasePicker);
  shell.querySelector('[data-action="next-season"]').addEventListener("click", cycleSeason);
  shell.querySelector('[data-action="add-event"]').addEventListener("click", openEventDialog);
  shell.querySelectorAll('[data-action="cancel-event"]').forEach(button => button.addEventListener("click", closeEventDialog));
  shell.querySelector(".wcal-event-dialog").addEventListener("submit", saveEvent);
  shell.querySelector('[data-action="add-update"]')?.addEventListener("click", openUpdateDialog);
  shell.querySelectorAll('[data-action="cancel-update"]').forEach(button => button.addEventListener("click", closeUpdateDialog));
  shell.querySelector('[data-action="browse-attachment"]')?.addEventListener("click", browseUpdateAttachment);
  shell.querySelector(".wcal-update-dialog")?.addEventListener("submit", saveUpdate);
  shell.querySelectorAll("[data-update-filter]").forEach(button => button.addEventListener("click", () => {
    updateFilter = button.dataset.updateFilter;
    safeRenderUpdates();
  }));
  shell.querySelectorAll("[data-update-month]").forEach(button => button.addEventListener("click", () => moveMonth(Number(button.dataset.updateMonth))));
  shell.querySelector('[data-action="apply-light"]')?.addEventListener("click", () => applySceneLight({ notify: true }));
  shell.querySelectorAll("[data-weather]").forEach(button => button.addEventListener("click", () => selectWeather(button.dataset.weather)));
  shell.querySelectorAll("[data-theme-choice]").forEach(button => button.addEventListener("click", () => selectTheme(button.dataset.themeChoice)));
  shell.querySelector('[data-action="browse-background"]').addEventListener("click", browseBackground);
  shell.querySelector('[data-action="save-background"]').addEventListener("click", saveBackground);
  shell.querySelector('[data-action="reset-background"]').addEventListener("click", resetBackground);
  setActiveTab(activeTab);
}

function setActiveTab(tab) {
  const allowed = ["calendar", "climate", "seasons", "effects", "updates", "settings"];
  activeTab = allowed.includes(tab) ? tab : "calendar";
  const shell = document.querySelector("#wondryx-calendar-shell");
  if (!shell) return;
  shell.querySelector(".wcal-dashboard").dataset.view = activeTab;
  shell.querySelector('[data-role="settings-panel"]').hidden = activeTab !== "settings";
  shell.querySelector('[data-role="updates-panel"]').hidden = activeTab !== "updates";
  shell.querySelector(".wcal-dashboard").hidden = activeTab === "settings" || activeTab === "updates";
  shell.querySelectorAll("[data-tab]").forEach(button => button.classList.toggle("active", button.dataset.tab === activeTab));
  if (activeTab === "updates") safeRenderUpdates();
}

function renderAll() {
  renderTheme();
  renderTimebar();
  renderCalendar();
  renderCelestial();
  renderSeason();
  renderWeather();
  renderForecast();
  renderEvents();
  renderEffects();
  renderSettings();
  safeRenderUpdates();
}

function renderTheme() {
  document.querySelector("#wondryx-timebar")?.setAttribute("data-theme", state.theme);
  document.querySelector("#wondryx-calendar-toggle")?.setAttribute("data-theme", state.theme);
  document.querySelector("#wondryx-calendar-shell")?.setAttribute("data-theme", state.theme);
}

function renderTimebar() {
  const bar = document.querySelector("#wondryx-timebar");
  if (!bar) return;
  const hours = Math.floor(state.minutes / 60);
  const minutes = state.minutes % 60;
  const date = new Date(state.year, state.month, state.day);
  const weather = WEATHER_TYPES[state.weather] ?? WEATHER_TYPES.fog;
  const season = SEASONS.find(item => item.key === state.season) ?? SEASONS[0];
  const background = state.background || `${MODULE_ROOT}/assets/calendar-city.webp`;
  bar.style.setProperty("--wcal-custom-background", cssUrl(background));
  bar.querySelector('[data-role="clock"]').textContent = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  bar.querySelector('[data-role="date-label"]').textContent = `${LONG_WEEKDAYS[date.getDay()]}, ${state.day} de ${MONTHS[state.month]}`;
  const timeInput = bar.querySelector('[data-role="time"]');
  timeInput.value = state.minutes;
  timeInput.dataset.phase = state.phase;
  bar.querySelector('[data-role="bar-weather-icon"]').textContent = weather.icon;
  bar.querySelector('[data-role="bar-weather"]').innerHTML = `${weather.icon} <b>${weather.name} · ${weather.temp}°C</b>`;
  bar.querySelector('[data-role="bar-rain"]').innerHTML = `🌧 <b>Chuva ${weather.rain}%</b>`;
  bar.querySelector('[data-role="bar-season"]').textContent = season.name;
  bar.querySelector('[data-role="bar-season-icon"]').className = seasonIcon(state.season);
  const orb = bar.querySelector('[data-role="time-orb"]');
  orb.style.left = `${state.minutes / 1439 * 100}%`;
  orb.dataset.phase = state.phase;
  orb.classList.toggle("night", hours < 6 || hours >= 18);
}

function renderCalendar() {
  const shell = document.querySelector("#wondryx-calendar-shell");
  if (!shell) return;
  shell.querySelector('[data-role="month-title"]').textContent = `${MONTHS[state.month]} ${state.year}`;
  const first = new Date(state.year, state.month, 1).getDay();
  const count = new Date(state.year, state.month + 1, 0).getDate();
  const cells = Math.ceil((first + count) / 7) * 7;
  const days = shell.querySelector('[data-role="days"]');
  days.innerHTML = "";
  for (let index = 0; index < cells; index++) {
    const day = index - first + 1;
    const button = document.createElement("button");
    if (day < 1 || day > count) button.disabled = true;
    else {
      const events = state.events[dateKey(state.year, state.month, day)] ?? [];
      button.innerHTML = `<span>${day}</span>${events.length ? `<i class="${events.some(event => event.visibility === "Mestre") ? "gm" : ""}"></i>` : ""}`;
      button.classList.toggle("selected", day === state.day);
      button.addEventListener("click", () => selectDay(day));
    }
    days.appendChild(button);
  }
}

function renderCelestial() {
  const shell = document.querySelector("#wondryx-calendar-shell");
  if (!shell) return;
  const phase = PHASES.find(item => item.key === state.phase) ?? PHASES[3];
  shell.querySelector('[data-role="moon"]').dataset.phase = phase.key;
  shell.querySelector('[data-role="sky-body"]').dataset.phase = phase.key;
  document.querySelector('[data-role="time-orb"]')?.setAttribute("data-phase", phase.key);
  document.querySelector('[data-role="time"]')?.setAttribute("data-phase", phase.key);
  shell.querySelector('[data-role="celestial-title"]').textContent = phase.key === "sun" ? "Corpo Celeste" : "Fase Lunar";
  shell.querySelector('[data-role="phase-name"]').textContent = phase.name;
  shell.querySelector('[data-role="phase-visibility"]').textContent = phase.visibility;
}

function renderSeason() {
  const shell = document.querySelector("#wondryx-calendar-shell");
  if (!shell) return;
  const season = SEASONS.find(item => item.key === state.season) ?? SEASONS[3];
  shell.querySelector('[data-role="season-name"]').textContent = season.name;
  shell.querySelector('[data-role="season-range"]').textContent = season.range;
}

function renderWeather() {
  const shell = document.querySelector("#wondryx-calendar-shell");
  if (!shell) return;
  const weather = WEATHER_TYPES[state.weather] ?? WEATHER_TYPES.fog;
  const values = {
    "weather-name": `${weather.icon} ${weather.name}`, "weather-temp": `${weather.temp}°C`,
    "weather-description": weather.description, "weather-humidity": `${weather.humidity}%`,
    "weather-wind": weather.wind, "weather-air": weather.air, "weather-pollen": weather.pollen
  };
  for (const [role, value] of Object.entries(values)) shell.querySelector(`[data-role="${role}"]`).textContent = value;
  shell.querySelectorAll("[data-weather]").forEach(button => button.classList.toggle("active", button.dataset.weather === state.weather));
  const background = state.background || `${MODULE_ROOT}/assets/calendar-city.webp`;
  const image = shell.querySelector('[data-role="weather-background"]');
  image.src = background;
  image.onerror = () => {
    image.onerror = null;
    image.src = `${MODULE_ROOT}/assets/calendar-city.webp`;
    ui.notifications.warn("A imagem escolhida não pôde ser carregada. O fundo padrão foi restaurado visualmente.");
  };
}

function renderForecast() {
  const root = document.querySelector('[data-role="forecast"]');
  if (!root) return;
  root.innerHTML = FORECAST.map(item => `<div><span>${item[0]}</span><i>${item[1]}</i><b>${item[2]}</b><small>💧 ${item[3]}</small></div>`).join("");
}

function renderEvents() {
  const shell = document.querySelector("#wondryx-calendar-shell");
  if (!shell) return;
  const events = state.events[dateKey(state.year, state.month, state.day)] ?? [];
  shell.querySelector('[data-role="event-title"]').textContent = `Eventos do dia ${state.day} de ${MONTHS[state.month]}`;
  shell.querySelector('[data-role="events"]').innerHTML = events.length
    ? events.filter(event => game.user.isGM || event.visibility !== "Mestre").map(event => `<div><i class="${event.visibility === "Mestre" ? "gm" : ""}"></i><span><b>${esc(event.name)}</b>${event.description ? `<small>${esc(event.description)}</small>` : ""}</span><time>${esc(event.time)}</time><em>${esc(event.visibility)}</em></div>`).join("")
    : `<p>Nenhum evento neste dia.</p>`;
}

function safeRenderUpdates() {
  try {
    renderUpdates();
  } catch (error) {
    console.error(`${MODULE_ID} | Falha isolada ao renderizar Atualizações do Dia`, error);
  }
}

function renderUpdates() {
  const shell = document.querySelector("#wondryx-calendar-shell");
  if (!shell) return;
  const panel = shell.querySelector('[data-role="updates-panel"]');
  if (!panel) return;
  state.updates ??= {};
  const weather = WEATHER_TYPES[state.weather] ?? WEATHER_TYPES.fog;
  const date = new Date(state.year, state.month, state.day);
  const background = state.background || `${MODULE_ROOT}/assets/calendar-city.webp`;
  const dayUpdates = Array.isArray(state.updates[dateKey(state.year, state.month, state.day)]) ? state.updates[dateKey(state.year, state.month, state.day)] : [];
  const updates = dayUpdates
    .map((item, index) => ({ ...item, index }))
    .filter(item => (game.user.isGM || item.visibility !== "Mestre") && (updateFilter === "all" || item.category === updateFilter));

  const image = shell.querySelector('[data-role="updates-background"]');
  image.src = background;
  image.onerror = () => { image.onerror = null; image.src = `${MODULE_ROOT}/assets/calendar-city.webp`; };
  shell.querySelector('[data-role="updates-weather-name"]').textContent = `${weather.icon} ${weather.name}`;
  shell.querySelector('[data-role="updates-weather-temp"]').textContent = `${weather.temp}°C`;
  shell.querySelector('[data-role="updates-weather-description"]').textContent = weather.description;
  shell.querySelector('[data-role="updates-humidity"]').textContent = `${weather.humidity}%`;
  shell.querySelector('[data-role="updates-wind"]').textContent = weather.wind;
  shell.querySelector('[data-role="updates-pollen"]').textContent = weather.pollen;
  shell.querySelector('[data-role="updates-air"]').textContent = weather.air;
  shell.querySelector('[data-role="updates-date"]').textContent = `${LONG_WEEKDAYS[date.getDay()]}, ${state.day} de ${MONTHS[state.month]} de ${state.year}`;
  shell.querySelector('[data-role="updates-month-title"]').textContent = `${MONTHS[state.month]} ${state.year}`;
  shell.querySelector('[data-role="updates-moon"]').dataset.phase = state.phase;
  shell.querySelectorAll("[data-update-filter]").forEach(button => button.classList.toggle("active", button.dataset.updateFilter === updateFilter));
  renderMiniCalendar(shell.querySelector('[data-role="updates-days"]'));

  const feed = shell.querySelector('[data-role="update-feed"]');
  feed.innerHTML = (updates.length ? updates.map(updateMarkup).join("") : `<div class="wcal-empty-chronicle"><i class="fa-regular fa-newspaper"></i><h3>Nenhuma atualização neste dia</h3><p>Notícias, eventos, avisos e arquivos publicados aparecerão aqui.</p></div>`) + recentUpdatesMarkup(dateKey(state.year, state.month, state.day));
  feed.querySelectorAll("[data-delete-update]").forEach(button => button.addEventListener("click", () => deleteUpdate(Number(button.dataset.deleteUpdate))));
  feed.querySelectorAll("[data-recent-date]").forEach(button => button.addEventListener("click", () => jumpToDate(button.dataset.recentDate)));
}

// Publicações dos dias anteriores ao dia aberto, com a mesma regra de visibilidade e o mesmo filtro do feed.
function recentUpdatesMarkup(currentKey) {
  const items = Object.entries(state.updates ?? {})
    .filter(([key]) => key < currentKey)
    .flatMap(([key, list]) => (Array.isArray(list) ? list : []).map(item => ({ ...item, key })))
    .filter(item => (game.user.isGM || item.visibility !== "Mestre") && (updateFilter === "all" || item.category === updateFilter))
    .sort((a, b) => b.key.localeCompare(a.key) || String(b.time).localeCompare(String(a.time)))
    .slice(0, 8);
  if (!items.length) return "";
  const rows = items.map(item => {
    const [year, month, day] = item.key.split("-");
    const category = UPDATE_CATEGORIES[item.category] ?? UPDATE_CATEGORIES.news;
    const attachments = Array.isArray(item.attachments) ? item.attachments.length : 0;
    return `<li><button type="button" data-recent-date="${esc(item.key)}" data-category="${esc(item.category)}"><time>${day}/${month}${Number(year) === state.year ? "" : `/${year}`}</time><span>${esc(item.title)}</span><em><i class="${category.icon}"></i> ${category.name}</em>${attachments ? '<i class="fa-solid fa-paperclip" title="Possui anexo"></i>' : ""}</button></li>`;
  }).join("");
  return `<section class="wcal-recent" data-role="recent-updates"><h4>Publicações recentes</h4><ul>${rows}</ul></section>`;
}

function jumpToDate(key) {
  const [year, month, day] = key.split("-").map(Number);
  if (!year || !month || !day) return;
  state.year = year;
  state.month = month - 1;
  state.day = day;
  renderAll();
  persist();
}

function renderMiniCalendar(root) {
  if (!root) return;
  state.updates ??= {};
  const first = new Date(state.year, state.month, 1).getDay();
  const count = new Date(state.year, state.month + 1, 0).getDate();
  const cells = Math.ceil((first + count) / 7) * 7;
  root.innerHTML = "";
  for (let index = 0; index < cells; index++) {
    const day = index - first + 1;
    const button = document.createElement("button");
    if (day < 1 || day > count) button.disabled = true;
    else {
      const records = state.updates[dateKey(state.year, state.month, day)] ?? [];
      const celestial = records.find(item => item.celestial && item.celestial !== "none");
      button.innerHTML = `<span>${day}</span>${celestial ? celestialMarker(celestial.celestial) : records.length ? "<i></i>" : ""}`;
      button.classList.toggle("selected", day === state.day);
      button.addEventListener("click", () => selectDay(day));
    }
    root.appendChild(button);
  }
}

function updateMarkup(item) {
  const category = UPDATE_CATEGORIES[item.category] ?? UPDATE_CATEGORIES.news;
  const attachments = Array.isArray(item.attachments) ? item.attachments : [];
  return `<article class="wcal-update-card" data-category="${esc(item.category)}">
    <div class="wcal-update-icon"><i class="${category.icon}"></i></div>
    <div class="wcal-update-copy"><header><h3>${esc(item.title)}</h3><time>${celestialInline(item.celestial)} ${esc(item.time)}</time></header><p>${esc(item.description)}</p>${attachments.length ? `<div class="wcal-attachments">${attachments.map(attachmentMarkup).join("")}</div>` : ""}</div>
    <aside><span>${category.name}</span><small><i class="fa-solid fa-eye"></i> ${esc(item.visibility === "Mestre" ? "Somente mestre" : "Visível para todos")}</small>${game.user.isGM ? `<button data-delete-update="${item.index}" title="Excluir atualização"><i class="fa-solid fa-trash"></i></button>` : ""}</aside>
  </article>`;
}

function attachmentMarkup(path) {
  const label = String(path).split("/").pop() || "Arquivo";
  if (/\.(png|jpe?g|webp|gif|avif)$/i.test(path)) return `<a class="wcal-image-attachment" href="${esc(path)}" target="_blank"><img src="${esc(path)}" alt=""><span>${esc(label)}</span></a>`;
  return `<a class="wcal-file-attachment" href="${esc(path)}" target="_blank"><i class="fa-solid fa-file-pdf"></i><span>${esc(label)}</span><i class="fa-solid fa-download"></i></a>`;
}

function renderEffects() {
  const root = document.querySelector('[data-role="fx-list"]');
  if (!root) return;
  const active = sceneFxState();
  const fxmasterAvailable = Boolean(globalThis.FXMASTER?.api?.effects);
  const particlesFxAvailable = Boolean(game.modules.get(PARTICLES_FX_MODULE_ID)?.active && game.modules.get(PARTICLES_FX_MODULE_ID)?.api?.emit);
  const particleEntries = fxmasterRegistry("particle");
  const filterEntries = fxmasterRegistry("filter");
  root.innerHTML = `
    <section class="wcal-fx-group"><h4>FXMaster · Partículas <small>${particleEntries.length} disponíveis</small></h4>${particleEntries.map(entry => fxEntryMarkup(entry, active, fxmasterAvailable)).join("")}</section>
    <section class="wcal-fx-group"><h4>FXMaster · Filtros <small>${filterEntries.length} disponíveis</small></h4>${filterEntries.map(entry => fxEntryMarkup(entry, active, fxmasterAvailable)).join("")}</section>
    <section class="wcal-fx-group"><h4>Particles FX · Emissões <small>${particlesFxAvailable ? "pronto" : "módulo ausente"}</small></h4>${PARTICLES_FX_PRESETS.map(preset => `<article><i>${preset.icon}</i><span><b>${preset.label}</b><small>${preset.motion} + ${preset.color}</small></span><em>Uso pontual</em>${game.user.isGM ? `<button data-pfx="${preset.key}" ${particlesFxAvailable ? "" : "disabled"}>Disparar</button>` : ""}</article>`).join("")}${game.user.isGM ? `<button class="wcal-stop-pfx" data-action="stop-pfx" ${particlesFxAvailable ? "" : "disabled"}>Interromper todas as emissões Particles FX</button>` : ""}</section>`;
  root.querySelectorAll("[data-fx-kind]").forEach(button => button.addEventListener("click", () => toggleFxMasterEffect(button.dataset.fxKind, button.dataset.fxType)));
  root.querySelectorAll("[data-pfx]").forEach(button => button.addEventListener("click", () => triggerParticlesFx(button.dataset.pfx)));
  root.querySelector('[data-action="stop-pfx"]')?.addEventListener("click", stopParticlesFx);
}

function fxmasterRegistry(kind) {
  const registryName = kind === "particle" ? "particleEffects" : "filterEffects";
  const registry = globalThis.CONFIG?.fxmaster?.[registryName] ?? {};
  const installed = Object.entries(registry).map(([type, config]) => ({
    kind,
    type,
    label: localizedEffectLabel(type, config),
    icon: effectIcon(type, kind),
    description: kind === "particle" ? "Efeito de partículas do FXMaster." : "Filtro visual do FXMaster."
  }));
  if (installed.length) return installed.sort((a, b) => a.label.localeCompare(b.label));
  if (kind === "particle") return Object.values(FX_DEFINITIONS).map(effect => ({ kind, type: effect.type, label: effect.label, icon: effect.icon, description: effect.description }));
  return [];
}

function localizedEffectLabel(type, config) {
  const candidate = config?.label ?? config?.name ?? config?.title;
  if (typeof candidate === "string") {
    const localized = game.i18n.localize(candidate);
    if (localized && localized !== candidate) return localized;
    if (!candidate.includes(".")) return candidate;
  }
  return type.replace(/([a-z])([A-Z])/g, "$1 $2").replaceAll("_", " ").replace(/^./, letter => letter.toUpperCase());
}

function effectIcon(type, kind) {
  const icons = { rain: "🌧", snow: "❄", snowstorm: "🌨", fog: "≋", clouds: "☁", hail: "◆", autumnleaves: "🍂", birds: "🕊", bats: "🦇", crows: "🐦", spiders: "🕷", rats: "🐀", embers: "🔥", stars: "✦", bubbles: "◌", lightning: "⚡", underwater: "≋", bloom: "✦", oldfilm: "▥", color: "◉", screenShake: "✷" };
  return icons[type.toLowerCase()] ?? (kind === "particle" ? "✧" : "◈");
}

function fxEntryMarkup(entry, active, available) {
  const key = `fxmaster:${entry.kind}:${entry.type}`;
  const enabled = Boolean(active[key]);
  return `<article><i>${entry.icon}</i><span><b>${esc(entry.label)}</b><small>${entry.description}</small></span><em class="${enabled ? "active" : ""}">${enabled ? "● Ativo" : available ? "○ Inativo" : "FXMaster ausente"}</em>${game.user.isGM ? `<button data-fx-kind="${entry.kind}" data-fx-type="${entry.type}" ${available ? "" : "disabled"}>${enabled ? "Desativar" : "Ativar"}</button>` : ""}</article>`;
}

function renderSettings() {
  const shell = document.querySelector("#wondryx-calendar-shell");
  if (!shell) return;
  shell.querySelector('[data-role="background-path"]').value = state.background;
  shell.querySelectorAll("[data-theme-choice]").forEach(button => button.classList.toggle("active", button.dataset.themeChoice === state.theme));
  const fxmasterInstalled = Boolean(globalThis.FXMASTER?.api?.effects);
  const particlesInstalled = Boolean(game.modules.get(PARTICLES_FX_MODULE_ID)?.active && game.modules.get(PARTICLES_FX_MODULE_ID)?.api?.emit);
  shell.querySelector('[data-role="fxmaster-status"]').innerHTML = `${fxmasterInstalled ? '<strong class="wcal-ok">● FXMaster detectado.</strong>' : '<strong class="wcal-warn">● FXMaster não detectado.</strong>'}<br>${particlesInstalled ? '<strong class="wcal-ok">● Particles FX detectado.</strong>' : '<strong class="wcal-warn">● Particles FX não detectado.</strong>'}`;
}

function togglePhasePicker() {
  const picker = document.querySelector('[data-role="phase-picker"]');
  picker.hidden = !picker.hidden;
  if (picker.hidden) return;
  picker.innerHTML = `<header><strong>Escolher Lua ou Sol</strong><button data-action="close-picker">×</button></header><div>${PHASES.map(phase => `<button data-phase="${phase.key}" class="${phase.key === state.phase ? "active" : ""}"><span class="wcal-phase-preview" data-phase="${phase.key}"><img src="${MODULE_ROOT}/assets/moon-blood-illustrated.webp"></span><b>${phase.name}</b></button>`).join("")}</div>`;
  picker.querySelector('[data-action="close-picker"]').addEventListener("click", () => picker.hidden = true);
  picker.querySelectorAll("[data-phase]").forEach(button => button.addEventListener("click", async () => {
    state.phase = button.dataset.phase;
    picker.hidden = true;
    renderCelestial();
    await persist();
  }));
}

function moveMonth(delta) {
  state.month += delta;
  if (state.month < 0) { state.month = 11; state.year--; }
  if (state.month > 11) { state.month = 0; state.year++; }
  state.day = 1;
  renderAll();
  persist();
}

function selectDay(day) {
  state.day = day;
  renderAll();
  persist();
}

function cycleSeason() {
  if (!game.user.isGM) return ui.notifications.warn("Somente o mestre pode alterar a estação.");
  const current = Math.max(0, SEASONS.findIndex(item => item.key === state.season));
  state.season = SEASONS[(current + 1) % SEASONS.length].key;
  renderSeason();
  renderTimebar();
  persist();
}

function selectWeather(key) {
  if (!game.user.isGM) return ui.notifications.warn("Somente o mestre pode alterar o clima.");
  if (!WEATHER_TYPES[key]) return;
  state.weather = key;
  renderAll();
  persist();
}

function selectTheme(key) {
  if (!game.user.isGM) return ui.notifications.warn("Somente o mestre pode alterar o tema mundial.");
  if (!THEMES[key]) return;
  state.theme = key;
  renderAll();
  persist();
}

function openEventDialog() {
  if (!game.user.isGM) return ui.notifications.warn("Somente o mestre pode adicionar eventos.");
  const modal = document.querySelector('[data-role="event-modal"]');
  modal.hidden = false;
  modal.querySelector('input[name="name"]').focus();
}

function closeEventDialog() {
  const modal = document.querySelector('[data-role="event-modal"]');
  modal.hidden = true;
  modal.querySelector("form").reset();
}

async function saveEvent(event) {
  event.preventDefault();
  if (!game.user.isGM) return;
  const data = new FormData(event.currentTarget);
  const name = String(data.get("name") ?? "").trim();
  if (!name) return;
  const key = dateKey(state.year, state.month, state.day);
  state.events[key] ??= [];
  state.events[key].push({
    name,
    time: String(data.get("time") || "20:00"),
    visibility: String(data.get("visibility") || "Público"),
    description: String(data.get("description") ?? "").trim()
  });
  closeEventDialog();
  renderAll();
  await persist();
}

function openUpdateDialog() {
  if (!game.user.isGM) return ui.notifications.warn("Somente o mestre pode publicar atualizações.");
  pendingUpdateAttachments = [];
  const modal = document.querySelector('[data-role="update-modal"]');
  if (!modal) return;
  modal.hidden = false;
  renderPendingAttachments();
  modal.querySelector('input[name="title"]')?.focus();
}

function closeUpdateDialog() {
  const modal = document.querySelector('[data-role="update-modal"]');
  if (!modal) return;
  modal.hidden = true;
  modal.querySelector("form")?.reset();
  pendingUpdateAttachments = [];
}

function browseUpdateAttachment() {
  if (!game.user.isGM) return;
  const FilePicker = foundry.applications.apps.FilePicker.implementation;
  const picker = new FilePicker({
    type: "any",
    callback: path => {
      if (!pendingUpdateAttachments.includes(path)) pendingUpdateAttachments.push(path);
      renderPendingAttachments();
    }
  });
  picker.render({ force: true });
}

function renderPendingAttachments() {
  const root = document.querySelector('[data-role="pending-attachments"]');
  if (!root) return;
  root.innerHTML = pendingUpdateAttachments.length
    ? pendingUpdateAttachments.map((path, index) => `<div><i class="fa-solid ${/\.pdf$/i.test(path) ? "fa-file-pdf" : "fa-image"}"></i><span>${esc(path.split("/").pop())}</span><button type="button" data-remove-attachment="${index}">×</button></div>`).join("")
    : "<p>Nenhum arquivo anexado.</p>";
  root.querySelectorAll("[data-remove-attachment]").forEach(button => button.addEventListener("click", () => {
    pendingUpdateAttachments.splice(Number(button.dataset.removeAttachment), 1);
    renderPendingAttachments();
  }));
}

async function saveUpdate(event) {
  event.preventDefault();
  if (!game.user.isGM) return;
  const data = new FormData(event.currentTarget);
  const title = String(data.get("title") ?? "").trim();
  const description = String(data.get("description") ?? "").trim();
  if (!title || !description) return;
  const key = dateKey(state.year, state.month, state.day);
  state.updates ??= {};
  state.updates[key] ??= [];
  state.updates[key].push({
    title,
    description,
    category: UPDATE_CATEGORIES[data.get("category")] ? String(data.get("category")) : "news",
    time: String(data.get("time") || "12:00"),
    visibility: String(data.get("visibility") || "Público"),
    celestial: normalizeCelestial(data.get("celestial")),
    attachments: [...pendingUpdateAttachments]
  });
  closeUpdateDialog();
  renderAll();
  await persist();
}

async function deleteUpdate(index) {
  if (!game.user.isGM) return;
  const key = dateKey(state.year, state.month, state.day);
  const items = state.updates?.[key] ?? [];
  if (!items[index]) return;
  items.splice(index, 1);
  if (!items.length) delete state.updates[key];
  renderAll();
  await persist();
}

function browseBackground() {
  if (!game.user.isGM) return;
  const FilePicker = foundry.applications.apps.FilePicker.implementation;
  const picker = new FilePicker({
    type: "image",
    current: state.background || `${MODULE_ROOT}/assets/calendar-city.webp`,
    callback: async path => {
      state.background = path;
      document.querySelector('[data-role="background-path"]').value = path;
      renderWeather();
      renderTimebar();
      safeRenderUpdates();
      await persist();
      ui.notifications.info("Novo fundo aplicado ao calendário e à barra de tempo.");
    }
  });
  picker.render({ force: true });
}

function saveBackground() {
  if (!game.user.isGM) return;
  state.background = document.querySelector('[data-role="background-path"]').value.trim();
  renderWeather();
  renderTimebar();
  safeRenderUpdates();
  persist();
  ui.notifications.info("Novo fundo aplicado ao calendário e à barra de tempo.");
}

function resetBackground() {
  if (!game.user.isGM) return;
  state.background = "";
  renderWeather();
  renderTimebar();
  safeRenderUpdates();
  renderSettings();
  persist();
}

function cssUrl(path) {
  // url() dentro de custom property resolve contra o CSS; ancorar no documento, como o src de <img>.
  const absolute = new URL(String(path), document.baseURI).href;
  return `url("${absolute.replaceAll("\\", "\\\\").replaceAll('"', '\\"')}")`;
}

function seasonIcon(key) {
  return {
    spring: "fa-solid fa-seedling",
    summer: "fa-solid fa-sun",
    autumn: "fa-solid fa-leaf",
    winter: "fa-regular fa-snowflake"
  }[key] ?? "fa-solid fa-seedling";
}

function normalizeCelestial(value) {
  const selected = String(value ?? "none");
  if (selected === "current") return state.phase;
  return ["none", "blood", "sun"].includes(selected) ? selected : "none";
}

function celestialMarker(value) {
  const phase = normalizeStoredCelestial(value);
  return phase === "sun"
    ? '<i class="wcal-day-celestial sun" title="Sol"></i>'
    : `<i class="wcal-day-celestial moon" data-phase="${esc(phase)}" title="Lua"></i>`;
}

function celestialInline(value) {
  const phase = normalizeStoredCelestial(value);
  if (phase === "none") return "";
  return phase === "sun"
    ? '<i class="wcal-inline-celestial sun" title="Sol"></i>'
    : `<i class="wcal-inline-celestial moon" data-phase="${esc(phase)}" title="Lua"></i>`;
}

function normalizeStoredCelestial(value) {
  const key = String(value ?? "none");
  return PHASES.some(phase => phase.key === key) ? key : "none";
}

function darknessForMinutes(minutes) {
  const hour = minutes / 60;
  if (hour >= 7 && hour <= 17) return 0.08;
  if (hour >= 20 || hour <= 4) return 0.86;
  if (hour > 17 && hour < 20) return 0.08 + ((hour - 17) / 3) * 0.78;
  return 0.86 - ((hour - 4) / 3) * 0.78;
}

function scheduleSceneDarkness() {
  if (!game.user.isGM || !game.settings.get(MODULE_ID, "syncSceneLight") || !canvas?.scene) return;
  window.clearTimeout(sceneLightTimer);
  sceneLightTimer = window.setTimeout(() => applySceneLight({ notify: false }), 90);
}

async function applySceneLight({ notify = false } = {}) {
  if (!game.user.isGM || !canvas?.scene) return;
  try {
    await canvas.scene.update({ "environment.darknessLevel": darknessForMinutes(state.minutes) });
    if (notify) ui.notifications.info("Iluminação aplicada à cena.");
  } catch (error) {
    console.error(`${MODULE_ID} | Falha ao atualizar a iluminação`, error);
    ui.notifications.error("Não foi possível atualizar a iluminação da cena.");
  }
}

function sceneFxState() {
  const sceneId = canvas?.scene?.id;
  if (!sceneId) return {};
  return state.fxByScene[sceneId] ?? {};
}

async function toggleFxMasterEffect(kind, type) {
  if (!game.user.isGM || !canvas?.scene) return;
  const api = globalThis.FXMASTER?.api?.effects;
  if (!api) return ui.notifications.error("FXMaster não está instalado, ativo ou pronto.");
  const current = sceneFxState();
  const stateKey = `fxmaster:${kind}:${type}`;
  const isActive = Boolean(current[stateKey]);
  const payload = { type, options: {} };
  const collection = kind === "particle" ? { particles: [payload] } : { filters: [payload] };
  try {
    const result = await api.toggle({
      ...collection,
      scene: canvas.scene,
      toggleKey: `wondryx-calendar-${canvas.scene.id}-${kind}-${type}`
    });
    const becameActive = typeof result?.active === "boolean" ? result.active : !isActive;
    const sceneId = canvas.scene.id;
    state.fxByScene[sceneId] ??= {};
    state.fxByScene[sceneId][stateKey] = becameActive;
    renderEffects();
    await persist();
    ui.notifications.info(`${localizedEffectLabel(type)}: ${becameActive ? "ativado" : "desativado"}.`);
  } catch (error) {
    console.error(`${MODULE_ID} | Falha no FXMaster`, error);
    ui.notifications.error(`Não foi possível ${isActive ? "desativar" : "ativar"} ${type}.`);
  }
}

async function triggerParticlesFx(key) {
  if (!game.user.isGM) return;
  const preset = PARTICLES_FX_PRESETS.find(item => item.key === key);
  const api = game.modules.get(PARTICLES_FX_MODULE_ID)?.api?.emit;
  if (!preset || !api) return ui.notifications.error("Particles FX não está instalado ou ativo.");
  const source = canvas.tokens?.controlled?.[0]?.id ?? { x: canvas.stage.pivot.x, y: canvas.stage.pivot.y };
  try {
    const method = api[preset.method];
    if (typeof method !== "function") throw new Error(`Método ${preset.method} indisponível`);
    await method(preset.motion, preset.color, "circle", { source });
    ui.notifications.info(`${preset.label} disparado no token selecionado ou no centro da tela.`);
  } catch (error) {
    console.error(`${MODULE_ID} | Falha no Particles FX`, error);
    ui.notifications.error(`Não foi possível disparar ${preset.label}.`);
  }
}

async function stopParticlesFx() {
  const stopAll = game.modules.get(PARTICLES_FX_MODULE_ID)?.api?.emit?.stopAll;
  if (typeof stopAll !== "function") return;
  await stopAll(true);
  ui.notifications.info("Emissões do Particles FX interrompidas.");
}

async function persist() {
  if (!game.user.isGM) return;
  await game.settings.set(MODULE_ID, "state", clone(state));
}

function makeDraggable(element, handle) {
  let dragging = false;
  let offsetX = 0;
  let offsetY = 0;
  handle.addEventListener("pointerdown", event => {
    if (event.target.closest("button, input, select, textarea, nav")) return;
    dragging = true;
    const rect = element.getBoundingClientRect();
    offsetX = event.clientX - rect.left;
    offsetY = event.clientY - rect.top;
    handle.setPointerCapture(event.pointerId);
  });
  handle.addEventListener("pointermove", event => {
    if (!dragging) return;
    element.style.left = `${Math.max(0, Math.min(window.innerWidth - element.offsetWidth, event.clientX - offsetX))}px`;
    element.style.top = `${Math.max(0, Math.min(window.innerHeight - element.offsetHeight, event.clientY - offsetY))}px`;
    element.style.transform = "none";
  });
  handle.addEventListener("pointerup", () => dragging = false);
  handle.addEventListener("pointercancel", () => dragging = false);
}
