<div align="center">

```
 ██████╗ ██████╗ ██╗     ██████╗      ██████╗ ██████╗ ██████╗ ███████╗
██╔════╝██╔═══██╗██║     ██╔══██╗    ██╔════╝██╔═══██╗██╔══██╗██╔════╝
██║     ██║   ██║██║     ██║  ██║    ██║     ██║   ██║██║  ██║█████╗
██║     ██║   ██║██║     ██║  ██║    ██║     ██║   ██║██║  ██║██╔══╝
╚██████╗╚██████╔╝███████╗██████╔╝    ╚██████╗╚██████╔╝██████╔╝███████╗
 ╚═════╝ ╚═════╝ ╚══════╝╚═════╝      ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝
        ▶  A YOUTUBE SERIES ABOUT THE POWER OF TECHNOLOGY  ◀
```

### *No secret stays hidden from technology. Learn the tech.*
### *टेक्नोलॉजी से कोई राज़ छिपा नहीं रहता। टेक्नोलॉजी सीखिए।*

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

## 💡 ABOUT THE SERIES

**COLD CODE** is an educational YouTube series, in **English** and **हिन्दी**, about how **technology uncovers the truth**.

Each episode takes a real, well-documented mystery that stayed unsolved for years, and shows the **invention or technology** that finally brought out the facts: file metadata, DNA science, radio and more.

The message is simple: **truth always leaves data, and technology knows how to read it.** So learn the technology.

> 📄 Every episode ships with a **Sources PDF**: every fact, its source and when it was checked.

---

## 📺 EPISODES

> Click a title to open its page on the website.

<!-- EPISODES:START -->
| # | Episode | Technology | Watch | Sources | Status |
|:---:|---|---|:---:|:---:|:---:|
| **01** | [**The Floppy Disk That Solved a 30-Year Mystery**](https://YOUR_GITHUB_USERNAME.github.io/coldcode/#episode-01)<br><sub>वो फ़्लॉपी डिस्क जिसने 30 साल पुराना रहस्य सुलझाया</sub> | File Metadata & DNA | [![Watch](https://img.shields.io/badge/Watch-FF0000?style=flat-square&logo=youtube&logoColor=white)](https://www.youtube.com/watch?v=4_WRsYWUSXU) | [![PDF](https://img.shields.io/badge/PDF-c4a465?style=flat-square&logo=adobeacrobatreader&logoColor=white)](episodes/EP01-the-floppy-disk-mystery/COLD-CODE-Case-01-Sources.pdf) | ![premieres](https://img.shields.io/badge/Premieres%2020%20Nov%202026-e8b04a?style=flat-square&logo=youtube&logoColor=white) |
<!-- EPISODES:END -->

<sub>⚙️ Generated from <code>data/episodes.json</code> by GitHub Actions. Don't edit the table by hand.</sub>

---

## 🔦 NOW SHOWING · Episode 01

<a href="https://www.youtube.com/watch?v=4_WRsYWUSXU"><img src="https://i.ytimg.com/vi/4_WRsYWUSXU/hqdefault.jpg" width="560" alt="COLD CODE Episode 01 — The Floppy Disk That Solved a 30-Year Mystery"></a>

**The Floppy Disk That Solved a 30-Year Mystery** · *वो फ़्लॉपी डिस्क जिसने 30 साल पुराना रहस्य सुलझाया*

A case stayed unsolved for 30 years. Then one floppy disk arrived, and a single Word file on it carried hidden **metadata**. Together with **DNA science**, that small piece of data brought out the truth.

**🧠 You'll learn:** what file metadata is · how floppy disks store files · how DNA comparison works · how to view the metadata of your own files

🗓️ Premieres **Friday 20 Nov 2026 · 7:30 PM IST** · ⏱ 11:00 · [📄 Sources](episodes/EP01-the-floppy-disk-mystery/COLD-CODE-Case-01-Sources.pdf) · [📁 Episode folder](episodes/EP01-the-floppy-disk-mystery)

---

## 🌐 SERIES WEBSITE

**→ https://YOUR_GITHUB_USERNAME.github.io/coldcode/**

A cinematic home for the show: a title-card intro, film grain, a flashlight effect on the opening screen, episode cards with polaroids, and a popup that plays the episode inside the page and lists what you'll learn. One button switches the whole site between English and हिन्दी.

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
│   └── EP01-the-floppy-disk-mystery/
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
node scripts/new-episode.mjs "radio-signal" "The Radio Signal" "रेडियो सिग्नल"
```

This creates `episodes/EP02-radio-signal/` and a new entry in `data/episodes.json`. Then:

1. Fill in the entry: titles, summary, what viewers will learn, year, place, technology, runtime, YouTube link and `release_date`. Set `"status": "released"` once the video is scheduled or public.
2. Put `COLD-CODE-Case-02-Sources.pdf` in the new folder.
3. Push:

```bash
git add . && git commit -m "episode 02: the radio signal" && git push
```

The website updates on its own. GitHub Actions rewrites the episode table in this README, and on the premiere date flips the status to **OUT NOW**.

---

## ℹ️ DISCLAIMER

COLD CODE is an **independent educational YouTube series** by Sanket Manohar Studio, made to encourage learning about science and technology. It is **not affiliated with, endorsed by, or acting for any government department, agency or organization**, or any person mentioned. Episodes are based on publicly available reports, published records and news coverage, and contain no disturbing content. Scenes are AI-illustrated dramatizations; characters are not depictions of real people. Told with respect for everyone affected by these events. Full terms: [`terms.html`](terms.html).

---

<div align="center">

```
 ┌──────────────────────────────────────────────────────────┐
 │   TRUTH ALWAYS LEAVES DATA.  TECHNOLOGY KNOWS HOW TO     │
 │   READ IT.  LEARN THE TECH.                              │
 └──────────────────────────────────────────────────────────┘
```

**▶ NEW EPISODES ON YOUTUBE · [SUBSCRIBE](https://www.youtube.com/@sanketmanoharstudio?sub_confirmation=1)**

</div>
