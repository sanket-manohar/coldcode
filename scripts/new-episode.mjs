#!/usr/bin/env node
// Adds a new episode: creates the episode folder and appends an entry to data/episodes.json.
// Usage: node scripts/new-episode.mjs "short-slug" "English Title" "हिन्दी शीर्षक"
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const [slugArg, titleEn = "Untitled Episode", titleHi = ""] = process.argv.slice(2);
if (!slugArg) {
  console.log('Usage: node scripts/new-episode.mjs "short-slug" "English Title" "हिन्दी शीर्षक"');
  process.exit(1);
}

const jsonPath = join(root, "data/episodes.json");
const data = JSON.parse(readFileSync(jsonPath, "utf8"));
const number = Math.max(0, ...data.episodes.map((e) => e.number)) + 1;
const slug = `EP${String(number).padStart(2, "0")}-${slugArg.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
const dir = join(root, "episodes", slug);

if (existsSync(dir)) { console.error(`Folder already exists: episodes/${slug}`); process.exit(1); }
mkdirSync(dir, { recursive: true });
const tpl = readFileSync(join(root, "episodes/_TEMPLATE/README.md"), "utf8")
  .replaceAll("{{NUMBER}}", String(number).padStart(2, "0"))
  .replaceAll("{{TITLE_EN}}", titleEn)
  .replaceAll("{{TITLE_HI}}", titleHi);
writeFileSync(join(dir, "README.md"), tpl);

data.episodes.push({
  number, slug, status: "coming_soon", release_date: "",
  title: { en: titleEn, hi: titleHi },
  subtitle: { en: "", hi: "" },
  summary: { en: "", hi: "" },
  year: "", location: "", technology: "", duration: "",
  youtube: { en: "", hi: "" },
  poster: "",
  references_pdf: `episodes/${slug}/COLD-CODE-Case-${String(number).padStart(2, "0")}-Sources.pdf`
});
writeFileSync(jsonPath, JSON.stringify(data, null, 2) + "\n");
console.log(`Episode ${number} created → episodes/${slug}/  (fill in data/episodes.json (titles, summary, YouTube link), then put COLD-CODE-Case-${String(number).padStart(2, "0")}-Sources.pdf in the folder)`);
