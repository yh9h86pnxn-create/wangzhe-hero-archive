/**
 * MBTI 深度实验室 · 核心业务交互引擎 (app.js)
 * 纯原生 ES6+，无外部依赖，包含：
 * 1. 深度情景推演与八维测评引擎 + 实时暂存与结果生成
 * 2. 16型全景百科查询、筛选与深度档案模态框
 * 3. 16×16 全关系矩阵渲染、单元格快速交互与个人主视角榜单
 * 4. 专属 MBTI 组合动力学生成器 (情侣/职场/闺蜜/室友/对手)
 * 5. 双人人格对比台
 * 6. 原生 Web Audio API 清脆音效系统
 * 7. HTML5 Canvas 高清长图卡片生成与导出分享
 */

class MbtiApp {
  constructor() {
    this.soundEnabled = localStorage.getItem("mbti_sound_enabled") !== "false";
    this.theme = localStorage.getItem("mbti_theme") || "dark";
    this.activeTab = "home";

    // 测评状态
    this.testState = {
      mode: "detailed", // 'detailed' | 'fast' | 'cognitive'
      questions: [],
      answers: {}, // id -> score (-3 ~ +3)
      currentIndex: 0,
      userResult: null
    };

    // 矩阵状态
    this.matrixState = {
      viewMode: "grid", // 'grid' | 'perspective'
      perspectiveType: "INTJ",
      tierFilter: null
    };

    // 生成器状态
    this.generatorState = {
      typeA: "INTJ",
      typeB: "ENFP",
      scenario: "couple"
    };

    // 对比台状态
    this.comparatorState = {
      type1: "INTJ",
      type2: "ENTP"
    };

    // 音频上下文
    this.audioCtx = null;
  }

  // 初始化应用
  init() {
    this.applyTheme(this.theme);
    this.updateSoundIcon();
    this.loadUserSavedResult();
    this.renderEncyclopedia();
    this.renderMatrixTable();
    this.setupGeneratorSelectors();
    this.setupComparator();
    this.generateDynamicReport(); // 初始渲染默认推荐组合

    // 检查 URL Hash 路由 (如 #test, #matrix, #generator)
    const hash = window.location.hash.replace('#sec-', '').replace('#', '');
    if (hash === 'test-run' || hash === 'test-detailed') {
      this.switchTab('test');
      this.startTest('detailed');
    } else if (hash === 'result-demo') {
      this.switchTab('test');
      const sampleRes = {
        type: "INTJ",
        profile: MBTI_DATA.profiles["INTJ"],
        percentages: {
          EI: { left: "E", right: "I", leftPct: 22, rightPct: 78 },
          SN: { left: "S", right: "N", leftPct: 18, rightPct: 82 },
          TF: { left: "T", right: "F", leftPct: 86, rightPct: 14 },
          JP: { left: "J", right: "P", leftPct: 72, rightPct: 28 }
        },
        mode: "detailed",
        date: new Date().toLocaleDateString("zh-CN")
      };
      this.testState.userResult = sampleRes;
      document.getElementById("testIntroBox").classList.add("hidden");
      document.getElementById("testRunnerBox").classList.add("hidden");
      document.getElementById("testResultBox").classList.remove("hidden");
      this.renderResultDashboard(sampleRes);
      this.updateUserNavbarBadge("INTJ");
    } else if (hash && ['test', 'encyclopedia', 'matrix', 'generator', 'comparator'].includes(hash)) {
      this.switchTab(hash);
    }

    // 恢复测评进度 (如果有)
    this.restoreTestProgress();
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
        osc.type = "sine";
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.exponentialRampToValueAtTime(780, now + 0.08);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === "select") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === "finish") {
        // 完成测评的和弦琶音
        const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
          const o = this.audioCtx.createOscillator();
          const g = this.audioCtx.createGain();
          o.connect(g);
          g.connect(this.audioCtx.destination);
          o.frequency.setValueAtTime(freq, now + idx * 0.09);
          g.gain.setValueAtTime(0.12, now + idx * 0.09);
          g.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.35);
          o.start(now + idx * 0.09);
          o.stop(now + idx * 0.09 + 0.35);
        });
      }
    } catch (e) {
      console.warn("Audio error:", e);
    }
  }

  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    localStorage.setItem("mbti_sound_enabled", this.soundEnabled);
    this.updateSoundIcon();
    this.showToast(this.soundEnabled ? "🔊 音效已开启" : "🔇 音效已静音");
    if (this.soundEnabled) this.playSound("click");
  }

  updateSoundIcon() {
    const icon = document.getElementById("soundIcon");
    if (icon) {
      icon.textContent = this.soundEnabled ? "🔔" : "🔕";
    }
  }

  /* ==================== 主题与导航切换 ==================== */
  toggleTheme() {
    this.theme = this.theme === "dark" ? "light" : "dark";
    localStorage.setItem("mbti_theme", this.theme);
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

    // 切换导航按钮高亮
    document.querySelectorAll(".nav-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.tab === tabId);
    });

    // 切换主体容器
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

  /* ==================== 1. 深度测评业务逻辑 ==================== */
  startTest(mode = "detailed") {
    this.playSound("select");
    this.testState.mode = mode;
    this.testState.answers = {};
    this.testState.currentIndex = 0;

    if (mode === "detailed") {
      this.testState.questions = [...MBTI_DATA.questionsDetailed];
      document.getElementById("currentModeName").textContent = "深度情景推演版 (60题)";
    } else if (mode === "fast") {
      this.testState.questions = [...MBTI_DATA.questionsFast];
      document.getElementById("currentModeName").textContent = "快速精准版 (28题)";
    } else if (mode === "cognitive") {
      this.testState.questions = [...MBTI_DATA.questionsCognitive];
      document.getElementById("currentModeName").textContent = "荣格八维探索版 (24题)";
    }

    // 切换界面
    document.getElementById("testIntroBox").classList.add("hidden");
    document.getElementById("testResultBox").classList.add("hidden");
    document.getElementById("testRunnerBox").classList.remove("hidden");

    this.renderCurrentQuestion();
    this.renderDrawerGrid();
  }

  renderCurrentQuestion() {
    const q = this.testState.questions[this.testState.currentIndex];
    if (!q) return;

    const total = this.testState.questions.length;
    const curNum = this.testState.currentIndex + 1;

    // 更新进度计数与维度提示
    document.getElementById("progressCounter").textContent = `第 ${curNum} / ${total} 题`;
    document.getElementById("totalQuestionsCount").textContent = total;

    const answeredCount = Object.keys(this.testState.answers).length;
    document.getElementById("answeredCount").textContent = answeredCount;

    const progressPct = Math.round((answeredCount / total) * 100);
    document.getElementById("progressBarFill").style.width = `${Math.max(3, progressPct)}%`;

    // 维度指示器
    const dimBadge = document.getElementById("currentDimBadge");
    if (q.dim) {
      const dimMap = {
        EI: "精力来源 · 外向 E vs 内向 I",
        SN: "信息感知 · 实感 S vs 直觉 N",
        TF: "决策逻辑 · 思考 T vs 情感 F",
        JP: "处事步调 · 判断 J vs 知觉 P"
      };
      dimBadge.textContent = dimMap[q.dim] || q.dim;
    } else if (q.func) {
      const funcInfo = MBTI_DATA.cognitiveFunctions[q.func];
      dimBadge.textContent = `荣格八维探针 · ${q.func} (${funcInfo ? funcInfo.name : ""})`;
    }

    // 题目内容
    document.getElementById("qScenarioTag").textContent = q.scenario ? `[ ${q.scenario} ]` : `[ 核心探针 ]`;
    document.getElementById("qTitle").textContent = q.title;
    document.getElementById("qDesc").textContent = q.desc;

    // 恢复已选项的高亮
    const currentAns = this.testState.answers[q.id];
    document.querySelectorAll(".likert-btn").forEach(btn => {
      btn.classList.toggle("selected", currentAns !== undefined && parseInt(btn.dataset.val) === currentAns);
    });

    // 上一题按钮状态
    const prevBtn = document.getElementById("prevQuestionBtn");
    prevBtn.disabled = this.testState.currentIndex === 0;
    prevBtn.style.opacity = this.testState.currentIndex === 0 ? "0.4" : "1";

    // 下一题按钮文字（最后一题变为“提交并查看报告”）
    const nextBtn = document.getElementById("nextQuestionBtn");
    if (this.testState.currentIndex === total - 1) {
      nextBtn.innerHTML = "✨ 完成测评 · 查看深度报告";
    } else {
      nextBtn.innerHTML = "下一题 →";
    }

    this.updateDrawerStatus();
  }

  selectAnswer(scoreVal) {
    this.playSound("click");
    const q = this.testState.questions[this.testState.currentIndex];
    if (!q) return;

    this.testState.answers[q.id] = scoreVal;
    this.saveTestProgress();

    // 选中视觉反馈
    document.querySelectorAll(".likert-btn").forEach(btn => {
      btn.classList.toggle("selected", parseInt(btn.dataset.val) === scoreVal);
    });

    // 自动平滑进入下一题 (延时 200ms)
    setTimeout(() => {
      if (this.testState.currentIndex < this.testState.questions.length - 1) {
        this.nextQuestion();
      } else {
        // 如果全答完了直接出结果
        if (Object.keys(this.testState.answers).length === this.testState.questions.length) {
          this.submitAndCalculateResult();
        } else {
          this.showToast("已记录最后一题，请检查答题卡补齐未答题目！");
          this.toggleQuestionDrawer();
        }
      }
    }, 220);
  }

  prevQuestion() {
    if (this.testState.currentIndex > 0) {
      this.playSound("click");
      this.testState.currentIndex--;
      this.renderCurrentQuestion();
    }
  }

  nextQuestion() {
    if (this.testState.currentIndex < this.testState.questions.length - 1) {
      this.playSound("click");
      this.testState.currentIndex++;
      this.renderCurrentQuestion();
    } else {
      // 最后一题点击
      const total = this.testState.questions.length;
      const answered = Object.keys(this.testState.answers).length;
      if (answered < total) {
        this.showToast(`您还有 ${total - answered} 道题未作答，请在答题卡中选择补齐！`);
        this.toggleQuestionDrawer();
      } else {
        this.submitAndCalculateResult();
      }
    }
  }

  jumpToQuestion(index) {
    this.playSound("click");
    this.testState.currentIndex = index;
    this.renderCurrentQuestion();
    document.getElementById("questionDrawer").classList.add("hidden");
  }

  toggleQuestionDrawer() {
    this.playSound("click");
    const drawer = document.getElementById("questionDrawer");
    drawer.classList.toggle("hidden");
    if (!drawer.classList.contains("hidden")) {
      this.renderDrawerGrid();
    }
  }

  renderDrawerGrid() {
    const grid = document.getElementById("drawerGrid");
    grid.innerHTML = "";
    this.testState.questions.forEach((q, idx) => {
      const btn = document.createElement("button");
      btn.className = "drawer-q-btn";
      btn.textContent = idx + 1;
      if (this.testState.answers[q.id] !== undefined) {
        btn.classList.add("done");
      }
      if (idx === this.testState.currentIndex) {
        btn.classList.add("current");
      }
      btn.onclick = () => this.jumpToQuestion(idx);
      grid.appendChild(btn);
    });
  }

  updateDrawerStatus() {
    const btns = document.querySelectorAll(".drawer-q-btn");
    btns.forEach((btn, idx) => {
      const q = this.testState.questions[idx];
      btn.classList.toggle("done", q && this.testState.answers[q.id] !== undefined);
      btn.classList.toggle("current", idx === this.testState.currentIndex);
    });
  }

  confirmResetTest() {
    if (confirm("确定要放弃当前的测评进度并重新开始吗？")) {
      this.playSound("click");
      localStorage.removeItem("mbti_test_progress");
      this.testState.answers = {};
      this.testState.currentIndex = 0;
      document.getElementById("testRunnerBox").classList.add("hidden");
      document.getElementById("testIntroBox").classList.remove("hidden");
    }
  }

  saveTestProgress() {
    const data = {
      mode: this.testState.mode,
      answers: this.testState.answers,
      currentIndex: this.testState.currentIndex
    };
    localStorage.setItem("mbti_test_progress", JSON.stringify(data));
  }

  restoreTestProgress() {
    const saved = localStorage.getItem("mbti_test_progress");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data && data.answers && Object.keys(data.answers).length > 0) {
          // 在简介卡片显示提示
          const alertEl = document.getElementById("prevResultAlert");
          if (alertEl) {
            alertEl.classList.remove("hidden");
            alertEl.innerHTML = `
              <span>📝 发现您有正在进行的测评草稿 (${Object.keys(data.answers).length} 题已答)：</span>
              <button class="btn btn-xs btn-primary" onclick="app.resumeTestProgress()">继续答题</button>
            `;
          }
        }
      } catch (e) {
        console.warn("Failed to parse saved progress", e);
      }
    }
  }

  resumeTestProgress() {
    const saved = localStorage.getItem("mbti_test_progress");
    if (!saved) return;
    const data = JSON.parse(saved);
    this.startTest(data.mode || "detailed");
    this.testState.answers = data.answers || {};
    this.testState.currentIndex = data.currentIndex || 0;
    this.renderCurrentQuestion();
    this.showToast("已为您恢复上次答题进度！");
  }

  /* ==================== 测评结果计算与报告渲染 ==================== */
  submitAndCalculateResult() {
    this.playSound("finish");
    localStorage.removeItem("mbti_test_progress");

    let result = null;
    if (this.testState.mode === "cognitive") {
      result = this.calculateCognitiveResult();
    } else {
      result = this.calculateDichotomyResult();
    }

    this.testState.userResult = result;
    localStorage.setItem("mbti_user_result", JSON.stringify(result));

    // 界面切换
    document.getElementById("testRunnerBox").classList.add("hidden");
    document.getElementById("testResultBox").classList.remove("hidden");

    this.renderResultDashboard(result);
    this.updateUserNavbarBadge(result.type);
    this.showToast(`🎉 测评完成！您的人格类型为：${result.type}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // 四维倾向计算
  calculateDichotomyResult() {
    const scores = {
      EI: { E: 0, I: 0, total: 0 },
      SN: { S: 0, N: 0, total: 0 },
      TF: { T: 0, F: 0, total: 0 },
      JP: { J: 0, P: 0, total: 0 }
    };

    this.testState.questions.forEach(q => {
      const val = this.testState.answers[q.id] || 0; // -3 ~ +3
      const dim = q.dim;
      if (!scores[dim]) return;

      // 题目direction说明：
      // 如果 direction === 'I': +3 加给 I 3分，-3 加给 E 3分
      // 如果 direction === 'E': +3 加给 E 3分，-3 加给 I 3分
      if (dim === "EI") {
        if (q.direction === "I") {
          scores.EI.I += 3 + val;
          scores.EI.E += 3 - val;
        } else {
          scores.EI.E += 3 + val;
          scores.EI.I += 3 - val;
        }
      } else if (dim === "SN") {
        if (q.direction === "N") {
          scores.SN.N += 3 + val;
          scores.SN.S += 3 - val;
        } else {
          scores.SN.S += 3 + val;
          scores.SN.N += 3 - val;
        }
      } else if (dim === "TF") {
        if (q.direction === "F") {
          scores.TF.F += 3 + val;
          scores.TF.T += 3 - val;
        } else {
          scores.TF.T += 3 + val;
          scores.TF.F += 3 - val;
        }
      } else if (dim === "JP") {
        if (q.direction === "P") {
          scores.JP.P += 3 + val;
          scores.JP.J += 3 - val;
        } else {
          scores.JP.J += 3 + val;
          scores.JP.P += 3 - val;
        }
      }
    });

    // 计算百分比
    const calcPct = (left, right) => {
      const sum = Math.max(1, left + right);
      const leftPct = Math.round((left / sum) * 100);
      return { leftPct, rightPct: 100 - leftPct };
    };

    const eiPct = calcPct(scores.EI.E, scores.EI.I);
    const snPct = calcPct(scores.SN.S, scores.SN.N);
    const tfPct = calcPct(scores.TF.T, scores.TF.F);
    const jpPct = calcPct(scores.JP.J, scores.JP.P);

    const letterE_I = eiPct.leftPct >= eiPct.rightPct ? "E" : "I";
    const letterS_N = snPct.leftPct >= snPct.rightPct ? "S" : "N";
    const letterT_F = tfPct.leftPct >= tfPct.rightPct ? "T" : "F";
    const letterJ_P = jpPct.leftPct >= jpPct.rightPct ? "J" : "P";

    const typeCode = `${letterE_I}${letterS_N}${letterT_F}${letterJ_P}`;

    return {
      type: typeCode,
      profile: MBTI_DATA.profiles[typeCode],
      percentages: {
        EI: { left: "E", right: "I", leftPct: eiPct.leftPct, rightPct: eiPct.rightPct },
        SN: { left: "S", right: "N", leftPct: snPct.leftPct, rightPct: snPct.rightPct },
        TF: { left: "T", right: "F", leftPct: tfPct.leftPct, rightPct: tfPct.rightPct },
        JP: { left: "J", right: "P", leftPct: jpPct.leftPct, rightPct: jpPct.rightPct }
      },
      mode: this.testState.mode,
      date: new Date().toLocaleDateString("zh-CN")
    };
  }

  // 荣格认知八维计算
  calculateCognitiveResult() {
    const funcs = { Ni: 0, Ne: 0, Si: 0, Se: 0, Ti: 0, Te: 0, Fi: 0, Fe: 0 };
    this.testState.questions.forEach(q => {
      const val = this.testState.answers[q.id] || 0;
      if (funcs[q.func] !== undefined) {
        funcs[q.func] += val + 3; // 映射为 0~6 分
      }
    });

    // 根据认知功能强弱最贴近哪种16型人格
    let bestType = "INTJ";
    let maxFit = -999;

    Object.keys(MBTI_DATA.profiles).forEach(type => {
      const stack = MBTI_DATA.profiles[type].stack;
      // 评分权重：主导功能 * 4，辅助功能 * 3，第三功能 * 2，劣势功能 * 1
      const fitScore = funcs[stack[0]] * 4 + funcs[stack[1]] * 3 + funcs[stack[2]] * 2 + funcs[stack[3]] * 1;
      if (fitScore > maxFit) {
        maxFit = fitScore;
        bestType = type;
      }
    });

    return {
      type: bestType,
      profile: MBTI_DATA.profiles[bestType],
      cognitiveScores: funcs,
      percentages: {
        EI: { left: "E", right: "I", leftPct: bestType[0] === "E" ? 72 : 28, rightPct: bestType[0] === "I" ? 72 : 28 },
        SN: { left: "S", right: "N", leftPct: bestType[1] === "S" ? 68 : 32, rightPct: bestType[1] === "N" ? 68 : 32 },
        TF: { left: "T", right: "F", leftPct: bestType[2] === "T" ? 75 : 25, rightPct: bestType[2] === "F" ? 75 : 25 },
        JP: { left: "J", right: "P", leftPct: bestType[3] === "J" ? 70 : 30, rightPct: bestType[3] === "P" ? 70 : 30 }
      },
      mode: "cognitive",
      date: new Date().toLocaleDateString("zh-CN")
    };
  }

  // 渲染测评完整报告看板
  renderResultDashboard(result) {
    const prof = result.profile;
    const box = document.getElementById("testResultBox");
    if (!box || !prof) return;

    const tempInfo = MBTI_DATA.temperaments[prof.temperament];
    const p = result.percentages;

    box.innerHTML = `
      <div class="result-hero" style="border-top: 4px solid ${prof.color};">
        <div class="hero-badge" style="background: ${prof.color};">${tempInfo.name} · ${tempInfo.title}</div>
        <div class="result-type-code" style="color: ${prof.color};">${prof.code}</div>
        <div class="result-archetype-name">${prof.name}</div>
        <div class="result-tagline">${prof.title}</div>
        <div class="result-totem-pill">精神图腾：${prof.totem}</div>
        <div class="result-quote-box">
          "${prof.quote}"
        </div>
      </div>

      <!-- 四维倾向精准百分比条 -->
      <div class="dichotomy-bars-container">
        <div class="bars-header">四维偏好倾向与能量流向深度拆解</div>
        
        <!-- EI -->
        <div class="dichotomy-row">
          <div class="dichotomy-info">
            <span class="dim-left" style="color: ${p.EI.leftPct >= 50 ? '#f59e0b' : 'var(--text-muted)'}">外向 E (${p.EI.leftPct}%)</span>
            <span style="font-size: 0.85rem; color: var(--text-muted);">精力获取：外部连接 vs 独立独处</span>
            <span class="dim-right" style="color: ${p.EI.rightPct > 50 ? '#6366f1' : 'var(--text-muted)'}">内向 I (${p.EI.rightPct}%)</span>
          </div>
          <div class="dichotomy-track">
            <div class="dichotomy-fill-left" style="width: ${p.EI.leftPct}%;"></div>
            <div class="dichotomy-fill-right" style="width: ${p.EI.rightPct}%;"></div>
          </div>
          <div class="dichotomy-subtext">${prof.code[0] === 'E' ? '✦ 您倾向于在多维的人际交往与外界反馈中迅速蓄能，行动力出众。' : '✦ 您倾向于在深邃的内在精神世界与独立独处中沉淀充电，思维醇厚。'}</div>
        </div>

        <!-- SN -->
        <div class="dichotomy-row">
          <div class="dichotomy-info">
            <span class="dim-left" style="color: ${p.SN.leftPct >= 50 ? '#10b981' : 'var(--text-muted)'}">实感 S (${p.SN.leftPct}%)</span>
            <span style="font-size: 0.85rem; color: var(--text-muted);">信息感知：确凿事实 vs 宏观愿景</span>
            <span class="dim-right" style="color: ${p.SN.rightPct > 50 ? '#8b5cf6' : 'var(--text-muted)'}">直觉 N (${p.SN.rightPct}%)</span>
          </div>
          <div class="dichotomy-track">
            <div class="dichotomy-fill-left" style="width: ${p.SN.leftPct}%; background: #10b981;"></div>
            <div class="dichotomy-fill-right" style="width: ${p.SN.rightPct}%; background: #8b5cf6;"></div>
          </div>
          <div class="dichotomy-subtext">${prof.code[1] === 'S' ? '✦ 您聚焦于当下的物理现实、扎实数据与可靠既往经验，务实落地。' : '✦ 您热衷于捕捉事物表象之下的深层因果模式、隐喻与未来无限可能性。'}</div>
        </div>

        <!-- TF -->
        <div class="dichotomy-row">
          <div class="dichotomy-info">
            <span class="dim-left" style="color: ${p.TF.leftPct >= 50 ? '#3b82f6' : 'var(--text-muted)'}">思考 T (${p.TF.leftPct}%)</span>
            <span style="font-size: 0.85rem; color: var(--text-muted);">决策逻辑：客观真理 vs 价值温度</span>
            <span class="dim-right" style="color: ${p.TF.rightPct > 50 ? '#ec4899' : 'var(--text-muted)'}">情感 F (${p.TF.rightPct}%)</span>
          </div>
          <div class="dichotomy-track">
            <div class="dichotomy-fill-left" style="width: ${p.TF.leftPct}%; background: #3b82f6;"></div>
            <div class="dichotomy-fill-right" style="width: ${p.TF.rightPct}%; background: #ec4899;"></div>
          </div>
          <div class="dichotomy-subtext">${prof.code[2] === 'T' ? '✦ 您信奉不偏不倚的理性推导、投入产出比与冷峻的客观事实法则。' : '✦ 您注重人本同理关怀、团队和谐与内在良知信仰，极富人情温度。'}</div>
        </div>

        <!-- JP -->
        <div class="dichotomy-row">
          <div class="dichotomy-info">
            <span class="dim-left" style="color: ${p.JP.leftPct >= 50 ? '#06b6d4' : 'var(--text-muted)'}">判断 J (${p.JP.leftPct}%)</span>
            <span style="font-size: 0.85rem; color: var(--text-muted);">生活态度：闭环掌控 vs 弹性应变</span>
            <span class="dim-right" style="color: ${p.JP.rightPct > 50 ? '#f97316' : 'var(--text-muted)'}">知觉 P (${p.JP.rightPct}%)</span>
          </div>
          <div class="dichotomy-track">
            <div class="dichotomy-fill-left" style="width: ${p.JP.leftPct}%; background: #06b6d4;"></div>
            <div class="dichotomy-fill-right" style="width: ${p.JP.rightPct}%; background: #f97316;"></div>
          </div>
          <div class="dichotomy-subtext">${prof.code[3] === 'J' ? '✦ 您享受井井有条的规划排期，追求尘埃落定与对生活的秩序掌控感。' : '✦ 您崇尚开放灵活的生活步调，享受即兴顺应变化，不拘于死板教条。'}</div>
        </div>
      </div>

      <!-- 荣格认知功能栈 -->
      <div class="cognitive-stack-card">
        <div class="bars-header">荣格八维认知功能栈 (Cognitive Stack Architecture)</div>
        <p style="color: var(--text-secondary); margin-bottom: 1rem; font-size: 0.95rem;">${prof.stackDesc}</p>
        <div class="stack-grid">
          <div class="stack-item" style="border-top: 3px solid #8b5cf6;">
            <div class="stack-role">第一主导功能 (Hero)</div>
            <div class="stack-code">${prof.stack[0]}</div>
            <div class="stack-name">${MBTI_DATA.cognitiveFunctions[prof.stack[0]].name}</div>
            <div class="stack-desc">${MBTI_DATA.cognitiveFunctions[prof.stack[0]].desc}</div>
          </div>
          <div class="stack-item" style="border-top: 3px solid #3b82f6;">
            <div class="stack-role">第二辅助功能 (Parent)</div>
            <div class="stack-code">${prof.stack[1]}</div>
            <div class="stack-name">${MBTI_DATA.cognitiveFunctions[prof.stack[1]].name}</div>
            <div class="stack-desc">${MBTI_DATA.cognitiveFunctions[prof.stack[1]].desc}</div>
          </div>
          <div class="stack-item" style="border-top: 3px solid #f59e0b;">
            <div class="stack-role">第三缓解功能 (Child)</div>
            <div class="stack-code">${prof.stack[2]}</div>
            <div class="stack-name">${MBTI_DATA.cognitiveFunctions[prof.stack[2]].name}</div>
            <div class="stack-desc">${MBTI_DATA.cognitiveFunctions[prof.stack[2]].desc}</div>
          </div>
          <div class="stack-item" style="border-top: 3px solid #ef4444;">
            <div class="stack-role">第四劣势功能 (Inferior)</div>
            <div class="stack-code">${prof.stack[3]}</div>
            <div class="stack-name">${MBTI_DATA.cognitiveFunctions[prof.stack[3]].name}</div>
            <div class="stack-desc">${MBTI_DATA.cognitiveFunctions[prof.stack[3]].desc}</div>
          </div>
        </div>
      </div>

      <!-- 深度特质解剖矩阵卡片 -->
      <div class="result-cards-grid">
        <!-- 闪光优势 -->
        <div class="info-card">
          <div class="card-title" style="color: #10b981;">
            <span class="card-icon">🚀</span> 三大核心降维优势
          </div>
          ${prof.strengths.map(s => `
            <div class="bullet-item">
              <div class="bullet-title">✦ ${s.title}</div>
              <div class="bullet-desc">${s.desc}</div>
            </div>
          `).join('')}
        </div>

        <!-- 致命弱点与阴影 -->
        <div class="info-card">
          <div class="card-title" style="color: #f43f5e;">
            <span class="card-icon">⚠️</span> 三大真实盲区与陷阱
          </div>
          ${prof.weaknesses.map(w => `
            <div class="bullet-item">
              <div class="bullet-title">✦ ${w.title}</div>
              <div class="bullet-desc">${w.desc}</div>
            </div>
          `).join('')}
        </div>

        <!-- 高压黑化自救 -->
        <div class="info-card" style="border-left: 4px solid #f59e0b;">
          <div class="card-title" style="color: #f59e0b;">
            <span class="card-icon">🌪️</span> ${prof.stressGrip.title}
          </div>
          <div class="bullet-desc">${prof.stressGrip.desc}</div>
        </div>

        <!-- 职场与搞钱 -->
        <div class="info-card">
          <div class="card-title" style="color: #3b82f6;">
            <span class="card-icon">💰</span> 职场搞钱与天选跑道
          </div>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.8rem;">
            ${prof.career.tags.map(t => `<span class="stack-tag" style="background: rgba(59, 130, 246, 0.15); color: #60a5fa;">#${t}</span>`).join('')}
          </div>
          <div class="bullet-item">
            <div class="bullet-title">👍 最适环境：</div>
            <div class="bullet-desc">${prof.career.bestEnv}</div>
          </div>
          <div class="bullet-item">
            <div class="bullet-title">🚫 避坑环境：</div>
            <div class="bullet-desc">${prof.career.badEnv}</div>
          </div>
        </div>

        <!-- 亲密关系与恋爱 -->
        <div class="info-card">
          <div class="card-title" style="color: #ec4899;">
            <span class="card-icon">💘</span> 亲密关系与恋爱特写
          </div>
          <div class="bullet-item">
            <div class="bullet-title">💖 恋爱模式：</div>
            <div class="bullet-desc">${prof.love.pattern}</div>
          </div>
          <div class="bullet-item">
            <div class="bullet-title">🧲 容易被谁吸引：</div>
            <div class="bullet-desc">${prof.love.attractedBy}</div>
          </div>
          <div class="bullet-item">
            <div class="bullet-title">⚡ 相处大忌：</div>
            <div class="bullet-desc">${prof.love.taboos}</div>
          </div>
        </div>

        <!-- 进阶成长建议 -->
        <div class="info-card">
          <div class="card-title" style="color: #8b5cf6;">
            <span class="card-icon">🌱</span> 破界蜕变与觉察指南
          </div>
          ${prof.growthAdvice.map((g, idx) => `
            <div class="bullet-item">
              <div class="bullet-title">0${idx + 1}.</div>
              <div class="bullet-desc">${g}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- 操作与跳转 -->
      <div class="result-actions-bar">
        <button class="btn btn-primary btn-large glow-btn" onclick="app.openShareCardModal()">
          🖼️ 保存为精美结果长图
        </button>
        <button class="btn btn-secondary btn-large" onclick="app.jumpToMatrixWithType('${prof.code}')">
          📊 查看我在 16×16 矩阵中的全部关系
        </button>
        <button class="btn btn-glass btn-large" onclick="app.jumpToGeneratorWithType('${prof.code}')">
          🔮 测算我与 TA 的组合动力学
        </button>
        <button class="btn btn-ghost" onclick="app.startTest('detailed')">
          🔄 重新测评
        </button>
      </div>
    `;
  }

  loadUserSavedResult() {
    const saved = localStorage.getItem("mbti_user_result");
    if (saved) {
      try {
        const res = JSON.parse(saved);
        this.testState.userResult = res;
        this.updateUserNavbarBadge(res.type);
      } catch (e) {
        console.warn(e);
      }
    }
  }

  showSavedResult() {
    if (this.testState.userResult) {
      this.switchTab("test");
      document.getElementById("testIntroBox").classList.add("hidden");
      document.getElementById("testRunnerBox").classList.add("hidden");
      document.getElementById("testResultBox").classList.remove("hidden");
      this.renderResultDashboard(this.testState.userResult);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  loadSavedResultView() {
    this.showSavedResult();
  }

  updateUserNavbarBadge(typeCode) {
    const badge = document.getElementById("userMbtiBadge");
    const text = document.getElementById("userMbtiText");
    if (badge && text && typeCode) {
      text.textContent = typeCode;
      badge.classList.remove("hidden");
    }
  }

  jumpToMatrixWithType(typeCode) {
    this.switchTab("matrix");
    this.switchMatrixView("perspective");
    const select = document.getElementById("perspectiveTypeSelect");
    if (select) {
      select.value = typeCode;
      this.renderPerspectiveList(typeCode);
    }
  }

  jumpToGeneratorWithType(typeCode) {
    this.switchTab("generator");
    const selA = document.getElementById("selectTypeA");
    if (selA) {
      selA.value = typeCode;
      this.onTypeAChange(typeCode);
    }
  }

  /* ==================== 2. 16型人格百科业务 ==================== */
  renderEncyclopedia(filterTemp = "ALL", searchQuery = "") {
    const grid = document.getElementById("profilesGrid");
    if (!grid) return;

    grid.innerHTML = "";
    const types = Object.keys(MBTI_DATA.profiles);

    types.forEach(code => {
      const p = MBTI_DATA.profiles[code];
      if (filterTemp !== "ALL" && p.temperament !== filterTemp) return;

      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const match = code.toLowerCase().includes(q) ||
                      p.name.toLowerCase().includes(q) ||
                      p.title.toLowerCase().includes(q) ||
                      p.celebrities.some(c => c.toLowerCase().includes(q));
        if (!match) return;
      }

      const tempInfo = MBTI_DATA.temperaments[p.temperament];

      const card = document.createElement("div");
      card.className = "profile-card";
      card.onclick = () => this.openProfileModal(code);

      card.innerHTML = `
        <div class="p-header">
          <div class="p-code" style="color: ${p.color};">${p.code}</div>
          <span class="p-badge" style="background: ${tempInfo.bg}; color: ${tempInfo.border}; border: 1px solid ${tempInfo.border};">
            ${tempInfo.name.split("/")[0]}
          </span>
        </div>
        <div class="p-name">${p.name}</div>
        <div class="p-title">${p.title}</div>
        <div class="p-stack-preview">
          ${p.stack.map(st => `<span class="stack-tag">${st}</span>`).join('')}
        </div>
        <div class="p-quote">"${p.quote}"</div>
        <div class="p-actions">
          <button class="btn btn-xs btn-outline btn-block" onclick="event.stopPropagation(); app.openProfileModal('${code}')">
            深入阅读档案 →
          </button>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  filterProfiles(temp) {
    this.playSound("click");
    document.querySelectorAll("#temperamentFilterPills .filter-pill").forEach(p => {
      p.classList.toggle("active", p.dataset.temp === temp);
    });
    const searchVal = document.getElementById("profileSearchInput").value;
    this.renderEncyclopedia(temp, searchVal);
  }

  filterEncyclopedia(temp) {
    this.switchTab("encyclopedia");
    this.filterProfiles(temp);
  }

  searchProfiles(val) {
    const clearBtn = document.getElementById("clearSearchBtn");
    if (clearBtn) {
      clearBtn.classList.toggle("hidden", !val);
    }
    const activePill = document.querySelector("#temperamentFilterPills .filter-pill.active");
    const temp = activePill ? activePill.dataset.temp : "ALL";
    this.renderEncyclopedia(temp, val.trim());
  }

  clearProfileSearch() {
    const input = document.getElementById("profileSearchInput");
    if (input) {
      input.value = "";
      this.searchProfiles("");
    }
  }

  openProfileModal(code) {
    this.playSound("click");
    const p = MBTI_DATA.profiles[code];
    if (!p) return;

    const modalBody = document.getElementById("profileModalBody");
    const backdrop = document.getElementById("profileModalBackdrop");
    const tempInfo = MBTI_DATA.temperaments[p.temperament];

    modalBody.innerHTML = `
      <div style="text-align: center; margin-bottom: 2rem;">
        <span class="p-badge" style="background: ${tempInfo.bg}; color: ${tempInfo.border}; font-size: 0.85rem; padding: 0.3rem 0.8rem;">
          ${tempInfo.name} · ${tempInfo.title}
        </span>
        <h2 style="font-size: 3rem; font-weight: 900; color: ${p.color}; margin: 0.5rem 0 0.2rem 0;">${p.code} · ${p.name}</h2>
        <div style="font-size: 1.15rem; color: var(--text-secondary);">${p.title}</div>
        <div style="margin-top: 0.5rem; font-size: 0.95rem; color: var(--text-muted);">图腾物象：${p.totem}</div>
      </div>

      <div style="background: rgba(255, 255, 255, 0.04); border-left: 4px solid ${p.color}; padding: 1rem 1.5rem; margin-bottom: 2rem; border-radius: var(--radius-sm); font-style: italic;">
        "${p.quote}"
      </div>

      <div style="margin-bottom: 2rem;">
        <h3 style="font-size: 1.25rem; font-weight: 800; margin-bottom: 0.8rem;">核心精神与世界观底层</h3>
        <p style="font-size: 1rem; color: var(--text-secondary); line-height: 1.8;">${p.overview}</p>
      </div>

      <div style="margin-bottom: 2rem;">
        <h3 style="font-size: 1.25rem; font-weight: 800; margin-bottom: 0.8rem;">八大认知功能栈拆解</h3>
        <p style="font-size: 0.95rem; color: var(--text-muted); margin-bottom: 1rem;">${p.stackDesc}</p>
        <div class="stack-grid">
          ${p.stack.map((func, idx) => {
            const roles = ["主导功能 (Dominant)", "辅助功能 (Auxiliary)", "第三功能 (Tertiary)", "劣势功能 (Inferior)"];
            const fInfo = MBTI_DATA.cognitiveFunctions[func];
            return `
              <div class="stack-item">
                <div class="stack-role">${roles[idx]}</div>
                <div class="stack-code" style="color: ${p.color};">${func}</div>
                <div class="stack-name">${fInfo ? fInfo.name : ''}</div>
                <div class="stack-desc">${fInfo ? fInfo.desc : ''}</div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <div class="result-cards-grid" style="margin-bottom: 2rem;">
        <div class="info-card">
          <div class="card-title" style="color: #10b981;">🚀 核心三大降维优势</div>
          ${p.strengths.map(s => `<div class="bullet-item"><div class="bullet-title">✦ ${s.title}</div><div class="bullet-desc">${s.desc}</div></div>`).join('')}
        </div>
        <div class="info-card">
          <div class="card-title" style="color: #f43f5e;">⚠️ 真实致命盲区与弱点</div>
          ${p.weaknesses.map(w => `<div class="bullet-item"><div class="bullet-title">✦ ${w.title}</div><div class="bullet-desc">${w.desc}</div></div>`).join('')}
        </div>
      </div>

      <div class="info-card" style="margin-bottom: 2rem; border-left: 4px solid #f59e0b;">
        <div class="card-title" style="color: #f59e0b;">🌪️ ${p.stressGrip.title}</div>
        <div class="bullet-desc">${p.stressGrip.desc}</div>
      </div>

      <div class="result-cards-grid" style="margin-bottom: 2rem;">
        <div class="info-card">
          <div class="card-title" style="color: #3b82f6;">💰 职场搞钱指南</div>
          <div style="display: flex; gap: 0.4rem; flex-wrap: wrap; margin-bottom: 0.8rem;">
            ${p.career.tags.map(t => `<span class="stack-tag" style="background: rgba(59, 130, 246, 0.15); color: #60a5fa;">#${t}</span>`).join('')}
          </div>
          <p style="font-size: 0.9rem; margin-bottom: 0.5rem;"><strong>最适环境：</strong>${p.career.bestEnv}</p>
          <p style="font-size: 0.9rem;"><strong>避坑环境：</strong>${p.career.badEnv}</p>
        </div>

        <div class="info-card">
          <div class="card-title" style="color: #ec4899;">💘 恋爱观与亲密模式</div>
          <p style="font-size: 0.9rem; margin-bottom: 0.5rem;"><strong>恋爱模式：</strong>${p.love.pattern}</p>
          <p style="font-size: 0.9rem; margin-bottom: 0.5rem;"><strong>容易被谁吸引：</strong>${p.love.attractedBy}</p>
          <p style="font-size: 0.9rem;"><strong>相处大忌：</strong>${p.love.taboos}</p>
        </div>
      </div>

      <div class="info-card" style="margin-bottom: 2rem;">
        <div class="card-title" style="color: #8b5cf6;">🌱 进阶成长蜕变建议</div>
        ${p.growthAdvice.map((adv, i) => `<div class="bullet-item"><div class="bullet-title">建议 0${i + 1}：</div><div class="bullet-desc">${adv}</div></div>`).join('')}
      </div>

      <div style="margin-bottom: 2rem;">
        <h4 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 0.75rem;">🎭 代表人物与经典角色</h4>
        <div style="display: flex; gap: 0.6rem; flex-wrap: wrap;">
          ${p.celebrities.map(c => `<span class="stat-pill" style="padding: 0.4rem 0.9rem; font-size: 0.85rem;">${c}</span>`).join('')}
        </div>
      </div>

      <div style="display: flex; justify-content: center; gap: 1rem; border-top: 1px solid var(--border-color); padding-top: 1.5rem;">
        <button class="btn btn-primary" onclick="app.closeProfileModal(); app.jumpToGeneratorWithType('${p.code}')">
          测算与 ${p.code} 的契合度 →
        </button>
        <button class="btn btn-outline" onclick="app.closeProfileModal(); app.jumpToMatrixWithType('${p.code}')">
          查看全部关系榜单 →
        </button>
      </div>
    `;

    backdrop.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  closeProfileModal(e) {
    const backdrop = document.getElementById("profileModalBackdrop");
    if (backdrop) {
      backdrop.classList.add("hidden");
      document.body.style.overflow = "";
    }
  }

  /* ==================== 3. 16×16 全关系矩阵业务 ==================== */
  renderMatrixTable() {
    const table = document.getElementById("mbtiMatrixTable");
    if (!table) return;

    table.innerHTML = "";
    const types = Object.keys(MBTI_DATA.profiles);

    // 1. 表头行 (第一行为列标题)
    const thead = document.createElement("thead");
    const headRow = document.createElement("tr");

    // 左上角角标
    const cornerTh = document.createElement("th");
    cornerTh.className = "matrix-th-corner";
    cornerTh.textContent = "A \\ B";
    headRow.appendChild(cornerTh);

    types.forEach(b => {
      const th = document.createElement("th");
      th.className = "matrix-th";
      th.textContent = b;
      th.style.color = MBTI_DATA.profiles[b].color;
      headRow.appendChild(th);
    });
    thead.appendChild(headRow);
    table.appendChild(thead);

    // 2. 表体行
    const tbody = document.createElement("tbody");

    types.forEach(a => {
      const tr = document.createElement("tr");

      // 行首标题 (Type A)
      const rowTh = document.createElement("th");
      rowTh.className = "matrix-th-row";
      rowTh.textContent = a;
      rowTh.style.color = MBTI_DATA.profiles[a].color;
      tr.appendChild(rowTh);

      // 16 列单元格
      types.forEach(b => {
        const td = document.createElement("td");
        td.className = "matrix-cell";

        const pairData = MBTI_DATA.calculatePairDynamics(a, b, "couple");
        td.dataset.score = pairData.score;
        td.dataset.tier = pairData.tier.level;
        td.dataset.a = a;
        td.dataset.b = b;

        // 根据等级染色
        const tier = pairData.tier.level;
        if (a === b) {
          td.classList.add("same");
          td.textContent = `${pairData.score}`;
        } else if (tier === 1) {
          td.style.backgroundColor = "rgba(236, 72, 153, 0.25)";
          td.style.color = "#f472b6";
          td.innerHTML = `💖<br>${pairData.score}`;
        } else if (tier === 2) {
          td.style.backgroundColor = "rgba(16, 185, 129, 0.22)";
          td.style.color = "#34d399";
          td.innerHTML = `🌟<br>${pairData.score}`;
        } else if (tier === 3) {
          td.style.backgroundColor = "rgba(59, 130, 246, 0.18)";
          td.style.color = "#60a5fa";
          td.innerHTML = `🤝<br>${pairData.score}`;
        } else if (tier === 4) {
          td.style.backgroundColor = "rgba(245, 158, 11, 0.18)";
          td.style.color = "#fbbf24";
          td.innerHTML = `⚡<br>${pairData.score}`;
        } else {
          td.style.backgroundColor = "rgba(148, 163, 184, 0.12)";
          td.style.color = "#94a3b8";
          td.innerHTML = `❄️<br>${pairData.score}`;
        }

        td.title = `${a} × ${b}：${pairData.score}分 (${pairData.tier.badge})`;
        td.onclick = () => this.openMiniChemistryModal(a, b);

        tr.appendChild(td);
      });

      tbody.appendChild(tr);
    });

    table.appendChild(tbody);
  }

  switchMatrixView(view) {
    this.playSound("click");
    this.matrixState.viewMode = view;

    document.getElementById("btnMatrixAll").classList.toggle("active", view === "grid");
    document.getElementById("btnMatrixPerspective").classList.toggle("active", view === "perspective");

    document.getElementById("matrixTableWrap").classList.toggle("hidden", view !== "grid");
    document.getElementById("perspectiveViewWrap").classList.toggle("hidden", view !== "perspective");
    document.getElementById("perspectiveSelectWrap").classList.toggle("hidden", view !== "perspective");

    if (view === "perspective") {
      // 填充下拉选项
      const select = document.getElementById("perspectiveTypeSelect");
      if (select.children.length === 0) {
        Object.keys(MBTI_DATA.profiles).forEach(t => {
          const opt = document.createElement("option");
          opt.value = t;
          opt.textContent = `${t} - ${MBTI_DATA.profiles[t].name}`;
          select.appendChild(opt);
        });
      }
      const myType = this.testState.userResult ? this.testState.userResult.type : "INTJ";
      select.value = myType;
      this.renderPerspectiveList(myType);
    }
  }

  renderPerspectiveList(mainType) {
    const hero = document.getElementById("perspectiveHero");
    const grid = document.getElementById("perspectiveRanksGrid");
    if (!hero || !grid) return;

    const prof = MBTI_DATA.profiles[mainType];
    const types = Object.keys(MBTI_DATA.profiles).filter(t => t !== mainType);

    // 计算 mainType 与其余 15 个类型的契合度并排序
    const list = types.map(target => {
      const pair = MBTI_DATA.calculatePairDynamics(mainType, target, "couple");
      return {
        target,
        targetProf: MBTI_DATA.profiles[target],
        pair
      };
    }).sort((a, b) => b.pair.score - a.pair.score);

    hero.innerHTML = `
      <div>
        <span class="p-badge" style="background: rgba(139, 92, 246, 0.15); color: ${prof.color};">主视角人格档案</span>
        <h3 style="font-size: 2rem; font-weight: 800; color: ${prof.color}; margin: 0.4rem 0 0.2rem 0;">${prof.code} · ${prof.name}</h3>
        <p style="color: var(--text-secondary);">${prof.title} · ${prof.totem}</p>
      </div>
      <div style="text-align: right;">
        <span style="font-size: 0.85rem; color: var(--text-muted);">黄金天配：</span>
        <div style="font-size: 1.2rem; font-weight: 800; color: #ec4899;">
          ${list[0].target} (${list[0].targetProf.name}) · ${list[0].pair.score}分
        </div>
      </div>
    `;

    grid.innerHTML = "";
    list.forEach((item, idx) => {
      const card = document.createElement("div");
      card.className = "rank-card";
      card.onclick = () => {
        this.generatorState.typeA = mainType;
        this.generatorState.typeB = item.target;
        this.switchTab("generator");
        document.getElementById("selectTypeA").value = mainType;
        document.getElementById("selectTypeB").value = item.target;
        this.onTypeAChange(mainType);
        this.onTypeBChange(item.target);
        this.generateDynamicReport();
      };

      card.innerHTML = `
        <div class="rank-header">
          <span class="rank-order"># TOP ${idx + 1}</span>
          <span class="rank-score" style="color: ${item.pair.tier.color};">${item.pair.score}分</span>
        </div>
        <div class="rank-target-type" style="color: ${item.targetProf.color};">
          ${item.target} · ${item.targetProf.name}
        </div>
        <div class="rank-target-archetype">${item.pair.archetypeTitle}</div>
        <div class="legend-badge" style="background: ${item.pair.tier.color}20; color: ${item.pair.tier.color}; margin-bottom: 0.75rem;">
          ${item.pair.tier.badge}
        </div>
        <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 0.8rem;">
          ${item.pair.tier.summary}
        </p>
        <button class="btn btn-xs btn-outline btn-block">查看深度动力学报告 →</button>
      `;

      grid.appendChild(card);
    });
  }

  filterMatrixTier(tierLevel) {
    this.playSound("click");
    this.matrixState.tierFilter = tierLevel;
    const resetBtn = document.getElementById("resetMatrixFilterBtn");
    if (resetBtn) resetBtn.style.display = "inline-block";

    document.querySelectorAll(".mbti-matrix-table td.matrix-cell").forEach(cell => {
      const cTier = parseInt(cell.dataset.tier);
      if (cell.classList.contains("same")) {
        cell.style.opacity = "0.2";
      } else if (cTier === tierLevel) {
        cell.style.opacity = "1";
        cell.style.transform = "scale(1.05)";
      } else {
        cell.style.opacity = "0.15";
        cell.style.transform = "scale(1)";
      }
    });
  }

  resetMatrixTierFilter() {
    this.playSound("click");
    this.matrixState.tierFilter = null;
    const resetBtn = document.getElementById("resetMatrixFilterBtn");
    if (resetBtn) resetBtn.style.display = "none";

    document.querySelectorAll(".mbti-matrix-table td.matrix-cell").forEach(cell => {
      cell.style.opacity = "1";
      cell.style.transform = "scale(1)";
    });
  }

  openMiniChemistryModal(a, b) {
    this.playSound("click");
    const pair = MBTI_DATA.calculatePairDynamics(a, b, "couple");
    if (!pair) return;

    const modal = document.getElementById("miniChemistryModal");
    const body = document.getElementById("miniChemistryBody");

    body.innerHTML = `
      <div style="text-align: center; margin-bottom: 1.5rem;">
        <span class="legend-badge" style="background: ${pair.tier.color}20; color: ${pair.tier.color}; font-size: 0.85rem;">
          ${pair.tier.badge}
        </span>
        <h3 style="font-size: 2.2rem; font-weight: 900; margin: 0.5rem 0 0.2rem 0;">
          <span style="color: ${pair.profA.color};">${a}</span> × <span style="color: ${pair.profB.color};">${b}</span>
        </h3>
        <div style="font-size: 1.1rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.3rem;">
          ${pair.archetypeTitle}
        </div>
        <div style="font-size: 2.5rem; font-weight: 900; color: ${pair.tier.color}; margin: 0.5rem 0;">
          ${pair.score} <span style="font-size: 1.2rem; font-weight: 600;">综合契合分</span>
        </div>
      </div>

      <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.5rem;">
        ${pair.tier.summary}
      </p>

      <div style="background: rgba(255, 255, 255, 0.04); border-radius: var(--radius-sm); padding: 1rem; margin-bottom: 1.5rem; font-size: 0.88rem; line-height: 1.6;">
        ${pair.sparkMoments[0]}
      </div>

      <div style="display: flex; gap: 0.8rem;">
        <button class="btn btn-primary btn-block" onclick="app.closeMiniChemistryModal(); app.jumpToGeneratorWithPair('${a}', '${b}')">
          ✨ 查看全场景深度报告
        </button>
      </div>
    `;

    modal.classList.remove("hidden");
  }

  closeMiniChemistryModal() {
    const modal = document.getElementById("miniChemistryModal");
    if (modal) modal.classList.add("hidden");
  }

  jumpToGeneratorWithPair(a, b) {
    this.switchTab("generator");
    document.getElementById("selectTypeA").value = a;
    document.getElementById("selectTypeB").value = b;
    this.onTypeAChange(a);
    this.onTypeBChange(b);
    this.generateDynamicReport();
  }

  /* ==================== 4. 专属 MBTI 组合动力学生成器 ==================== */
  setupGeneratorSelectors() {
    const selA = document.getElementById("selectTypeA");
    const selB = document.getElementById("selectTypeB");
    if (!selA || !selB) return;

    selA.innerHTML = "";
    selB.innerHTML = "";

    Object.keys(MBTI_DATA.profiles).forEach(t => {
      const p = MBTI_DATA.profiles[t];
      const optA = document.createElement("option");
      optA.value = t;
      optA.textContent = `${t} - ${p.name}`;
      selA.appendChild(optA);

      const optB = document.createElement("option");
      optB.value = t;
      optB.textContent = `${t} - ${p.name}`;
      selB.appendChild(optB);
    });

    selA.value = this.generatorState.typeA;
    selB.value = this.generatorState.typeB;

    this.onTypeAChange(this.generatorState.typeA);
    this.onTypeBChange(this.generatorState.typeB);
  }

  onTypeAChange(typeCode) {
    this.generatorState.typeA = typeCode;
    const p = MBTI_DATA.profiles[typeCode];
    const prev = document.getElementById("previewA");
    if (prev && p) {
      prev.innerHTML = `
        <div style="font-size: 1.3rem; font-weight: 900; color: ${p.color};">${p.code} · ${p.name}</div>
        <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.4rem;">${p.title}</div>
        <div style="font-size: 0.75rem; color: var(--text-secondary);">${p.totem}</div>
      `;
    }
  }

  onTypeBChange(typeCode) {
    this.generatorState.typeB = typeCode;
    const p = MBTI_DATA.profiles[typeCode];
    const prev = document.getElementById("previewB");
    if (prev && p) {
      prev.innerHTML = `
        <div style="font-size: 1.3rem; font-weight: 900; color: ${p.color};">${p.code} · ${p.name}</div>
        <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.4rem;">${p.title}</div>
        <div style="font-size: 0.75rem; color: var(--text-secondary);">${p.totem}</div>
      `;
    }
  }

  setScenario(scenarioKey) {
    this.playSound("click");
    this.generatorState.scenario = scenarioKey;
    document.querySelectorAll("#scenarioButtons .scenario-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.scenario === scenarioKey);
    });
    this.generateDynamicReport();
  }

  importUserTypeToA() {
    if (this.testState.userResult) {
      const type = this.testState.userResult.type;
      document.getElementById("selectTypeA").value = type;
      this.onTypeAChange(type);
      this.playSound("click");
      this.showToast(`已成功将您的MBTI (${type}) 填入为 Person A！`);
      this.generateDynamicReport();
    } else {
      this.showToast("您尚未完成测评，快去完成测试获取专属结果吧！");
    }
  }

  pickGoldenForA() {
    this.playSound("click");
    const a = this.generatorState.typeA;
    // 寻找 a 的黄金搭档
    const goldenPair = MBTI_DATA.compatibilityRules.goldenPairs.find(p => p[0] === a);
    if (goldenPair) {
      const goldenTarget = goldenPair[1];
      document.getElementById("selectTypeB").value = goldenTarget;
      this.onTypeBChange(goldenTarget);
      this.showToast(`已为您匹配 ${a} 的官方黄金天配：${goldenTarget}！`);
      this.generateDynamicReport();
    }
  }

  randomPair() {
    this.playSound("select");
    const keys = Object.keys(MBTI_DATA.profiles);
    const randA = keys[Math.floor(Math.random() * keys.length)];
    let randB = keys[Math.floor(Math.random() * keys.length)];
    while (randB === randA) {
      randB = keys[Math.floor(Math.random() * keys.length)];
    }

    document.getElementById("selectTypeA").value = randA;
    document.getElementById("selectTypeB").value = randB;
    this.onTypeAChange(randA);
    this.onTypeBChange(randB);
    this.generateDynamicReport();
    this.showToast(`🎲 已随机翻开组合：${randA} × ${randB}！`);
  }

  quickPreset(a, b, scenario = "couple") {
    this.playSound("click");
    document.getElementById("selectTypeA").value = a;
    document.getElementById("selectTypeB").value = b;
    this.onTypeAChange(a);
    this.onTypeBChange(b);
    this.setScenario(scenario);
  }

  generateDynamicReport() {
    this.playSound("finish");
    const { typeA, typeB, scenario } = this.generatorState;
    const report = MBTI_DATA.calculatePairDynamics(typeA, typeB, scenario);
    if (!report) return;

    this.currentReport = report;
    const container = document.getElementById("dynamicReportContainer");
    if (!container) return;

    const m = report.metrics;

    container.innerHTML = `
      <div class="report-hero-card">
        <span class="report-scenario-badge">
          ${report.scenario.icon} ${report.scenario.name} 深度动力学剖析
        </span>
        <div class="report-archetype-title">
          <span style="color: ${report.profA.color};">${typeA} (${report.profA.name})</span>
          ×
          <span style="color: ${report.profB.color};">${typeB} (${report.profB.name})</span>
        </div>
        <div style="font-size: 1.3rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.8rem;">
          ${report.archetypeTitle}
        </div>
        <div class="legend-badge" style="background: ${report.tier.color}20; color: ${report.tier.color}; font-size: 0.95rem; padding: 0.4rem 1.2rem; margin-bottom: 1.5rem;">
          ${report.tier.badge}
        </div>
        <div class="report-score-ring">
          ${report.score} <span style="font-size: 1.5rem; font-weight: 700;">分</span>
        </div>
        <p style="font-size: 1.05rem; color: var(--text-secondary); max-width: 750px; margin: 0 auto; line-height: 1.7;">
          ${report.tier.summary}
        </p>

        <!-- 4维动态仪表盘 -->
        <div class="report-metrics-row">
          <div class="metric-gauge-card">
            <div class="metric-name">💖 心灵共鸣度</div>
            <div class="metric-num" style="color: #ec4899;">${m.resonance}%</div>
            <div class="mini-gauge-track"><div class="mini-gauge-fill" style="width: ${m.resonance}%; background: #ec4899;"></div></div>
          </div>
          <div class="metric-gauge-card">
            <div class="metric-name">🗣️ 沟通顺畅度</div>
            <div class="metric-num" style="color: #3b82f6;">${m.communication}%</div>
            <div class="mini-gauge-track"><div class="mini-gauge-fill" style="width: ${m.communication}%; background: #3b82f6;"></div></div>
          </div>
          <div class="metric-gauge-card">
            <div class="metric-name">🚀 现实推进力</div>
            <div class="metric-num" style="color: #10b981;">${m.execution}%</div>
            <div class="mini-gauge-track"><div class="mini-gauge-fill" style="width: ${m.execution}%; background: #10b981;"></div></div>
          </div>
          <div class="metric-gauge-card">
            <div class="metric-name">🛡️ 长期稳定性</div>
            <div class="metric-num" style="color: #f59e0b;">${m.stability}%</div>
            <div class="mini-gauge-track"><div class="mini-gauge-fill" style="width: ${m.stability}%; background: #f59e0b;"></div></div>
          </div>
        </div>
      </div>

      <!-- 报告四大核心章节 -->
      <div class="report-sections-grid">
        <!-- 合拍时刻 -->
        <div class="info-card">
          <div class="card-title" style="color: #10b981;">
            <span class="card-icon">✨</span> 绝配时刻：高光合拍日常
          </div>
          ${report.sparkMoments.map(m => `
            <div class="bullet-item">
              <div class="bullet-desc">${m}</div>
            </div>
          `).join('')}
        </div>

        <!-- 潜在暗礁与踩雷 -->
        <div class="info-card">
          <div class="card-title" style="color: #f43f5e;">
            <span class="card-icon">⚠️</span> 潜在暗礁：高频冲突雷区
          </div>
          ${report.conflictTriggers.map(c => `
            <div class="bullet-item">
              <div class="bullet-desc">${c}</div>
            </div>
          `).join('')}
        </div>

        <!-- 给 A 的相处法则 -->
        <div class="info-card">
          <div class="card-title" style="color: ${report.profA.color};">
            <span class="card-icon">💡</span> 给 ${typeA} (${report.profA.name}) 的相处秘籍
          </div>
          ${report.adviceForA.map((a, idx) => `
            <div class="bullet-item">
              <div class="bullet-title">法则 0${idx + 1}：</div>
              <div class="bullet-desc">${a}</div>
            </div>
          `).join('')}
        </div>

        <!-- 给 B 的相处法则 -->
        <div class="info-card">
          <div class="card-title" style="color: ${report.profB.color};">
            <span class="card-icon">💡</span> 给 ${typeB} (${report.profB.name}) 的相处秘籍
          </div>
          ${report.adviceForB.map((b, idx) => `
            <div class="bullet-item">
              <div class="bullet-title">法则 0${idx + 1}：</div>
              <div class="bullet-desc">${b}</div>
            </div>
          `).join('')}
        </div>

        <!-- 火警停火协议 -->
        <div class="ceasefire-card">
          <div class="card-title" style="color: #ef4444; margin-bottom: 0.75rem;">
            <span class="card-icon">🚨</span> 双方紧急【火警停火协定】
          </div>
          <p style="font-size: 1.05rem; line-height: 1.8; color: var(--text-primary);">
            ${report.ceasefireRule}
          </p>
        </div>
      </div>
    `;
  }

  /* ==================== 5. 人格双人对比台 ==================== */
  setupComparator() {
    const sel1 = document.getElementById("compareSelect1");
    const sel2 = document.getElementById("compareSelect2");
    if (!sel1 || !sel2) return;

    sel1.innerHTML = "";
    sel2.innerHTML = "";

    Object.keys(MBTI_DATA.profiles).forEach(t => {
      const p = MBTI_DATA.profiles[t];
      const opt1 = document.createElement("option");
      opt1.value = t;
      opt1.textContent = `${t} - ${p.name}`;
      sel1.appendChild(opt1);

      const opt2 = document.createElement("option");
      opt2.value = t;
      opt2.textContent = `${t} - ${p.name}`;
      sel2.appendChild(opt2);
    });

    sel1.value = this.comparatorState.type1;
    sel2.value = this.comparatorState.type2;
    this.renderComparison();
  }

  renderComparison() {
    const sel1 = document.getElementById("compareSelect1");
    const sel2 = document.getElementById("compareSelect2");
    if (!sel1 || !sel2) return;

    const t1 = sel1.value;
    const t2 = sel2.value;
    const p1 = MBTI_DATA.profiles[t1];
    const p2 = MBTI_DATA.profiles[t2];
    const wrap = document.getElementById("comparisonTableWrap");
    if (!wrap || !p1 || !p2) return;

    wrap.innerHTML = `
      <table class="compare-table">
        <thead>
          <tr>
            <th class="compare-col-feature">对比维度</th>
            <th class="compare-col-a" style="color: ${p1.color}; font-size: 1.3rem;">
              ${p1.code} · ${p1.name}
            </th>
            <th class="compare-col-b" style="color: ${p2.color}; font-size: 1.3rem;">
              ${p2.code} · ${p2.name}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="compare-col-feature">气质类型</td>
            <td>${MBTI_DATA.temperaments[p1.temperament].name}</td>
            <td>${MBTI_DATA.temperaments[p2.temperament].name}</td>
          </tr>
          <tr>
            <td class="compare-col-feature">精神图腾</td>
            <td>${p1.totem}</td>
            <td>${p2.totem}</td>
          </tr>
          <tr>
            <td class="compare-col-feature">八维功能栈</td>
            <td><strong>${p1.stack.join(" · ")}</strong><br><span style="font-size: 0.85rem; color: var(--text-muted);">${p1.stackDesc}</span></td>
            <td><strong>${p2.stack.join(" · ")}</strong><br><span style="font-size: 0.85rem; color: var(--text-muted);">${p2.stackDesc}</span></td>
          </tr>
          <tr>
            <td class="compare-col-feature">三大核心优势</td>
            <td>
              ${p1.strengths.map(s => `<p style="margin-bottom: 0.4rem;"><strong>✦ ${s.title}</strong></p>`).join('')}
            </td>
            <td>
              ${p2.strengths.map(s => `<p style="margin-bottom: 0.4rem;"><strong>✦ ${s.title}</strong></p>`).join('')}
            </td>
          </tr>
          <tr>
            <td class="compare-col-feature">主要弱点与盲区</td>
            <td>
              ${p1.weaknesses.map(w => `<p style="margin-bottom: 0.4rem;"><strong>⚠️ ${w.title}</strong></p>`).join('')}
            </td>
            <td>
              ${p2.weaknesses.map(w => `<p style="margin-bottom: 0.4rem;"><strong>⚠️ ${w.title}</strong></p>`).join('')}
            </td>
          </tr>
          <tr>
            <td class="compare-col-feature">高压黑化状态</td>
            <td>${p1.stressGrip.title}</td>
            <td>${p2.stressGrip.title}</td>
          </tr>
          <tr>
            <td class="compare-col-feature">职场最适跑道</td>
            <td>${p1.career.tags.join(" · ")}</td>
            <td>${p2.career.tags.join(" · ")}</td>
          </tr>
        </tbody>
      </table>
    `;
  }

  /* ==================== 6. HTML5 Canvas 高清长图卡片生成 ==================== */
  openShareCardModal() {
    this.playSound("click");
    const res = this.testState.userResult;
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
    const prof = result.profile;
    const p = result.percentages;

    const w = 800;
    const h = 1100;
    canvas.width = w;
    canvas.height = h;

    // 背景渐变
    const bgGrad = ctx.createLinearGradient(0, 0, w, h);
    bgGrad.addColorStop(0, "#090d16");
    bgGrad.addColorStop(0.5, "#0f172a");
    bgGrad.addColorStop(1, "#1a103c");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // 装饰光晕
    ctx.save();
    ctx.beginPath();
    ctx.arc(100, 100, 200, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(124, 58, 237, 0.15)";
    ctx.filter = "blur(60px)";
    ctx.fill();
    ctx.restore();

    // 边框
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.lineWidth = 2;
    ctx.strokeRect(30, 30, w - 60, h - 60);

    // 顶部 Logo
    ctx.font = "bold 22px system-ui";
    ctx.fillStyle = "#8b5cf6";
    ctx.textAlign = "center";
    ctx.fillText("🔮 MBTI 深度实验室 · 个人专属人格诊断报告", w / 2, 85);

    // 类型大字
    ctx.font = "900 84px system-ui";
    ctx.fillStyle = prof.color || "#ffffff";
    ctx.fillText(prof.code, w / 2, 195);

    // 称号与名
    ctx.font = "bold 32px system-ui";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`${prof.name} · ${prof.title}`, w / 2, 245);

    // 图腾
    ctx.font = "18px system-ui";
    ctx.fillStyle = "#94a3b8";
    ctx.fillText(`精神图腾：${prof.totem}`, w / 2, 285);

    // 金句框
    ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
    ctx.fillRect(80, 320, w - 160, 70);
    ctx.fillStyle = "#cbd5e1";
    ctx.font = "italic 16px system-ui";
    ctx.fillText(`"${prof.quote}"`, w / 2, 360);

    // 四维倾向横条
    ctx.textAlign = "left";
    ctx.font = "bold 20px system-ui";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("四维倾向诊断雷达：", 80, 440);

    const dims = [
      { name: "精力来源", l: `E (${p.EI.leftPct}%)`, r: `I (${p.EI.rightPct}%)`, lp: p.EI.leftPct, colorL: "#f59e0b", colorR: "#6366f1" },
      { name: "信息感知", l: `S (${p.SN.leftPct}%)`, r: `N (${p.SN.rightPct}%)`, lp: p.SN.leftPct, colorL: "#10b981", colorR: "#8b5cf6" },
      { name: "决策逻辑", l: `T (${p.TF.leftPct}%)`, r: `F (${p.TF.rightPct}%)`, lp: p.TF.leftPct, colorL: "#3b82f6", colorR: "#ec4899" },
      { name: "生活步调", l: `J (${p.JP.leftPct}%)`, r: `P (${p.JP.rightPct}%)`, lp: p.JP.leftPct, colorL: "#06b6d4", colorR: "#f97316" }
    ];

    let startY = 475;
    dims.forEach(d => {
      ctx.font = "bold 15px system-ui";
      ctx.fillStyle = d.colorL;
      ctx.fillText(d.l, 80, startY);

      ctx.fillStyle = "#94a3b8";
      ctx.textAlign = "center";
      ctx.fillText(d.name, w / 2, startY);

      ctx.textAlign = "right";
      ctx.fillStyle = d.colorR;
      ctx.fillText(d.r, w - 80, startY);

      // 进度条背景
      ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
      ctx.fillRect(80, startY + 8, w - 160, 10);

      // 进度条填充
      const fillW = ((w - 160) * d.lp) / 100;
      ctx.fillStyle = d.colorL;
      ctx.fillRect(80, startY + 8, fillW, 10);
      ctx.fillStyle = d.colorR;
      ctx.fillRect(80 + fillW, startY + 8, w - 160 - fillW, 10);

      startY += 55;
      ctx.textAlign = "left";
    });

    // 认知功能栈
    ctx.font = "bold 20px system-ui";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("八维认知功能栈：", 80, 725);
    ctx.font = "16px system-ui";
    ctx.fillStyle = "#a78bfa";
    ctx.fillText(prof.stackDesc, 80, 755);

    // 核心优势
    ctx.font = "bold 20px system-ui";
    ctx.fillStyle = "#10b981";
    ctx.fillText("核心优势：", 80, 810);
    prof.strengths.slice(0, 2).forEach((s, i) => {
      ctx.font = "bold 16px system-ui";
      ctx.fillStyle = "#ffffff";
      ctx.fillText(`✦ ${s.title}`, 80, 840 + i * 55);
      ctx.font = "14px system-ui";
      ctx.fillStyle = "#94a3b8";
      ctx.fillText(s.desc.slice(0, 48) + "...", 80, 862 + i * 55);
    });

    // 底部水印与二维码指引
    ctx.textAlign = "center";
    ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
    ctx.font = "14px system-ui";
    ctx.fillText("MBTI 深度实验室 · 扫码或访问体验更多人际动力学测算", w / 2, 1040);
  }

  downloadShareCard() {
    this.playSound("click");
    const canvas = document.getElementById("shareCanvas");
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = `MBTI-${this.testState.userResult ? this.testState.userResult.type : 'Result'}-Diagnostic-Card.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    this.showToast("已开始下载您的专属高清卡片！");
  }

  copyReportText() {
    this.playSound("click");
    const res = this.testState.userResult;
    if (!res) return;
    const prof = res.profile;

    const text = `【MBTI 深度人格诊断报告】
👤 人格类型：${prof.code} · ${prof.name} (${prof.title})
精神图腾：${prof.totem}
经典名言："${prof.quote}"

【四维倾向】
· 外向 E (${res.percentages.EI.leftPct}%) vs 内向 I (${res.percentages.EI.rightPct}%)
· 实感 S (${res.percentages.SN.leftPct}%) vs 直觉 N (${res.percentages.SN.rightPct}%)
· 思考 T (${res.percentages.TF.leftPct}%) vs 情感 F (${res.percentages.TF.rightPct}%)
· 判断 J (${res.percentages.JP.leftPct}%) vs 知觉 P (${res.percentages.JP.rightPct}%)

【认知功能栈】
${prof.stack.join(" · ")} (${prof.stackDesc})

【核心优势】
${prof.strengths.map(s => `✦ ${s.title}：${s.desc}`).join("\n")}

【高压黑化警告】
${prof.stressGrip.title}：${prof.stressGrip.desc}

来自：MBTI 深度实验室与关系动力学分析系统`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        this.showToast("已成功复制诊断报告至剪贴板！");
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
    this.showToast("已成功复制诊断报告！");
  }
}

// 实例化并挂载全局
window.app = new MbtiApp();
window.addEventListener("DOMContentLoaded", () => {
  window.app.init();
});
