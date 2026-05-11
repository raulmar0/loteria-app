// Cantor de Lotería Mexicana — main app component

const { useState, useEffect, useRef, useCallback } = React;

// ---------- Palettes ----------
const PALETTES = {
  fiesta: {
    label: "Fiesta",
    bg: "#FFF8E7",
    paper: "#FFFFFF",
    ink: "#1A1410",
    inkSoft: "#5A4A3F",
    accent: "#D62828",
    accent2: "#1F8A5B",
    accent3: "#FFB703",
    accent4: "#118AB2",
    grain: "#E8DCC4"
  },
  noche: {
    label: "Noche",
    bg: "#1A0E2A",
    paper: "#2A1B3D",
    ink: "#FFF6E0",
    inkSoft: "#C9B8E0",
    accent: "#FF6B6B",
    accent2: "#06D6A0",
    accent3: "#FFD166",
    accent4: "#4ECDC4",
    grain: "#3D2952"
  },
  desierto: {
    label: "Desierto",
    bg: "#F4E4C1",
    paper: "#FBF3DC",
    ink: "#2D1B0E",
    inkSoft: "#6B4226",
    accent: "#C1462C",
    accent2: "#6B8E23",
    accent3: "#E8A02A",
    accent4: "#4A6B7C",
    grain: "#D9C4A0"
  },
  rosa: {
    label: "Bugambilia",
    bg: "#FFF0F5",
    paper: "#FFFFFF",
    ink: "#3C153B",
    inkSoft: "#7B287D",
    accent: "#E91E63",
    accent2: "#9C27B0",
    accent3: "#FF9800",
    accent4: "#00BCD4",
    grain: "#F8D7E0"
  }
};

// ---------- Font pairs ----------
const FONTS = {
  display: {
    label: "Display",
    head: "'Alfa Slab One', serif",
    body: "'DM Sans', sans-serif"
  },
  bold: {
    label: "Bold",
    head: "'Archivo Black', sans-serif",
    body: "'Inter', sans-serif"
  },
  retro: {
    label: "Retro",
    head: "'Bagel Fat One', cursive",
    body: "'DM Sans', sans-serif"
  }
};

// ---------- Papel picado decorative strip ----------
const PapelPicado = ({ color = "#fff", count = 7, flip = false }) => {
  const items = Array.from({ length: count });
  return (
    <div className="papel" style={{ transform: flip ? "scaleY(-1)" : "none" }}>
      {items.map((_, i) => {
        const c = [PALETTES.fiesta.accent, PALETTES.fiesta.accent2, PALETTES.fiesta.accent3, PALETTES.fiesta.accent4][i % 4];
        return (
          <svg key={i} viewBox="0 0 40 50" className="papel-flag" style={{ color: c }}>
            <path d="M0 0 L40 0 L40 30 L20 46 L0 30 Z" fill="currentColor" />
            <circle cx="20" cy="14" r="4" fill={color} />
            <circle cx="10" cy="22" r="2.5" fill={color} />
            <circle cx="30" cy="22" r="2.5" fill={color} />
            <path d="M14 30 L20 36 L26 30 L20 24 Z" fill={color} />
            <circle cx="12" cy="10" r="1.5" fill={color} />
            <circle cx="28" cy="10" r="1.5" fill={color} />
          </svg>
        );
      })}
    </div>
  );
};

// ---------- Card display ----------
const CardFace = ({ card, lang, showVerse, palette, fonts }) => {
  if (!card) {
    return (
      <div className="card-face empty">
        <div className="card-empty-inner">
          <div className="card-empty-glyph">⌂</div>
          <div className="card-empty-text" style={{ fontFamily: fonts.body }}>
            {lang === "es" ? "Listo para cantar" : "Ready to call"}
          </div>
        </div>
      </div>
    );
  }

  const name = lang === "es" ? card.es : card.en;
  const verse = lang === "es" ? card.verseEs : card.verseEn;

  return (
    <div className="card-face" key={card.n}>
      <div className="card-frame" style={{ borderColor: card.color }}>
        <div className="card-number" style={{ background: card.color, fontFamily: fonts.head }}>
          {String(card.n).padStart(2, "0")}
        </div>
        <div className="card-corner tl" style={{ borderColor: card.color }}></div>
        <div className="card-corner tr" style={{ borderColor: card.color }}></div>
        <div className="card-corner bl" style={{ borderColor: card.color }}></div>
        <div className="card-corner br" style={{ borderColor: card.color }}></div>

        <div className="card-icon-wrap" style={{ background: `${card.color}15` }}>
          <div className="card-icon-bg" style={{ background: card.color }}></div>
          <LoteriaIcon name={card.icon} color={palette.paper} size={180} />
        </div>

        <div className="card-name" style={{ fontFamily: fonts.head, color: card.color }}>
          {name}
        </div>

        {showVerse && (
          <div className="card-verse" style={{ fontFamily: fonts.body, color: palette.inkSoft }}>
            <span className="verse-quote" style={{ color: card.color }}>“</span>
            {verse}
            <span className="verse-quote close" style={{ color: card.color }}>”</span>
          </div>
        )}
      </div>
    </div>
  );
};

// ---------- History pill ----------
const HistoryPill = ({ card, lang, palette, onClick, fonts }) => (
  <button className="hist-pill" onClick={onClick} style={{ borderColor: card.color, background: `${card.color}10` }}>
    <span className="hist-num" style={{ background: card.color, fontFamily: fonts.head }}>{card.n}</span>
    <span className="hist-name" style={{ fontFamily: fonts.body, color: palette.ink }}>
      {lang === "es" ? card.es : card.en}
    </span>
  </button>
);

// ---------- Speed values ----------
const SPEEDS = {
  lento: { es: "Lento", en: "Slow", seconds: 12 },
  medio: { es: "Medio", en: "Medium", seconds: 7 },
  rapido: { es: "Rápido", en: "Fast", seconds: 4 }
};

// ---------- Main App ----------
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "fiesta",
  "font": "display",
  "voice": true,
  "verses": true,
  "speed": "medio",
  "language": "es"
}/*EDITMODE-END*/;

function CantorApp() {
  const [tweaks, setTweak] = window.useTweaks(TWEAK_DEFAULTS);
  const palette = PALETTES[tweaks.palette] || PALETTES.fiesta;
  const fonts = FONTS[tweaks.font] || FONTS.display;
  const lang = tweaks.language;

  const [deck, setDeck] = useState([]);         // shuffled remaining indices
  const [called, setCalled] = useState([]);     // array of card objects in call order (newest first)
  const [running, setRunning] = useState(false);
  const [tick, setTick] = useState(0);          // forces re-render for countdown
  const [showHistory, setShowHistory] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const lastCallAtRef = useRef(0);
  const timerRef = useRef(null);

  // Build/shuffle the deck on mount
  useEffect(() => {
    resetDeck();
  }, []);

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function resetDeck() {
    const fresh = shuffle(LOTERIA_CARDS.map((c, i) => i));
    setDeck(fresh);
    setCalled([]);
    setRunning(false);
  }

  // ---- TTS ----
  function speak(card) {
    if (!tweaks.voice || !window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      const name = lang === "es" ? card.es : card.en;
      const verse = lang === "es" ? card.verseEs : card.verseEn;
      const text = tweaks.verses ? `${name}. ${verse}` : name;
      const u = new SpeechSynthesisUtterance(text);
      u.lang = lang === "es" ? "es-MX" : "en-US";
      u.rate = 0.95;
      u.pitch = 1.0;
      // try to find a matching voice
      const voices = window.speechSynthesis.getVoices();
      const match = voices.find(v => v.lang.startsWith(lang === "es" ? "es" : "en"));
      if (match) u.voice = match;
      window.speechSynthesis.speak(u);
    } catch (e) { console.warn(e); }
  }

  const callNext = useCallback(() => {
    setDeck(prevDeck => {
      if (prevDeck.length === 0) {
        setRunning(false);
        return prevDeck;
      }
      const [next, ...rest] = prevDeck;
      const card = LOTERIA_CARDS[next];
      setCalled(prev => [card, ...prev]);
      lastCallAtRef.current = Date.now();
      // speak after state update
      setTimeout(() => speak(card), 50);
      return rest;
    });
  }, [tweaks.voice, tweaks.verses, lang]);

  // Auto mode timer
  useEffect(() => {
    if (!running) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    // call one immediately if we just started and nothing's been called recently
    if (Date.now() - lastCallAtRef.current > 1000) callNext();
    const interval = SPEEDS[tweaks.speed].seconds * 1000;
    timerRef.current = setInterval(() => {
      callNext();
    }, interval);
    return () => timerRef.current && clearInterval(timerRef.current);
  }, [running, tweaks.speed, callNext]);

  // tick for countdown display
  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setTick(x => x + 1), 200);
    return () => clearInterval(t);
  }, [running]);

  const current = called[0];
  const remaining = deck.length;
  const total = LOTERIA_CARDS.length;
  const calledCount = called.length;
  const interval = SPEEDS[tweaks.speed].seconds * 1000;
  const elapsed = Date.now() - lastCallAtRef.current;
  const countdown = running ? Math.max(0, Math.ceil((interval - elapsed) / 1000)) : SPEEDS[tweaks.speed].seconds;
  const progressPct = running ? Math.min(100, (elapsed / interval) * 100) : 0;

  const handleTogglePlay = () => {
    if (deck.length === 0 && called.length > 0) {
      resetDeck();
      return;
    }
    setRunning(r => !r);
  };

  const handleNext = () => {
    if (deck.length === 0) return;
    callNext();
    lastCallAtRef.current = Date.now();
  };

  const handleRepeat = () => {
    if (current) speak(current);
  };

  const t = (es, en) => lang === "es" ? es : en;

  return (
    <div className="app-root" style={{
      "--bg": palette.bg,
      "--paper": palette.paper,
      "--ink": palette.ink,
      "--ink-soft": palette.inkSoft,
      "--accent": palette.accent,
      "--accent2": palette.accent2,
      "--accent3": palette.accent3,
      "--accent4": palette.accent4,
      "--grain": palette.grain,
      "--font-head": fonts.head,
      "--font-body": fonts.body,
    }}>
      <PapelPicado color={palette.bg} count={7} />

      <header className="app-header">
        <div className="brand">
          <div className="brand-mark" style={{ fontFamily: fonts.head }}>L</div>
          <div className="brand-text">
            <div className="brand-title" style={{ fontFamily: fonts.head }}>Lotería</div>
            <div className="brand-sub" style={{ fontFamily: fonts.body }}>
              {t("El cantor", "The Caller")}
            </div>
          </div>
        </div>
        <div className="header-actions">
          <button className="icon-btn" onClick={() => setTweak('language', lang === 'es' ? 'en' : 'es')} title="Language">
            <span style={{ fontFamily: fonts.head, fontSize: 14 }}>{lang.toUpperCase()}</span>
          </button>
          <button className="icon-btn" onClick={() => setShowSettings(true)} title="Settings">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
          </button>
        </div>
      </header>

      <main className="app-main">
        <div className="counters">
          <div className="counter">
            <div className="counter-num" style={{ fontFamily: fonts.head, color: palette.accent }}>{calledCount}</div>
            <div className="counter-lbl" style={{ fontFamily: fonts.body }}>{t("Cantadas", "Called")}</div>
          </div>
          <div className="counter-divider"></div>
          <div className="counter">
            <div className="counter-num" style={{ fontFamily: fonts.head, color: palette.accent2 }}>{remaining}</div>
            <div className="counter-lbl" style={{ fontFamily: fonts.body }}>{t("Restan", "Left")}</div>
          </div>
          <div className="counter-divider"></div>
          <div className="counter">
            <div className="counter-num" style={{ fontFamily: fonts.head, color: palette.accent4 }}>{total}</div>
            <div className="counter-lbl" style={{ fontFamily: fonts.body }}>{t("Mazo", "Deck")}</div>
          </div>
        </div>

        <CardFace card={current} lang={lang} showVerse={tweaks.verses} palette={palette} fonts={fonts} />

        {running && (
          <div className="countdown-bar">
            <div className="countdown-fill" style={{ width: `${progressPct}%`, background: palette.accent }}></div>
            <div className="countdown-label" style={{ fontFamily: fonts.body }}>
              {t("Siguiente en", "Next in")} <span style={{ fontFamily: fonts.head, color: palette.accent }}>{countdown}s</span>
            </div>
          </div>
        )}

        <div className="controls">
          <button className="ctrl ctrl-secondary" onClick={handleRepeat} disabled={!current}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
            <span style={{ fontFamily: fonts.body }}>{t("Repetir", "Repeat")}</span>
          </button>

          <button className="ctrl ctrl-primary" onClick={handleTogglePlay} style={{ background: palette.accent }}>
            {deck.length === 0 && called.length > 0 ? (
              <>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                <span style={{ fontFamily: fonts.head, color: "white" }}>{t("REINICIAR", "RESTART")}</span>
              </>
            ) : running ? (
              <>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="white" stroke="white"><rect x="6" y="5" width="4" height="14"/><rect x="14" y="5" width="4" height="14"/></svg>
                <span style={{ fontFamily: fonts.head, color: "white" }}>{t("PAUSAR", "PAUSE")}</span>
              </>
            ) : (
              <>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="white" stroke="white"><polygon points="6 4 20 12 6 20"/></svg>
                <span style={{ fontFamily: fonts.head, color: "white" }}>{called.length === 0 ? t("CANTAR", "CALL") : t("SEGUIR", "RESUME")}</span>
              </>
            )}
          </button>

          <button className="ctrl ctrl-secondary" onClick={handleNext} disabled={deck.length === 0}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 4 15 12 5 20"/><line x1="19" y1="5" x2="19" y2="19"/></svg>
            <span style={{ fontFamily: fonts.body }}>{t("Siguiente", "Next")}</span>
          </button>
        </div>

        <button className="hist-toggle" onClick={() => setShowHistory(true)} disabled={called.length === 0}>
          <span style={{ fontFamily: fonts.body }}>{t("Ver historial", "View history")}</span>
          <span className="hist-badge" style={{ fontFamily: fonts.head, background: palette.accent }}>{called.length}</span>
        </button>
      </main>

      {/* History sheet */}
      {showHistory && (
        <div className="sheet-backdrop" onClick={() => setShowHistory(false)}>
          <div className="sheet" onClick={e => e.stopPropagation()}>
            <div className="sheet-handle"></div>
            <div className="sheet-header">
              <h2 style={{ fontFamily: fonts.head }}>{t("Historial", "History")}</h2>
              <button className="sheet-close" onClick={() => setShowHistory(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="6" y1="18" x2="18" y2="6"/></svg>
              </button>
            </div>
            <div className="sheet-body">
              {called.length === 0 ? (
                <div className="empty-state" style={{ fontFamily: fonts.body }}>
                  {t("Aún no se ha cantado ninguna carta", "No cards called yet")}
                </div>
              ) : (
                <div className="hist-list">
                  {called.map((c, i) => (
                    <HistoryPill key={`${c.n}-${i}`} card={c} lang={lang} palette={palette} fonts={fonts} onClick={() => speak(c)} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Settings sheet (in-app, separate from Tweaks panel) */}
      {showSettings && (
        <div className="sheet-backdrop" onClick={() => setShowSettings(false)}>
          <div className="sheet" onClick={e => e.stopPropagation()}>
            <div className="sheet-handle"></div>
            <div className="sheet-header">
              <h2 style={{ fontFamily: fonts.head }}>{t("Ajustes", "Settings")}</h2>
              <button className="sheet-close" onClick={() => setShowSettings(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="6" y1="18" x2="18" y2="6"/></svg>
              </button>
            </div>
            <div className="sheet-body">
              <div className="setting-row">
                <div className="setting-info">
                  <div className="setting-label" style={{ fontFamily: fonts.head }}>{t("Voz", "Voice")}</div>
                  <div className="setting-desc" style={{ fontFamily: fonts.body }}>{t("Anuncia las cartas en voz alta", "Read cards aloud")}</div>
                </div>
                <button className={`switch ${tweaks.voice ? 'on' : ''}`} onClick={() => setTweak('voice', !tweaks.voice)} style={{ background: tweaks.voice ? palette.accent2 : '#ccc' }}>
                  <span className="switch-thumb"></span>
                </button>
              </div>
              <div className="setting-row">
                <div className="setting-info">
                  <div className="setting-label" style={{ fontFamily: fonts.head }}>{t("Versos", "Verses")}</div>
                  <div className="setting-desc" style={{ fontFamily: fonts.body }}>{t("Mostrar y leer los versos tradicionales", "Show and read traditional verses")}</div>
                </div>
                <button className={`switch ${tweaks.verses ? 'on' : ''}`} onClick={() => setTweak('verses', !tweaks.verses)} style={{ background: tweaks.verses ? palette.accent2 : '#ccc' }}>
                  <span className="switch-thumb"></span>
                </button>
              </div>
              <div className="setting-row col">
                <div className="setting-label" style={{ fontFamily: fonts.head }}>{t("Velocidad", "Speed")}</div>
                <div className="seg">
                  {Object.entries(SPEEDS).map(([k, v]) => (
                    <button key={k} className={`seg-btn ${tweaks.speed === k ? 'on' : ''}`} onClick={() => setTweak('speed', k)} style={{ fontFamily: fonts.body, background: tweaks.speed === k ? palette.ink : 'transparent', color: tweaks.speed === k ? palette.paper : palette.ink }}>
                      {lang === 'es' ? v.es : v.en} <span className="seg-sec">{v.seconds}s</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="setting-row col">
                <div className="setting-label" style={{ fontFamily: fonts.head }}>{t("Idioma", "Language")}</div>
                <div className="seg">
                  <button className={`seg-btn ${lang === 'es' ? 'on' : ''}`} onClick={() => setTweak('language', 'es')} style={{ fontFamily: fonts.body, background: lang === 'es' ? palette.ink : 'transparent', color: lang === 'es' ? palette.paper : palette.ink }}>Español</button>
                  <button className={`seg-btn ${lang === 'en' ? 'on' : ''}`} onClick={() => setTweak('language', 'en')} style={{ fontFamily: fonts.body, background: lang === 'en' ? palette.ink : 'transparent', color: lang === 'en' ? palette.paper : palette.ink }}>English</button>
                </div>
              </div>
              <button className="reset-btn" onClick={() => { resetDeck(); setShowSettings(false); }} style={{ fontFamily: fonts.head, borderColor: palette.accent, color: palette.accent }}>
                {t("Reiniciar mazo", "Reset deck")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tweaks panel */}
      <CantorTweaks tweaks={tweaks} setTweak={setTweak} palette={palette} fonts={fonts} />
    </div>
  );
}

// ---------- Tweaks panel ----------
function CantorTweaks({ tweaks, setTweak, palette, fonts }) {
  const { TweaksPanel, TweakSection, TweakRadio, TweakSelect, TweakColor, TweakToggle } = window;

  const paletteOptions = Object.entries(PALETTES).map(([k, v]) => ({
    value: k,
    label: v.label,
    colors: [v.accent, v.accent2, v.accent3, v.accent4, v.bg]
  }));

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection title="Estilo">
        <div className="tweak-row">
          <div className="tweak-label">Paleta</div>
          <div className="palette-grid">
            {paletteOptions.map(p => (
              <button key={p.value} className={`palette-swatch ${tweaks.palette === p.value ? 'on' : ''}`} onClick={() => setTweak('palette', p.value)}>
                <div className="swatch-bg" style={{ background: p.colors[4] }}>
                  <div className="swatch-dot" style={{ background: p.colors[0] }}></div>
                  <div className="swatch-dot" style={{ background: p.colors[1] }}></div>
                  <div className="swatch-dot" style={{ background: p.colors[2] }}></div>
                  <div className="swatch-dot" style={{ background: p.colors[3] }}></div>
                </div>
                <div className="swatch-label">{p.label}</div>
              </button>
            ))}
          </div>
        </div>
        <TweakRadio
          label="Tipografía"
          value={tweaks.font}
          onChange={v => setTweak('font', v)}
          options={[
            { value: 'display', label: 'Display' },
            { value: 'bold', label: 'Bold' },
            { value: 'retro', label: 'Retro' }
          ]}
        />
      </TweakSection>
      <TweakSection title="Canto">
        <TweakToggle label="Voz" value={tweaks.voice} onChange={v => setTweak('voice', v)} />
        <TweakToggle label="Versos" value={tweaks.verses} onChange={v => setTweak('verses', v)} />
        <TweakRadio
          label="Velocidad"
          value={tweaks.speed}
          onChange={v => setTweak('speed', v)}
          options={[
            { value: 'lento', label: 'Lento' },
            { value: 'medio', label: 'Medio' },
            { value: 'rapido', label: 'Rápido' }
          ]}
        />
      </TweakSection>
    </TweaksPanel>
  );
}

window.CantorApp = CantorApp;
