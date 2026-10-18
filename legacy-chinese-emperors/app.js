/**
 * 华夏万岁 · 中国古代历代帝王名鉴与朝代演进大系
 * 核心交互与应用逻辑 (Core Application Engine)
 */

(function () {
  'use strict';

  // ==================== 1. 应用状态与上下文管理 ====================
  const state = {
    currentView: 'emperors', // 'emperors' | 'timeline' | 'insights'
    selectedDynasty: 'all',
    selectedTag: 'all',
    searchQuery: '',
    filteredEmperors: [],
    currentModalIndex: 0,
    soundEnabled: false,
    audioCtx: null
  };

  // DOM 元素缓存
  const elements = {
    // 视图导航
    siteHeader: document.getElementById('siteHeader'),
    tabEmperors: document.getElementById('tabEmperors'),
    tabTimeline: document.getElementById('tabTimeline'),
    tabInsights: document.getElementById('tabInsights'),
    viewEmperors: document.getElementById('viewEmperors'),
    viewTimeline: document.getElementById('viewTimeline'),
    viewInsights: document.getElementById('viewInsights'),
    navTabs: document.querySelectorAll('.nav-tab-btn'),

    // 统计面板
    statEmperorsCount: document.getElementById('statEmperorsCount'),
    statDynastiesCount: document.getElementById('statDynastiesCount'),
    statBattlesCount: document.getElementById('statBattlesCount'),
    statReformsCount: document.getElementById('statReformsCount'),

    // 搜索与过滤
    searchInput: document.getElementById('searchInput'),
    clearSearchBtn: document.getElementById('clearSearchBtn'),
    dynastyChips: document.querySelectorAll('.dynasty-chip'),
    tagChips: document.querySelectorAll('.tag-chip'),
    resultsCount: document.getElementById('resultsCount'),
    emperorsGrid: document.getElementById('emperorsGrid'),
    emptyState: document.getElementById('emptyState'),
    randomRollBtn: document.getElementById('randomRollBtn'),
    quickRandomBtn: document.getElementById('quickRandomBtn'),

    // 时间轴
    dynastyTimeline: document.getElementById('dynastyTimeline'),
    elevatorLinksList: document.getElementById('elevatorLinksList'),

    // 洞察榜单
    reignRankingList: document.getElementById('reignRankingList'),
    lifespanRankingList: document.getElementById('lifespanRankingList'),
    drawRandomEmperorBtn: document.getElementById('drawRandomEmperorBtn'),
    randomCardImg: document.getElementById('randomCardImg'),
    randomCardPlaceholder: document.getElementById('randomCardPlaceholder'),
    randomCardTitle: document.getElementById('randomCardTitle'),
    randomCardDesc: document.getElementById('randomCardDesc'),

    // 弹窗
    emperorModal: document.getElementById('emperorModal'),
    modalCloseBtn: document.getElementById('modalCloseBtn'),
    modalDynastyTitle: document.getElementById('modalDynastyTitle'),
    modalPortraitImg: document.getElementById('modalPortraitImg'),
    modalPortraitFallback: document.getElementById('modalPortraitFallback'),
    modalFallbackSeal: document.getElementById('modalFallbackSeal'),
    modalFallbackText: document.getElementById('modalFallbackText'),
    modalEmperorName: document.getElementById('modalEmperorName'),
    modalSpecGrid: document.getElementById('modalSpecGrid'),
    modalSummary: document.getElementById('modalSummary'),
    modalAchievementsList: document.getElementById('modalAchievementsList'),
    modalControversiesWrap: document.getElementById('modalControversiesWrap'),
    modalControversiesBox: document.getElementById('modalControversiesBox'),
    modalQuotesWrap: document.getElementById('modalQuotesWrap'),
    modalQuoteBox: document.getElementById('modalQuoteBox'),
    modalAnecdotesWrap: document.getElementById('modalAnecdotesWrap'),
    modalAnecdotes: document.getElementById('modalAnecdotes'),
    modalEvaluationWrap: document.getElementById('modalEvaluationWrap'),
    modalEvaluation: document.getElementById('modalEvaluation'),
    modalPrevBtn: document.getElementById('modalPrevBtn'),
    modalNextBtn: document.getElementById('modalNextBtn'),
    modalIndexIndicator: document.getElementById('modalIndexIndicator'),

    // 通用
    soundToggleBtn: document.getElementById('soundToggleBtn'),
    soundIcon: document.getElementById('soundIcon'),
    backToTopBtn: document.getElementById('backToTopBtn'),
    brandLogo: document.getElementById('brandLogo')
  };

  // ==================== 2. 古琴与编钟音效合成器 (Web Audio API) ====================
  // 零外部文件依赖，纯原生数学波形合成清脆典雅宫廷五音
  function playAncientSound(type = 'bell') {
    if (!state.soundEnabled) return;
    try {
      if (!state.audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        state.audioCtx = new AudioContext();
      }
      if (state.audioCtx.state === 'suspended') {
        state.audioCtx.resume();
      }

      const now = state.audioCtx.currentTime;
      const osc = state.audioCtx.createOscillator();
      const gain = state.audioCtx.createGain();

      if (type === 'bell') {
        // 清脆铜钟清鸣音（宫音阶）
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.exponentialRampToValueAtTime(1046.5, now + 0.1);
        osc.frequency.exponentialRampToValueAtTime(523.25, now + 0.4);

        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

        osc.connect(gain);
        gain.connect(state.audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.65);
      } else if (type === 'pluck') {
        // 古筝拨弦泛音（羽音阶）
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(392.00, now); // G4
        osc.frequency.exponentialRampToValueAtTime(440.00, now + 0.05);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

        osc.connect(gain);
        gain.connect(state.audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.5);
      } else if (type === 'drum') {
        // 宫廷战鼓低沉共鸣
        osc.type = 'sine';
        osc.frequency.setValueAtTime(120, now);
        osc.frequency.exponentialRampToValueAtTime(45, now + 0.25);

        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

        osc.connect(gain);
        gain.connect(state.audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.55);
      }
    } catch (e) {
      console.warn('Audio playback error:', e);
    }
  }

  // ==================== 3. 统计面板与初始计算 ====================
  function initStatistics() {
    if (typeof EMPERORS_DATA === 'undefined' || typeof DYNASTIES_DATA === 'undefined') {
      console.error('Data not loaded!');
      return;
    }

    elements.statEmperorsCount.textContent = EMPERORS_DATA.length;
    elements.statDynastiesCount.textContent = DYNASTIES_DATA.length;

    // 计算战役总数与改革总数
    let totalBattles = 0;
    let totalReforms = 0;
    DYNASTIES_DATA.forEach(d => {
      if (d.battles) totalBattles += d.battles.length;
      if (d.reforms) totalReforms += d.reforms.length;
    });

    elements.statBattlesCount.textContent = totalBattles + '+';
    elements.statReformsCount.textContent = totalReforms + '+';
  }

  // ==================== 4. 帝王画卷筛选与检索核心算法 ====================
  function filterEmperors() {
    const query = state.searchQuery.trim().toLowerCase();
    const dynasty = state.selectedDynasty;
    const tag = state.selectedTag;

    state.filteredEmperors = EMPERORS_DATA.filter(emperor => {
      // 1. 朝代筛选
      if (dynasty !== 'all') {
        if (emperor.dynastyId !== dynasty) return false;
      }

      // 2. 特征标签筛选
      if (tag !== 'all') {
        const matchesTag = emperor.tags && emperor.tags.some(t => t.includes(tag) || tag.includes(t));
        if (!matchesTag) return false;
      }

      // 3. 实时关键词模糊检索（姓名、字、庙号、谥号、年号、朝代、名言、典故、主要生平）
      if (query) {
        const targetText = [
          emperor.name,
          emperor.templeName,
          emperor.posthumousName,
          emperor.eraName,
          emperor.dynastyName,
          emperor.summary,
          emperor.quotes,
          emperor.anecdotes,
          emperor.evaluation,
          (emperor.tags || []).join(' ')
        ].join(' ').toLowerCase();

        if (!targetText.includes(query)) return false;
      }

      return true;
    });

    renderEmperorsGrid();
  }

  // 渲染帝王卡片列表
  function renderEmperorsGrid() {
    const list = state.filteredEmperors;
    const container = elements.emperorsGrid;
    container.innerHTML = '';

    elements.resultsCount.innerHTML = `共收录寻得 <b>${list.length}</b> 位华夏帝王档案`;

    if (list.length === 0) {
      elements.emptyState.style.display = 'block';
      return;
    } else {
      elements.emptyState.style.display = 'none';
    }

    const fragment = document.createDocumentFragment();

    list.forEach((emperor, index) => {
      const card = document.createElement('div');
      card.className = 'emperor-card';
      card.dataset.id = emperor.id;
      card.dataset.index = index;

      // 专属印章标识（千古一帝/开国之君/中兴/治世）
      let stampText = '天子御览';
      if (emperor.tags && emperor.tags.length > 0) {
        stampText = emperor.tags[0];
      }

      card.innerHTML = `
        <div class="card-header-bar">
          <span class="card-dynasty-badge">${emperor.dynastyName}</span>
          <span class="card-stamp-badge">❖ ${stampText}</span>
        </div>
        <div class="card-portrait-wrap">
          <img 
            src="${emperor.image}" 
            alt="${emperor.dynastyName} ${emperor.templeName} ${emperor.name} 传世御容画像" 
            class="card-portrait-img" 
            loading="lazy"
            onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
          >
          <div class="portrait-fallback" style="display: none;">
            <div class="fallback-seal">${emperor.name.charAt(0)}</div>
            <span style="font-family: var(--font-kaiti); font-weight: 700; color: var(--c-vermilion); font-size: 0.95rem;">${emperor.dynastyName} · ${emperor.name}</span>
          </div>
        </div>
        <div class="card-body">
          <div class="emperor-name-row">
            <h3 class="emperor-card-title">${emperor.templeName !== '无' ? emperor.templeName : ''} ${emperor.name}</h3>
            ${emperor.templeName === '无' ? `<span class="emperor-real-name">${emperor.posthumousName}</span>` : ''}
          </div>
          <div class="emperor-reign-info">
            <div><b>年号：</b>${emperor.eraName !== '无' ? emperor.eraName : '未定年号制'}</div>
            <div><b>在位：</b>${emperor.reignPeriod}</div>
          </div>
          <p class="emperor-summary-snippet">${emperor.summary}</p>
          <div class="card-footer">
            <span class="card-tag-preview">🌟 ${emperor.tags ? emperor.tags.slice(0, 2).join(' · ') : '名帝垂范'}</span>
            <button class="card-view-btn" aria-label="查看 ${emperor.name} 详细诏书档案">
              <span>御览详情</span> →
            </button>
          </div>
        </div>
      `;

      card.addEventListener('click', () => {
        playAncientSound('bell');
        openEmperorModal(index);
      });

      fragment.appendChild(card);
    });

    container.appendChild(fragment);
  }

  // ==================== 5. 天子诏书·详情模态弹窗系统 (Modal) ====================
  function openEmperorModal(index) {
    if (index < 0 || index >= state.filteredEmperors.length) return;
    state.currentModalIndex = index;
    const emperor = state.filteredEmperors[index];

    // 设置顶部朝代
    elements.modalDynastyTitle.textContent = `${emperor.dynastyName} · ${emperor.templeName !== '无' ? emperor.templeName : emperor.name} 圣容诏书`;

    // 设置画像与降级逻辑
    elements.modalPortraitFallback.style.display = 'none';
    elements.modalPortraitImg.style.display = 'block';
    elements.modalPortraitImg.src = emperor.image;
    elements.modalPortraitImg.onerror = function () {
      this.style.display = 'none';
      elements.modalPortraitFallback.style.display = 'flex';
      elements.modalFallbackSeal.textContent = emperor.name.charAt(0);
      elements.modalFallbackText.textContent = `${emperor.dynastyName} · ${emperor.name}`;
    };

    // 设置印鉴文本
    elements.modalSealText.textContent = emperor.tags ? emperor.tags.slice(0, 3).join(' · ') : '天子圣德';

    // 设置主标题
    elements.modalEmperorName.innerHTML = `${emperor.templeName !== '无' ? emperor.templeName : ''} <span>${emperor.name}</span>`;

    // 档案属性横排规格表
    elements.modalSpecGrid.innerHTML = `
      <div class="spec-cell"><b>朝代：</b>${emperor.dynastyName}</div>
      <div class="spec-cell"><b>庙号：</b>${emperor.templeName}</div>
      <div class="spec-cell"><b>谥号：</b>${emperor.posthumousName}</div>
      <div class="spec-cell"><b>年号：</b>${emperor.eraName}</div>
      <div class="spec-cell"><b>在位年代：</b>${emperor.reignPeriod}</div>
      <div class="spec-cell"><b>寿考生卒：</b>${emperor.lifespan}</div>
    `;

    // 生平概览
    elements.modalSummary.textContent = emperor.summary;

    // 千秋功绩
    elements.modalAchievementsList.innerHTML = '';
    if (emperor.achievements && emperor.achievements.length > 0) {
      emperor.achievements.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        elements.modalAchievementsList.appendChild(li);
      });
    } else {
      elements.modalAchievementsList.innerHTML = '<li>暂无收录详细功绩条目</li>';
    }

    // 历史争议与镜鉴
    if (emperor.controversies && emperor.controversies.length > 0) {
      elements.modalControversiesWrap.style.display = 'block';
      elements.modalControversiesBox.innerHTML = emperor.controversies.map(c => `• ${c}`).join('<br>');
    } else {
      elements.modalControversiesWrap.style.display = 'none';
    }

    // 著名名言
    if (emperor.quotes) {
      elements.modalQuotesWrap.style.display = 'block';
      elements.modalQuoteBox.textContent = `“ ${emperor.quotes} ”`;
    } else {
      elements.modalQuotesWrap.style.display = 'none';
    }

    // 历史典故
    if (emperor.anecdotes) {
      elements.modalAnecdotesWrap.style.display = 'block';
      elements.modalAnecdotes.textContent = emperor.anecdotes;
    } else {
      elements.modalAnecdotesWrap.style.display = 'none';
    }

    // 后世史家评述
    if (emperor.evaluation) {
      elements.modalEvaluationWrap.style.display = 'block';
      elements.modalEvaluation.textContent = emperor.evaluation;
    } else {
      elements.modalEvaluationWrap.style.display = 'none';
    }

    // 切换按钮状态与索引
    elements.modalIndexIndicator.textContent = `${index + 1} / ${state.filteredEmperors.length}`;
    elements.modalPrevBtn.disabled = index === 0;
    elements.modalNextBtn.disabled = index === state.filteredEmperors.length - 1;

    // 显示弹窗
    elements.emperorModal.classList.add('active');
    elements.emperorModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeEmperorModal() {
    elements.emperorModal.classList.remove('active');
    elements.emperorModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // ==================== 6. 华夏朝代演进时间轴渲染 (Timeline) ====================
  function renderDynastiesTimeline() {
    if (typeof DYNASTIES_DATA === 'undefined') return;

    const timelineContainer = elements.dynastyTimeline;
    const elevatorContainer = elements.elevatorLinksList;

    timelineContainer.innerHTML = '';
    elevatorContainer.innerHTML = '';

    const timelineFragment = document.createDocumentFragment();
    const elevatorFragment = document.createDocumentFragment();

    DYNASTIES_DATA.forEach((dynasty, idx) => {
      // 1. 构建时间轴大卡片
      const node = document.createElement('article');
      node.className = 'timeline-node';
      node.id = `dynasty-${dynasty.id}`;

      // 战役与改革 HTML 生成
      let battlesHtml = '';
      if (dynasty.battles && dynasty.battles.length > 0) {
        battlesHtml = `
          <div class="sub-block">
            <div class="sub-block-header" onclick="this.nextElementSibling.style.display = this.nextElementSibling.style.display === 'none' ? 'flex' : 'none'">
              <div class="sub-block-header-left">
                <span class="sub-icon">⚔️</span>
                <span>著名战役与决定性战事 (${dynasty.battles.length}场)</span>
              </div>
              <span style="font-size: 0.85rem; color: var(--c-gold);">展开/折叠 ▼</span>
            </div>
            <div class="sub-block-body">
              ${dynasty.battles.map(b => `
                <div class="event-item">
                  <h4 class="event-name">${b.name}</h4>
                  <p class="event-desc">${b.desc}</p>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      }

      let reformsHtml = '';
      if (dynasty.reforms && dynasty.reforms.length > 0) {
        reformsHtml = `
          <div class="sub-block">
            <div class="sub-block-header" onclick="this.nextElementSibling.style.display = this.nextElementSibling.style.display === 'none' ? 'flex' : 'none'">
              <div class="sub-block-header-left">
                <span class="sub-icon">📜</span>
                <span>重大政治制度改革、变法与思想科技盛举 (${dynasty.reforms.length}项)</span>
              </div>
              <span style="font-size: 0.85rem; color: var(--c-gold);">展开/折叠 ▼</span>
            </div>
            <div class="sub-block-body">
              ${dynasty.reforms.map(r => `
                <div class="event-item" style="border-left-color: var(--c-vermilion);">
                  <h4 class="event-name" style="color: var(--c-vermilion);">${r.name}</h4>
                  <p class="event-desc">${r.desc}</p>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      }

      node.innerHTML = `
        <div class="timeline-marker" title="${dynasty.name}"></div>
        <div class="timeline-card">
          <div class="dynasty-header">
            <div>
              <h3 class="dynasty-name-title">
                <span>❖</span> ${dynasty.name}
              </h3>
            </div>
            <span class="dynasty-period-tag">${dynasty.period}（存续 ${dynasty.duration}）</span>
          </div>

          <div class="dynasty-meta-grid">
            <div class="meta-field"><b>都城驻地：</b>${dynasty.capitals}</div>
            <div class="meta-field"><b>开国之君：</b>${dynasty.founders}</div>
            <div class="meta-field"><b>末代君主：</b>${dynasty.fallRulers}</div>
          </div>

          <p class="dynasty-overview-text">${dynasty.overview}</p>

          <div class="timeline-subsections">
            ${battlesHtml}
            ${reformsHtml}
          </div>
        </div>
      `;

      timelineFragment.appendChild(node);

      // 2. 构建右侧电梯导航链接
      const elevatorLink = document.createElement('a');
      elevatorLink.href = `#dynasty-${dynasty.id}`;
      elevatorLink.className = 'elevator-link';
      elevatorLink.textContent = dynasty.shortName || dynasty.name;
      elevatorLink.dataset.target = `dynasty-${dynasty.id}`;

      elevatorLink.addEventListener('click', (e) => {
        e.preventDefault();
        playAncientSound('pluck');
        const targetNode = document.getElementById(`dynasty-${dynasty.id}`);
        if (targetNode) {
          targetNode.scrollIntoView({ behavior: 'smooth', block: 'start' });
          document.querySelectorAll('.elevator-link').forEach(l => l.classList.remove('active'));
          elevatorLink.classList.add('active');
        }
      });

      elevatorFragment.appendChild(elevatorLink);
    });

    timelineContainer.appendChild(timelineFragment);
    elevatorContainer.appendChild(elevatorFragment);
  }

  // ==================== 7. 御览天梯·数据洞察与探索 (Insights) ====================
  function renderInsights() {
    if (typeof EMPERORS_DATA === 'undefined') return;

    // 1. 在位时间最长 Top 10
    const sortedByReign = [...EMPERORS_DATA].sort((a, b) => (b.reignYears || 0) - (a.reignYears || 0)).slice(0, 10);
    elements.reignRankingList.innerHTML = '';
    sortedByReign.forEach((emp, i) => {
      const item = document.createElement('div');
      item.className = 'ranking-item';
      item.innerHTML = `
        <div class="rank-left">
          <span class="rank-index">${i + 1}</span>
          <span class="rank-name">${emp.name}</span>
          <span class="rank-dynasty">(${emp.dynastyName}·${emp.templeName !== '无' ? emp.templeName : emp.posthumousName})</span>
        </div>
        <div class="rank-val">${emp.reignYears} 年</div>
      `;
      item.addEventListener('click', () => {
        // 跳转并打开此帝王档案
        const originIndex = state.filteredEmperors.findIndex(e => e.id === emp.id);
        if (originIndex !== -1) {
          openEmperorModal(originIndex);
        } else {
          // 若不在当前过滤列表中，重置过滤后打开
          resetFilters();
          const newIdx = state.filteredEmperors.findIndex(e => e.id === emp.id);
          openEmperorModal(newIdx !== -1 ? newIdx : 0);
        }
      });
      elements.reignRankingList.appendChild(item);
    });

    // 2. 享年寿命 Top 10 (从 lifespan 提取年龄)
    function parseAge(lifespanStr) {
      const match = lifespanStr.match(/享年(\d+)岁|终年(\d+)岁|享寿(\d+)岁/);
      return match ? parseInt(match[1] || match[2] || match[3], 10) : 0;
    }

    const sortedByAge = [...EMPERORS_DATA].sort((a, b) => parseAge(b.lifespan) - parseAge(a.lifespan)).slice(0, 10);
    elements.lifespanRankingList.innerHTML = '';
    sortedByAge.forEach((emp, i) => {
      const age = parseAge(emp.lifespan);
      const item = document.createElement('div');
      item.className = 'ranking-item';
      item.innerHTML = `
        <div class="rank-left">
          <span class="rank-index">${i + 1}</span>
          <span class="rank-name">${emp.name}</span>
          <span class="rank-dynasty">(${emp.dynastyName})</span>
        </div>
        <div class="rank-val">${age} 岁</div>
      `;
      item.addEventListener('click', () => {
        const originIndex = state.filteredEmperors.findIndex(e => e.id === emp.id);
        if (originIndex !== -1) {
          openEmperorModal(originIndex);
        } else {
          resetFilters();
          const newIdx = state.filteredEmperors.findIndex(e => e.id === emp.id);
          openEmperorModal(newIdx !== -1 ? newIdx : 0);
        }
      });
      elements.lifespanRankingList.appendChild(item);
    });
  }

  // 随机抽取帝王卡片
  function rollRandomEmperor(openInModal = false) {
    playAncientSound('bell');
    const randomIndex = Math.floor(Math.random() * EMPERORS_DATA.length);
    const chosen = EMPERORS_DATA[randomIndex];

    if (openInModal) {
      resetFilters();
      const idx = state.filteredEmperors.findIndex(e => e.id === chosen.id);
      openEmperorModal(idx !== -1 ? idx : 0);
    } else {
      elements.randomCardImg.src = chosen.image;
      elements.randomCardImg.style.display = 'block';
      elements.randomCardImg.onerror = function () {
        this.style.display = 'none';
        elements.randomCardPlaceholder.style.display = 'flex';
      };
      elements.randomCardPlaceholder.style.display = 'none';
      elements.randomCardTitle.textContent = `${chosen.dynastyName} · ${chosen.templeName !== '无' ? chosen.templeName : ''} ${chosen.name}`;
      elements.randomCardDesc.textContent = chosen.summary;

      elements.randomExploreCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  function resetFilters() {
    state.selectedDynasty = 'all';
    state.selectedTag = 'all';
    state.searchQuery = '';
    elements.searchInput.value = '';
    elements.clearSearchBtn.style.display = 'none';

    elements.dynastyChips.forEach(c => c.classList.toggle('active', c.dataset.dynasty === 'all'));
    elements.tagChips.forEach(c => c.classList.toggle('active', c.dataset.tag === 'all'));

    filterEmperors();
  }

  // ==================== 8. 视图切换控制器 ====================
  function switchView(viewName) {
    if (state.currentView === viewName) return;
    state.currentView = viewName;
    playAncientSound('pluck');

    // 切换导航高亮
    elements.navTabs.forEach(tab => {
      tab.classList.toggle('active', tab.dataset.view === viewName);
    });

    // 切换内容区域
    elements.viewEmperors.classList.toggle('active', viewName === 'emperors');
    elements.viewTimeline.classList.toggle('active', viewName === 'timeline');
    elements.viewInsights.classList.toggle('active', viewName === 'insights');

    // 滚动至顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ==================== 9. 事件绑定与用户交互 ====================
  function bindEvents() {
    // 视图导航 Tab 点击
    elements.navTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        switchView(tab.dataset.view);
      });
    });

    // 品牌 Logo 点击回首页
    elements.brandLogo.addEventListener('click', (e) => {
      e.preventDefault();
      switchView('emperors');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 搜索框输入防抖
    let debounceTimer = null;
    elements.searchInput.addEventListener('input', (e) => {
      const val = e.target.value;
      elements.clearSearchBtn.style.display = val ? 'block' : 'none';

      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        state.searchQuery = val;
        filterEmperors();
      }, 150);
    });

    // 清空搜索
    elements.clearSearchBtn.addEventListener('click', () => {
      elements.searchInput.value = '';
      elements.clearSearchBtn.style.display = 'none';
      state.searchQuery = '';
      filterEmperors();
      elements.searchInput.focus();
    });

    // 朝代筛选 Chip 点击
    elements.dynastyChips.forEach(chip => {
      chip.addEventListener('click', () => {
        playAncientSound('pluck');
        elements.dynastyChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        state.selectedDynasty = chip.dataset.dynasty;
        filterEmperors();
      });
    });

    // 特征标签 Chip 点击
    elements.tagChips.forEach(chip => {
      chip.addEventListener('click', () => {
        playAncientSound('pluck');
        elements.tagChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        state.selectedTag = chip.dataset.tag;
        filterEmperors();
      });
    });

    // 随机御览按钮
    elements.randomRollBtn.addEventListener('click', () => {
      rollRandomEmperor(true);
    });

    elements.quickRandomBtn.addEventListener('click', () => {
      rollRandomEmperor(true);
    });

    elements.drawRandomEmperorBtn.addEventListener('click', () => {
      rollRandomEmperor(false);
    });

    // 弹窗关闭
    elements.modalCloseBtn.addEventListener('click', closeEmperorModal);
    elements.emperorModal.addEventListener('click', (e) => {
      if (e.target === elements.emperorModal) {
        closeEmperorModal();
      }
    });

    // 弹窗前后翻页
    elements.modalPrevBtn.addEventListener('click', () => {
      if (state.currentModalIndex > 0) {
        playAncientSound('pluck');
        openEmperorModal(state.currentModalIndex - 1);
      }
    });

    elements.modalNextBtn.addEventListener('click', () => {
      if (state.currentModalIndex < state.filteredEmperors.length - 1) {
        playAncientSound('pluck');
        openEmperorModal(state.currentModalIndex + 1);
      }
    });

    // 键盘全局快捷键
    window.addEventListener('keydown', (e) => {
      // 打开弹窗状态下的快捷键
      if (elements.emperorModal.classList.contains('active')) {
        if (e.key === 'Escape') {
          closeEmperorModal();
        } else if (e.key === 'ArrowLeft') {
          if (state.currentModalIndex > 0) openEmperorModal(state.currentModalIndex - 1);
        } else if (e.key === 'ArrowRight') {
          if (state.currentModalIndex < state.filteredEmperors.length - 1) openEmperorModal(state.currentModalIndex + 1);
        }
        return;
      }

      // 未打开弹窗时，按 '/' 聚焦搜索框
      if (e.key === '/' && document.activeElement !== elements.searchInput) {
        e.preventDefault();
        elements.searchInput.focus();
      }
    });

    // 音效开关切换
    elements.soundToggleBtn.addEventListener('click', () => {
      state.soundEnabled = !state.soundEnabled;
      elements.soundIcon.textContent = state.soundEnabled ? '🔔' : '🔇';
      elements.soundToggleBtn.classList.toggle('active-sound', state.soundEnabled);
      if (state.soundEnabled) {
        playAncientSound('bell');
      }
    });

    // 页面滚动监听：吸顶阴影与返回顶部按钮
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      elements.siteHeader.classList.toggle('scrolled', scrollY > 20);
      elements.backToTopBtn.classList.toggle('visible', scrollY > 400);
    });

    // 返回顶部按钮
    elements.backToTopBtn.addEventListener('click', () => {
      playAncientSound('pluck');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ==================== 10. 初始化启动 ====================
  function init() {
    initStatistics();
    state.filteredEmperors = [...EMPERORS_DATA];
    filterEmperors();
    renderDynastiesTimeline();
    renderInsights();
    bindEvents();
    console.log('华夏历代帝王资料库与朝代演进大系已成功加载！');
  }

  // 页面就绪后自启动
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
