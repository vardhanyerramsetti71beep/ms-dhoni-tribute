# MS Dhoni — Captain Cool (fan tribute)

A one-page fan site about MS Dhoni: his story from Ranchi, every international match, his wins and losses as captain, his full IPL career, and official highlight clips.

**Live:** see the link in the repo's About panel.

## What's on the page

| Section | What it shows |
| --- | --- |
| Hero | Career status (international retirement 2020, IPL playing career ended 17 Nov 2026, CSK mentor from IPL 2027) and headline numbers |
| 01 · The story | Timeline from 1981 to 2026 |
| 02 · Matches played | Tests, ODIs, T20Is and IPL: matches, runs, averages, keeping |
| 03 · Wins & losses | Captaincy results by format and in the IPL, plus the three ICC trophies |
| 04 · IPL career | Career totals, an interactive runs-by-season chart (2008–2026), the five titles and the lost finals |
| 05 · Highlights | Sixes, stumpings, run-outs and captaincy clips, played with YouTube's embedded player |
| The signature moment | The IPL 2023 final, when he autographed the broadcast camera: his real (public-domain) autograph drawn onto an illustrated camera lens |
| 06 · Records & honours | Records that still stand, awards and the ICC Hall of Fame |

All figures are as of 17 November 2026. Sources are listed in the page footer.

## Built with

Plain HTML, CSS and JavaScript. No build step and no dependencies. Fonts come from Google Fonts (Anton, Inter).

- `site/index.html`: content
- `site/styles.css`: layout and theme
- `site/app.js`: win/loss bars, the season chart, the clip player, count-up numbers and scroll reveals
- `tools/serve.mjs`: tiny static server for local preview

## Run locally

```bash
node tools/serve.mjs site 5547 0.0.0.0
```

Then open http://localhost:5547. Passing `0.0.0.0` lets a phone on the same Wi-Fi open the site at your computer's LAN address.

## Media credits

- Photos are from Wikimedia Commons and are loaded from there: Adelaide Oval photo by Blnguyen (CC BY-SA 3.0); Hon. Lt. Col. ceremony (Ministry of Defence, GODL-India); Padma Bhushan ceremony (President's Secretariat, GODL-India); Prabhav '23 photo by RIGI (CC BY 3.0); MS Dhoni's autograph (public domain). The camera lens around the autograph is drawn in SVG.
- Video clips are ICC and Cricbuzz uploads, embedded from YouTube. They are not copied into this repo.

## Disclaimer

An unofficial fan project. It is not affiliated with MS Dhoni, the BCCI, Chennai Super Kings or the IPL.
