/**
 * 王者荣耀 · 英雄殿堂与开黑实验室核心业务引擎 (app.js)
 * 纯原生 ES6+，无外部依赖，包含：
 * 1. 本命英雄灵魂共鸣心理测评引擎与报告生成
 * 2. 战术分路与上分英雄诊断引擎
 * 3. 30位英雄多维分类检索、搜索与详尽技能背景弹窗
 * 4. 经典开黑搭档与羁绊CP矩阵
 * 5. 专属排位开黑动力学生成器 (巅峰双排/情侣连体/野辅联动/保核推塔/搞事黑科技)
 * 6. 英雄克制对决天平
 * 7. 原生 Web Audio API 金石战鸣音效
 * 8. HTML5 Canvas 高清本命英雄认证卡片导出
 */

class WangzheApp {
  constructor() {
    this.soundEnabled = localStorage.getItem("wz_sound_enabled") !== "false";
    this.theme = localStorage.getItem("wz_theme") || "dark";
    this.activeTab = "home";

    // 本命英雄测评状态
    this.smState = {
      currentIndex: 0,
      answers: {}, // qId -> optionIndex
      result: null
    };

    // 战术分路诊断状态
    this.tacState = {
      currentIndex: 0,
      answers: {},
      result: null
    };

    // 资料库过滤状态
    this.codexState = {
      role: "ALL",
      lane: "ALL",
      searchQuery: ""
    };

    // 开黑生成器状态
    this.generatorState = {
      h1: "sunshangxiang",
      h2: "taiyizhenren",
      scenario: "ranked"
    };

    // 对抗天平状态
    this.vsState = {
      h1: "libai",
      h2: "kai"
    };

    this.audioCtx = null;
  }

  init() {
    this.applyTheme(this.theme);
    this.updateSoundIcon();
    this.loadSavedSoulmate();
    this.renderCodex();
    this.renderSynergyMatrix("ALL");
    this.setupGeneratorSelectors();
    this.setupVsSelectors();
    this.generateHeroDuoReport(); // 默认先展示真香组合

    // 路由响应
    const hash = window.location.hash.replace("#sec-", "").replace("#", "");
    if (hash && ["soulmate", "tactical", "codex", "synergy", "generator", "comparator"].includes(hash)) {
      this.switchTab(hash);
    }
  }

  /* ==================== 音效引擎 (Web Audio API) ==================== */
  initAudio() {
    if (!this.audioCtx && typeof AudioContext !== "undefined") {
      this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  playSound(type = "click") {
    if (!this.soundEnabled) return;
    try {
      this.initAudio();
      if (!this.audioCtx) return;
      if (this.audioCtx.state === "suspended") {
        this.audioCtx.resume();
      }

      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      if (type === "click") {
        // 清脆剑鸣金石音
        osc.type = "triangle";
        osc.frequency.setValueAtTime(660, now);
        osc.frequency.exponentialRampToValueAtTime(1100, now + 0.08);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === "select") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === "triumph") {
        // 胜利号角与战鼓和弦
        const notes = [440, 554.37, 659.25, 880]; // A4, C#5, E5, A5
        notes.forEach((freq, idx) => {
          const o = this.audioCtx.createOscillator();
          const g = this.audioCtx.createGain();
          o.connect(g);
          g.connect(this.audioCtx.destination);
          o.type = "sawtooth";
          o.frequency.setValueAtTime(freq, now + idx * 0.09);
          g.gain.setValueAtTime(0.1, now + idx * 0.09);
          g.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.4);
          o.start(now + idx * 0.09);
          o.stop(now + idx * 0.09 + 0.4);
        });
      }
    } catch (e) {
      console.warn("Audio error:", e);
    }
  }

  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    localStorage.setItem("wz_sound_enabled", this.soundEnabled);
    this.updateSoundIcon();
    this.showToast(this.soundEnabled ? "🔊 金石战鸣音效已开启" : "🔇 战鸣音效已静音");
    if (this.soundEnabled) this.playSound("click");
  }

  updateSoundIcon() {
    const icon = document.getElementById("soundIcon");
    if (icon) {
      icon.textContent = this.soundEnabled ? "🔔" : "🔕";
    }
  }

  /* ==================== 导航与主题 ==================== */
  toggleTheme() {
    this.theme = this.theme === "dark" ? "light" : "dark";
    localStorage.setItem("wz_theme", this.theme);
    this.applyTheme(this.theme);
    this.playSound("click");
  }

  applyTheme(theme) {
    document.body.className = theme === "dark" ? "theme-dark" : "theme-light";
    const icon = document.getElementById("themeIcon");
    if (icon) {
      icon.textContent = theme === "dark" ? "🌙" : "☀️";
    }
  }

  switchTab(tabId) {
    this.playSound("click");
    this.activeTab = tabId;

    document.querySelectorAll(".nav-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.tab === tabId);
    });

    document.querySelectorAll(".section-container").forEach(sec => {
      sec.classList.remove("active");
    });

    const targetSec = document.getElementById(`sec-${tabId}`);
    if (targetSec) {
      targetSec.classList.add("active");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  showToast(msg) {
    const toast = document.getElementById("toastNotification");
    const msgEl = document.getElementById("toastMessage");
    if (toast && msgEl) {
      msgEl.textContent = msg;
      toast.classList.add("show");
      clearTimeout(this.toastTimer);
      this.toastTimer = setTimeout(() => {
        toast.classList.remove("show");
      }, 2400);
    }
  }

  /* ==================== 1. 本命英雄灵魂共鸣测评 ==================== */
  startSoulmateTest() {
    this.playSound("select");
    this.smState.currentIndex = 0;
    this.smState.answers = {};

    document.getElementById("soulmateIntroBox").classList.add("hidden");
    document.getElementById("soulmateResultBox").classList.add("hidden");
    document.getElementById("soulmateRunnerBox").classList.remove("hidden");

    this.renderCurrentSoulmateQ();
  }

  renderCurrentSoulmateQ() {
    const qList = WANGZHE_DATA.soulmateQuestions;
    const q = qList[this.smState.currentIndex];
    if (!q) return;

    const total = qList.length;
    const cur = this.smState.currentIndex + 1;

    document.getElementById("smProgressCounter").textContent = `第 ${cur} / ${total} 题`;
    document.getElementById("smProgressBarFill").style.width = `${Math.round((cur / total) * 100)}%`;
    document.getElementById("smTitle").textContent = q.title;
    document.getElementById("smDesc").textContent = q.desc;

    const optContainer = document.getElementById("smOptionsList");
    optContainer.innerHTML = "";

    const selectedOptIdx = this.smState.answers[q.id];

    q.options.forEach((opt, idx) => {
      const item = document.createElement("div");
      item.className = "sm-option-item";
      if (selectedOptIdx === idx) item.classList.add("selected");

      item.onclick = () => {
        this.selectSoulmateOption(q.id, idx);
      };

      item.innerHTML = `
        <div class="option-radio"></div>
        <div class="option-text">${opt.label}</div>
      `;
      optContainer.appendChild(item);
    });

    const prevBtn = document.getElementById("smPrevBtn");
    prevBtn.disabled = this.smState.currentIndex === 0;
    prevBtn.style.opacity = this.smState.currentIndex === 0 ? "0.4" : "1";

    const nextBtn = document.getElementById("smNextBtn");
    if (this.smState.currentIndex === total - 1) {
      nextBtn.textContent = "✨ 揭晓我的本命英雄";
    } else {
      nextBtn.textContent = "下一题 →";
    }
  }

  selectSoulmateOption(qId, optIdx) {
    this.playSound("click");
    this.smState.answers[qId] = optIdx;

    document.querySelectorAll("#smOptionsList .sm-option-item").forEach((el, i) => {
      el.classList.toggle("selected", i === optIdx);
    });

    setTimeout(() => {
      if (this.smState.currentIndex < WANGZHE_DATA.soulmateQuestions.length - 1) {
        this.nextSoulmateQ();
      } else {
        this.finishSoulmateTest();
      }
    }, 220);
  }

  prevSoulmateQ() {
    if (this.smState.currentIndex > 0) {
      this.playSound("click");
      this.smState.currentIndex--;
      this.renderCurrentSoulmateQ();
    }
  }

  nextSoulmateQ() {
    const q = WANGZHE_DATA.soulmateQuestions[this.smState.currentIndex];
    if (this.smState.answers[q.id] === undefined) {
      this.showToast("请先选择符合您想法的选项！");
      return;
    }

    if (this.smState.currentIndex < WANGZHE_DATA.soulmateQuestions.length - 1) {
      this.playSound("click");
      this.smState.currentIndex++;
      this.renderCurrentSoulmateQ();
    } else {
      this.finishSoulmateTest();
    }
  }

  confirmResetSoulmate() {
    if (confirm("确定要放弃当前测评并重新选择吗？")) {
      document.getElementById("soulmateRunnerBox").classList.add("hidden");
      document.getElementById("soulmateIntroBox").classList.remove("hidden");
    }
  }

  finishSoulmateTest() {
    this.playSound("triumph");
    const qList = WANGZHE_DATA.soulmateQuestions;

    // 统计各英雄契合度频次
    const heroCounts = {};
    Object.keys(WANGZHE_DATA.heroes).forEach(h => { heroCounts[h] = 0; });

    qList.forEach(q => {
      const chosenIdx = this.smState.answers[q.id];
      if (chosenIdx !== undefined) {
        const opt = q.options[chosenIdx];
        opt.heroes.forEach(hId => {
          if (heroCounts[hId] !== undefined) {
            heroCounts[hId] += 3;
          }
        });
      }
    });

    // 寻找最高分英雄
    let topHeroId = "libai";
    let maxPts = -1;
    Object.keys(heroCounts).forEach(hId => {
      if (heroCounts[hId] > maxPts) {
        maxPts = heroCounts[hId];
        topHeroId = hId;
      }
    });

    const hero = WANGZHE_DATA.heroes[topHeroId];
    const affinityScore = Math.min(99, 88 + Math.round((maxPts / (qList.length * 3)) * 11));

    const result = {
      heroId: topHeroId,
      hero,
      affinityScore,
      date: new Date().toLocaleDateString("zh-CN")
    };

    this.smState.result = result;
    localStorage.setItem("wz_user_soulmate", JSON.stringify(result));

    document.getElementById("soulmateRunnerBox").classList.add("hidden");
    document.getElementById("soulmateResultBox").classList.remove("hidden");

    this.renderSoulmateResult(result);
    this.updateUserHeroBadge(hero.name);
    this.showToast(`🎉 测算完成！你的本命英雄是：【${hero.title} · ${hero.name}】！`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  renderSoulmateResult(result) {
    const h = result.hero;
    const box = document.getElementById("soulmateResultBox");
    if (!box || !h) return;

    const roleInfo = WANGZHE_DATA.roles[h.role];
    const laneInfo = WANGZHE_DATA.lanes[h.lane];

    box.innerHTML = `
      <div class="result-hero" style="border-top: 4px solid ${h.color};">
        <div class="hero-badge" style="background: ${h.color}; color: #000;">
          ${roleInfo.name} · ${laneInfo.name} (${laneInfo.alias})
        </div>
        <div class="result-hero-name" style="color: ${h.color};">${h.name}</div>
        <div class="result-hero-title">${h.title}</div>
        <div class="result-archetype">灵魂原型：${h.archetype}</div>
        <div class="result-score-badge">灵魂共鸣契合度：${result.affinityScore}%</div>
        <div class="result-quote-box">
          "${h.quote}"
        </div>
      </div>

      <div class="result-cards-grid">
        <div class="info-card">
          <div class="card-title" style="color: #facc15;">
            <span class="card-icon">🔮</span> 为什么【${h.name}】是你的本命战神？
          </div>
          <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.8; margin-bottom: 1rem;">
            在灵魂深处，你与${h.name}共享着相同的处事底色：面对困境你往往展现出【${h.personalityTraits.join("、")}】的精神品格。你不是盲从世俗的随波逐流者，正如${h.name}在王者大陆上的抉择一样，拥有属于自己的骄傲与守护！
          </p>
          <div class="bullet-item">
            <div class="bullet-title">✦ 精神共鸣标签：</div>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 0.4rem;">
              ${h.personalityTraits.map(t => `<span class="h-tag" style="background: rgba(234, 179, 8, 0.15); color: #facc15;">#${t}</span>`).join('')}
            </div>
          </div>
        </div>

        <div class="info-card">
          <div class="card-title" style="color: #38bdf8;">
            <span class="card-icon">📜</span> 英雄编年史传奇印记
          </div>
          <p style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.8;">
            ${h.background}
          </p>
        </div>

        <div class="info-card">
          <div class="card-title" style="color: #4ade80;">
            <span class="card-icon">⚔️</span> 绝活核心机巧与实战技巧
          </div>
          <div class="bullet-item">
            <div class="bullet-title">✦ 核心连招心得：</div>
            <div class="bullet-desc">${h.playstyle.coreTip}</div>
          </div>
          <div class="bullet-item">
            <div class="bullet-title">✦ 最大作战优势：</div>
            <div class="bullet-desc">${h.playstyle.strengths}</div>
          </div>
        </div>

        <div class="info-card">
          <div class="card-title" style="color: #ec4899;">
            <span class="card-icon">🤝</span> 峡谷天作之合与开黑搭档
          </div>
          <p style="font-size: 0.9rem; margin-bottom: 0.5rem;"><strong>最佳双排搭档：</strong>${h.matchups.bestPartners.join("、")}</p>
          <p style="font-size: 0.9rem; margin-bottom: 0.5rem;"><strong>极度克制英雄：</strong>${h.matchups.counters.join("、")}</p>
          <p style="font-size: 0.9rem;"><strong>需格外提防克星：</strong>${h.matchups.counteredBy.join("、")}</p>
        </div>
      </div>

      <div class="result-actions-bar">
        <button class="btn btn-primary btn-large glow-btn" onclick="app.openShareModal()">
          🖼️ 保存本命英雄神殿认证长图
        </button>
        <button class="btn btn-secondary btn-large" onclick="app.jumpToGeneratorWithHero('${h.id}')">
          🔮 测算与队友的开黑契合度
        </button>
        <button class="btn btn-glass btn-large" onclick="app.openHeroModal('${h.id}')">
          📖 查看【${h.name}】完整技能背景档案
        </button>
        <button class="btn btn-ghost" onclick="app.startSoulmateTest()">
          🔄 重新测评
        </button>
      </div>
    `;
  }

  loadSavedSoulmate() {
    const saved = localStorage.getItem("wz_user_soulmate");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        this.smState.result = data;
        this.updateUserHeroBadge(data.hero.name);
        const alertEl = document.getElementById("prevSoulmateAlert");
        const nameEl = document.getElementById("prevSoulmateHeroName");
        if (alertEl && nameEl) {
          nameEl.textContent = `${data.hero.title} · ${data.hero.name}`;
          alertEl.classList.remove("hidden");
        }
      } catch (e) {
        console.warn(e);
      }
    }
  }

  showSavedSoulmate() {
    if (this.smState.result) {
      this.switchTab("soulmate");
      document.getElementById("soulmateIntroBox").classList.add("hidden");
      document.getElementById("soulmateRunnerBox").classList.add("hidden");
      document.getElementById("soulmateResultBox").classList.remove("hidden");
      this.renderSoulmateResult(this.smState.result);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  updateUserHeroBadge(name) {
    const badge = document.getElementById("userHeroBadge");
    const txt = document.getElementById("userHeroText");
    if (badge && txt) {
      txt.textContent = name;
      badge.classList.remove("hidden");
    }
  }

  /* ==================== 2. 天命分路与战术打法诊断 ==================== */
  startTacticalTest() {
    this.playSound("select");
    this.tacState.currentIndex = 0;
    this.tacState.answers = {};

    document.getElementById("tacticalIntroBox").classList.add("hidden");
    document.getElementById("tacticalResultBox").classList.add("hidden");
    document.getElementById("tacticalRunnerBox").classList.remove("hidden");

    this.renderCurrentTacticalQ();
  }

  renderCurrentTacticalQ() {
    const qList = WANGZHE_DATA.tacticalQuestions;
    const q = qList[this.tacState.currentIndex];
    if (!q) return;

    const total = qList.length;
    const cur = this.tacState.currentIndex + 1;

    document.getElementById("tacProgressCounter").textContent = `第 ${cur} / ${total} 题`;
    document.getElementById("tacProgressBarFill").style.width = `${Math.round((cur / total) * 100)}%`;
    document.getElementById("tacTitle").textContent = q.title;
    document.getElementById("tacDesc").textContent = q.desc;

    const optContainer = document.getElementById("tacOptionsList");
    optContainer.innerHTML = "";

    const selectedOptIdx = this.tacState.answers[q.id];

    q.options.forEach((opt, idx) => {
      const item = document.createElement("div");
      item.className = "sm-option-item";
      if (selectedOptIdx === idx) item.classList.add("selected");

      item.onclick = () => {
        this.selectTacticalOption(q.id, idx);
      };

      item.innerHTML = `
        <div class="option-radio"></div>
        <div class="option-text">${opt.label}</div>
      `;
      optContainer.appendChild(item);
    });

    const prevBtn = document.getElementById("tacPrevBtn");
    prevBtn.disabled = this.tacState.currentIndex === 0;
    prevBtn.style.opacity = this.tacState.currentIndex === 0 ? "0.4" : "1";

    const nextBtn = document.getElementById("tacNextBtn");
    if (this.tacState.currentIndex === total - 1) {
      nextBtn.textContent = "🧭 揭晓我的天命分路与英雄池";
    } else {
      nextBtn.textContent = "下一题 →";
    }
  }

  selectTacticalOption(qId, optIdx) {
    this.playSound("click");
    this.tacState.answers[qId] = optIdx;

    document.querySelectorAll("#tacOptionsList .sm-option-item").forEach((el, i) => {
      el.classList.toggle("selected", i === optIdx);
    });

    setTimeout(() => {
      if (this.tacState.currentIndex < WANGZHE_DATA.tacticalQuestions.length - 1) {
        this.nextTacticalQ();
      } else {
        this.finishTacticalTest();
      }
    }, 220);
  }

  prevTacticalQ() {
    if (this.tacState.currentIndex > 0) {
      this.playSound("click");
      this.tacState.currentIndex--;
      this.renderCurrentTacticalQ();
    }
  }

  nextTacticalQ() {
    const q = WANGZHE_DATA.tacticalQuestions[this.tacState.currentIndex];
    if (this.tacState.answers[q.id] === undefined) {
      this.showToast("请先选择一项符合您战术习惯的选项！");
      return;
    }

    if (this.tacState.currentIndex < WANGZHE_DATA.tacticalQuestions.length - 1) {
      this.playSound("click");
      this.tacState.currentIndex++;
      this.renderCurrentTacticalQ();
    } else {
      this.finishTacticalTest();
    }
  }

  confirmResetTactical() {
    if (confirm("确定要重新开始分路诊断吗？")) {
      document.getElementById("tacticalRunnerBox").classList.add("hidden");
      document.getElementById("tacticalIntroBox").classList.remove("hidden");
    }
  }

  finishTacticalTest() {
    this.playSound("triumph");
    const laneScores = { clash: 0, jungle: 0, mid: 0, farm: 0, roam: 0 };

    WANGZHE_DATA.tacticalQuestions.forEach(q => {
      const ansIdx = this.tacState.answers[q.id];
      if (ansIdx !== undefined) {
        const opt = q.options[ansIdx];
        if (opt.score) {
          Object.keys(opt.score).forEach(l => {
            if (laneScores[l] !== undefined) laneScores[l] += opt.score[l];
          });
        }
      }
    });

    // 排序得出最高分路
    const sortedLanes = Object.keys(laneScores).sort((a, b) => laneScores[b] - laneScores[a]);
    const topLaneCode = sortedLanes[0];
    const subLaneCode = sortedLanes[1];

    const topLane = WANGZHE_DATA.lanes[topLaneCode];
    const subLane = WANGZHE_DATA.lanes[subLaneCode];

    // 挑选该分路推荐英雄
    const recommendedHeroes = Object.values(WANGZHE_DATA.heroes).filter(h => h.lane === topLaneCode).slice(0, 3);

    const result = {
      topLane,
      subLane,
      laneScores,
      recommendedHeroes
    };

    this.tacState.result = result;
    document.getElementById("tacticalRunnerBox").classList.add("hidden");
    document.getElementById("tacticalResultBox").classList.remove("hidden");

    this.renderTacticalResult(result);
    this.showToast(`🎯 诊断完成！您的天命上分位置是：【${topLane.name}】！`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  renderTacticalResult(result) {
    const { topLane, subLane, recommendedHeroes } = result;
    const box = document.getElementById("tacticalResultBox");
    if (!box) return;

    box.innerHTML = `
      <div class="result-hero" style="border-top: 4px solid #38bdf8;">
        <span class="hero-badge" style="background: linear-gradient(135deg, #0284c7, #38bdf8); color: #fff;">
          天命排位战术分路诊断
        </span>
        <div class="result-hero-name" style="font-size: 3.2rem; margin: 0.5rem 0;">
          ${topLane.icon} ${topLane.name} (${topLane.alias})
        </div>
        <div class="result-archetype">次选契合分路：${subLane.icon} ${subLane.name} (${subLane.alias})</div>
        <p style="max-width: 720px; margin: 1rem auto; font-size: 1.05rem; color: var(--text-secondary); line-height: 1.8;">
          你的骨子里流淌着【${topLane.trait}】的战术天赋。相较于其它位置，在这个分路上你更能释放自己的战斗直觉，更容易打出高胜率突破连胜！
        </p>
      </div>

      <div class="info-card" style="margin-bottom: 2rem;">
        <div class="card-title" style="color: #facc15;">
          <span class="card-icon">👑</span> 【${topLane.name}】首选推荐英雄池 (T0 / T1)
        </div>
        <div class="heroes-grid" style="margin-top: 1rem;">
          ${recommendedHeroes.map(h => `
            <div class="hero-codex-card" onclick="app.openHeroModal('${h.id}')">
              <div class="h-card-top">
                <span class="h-card-name" style="color: ${h.color};">${h.name}</span>
                <span class="h-tag">${WANGZHE_DATA.roles[h.role].name}</span>
              </div>
              <div class="h-card-title">${h.title}</div>
              <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.8rem;">${h.archetype}</p>
              <div class="bullet-desc" style="font-size: 0.8rem;">${h.playstyle.coreTip}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="result-actions-bar">
        <button class="btn btn-primary btn-large" onclick="app.switchTab('codex'); app.setLaneFilter('${topLane.code}')">
          📖 查看【${topLane.name}】全部英雄池
        </button>
        <button class="btn btn-secondary btn-large" onclick="app.switchTab('generator')">
          🔮 测算双排开黑搭档
        </button>
        <button class="btn btn-ghost" onclick="app.startTacticalTest()">
          🔄 重新诊断
        </button>
      </div>
    `;
  }

  /* ==================== 3. 英雄全景资料库 (Codex) ==================== */
  renderCodex() {
    const grid = document.getElementById("heroesGrid");
    if (!grid) return;

    grid.innerHTML = "";
    const { role, lane, searchQuery } = this.codexState;
    const heroes = Object.values(WANGZHE_DATA.heroes);

    heroes.forEach(h => {
      if (role !== "ALL" && h.role !== role) return;
      if (lane !== "ALL" && h.lane !== lane) return;

      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const match = h.name.toLowerCase().includes(q) ||
                      h.title.toLowerCase().includes(q) ||
                      h.archetype.toLowerCase().includes(q) ||
                      h.skills.some(s => s.name.toLowerCase().includes(q) || s.desc.toLowerCase().includes(q));
        if (!match) return;
      }

      const roleInfo = WANGZHE_DATA.roles[h.role];
      const laneInfo = WANGZHE_DATA.lanes[h.lane];

      const card = document.createElement("div");
      card.className = "hero-codex-card";
      card.onclick = () => this.openHeroModal(h.id);

      card.innerHTML = `
        <div class="h-card-top">
          <div class="h-card-name" style="color: ${h.color};">${h.name}</div>
          <div class="h-card-badges">
            <span class="h-tag" style="background: ${roleInfo.color}25; color: ${roleInfo.color}; border: 1px solid ${roleInfo.color}50;">
              ${roleInfo.name}
            </span>
            <span class="h-tag" style="background: rgba(255, 255, 255, 0.08);">
              ${laneInfo.name}
            </span>
          </div>
        </div>
        <div class="h-card-title">${h.title}</div>
        <div class="h-card-archetype">${h.archetype}</div>
        <div class="h-card-quote">"${h.quote}"</div>
        <button class="btn btn-xs btn-outline btn-block" onclick="event.stopPropagation(); app.openHeroModal('${h.id}')">
          查看技能与背景故事 →
        </button>
      `;

      grid.appendChild(card);
    });
  }

  setRoleFilter(roleCode) {
    this.playSound("click");
    this.codexState.role = roleCode;
    document.querySelectorAll("#rolePills .filter-pill").forEach(p => {
      p.classList.toggle("active", p.dataset.role === roleCode);
    });
    this.renderCodex();
  }

  setLaneFilter(laneCode) {
    this.playSound("click");
    this.codexState.lane = laneCode;
    document.querySelectorAll("#lanePills .filter-pill").forEach(p => {
      p.classList.toggle("active", p.dataset.lane === laneCode);
    });
    this.renderCodex();
  }

  filterCodex(roleCode, laneCode) {
    this.switchTab("codex");
    this.setRoleFilter(roleCode);
    this.setLaneFilter(laneCode);
  }

  searchHero(query) {
    this.codexState.searchQuery = query.trim();
    const clearBtn = document.getElementById("clearSearchBtn");
    if (clearBtn) clearBtn.classList.toggle("hidden", !query);
    this.renderCodex();
  }

  clearHeroSearch() {
    const input = document.getElementById("heroSearchInput");
    if (input) {
      input.value = "";
      this.searchHero("");
    }
  }

  openHeroModal(heroId) {
    this.playSound("click");
    const h = WANGZHE_DATA.heroes[heroId];
    if (!h) return;

    const modalBody = document.getElementById("heroModalBody");
    const backdrop = document.getElementById("heroModalBackdrop");
    const roleInfo = WANGZHE_DATA.roles[h.role];
    const laneInfo = WANGZHE_DATA.lanes[h.lane];

    modalBody.innerHTML = `
      <div style="text-align: center; margin-bottom: 2rem;">
        <span class="h-tag" style="background: ${roleInfo.color}20; color: ${roleInfo.color}; font-size: 0.85rem; padding: 0.3rem 0.8rem; border: 1px solid ${roleInfo.color}50;">
          ${roleInfo.name} · ${laneInfo.name} (${laneInfo.alias})
        </span>
        <h2 style="font-size: 3rem; font-weight: 900; color: ${h.color}; margin: 0.5rem 0 0.2rem 0;">${h.name} · ${h.title}</h2>
        <div style="font-size: 1.15rem; color: var(--text-secondary);">${h.archetype}</div>
      </div>

      <div style="background: rgba(255, 255, 255, 0.04); border-left: 4px solid ${h.color}; padding: 1rem 1.5rem; margin-bottom: 2rem; border-radius: var(--radius-sm); font-style: italic;">
        "${h.quote}"
      </div>

      <!-- 四大核心技能机制全景介绍 -->
      <div style="margin-bottom: 2rem;">
        <h3 style="font-size: 1.3rem; font-weight: 800; color: #facc15; margin-bottom: 1rem;">⚡ 英雄核心技能全景详解</h3>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          ${h.skills.map(s => `
            <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.25rem;">
              <div style="font-weight: 800; font-size: 1.05rem; color: #38bdf8; margin-bottom: 0.4rem;">✦ ${s.name}</div>
              <div style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.6;">${s.desc}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- 英雄背景故事与历史设定 -->
      <div style="margin-bottom: 2rem;">
        <h3 style="font-size: 1.3rem; font-weight: 800; color: #facc15; margin-bottom: 0.8rem;">📜 人物背景传说与羁绊</h3>
        <p style="font-size: 0.98rem; color: var(--text-secondary); line-height: 1.8;">${h.background}</p>
      </div>

      <!-- 实战打法与克制关系 -->
      <div class="result-cards-grid" style="margin-bottom: 2rem;">
        <div class="info-card">
          <div class="card-title" style="color: #4ade80;">🚀 核心实战绝活连招与优势</div>
          <div class="bullet-item"><div class="bullet-title">连招精髓：</div><div class="bullet-desc">${h.playstyle.coreTip}</div></div>
          <div class="bullet-item"><div class="bullet-title">优势强项：</div><div class="bullet-desc">${h.playstyle.strengths}</div></div>
          <div class="bullet-item"><div class="bullet-title">致命短板：</div><div class="bullet-desc">${h.playstyle.weaknesses}</div></div>
        </div>

        <div class="info-card">
          <div class="card-title" style="color: #ec4899;">⚔️ 英雄克制天平速查</div>
          <div class="bullet-item"><div class="bullet-title">极度克制：</div><div class="bullet-desc">${h.matchups.counters.join("、")}</div></div>
          <div class="bullet-item"><div class="bullet-title">被克制天敌：</div><div class="bullet-desc">${h.matchups.counteredBy.join("、")}</div></div>
          <div class="bullet-item"><div class="bullet-title">天作之合搭档：</div><div class="bullet-desc">${h.matchups.bestPartners.join("、")}</div></div>
        </div>
      </div>

      <div style="display: flex; justify-content: center; gap: 1rem; border-top: 1px solid var(--border-color); padding-top: 1.5rem;">
        <button class="btn btn-primary" onclick="app.closeHeroModal(); app.jumpToGeneratorWithHero('${h.id}')">
          🔮 测算【${h.name}】的开黑动力学 →
        </button>
        <button class="btn btn-outline" onclick="app.closeHeroModal()">关闭档案</button>
      </div>
    `;

    backdrop.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  closeHeroModal() {
    const backdrop = document.getElementById("heroModalBackdrop");
    if (backdrop) {
      backdrop.classList.add("hidden");
      document.body.style.overflow = "";
    }
  }

  /* ==================== 4. 搭档羁绊大矩阵 ==================== */
  renderSynergyMatrix(catFilter = "ALL") {
    const grid = document.getElementById("synergyCardsGrid");
    if (!grid) return;

    grid.innerHTML = "";
    const combos = WANGZHE_DATA.synergyCombos;

    combos.forEach(c => {
      if (catFilter !== "ALL" && c.category !== catFilter) return;

      const h1 = WANGZHE_DATA.heroes[c.h1];
      const h2 = WANGZHE_DATA.heroes[c.h2];
      if (!h1 || !h2) return;

      const card = document.createElement("div");
      card.className = "synergy-card";
      card.onclick = () => {
        this.quickDuoPreset(c.h1, c.h2);
      };

      card.innerHTML = `
        <div class="syn-header">
          <div class="syn-name">${c.name} (${h1.name} × ${h2.name})</div>
          <div class="syn-score">${c.score}分</div>
        </div>
        <div class="syn-title">${c.title}</div>
        <div class="syn-desc">${c.desc}</div>
        <ul class="syn-perks-list">
          ${c.perks.map(p => `<li>${p}</li>`).join('')}
        </ul>
        <button class="btn btn-xs btn-outline btn-block" style="margin-top: auto;">
          生成该组合实战演练报告 →
        </button>
      `;

      grid.appendChild(card);
    });
  }

  filterSynergy(cat) {
    this.playSound("click");
    document.querySelectorAll(".synergy-category-pills .filter-pill").forEach(p => {
      p.classList.toggle("active", p.dataset.cat === cat);
    });
    this.renderSynergyMatrix(cat);
  }

  /* ==================== 5. 排位开黑动力学生成器 ==================== */
  setupGeneratorSelectors() {
    const s1 = document.getElementById("selectHero1");
    const s2 = document.getElementById("selectHero2");
    if (!s1 || !s2) return;

    s1.innerHTML = "";
    s2.innerHTML = "";

    Object.values(WANGZHE_DATA.heroes).forEach(h => {
      const opt1 = document.createElement("option");
      opt1.value = h.id;
      opt1.textContent = `${h.name} - ${h.title} (${WANGZHE_DATA.roles[h.role].name})`;
      s1.appendChild(opt1);

      const opt2 = document.createElement("option");
      opt2.value = h.id;
      opt2.textContent = `${h.name} - ${h.title} (${WANGZHE_DATA.roles[h.role].name})`;
      s2.appendChild(opt2);
    });

    s1.value = this.generatorState.h1;
    s2.value = this.generatorState.h2;

    this.onHero1Change(this.generatorState.h1);
    this.onHero2Change(this.generatorState.h2);
  }

  onHero1Change(hId) {
    this.generatorState.h1 = hId;
    const h = WANGZHE_DATA.heroes[hId];
    const prev = document.getElementById("previewHero1");
    if (prev && h) {
      prev.innerHTML = `
        <div style="font-size: 1.3rem; font-weight: 900; color: ${h.color};">${h.name} · ${h.title}</div>
        <div style="font-size: 0.85rem; color: var(--text-gold); margin-bottom: 0.3rem;">${WANGZHE_DATA.roles[h.role].name} · ${WANGZHE_DATA.lanes[h.lane].name}</div>
        <div style="font-size: 0.78rem; color: var(--text-muted);">${h.archetype}</div>
      `;
    }
  }

  onHero2Change(hId) {
    this.generatorState.h2 = hId;
    const h = WANGZHE_DATA.heroes[hId];
    const prev = document.getElementById("previewHero2");
    if (prev && h) {
      prev.innerHTML = `
        <div style="font-size: 1.3rem; font-weight: 900; color: ${h.color};">${h.name} · ${h.title}</div>
        <div style="font-size: 0.85rem; color: var(--text-gold); margin-bottom: 0.3rem;">${WANGZHE_DATA.roles[h.role].name} · ${WANGZHE_DATA.lanes[h.lane].name}</div>
        <div style="font-size: 0.78rem; color: var(--text-muted);">${h.archetype}</div>
      `;
    }
  }

  setGameScenario(scen) {
    this.playSound("click");
    this.generatorState.scenario = scen;
    document.querySelectorAll("#scenarioButtons .scenario-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.scen === scen);
    });
    this.generateHeroDuoReport();
  }

  importMyHeroTo1() {
    if (this.smState.result) {
      const hId = this.smState.result.heroId;
      document.getElementById("selectHero1").value = hId;
      this.onHero1Change(hId);
      this.playSound("click");
      this.showToast(`已成功将您的本命英雄【${this.smState.result.hero.name}】设置为一号位！`);
      this.generateHeroDuoReport();
    } else {
      this.showToast("您尚未进行本命英雄测评，快去测算吧！");
    }
  }

  pickGoldenPartnerForHero1() {
    this.playSound("click");
    const h1Id = this.generatorState.h1;
    // 查找是否有经典预设
    const pair = WANGZHE_DATA.synergyCombos.find(c => c.h1 === h1Id || c.h2 === h1Id);
    if (pair) {
      const partnerId = pair.h1 === h1Id ? pair.h2 : pair.h1;
      document.getElementById("selectHero2").value = partnerId;
      this.onHero2Change(partnerId);
      this.showToast(`已为您自动匹配官方天选搭档：【${WANGZHE_DATA.heroes[partnerId].name}】！`);
      this.generateHeroDuoReport();
    } else {
      // 辅助优先
      const supportHero = Object.values(WANGZHE_DATA.heroes).find(h => h.role === "support" && h.id !== h1Id);
      if (supportHero) {
        document.getElementById("selectHero2").value = supportHero.id;
        this.onHero2Change(supportHero.id);
        this.showToast(`已为您推荐高契合辅助：【${supportHero.name}】！`);
        this.generateHeroDuoReport();
      }
    }
  }

  randomHeroPair() {
    this.playSound("select");
    const keys = Object.keys(WANGZHE_DATA.heroes);
    const r1 = keys[Math.floor(Math.random() * keys.length)];
    let r2 = keys[Math.floor(Math.random() * keys.length)];
    while (r2 === r1) {
      r2 = keys[Math.floor(Math.random() * keys.length)];
    }

    document.getElementById("selectHero1").value = r1;
    document.getElementById("selectHero2").value = r2;
    this.onHero1Change(r1);
    this.onHero2Change(r2);
    this.generateHeroDuoReport();
    this.showToast(`🎲 已随机翻牌组合：${WANGZHE_DATA.heroes[r1].name} × ${WANGZHE_DATA.heroes[r2].name}！`);
  }

  quickDuoPreset(h1Id, h2Id) {
    this.switchTab("generator");
    document.getElementById("selectHero1").value = h1Id;
    document.getElementById("selectHero2").value = h2Id;
    this.onHero1Change(h1Id);
    this.onHero2Change(h2Id);
    this.generateHeroDuoReport();
  }

  generateHeroDuoReport() {
    this.playSound("triumph");
    const { h1, h2, scenario } = this.generatorState;
    const report = WANGZHE_DATA.calculateHeroPair(h1, h2, scenario);
    if (!report) return;

    const container = document.getElementById("heroDuoReportContainer");
    if (!container) return;

    const m = report.metrics;

    container.innerHTML = `
      <div class="report-hero-card">
        <span class="report-scenario-badge" style="background: rgba(234, 179, 8, 0.15); color: #facc15; border: 1px solid var(--border-gold);">
          ⚔️ 峡谷战术开黑深度动力学剖析
        </span>
        <div class="report-archetype-title">
          <span style="color: ${report.h1.color};">${report.h1.name} (${report.h1.title})</span>
          ×
          <span style="color: ${report.h2.color};">${report.h2.name} (${report.h2.title})</span>
        </div>
        <div style="font-size: 1.3rem; font-weight: 800; color: #facc15; margin-bottom: 0.8rem;">
          ${report.title}
        </div>
        <div class="report-score-ring">
          ${report.score} <span style="font-size: 1.5rem; font-weight: 700;">分</span>
        </div>
        <p style="font-size: 1.05rem; color: var(--text-secondary); max-width: 780px; margin: 0 auto; line-height: 1.7;">
          ${report.archetype}
        </p>

        <!-- 4维动态战术仪表盘 -->
        <div class="report-metrics-row">
          <div class="metric-gauge-card">
            <div class="metric-name">⚡ 前期节奏压制力</div>
            <div class="metric-num" style="color: #facc15;">${m.rhythm}%</div>
            <div class="mini-gauge-track"><div class="mini-gauge-fill" style="width: ${m.rhythm}%; background: #facc15;"></div></div>
          </div>
          <div class="metric-gauge-card">
            <div class="metric-name">💥 团战秒人爆发力</div>
            <div class="metric-num" style="color: #f43f5e;">${m.burst}%</div>
            <div class="mini-gauge-track"><div class="mini-gauge-fill" style="width: ${m.burst}%; background: #f43f5e;"></div></div>
          </div>
          <div class="metric-gauge-card">
            <div class="metric-name">🔒 开团控制链衔接</div>
            <div class="metric-num" style="color: #38bdf8;">${m.control}%</div>
            <div class="mini-gauge-track"><div class="mini-gauge-fill" style="width: ${m.control}%; background: #38bdf8;"></div></div>
          </div>
          <div class="metric-gauge-card">
            <div class="metric-name">🛡️ 逆风抗压翻盘率</div>
            <div class="metric-num" style="color: #4ade80;">${m.comeback}%</div>
            <div class="mini-gauge-track"><div class="mini-gauge-fill" style="width: ${m.comeback}%; background: #4ade80;"></div></div>
          </div>
        </div>
      </div>

      <div class="report-sections-grid">
        <div class="info-card">
          <div class="card-title" style="color: #facc15;">
            <span class="card-icon">🌲</span> 对线开局与野区入侵节奏
          </div>
          <div class="bullet-desc">${report.earlyGame}</div>
        </div>

        <div class="info-card">
          <div class="card-title" style="color: #38bdf8;">
            <span class="card-icon">🚀</span> 中期转线、抓人与控龙
          </div>
          <div class="bullet-desc">${report.midGame}</div>
        </div>

        <div class="info-card" style="grid-column: span 2;">
          <div class="card-title" style="color: #a855f7;">
            <span class="card-icon">🏰</span> 后期5v5高地团战切入与输出站位
          </div>
          <div class="bullet-desc">${report.teamfight}</div>
        </div>

        <div class="warning-card">
          <div class="card-title" style="color: #ef4444; margin-bottom: 0.75rem;">
            <span class="card-icon">🚨</span> 致命克制阵容与避坑警告
          </div>
          <p style="font-size: 1.05rem; line-height: 1.8; color: var(--text-primary);">
            ${report.warning}
          </p>
        </div>
      </div>
    `;
  }

  jumpToGeneratorWithHero(heroId) {
    this.switchTab("generator");
    document.getElementById("selectHero1").value = heroId;
    this.onHero1Change(heroId);
    this.pickGoldenPartnerForHero1();
  }

  /* ==================== 6. 英雄对抗天平 (Hero VS) ==================== */
  setupVsSelectors() {
    const s1 = document.getElementById("vsSelect1");
    const s2 = document.getElementById("vsSelect2");
    if (!s1 || !s2) return;

    s1.innerHTML = "";
    s2.innerHTML = "";

    Object.values(WANGZHE_DATA.heroes).forEach(h => {
      const opt1 = document.createElement("option");
      opt1.value = h.id;
      opt1.textContent = `${h.name} - ${h.title}`;
      s1.appendChild(opt1);

      const opt2 = document.createElement("option");
      opt2.value = h.id;
      opt2.textContent = `${h.name} - ${h.title}`;
      s2.appendChild(opt2);
    });

    s1.value = this.vsState.h1;
    s2.value = this.vsState.h2;
    this.renderHeroComparison();
  }

  renderHeroComparison() {
    const s1 = document.getElementById("vsSelect1");
    const s2 = document.getElementById("vsSelect2");
    if (!s1 || !s2) return;

    const id1 = s1.value;
    const id2 = s2.value;
    const h1 = WANGZHE_DATA.heroes[id1];
    const h2 = WANGZHE_DATA.heroes[id2];
    const wrap = document.getElementById("vsTableWrap");
    if (!wrap || !h1 || !h2) return;

    wrap.innerHTML = `
      <table class="compare-table">
        <thead>
          <tr>
            <th class="compare-col-feature">对决指标</th>
            <th class="compare-col-a" style="color: ${h1.color}; font-size: 1.3rem;">
              ${h1.name} · ${h1.title}
            </th>
            <th class="compare-col-b" style="color: ${h2.color}; font-size: 1.3rem;">
              ${h2.name} · ${h2.title}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="compare-col-feature">职业定位</td>
            <td>${WANGZHE_DATA.roles[h1.role].name} (${WANGZHE_DATA.lanes[h1.lane].name})</td>
            <td>${WANGZHE_DATA.roles[h2.role].name} (${WANGZHE_DATA.lanes[h2.lane].name})</td>
          </tr>
          <tr>
            <td class="compare-col-feature">核心优势</td>
            <td><strong>✦ ${h1.playstyle.strengths}</strong></td>
            <td><strong>✦ ${h2.playstyle.strengths}</strong></td>
          </tr>
          <tr>
            <td class="compare-col-feature">对决弱点</td>
            <td>⚠️ ${h1.playstyle.weaknesses}</td>
            <td>⚠️ ${h2.playstyle.weaknesses}</td>
          </tr>
          <tr>
            <td class="compare-col-feature">核心招牌技能</td>
            <td><strong>${h1.skills[3].name}</strong>：${h1.skills[3].desc}</td>
            <td><strong>${h2.skills[3].name}</strong>：${h2.skills[3].desc}</td>
          </tr>
          <tr>
            <td class="compare-col-feature">克制关系评判</td>
            <td>
              ${h1.matchups.counters.includes(h2.name) ? `<span style="color: #4ade80; font-weight: 800;">🔥 ${h1.name} 在机制上克制 ${h2.name}！</span>` : `${h1.name} 需谨慎应对 ${h2.name}`}
            </td>
            <td>
              ${h2.matchups.counters.includes(h1.name) ? `<span style="color: #4ade80; font-weight: 800;">🔥 ${h2.name} 在机制上克制 ${h1.name}！</span>` : `${h2.name} 需谨慎应对 ${h1.name}`}
            </td>
          </tr>
        </tbody>
      </table>
    `;
  }

  /* ==================== 7. Canvas 专属长图生成 ==================== */
  openShareModal() {
    this.playSound("click");
    const res = this.smState.result;
    if (!res) return;

    const modal = document.getElementById("shareCardModalBackdrop");
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";

    this.drawShareCanvas(res);
  }

  closeShareModal() {
    const modal = document.getElementById("shareCardModalBackdrop");
    if (modal) {
      modal.classList.add("hidden");
      document.body.style.overflow = "";
    }
  }

  drawShareCanvas(result) {
    const canvas = document.getElementById("shareCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const h = result.hero;

    const w = 800;
    const height = 1100;
    canvas.width = w;
    canvas.height = height;

    // 背景深色渐变
    const bgGrad = ctx.createLinearGradient(0, 0, w, height);
    bgGrad.addColorStop(0, "#0a0e17");
    bgGrad.addColorStop(0.5, "#1e1b4b");
    bgGrad.addColorStop(1, "#0f172a");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, height);

    // 金色边框
    ctx.strokeStyle = "rgba(234, 179, 8, 0.4)";
    ctx.lineWidth = 3;
    ctx.strokeRect(30, 30, w - 60, height - 60);

    // 顶部标识
    ctx.font = "bold 22px system-ui";
    ctx.fillStyle = "#facc15";
    ctx.textAlign = "center";
    ctx.fillText("⚔️ 王者荣耀 · 本命英雄神殿认证长图", w / 2, 85);

    // 英雄名称
    ctx.font = "900 80px system-ui";
    ctx.fillStyle = h.color || "#facc15";
    ctx.fillText(h.name, w / 2, 190);

    // 称号
    ctx.font = "bold 32px system-ui";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(h.title, w / 2, 240);

    // 契合度与原型
    ctx.font = "bold 20px system-ui";
    ctx.fillStyle = "#facc15";
    ctx.fillText(`灵魂契合指数：${result.affinityScore}% · ${h.archetype}`, w / 2, 285);

    // 经典台词框
    ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
    ctx.fillRect(80, 325, w - 160, 75);
    ctx.fillStyle = "#cbd5e1";
    ctx.font = "italic 16px system-ui";
    ctx.fillText(`"${h.quote}"`, w / 2, 368);

    // 精神契合剖析
    ctx.textAlign = "left";
    ctx.font = "bold 22px system-ui";
    ctx.fillStyle = "#facc15";
    ctx.fillText("灵魂共鸣密码：", 80, 450);

    ctx.font = "16px system-ui";
    ctx.fillStyle = "#e2e8f0";
    ctx.fillText(`✦ 职业与分路：${WANGZHE_DATA.roles[h.role].name} · ${WANGZHE_DATA.lanes[h.lane].name} (${WANGZHE_DATA.lanes[h.lane].alias})`, 80, 490);
    ctx.fillText(`✦ 性格底色印记：${h.personalityTraits.join(" · ")}`, 80, 525);

    // 技能机制
    ctx.font = "bold 22px system-ui";
    ctx.fillStyle = "#38bdf8";
    ctx.fillText("核心招牌机巧：", 80, 585);

    h.skills.slice(0, 3).forEach((s, idx) => {
      ctx.font = "bold 16px system-ui";
      ctx.fillStyle = "#ffffff";
      ctx.fillText(`✦ ${s.name}`, 80, 620 + idx * 60);
      ctx.font = "14px system-ui";
      ctx.fillStyle = "#94a3b8";
      ctx.fillText(s.desc.slice(0, 45) + "...", 80, 642 + idx * 60);
    });

    // 最佳搭档
    ctx.font = "bold 22px system-ui";
    ctx.fillStyle = "#ec4899";
    ctx.fillText("开黑绝配搭档：", 80, 825);
    ctx.font = "16px system-ui";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`✦ ${h.matchups.bestPartners.join("、")}`, 80, 860);

    // 水印
    ctx.textAlign = "center";
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    ctx.font = "14px system-ui";
    ctx.fillText("王者荣耀 · 英雄殿堂与开黑实验室 扫码或访问测算", w / 2, 1040);
  }

  downloadShareCard() {
    this.playSound("click");
    const canvas = document.getElementById("shareCanvas");
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = `王者荣耀-本命英雄-${this.smState.result ? this.smState.result.hero.name : 'Result'}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    this.showToast("已成功下载本命英雄认证长图！");
  }

  copyReportText() {
    this.playSound("click");
    const res = this.smState.result;
    if (!res) return;
    const h = res.hero;

    const text = `【王者荣耀 · 我的本命英雄认证报告】
👑 本命战神：${h.name} (${h.title})
🔥 灵魂契合指数：${res.affinityScore}%
🌟 精神原型：${h.archetype}
🗡️ 职业分路：${WANGZHE_DATA.roles[h.role].name} · ${WANGZHE_DATA.lanes[h.lane].name}
💬 经典台词："${h.quote}"
🤝 最佳双排搭档：${h.matchups.bestPartners.join("、")}

来自：王者荣耀英雄殿堂与开黑实验室`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        this.showToast("已成功复制本命认证文本！");
      }).catch(() => {
        this.fallbackCopyText(text);
      });
    } else {
      this.fallbackCopyText(text);
    }
  }

  fallbackCopyText(text) {
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
    this.showToast("已成功复制本命认证文本！");
  }
}

// 实例化
window.app = new WangzheApp();
window.addEventListener("DOMContentLoaded", () => {
  window.app.init();
});
