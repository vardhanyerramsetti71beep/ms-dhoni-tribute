/* MS Dhoni fan tribute — charts, counters, highlights. Figures as of 17 Nov 2026. */
(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fmt = (n) => n.toLocaleString("en-US");

  /* ---------------- Captaincy: wins & losses ---------------- */
  const CAPTAINCY = [
    { label: "Tests", sub: "Captain 2008 – 2014", m: 60, w: 27, l: 18, d: 15 },
    { label: "ODIs", sub: "Captain 2007 – 2016", m: 200, w: 110, l: 74, t: 5, nr: 11 },
    { label: "T20Is", sub: "Captain 2007 – 2016", m: 72, w: 41, l: 28, t: 1, nr: 2 },
    { label: "All internationals", sub: "India captain, all formats", m: 332, w: 178, l: 120, d: 15, t: 6, nr: 13, kind: "total" },
    { label: "IPL", sub: "Chennai & Rising Pune", m: 235, w: 136, l: 97, nr: 2, kind: "ipl" },
  ];
  const SEGMENTS = [
    ["w", "won"], ["l", "lost"], ["d", "drawn"], ["t", "tied"], ["nr", "no result"],
  ];

  const wl = document.getElementById("wl-chart");
  if (wl) {
    wl.innerHTML = CAPTAINCY.map((row) => {
      const pct = ((row.w / row.m) * 100).toFixed(1);
      const segs = SEGMENTS.filter(([k]) => row[k]).map(([k, name]) => {
        const share = row[k] / row.m;
        const narrow = share < 0.06 ? " is-narrow" : "";
        return `<span class="wl-seg wl-seg--${k}${narrow}" style="--n:${row[k]}" title="${row[k]} ${name}">${row[k]}</span>`;
      }).join("");
      const words = SEGMENTS.filter(([k]) => row[k]).map(([k, name]) => `${row[k]} ${name}`).join(" · ");
      return `
        <div class="wl-row${row.kind ? " wl-row--" + row.kind : ""}">
          <div class="wl-row__label"><b>${row.label}</b><span>${row.sub}</span></div>
          <div class="wl-bar" role="img" aria-label="${row.label}: ${words}, from ${row.m} matches">${segs}</div>
          <div class="wl-row__nums">
            <p class="wl-row__pct">${pct}<small>%</small></p>
            <p class="wl-row__of">won ${row.w} of ${fmt(row.m)}</p>
          </div>
          <p class="wl-row__break">${words}</p>
        </div>`;
    }).join("");
  }

  /* ---------------- IPL seasons ---------------- */
  const SEASONS = [
    { y: 2008, t: "CSK", m: 16, r: 414, avg: "41.40", sr: "133.54", hs: 65, note: "The first IPL. Chennai bought him for US$1.5 million, the highest price at the inaugural auction, and he took them to the final, which they lost to Rajasthan Royals." },
    { y: 2009, t: "CSK", m: 14, r: 332, avg: "41.50", sr: "127.20", hs: 58, note: "The season moved to South Africa. CSK reached the semi-finals." },
    { y: 2010, t: "CSK", m: 13, r: 287, avg: "31.88", sr: "136.66", hs: 66, title: true, note: "First IPL title: Mumbai Indians beaten by 22 runs in the final. CSK added the Champions League T20 later that year." },
    { y: 2011, t: "CSK", m: 16, r: 392, avg: "43.55", sr: "158.70", hs: 70, title: true, note: "Back-to-back champions. RCB beaten by 58 runs at Chepauk, making CSK the first side to defend the title." },
    { y: 2012, t: "CSK", m: 19, r: 358, avg: "29.83", sr: "128.77", hs: 51, note: "A fourth final, lost to Kolkata Knight Riders at home in Chennai." },
    { y: 2013, t: "CSK", m: 18, r: 461, avg: "41.90", sr: "162.89", hs: 67, note: "His best season with the bat: 461 runs at a strike rate of 162.89. Mumbai Indians won the final." },
    { y: 2014, t: "CSK", m: 16, r: 371, avg: "74.20", sr: "148.40", hs: 57, note: "Averaged 74.20. CSK went out in Qualifier 2 to Kings XI Punjab, then won the Champions League T20." },
    { y: 2015, t: "CSK", m: 17, r: 372, avg: "31.00", sr: "121.96", hs: 53, note: "A sixth final in eight seasons. Mumbai Indians won it at Eden Gardens." },
    { y: 2016, t: "RPS", m: 14, r: 284, avg: "40.57", sr: "135.23", hs: 64, note: "With CSK suspended for two seasons, he captained the new Rising Pune Supergiant. They finished seventh." },
    { y: 2017, t: "RPS", m: 16, r: 290, avg: "26.36", sr: "116.00", hs: 61, note: "Played under Steve Smith. Pune reached the final and lost to Mumbai Indians by one run." },
    { y: 2018, t: "CSK", m: 16, r: 455, avg: "75.83", sr: "150.66", hs: 79, title: true, note: "CSK came back from the ban and won the title straight away. He made 455 runs at an average of 75.83." },
    { y: 2019, t: "CSK", m: 15, r: 416, avg: "83.20", sr: "134.62", hs: 84, note: "84 not out off 48 balls against RCB in Bengaluru, his highest IPL score. CSK lost the final to Mumbai by one run." },
    { y: 2020, t: "CSK", m: 14, r: 200, avg: "25.00", sr: "116.27", hs: 47, note: "Played in the UAE. CSK missed the playoffs for the first time." },
    { y: 2021, t: "CSK", m: 16, r: 114, avg: "16.28", sr: "106.54", hs: 18, title: true, note: "Fourth title. KKR beaten by 27 runs in the Dubai final." },
    { y: 2022, t: "CSK", m: 14, r: 232, avg: "33.14", sr: "123.40", hs: 50, note: "Handed the captaincy to Ravindra Jadeja before the season, then took it back halfway through." },
    { y: 2023, t: "CSK", m: 16, r: 104, avg: "26.00", sr: "182.46", hs: 32, title: true, note: "Fifth title, won on the reserve day in Ahmedabad, after which he walked up to a broadcast camera and signed his autograph on it. He played the whole season on an injured knee." },
    { y: 2024, t: "CSK", m: 14, r: 161, avg: "53.67", sr: "220.55", hs: 37, note: "Gave the captaincy to Ruturaj Gaikwad and batted at the death, striking at 220.55." },
    { y: 2025, t: "CSK", m: 14, r: 196, avg: "24.50", sr: "135.17", hs: 30, note: "Took the captaincy back at 43 after Gaikwad fractured his elbow. CSK finished last." },
    { y: 2026, t: "DNP", dnp: true, note: "Missed the entire season with a thumb injury, the first IPL ever played without him. On 17 November 2026 he ended his IPL playing career and was named CSK mentor from 2027." },
  ];
  const TEAM_NAME = { CSK: "Chennai Super Kings", RPS: "Rising Pune Supergiant", DNP: "Did not play" };
  const MAX_RUNS = 500;

  const plot = document.getElementById("season-chart");
  const labels = document.getElementById("season-labels");
  const detail = document.getElementById("season-detail");

  const renderDetail = (s) => {
    const teamClass = s.dnp ? " detail__team--dnp" : s.t === "RPS" ? " detail__team--rps" : "";
    const champ = s.title ? `<span class="detail__champ">Champions</span>` : "";
    const nums = s.dnp ? "" : `
      <dl class="detail__nums">
        <div><dt>Matches</dt><dd>${s.m}</dd></div>
        <div><dt>Runs</dt><dd>${s.r}</dd></div>
        <div><dt>Average</dt><dd>${s.avg}</dd></div>
        <div><dt>Strike rate</dt><dd>${s.sr}</dd></div>
        <div><dt>Top score</dt><dd>${s.hs}</dd></div>
      </dl>`;
    detail.innerHTML = `
      <div class="detail__head">
        <p class="detail__year">${s.y}</p>
        <div class="detail__tags"><span class="detail__team${teamClass}">${TEAM_NAME[s.t]}</span>${champ}</div>
      </div>
      <div>
        <p class="detail__note">${s.note}</p>
        ${nums}
      </div>`;
  };

  if (plot && labels && detail) {
    let selected = null;
    const select = (i, btn) => {
      if (selected) selected.setAttribute("aria-pressed", "false");
      labels.querySelector(".is-on")?.classList.remove("is-on");
      btn.setAttribute("aria-pressed", "true");
      labels.children[i].classList.add("is-on");
      selected = btn;
      renderDetail(SEASONS[i]);
    };

    SEASONS.forEach((s, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "bar " + (s.dnp ? "bar--dnp" : s.t === "RPS" ? "bar--rps" : "bar--csk");
      btn.style.setProperty("--h", s.dnp ? "100%" : `${(s.r / MAX_RUNS) * 100}%`);
      btn.setAttribute("aria-pressed", "false");
      btn.setAttribute("aria-label", s.dnp
        ? `${s.y}: did not play`
        : `${s.y}, ${TEAM_NAME[s.t]}: ${s.r} runs in ${s.m} matches`);
      btn.innerHTML = `<span class="bar__val">${s.dnp ? "DNP" : s.r}</span>`;
      btn.addEventListener("click", () => select(i, btn));
      btn.addEventListener("mouseenter", () => select(i, btn));
      btn.addEventListener("focus", () => select(i, btn));
      plot.appendChild(btn);

      const lab = document.createElement("span");
      lab.textContent = "’" + String(s.y).slice(2);
      labels.appendChild(lab);
    });

    const start = SEASONS.findIndex((s) => s.y === 2018);
    select(start, plot.children[start]);
  }

  /* ---------------- Highlights ---------------- */
  // Every id checked with YouTube oEmbed on 17 Nov 2026: exists and allows embedding.
  const HIGHLIGHTS = [
    { id: "R0alThHNb0Y", cat: "sixes", channel: "ICC", tag: "Six · 2011 World Cup final",
      title: "Dhoni finishes off in style",
      desc: "Wankhede, 2 April 2011. Four needed, and he hits Nuwan Kulasekara into the stands to win India the World Cup." },
    { id: "stFBehSVxKw", cat: "sixes", channel: "ICC", tag: "Sixes · compilation",
      title: "MS Dhoni sixes: a 360-degree view",
      desc: "His big hits for India, sent to every part of the ground." },
    { id: "Mq3K4bD1zJ0", cat: "keeping", channel: "ICC", tag: "Stumpings",
      title: "The quickest hands in the east",
      desc: "A run of his fastest stumpings, the work behind a world-record 195 in international cricket." },
    { id: "FSfgoIfqy8w", cat: "keeping", channel: "ICC", tag: "Wickets · T20 World Cup",
      title: "Every Dhoni dismissal at the T20 World Cup",
      desc: "Every catch, stumping and run-out he made behind the stumps at T20 World Cups." },
    { id: "PEUuSm7gHHk", cat: "fielding", channel: "ICC", tag: "Run-out · 2016 World T20",
      title: "Dhoni breaks Bangladesh hearts",
      desc: "Bengaluru, 23 March 2016. Two needed off the last ball, and he sprints from behind the stumps to run out Mustafizur Rahman." },
    { id: "ha6fDklARyc", cat: "fielding", channel: "ICC", tag: "Final over · 2016 World T20",
      title: "Final over thriller: India v Bangladesh",
      desc: "The whole last over: three wickets in the last three balls and India home by one run." },
    { id: "hUNAtr-xgyo", cat: "captain", channel: "ICC", tag: "Captaincy",
      title: "MS Dhoni: a tactical mastermind",
      desc: "How he read games, set fields and changed bowlers as India captain." },
    { id: "4U-Fl8UyYug", cat: "captain", channel: "Cricbuzz", tag: "News · November 2026",
      title: "Dhoni retires from the IPL",
      desc: "Cricbuzz on the end of his IPL playing days ahead of IPL 2027." },
  ];
  const grid = document.getElementById("clips");
  const filters = document.getElementById("clip-filters");

  if (grid && HIGHLIGHTS.length) {
    grid.innerHTML = HIGHLIGHTS.map((c) => `
      <article class="clip" data-cat="${c.cat}">
        <div class="clip__media">
          <button type="button" class="clip__play" data-id="${c.id}" data-start="${c.start || 0}"
            aria-label="Play: ${c.title}">
            <img loading="lazy" src="https://i.ytimg.com/vi/${c.id}/hqdefault.jpg" alt="" width="480" height="360">
            <span class="clip__icon" aria-hidden="true"></span>
          </button>
        </div>
        <div class="clip__body">
          <p class="clip__tag">${c.tag}</p>
          <h3 class="clip__title">${c.title}</h3>
          <p class="clip__desc">${c.desc}</p>
          <p class="clip__src">${c.channel} · <a href="https://www.youtube.com/watch?v=${c.id}" target="_blank" rel="noopener">Watch on YouTube</a></p>
        </div>
      </article>`).join("");

    grid.addEventListener("click", (e) => {
      const btn = e.target.closest(".clip__play");
      if (!btn) return;
      // stop any clip already playing
      grid.querySelectorAll("iframe").forEach((f) => {
        const b = f.closest(".clip__media").dataset;
        f.replaceWith(Object.assign(document.createElement("div"), { innerHTML: b.html }).firstElementChild);
      });
      const media = btn.closest(".clip__media");
      media.dataset.html = btn.outerHTML;
      const frame = document.createElement("iframe");
      const start = btn.dataset.start > 0 ? `&start=${btn.dataset.start}` : "";
      frame.src = `https://www.youtube-nocookie.com/embed/${btn.dataset.id}?autoplay=1&rel=0&playsinline=1${start}`;
      frame.title = btn.getAttribute("aria-label").replace("Play: ", "");
      frame.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
      frame.allowFullscreen = true;
      frame.referrerPolicy = "strict-origin-when-cross-origin";
      btn.replaceWith(frame);
    });

    filters?.addEventListener("click", (e) => {
      const chip = e.target.closest("button[data-filter]");
      if (!chip) return;
      filters.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", String(b === chip)));
      const f = chip.dataset.filter;
      grid.querySelectorAll(".clip").forEach((card) => {
        card.hidden = f !== "all" && card.dataset.cat !== f;
      });
    });
  }

  /* ---------------- Hero jersey: India | CSK split follows the pointer ---------------- */
  const jersey = document.getElementById("jersey");
  if (jersey) {
    const hero = document.getElementById("top");
    const svg = jersey.querySelector(".jersey__svg");
    const leftRect = document.getElementById("j-left-rect");
    const rightRect = document.getElementById("j-right-rect");
    const split = document.getElementById("j-split");
    const labInd = document.getElementById("j-lab-ind");
    const labCsk = document.getElementById("j-lab-csk");
    const canvas = document.getElementById("jersey-lines");
    const ctx = canvas.getContext("2d");

    let target = { x: 0.5, y: 0.5 }, cur = { x: 0.5, y: 0.5 };
    let lastMove = -1e9, visible = true, raf = 0, lines = [];

    const paintSplit = (p, py) => {
      const x = Math.max(0, Math.min(400, p * 400));
      leftRect.setAttribute("width", x);
      rightRect.setAttribute("x", x);
      rightRect.setAttribute("width", 400 - x);
      split.setAttribute("x1", x);
      split.setAttribute("x2", x);
      split.style.opacity = x <= 1 || x >= 399 ? 0 : 1;
      labInd.style.setProperty("--o", (0.35 + 0.65 * p).toFixed(2));
      labCsk.style.setProperty("--o", (0.35 + 0.65 * (1 - p)).toFixed(2));
      if (!reduceMotion) {
        svg.style.setProperty("--ry", `${((p - 0.5) * 18).toFixed(2)}deg`);
        svg.style.setProperty("--rx", `${((0.5 - py) * 10).toFixed(2)}deg`);
      }
    };

    const sizeCanvas = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(r.width * dpr);
      canvas.height = Math.round(r.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const colors = ["#2d6fe6", "#ff9933", "#f6c700", "#f6c700", "#ffffff"];
      lines = Array.from({ length: 64 }, () => ({
        x: Math.random() * r.width, y: Math.random() * r.height,
        len: 24 + Math.random() * 70, speed: 1.5 + Math.random() * 4,
        a: 0.12 + Math.random() * 0.35, w: 0.6 + Math.random() * 1.3,
        c: colors[(Math.random() * colors.length) | 0],
      }));
    };

    const drawLines = () => {
      const w = canvas.width / Math.min(window.devicePixelRatio || 1, 2);
      const h = canvas.height / Math.min(window.devicePixelRatio || 1, 2);
      ctx.clearRect(0, 0, w, h);
      const dy = (cur.y - 0.5) * 18;
      for (const l of lines) {
        l.x -= l.speed * (0.6 + Math.abs(cur.x - 0.5) * 1.6);
        if (l.x + l.len < 0) { l.x = w + Math.random() * 60; l.y = Math.random() * h; }
        ctx.globalAlpha = l.a;
        ctx.strokeStyle = l.c;
        ctx.lineWidth = l.w;
        ctx.beginPath();
        ctx.moveTo(l.x, l.y + dy);
        ctx.lineTo(l.x + l.len, l.y + dy);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };

    const tick = (t) => {
      raf = 0;
      if (!visible) return;
      if (t - lastMove > 2500) {
        // idle: sweep slowly between the two shirts (also what phones see until touched)
        target.x = 0.5 + 0.42 * Math.sin(t / 1600);
        target.y = 0.5 + 0.12 * Math.sin(t / 2300);
      }
      cur.x += (target.x - cur.x) * 0.12;
      cur.y += (target.y - cur.y) * 0.12;
      paintSplit(cur.x, cur.y);
      drawLines();
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e) => {
      const r = hero.getBoundingClientRect();
      if (e.clientY < r.top || e.clientY > r.bottom) return;
      target.x = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
      target.y = Math.max(0, Math.min(1, (e.clientY - r.top) / r.height));
      lastMove = performance.now();
      if (reduceMotion) { cur.x = target.x; cur.y = target.y; paintSplit(cur.x, cur.y); }
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    if (reduceMotion) {
      paintSplit(0.5, 0.5);
    } else {
      sizeCanvas();
      window.addEventListener("resize", sizeCanvas);
      if ("IntersectionObserver" in window) {
        new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting;
          if (visible && !raf) raf = requestAnimationFrame(tick);
        }).observe(hero);
      }
      document.addEventListener("visibilitychange", () => {
        visible = !document.hidden;
        if (visible && !raf) raf = requestAnimationFrame(tick);
      });
      raf = requestAnimationFrame(tick);
    }
  }

  /* ---------------- Count-up numbers ---------------- */
  const countUp = (el) => {
    const target = Number(el.dataset.count);
    if (reduceMotion || !target) return;
    const dur = Math.min(1600, 500 + target / 4);
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    el.textContent = "0";
    requestAnimationFrame(tick);
  };

  /* ---------------- Reveal on scroll ---------------- */
  const io = "IntersectionObserver" in window ? new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      el.classList.add("in");
      el.querySelectorAll("[data-count]").forEach(countUp);
      if (el.matches("[data-count]")) countUp(el);
      el.querySelectorAll(".chart, .wl").forEach((c) => c.classList.add("in"));
      io.unobserve(el);
    });
  }, { threshold: 0.18, rootMargin: "0px 0px -40px 0px" }) : null;

  const targets = document.querySelectorAll(".reveal, .ticker");
  if (io) targets.forEach((el) => io.observe(el));
  else targets.forEach((el) => el.classList.add("in"));

  /* ---------------- Active section in nav ---------------- */
  const links = [...document.querySelectorAll(".nav__links a")];
  const byId = new Map(links.map((a) => [a.getAttribute("href").slice(1), a]));
  if ("IntersectionObserver" in window) {
    const navIo = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((a) => a.classList.remove("is-active"));
        const a = byId.get(entry.target.id);
        if (a) {
          a.classList.add("is-active");
          const list = a.closest(".nav__links");
          if (list.scrollWidth > list.clientWidth) {
            list.scrollTo({ left: a.parentElement.offsetLeft - 8, behavior: reduceMotion ? "auto" : "smooth" });
          }
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    document.querySelectorAll("main section[id]").forEach((s) => navIo.observe(s));
  }
})();
