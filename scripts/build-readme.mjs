#!/usr/bin/env node
// Rebuilds the episode table in README.md from data/episodes.json,
// and fills in the GitHub Pages website link automatically.
// Usage: node scripts/build-readme.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const data = JSON.parse(readFileSync(join(root, "data/episodes.json"), "utf8"));
const readmePath = join(root, "README.md");
const readme = readFileSync(readmePath, "utf8");

/* owner/repo: from GitHub Actions, else from the local git remote */
function ownerRepo() {
  if (process.env.GITHUB_REPOSITORY) return process.env.GITHUB_REPOSITORY;
  try {
    const url = execSync("git config --get remote.origin.url", { cwd: root, stdio: ["ignore", "pipe", "ignore"] }).toString().trim();
    const m = url.match(/github\.com[:/]([^/]+)\/(.+?)(?:\.git)?$/);
    return m ? `${m[1]}/${m[2]}` : "";
  } catch { return ""; }
}
const or = ownerRepo();
const [owner, repo] = or ? or.split("/") : ["YOUR_GITHUB_USERNAME", "coldcode"];
const site = !or ? "https://YOUR_GITHUB_USERNAME.github.io/coldcode/" : repo.toLowerCase() === `${owner.toLowerCase()}.github.io`
  ? `https://${owner.toLowerCase()}.github.io/`
  : `https://${owner.toLowerCase()}.github.io/${repo}/`;

const pad = (n) => String(n).padStart(2, "0");
const ytId = (v) => {
  if (!v) return "";
  const m = String(v).match(/(?:youtu\.be\/|v=|embed\/|shorts\/|live\/)([\w-]{11})/);
  return m ? m[1] : (/^[\w-]{11}$/.test(v) ? v : "");
};
const badge = (label, color, logo) =>
  `https://img.shields.io/badge/${encodeURIComponent(label.replace(/-/g, "--"))}-${color}?style=flat-square${logo ? `&logo=${logo}&logoColor=white` : ""}`;
const today = new Date().toISOString().slice(0, 10);
const fmt = (iso) => {
  const d = new Date(iso + "T00:00:00Z");
  return isNaN(d) ? iso : d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
};

/* Watch: one YouTube badge when English and Hindi share a video, otherwise EN + HI */
const watch = (ep) => {
  const en = ytId(ep.youtube?.en), hi = ytId(ep.youtube?.hi);
  const b = (id, label) => `[![${label}](${badge(label, "FF0000", "youtube")})](https://www.youtube.com/watch?v=${id})`;
  if (en && hi && en !== hi) return `${b(en, "EN")} ${b(hi, "HI")}`;
  if (en || hi) return b(en || hi, "Watch");
  return "—";
};
const sources = (ep) => ep.references_pdf
  ? `[![PDF](${badge("PDF", "c4a465", "adobeacrobatreader")})](${encodeURI(ep.references_pdf)})`
  : "—";

const eps = [...data.episodes].sort((a, b) => a.number - b.number);
const rows = eps.map((ep) =>
  `| **${pad(ep.number)}** | [**${ep.title?.en ?? ""}**](${site}#episode-${pad(ep.number)})<br><sub>${ep.title?.hi ?? ""}</sub> | ${ep.technology ?? ""} | ${watch(ep)} | ${sources(ep)} |`
);
const table = [
  "| # | Episode | Technology | Watch | Sources |",
  "|:---:|---|---|:---:|:---:|",
  ...rows
].join("\n");

const START = "<!-- EPISODES:START -->", END = "<!-- EPISODES:END -->";
const re = new RegExp(`${START}[\\s\\S]*?${END}`);
if (!re.test(readme)) { console.error(`README.md is missing the ${START} / ${END} markers.`); process.exit(1); }

const out = eps.filter((e) => e.status === "released" && (!e.release_date || e.release_date <= today)).length;
const final = readme
  .replace(re, `${START}\n${table}\n${END}`)
  .replace(/https:\/\/[A-Za-z0-9_-]+\.github\.io\/(?:[A-Za-z0-9._-]+\/)?/g, site)
  .replace(/badge\/episodes-\d+-/g, `badge/episodes-${eps.length}-`)
  .replace(/badge\/out%20now-\d+-/g, `badge/out%20now-${out}-`);

if (final !== readme) { writeFileSync(readmePath, final); console.log(`README updated → ${eps.length} episode(s), ${out} out now, site ${site}`); }
else console.log("README already up to date.");
