import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const root = new URL("../", import.meta.url);
const read = path => readFileSync(new URL(path, root), "utf8");
const manifest = JSON.parse(read("module.json"));
const js = read("scripts/wondryx-calendar.mjs");
const css = read("styles/wondryx-calendar.css");

// Contrato funcional da baseline 0.7.0: nenhum destes seletores pode sumir.
const DATA_ROLES = ["background-path", "bar-rain", "bar-season", "bar-season-icon", "bar-weather", "bar-weather-icon", "celestial-title", "clock", "date-label", "days", "event-modal", "event-title", "events", "forecast", "fx-list", "fxmaster-status", "month-title", "moon", "pending-attachments", "phase-name", "phase-picker", "phase-visibility", "season-name", "season-range", "settings-panel", "sky-body", "time", "time-orb", "update-feed", "update-modal", "updates-air", "updates-background", "updates-date", "updates-days", "updates-humidity", "updates-month-title", "updates-moon", "updates-panel", "updates-pollen", "updates-weather-description", "updates-weather-name", "updates-weather-temp", "updates-wind", "weather-air", "weather-background", "weather-description", "weather-humidity", "weather-name", "weather-pollen", "weather-temp", "weather-wind"];
const DATA_ACTIONS = ["add-event", "add-update", "apply-light", "browse-attachment", "browse-background", "cancel-event", "cancel-update", "close", "close-picker", "next-month", "next-season", "next-season-bar", "open", "open-phases", "prev-month", "reset-background", "save-background", "stop-pfx"];

test("manifesto mantém compatibilidade e integrações", () => {
  assert.equal(manifest.id, "wondryx-calendar");
  assert.match(manifest.version, /^0\.7\.\d+$/);
  assert.equal(manifest.compatibility.minimum, "14");
  assert.equal(manifest.compatibility.verified, "14.367");
  const ids = manifest.relationships.recommends.map(item => item.id);
  assert.deepEqual(ids.sort(), ["fxmaster", "particule-fx"]);
});

test("superfícies funcionais continuam no markup", () => {
  for (const tab of ["calendar", "climate", "effects", "updates", "settings"]) assert.ok(js.includes(`data-tab="${tab}"`), tab);
  for (const category of ["news", "event", "notice"]) assert.ok(js.includes(`${category}:`), category);
  assert.ok(js.includes("fx-list") && js.includes("update-feed") && js.includes("settings-panel"));
});

test("ordem de renderização preservada", () => {
  const body = js.slice(js.indexOf("function renderAll()"));
  const order = ["renderTheme", "renderTimebar", "renderCalendar", "renderCelestial", "renderSeason", "renderWeather", "renderForecast", "renderEvents", "renderEffects", "renderSettings", "safeRenderUpdates"];
  const positions = order.map(name => body.indexOf(`${name}();`));
  assert.ok(positions.every(position => position > -1));
  assert.deepEqual([...positions].sort((a, b) => a - b), positions);
});

test("a Lua/Sol é o thumb nativo do range de horário", () => {
  assert.match(js, /<input type="range" min="0" max="1439"[^>]*data-role="time"/);
  assert.match(css, /input\[data-role="time"\]::-webkit-slider-thumb/);
  assert.match(css, /input\[data-role="time"\]::-moz-range-thumb/);
  assert.match(css, /input\[data-phase="sun"\]::-webkit-slider-thumb/);
});

test("fundo escolhido sincroniza janela e HUD", () => {
  assert.match(js, /bar\.style\.setProperty\("--wcal-custom-background"/);
  assert.match(css, /var\(--wcal-custom-background\)/);
  for (const fn of ["browseBackground", "saveBackground", "resetBackground"]) {
    const body = js.slice(js.indexOf(`function ${fn}`), js.indexOf(`function ${fn}`) + 700);
    assert.ok(body.includes("renderWeather()") && body.includes("renderTimebar()"), fn);
  }
});

test("Particles FX usa o ID oficial particule-fx", () => {
  assert.match(js, /PARTICLES_FX_MODULE_ID = "particule-fx"/);
  assert.ok(!js.includes('"particles-fx"'));
});

test("seletores funcionais data-role/data-action/data-tab preservados", () => {
  for (const role of DATA_ROLES) assert.ok(js.includes(`data-role="${role}"`), `data-role=${role}`);
  for (const action of DATA_ACTIONS) assert.ok(js.includes(`data-action="${action}"`), `data-action=${action}`);
  for (const attr of ["data-weather", "data-theme-choice", "data-update-filter", "data-update-month", "data-pfx", "data-fx-kind", "data-delete-update"]) assert.ok(js.includes(attr), attr);
});

test("chaves de settings e integrações não foram renomeadas", () => {
  for (const key of ["state", "showTimebar", "playersCanOpen", "syncSceneLight"]) assert.ok(js.includes(`register(MODULE_ID, "${key}"`), key);
  assert.ok(js.includes("environment.darknessLevel"));
  assert.ok(js.includes("FXMASTER?.api?.effects"));
});

test("fundo do HUD é resolvido contra o documento (url() em custom property não herda a pasta do CSS)", () => {
  const body = js.slice(js.indexOf("function cssUrl"), js.indexOf("function cssUrl") + 500);
  assert.ok(body.includes("document.baseURI"));
});

test("painéis ocultos não são sobrescritos por display do CSS", () => {
  assert.match(css, /\.wcal-dashboard\[hidden\][^}]*display:\s*none\s*!important/);
});

test("cards com vários anexos empilham os anexos sob o texto", () => {
  assert.ok(css.includes(".wcal-update-card:has(.wcal-attachments > :nth-child(2))"));
});

test("ordem das abas: Atualizações, Calendário, Clima, Efeitos, Configurações", () => {
  const nav = js.slice(js.indexOf("<nav>"), js.indexOf("</nav>"));
  const order = ["updates", "calendar", "climate", "effects", "settings"].map(tab => nav.indexOf(`data-tab="${tab}"`));
  assert.ok(order.every(position => position > -1));
  assert.deepEqual([...order].sort((a, b) => a - b), order);
  assert.match(js, /let activeTab = "updates"/);
});

test("barra de tempo pode ser minimizada (setting de cliente + botão + classe)", () => {
  assert.match(js, /register\(MODULE_ID, "timebarCollapsed", \{\s*scope: "client"/);
  assert.ok(js.includes('data-action="toggle-timebar"'));
  assert.ok(js.includes('classList.toggle("is-collapsed"'));
  assert.match(css, /\.wcal-timebar\.is-collapsed/);
});

test("luas: somente a Lua de Sangue mantém a cor vermelha original", () => {
  const tail = css.slice(css.lastIndexOf("/* 0.7.2"));
  const filterOf = phase => tail.match(new RegExp(`\\[data-phase="${phase}"\\] \\{ --wcal-moon-filter: ([^;]+);`))[1];
  for (const phase of ["new", "full", "blue", "eclipse"]) assert.match(filterOf(phase), /grayscale\(1\)/, phase);
  assert.ok(!filterOf("blood").includes("grayscale"));
  assert.match(tail, /:is\(\.wcal-shell, \.wcal-timebar\) \[data-phase\] \{\s*--wcal-moon-filter: grayscale\(1\)/);
});

test("atualizações públicas chegam a todos e as restritas só ao mestre/assistente", () => {
  assert.match(js, /game\.user\.isGM \|\| item\.visibility !== "Mestre"/);
  assert.match(js, /Hooks\.on\("updateSetting"/);
});

test("compactação: HUD e janela dentro das metas, sem mínimos fixos que estourem a viewport", () => {
  const tail = css.slice(css.lastIndexOf("/* 0.7.1"));
  assert.ok(tail.length > 100, "bloco 0.7.1 ausente");
  assert.match(tail, /\.wcal-timebar\s*\{[^}]*clamp\(/s);
  assert.match(tail, /\.wcal-shell\s*\{[^}]*min\(1180px,\s*88vw\)/s);
  assert.match(tail, /\.wcal-shell\s*\{[^}]*min\(720px,\s*84vh\)/s);
  assert.match(tail, /prefers-reduced-motion/);
});

test("Publicações recentes: só dias anteriores, com visibilidade e filtro do feed", () => {
  const body = js.slice(js.indexOf("function recentUpdatesMarkup"), js.indexOf("function jumpToDate"));
  assert.ok(body.includes("key < currentKey"));
  assert.ok(body.includes('item.visibility !== "Mestre"'));
  assert.ok(body.includes("updateFilter"));
  assert.ok(js.includes('data-role="recent-updates"'));
  assert.ok(js.includes("data-recent-date"));
  assert.ok(css.includes(".wcal-recent button"));
});
