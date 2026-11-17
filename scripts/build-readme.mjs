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
const yt = (v, label) => {
  const id = ytId(v);
  return id ? `[▶ ${label}](https://www.youtube.com/watch?v=${id})` : "`soon`";
};
const today = new Date().toISOString().slice(0, 10);
const fmt = (iso) => {
  const d = new Date(iso + "T00:00:00Z");
  return isNaN(d) ? iso : d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
};
const statusOf = (ep) => {
  if (ep.status !== "released") return "⏳ COMING SOON";
  if (ep.release_date && ep.release_date > today) return `🗓️ PREMIERES<br>${fmt(ep.release_date)}`;
  return "🔴 **OUT NOW**";
};

const eps = [...data.episodes].sort((a, b) => a.number - b.number);
const rows = eps.map((ep) => {
  const title = `**${ep.title?.en ?? ""}**<br><sub>${ep.title?.hi ?? ""}</sub>`;
  const refs = ep.references_pdf ? `[📄 PDF](${encodeURI(ep.references_pdf)})` : "—";
  const folder = `[📁](episodes/${ep.slug})`;
  const web = `[🎬 page](${site}#episode-${pad(ep.number)})`;
  return `| \`${pad(ep.number)}\` | ${title} | ${ep.year ?? ""} · ${ep.location ?? ""} | \`${ep.technology ?? ""}\` | ${ep.duration || "—"} | ${yt(ep.youtube?.en, "EN")} | ${yt(ep.youtube?.hi, "HI")} | ${refs} ${folder} | ${web} | ${statusOf(ep)} |`;
});
const table = [
  "| Ep | Title | When · Where | Technology | Runtime | English | हिन्दी | Sources | Website | Status |",
  "|:---:|---|---|---|:---:|:---:|:---:|:---:|:---:|:---:|",
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
