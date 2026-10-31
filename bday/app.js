(() => {
  "use strict";
  const C = window.BDAY;
  const S = C.stages;
  const app = document.getElementById("app");
  const musicBtn = document.getElementById("music");
  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => Array.from(el.querySelectorAll(sel));
  const rand = (a, b) => a + Math.random() * (b - a);
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  // ---------- storage (safe) ----------
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* ignore */ } },
  };
  let unlocked = Math.min(store.get("bday_unlocked", 0), S.length - 1);

  // ---------- password ----------
  // "Wo fav naam kya tha jo main tumhe bulata tha?" — jawab hash karke rakha hai taaki source mein seedha na dikhe.
  const PASS = 193487358;
  const hash = (s) => { let x = 5381; for (const c of s) x = ((x << 5) + x + c.codePointAt(0)) | 0; return x >>> 0; };
  const norm = (s) => String(s).toLowerCase().normalize("NFKD").replace(/[^a-z0-9]/g, "");

  // ---------- background emojis ----------
  // Big custom stickers: forehead runway, tiny girl in a pinch, tummy, pimples, no eyebrows, tiny feet, tiny hands
  const SK = {
    forehead: `<svg viewBox="0 0 100 124"><ellipse cx="50" cy="70" rx="42" ry="52" fill="#ffdcc2" stroke="#e7a882" stroke-width="3"/>
      <path d="M9 78 Q6 40 20 30 Q14 60 18 92Z M91 78 Q94 40 80 30 Q86 60 82 92Z" fill="#4a2f25"/>
      <rect x="40" y="24" width="20" height="56" rx="4" fill="#8f97a8"/>
      <line x1="50" y1="28" x2="50" y2="76" stroke="#fff" stroke-width="2.5" stroke-dasharray="6 5"/>
      <circle cx="42" cy="78" r="1.6" fill="#ffd34d"/><circle cx="58" cy="78" r="1.6" fill="#ffd34d"/><circle cx="42" cy="26" r="1.6" fill="#ffd34d"/><circle cx="58" cy="26" r="1.6" fill="#ffd34d"/>
      <circle cx="36" cy="94" r="4" fill="#3a2a4a"/><circle cx="64" cy="94" r="4" fill="#3a2a4a"/>
      <circle cx="28" cy="104" r="5" fill="#ff9fb8" opacity=".6"/><circle cx="72" cy="104" r="5" fill="#ff9fb8" opacity=".6"/>
      <path d="M41 107 Q50 114 59 107" stroke="#3a2a4a" stroke-width="3" fill="none" stroke-linecap="round"/>
      <text x="44" y="30" font-size="44">🛬</text></svg>`,
    tiny: `<svg viewBox="0 0 100 100"><text x="6" y="58" font-size="62">🤏</text>
      <g transform="translate(40 26) scale(.62)"><circle cx="6" cy="5" r="5" fill="#ffdcc2" stroke="#3a2a4a" stroke-width="1.5"/>
      <path d="M2 10 L10 10 L13 24 L-1 24Z" fill="#ff7eb6"/><path d="M4 24 L4 32 M8 24 L8 32" stroke="#3a2a4a" stroke-width="1.8" stroke-linecap="round"/></g>
      <text x="50" y="96" font-size="13" font-weight="800" fill="#e2508f" text-anchor="middle" font-family="Baloo 2, sans-serif">itni si</text></svg>`,
    tummy: `<svg viewBox="0 0 100 100"><circle cx="50" cy="56" r="40" fill="#ffdcc2" stroke="#e7a882" stroke-width="3"/>
      <path d="M12 44 Q50 20 88 44 L90 18 Q50 6 10 18Z" fill="#ff7eb6" stroke="#e2508f" stroke-width="3" stroke-linejoin="round"/>
      <path d="M46 60 Q50 66 54 60" stroke="#c98563" stroke-width="3" fill="none" stroke-linecap="round"/>
      <text x="64" y="86" font-size="14">💗</text><text x="20" y="80" font-size="11">✨</text></svg>`,
    pimples: `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="44" fill="#ffcc4d" stroke="#e8a530" stroke-width="3"/>
      <circle cx="35" cy="44" r="5" fill="#3a2a4a"/><circle cx="65" cy="44" r="5" fill="#3a2a4a"/>
      <path d="M36 70 Q43 64 50 70 Q57 76 64 70" stroke="#3a2a4a" stroke-width="3" fill="none" stroke-linecap="round"/>
      ${[[24,60,5],[74,62,4.5],[54,24,4],[30,26,3.5],[70,28,3],[62,58,3],[44,56,2.5]].map(([x,y,r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#e8483b"/><circle cx="${x-r/3}" cy="${y-r/3}" r="${r/3}" fill="#ffb3a8"/>`).join("")}</svg>`,
    browless: `<svg viewBox="0 0 100 100"><circle cx="50" cy="54" r="42" fill="#ffcc4d" stroke="#e8a530" stroke-width="3"/>
      <path d="M24 32 Q34 26 44 32 M56 32 Q66 26 76 32" stroke="#b07a12" stroke-width="2.5" fill="none" stroke-dasharray="3 4" stroke-linecap="round"/>
      <ellipse cx="35" cy="48" rx="9" ry="11" fill="#fff"/><ellipse cx="65" cy="48" rx="9" ry="11" fill="#fff"/>
      <circle cx="36" cy="50" r="5" fill="#3a2a4a"/><circle cx="66" cy="50" r="5" fill="#3a2a4a"/>
      <ellipse cx="50" cy="76" rx="6" ry="7" fill="#3a2a4a"/>
      <text x="50" y="16" font-size="15" font-weight="800" fill="#e2508f" text-anchor="middle" font-family="Baloo 2, sans-serif">eyebrows??</text></svg>`,
    feet: `<svg viewBox="0 0 100 100"><rect x="6" y="66" width="88" height="18" rx="3" fill="#fff3b0" stroke="#d9b84a" stroke-width="2"/>
      ${Array.from({length: 11}, (_, i) => `<line x1="${10 + i * 8}" y1="66" x2="${10 + i * 8}" y2="${i % 2 ? 72 : 76}" stroke="#a58a2a" stroke-width="1.5"/>`).join("")}
      <ellipse cx="42" cy="60" rx="4" ry="6" fill="#ffdcc2" stroke="#c98563" stroke-width="1.5"/><ellipse cx="56" cy="60" rx="4" ry="6" fill="#ffdcc2" stroke="#c98563" stroke-width="1.5"/>
      <path d="M42 54 L42 20 M56 54 L56 20" stroke="#3a2a4a" stroke-width="5" stroke-linecap="round"/>
      <text x="50" y="98" font-size="13" font-weight="800" fill="#e2508f" text-anchor="middle" font-family="Baloo 2, sans-serif">size: 🤏</text></svg>`,
    hands: `<svg viewBox="0 0 100 100"><circle cx="64" cy="50" r="28" fill="#d8dbe3" stroke="#9aa0ad" stroke-width="3"/>
      <text x="64" y="58" font-size="22" font-weight="800" fill="#6b7280" text-anchor="middle" font-family="Baloo 2, sans-serif">₹1</text>
      <g transform="translate(14 42)"><rect x="0" y="8" width="14" height="14" rx="5" fill="#ffdcc2" stroke="#c98563" stroke-width="1.5"/>
      ${[1, 4.5, 8, 11.5].map((x) => `<rect x="${x}" y="1" width="2.6" height="9" rx="1.3" fill="#ffdcc2" stroke="#c98563" stroke-width="1"/>`).join("")}
      <rect x="-4" y="12" width="6" height="2.6" rx="1.3" fill="#ffdcc2" stroke="#c98563" stroke-width="1"/></g>
      <text x="50" y="96" font-size="12" font-weight="800" fill="#e2508f" text-anchor="middle" font-family="Baloo 2, sans-serif">coin &gt; haath</text></svg>`,
  };
  const SIZES = { forehead: [130, 175], tiny: [90, 120], tummy: [90, 125], pimples: [85, 115], browless: [90, 120], feet: [85, 110], hands: [85, 110] };
  function emojiBackground() {
    const bg = document.getElementById("emoji-bg");
    const order = ["forehead", "tiny", "tummy", "browless", "feet", "hands", "forehead", "browless", "tummy", "tiny", "feet", "hands"];
    const n = window.innerWidth < 600 ? 10 : 12;
    for (let i = 0; i < n; i++) {
      const k = order[i];
      const s = document.createElement("span");
      s.className = "sticker";
      s.innerHTML = SK[k];
      const w = rand(SIZES[k][0], SIZES[k][1]) * (window.innerWidth < 600 ? .85 : 1);
      s.style.width = w + "px";
      s.style.left = (i / n) * 100 + rand(-4, 4) - 6 + "vw";
      s.style.setProperty("--dx", rand(-40, 40) + "px");
      s.style.setProperty("--rot", rand(-25, 25) + "deg");
      const dur = rand(20, 34);
      s.style.animationDuration = dur + "s";
      s.style.animationDelay = -rand(0, dur) + "s";
      bg.appendChild(s);
    }
  }

  // ---------- music ----------
  const audio = new Audio();
  audio.loop = true;
  audio.preload = "none";
  let muted = false, currentSong = null, actx = null, boxGain = null, boxTimer = null;

  // Happy Birthday — music box version
  const HB = [[67,.75],[67,.25],[69,1],[67,1],[72,1],[71,2],[67,.75],[67,.25],[69,1],[67,1],[74,1],[72,2],
              [67,.75],[67,.25],[79,1],[76,1],[72,1],[71,1],[69,2],[77,.75],[77,.25],[76,1],[72,1],[74,1],[72,3]];
  function ensureCtx() {
    if (!actx) { try { actx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return null; } }
    if (actx.state === "suspended") actx.resume();
    return actx;
  }
  function boxNote(midi, t, d) {
    const f = 440 * Math.pow(2, (midi - 69) / 12);
    [[1, "triangle", .13], [2, "sine", .04]].forEach(([mul, type, vol]) => {
      const o = actx.createOscillator(), g = actx.createGain();
      o.type = type; o.frequency.value = f * mul;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(vol, t + .015);
      g.gain.exponentialRampToValueAtTime(.0008, t + Math.max(d, .35) * 1.8);
      o.connect(g); g.connect(boxGain);
      o.start(t); o.stop(t + Math.max(d, .35) * 1.9);
    });
  }
  function boxLoop() {
    if (!boxGain) return;
    const beat = .43;
    let t = actx.currentTime + .08;
    for (const [m, d] of HB) { boxNote(m, t, d * beat); t += d * beat; }
    boxTimer = setTimeout(boxLoop, (t - actx.currentTime + 1.6) * 1000);
  }
  function startBox() {
    if (boxGain || !ensureCtx()) return;
    boxGain = actx.createGain(); boxGain.gain.value = 1; boxGain.connect(actx.destination);
    boxLoop();
  }
  function stopBox() {
    clearTimeout(boxTimer);
    if (boxGain) { const g = boxGain; boxGain = null; try { g.gain.setTargetAtTime(0, actx.currentTime, .05); setTimeout(() => g.disconnect(), 300); } catch (e) {} }
  }
  function playSong(src) {
    currentSong = src || "";
    musicBtn.hidden = false;
    if (muted) return;
    if (currentSong) {
      stopBox();
      const abs = new URL(currentSong, location.href).href;
      if (audio.src !== abs) { audio.src = currentSong; audio.currentTime = 0; }
      audio.play().catch(() => {});
    } else {
      audio.pause();
      startBox();
    }
    musicBtn.classList.add("playing");
  }
  audio.addEventListener("error", () => { if (currentSong && !muted) { currentSong = ""; startBox(); } });
  musicBtn.addEventListener("click", () => {
    muted = !muted;
    musicBtn.textContent = muted ? "🔇" : "🔊";
    if (muted) { audio.pause(); stopBox(); musicBtn.classList.remove("playing"); }
    else playSong(currentSong);
  });

  // ---------- helpers ----------
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const paras = (arr) => (arr || []).map((t) => `<p>${esc(t)}</p>`).join("");
  const polaroid = (src, cap) => `<figure class="polaroid"><img src="${esc(src || C.defaultPhoto)}" alt="" loading="lazy"
      onerror="this.onerror=null;this.src='${esc(C.defaultPhoto)}'">${cap ? `<figcaption>${esc(cap)}</figcaption>` : ""}</figure>`;

  const videoFrame = (src, cap) => `<figure class="polaroid video"><video src="${esc(src)}" autoplay muted loop playsinline controls preload="metadata"></video>
      ${cap ? `<figcaption>${esc(cap)}</figcaption>` : ""}</figure>`;

  function confetti(n = 70) {
    const bits = ["🎉", "💗", "✨", "🎊", "🕊️", "💖", "🎂", "🌸"];
    for (let i = 0; i < n; i++) {
      const c = document.createElement("span");
      c.className = "confetti";
      c.textContent = pick(bits);
      c.style.left = rand(0, 100) + "vw";
      c.style.fontSize = rand(16, 30) + "px";
      const dur = rand(2.2, 4.2);
      c.style.animationDuration = dur + "s";
      c.style.animationDelay = rand(0, .8) + "s";
      document.body.appendChild(c);
      setTimeout(() => c.remove(), (dur + 1) * 1000);
    }
  }

  // ---------- LOCK ----------
  const WRONG = [
    "Galat! 🙅‍♀️ Itna jaldi bhool gayi?",
    "Nahi nahi 😤 phir se socho…",
    "Hint: sirf 3 letters hai 🤭",
    "Arey yaad karo… wahi naam jispe tum gussa hoti thi 😂",
    "Hint 2: B se shuru hota hai 😌",
  ];
  let wrongCount = 0;
  function lock() {
    app.innerHTML = `
      <section class="screen lock">
        <img class="lock-pigeon" src="img/pigeon.png" alt="pigeon">
        <div class="card">
          <h1>Ruko zara! ✋</h1>
          <p>Ye website sirf ek hi insaan ke liye hai. Pehle batao…</p>
          <p class="q">Wo fav naam kya tha jo main tumhe bulata tha? 🤭</p>
          <form autocomplete="off">
            <input id="pw" type="text" placeholder="• • •" aria-label="password" autocapitalize="characters" spellcheck="false">
            <button class="btn" type="submit">🔓</button>
          </form>
          <p class="err" role="alert"></p>
        </div>
      </section>`;
    const form = $("form", app), input = $("#pw"), err = $(".err", app), card = $(".card", app);
    form.addEventListener("submit", (ev) => {
      ev.preventDefault();
      if (hash(norm(input.value)) === PASS) {
        store.set("bday_in", 1);
        ensureCtx();
        confetti(90);
        err.textContent = "Haan yahi! 🥳 Andar aao…";
        setTimeout(home, 700);
      } else {
        err.textContent = WRONG[Math.min(wrongCount++, WRONG.length - 1)];
        card.classList.remove("shake"); void card.offsetWidth; card.classList.add("shake");
        input.select();
      }
    });
    input.focus();
  }

  // ---------- HOME ----------
  function figureSVG() {
    const floor = 400, k = 5.2, y = (inch) => floor - inch * k;
    let ticks = "";
    for (let i = 0; i <= 61; i += 3) {
      const yy = y(i), ft = i % 12 === 0;
      ticks += `<line x1="${ft ? 34 : 44}" x2="58" y1="${yy}" y2="${yy}" stroke="#b59cff" stroke-width="${ft ? 2.5 : 1.4}"/>`;
      if (ft && i > 0) ticks += `<text x="28" y="${yy + 5}" text-anchor="end" font-size="14" font-weight="800" fill="#6a4fd6">${i / 12}'</text>`;
    }
    const top = y(61), real = y(57);
    return `
    <svg viewBox="0 0 270 420" role="img" aria-label="5 foot 1 inch measured stick figure">
      <rect x="34" y="${top - 6}" width="24" height="${floor - top + 6}" rx="5" fill="#fff" stroke="#e3dbff"/>
      ${ticks}
      <line x1="58" x2="232" y1="${top}" y2="${top}" stroke="#e2508f" stroke-width="2" stroke-dasharray="6 5"/>
      <text x="236" y="${top - 2}" font-size="15" font-weight="800" fill="#e2508f">5'1"</text>
      <text x="236" y="${top + 14}" font-size="11" font-weight="700" fill="#7a6a8c">(claimed)</text>
      <text class="crown" x="38" y="${top - 12}" font-size="20">👑</text>
      <line x1="58" x2="232" y1="${real}" y2="${real}" stroke="#3fb7a3" stroke-width="1.5" stroke-dasharray="3 5"/>
      <text x="236" y="${real + 4}" font-size="12" font-weight="800" fill="#3fb7a3">4'9" 🤭</text>
      <text x="236" y="${real + 18}" font-size="11" font-weight="700" fill="#7a6a8c">(asli)</text>
      <line x1="20" x2="250" y1="${floor}" y2="${floor}" stroke="#d9c9ea" stroke-width="3" stroke-linecap="round"/>
      <g class="fig">
        <g stroke="#3a2a4a" stroke-width="4" stroke-linecap="round" fill="none">
          <line x1="152" y1="172" x2="152" y2="182"/>
          <line x1="140" y1="192" x2="114" y2="246"/>
          <line x1="164" y1="192" x2="190" y2="246"/>
          <line x1="142" y1="282" x2="140" y2="394"/>
          <line x1="162" y1="282" x2="164" y2="394"/>
        </g>
        <path d="M138 182 L166 182 L192 286 L112 286 Z" fill="#ff7eb6" stroke="#e2508f" stroke-width="3" stroke-linejoin="round"/>
        <path d="M120 270 Q152 280 184 270" stroke="#fff" stroke-width="3" fill="none" opacity=".7"/>
        <text x="146" y="236" font-size="14">💗</text>
        <circle cx="113" cy="248" r="4" fill="#3a2a4a"/>
        <circle cx="191" cy="248" r="4" fill="#3a2a4a"/>
        <ellipse cx="136" cy="396" rx="6" ry="3.2" fill="#3a2a4a"/>
        <ellipse cx="168" cy="396" rx="6" ry="3.2" fill="#3a2a4a"/>
        <image href="img/face.png" x="116" y="${top}" width="72" height="86.4"/>
      </g>
      <text class="plane" x="128" y="${top + 26}" font-size="44">🛬</text>
      <text x="200" y="250" font-size="10" font-weight="700" fill="#7a6a8c">← chhote haath</text>
      <text x="176" y="392" font-size="10" font-weight="700" fill="#7a6a8c">← chhote pair</text>
    </svg>`;
  }

  function home() {
    playSong(C.homeSong);
    const startLabel = unlocked > 0 ? `Wahi se continue karo 🕊️` : `Udaan shuru karo 🕊️`;
    app.innerHTML = `
      <section class="screen home">
        <p class="kicker">🎂 HAPPY BIRTHDAY 🎂</p>
        <h1>Chotuuuuu<br><span>ka bday 🎂</span></h1>
        <div class="measure">${figureSVG()}</div>
        <p class="sub">Ye hai official height chart 📏 Pigeon ke saath level-by-level udo aur dekho 5'1" tak pahunch paati ho ya nahi 😂</p>
        <button class="btn big" id="start">${startLabel}</button>
        <p class="map-title">📏 height chart</p>
        <ol class="map">
          ${S.map((s, i) => `
            <li class="${i > unlocked ? "locked" : ""} ${i === unlocked ? "current" : ""}">
              <button data-i="${i}" ${i > unlocked ? "disabled" : ""}>
                <b>${esc(s.height)}</b><span>${esc(s.title)}</span><em>${i < unlocked ? "✅" : i === unlocked ? "🕊️" : "🔒"}</em>
              </button>
            </li>`).join("")}
        </ol>
      </section>`;
    $("#start").addEventListener("click", () => fly(unlocked));
    $$(".map button", app).forEach((b) => b.addEventListener("click", () => fly(+b.dataset.i)));
    const fig = $(".fig", app);
    fig.addEventListener("click", () => { fig.classList.remove("boing"); void fig.getBoundingClientRect(); fig.classList.add("boing"); });
    window.scrollTo(0, 0);
  }

  // ---------- FLIGHT ----------
  function fly(to, after) {
    ensureCtx();
    const s = S[to];
    const ov = document.createElement("div");
    ov.className = "flight";
    let clouds = "";
    for (let i = 0; i < 6; i++) clouds += `<span class="cloud" style="top:${rand(4, 70)}%;animation-duration:${rand(3, 6)}s;animation-delay:${-rand(0, 5)}s;font-size:${rand(50, 100)}px">☁️</span>`;
    ov.innerHTML = `${clouds}<div class="ground"></div><img class="flyer" src="img/pigeon.png" alt="">
      <p>${pick(["Udd rahe hain… 🕊️", "Gutar-goo! 🕊️", "Pankh khul gaye… 🕊️", "Seatbelt baandh lo 😂"])}
      <b>${s ? `Next stop: ${esc(s.height)}` : "Last stop! 🎂"}</b>${s ? esc(s.title) : ""}</p>`;
    document.body.appendChild(ov);
    setTimeout(() => {
      (after || (() => stage(to)))();
      window.scrollTo(0, 0);
      ov.classList.add("out");
      setTimeout(() => ov.remove(), 550);
    }, 2500);
  }

  // ---------- STAGES ----------
  const RENDER = {
    photos(s) {
      const photos = s.photos && s.photos.length ? s.photos : [{ src: C.defaultPhoto, caption: "chhotu version 👶" }];
      return `<div class="gallery ${photos.length === 1 ? "single" : ""}">${photos.map((p) => polaroid(p.src, p.caption)).join("")}</div>
              <div class="card story">${paras(s.text)}</div>`;
    },
    ten(s) {
      return `${polaroid(s.photo, s.caption || "ye wali 💗")}
        <div class="card story">${paras(s.text)}</div>
        <div class="ten">${s.items.map((it, i) => {
          const t = typeof it === "string" ? "" : it.t, d = typeof it === "string" ? it : it.d;
          return `<button class="flip"><span class="front"><b>#${i + 1}</b><span class="ttl">${t ? esc(t) : "💌"}</span><small>tap karo 💌</small></span><span class="back">${esc(d)}</span></button>`;
        }).join("")}
        </div>
        <p class="progress">0 / ${s.items.length} khule</p>`;
    },
    story(s) {
      return `${polaroid(s.photo, s.caption)}<div class="card story">${paras(s.text)}</div>`;
    },
    basketball(s) {
      return `${s.video ? videoFrame(s.video, s.caption) : polaroid(s.photo, s.caption)}<div class="card story">${paras(s.text)}</div>
        <div class="card">
          <div class="court"><div class="hoop"><div class="board"></div><div class="rim"></div><div class="net"></div></div>
            <div class="shout"></div><div class="ball">🏀</div></div>
          <div class="shoot-row"><p class="score">Shots 0 / ${s.goal || 3} · 🏀 0</p><button class="btn shoot">Shoot!</button></div>
        </div>`;
    },
    letter(s) {
      return `${s.video ? videoFrame(s.video, s.caption) : polaroid(s.photo, s.caption)}
        ${s.spam ? "" : `<button class="envelope"><span class="big">💌</span>Tap karke kholo</button>`}
        <div class="letter" hidden>${paras(s.text)}<p class="sign">${esc(s.from || C.from)}</p></div>`;
    },
    gifts(s) {
      return `${polaroid(s.photo, s.caption)}<div class="card story">${paras(s.text)}</div>
        <div class="gifts">${s.places.map((_, i) => `<button class="gift" data-i="${i}">🎁<small>${i + 1}</small></button>`).join("")}</div>
        <p class="gift-pop">0 / ${s.places.length} khule</p>
        <div class="card outro" hidden><p>${esc(s.outro || "")}</p></div>`;
    },
  };

  const GIFT_EMOJI = ["🧸", "🍫", "🌸", "🐚", "🧿", "🎀", "🕯️", "📿", "🌼", "🍬", "🪁", "🧁", "🦋", "⭐", "🌙", "🍓", "📸", "🎐", "🪞", "🧣"];
  const YAY = ["Sahi jawab! 🥳", "Wah, yaad hai 🥹", "Bilkul sahi 💯", "Smart ho waise 😌", "Correct! Pigeon khush hua 🕊️"];

  function stage(i) {
    const s = S[i];
    playSong(s.song);
    const needsTask = ["ten", "basketball", "letter", "gifts"].includes(s.type);
    const already = i < unlocked; // pehle complete kiya hua level: dobara karna zaroori nahi
    const done = { q: already || !(s.question && s.question.q), task: already || !needsTask };
    const last = i === S.length - 1;

    app.innerHTML = `
      <section class="screen stage">
        <header class="stage-head">
          <button class="back">⬅ Chart</button><span class="chip">${esc(s.height)}</span><span class="count">${i + 1}/${S.length}</span>
        </header>
        <h1>${esc(s.title)}</h1>
        ${s.subtitle ? `<p class="subtitle">${esc(s.subtitle)}</p>` : ""}
        <p class="song"><span class="bars"><i></i><i></i><i></i></span> ${esc(s.songName || (s.song ? "now playing" : "music box: Happy Birthday 🎶"))}</p>
        ${RENDER[s.type](s)}
        ${s.question && s.question.q ? `
          <div class="card qbox">
            <p class="qlabel">❓ SAWAAL</p>
            <p class="qtext">${esc(s.question.q)}</p>
            <form autocomplete="off"><input type="text" placeholder="jawab yahan likho…" aria-label="answer"><button class="btn" type="submit">✔</button></form>
            <p class="qmsg"></p>
          </div>` : ""}
        <button class="btn big next" disabled>${last ? "Finish 🎂" : "Aage udo 🕊️"}</button>
        <p class="hint"></p>
      </section>`;

    const next = $(".next", app), hint = $(".hint", app);
    const taskHint = { ten: "Saare cards kholo 💌", basketball: `${s.goal || 3} shots maaro 🏀`, letter: "Letter kholo 💌", gifts: "Saare gifts kholo 🎁" }[s.type];
    function check() {
      const ok = done.q && done.task;
      next.disabled = !ok;
      const todo = [];
      if (!done.task) todo.push(taskHint);
      if (!done.q) todo.push("sawaal ka jawab do ❓");
      hint.textContent = ok ? "Ready! 🕊️" : "Aage jaane ke liye: " + todo.join(" + ");
    }

    $(".back", app).addEventListener("click", home);

    // question
    const qbox = $(".qbox", app);
    if (qbox) {
      const input = $("input", qbox), msg = $(".qmsg", qbox);
      $("form", qbox).addEventListener("submit", (ev) => {
        ev.preventDefault();
        const v = norm(input.value);
        if (!v) { msg.className = "qmsg no"; msg.textContent = "Kuch toh likho 🙄"; return; }
        const a = s.question.a;
        const answers = (Array.isArray(a) ? a : [a]).map(norm).filter(Boolean);
        if (!answers.length || answers.includes(v)) {
          msg.className = "qmsg ok";
          msg.textContent = s.question.yay || pick(YAY);
          qbox.classList.add("done");
          input.disabled = true;
          done.q = true; check();
        } else {
          msg.className = "qmsg no";
          msg.textContent = pick(["Hmm galat 😤 phir se socho", "Nahi 🙅‍♀️ yaad karo zara", "Close… par nahi 😂"]);
          qbox.classList.remove("shake"); void qbox.offsetWidth; qbox.classList.add("shake");
        }
      });
    }

    // type-specific
    if (s.type === "ten") {
      const prog = $(".progress", app);
      $$(".flip", app).forEach((f) => f.addEventListener("click", () => {
        f.classList.add("open");
        const n = $$(".flip.open", app).length;
        prog.textContent = `${n} / ${s.items.length} khule${n === s.items.length ? " 💗" : ""}`;
        if (n === s.items.length && !done.task) { done.task = true; confetti(30); check(); }
      }));
    }

    if (s.type === "basketball") {
      const goal = s.goal || 3;
      const court = $(".court", app), hoop = $(".hoop", app), ball = $(".ball", app), shout = $(".shout", app);
      const btn = $(".shoot", app), score = $(".score", app);
      let hits = 0, misses = 0, shots = 0;
      const say = (t) => { shout.textContent = t; shout.classList.remove("show"); void shout.offsetWidth; shout.classList.add("show"); };
      btn.addEventListener("click", () => {
        btn.disabled = true;
        shots++;
        // tap ke time hoop kahan hai, wahi decide karta hai
        const c = court.getBoundingClientRect(), h = hoop.getBoundingClientRect();
        const off = Math.abs(h.left + h.width / 2 - (c.left + c.width / 2));
        const hit = off < h.width * .4;
        if (hit) hoop.style.animationPlayState = "paused";
        ball.className = "ball"; void ball.offsetWidth; ball.className = "ball shoot";
        setTimeout(() => {
          if (hit) {
            hits++;
            ball.className = "ball swish";
            say(pick(["Swish! 🔥", "Basket! 🏀", "Kya baat hai! 😎", "Height ko maaro goli 😂"]));
          } else {
            misses++;
            ball.className = "ball miss";
            say(pick(["Air ball 😂", "Height ka issue hai kya? 🤭", "Arey! 😤", "Chhote haath 🤏😂"]));
          }
          score.textContent = `Shots ${Math.min(shots, goal)} / ${goal} · 🏀 ${hits}`;
          setTimeout(() => {
            ball.className = "ball";
            hoop.style.animationPlayState = "";
            btn.disabled = false;
            if (shots === goal) {
              say(hits === 0 ? "0 baskets 😂 teacher se seekho" : hits === goal ? "3/3?! okay okay 😳" : `${hits} basket… not bad shorty 😏`);
              btn.textContent = "Aur shoot karo 🏀";
              if (!done.task) { done.task = true; confetti(40); check(); }
            }
          }, 800);
        }, 550);
      });
    }

    if (s.type === "letter") {
      const env = $(".envelope", app), letter = $(".letter", app);
      const open = () => { if (env) env.hidden = true; letter.hidden = false; done.task = true; check(); };
      if (env) env.addEventListener("click", open);
      if (s.spam) sorrySpam(() => { open(); letter.scrollIntoView({ behavior: "smooth", block: "center" }); });
    }

    if (s.type === "gifts") {
      const pop = $(".gift-pop", app), outro = $(".outro", app);
      $$(".gift", app).forEach((g) => g.addEventListener("click", () => {
        if (g.classList.contains("open")) return;
        const k = +g.dataset.i;
        g.classList.add("open");
        g.innerHTML = `${GIFT_EMOJI[k % GIFT_EMOJI.length]}<small>${esc(s.places[k])}</small>`;
        const n = $$(".gift.open", app).length;
        pop.textContent = n === s.places.length ? "Saare 20 khul gaye! 🥹" : `Gift #${k + 1}: ${s.places[k]} se 🎁  (${n} / ${s.places.length})`;
        if (n === s.places.length && !done.task) {
          outro.hidden = false; done.task = true; confetti(60); check();
        }
      }));
    }

    next.addEventListener("click", () => {
      if (last) {
        unlocked = S.length - 1; store.set("bday_unlocked", unlocked);
        fly(-1, finale);
        return;
      }
      unlocked = Math.max(unlocked, i + 1);
      store.set("bday_unlocked", unlocked);
      fly(i + 1);
    });

    check();
  }

  // ---------- SORRY SPAM ----------
  function sorrySpam(onDone) {
    const ov = document.createElement("div");
    ov.className = "spam";
    ov.innerHTML = `<div class="words"></div><button class="btn big stop" hidden>bassssssss karrr aadi 😭</button>`;
    document.body.appendChild(ov);
    const words = $(".words", ov), stop = $(".stop", ov);
    const colors = ["#e2508f", "#6a4fd6", "#3fb7a3", "#ff7eb6", "#b59cff", "#ff6b3d"];
    let n = 0, timer = null;
    function spawn() {
      n++;
      const w = document.createElement("span");
      w.className = "sorry-word";
      w.textContent = n % 7 === 0 ? `SORRYYYY ${n} 🥺` : `sorry ${n}`;
      w.style.left = rand(-10, 75) + "%";
      w.style.top = rand(-2, 92) + "%";
      w.style.fontSize = rand(26, 34 + Math.min(n * 2.5, 90)) + "px";
      w.style.color = pick(colors);
      w.style.setProperty("--r", rand(-28, 28) + "deg");
      words.appendChild(w);
      if (words.children.length > 160) words.firstChild.remove();
      if (n === 12) stop.hidden = false;
      timer = setTimeout(spawn, Math.max(45, 320 - n * 10));
    }
    setTimeout(spawn, 500);
    stop.addEventListener("click", () => {
      clearTimeout(timer);
      ov.classList.add("out");
      setTimeout(() => ov.remove(), 500);
      onDone();
    });
  }

  // ---------- FINALE ----------
  function finale() {
    playSong(C.homeSong);
    app.innerHTML = `
      <section class="screen finale">
        <div class="faceRing"><img src="img/face.png" alt=""></div>
        <div class="cake">🎂</div>
        <h1>${esc(C.finale.title)}<br><span>${esc(C.herName)} 💗</span></h1>
        <div class="card story">${paras(C.finale.text)}<p class="sign" style="font-family:Caveat,cursive;font-size:26px;color:var(--pink-deep)">${esc(C.from)}</p></div>
        <button class="btn big ghost" id="again">Height chart pe wapas 📏</button>
      </section>`;
    confetti(120);
    setTimeout(() => confetti(80), 1800);
    $("#again").addEventListener("click", home);
  }

  // ---------- boot ----------
  emojiBackground();
  let inside = false;
  inside = store.get("bday_in", 0) === 1;
  inside ? home() : lock();
})();
