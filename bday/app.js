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
  // pimples, short person, big forehead + plane landing, small hands, small feet, cute big tummy
  const BG = ["🔴", "🧍‍♀️", "FOREHEAD", "🤏", "🦶", "🫃", "🛬", "🔴", "🤏", "🦶", "🧍‍♀️", "🫃", "💗"];
  function emojiBackground() {
    const bg = document.getElementById("emoji-bg");
    const n = window.innerWidth < 600 ? 18 : 30;
    for (let i = 0; i < n; i++) {
      const e = BG[i % BG.length];
      const s = document.createElement("span");
      if (e === "FOREHEAD") {
        s.className = "combo";
        s.innerHTML = "<i>🛬</i><b>🙂</b>";
      } else s.textContent = e;
      let size = rand(22, 42);
      if (e === "🔴") size = rand(8, 14);          // chhote pimples
      if (e === "🤏" || e === "🦶") size = rand(14, 22); // chhote haath-pair
      if (e === "🧍‍♀️") size = rand(16, 24);        // chhoti si
      if (e === "FOREHEAD") size = rand(40, 56);
      s.style.fontSize = size + "px";
      s.style.left = rand(-2, 98) + "vw";
      s.style.setProperty("--dx", rand(-40, 40) + "px");
      s.style.setProperty("--rot", rand(-40, 40) + "deg");
      s.style.animationDuration = rand(14, 30) + "s";
      s.style.animationDelay = -rand(0, 30) + "s";
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
        try { sessionStorage.setItem("bday_in", "1"); } catch (e) {}
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
      <text class="plane" x="150" y="${top + 14}" font-size="20">🛬</text>
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
        <h1>Ek chhoti si udaan<br><span>5'1" tak 🕊️</span></h1>
        <div class="measure">${figureSVG()}</div>
        <p class="sub">Ye hai official height chart 📏 Pigeon ke saath level-by-level udo aur dekho 5'1" tak pahunch paati ho ya nahi 😂</p>
        <button class="btn big" id="start">${startLabel}</button>
        <p class="map-title">⬆️ height chart ⬆️</p>
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
        <div class="ten">${s.items.map((t, i) => `
          <button class="flip"><div class="inner"><span class="front">#${i + 1}<small>tap 💌</small></span><span class="back">${esc(t)}</span></div></button>`).join("")}
        </div>
        <p class="progress">0 / ${s.items.length} khule</p>`;
    },
    story(s) {
      return `${polaroid(s.photo, s.caption)}<div class="card story">${paras(s.text)}</div>`;
    },
    basketball(s) {
      return `${polaroid(s.photo, s.caption)}<div class="card story">${paras(s.text)}</div>
        <div class="card">
          <div class="court"><div class="hoop"><div class="board"></div><div class="rim"></div><div class="net"></div></div>
            <div class="shout"></div><div class="ball">🏀</div></div>
          <div class="shoot-row"><p class="score">🏀 0 / ${s.goal || 3}</p><button class="btn shoot">Shoot!</button></div>
        </div>`;
    },
    letter(s) {
      return `${polaroid(s.photo, s.caption)}
        <button class="envelope"><span class="big">💌</span>Tap karke kholo</button>
        <div class="letter" hidden>${paras(s.text)}<p class="sign">${esc(C.from)}</p></div>`;
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
    const done = { q: !(s.question && s.question.q), task: !needsTask };
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
    const taskHint = { ten: "Saare cards kholo 💌", basketball: `${s.goal || 3} basket daalo 🏀`, letter: "Letter kholo 💌", gifts: "Saare gifts kholo 🎁" }[s.type];
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
      let hits = 0, misses = 0;
      const say = (t) => { shout.textContent = t; shout.classList.remove("show"); void shout.offsetWidth; shout.classList.add("show"); };
      btn.addEventListener("click", () => {
        btn.disabled = true;
        // tap ke time hoop kahan hai, wahi decide karta hai
        const c = court.getBoundingClientRect(), h = hoop.getBoundingClientRect();
        const off = Math.abs(h.left + h.width / 2 - (c.left + c.width / 2));
        const tol = misses >= 4 ? h.width * .6 : h.width * .4; // thodi madad agar baar baar miss ho 😉
        const hit = off < tol;
        if (hit) hoop.style.animationPlayState = "paused";
        ball.className = "ball"; void ball.offsetWidth; ball.className = "ball shoot";
        setTimeout(() => {
          if (hit) {
            hits++; misses = 0;
            ball.className = "ball swish";
            say(pick(["Swish! 🔥", "Basket! 🏀", "Kya baat hai! 😎", "Height ko maaro goli 😂"]));
            if (hits === 2) court.classList.add("fast");
          } else {
            misses++;
            ball.className = "ball miss";
            say(pick(["Air ball 😂", "Height ka issue hai kya? 🤭", "Arey! Phir se 😤", "Chhote haath 🤏😂"]));
          }
          score.textContent = `🏀 ${Math.min(hits, goal)} / ${goal}`;
          setTimeout(() => {
            ball.className = "ball";
            hoop.style.animationPlayState = "";
            if (hits >= goal) {
              btn.textContent = "Champion! 🏆";
              if (!done.task) { done.task = true; confetti(40); check(); }
            } else btn.disabled = false;
          }, 800);
        }, 550);
      });
    }

    if (s.type === "letter") {
      const env = $(".envelope", app), letter = $(".letter", app);
      env.addEventListener("click", () => {
        env.hidden = true; letter.hidden = false;
        done.task = true; check();
      });
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
  try { inside = sessionStorage.getItem("bday_in") === "1"; } catch (e) {}
  inside ? home() : lock();
})();
