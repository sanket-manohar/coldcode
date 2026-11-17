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
      skip: "SKIP ▸", intro_pre: "A documentary series on YouTube", intro_post: "Season 1 · English & हिन्दी",
      nav_episodes: "Episodes", nav_about: "About", nav_terms: "Terms", subscribe: "Subscribe",
      badge: "A YouTube documentary series · English & हिन्दी",
      hero_desc: "Real stories of how technology uncovered the truth, explained simply, so you can understand the tech, spot online fraud and stay safe.",
      cta_latest: "▶ Watch latest episode", cta_all: "All episodes", hint: "move your flashlight",
      latest_title: "Latest Episode", episodes_title: "Episodes",
      about_kicker: "ABOUT THE SERIES", about_title: "What is COLD CODE?",
      about_p1: "COLD CODE is an educational YouTube series about the power of technology. Each episode takes a real mystery that stayed unsolved for years and shows the invention or technology that finally brought out the truth.",
      about_p2: "Every episode is researched from public sources such as books, published records and news reports, and its full reference list is published alongside the video.",
      about_p3: "Available in English and Hindi.", motto_title: "Our motto", m1_t: "Learn technology", m1_d: "Understand how everyday tech like files, phones and data really works.", m2_t: "Stay alert", m2_d: "Spot online fraud, fake messages and digital scams before they reach you.", m3_t: "Stay safe", m3_d: "Use technology wisely to protect yourself and your family.", never: "We show how technology finds the truth. We never teach how to misuse it.", about_cta: "▶ Watch on YouTube",
      disclaimer: "COLD CODE is an independent educational YouTube series. Its motto is to learn technology, stay alert and stay safe in the digital age. It shows how technology reveals the truth and never teaches any method of misuse. It is not affiliated with, endorsed by, or acting for any government department, agency or organization. All stories are based on publicly available sources. Scenes are AI-illustrated dramatizations; characters are not depictions of real people.",
      ep: "EPISODE", watchNow: "WATCH NOW", premieres: "PREMIERES", audioHint: "Hindi audio: open ⚙ Settings → Audio track in the player", soon: "COMING SOON", watchEp: "▶ Watch episode", details: "Details ▸",
      refs: "Sources (PDF)", learn: "What you'll learn", ytOpen: "Open on YouTube",
      year: "Year", place: "Location", tech: "Technology", released: "Release date", duration: "Runtime",
      audio: "LANGUAGE", pending: "COMING SOON", pendingSub: "PREMIERES ON YOUTUBE",
      notAvail: "Not available in this language yet",
      loadErr: "Episodes could not be loaded. Please open this site over http (for example on GitHub Pages)."
    },
    hi: {
      skip: "छोड़ें ▸", intro_pre: "YouTube पर एक डॉक्यूमेंट्री सीरीज़", intro_post: "सीज़न 1 · English और हिन्दी",
      nav_episodes: "एपिसोड", nav_about: "परिचय", nav_terms: "नियम व शर्तें", subscribe: "सब्सक्राइब",
      badge: "YouTube डॉक्यूमेंट्री सीरीज़ · English और हिन्दी",
      hero_desc: "सच्ची कहानियाँ कि टेक्नोलॉजी ने सच कैसे सामने लाया, आसान भाषा में, ताकि आप टेक्नोलॉजी समझें, ऑनलाइन धोखाधड़ी पहचानें और सुरक्षित रहें।",
      cta_latest: "▶ नया एपिसोड देखें", cta_all: "सभी एपिसोड", hint: "अपनी टॉर्च घुमाइए",
      latest_title: "नया एपिसोड", episodes_title: "एपिसोड",
      about_kicker: "सीरीज़ के बारे में", about_title: "COLD CODE क्या है?",
      about_p1: "COLD CODE टेक्नोलॉजी की ताक़त पर एक शैक्षिक YouTube सीरीज़ है। हर एपिसोड एक ऐसा असली रहस्य लेता है जो सालों तक अनसुलझा रहा, और दिखाता है कि किस आविष्कार या तकनीक ने आख़िरकार सच सामने लाया।",
      about_p2: "हर एपिसोड किताबों, प्रकाशित रिकॉर्ड और समाचार रिपोर्ट जैसे सार्वजनिक स्रोतों से तैयार होता है, और उसकी पूरी रेफ़रेंस सूची वीडियो के साथ प्रकाशित की जाती है।",
      about_p3: "English और हिन्दी में उपलब्ध।", motto_title: "हमारा मक़सद", m1_t: "टेक्नोलॉजी सीखिए", m1_d: "समझिए कि फ़ाइलें, फ़ोन और डेटा जैसी रोज़ की टेक्नोलॉजी असल में कैसे काम करती है।", m2_t: "सतर्क रहिए", m2_d: "ऑनलाइन धोखाधड़ी, फ़र्ज़ी मैसेज और डिजिटल स्कैम को पहचानिए।", m3_t: "सुरक्षित रहिए", m3_d: "टेक्नोलॉजी का समझदारी से इस्तेमाल करके ख़ुद को और अपने परिवार को सुरक्षित रखिए।", never: "हम दिखाते हैं कि टेक्नोलॉजी सच कैसे ढूँढती है। हम कभी उसका ग़लत इस्तेमाल नहीं सिखाते।", about_cta: "▶ YouTube पर देखें",
      disclaimer: "COLD CODE एक स्वतंत्र शैक्षिक YouTube सीरीज़ है। इसका मक़सद है: टेक्नोलॉजी सीखिए, सतर्क रहिए और डिजिटल दौर में सुरक्षित रहिए। यह दिखाती है कि टेक्नोलॉजी सच कैसे सामने लाती है, और कभी भी किसी ग़लत इस्तेमाल का तरीका नहीं सिखाती। इसका किसी भी सरकारी विभाग, एजेंसी या संगठन से कोई संबंध नहीं है, न ही यह उनकी ओर से काम करती है। सभी कहानियाँ सार्वजनिक रूप से उपलब्ध स्रोतों पर आधारित हैं। दृश्य AI से बनाए गए नाटकीय चित्रण हैं; पात्र असली लोगों का चित्रण नहीं हैं।",
      ep: "एपिसोड", watchNow: "अभी देखें", premieres: "प्रीमियर", audioHint: "हिन्दी ऑडियो: प्लेयर में ⚙ सेटिंग्स → ऑडियो ट्रैक चुनें", soon: "जल्द आ रहा है", watchEp: "▶ एपिसोड देखें", details: "विवरण ▸",
      refs: "स्रोत (PDF)", learn: "आप क्या सीखेंगे", ytOpen: "YouTube पर खोलें",
      year: "साल", place: "जगह", tech: "तकनीक", released: "रिलीज़ तारीख़", duration: "अवधि",
      audio: "भाषा", pending: "जल्द आ रहा है", pendingSub: "YouTube पर प्रीमियर",
      notAvail: "इस भाषा में अभी उपलब्ध नहीं",
      loadErr: "एपिसोड लोड नहीं हो सके। कृपया इस साइट को http पर खोलें (जैसे GitHub Pages)।"
    }
  };

  const state = { lang: "en", data: null, episodes: [], current: null, audioLang: "en" };

  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* ignore */ } },
    sget(k) { try { return sessionStorage.getItem(k); } catch { return null; } },
    sset(k, v) { try { sessionStorage.setItem(k, v); } catch { /* ignore */ } }
  };

  const t = (k) => (I18N[state.lang] && I18N[state.lang][k]) ?? I18N.en[k] ?? k;
  const L = (obj) => (obj && typeof obj === "object") ? (obj[state.lang] || obj.en || "") : (obj || "");
  const pad = (n) => String(n).padStart(2, "0");
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const ytId = (v) => {
    if (!v) return "";
    const m = String(v).match(/(?:youtu\.be\/|v=|embed\/|shorts\/|live\/)([\w-]{11})/);
    return m ? m[1] : (/^[\w-]{11}$/.test(v) ? v : "");
  };
  const thumbOf = (ep) => {
    if (ep.poster) return ep.poster;
    const id = ytId(ep.youtube?.[state.lang]) || ytId(ep.youtube?.en) || ytId(ep.youtube?.hi);
    return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : "";
  };
  const hasVideo = (ep) => !!(ytId(ep.youtube?.en) || ytId(ep.youtube?.hi));
  const today = () => { const d = new Date(); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; };
  const isOut = (ep) => ep.status === "released" && (!ep.release_date || ep.release_date <= today());
  const isPremiere = (ep) => ep.status === "released" && !!ep.release_date && ep.release_date > today();
  const fmtDate = (iso) => {
    if (!iso) return "";
    const d = new Date(iso + "T00:00:00");
    return isNaN(d) ? iso : d.toLocaleDateString(state.lang === "hi" ? "hi-IN" : "en-GB", { day: "numeric", month: "short", year: "numeric" });
  };
  const sameVideo = (ep) => ytId(ep.youtube?.en) && ytId(ep.youtube?.en) === ytId(ep.youtube?.hi);

  /* ── data ─────────────────────────────────────────────── */
  async function load() {
    const res = await fetch(DATA_URL, { cache: "no-cache" });
    if (!res.ok) throw new Error(res.status);
    const data = await res.json();
    state.data = data;
    state.episodes = [...(data.episodes || [])].sort((a, b) => a.number - b.number);
  }

  /* ── intro title card ─────────────────────────────────── */
  function runIntro() {
    const intro = $("#intro");
    return new Promise((resolve) => {
      const finish = () => { intro.classList.add("done"); store.sset("cc_intro", "1"); resolve(); };
      if (reduceMotion || store.sget("cc_intro")) { intro.classList.add("done"); return resolve(); }
      $("#introSkip").onclick = finish;
      intro.classList.add("play");
      setTimeout(finish, 3600);
    });
  }

  /* ── film grain ───────────────────────────────────────── */
  function grain() {
    if (reduceMotion) return;
    const c = $("#grain"), ctx = c.getContext("2d");
    const size = () => { c.width = innerWidth / 3; c.height = innerHeight / 3; };
    size(); addEventListener("resize", size);
    let frame = 0;
    const draw = () => {
      if (frame++ % 3 === 0) {
        const img = ctx.createImageData(c.width, c.height), d = img.data;
        for (let i = 0; i < d.length; i += 4) { const v = Math.random() * 255; d[i] = d[i + 1] = d[i + 2] = v; d[i + 3] = 255; }
        ctx.putImageData(img, 0, 0);
      }
      requestAnimationFrame(draw);
    };
    draw();
  }

  /* ── flashlight on the hero ───────────────────────────── */
  function flashlight() {
    const hero = $("#hero");
    let tx = 50, ty = 40, x = 50, y = 40, idle = true;
    hero.addEventListener("pointermove", (e) => {
      const r = hero.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width) * 100; ty = ((e.clientY - r.top) / r.height) * 100; idle = false;
    });
    hero.addEventListener("pointerleave", () => { idle = true; });
    const loop = (ts) => {
      if (idle && !reduceMotion) { const s = ts / 1000; tx = 50 + Math.sin(s * .6) * 30; ty = 45 + Math.cos(s * .9) * 22; }
      x += (tx - x) * .08; y += (ty - y) * .08;
      hero.style.setProperty("--mx", x + "%"); hero.style.setProperty("--my", y + "%");
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  /* ── typewriter ───────────────────────────────────────── */
  let typeToken = 0;
  function typewrite(el, text, speed = 14) {
    const my = ++typeToken;
    if (reduceMotion || !speed) { el.textContent = text; return; }
    let i = 0;
    const step = () => {
      if (my !== typeToken) return;
      el.innerHTML = esc(text.slice(0, i)) + '<span class="caret"></span>';
      if (i++ < text.length) setTimeout(step, speed);
      else el.textContent = text;
    };
    step();
  }
  function typeOnce(el, text) {
    if (reduceMotion) { el.textContent = text; return; }
    let i = 0; el.textContent = "";
    const step = () => { el.textContent = text.slice(0, i); if (i++ < text.length) setTimeout(step, 30); };
    step();
  }

  /* ── video (loads YouTube only on click) ──────────────── */
  function playerHTML(ep, lang) {
    const id = ytId(ep.youtube?.[lang]);
    if (!id) {
      return `<div class="pending"><div class="static"></div><b>${t("pending")}</b><span>${t("pendingSub")}${ep.release_date ? " · " + esc(fmtDate(ep.release_date)) : ""}</span></div>`;
    }
    const thumb = ep.poster || `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
    return `<button class="facade" data-yt="${id}" data-hl="${lang}" style="background-image:url('${esc(thumb)}')" aria-label="${esc(t("watchEp"))}: ${esc(L(ep.title))}">
      <span class="rec-label"><span class="yt-icon"></span>${t("ep")} ${pad(ep.number)}</span>
      <span class="play"></span>
      <span class="timecode">${esc(ep.duration || "")}</span>
    </button>`;
  }
  document.addEventListener("click", (e) => {
    const f = e.target.closest(".facade");
    if (!f) return;
    f.outerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${f.dataset.yt}?autoplay=1&rel=0&modestbranding=1&hl=${f.dataset.hl || "en"}&cc_lang_pref=${f.dataset.hl || "en"}" title="COLD CODE" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  });

  /* ── latest episode ───────────────────────────────────── */
  function renderFeatured() {
    const eps = state.episodes;
    const ep = [...eps].reverse().find((e) => isOut(e) && hasVideo(e)) || [...eps].reverse().find(hasVideo) || eps[0];
    if (!ep) return;
    const lang = ytId(ep.youtube?.[state.lang]) ? state.lang : (ytId(ep.youtube?.en) ? "en" : "hi");
    $("#featuredBox").innerHTML = `
      <div class="player">${playerHTML(ep, lang)}</div>
      <div>
        <p class="mono small">${t("ep")} ${pad(ep.number)} · ${esc(ep.year)} · ${esc(ep.location)}${isPremiere(ep) ? ` · <b class="premiere-tag">${t("premieres")} ${esc(fmtDate(ep.release_date))}</b>` : ""}</p>
        <h3>${esc(L(ep.title))}</h3>
        <p class="subtitle">${esc(L(ep.subtitle))}</p>
        <p class="summary">${esc(L(ep.summary))}</p>
        <a href="#" class="btn btn-red" data-open="${ep.number}">${t("details")}</a>
      </div>`;
  }

  /* ── episode grid ─────────────────────────────────────── */
  function card(ep, i) {
    const thumb = thumbOf(ep);
    const out = isOut(ep);
    return `<article class="case" tabindex="0" data-open="${ep.number}" style="transition-delay:${(i % 6) * 90}ms">
      <div class="case-tab">${t("ep")} ${pad(ep.number)}</div>
      <div class="case-folder">
        <div class="ribbon ${out ? "out" : "soon"}">${out ? t("watchNow") : isPremiere(ep) ? t("premieres") + " " + esc(fmtDate(ep.release_date)) : t("soon")}</div>
        <figure class="polaroid">
          <span class="pin"></span>
          ${thumb ? `<div class="ph" style="background-image:url('${esc(thumb)}')"></div>` : `<div class="ph gen"><span>EP ${pad(ep.number)}</span></div>`}
          <figcaption>${esc(ep.year)}</figcaption>
        </figure>
        <div class="case-body">
          <p class="case-meta">${esc(ep.location)}</p>
          <h3 class="case-title">${esc(L(ep.title))}</h3>
          <p class="case-sub">${esc(L(ep.subtitle))}</p>
          <span class="case-tech">${esc(ep.technology)}</span>
          <span class="case-watch">${out ? t("watchEp") : isPremiere(ep) ? "◷ " + t("premieres") + " " + esc(fmtDate(ep.release_date)) : t("soon")}</span>
        </div>
      </div>
    </article>`;
  }
  function renderGrid() {
    $("#casesGrid").innerHTML = state.episodes.map(card).join("");
    observe($$("#casesGrid .case"));
  }

  /* ── episode popup ────────────────────────────────────── */
  function openEp(num) {
    const ep = state.episodes.find((e) => e.number === Number(num));
    if (!ep) return;
    state.current = ep;
    state.audioLang = ytId(ep.youtube?.[state.lang]) ? state.lang : (ytId(ep.youtube?.en) ? "en" : (ytId(ep.youtube?.hi) ? "hi" : state.lang));
    const m = $("#modal");
    m.classList.remove("closing");
    m.hidden = false;
    document.body.classList.add("locked");
    fillModal(true);
    history.replaceState(null, "", `#episode-${pad(ep.number)}`);
    $(".modal-close", m).focus({ preventScroll: true });
  }
  function fillModal(animate) {
    const ep = state.current; if (!ep) return;
    $("#mTab").textContent = `COLD CODE · ${t("ep")} ${pad(ep.number)}`;
    $("#mPlayer").innerHTML = playerHTML(ep, state.audioLang);
    $("#mAudio").innerHTML = `<span>${t("audio")}:</span>` + ["en", "hi"].map((l) => {
      const ok = !!ytId(ep.youtube?.[l]);
      return `<button data-audio="${l}" class="${state.audioLang === l ? "active" : ""}" ${ok ? "" : `disabled title="${esc(t("notAvail"))}"`}>${l === "en" ? "ENGLISH" : "हिन्दी"}</button>`;
    }).join("") + (sameVideo(ep) && state.audioLang === "hi" ? `<small class="audio-hint">${esc(t("audioHint"))}</small>` : "");
    $("#mMeta").textContent = `${ep.location} · ${ep.year}`;
    $("#mTitle").textContent = L(ep.title);
    $("#mSub").textContent = L(ep.subtitle);
    typewrite($("#mSummary"), L(ep.summary), animate ? 14 : 0);
    const facts = [[t("year"), ep.year], [t("place"), ep.location], [t("tech"), ep.technology], [t("released"), fmtDate(ep.release_date)], [t("duration"), ep.duration]].filter((f) => f[1]);
    $("#mFacts").innerHTML = facts.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join("");
    const learn = (ep.learn && (ep.learn[state.lang] || ep.learn.en)) || [];
    $("#mLearn").innerHTML = learn.length ? `<p class="learn-title">💡 ${esc(t("learn"))}</p><ul>${learn.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>` : "";
    const yt = ytId(ep.youtube?.[state.audioLang]);
    $("#mActions").innerHTML = [
      yt ? `<a class="btn btn-dark" href="https://www.youtube.com/watch?v=${yt}" target="_blank" rel="noopener">${t("ytOpen")}</a>` : "",
      ep.references_pdf ? `<a class="btn btn-line" href="${esc(ep.references_pdf)}" target="_blank" rel="noopener">${t("refs")}</a>` : ""
    ].join("");
  }
  function closeModal() {
    const m = $("#modal");
    if (m.hidden) return;
    typeToken++;
    m.classList.add("closing");
    setTimeout(() => { m.hidden = true; m.classList.remove("closing"); $("#mPlayer").innerHTML = ""; document.body.classList.remove("locked"); }, reduceMotion ? 0 : 430);
    history.replaceState(null, "", location.pathname + location.search);
    state.current = null;
  }

  /* ── scroll reveal ────────────────────────────────────── */
  const io = "IntersectionObserver" in window ? new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { threshold: .15 }) : null;
  function observe(els) { els.forEach((el) => io ? io.observe(el) : el.classList.add("in")); }

  /* ── language ─────────────────────────────────────────── */
  function applyLang(lang, rerender = true) {
    state.lang = I18N[lang] ? lang : "en";
    store.set("cc_lang", state.lang);
    document.documentElement.lang = state.lang;
    document.body.classList.toggle("lang-hi", state.lang === "hi");
    $$(".lang-switch button").forEach((b) => b.classList.toggle("active", b.dataset.lang === state.lang));
    $$("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
    if (state.data) typeOnce($("#tagline"), L(state.data.series?.tagline));
    if (rerender && state.data) {
      renderFeatured(); renderGrid();
      if (state.current) { state.audioLang = ytId(state.current.youtube?.[state.lang]) ? state.lang : state.audioLang; fillModal(false); }
    }
  }

  /* ── events ───────────────────────────────────────────── */
  function bind() {
    $$(".lang-switch button").forEach((b) => b.addEventListener("click", () => applyLang(b.dataset.lang)));
    document.addEventListener("click", (e) => {
      const aud = e.target.closest("[data-audio]");
      if (aud && !aud.disabled) { state.audioLang = aud.dataset.audio; fillModal(false); return; }
      if (e.target.closest("[data-close]")) { closeModal(); return; }
      const op = e.target.closest("[data-open]");
      if (op) { e.preventDefault(); openEp(op.dataset.open); }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "Enter" && e.target.matches(".case")) openEp(e.target.dataset.open);
    });
    addEventListener("scroll", () => $(".nav").classList.toggle("scrolled", scrollY > 40), { passive: true });
  }

  function filmStrip() {
    const words = ["COLD CODE", "LEARN TECHNOLOGY", "STAY ALERT", "STAY SAFE", "टेक्नोलॉजी सीखिए", "सतर्क रहिए", "NOW ON YOUTUBE"];
    const html = words.map((w) => `<span>${w}</span><i>●</i>`).join("");
    $$("[data-strip]").forEach((el) => el.innerHTML = html.repeat(4));
  }

  // On GitHub Pages (user.github.io/coldcode/) the repo URL is worked out from the address.
  function githubRepo() {
    const h = location.hostname;
    if (!h.endsWith(".github.io")) return "";
    const user = h.replace(/\.github\.io$/, "");
    const first = location.pathname.split("/").filter(Boolean)[0];
    const repo = first && !first.includes(".") ? first : h;
    return `https://github.com/${user}/${repo}`;
  }

  function links() {
    const s = state.data?.series || {};
    if (s.youtube_channel) {
      $("#subscribeBtn").href = s.youtube_channel + (s.youtube_channel.includes("?") ? "" : "?sub_confirmation=1");
      $("#footYoutube").href = s.youtube_channel;
      $("#aboutYoutube").href = s.youtube_channel;
    }
    const repo = s.repo || githubRepo();
    if (repo) $("#footRepo").href = repo; else $("#footRepo").remove();
    $("#year").textContent = new Date().getFullYear();
  }

  /* ── boot ─────────────────────────────────────────────── */
  async function init() {
    const saved = store.get("cc_lang");
    const browserHi = (navigator.language || "").toLowerCase().startsWith("hi");
    applyLang(saved || (browserHi ? "hi" : "en"), false);
    bind(); filmStrip(); grain(); flashlight();
    try { await load(); }
    catch (err) {
      $("#intro").classList.add("done");
      $("#casesGrid").innerHTML = `<p class="empty">${esc(t("loadErr"))}</p>`;
      console.error("COLD CODE: could not load", DATA_URL, err);
      return;
    }
    links();
    await runIntro();
    applyLang(state.lang, true);
    observe($$(".reveal"));
    const deep = location.hash.match(/^#(?:episode|case)-(\d+)/);
    if (deep) openEp(Number(deep[1]));
  }
  init();
})();
