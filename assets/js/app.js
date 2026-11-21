/* ═══════════════════════════════════════════════════════════
   COLD CODE — website for the YouTube series
   All episode content comes from data/episodes.json. Edit that file only.
   ═══════════════════════════════════════════════════════════ */
(() => {
  "use strict";

  const DATA_URL = "data/episodes.json";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  /* ── UI strings (English / Hindi) ─────────────────────── */
  const I18N = {
    en: {
      intro_pre: "A series on YouTube", intro_post: "Stay vigilant · Protect people · Stop crime",
      nav_about: "About", nav_terms: "Terms", subscribe: "Subscribe",
      badge: "An entertainment series on YouTube · English · हिन्दी · Español",
      hero_desc: "True cases that stayed unsolved for years, until technology found the answer. Told to keep us vigilant against crime around us, protect the people we care about and help stop crime.",
      m1_t: "Stay vigilant", m1_d: "Notice the crimes happening around us, online and offline, before they reach you or your family.",
      m2_t: "Protect people", m2_d: "Keep your family, friends and community safe.",
      m3_t: "Stop crime", m3_d: "Technology exposes the truth, so crime has nowhere to hide.",
      never: "These stories have one purpose: to keep us vigilant against the crimes happening around us, to protect people and to help stop crime. Never to misuse technology.",
      episodes_title: "Episodes",
      foot_short: "An independent entertainment series on YouTube. Not affiliated with any government department, agency or organization.",
      about_kicker: "ABOUT THE SERIES", about_title: "What is COLD CODE?",
      about_p1: "COLD CODE is an entertainment series on YouTube about real crime stories that were solved by technology. Each episode tells one true story, and the invention or technology that finally cracked it.",
      about_p2: "Every story is based on public sources such as books, published records and news reports, and the full list of sources is published with the video.",
      about_cta: "▶ Watch on YouTube",
      disclaimer: "COLD CODE is an independent entertainment series on YouTube by Sanket Manohar Studio, telling real crime stories that were solved by technology. The stories are told to keep people vigilant against crime, protect others and help stop crime, and never show any method of misuse. It is not affiliated with, endorsed by, or acting for any government department, agency or organization. All stories are based on publicly available sources. Scenes are illustrated dramatizations; characters are not depictions of real people.",
      ep: "EPISODE", newTag: "NEW", premieres: "PREMIERES", soon: "COMING SOON", nextSoon: "Next episode", nextSub: "Coming soon",
      watchEp: "▶ Watch", refs: "Sources (PDF)", ytOpen: "Open on YouTube",
      audio: "AUDIO", pending: "COMING SOON", pendingSub: "PREMIERES ON YOUTUBE",
      audioHint: "If the language doesn't change, pick it in the player: ⚙ Settings → Audio track",
      notAvail: "Not available in this language yet",
      loadErr: "Episodes could not be loaded. Please open this site over http (for example on GitHub Pages)."
    },
    hi: {
      intro_pre: "YouTube पर एक सीरीज़", intro_post: "सतर्क रहिए · लोगों की रक्षा कीजिए · अपराध रोकिए",
      nav_about: "परिचय", nav_terms: "नियम व शर्तें", subscribe: "सब्सक्राइब",
      badge: "YouTube पर एक मनोरंजन सीरीज़ · English · हिन्दी · Español",
      hero_desc: "वो सच्चे केस जो सालों तक अनसुलझे रहे, जब तक टेक्नोलॉजी ने जवाब नहीं ढूँढ लिया। ताकि हम अपने आसपास के अपराधों के प्रति सतर्क रहें, अपनों की रक्षा करें और अपराध रोकने में मदद करें।",
      m1_t: "सतर्क रहिए", m1_d: "अपने आसपास, ऑनलाइन और ऑफ़लाइन, हो रहे अपराधों को पहचानिए, इससे पहले कि वो आप या आपके परिवार तक पहुँचें।",
      m2_t: "लोगों की रक्षा कीजिए", m2_d: "अपने परिवार, दोस्तों और समाज को सुरक्षित रखिए।",
      m3_t: "अपराध रोकिए", m3_d: "टेक्नोलॉजी सच सामने ले आती है, ताकि अपराध कहीं छिप न सके।",
      never: "इन कहानियों का एक ही मक़सद है: अपने आसपास हो रहे अपराधों के प्रति सतर्क रहना, लोगों की रक्षा करना और अपराध रोकने में मदद करना। कभी टेक्नोलॉजी का ग़लत इस्तेमाल नहीं।",
      episodes_title: "एपिसोड",
      foot_short: "YouTube पर एक स्वतंत्र मनोरंजन सीरीज़। किसी भी सरकारी विभाग, एजेंसी या संगठन से कोई संबंध नहीं।",
      about_kicker: "सीरीज़ के बारे में", about_title: "COLD CODE क्या है?",
      about_p1: "COLD CODE, YouTube पर एक मनोरंजन सीरीज़ है, उन असली अपराध कहानियों के बारे में जिन्हें टेक्नोलॉजी ने सुलझाया। हर एपिसोड एक सच्ची कहानी बताता है, और वो आविष्कार या टेक्नोलॉजी जिसने आख़िरकार उसे सुलझाया।",
      about_p2: "हर कहानी किताबों, प्रकाशित रिकॉर्ड और समाचार रिपोर्ट जैसे सार्वजनिक स्रोतों पर आधारित है, और स्रोतों की पूरी सूची वीडियो के साथ प्रकाशित की जाती है।",
      about_cta: "▶ YouTube पर देखें",
      disclaimer: "COLD CODE, Sanket Manohar Studio की YouTube पर एक स्वतंत्र मनोरंजन सीरीज़ है, जो उन असली अपराध कहानियों को बताती है जिन्हें टेक्नोलॉजी ने सुलझाया। ये कहानियाँ लोगों को अपराध के प्रति सतर्क रखने, दूसरों की रक्षा करने और अपराध रोकने में मदद के लिए बताई जाती हैं, और कभी किसी ग़लत इस्तेमाल का तरीका नहीं दिखातीं। इसका किसी भी सरकारी विभाग, एजेंसी या संगठन से कोई संबंध नहीं है। सभी कहानियाँ सार्वजनिक रूप से उपलब्ध स्रोतों पर आधारित हैं। दृश्य चित्रित नाटकीय रूपांतरण हैं; पात्र असली लोगों का चित्रण नहीं हैं।",
      ep: "एपिसोड", newTag: "नया", premieres: "प्रीमियर", soon: "जल्द आ रहा है", nextSoon: "अगला एपिसोड", nextSub: "जल्द आ रहा है",
      watchEp: "▶ देखें", refs: "स्रोत (PDF)", ytOpen: "YouTube पर खोलें",
      audio: "ऑडियो", pending: "जल्द आ रहा है", pendingSub: "YouTube पर प्रीमियर",
      audioHint: "अगर भाषा न बदले, तो प्लेयर में चुनें: ⚙ सेटिंग्स → ऑडियो ट्रैक",
      notAvail: "इस भाषा में अभी उपलब्ध नहीं",
      loadErr: "एपिसोड लोड नहीं हो सके। कृपया इस साइट को http पर खोलें (जैसे GitHub Pages)।"
    }
  };

  const AUDIO = [["en", "EN"], ["hi", "हिं"], ["es", "ES"]];
  const state = { lang: "en", data: null, episodes: [], current: null, audioLang: "en" };
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* ignore */ } },
    sget(k) { try { return sessionStorage.getItem(k); } catch { return null; } },
    sset(k, v) { try { sessionStorage.setItem(k, v); } catch { /* ignore */ } }
  };

  const t = (k) => (I18N[state.lang] && I18N[state.lang][k]) ?? I18N.en[k] ?? k;
  const L = (obj) => (obj && typeof obj === "object" && !Array.isArray(obj)) ? (obj[state.lang] || obj.en || "") : (obj || "");
  const pad = (n) => String(n).padStart(2, "0");
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const ytId = (v) => {
    if (!v) return "";
    const m = String(v).match(/(?:youtu\.be\/|v=|embed\/|shorts\/|live\/)([\w-]{11})/);
    return m ? m[1] : (/^[\w-]{11}$/.test(v) ? v : "");
  };
  const today = () => { const d = new Date(); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; };
  const isOut = (ep) => ep.status === "released" && (!ep.release_date || ep.release_date <= today());
  const isPremiere = (ep) => ep.status === "released" && !!ep.release_date && ep.release_date > today();
  const fmtDate = (iso) => {
    if (!iso) return "";
    const d = new Date(iso + "T00:00:00");
    return isNaN(d) ? iso : d.toLocaleDateString(state.lang === "hi" ? "hi-IN" : "en-GB", { day: "numeric", month: "short", year: "numeric" });
  };
  const thumbOf = (ep) => {
    if (ep.poster) return ep.poster;
    const id = ytId(ep.youtube?.en) || ytId(ep.youtube?.hi);
    return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : "";
  };
  const sameVideo = (ep) => ytId(ep.youtube?.en) && ytId(ep.youtube?.en) === ytId(ep.youtube?.hi);

  /* ── data ─────────────────────────────────────────────── */
  async function load() {
    const res = await fetch(DATA_URL, { cache: "no-cache" });
    if (!res.ok) throw new Error(res.status);
    state.data = await res.json();
    state.episodes = [...(state.data.episodes || [])].sort((a, b) => a.number - b.number);
  }

  /* ── intro ────────────────────────────────────────────── */
  function runIntro() {
    const intro = $("#intro");
    return new Promise((resolve) => {
      const finish = () => { intro.classList.add("done"); store.sset("cc_intro", "1"); resolve(); };
      if (reduceMotion || store.sget("cc_intro")) { intro.classList.add("done"); return resolve(); }
      intro.addEventListener("click", finish, { once: true });
      intro.classList.add("play");
      setTimeout(finish, 3000);
    });
  }

  /* ── atmosphere: grain + soft light that follows the pointer ── */
  function grain() {
    if (reduceMotion) return;
    const c = $("#grain"), ctx = c.getContext("2d");
    const size = () => { c.width = innerWidth / 3; c.height = innerHeight / 3; };
    size(); addEventListener("resize", size);
    let f = 0;
    const draw = () => {
      if (f++ % 4 === 0) {
        const img = ctx.createImageData(c.width, c.height), d = img.data;
        for (let i = 0; i < d.length; i += 4) { const v = Math.random() * 255; d[i] = d[i + 1] = d[i + 2] = v; d[i + 3] = 255; }
        ctx.putImageData(img, 0, 0);
      }
      requestAnimationFrame(draw);
    };
    draw();
  }
  function glow() {
    const g = $("#glow");
    let tx = 30, ty = 40, x = 30, y = 40, idle = true;
    addEventListener("pointermove", (e) => { tx = e.clientX / innerWidth * 100; ty = e.clientY / innerHeight * 100; idle = false; });
    document.addEventListener("pointerleave", () => { idle = true; });
    const loop = (ts) => {
      if (idle && !reduceMotion) { const s = ts / 1000; tx = 35 + Math.sin(s * .4) * 20; ty = 45 + Math.cos(s * .5) * 15; }
      x += (tx - x) * .06; y += (ty - y) * .06;
      g.style.setProperty("--gx", x + "%"); g.style.setProperty("--gy", y + "%");
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }
  function typeOnce(el, text) {
    if (reduceMotion) { el.textContent = text; return; }
    let i = 0; el.textContent = "";
    const step = () => { el.textContent = text.slice(0, i); if (i++ < text.length) setTimeout(step, 28); };
    step();
  }

  /* ── player (YouTube loads only on click) ─────────────── */
  function playerHTML(ep, lang) {
    const id = ytId(ep.youtube?.[lang]) || ytId(ep.youtube?.en);
    if (!id) return `<div class="pending"><b>${t("pending")}</b><span>${t("pendingSub")}${ep.release_date ? " · " + esc(fmtDate(ep.release_date)) : ""}</span></div>`;
    const thumb = ep.poster || `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
    return `<button class="facade" data-yt="${id}" data-hl="${lang}" style="background-image:url('${esc(thumb)}')" aria-label="${esc(t("watchEp"))}: ${esc(L(ep.title))}">
      <span class="chip"><span class="yt-icon"></span>${t("ep")} ${pad(ep.number)}</span>
      <span class="play"></span>
      ${ep.duration ? `<span class="time">${esc(ep.duration)}</span>` : ""}
    </button>`;
  }
  document.addEventListener("click", (e) => {
    const f = e.target.closest(".facade");
    if (!f) return;
    const hl = f.dataset.hl || "en";
    f.outerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${f.dataset.yt}?autoplay=1&rel=0&modestbranding=1&hl=${hl}&cc_lang_pref=${hl}" title="COLD CODE" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  });

  /* ── featured episode ─────────────────────────────────── */
  function renderFeature(animate) {
    const ep = state.current; if (!ep) return;
    const yt = ytId(ep.youtube?.[state.audioLang]) || ytId(ep.youtube?.en);
    const box = $("#feature");
    box.innerHTML = `
      <div class="player">${playerHTML(ep, state.audioLang)}</div>
      <div>
        <p class="f-meta">${isOut(ep) && ep === latest() ? `<span class="new">${t("newTag")}</span>` : ""}${isPremiere(ep) ? `<span class="new">${t("premieres")} ${esc(fmtDate(ep.release_date))}</span>` : ""}<span>${t("ep")} ${pad(ep.number)}</span><span>${esc(ep.technology)}</span>${ep.duration ? `<span>${esc(ep.duration)}</span>` : ""}</p>
        <h2 class="f-title">${esc(L(ep.title))}</h2>
        <p class="f-sub">${esc(L(ep.subtitle))}</p>
      </div>
      <div class="f-actions">
        ${yt ? `<a class="btn btn-red" href="https://www.youtube.com/watch?v=${yt}" target="_blank" rel="noopener">${t("ytOpen")}</a>` : ""}
        ${ep.references_pdf ? `<a class="btn btn-line" href="${esc(ep.references_pdf)}" target="_blank" rel="noopener">📄 ${t("refs")}</a>` : ""}
        <span class="audio"><span>${t("audio")}</span>${AUDIO.filter(([l]) => ytId(ep.youtube?.[l])).map(([l, label]) =>
          `<button data-audio="${l}" class="${state.audioLang === l ? "active" : ""}">${label}</button>`).join("")}</span>
      </div>
      ${sameVideo(ep) && state.audioLang !== "en" ? `<p class="audio-hint">${esc(t("audioHint"))}</p>` : ""}`;
    if (animate && !reduceMotion) { box.classList.remove("swap"); void box.offsetWidth; box.classList.add("swap"); }
    $$(".ep[data-ep]").forEach((b) => b.classList.toggle("active", Number(b.dataset.ep) === ep.number));
    fitPlayer();
  }
  const latest = () => [...state.episodes].reverse().find((e) => isOut(e) && ytId(e.youtube?.en)) || [...state.episodes].reverse().find((e) => ytId(e.youtube?.en)) || state.episodes[0];

  function select(num, animate = true) {
    const ep = state.episodes.find((e) => e.number === Number(num));
    if (!ep) return;
    state.current = ep;
    state.audioLang = ytId(ep.youtube?.[state.lang]) ? state.lang : "en";
    renderFeature(animate);
    history.replaceState(null, "", `#episode-${pad(ep.number)}`);
  }

  /* ── size the video so the whole panel fits on one screen ── */
  function fitPlayer() {
    const box = $("#feature"), player = $(".player", box);
    if (!player) return;
    player.style.width = "";
    if (getComputedStyle(document.body).overflow !== "hidden") return; // stacked layout scrolls instead
    const cs = getComputedStyle(box);
    const stageH = box.parentElement.clientHeight;
    const gap = parseFloat(cs.rowGap) || 0;
    const kids = [...box.children];
    const others = kids.filter((k) => k !== player).reduce((h, k) => h + k.offsetHeight, 0);
    const chrome = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom) + gap * (kids.length - 1) + 4;
    const avail = stageH - others - chrome;
    const inner = box.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    player.style.width = Math.max(260, Math.min(inner, avail * 16 / 9)) + "px";
  }

  /* ── episode rail ─────────────────────────────────────── */
  function renderRail() {
    const cards = state.episodes.map((ep) => {
      const thumb = thumbOf(ep);
      const status = isOut(ep) ? t("watchEp") : isPremiere(ep) ? `◷ ${t("premieres")} ${esc(fmtDate(ep.release_date))}` : t("soon");
      return `<button class="ep" data-ep="${ep.number}">
        ${thumb ? `<span class="ep-thumb" style="background-image:url('${esc(thumb)}')"></span>` : `<span class="ep-thumb gen">EP ${pad(ep.number)}</span>`}
        <span><small>${t("ep")} ${pad(ep.number)}</small><b>${esc(L(ep.title))}</b><em>${status}</em></span>
      </button>`;
    }).join("");
    const next = `<div class="ep soon"><span class="ep-thumb gen">EP ${pad(state.episodes.length + 1)}</span><span><small>${t("nextSoon")}</small><b>???</b><em>${t("nextSub")}</em></span></div>`;
    $("#rail").innerHTML = cards + next;
  }

  /* ── about panel ──────────────────────────────────────── */
  function openPanel(name) {
    const p = $(`#panel-${name}`); if (!p) return;
    p.classList.remove("closing"); p.hidden = false;
    $(".panel-close", p).focus({ preventScroll: true });
  }
  function closePanels() {
    $$(".panel:not([hidden])").forEach((p) => {
      p.classList.add("closing");
      setTimeout(() => { p.hidden = true; p.classList.remove("closing"); }, reduceMotion ? 0 : 280);
    });
  }

  /* ── language ─────────────────────────────────────────── */
  function applyLang(lang) {
    state.lang = I18N[lang] ? lang : "en";
    store.set("cc_lang", state.lang);
    document.documentElement.lang = state.lang;
    document.body.classList.toggle("lang-hi", state.lang === "hi");
    $$(".lang-switch button").forEach((b) => b.classList.toggle("active", b.dataset.lang === state.lang));
    $$("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
    if (state.data) {
      typeOnce($("#tagline"), L(state.data.series?.tagline));
      renderRail();
      if (state.current) { state.audioLang = ytId(state.current.youtube?.[state.lang]) ? state.lang : state.audioLang; renderFeature(false); }
    }
  }

  function bind() {
    $$(".lang-switch button").forEach((b) => b.addEventListener("click", () => applyLang(b.dataset.lang)));
    document.addEventListener("click", (e) => {
      const a = e.target.closest("[data-audio]");
      if (a && !a.disabled) { state.audioLang = a.dataset.audio; renderFeature(false); return; }
      const ep = e.target.closest(".ep[data-ep]");
      if (ep) { select(ep.dataset.ep); return; }
      const pn = e.target.closest("[data-panel]");
      if (pn) { openPanel(pn.dataset.panel); return; }
      if (e.target.closest("[data-close]")) closePanels();
    });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closePanels(); });
    let rt; addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(fitPlayer, 80); });
    if (document.fonts) document.fonts.ready.then(fitPlayer);
  }

  function links() {
    const s = state.data?.series || {};
    if (s.youtube_channel) {
      $("#subscribeBtn").href = s.youtube_channel + (s.youtube_channel.includes("?") ? "" : "?sub_confirmation=1");
      $("#aboutYoutube").href = s.youtube_channel;
    }
    $("#year").textContent = new Date().getFullYear();
  }

  /* ── boot ─────────────────────────────────────────────── */
  async function init() {
    const saved = store.get("cc_lang");
    applyLang(saved || ((navigator.language || "").toLowerCase().startsWith("hi") ? "hi" : "en"));
    bind(); grain(); glow();
    try { await load(); }
    catch (err) {
      $("#intro").classList.add("done"); document.body.classList.add("ready");
      $("#feature").innerHTML = `<p>${esc(t("loadErr"))}</p>`;
      console.error("COLD CODE: could not load", DATA_URL, err);
      return;
    }
    links();
    applyLang(state.lang);
    const deep = location.hash.match(/^#(?:episode|case)-(\d+)/);
    state.current = (deep && state.episodes.find((e) => e.number === Number(deep[1]))) || latest();
    state.audioLang = ytId(state.current?.youtube?.[state.lang]) ? state.lang : "en";
    renderRail(); renderFeature(false);
    await runIntro();
    document.body.classList.add("ready");
    fitPlayer();
  }
  init();
})();
