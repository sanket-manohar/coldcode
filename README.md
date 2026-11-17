<div align="center">

```
 ██████╗ ██████╗ ██╗     ██████╗      ██████╗ ██████╗ ██████╗ ███████╗
██╔════╝██╔═══██╗██║     ██╔══██╗    ██╔════╝██╔═══██╗██╔══██╗██╔════╝
██║     ██║   ██║██║     ██║  ██║    ██║     ██║   ██║██║  ██║█████╗
██║     ██║   ██║██║     ██║  ██║    ██║     ██║   ██║██║  ██║██╔══╝
╚██████╗╚██████╔╝███████╗██████╔╝    ╚██████╗╚██████╔╝██████╔╝███████╗
 ╚═════╝ ╚═════╝ ╚══════╝╚═════╝      ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝
           ▶  A YOUTUBE DOCUMENTARY SERIES  ·  SEASON 1  ◀
```

### *Every killer leaves code behind.*
### *हर हत्यारा पीछे कोई कोड छोड़ जाता है।*

<br>

[![Watch on YouTube](https://img.shields.io/badge/WATCH%20ON%20YOUTUBE-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://www.youtube.com/@sanketmanoharstudio)
[![Website](https://img.shields.io/badge/SERIES%20WEBSITE-0b0d0b?style=for-the-badge&logo=googlechrome&logoColor=white)](https://YOUR_GITHUB_USERNAME.github.io/coldcode/)

![episodes](https://img.shields.io/badge/episodes-1-c4a465?style=flat-square)
![out now](https://img.shields.io/badge/out%20now-0-b3121b?style=flat-square)
![languages](https://img.shields.io/badge/audio-English%20%7C%20हिन्दी-d9d2b8?style=flat-square)
![sources](https://img.shields.io/badge/every%20fact-sourced-4a5a4a?style=flat-square)

<sub>by <b>Sanket Manohar Studio</b></sub>

</div>

---

## 🎬 ABOUT THE SERIES

**COLD CODE** is an educational documentary web series on YouTube, in **English** and **हिन्दी**.

Each episode retells a well-documented real case and explains the **invention or technology** that cracked it: hidden file metadata, DNA, radio, and more. The people involved planned for the world they knew. Technology changed that world.

> 📄 Every episode ships with a **Sources PDF**: every fact, its source and when it was checked.

---

## 📺 EPISODES

> **▶ EN / ▶ HI** watch on YouTube · **📄** sources PDF · **📁** episode folder · **🎬** episode page on the website

<!-- EPISODES:START -->
| Ep | Title | When · Where | Technology | Runtime | English | हिन्दी | Sources | Website | Status |
|:---:|---|---|---|:---:|:---:|:---:|:---:|:---:|:---:|
| `01` | **The Floppy Disk That Caught a Killer**<br><sub>वो फ़्लॉपी डिस्क जिसने एक हत्यारे को पकड़वाया</sub> | 1974–2005 · Wichita, Kansas, USA | `File Metadata & DNA` | 11:00 | [▶ EN](https://www.youtube.com/watch?v=4_WRsYWUSXU) | [▶ HI](https://www.youtube.com/watch?v=4_WRsYWUSXU) | [📄 PDF](episodes/EP01-the-floppy-disk-that-caught-a-killer/COLD-CODE-Case-01-Sources.pdf) [📁](episodes/EP01-the-floppy-disk-that-caught-a-killer) | [🎬 page](https://YOUR_GITHUB_USERNAME.github.io/coldcode/#episode-01) | 🗓️ PREMIERES<br>20 Nov 2026 |
<!-- EPISODES:END -->

<sub>⚙️ Generated from <code>data/episodes.json</code> by GitHub Actions. Don't edit the table by hand.</sub>

---

## 🔦 NOW SHOWING · Episode 01

<a href="https://www.youtube.com/watch?v=4_WRsYWUSXU"><img src="https://i.ytimg.com/vi/4_WRsYWUSXU/hqdefault.jpg" width="560" alt="COLD CODE Episode 01 — The Floppy Disk That Caught a Killer"></a>

**The Floppy Disk That Caught a Killer** · *वो फ़्लॉपी डिस्क जिसने एक हत्यारे को पकड़वाया*

For 30 years a killer taunted Wichita, Kansas, and was never caught. Then he asked the police whether a floppy disk could be traced. They said no. That was a bluff. One deleted Word file, its hidden metadata and a familial DNA match ended the manhunt.

🗓️ Premieres **Friday 20 Nov 2026 · 7:30 PM IST** · ⏱ 11:00 · [📄 Sources](episodes/EP01-the-floppy-disk-that-caught-a-killer/COLD-CODE-Case-01-Sources.pdf) · [📁 Episode folder](episodes/EP01-the-floppy-disk-that-caught-a-killer)

---

## 🌐 SERIES WEBSITE

**→ https://YOUR_GITHUB_USERNAME.github.io/coldcode/**

A cinematic, noir-style home for the show: a title-card intro, film grain, a flickering title, a flashlight effect on the opening screen, episode cards styled like folders with polaroids, and a popup that plays the episode inside the page. One button switches the whole site between English and हिन्दी.

There's no build step and no framework. The site reads **one file**: `data/episodes.json`.

---

## 🗂️ REPO LAYOUT

```
coldcode/
├── index.html                 ← series website
├── terms.html                 ← terms & disclaimer (English + हिन्दी)
├── assets/
│   ├── css/style.css          ← look & animations
│   └── js/app.js              ← loads episodes.json, renders the site
├── data/
│   └── episodes.json          ← ★ THE ONLY FILE YOU EDIT ★
├── episodes/
│   ├── _TEMPLATE/
│   └── EP01-the-floppy-disk-that-caught-a-killer/
│       ├── README.md
│       └── COLD-CODE-Case-01-Sources.pdf
├── scripts/
│   ├── new-episode.mjs        ← adds a new episode
│   └── build-readme.mjs       ← rebuilds the table above
└── .github/workflows/
    └── readme.yml             ← keeps this README up to date
```

---

## ➕ ADDING THE NEXT EPISODE

```bash
node scripts/new-episode.mjs "radar-trap" "The Radar Trap" "रडार का जाल"
```

This creates `episodes/EP02-radar-trap/` and a new entry in `data/episodes.json`. Then:

1. Fill in the entry: titles, summary, year, place, technology, runtime, YouTube link and `release_date`. Set `"status": "released"` once the video is scheduled or public.
2. Put `COLD-CODE-Case-02-Sources.pdf` in the new folder.
3. Push:

```bash
git add . && git commit -m "episode 02: the radar trap" && git push
```

The website updates on its own. GitHub Actions rewrites the episode table in this README, and on the premiere date flips the status to **OUT NOW**.

---

## ⚖️ DISCLAIMER

COLD CODE is an **independent educational YouTube series** by Sanket Manohar Studio. It is **not affiliated with, endorsed by, or acting for any police force, government, court or law-enforcement agency**, or any person or organization mentioned. Episodes are based on publicly available reports, court records and news coverage. Scenes are AI-illustrated dramatizations; characters are not depictions of real people. In memory of the victims and their families. Full terms: [`terms.html`](terms.html).

---

<div align="center">

```
 ┌───────────────────────────────────────────────────────────────┐
 │   NO CASE IS EVER COLD.  IT'S JUST WAITING FOR ITS INVENTION. │
 └───────────────────────────────────────────────────────────────┘
```

**▶ NEW EPISODES ON YOUTUBE · [SUBSCRIBE](https://www.youtube.com/@sanketmanoharstudio?sub_confirmation=1)**

</div>
