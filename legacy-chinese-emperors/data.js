/**
 * 中国古代历届帝王资料库与华夏朝代演进大系 - 核心史料数据库
 * 包含：
 * 1. EMPERORS_DATA: 历朝历代重要帝王详细生平名鉴（画像、在位、年号、功过、名言、典故、后世评述）
 * 2. DYNASTIES_DATA: 华夏自古及今历史长河时间轴（起止年份、都城、存续、著名战役、制度改革变法、思想科技文化）
 */

const EMPERORS_DATA = [
  // ==================== 秦朝 (公元前221 - 前207) ====================
  {
    id: "qin-shihuang",
    dynastyId: "qin",
    dynastyName: "秦朝",
    name: "嬴政",
    templeName: "无（自定始皇帝）",
    posthumousName: "无（废除谥法）",
    eraName: "无（尚未有年号制度）",
    reignPeriod: "前221年 - 前210年（称帝12年，称秦王26年）",
    lifespan: "前259年 - 前210年（享年50岁）",
    reignYears: 12,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/First_Emperor_of_Qin.jpg/480px-First_Emperor_of_Qin.jpg",
    tags: ["千古一帝", "开国之君", "大一统", "改革先驱", "争议并存"],
    isFamous: true,
    summary: "中国历史上首位采用“皇帝”称号的君主，结束春秋战国数百年大分裂，开创中国第一个大一统中央集权封建帝国。",
    achievements: [
      "横扫六国：十年间先后灭韩、赵、魏、楚、燕、齐，实现天下一统。",
      "确立皇权制度：废除分封制，在全国彻底推行郡县制；统一官僚层级与法律（秦律）。",
      "车同轨、书同文、统一度量衡：以小篆为标准文字，统一度量衡器与全国道路规制。",
      "宏大国防工程：北击匈奴收复河套，修筑万里长城；南征百越开凿灵渠，奠定华夏大一统疆域基石。"
    ],
    controversies: [
      "焚书坑儒，严刑峻法，法家严苛统治激化阶级与社会矛盾。",
      "大兴土木：征发数十万民夫营建阿房宫、骊山陵墓，赋役繁重，为秦朝二世而亡埋下祸根。"
    ],
    quotes: "朕为始皇帝。后世以计数，二世三世至于万世，传之无穷。",
    anecdotes: "图穷匕见（荆轲刺秦）、博浪沙刺秦、徐福东渡求长生不老药、泰山封禅立石刻碑。",
    evaluation: "司马迁《史记》：“秦王怀贪鄙之心，行自奋之智，不信功臣，不亲士民，废王道，立私权。”毛泽东：“劝君少骂秦始皇，百代都行秦政法。”"
  },
  {
    id: "qin-er-shi",
    dynastyId: "qin",
    dynastyName: "秦朝",
    name: "胡亥",
    templeName: "无",
    posthumousName: "秦二世",
    eraName: "无",
    reignPeriod: "前210年 - 前207年（在位3年）",
    lifespan: "前230年 - 前207年（终年24岁）",
    reignYears: 3,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Qin_Er_Shi.jpg/480px-Qin_Er_Shi.jpg",
    tags: ["亡国之君", "赵高弄权", "悲剧"],
    isFamous: true,
    summary: "秦始皇第十八子，沙丘之变后在赵高、李斯合谋下即位，统治荒淫残暴，激起陈胜吴广起义，大秦迅速走向瓦解。",
    achievements: [
      "即位初期巡行郡县，增筑阿房宫，令天下民夫运粮饷供给咸阳。"
    ],
    controversies: [
      "沙丘之变矫诏赐死兄长扶苏及大将蒙恬，残害骨肉诸公子公主二十余人。",
      "完全偏信中车府令赵高，被赵高玩弄于股掌，诛杀丞相李斯。",
      "天下大乱烽火四起之际犹隐瞒灾情，最终被赵高亲信阎乐逼自杀于望夷宫。"
    ],
    quotes: "凡所为贵有天下者，得肆意极欲，主重明德，民臣不敢为非，度以禁天下也。",
    anecdotes: "指鹿为马（赵高在朝堂献鹿言马以测试百官忠顺度，二世竟以为真）、沙丘密谋。",
    evaluation: "贾谊《过秦论》：“胡亥极愚，因以佞骫，诛骨肉，屠大臣，天下思反，二世而亡，悲夫！”"
  },
  {
    id: "qin-zi-ying",
    dynastyId: "qin",
    dynastyName: "秦朝",
    name: "子婴",
    templeName: "无",
    posthumousName: "秦三世 / 秦王子婴",
    eraName: "无",
    reignPeriod: "前207年（在位46天）",
    lifespan: "？ - 前206年",
    reignYears: 0.1,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/First_Emperor_of_Qin.jpg/480px-First_Emperor_of_Qin.jpg",
    tags: ["末代君王", "除奸诛暴", "悲情覆灭"],
    isFamous: false,
    summary: "秦朝最后一位统治者，因当时六国皆已复立，赵高命其去帝号称秦王。在位仅46天，设计诛杀赵高，后降刘邦，被项羽杀害。",
    achievements: [
      "临危受命，与两个儿子及宦官韩谈合谋，趁赵高斋戒引见之机刺杀权奸赵高，夷其三族。"
    ],
    controversies: [
      "大厦将倾独木难支，秦军主力已于巨鹿覆灭，咸阳无兵可守，被迫肉袒素车白马出降刘邦。"
    ],
    quotes: "高公称疾，必自来；来则杀之。",
    anecdotes: "斋宫诛赵高、轵道旁系颈以组献传国玉玺降沛公。",
    evaluation: "班固《汉书》：“子婴处危亡之势，诚使内得忠臣，外得严将，虽秦之弊，犹未至于遽亡也。”"
  },

  // ==================== 西汉 (公元前202 - 公元9年) ====================
  {
    id: "han-gaozu",
    dynastyId: "xi-han",
    dynastyName: "西汉",
    name: "刘邦",
    templeName: "太祖（通称高祖）",
    posthumousName: "高皇帝",
    eraName: "无",
    reignPeriod: "前202年 - 前195年（在位7年）",
    lifespan: "前256年/前247年 - 前195年（享年61岁）",
    reignYears: 7,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Han_Gaozu.jpg/480px-Han_Gaozu.jpg",
    tags: ["开国之君", "布衣天子", "大一统", "雄才大略"],
    isFamous: true,
    summary: "大汉帝国开国皇帝，出身平民亭长，起兵反秦，历经楚汉相争击败西楚霸王项羽，建立西汉王朝，奠定汉民族之基。",
    achievements: [
      "推翻暴秦：先入咸阳，废秦严刑，与父老“约法三章”，尽得关中民心。",
      "楚汉争雄：善于用人，任用张良、萧何、韩信“汉初三杰”，垓下合围彻底击败项羽。",
      "休养生息：推行轻徭薄赋、行“兵皆罢归家”，下“免为庶人”诏，奠定汉初国力恢复基石。",
      "创立汉家典章制度：命萧何作《九章律》，命叔孙通制朝仪，确立汉室封建制度。"
    ],
    controversies: [
      "即位后为巩固中央政权，先后诛灭韩信、彭越、英布等异姓诸侯王。",
      "白登之围：轻敌冒进被匈奴冒顿单于围困七日七夜，后采纳陈平奇计脱险，开启和亲政策。"
    ],
    quotes: "大风起兮云飞扬，威加海内兮归故乡，安得猛士兮守四方！",
    anecdotes: "斩白蛇起义、鸿门宴脱险、拜韩信为大将、分一杯羹、高祖还乡作《大风歌》。",
    evaluation: "司马迁：“高祖以亭长提三尺剑取天下，岂非天命乎！”毛泽东评价：“封建皇帝里边最厉害的一个。”"
  },
  {
    id: "han-wendi",
    dynastyId: "xi-han",
    dynastyName: "西汉",
    name: "刘恒",
    templeName: "太宗",
    posthumousName: "孝文皇帝",
    eraName: "前元、后元",
    reignPeriod: "前180年 - 前157年（在位23年）",
    lifespan: "前203年 - 前157年（享年46岁）",
    reignYears: 23,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Han_Gaozu.jpg/480px-Han_Gaozu.jpg",
    tags: ["文景之治", "仁政爱民", "节俭垂范", "一代明君"],
    isFamous: true,
    summary: "汉高祖第四子，吕后乱政平定后被迎立为帝。励精图治，崇尚黄老无为而治，开创中国历史上首个公认治世“文景之治”。",
    achievements: [
      "轻徭薄赋：将田赋税率减至三十税一，甚至一度免除天下田租十二年之久。",
      "废除肉刑：因缇萦救父上书，深受感动，下诏废除黥面、劓鼻、斩足等肉刑。",
      "躬行节俭：在位二十三年，宫室苑囿车骑服御无所增益，身着粗布黑衣，不修露台以惜民财。",
      "平叛抚边：妥善安置南越王赵佗，对匈奴采取和亲与边防储备并举政策。"
    ],
    controversies: [
      "对同母异父及宗室诸侯王（如淮南王刘长）处置有失审慎，诸侯国隐患渐起。"
    ],
    quotes: "夫农，天下之本也，其开藉田，朕亲率耕，以给宗庙粢盛。",
    anecdotes: "缇萦上书救父废肉刑、惜十家之产罢修露台、霸陵因山为陵不起坟冢。",
    evaluation: "班固《汉书》：“专务以德化民，是以海内殷富，兴于礼义，断狱数百，几致刑措，呜呼，可谓仁矣！”"
  },
  {
    id: "han-jingdi",
    dynastyId: "xi-han",
    dynastyName: "西汉",
    name: "刘启",
    templeName: "无",
    posthumousName: "孝景皇帝",
    eraName: "前元、中元、后元",
    reignPeriod: "前157年 - 前141年（在位16年）",
    lifespan: "前188年 - 前141年（享年48岁）",
    reignYears: 16,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Han_Gaozu.jpg/480px-Han_Gaozu.jpg",
    tags: ["文景之治", "平定七国", "削藩集权"],
    isFamous: true,
    summary: "汉文帝长子，与其父共同开创“文景之治”，果断平定“吴楚七国之乱”，大力削弱诸侯封国权力，为汉武帝盛世奠定坚实根基。",
    achievements: [
      "平定七国之乱：采纳晃错《削藩策》，吴楚等七国作乱，景帝起用周亚夫三月平定叛乱，收诸侯国任免大权归中央。",
      "延续修养生息政策：重农抑商，推行“三十税一”，国库充盈，太仓之粟陈陈相因。",
      "改革官制：将诸侯王国丞相改称“相”，剥夺诸侯王治民权，强化皇权专制。"
    ],
    controversies: [
      "诛杀忠臣晃错以试图缓和七国借口，留下千古政治憾事。",
      "晚年薄情对待平叛功臣周亚夫，致其绝食而死；废立太子过程中手段冷酷。"
    ],
    quotes: "农，天下之本也。黄金珠玉，饥不可食，寒不可衣，都不如谷物丝麻。",
    anecdotes: "下棋掷局误杀吴王太子埋下祸根、周亚夫细柳营严整军容令景帝叹服。",
    evaluation: "司马迁：“景帝遵业，五六十载之间，至于移风易俗，黎民醇厚。周云成康，汉言文景，美矣！”"
  },
  {
    id: "han-wudi",
    dynastyId: "xi-han",
    dynastyName: "西汉",
    name: "刘彻",
    templeName: "世宗",
    posthumousName: "孝武皇帝",
    eraName: "建元、元光、元朔、元狩、元鼎、元封、太初、天汉、太始、征和、后元",
    reignPeriod: "前141年 - 前87年（在位54年）",
    lifespan: "前156年 - 前87年（享年69岁）",
    reignYears: 54,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Emperor_Wu_of_Han.jpg/480px-Emperor_Wu_of_Han.jpg",
    tags: ["千古一帝", "汉武盛世", "开疆拓土", "推恩令", "罢黜百家"],
    isFamous: true,
    summary: "中国历史上杰出的政治家与战略家，在位54年，创立年号制度，北击匈奴封狼居胥，开辟丝绸之路，奠定汉家疆域与思想文化千年格局。",
    achievements: [
      "独尊儒术：采纳董仲舒建议“罢黜百家，独尊儒术”，确立儒学为中华两千年正统思想。",
      "推恩令：采纳主父偃之策，巧削诸侯藩国领地，彻底解决汉初分封割据之患。",
      "重创匈奴封狼居胥：起用卫青、霍去病等青年名将，发起河南、漠南、漠北三大战役，打通河西走廊。",
      "丝绸之路开辟：两次派遣张骞出使西域，凿空丝路，极大地促进东西方文明交流。",
      "盐铁官营与均输平准：行国家专卖抑制豪强富商，建立全国常平仓平抑物价。",
      "首创年号：首立“建元”，确立太初历，确定以正月为岁首。"
    ],
    controversies: [
      "穷兵黩武：长年远征导致国库空虚、户口减半、百姓疲敝。",
      "崇信方士神仙，迷信巫蛊之术，引爆“巫蛊之祸”，逼死太子刘据与卫皇后，株连数万人。",
      "晚年悔悟：下《轮台罪己诏》，宣布禁苛暴、止擅赋，重归与民休息。"
    ],
    quotes: "寇可往，我亦可往！/ 盖有非常之人，然后有非常之功。",
    anecdotes: "金屋藏娇（陈阿娇）、张骞凿空西域、霍去病“匈奴未灭无以家为”、轮台悔过诏。",
    evaluation: "班固《汉书》：“雄才大略，不改文景之恭俭以济斯民，虽《诗》《书》所称何有加焉！”司马光《资治通鉴》：“孝武穷奢极欲，繁刑重敛，内侈宫室，外事四夷……有亡秦之失而免亡秦之祸者，又其聪明深知之也。”"
  },
  {
    id: "han-zhaodi",
    dynastyId: "xi-han",
    dynastyName: "西汉",
    name: "刘弗陵",
    templeName: "无",
    posthumousName: "孝昭皇帝",
    eraName: "始元、元凤、元平",
    reignPeriod: "前87年 - 前74年（在位13年）",
    lifespan: "前94年 - 前74年（终年21岁）",
    reignYears: 13,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Han_Gaozu.jpg/480px-Han_Gaozu.jpg",
    tags: ["昭宣中兴", "与民休息", "少年英主"],
    isFamous: false,
    summary: "汉武帝幼子，八岁即位，由大将军霍光辅政。贯彻武帝晚年休养生息国策，罢盐铁酒榷专卖，召开著名的“盐铁会议”，轻徭薄赋。",
    achievements: [
      "召开盐铁会议，反思盐铁官营弊端，罢酒榷（免除国家白酒专卖）。",
      "平定上官桀、桑弘羊、燕王刘旦谋反案，稳固朝局。",
      "轻徭薄赋，免除灾区田租赋税，令汉朝从武帝晚年的国力透支中迅速复苏。"
    ],
    controversies: [
      "年少早逝，大权基本操于大将军霍光之手。"
    ],
    quotes: "百姓多匮乏，其下赋敛，无出今年田租。",
    anecdotes: "苏武牧羊十九年终得归汉、昭帝识破上官桀诈书燕王谋反之计。",
    evaluation: "班固《汉书》：“承孝武奢侈余弊，师旅之后，海内虚耗，昭帝幼冲，委政霍光，修孝文无为之政，天下和平。”"
  },
  {
    id: "han-xuandi",
    dynastyId: "xi-han",
    dynastyName: "西汉",
    name: "刘询（刘病已）",
    templeName: "中宗",
    posthumousName: "孝宣皇帝",
    eraName: "本始、地节、元康、神爵、五凤、甘露、黄龙",
    reignPeriod: "前74年 - 前49年（在位25年）",
    lifespan: "前91年 - 前49年（享年43岁）",
    reignYears: 25,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Han_Gaozu.jpg/480px-Han_Gaozu.jpg",
    tags: ["昭宣中兴", "一代贤君", "西域都护府", "故剑情深"],
    isFamous: true,
    summary: "汉武帝曾孙，襁褓中因巫蛊之祸流落民间，深知民间疾苦。在位期间平定霍氏之乱，设西域都护府，使西汉综合国力达到极盛。",
    achievements: [
      "设立西域都护府（前60年）：郑吉为第一任都护，从此新疆地区正式纳入中国版图。",
      "匈奴归附：呼韩邪单于入朝归降，汉匈长达数百年的战争以汉朝全胜收场。",
      "整肃吏治：信赏必罚，严惩贪官，注重考核郡守刺史政绩，“吏称其官，民安其业”。",
      "王霸之道并用：提出“汉家自有制度，本以霸王道杂之，奈何纯任德教”，治国兼采法儒精髓。"
    ],
    controversies: [
      "平定霍氏叛乱时株连甚广，霍光满门被诛。"
    ],
    quotes: "汉家自有制度，本以霸王道杂之，奈何纯任德教，用周政乎！",
    anecdotes: "故剑情深（立微时患难妻子许平君为皇后）、南园遗爱。",
    evaluation: "班固《汉书》：“孝宣之治，信赏必罚，综核名实，政事文学法理之士咸精其能，功光祖宗，业垂后嗣，可谓中兴，侔德殷宗、周宣矣！”"
  },
  {
    id: "han-yuandi",
    dynastyId: "xi-han",
    dynastyName: "西汉",
    name: "刘奭",
    templeName: "高宗",
    posthumousName: "孝元皇帝",
    eraName: "初元、永光、建昭、竟宁",
    reignPeriod: "前49年 - 前33年（在位16年）",
    lifespan: "前75年 - 前33年（享年43岁）",
    reignYears: 16,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Han_Gaozu.jpg/480px-Han_Gaozu.jpg",
    tags: ["由盛转衰", "崇儒优柔", "昭君出塞"],
    isFamous: false,
    summary: "汉宣帝长子，性情温厚柔仁，过分崇尚儒学，宠信宦官石显，导致外戚宦官专政萌芽，西汉从此步入下坡路。",
    achievements: [
      "昭君出塞：促成王昭君和亲呼韩邪单于，换取汉匈边境半个多世纪的和平安宁。",
      "陈汤击灭郅支单于于康居，写下“明犯强汉者，虽远必诛”的千古豪言。"
    ],
    controversies: [
      "优柔寡断，重用宦官中书令石显，排斥忠良，为日后外戚篡政埋下隐患。"
    ],
    quotes: "明犯强汉者，虽远必诛！（西域副校尉陈汤上疏）",
    anecdotes: "毛延寿画工索贿丑化王昭君、宣帝叹其“乱我家者太子也”。",
    evaluation: "司马光：“元帝优柔寡断，宠任宦官，忠良见挤，汉业衰矣。”"
  },

  // ==================== 新朝 (9 - 23年) ====================
  {
    id: "xin-wangmang",
    dynastyId: "xin",
    dynastyName: "新朝",
    name: "王莽",
    templeName: "无",
    posthumousName: "无（被称新莽伪帝）",
    eraName: "始建国、天凤、地皇",
    reignPeriod: "9年 - 23年（在位14年）",
    lifespan: "前45年 - 23年（终年68岁）",
    reignYears: 14,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Wang_Mang.jpg/480px-Wang_Mang.jpg",
    tags: ["改朝换代", "托古改制", "穿越者争议", "悲剧变法"],
    isFamous: true,
    summary: "西汉外戚，汉元帝皇后王政君之侄。以谦恭名动朝野，后禅代西汉建立新朝。推行激进周礼复古改制，导致社会崩溃被推翻。",
    achievements: [
      "王田制：宣布天下田地收归国有（王田），禁止私人土地买卖，试图遏制土地兼并。",
      "废止奴婢买卖：将私奴改称“私属”，禁止买卖人口。",
      "五均赊贷与六筦：国家统一调节物价、放贷扶持贫民，收盐、铁、酒专营。"
    ],
    controversies: [
      "脱离实际的盲目复古改制：频繁变更币制（四次改币，铸造刀币、贝币等数十种繁杂货币），导致经济大混乱。",
      "民族政策狂妄激进，改封匈奴单于为降奴服于，四方边疆烽烟四起。",
      "绿林、赤眉起义爆发，昆阳之战中大军被刘秀以少胜多歼灭，未央宫破身死国灭。"
    ],
    quotes: "天生符命于予，当为新天子，以安四海。",
    anecdotes: "昆阳之战天降陨石流星、青铜卡尺发明、新币制错乱。",
    evaluation: "胡适：“王莽是中国历史上第一位社会主义者。”葛洪：“王莽托古以欺天下，卒致身碎名灭。”"
  },

  // ==================== 东汉 (25 - 220年) ====================
  {
    id: "han-guangwu",
    dynastyId: "dong-han",
    dynastyName: "东汉",
    name: "刘秀",
    templeName: "世祖",
    posthumousName: "光武皇帝",
    eraName: "建武、建武中元",
    reignPeriod: "25年 - 57年（在位32年）",
    lifespan: "前5年 - 57年（享年62岁）",
    reignYears: 32,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Emperor_Guangwu_of_Han.jpg/480px-Emperor_Guangwu_of_Han.jpg",
    tags: ["光武中兴", "开国之君", "位面之子", "柔道治国"],
    isFamous: true,
    summary: "汉景帝之子长沙定王刘发后裔。昆阳之战一战封神，重建大汉社稷定都洛阳，史称东汉。以“柔道治国”，开创“光武中兴”。",
    achievements: [
      "昆阳之战：以数千敢死队大破王莽四十二万大军，创造中国军事史上以少胜多的神话奇迹。",
      "重建汉室：平定赤眉、击破王郎、消灭隗嚣与公孙述，历经十二载统一全国。",
      "柔道治国：退功臣进文吏，不杀一功臣，给云台二十八将高官厚禄而不任政柄。",
      "度田事件：下令清查全国隐匿土地与户口，虽受豪强阻挠仍坚定打击豪强瞒报。",
      "解放奴婢：连续九次下诏释放奴婢、残疾者，轻徭薄赋实行“三十税一”。"
    ],
    controversies: [
      "度田清查妥协，东汉门阀豪强庄园经济根深蒂固，成为东汉后期分裂隐患。"
    ],
    quotes: "吾理天下，亦欲以柔道行之。/ 仕宦当作执金吾，娶妻当得阴丽华。",
    anecdotes: "云台二十八将、披星戴月昆阳破敌、与严子陵共榻抵足而眠。",
    evaluation: "司马光《资治通鉴》：“光武明并日月，勇冠雷霆，宽仁厚德，克成中兴之业。”王夫之：“光武神武景纬，三代以下称首。”"
  },
  {
    id: "han-mingdi",
    dynastyId: "dong-han",
    dynastyName: "东汉",
    name: "刘庄",
    templeName: "显宗",
    posthumousName: "孝明皇帝",
    eraName: "永平",
    reignPeriod: "57年 - 75年（在位18年）",
    lifespan: "28年 - 75年（享年47岁）",
    reignYears: 18,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Emperor_Guangwu_of_Han.jpg/480px-Emperor_Guangwu_of_Han.jpg",
    tags: ["明章之治", "白马驮经", "班超投笔从戎"],
    isFamous: true,
    summary: "光武帝第四子，与其子章帝共同开创“明章之治”。崇尚法制严明，治水抚民；遣使西行迎佛经建白马寺，命窦固、班超经营西域。",
    achievements: [
      "夜梦金人白马驮经：派遣蔡愔等赴天竺求取佛法，迎请摄摩腾、竺法兰二高僧，建洛阳白马寺（中国第一官办寺院）。",
      "重开西域：命窦固大破北匈奴，派遣班超以三十六人经营西域，平定鄯善、于阗，恢复西域交通。",
      "治理黄河：命水利专家王景治理黄河，“王景治水，千载无患”，使黄河八百年安流。",
      "绘制云台二十八将功臣像于南宫云台阁。"
    ],
    controversies: [
      "执法过于严苛，楚王刘英谋反案株连千人，略显峻刻。"
    ],
    quotes: "天下之事，慎终如始，其可忽乎！",
    anecdotes: "明帝夜梦金人、班超投笔从戎“不入虎穴焉得虎子”、王景治黄河。",
    evaluation: "范晔《后汉书》：“显宗善刑名，综核名实，整齐百寮，明于用人，故永平之政，上下称安。”"
  },
  {
    id: "han-zhangdi",
    dynastyId: "dong-han",
    dynastyName: "东汉",
    name: "刘炟",
    templeName: "肃宗",
    posthumousName: "孝章皇帝",
    eraName: "建初、元和、章和",
    reignPeriod: "75年 - 88年（在位13年）",
    lifespan: "57年 - 88年（终年31岁）",
    reignYears: 13,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Emperor_Guangwu_of_Han.jpg/480px-Emperor_Guangwu_of_Han.jpg",
    tags: ["明章之治", "白虎观会议", "章草书法"],
    isFamous: false,
    summary: "汉明帝第五子，宽仁爱民，主持召开著名的“白虎观会议”，统一儒学今古文经义编定《白虎通义》，爱好书法，章草由此得名。",
    achievements: [
      "召开白虎观会议：由班固整理撰写成《白虎通德论》，确立三纲六纪与法典儒家化规范。",
      "支持班超留守西域：班超“断胫以示绝”，章帝力挺，终平西域五十余国。",
      "宽厚从政：废除严苛刑罚，休养生息，百姓丰衣足食。"
    ],
    controversies: [
      "过分厚待窦皇后家族，使窦宪等外戚开始专擅朝政，成为东汉外戚乱政之开端。"
    ],
    quotes: "为政之要在宽简，以民心为归。",
    anecdotes: "白虎观大辩论、章草书法创制。",
    evaluation: "范晔：“章帝宽仁孝悌，海内向化，天下丰盛。”"
  },
  {
    id: "han-hedi",
    dynastyId: "dong-han",
    dynastyName: "东汉",
    name: "刘肇",
    templeName: "穆宗",
    posthumousName: "孝和皇帝",
    eraName: "永元、元兴",
    reignPeriod: "88年 - 106年（在位18年）",
    lifespan: "79年 - 106年（终年27岁）",
    reignYears: 18,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Emperor_Guangwu_of_Han.jpg/480px-Emperor_Guangwu_of_Han.jpg",
    tags: ["永元之隆", "勒石燕然", "蔡伦造纸", "除外戚"],
    isFamous: true,
    summary: "十岁即位，窦太后临朝。十四岁与宦官郑众密谋，果断诛灭窦宪外戚集团夺回大权。在位期间开创“永元之隆”，东汉国力达到最高峰。",
    achievements: [
      "诛除窦宪外戚集团，收回皇权，勤理朝政，减免赋税。",
      "勒石燕然：窦宪、耿秉大破北匈奴，登燕然山刻石纪功；班超彻底降服西域五十余国。",
      "科技文化跃进：蔡伦改进造纸术制成“蔡侯纸”，许慎撰写《说文解字》。",
      "人口达5325万，疆域与户口均为东汉极盛。"
    ],
    controversies: [
      "诛灭外戚过程中借重宦官力量，首开东汉封宦官为侯之先例，埋下宦官干政深患。"
    ],
    quotes: "亲视事，忧深思远，抑损骄佚，政出己身。",
    anecdotes: "十四岁密谋铲除外戚窦宪、蔡伦献纸。",
    evaluation: "范晔《后汉书》：“和帝冲龄践祚，外戚专朝，一旦发奋，诛夷权奸，永元之隆，自汉中兴以来未之有也。”"
  },
  {
    id: "han-xiandi",
    dynastyId: "dong-han",
    dynastyName: "东汉",
    name: "刘协",
    templeName: "无",
    posthumousName: "孝献皇帝",
    eraName: "初平、兴平、建安、延康",
    reignPeriod: "189年 - 220年（在位31年）",
    lifespan: "181年 - 234年（享年53岁）",
    reignYears: 31,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Emperor_Xian_of_Han.jpg/480px-Emperor_Xian_of_Han.jpg",
    tags: ["傀儡天子", "衣带诏", "三国开端", "禅让逊位"],
    isFamous: true,
    summary: "东汉末代皇帝。九岁被董卓立为帝，历经董卓专权、李傕郭汜之乱，后被曹操“挟天子以令诸侯”。公元220年禅位于曹丕，汉朝亡。",
    achievements: [
      "聪颖坚毅：大饥荒之年命侍御史侯汶开仓放粮赈济灾民，识破官员侵吞粮食弊端。",
      "虽深陷傀儡险境，仍密写“衣带诏”授董承试图诛灭曹操复兴汉室。"
    ],
    controversies: [
      "身不由己，一生皆为权臣之傀儡，汉家社稷终在其手中终结。"
    ],
    quotes: "咨尔魏王：夫天命不于常，休烈代运，汉德销尽，授之于魏。",
    anecdotes: "衣带诏血书密谋、洛阳废墟逃亡食糠、禅位曹丕封山阳公行医济民善终。",
    evaluation: "曹操：“设使天下无有孤，不知几人称帝，几人称王。”范晔：“献帝处衰季之极，当颠沛之会，虽有圣智，其能汉鼎之延乎？”"
  },

  // ==================== 三国 (220 - 280年) ====================
  {
    id: "wei-wen-cao-pi",
    dynastyId: "san-guo",
    dynastyName: "三国·曹魏",
    name: "曹丕",
    templeName: "世祖",
    posthumousName: "文皇帝",
    eraName: "黄初",
    reignPeriod: "220年 - 226年（在位6年）",
    lifespan: "187年 - 226年（享年40岁）",
    reignYears: 6,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Cao_Pi_Emperor_Wen_of_Wei.jpg/480px-Cao_Pi_Emperor_Wen_of_Wei.jpg",
    tags: ["魏开国皇帝", "九品中正制", "文学家", "典论论文"],
    isFamous: true,
    summary: "魏武帝曹操次子，逼迫汉献帝禅让登基，建立曹魏，正式开启三国时代。采纳陈群创立“九品中正制”，诗文并茂，建安文学代表人物。",
    achievements: [
      "结束东汉建立曹魏：接受献帝禅让，定都洛阳，改元黄初。",
      "创九品中正制：采纳尚书令陈群建议，改革官吏选拔制度，奠定魏晋南北朝选官基础。",
      "文学批评开山鼻祖：著《典论·论文》，提出“文以气为主”、“盖文章，经国之大业，不朽之盛事”。",
      "三路攻吴，虽未竟全功，然压制东吴与蜀汉，曹魏国力位列三国之首。"
    ],
    controversies: [
      "心胸偏狭嫉妒：逼弟曹植作七步诗，幽禁同母弟曹彰，严苛防范宗室诸侯王，为日后司马氏夺权埋下伏笔。",
      "赐死发妻甄宓。"
    ],
    quotes: "盖文章，经国之大业，不朽之盛事。年寿有时而尽，荣乐止乎其身。",
    anecdotes: "逼曹植作七步诗（煮豆燃豆萁）、与荀彧送空盒、典论论文。",
    evaluation: "陈寿《三国志》：“文帝天资文藻，下笔成章，博闻强识，才艺兼该。若加之以旷大之度，愍恻之恩，魏之宗基岂至于衰微！”"
  },
  {
    id: "shu-zhaolie-liu-bei",
    dynastyId: "san-guo",
    dynastyName: "三国·蜀汉",
    name: "刘备",
    templeName: "烈祖（一说无庙号）",
    posthumousName: "昭烈皇帝",
    eraName: "章武",
    reignPeriod: "221年 - 223年（在位2年）",
    lifespan: "161年 - 223年（享年63岁）",
    reignYears: 2,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Liu_Bei_portrait.jpg/480px-Liu_Bei_portrait.jpg",
    tags: ["蜀汉开国", "仁德之君", "三顾茅庐", "白帝托孤"],
    isFamous: true,
    summary: "汉景帝子中山靖王刘胜之后。织席贩履出身，百折不挠，三顾茅庐得诸葛亮，建立蜀汉延续汉祚，以仁义宽厚著称于世。",
    achievements: [
      "百折不挠崛起：颠沛流离半生，依附曹操、袁绍、刘表而不改宏图，赤壁战后取荆州、夺益州、克汉中。",
      "汉中之战击败曹操，自立为汉中王；曹丕篡汉后于成都称帝，延续汉家正统香火。",
      "知人善任推心置腹：三顾茅庐，信任诸葛亮“如鱼得水”；法正、关羽、张飞、赵云皆誓死相随。",
      "白帝城托孤：临终将幼主与国家托付诸葛亮，成为千古君臣相知典范。"
    ],
    controversies: [
      "为报关羽被杀之仇，执意倾全国之兵征吴，于夷陵之战被陆逊火烧连营七百里大败，蜀汉元气大伤。"
    ],
    quotes: "勿以恶小而为之，勿以善小而不为。惟贤惟德，能服于人。/ 君才十倍曹丕，必能安国，终定大事。若嗣子可辅，辅之；如其不才，君可自取。",
    anecdotes: "桃园三结义、三顾茅庐、携民渡江、煮酒论英雄、白帝城托孤。",
    evaluation: "陈寿《三国志》：“先主之弘毅宽厚，知人待士，盖有高祖之风，英雄之器焉。”毛泽东：“刘备这个人会用人，能团结人，这是他的大长处。”"
  },
  {
    id: "wu-dadi-sun-quan",
    dynastyId: "san-guo",
    dynastyName: "三国·东吴",
    name: "孙权",
    templeName: "太祖",
    posthumousName: "大皇帝",
    eraName: "黄龙、嘉禾、赤乌、太元、神凤",
    reignPeriod: "229年 - 252年（在位24年，称吴王7年）",
    lifespan: "182年 - 252年（享年71岁）",
    reignYears: 24,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Sun_Quan_portrait.jpg/480px-Sun_Quan_portrait.jpg",
    tags: ["东吴大帝", "赤壁鏖战", "开拓台湾", "晚年昏聩"],
    isFamous: true,
    summary: "孙坚次子、孙策之弟。十九岁统领江东，善于用人，赤壁破曹操、夷陵败刘备，开发江南、开拓夷洲（台湾），开创孙吴帝国。",
    achievements: [
      "赤壁之战大败曹操：力排众议拔剑砍案决意抗曹，任用周瑜大破曹操八十万大军于赤壁，奠定天下三分雏形。",
      "夷陵之战大破刘备：任用儒将陆逊火烧连营，守住江东半壁江山。",
      "开发台湾与南海：遣将军卫温、诸葛直率万余人航海到达夷洲（今台湾），为大陆官方开发台湾之最早明确记载。",
      "营建建业（南京），开凿江南运河破土开发江南经济。"
    ],
    controversies: [
      "晚年陷入“南鲁党争”立储风波，逼死丞相陆逊，流放杀害众多忠臣，致使东吴元气大伤。"
    ],
    quotes: "生子当如孙仲谋！（曹操叹服言）/ 能用众力，则无敌于天下矣；能用众智，则无畏于圣人矣。",
    anecdotes: "孙权劝学（吕蒙刮目相看）、草船借箭原型、骑马射虎、遣船探夷洲。",
    evaluation: "辛弃疾：“千古江山，英雄无觅孙仲谋处。天下英雄谁敌手？曹刘。生子当如孙仲谋。”"
  },

  // ==================== 两晋 (265 - 420年) ====================
  {
    id: "jin-wudi-sima-yan",
    dynastyId: "liang-jin",
    dynastyName: "西晋",
    name: "司马炎",
    templeName: "世祖",
    posthumousName: "武皇帝",
    eraName: "泰始、咸宁、太康、太熙",
    reignPeriod: "265年 - 290年（在位25年）",
    lifespan: "236年 - 290年（享年55岁）",
    reignYears: 25,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Emperor_Wu_of_Jin.jpg/480px-Emperor_Wu_of_Jin.jpg",
    tags: ["西晋开国", "统一三国", "太康之治", "羊车望幸"],
    isFamous: true,
    summary: "司马昭长子，逼迫魏元帝禅让建立晋朝。公元280年灭东吴统一中国，结束三国鼎立。开创“太康之治”，但晚年荒淫奢侈，埋下亡国巨祸。",
    achievements: [
      "灭吴一统：派遣王濬、杜预等水陆并进，彻底平定东吴孙皓，结束近百年三国割据分裂。",
      "太康之治：颁布《泰始律》，推行占田制与课田制，劝课农桑，人口经济大幅回升。",
      "休兵息民：罢州郡兵，专务农业生产。"
    ],
    controversies: [
      "大封司马氏同姓诸王二十余人并赋予重兵，直接引爆西晋惨绝人寰的“八王之乱”。",
      "立痴呆儿子司马衷为太子（晋惠帝），导致贾南风乱政。",
      "晚年极度荒淫奢侈：后宫佳丽万人，发明“羊车望幸”；石崇王恺斗富朝廷不加制止反而助长。"
    ],
    quotes: "天下既定，休兵罢战，四海归心。",
    anecdotes: "羊车望幸（插竹叶洒盐水引羊车）、石崇王恺斗富赐珊瑚树、洛阳纸贵。",
    evaluation: "房玄龄《晋书》：“武帝仁惠简素，有统御之策。然立储不肖，骨肉相残，五胡乱华，其阶祸于武帝矣！”"
  },
  {
    id: "jin-huidi",
    dynastyId: "liang-jin",
    dynastyName: "西晋",
    name: "司马衷",
    templeName: "无",
    posthumousName: "孝惠皇帝",
    eraName: "永熙、永平、元康、永康、永宁、太安、永安、建武、永安、永兴、光熙",
    reignPeriod: "290年 - 307年（在位17年）",
    lifespan: "259年 - 307年（终年48岁）",
    reignYears: 17,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Emperor_Wu_of_Jin.jpg/480px-Emperor_Wu_of_Jin.jpg",
    tags: ["痴呆皇帝", "何不食肉糜", "八王之乱", "悲剧傀儡"],
    isFamous: true,
    summary: "晋武帝次子，中国历史上著名的痴愚皇帝。皇后贾南风专权乱政，宗室诸侯王爆发长达十六年的“八王之乱”，直接招致“五胡乱华”与西晋灭亡。",
    achievements: [
      "平生几乎无政治作为，沦为诸王争夺挟持的傀儡。"
    ],
    controversies: [
      "智力低下，无法独立理政，天下发生大饥荒民不聊生，闻百姓无米充饥竟问“何不食肉糜”。",
      "八王之乱席卷中原，死伤数百万人，中原大地白骨露野，西晋国祚断送。"
    ],
    quotes: "百姓无粟米充饥，何不食肉糜？/ 此鸣者为官蛙乎，私蛙乎？",
    anecdotes: "何不食肉糜、公蛤蟆还是私蛤蟆、嵇绍血溅御衣（司马衷留衣言“此嵇侍中血，不可洗去”）。",
    evaluation: "王夫之：“惠帝愚民之不如，而天下拱手受制于贾后与诸王，斯乃古今未有之浩劫也。”"
  },
  {
    id: "jin-yuandi-sima-rui",
    dynastyId: "liang-jin",
    dynastyName: "东晋",
    name: "司马睿",
    templeName: "中宗",
    posthumousName: "元皇帝",
    eraName: "建武、大兴、永昌",
    reignPeriod: "318年 - 323年（在位5年）",
    lifespan: "276年 - 323年（享年47岁）",
    reignYears: 5,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Emperor_Wu_of_Jin.jpg/480px-Emperor_Wu_of_Jin.jpg",
    tags: ["东晋开国", "王与马共天下", "偏安江南", "衣冠南渡"],
    isFamous: true,
    summary: "西晋宗室琅邪王，西晋灭亡后在王导、王敦门阀士族支持下建立东晋于建康（南京）。开启世家大族与皇权共治的“门阀政治”。",
    achievements: [
      "建立东晋延续社稷：招揽北方南下流民士族与江南本土世族，稳定江南政局。",
      "开启“衣冠南渡”：中原汉人与士族大规模南迁，促进长江流域与江南经济文化的大繁荣。"
    ],
    controversies: [
      "皇权极度虚弱，朝权完全由琅邪王氏掌控，时称“王与马，共天下”。",
      "晚年试图削弱王氏引爆“王敦之乱”，司马睿忧愤而死。"
    ],
    quotes: "王与马，共天下。（时人歌谣）",
    anecdotes: "登基请王导同升御床、新亭对泣（风景不殊，举目有河山之异）。",
    evaluation: "房玄龄：“元帝恭俭宽恕，拔萃南溟，保有江左，然而寄人篱下，宗社权分于宰辅。”"
  },

  // ==================== 南北朝 (420 - 589年) ====================
  {
    id: "nan-song-wudi-liu-yu",
    dynastyId: "nan-bei-chao",
    dynastyName: "南朝·宋",
    name: "刘裕",
    templeName: "高祖",
    posthumousName: "武皇帝",
    eraName: "永初",
    reignPeriod: "420年 - 422年（在位2年）",
    lifespan: "363年 - 422年（享年60岁）",
    reignYears: 2,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Emperor_Wu_of_Jin.jpg/480px-Emperor_Wu_of_Jin.jpg",
    tags: ["气吞万里如虎", "南朝第一帝", "北伐名将", "终结东晋"],
    isFamous: true,
    summary: "西汉楚元王刘交二十二世孙。寒门北府兵崛起，金戈铁马两度北伐，灭南燕、后秦，收复长安与洛阳，代晋建宋，被誉为“南朝第一帝”。",
    achievements: [
      "气吞万里如虎：两度北伐，却月阵以步制骑重创北魏铁骑，克复洛阳、长安，收复淮北、山东、河南、关中。",
      "废除东晋士族九品特权，重用寒门子弟（“寒人掌机要”），打破门阀世族垄断垄断局面。",
      "改革赋税整理户籍（土断），减轻农民负担，抑制土地兼并，开创“元嘉之治”坚实根基。"
    ],
    controversies: [
      "为绝后患，开了篡位弑杀前朝废帝（晋安帝、晋恭帝）之先例，导致后代南朝朝代更迭多伴残酷杀戮。"
    ],
    quotes: "想当年，金戈铁马，气吞万里如虎！（辛弃疾词）",
    anecdotes: "却月阵大破北魏铁骑、草鞋天子刘寄奴、收复故都长安。",
    evaluation: "王夫之《读通鉴论》：“自汉以还，乘时蹶起，能诛剪奸逆，一统中原，拓境数千里者，刘裕一人而已。”"
  },
  {
    id: "nan-liang-wudi-xiao-yan",
    dynastyId: "nan-bei-chao",
    dynastyName: "南朝·梁",
    name: "萧衍",
    templeName: "高祖",
    posthumousName: "武皇帝",
    eraName: "天监、普通、大通、中大通、大同、中大同、太清",
    reignPeriod: "502年 - 549年（在位47年）",
    lifespan: "464年 - 549年（享年86岁）",
    reignYears: 47,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Emperor_Wu_of_Jin.jpg/480px-Emperor_Wu_of_Jin.jpg",
    tags: ["菩萨皇帝", "南朝在位最长", "崇佛舍身", "侯景之乱"],
    isFamous: true,
    summary: "西汉萧何后裔。南朝在位时间最长之君（47年）。精通文史音律佛法，前期政治清明，后期极度崇佛四次出家舍身同泰寺，引发“侯景之乱”饿死台城。",
    achievements: [
      "前期励精图治：立“谤木函”与“肺石函”广泛纳谏，创五经馆推崇儒学教育。",
      "文化艺术鼎盛：亲自编纂经史，倡导佛教戒律吃素（汉传佛教食素传统由此确立）。"
    ],
    controversies: [
      "四次舍身入寺为僧，朝廷花费数亿巨资公帑将其“赎回”，大建寺院“南朝四百八十寺”。",
      "姑息养奸接纳东魏降将侯景，导致“侯景之乱”屠掠江南，八十六岁高龄被困台城活活饿死。"
    ],
    quotes: "自我得之，自我失之，亦复何恨！",
    anecdotes: "四舍身同泰寺、达摩祖师与梁武帝论功德“并无功德”、台城断粮求蜜不得而卒。",
    evaluation: "杜牧：“南朝四百八十寺，多少楼台烟雨中。”魏徵：“梁武帝笃信释氏，虚掷国资，弃君臣之大节，致台城之覆灭。”"
  },
  {
    id: "bei-wei-xiaowendi",
    dynastyId: "nan-bei-chao",
    dynastyName: "北朝·北魏",
    name: "拓跋宏（改姓元宏）",
    templeName: "高祖",
    posthumousName: "孝文皇帝",
    eraName: "延兴、承明、太和",
    reignPeriod: "471年 - 499年（在位28年）",
    lifespan: "467年 - 499年（终年33岁）",
    reignYears: 28,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Emperor_Wu_of_Jin.jpg/480px-Emperor_Wu_of_Jin.jpg",
    tags: ["孝文帝改革", "迁都洛阳", "民族大融合", "断北语改汉姓"],
    isFamous: true,
    summary: "北魏第七位皇帝。杰出的少数民族政治家与改革家。毅然力排众议迁都洛阳，推行全面汉化改革，促进中华民族历史上最伟大的民族大融合。",
    achievements: [
      "太和改制迁都洛阳：以假装南伐为名，率百万大军毅然自平城（大同）迁都中原洛阳。",
      "全面推行汉化政策：改汉姓（拓跋改姓元）、穿汉服、说汉语（断诸北语，三十以下全说正音汉语）、通汉婚、改官制。",
      "推行均田制与三长制：按人口分配荒地给农民耕作，确立基层邻、里、党三长治理，极大促进北方农业恢复。"
    ],
    controversies: [
      "汉化改革过于激进迅速，导致平城守旧鲜卑贵族与北方六镇将士被边缘化，为日后北方“六镇之乱”埋下隐患。"
    ],
    quotes: "今日之行，诚知不易。但国家兴自北方，徙居平城，虽富有四海，不能开拓盛化，必须移都洛阳以光大王道！",
    anecdotes: "假南征巧迁都、太子元恂私返平城被处死以正法度、拓跋改元姓。",
    evaluation: "司马光《资治通鉴》：“高祖幼冲即位，聪明夙成，改定律令，迁都洛邑，天下向化，可谓雄图之主矣！”"
  },

  // ==================== 隋朝 (581 - 618年) ====================
  {
    id: "sui-wendi-yang-jian",
    dynastyId: "sui",
    dynastyName: "隋朝",
    name: "杨坚",
    templeName: "高祖",
    posthumousName: "文皇帝",
    eraName: "开皇、仁寿",
    reignPeriod: "581年 - 604年（在位23年）",
    lifespan: "541年 - 604年（享年64岁）",
    reignYears: 23,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Sui_Wendi_Tang.jpg/480px-Sui_Wendi_Tang.jpg",
    tags: ["隋开国皇帝", "大一统", "开皇之治", "创立科举", "三省六部制"],
    isFamous: true,
    summary: "代北周建立隋朝。南下灭陈，终结魏晋南北朝近三百年的大分裂，重新实现全国大一统。创立科举制、三省六部制，开创“开皇之治”。",
    achievements: [
      "大一统归一：公元589年命晋王杨广南下灭陈，结束中国自西晋末年近三百年的长期分裂割据局面。",
      "开创科举制度雏形：废除九品中正制，初设按才取士、分科考试选官，打破世家门阀垄断阶层流动通道。",
      "创立三省六部制：确立中书省、门下省、尚书省及吏、户、礼、兵、刑、工六部，奠定后世千年官僚中枢框架。",
      "颁布《开皇律》，推行大索貌阅整顿户籍，仓库充盈，天下富足，所积粮食至唐贞观年间尚未食尽。"
    ],
    controversies: [
      "晚年性情猜忌苛细，听信独孤皇后与杨素谗言废长立幼（废太子杨勇，立晋王杨广），引致二世而亡。",
      "仁寿宫之变中暴卒，死因成千古之谜。"
    ],
    quotes: "天下一家，同朕骨肉，有司慎恤，无使失所。",
    anecdotes: "独孤皇后一夫一妻誓言、开皇粮仓（含嘉仓历经千年粟米尚存）、一钱落井杖责犯人。",
    evaluation: "西方学者麦克·哈特《影响人类历史进程的100位名人排行榜》位列杨坚为中国最伟大帝王之一。魏徵：“高祖受命，躬节俭以化天下，开皇之治，家给人足。”"
  },
  {
    id: "sui-yangdi-yang-guang",
    dynastyId: "sui",
    dynastyName: "隋朝",
    name: "杨广",
    templeName: "世祖（一说明宗）",
    posthumousName: "炀皇帝（唐朝上谥） / 闵皇帝",
    eraName: "大业",
    reignPeriod: "604年 - 618年（在位14年）",
    lifespan: "569年 - 618年（终年50岁）",
    reignYears: 14,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Sui_Yangdi_Tang.jpg/480px-Sui_Yangdi_Tang.jpg",
    tags: ["大运河开凿", "创立进士科", "西巡张掖", "千古争议暴君", "二世而亡"],
    isFamous: true,
    summary: "隋文帝次子。雄才大略与暴虐骄狂并存。开凿大运河、创设进士科、营建东都洛阳、西巡张掖、三征高句丽，滥用民力致天下大乱被弑。",
    achievements: [
      "开凿隋唐大运河：连接海河、黄河、淮河、长江、钱塘江五大水系，沟通南北经济动脉，泽被后世千余年。",
      "正式创立进士科：标志着科举制度的正式诞生，成为中国封建选官制度的最重大跃升。",
      "西巡张掖举办万国博览会，降服西突厥与吐谷浑，打通丝绸之路新北道。",
      "营建东都洛阳，修筑驰道长城。"
    ],
    controversies: [
      "功在千秋，罪在当代：徭役赋税空前沉重，数百万民夫开运河筑东都，民不聊生。",
      "三征高句丽三次惨败：耗竭天下兵马粮饷，引发山东王薄起义及全国反隋大风暴。",
      "江都行宫被宇文化及发动兵变缢杀，隋朝迅速灭亡。"
    ],
    quotes: "尽道隋亡为此河，至今千里赖通波。若无水殿龙舟事，共禹论功不较多。（皮日休诗）",
    anecdotes: "造龙舟三千艘下江都、万国博览会丝绸缠树、雁门关之围被突厥围困。",
    evaluation: "李世民：“炀帝凭其富强，肆意暴虐，身丧国灭，可为深鉴。”皮日休：“罪浮于桀纣，功迈于禹汤。”"
  },

  // ==================== 唐朝 (618 - 907年) ====================
  {
    id: "tang-gaozu-li-yuan",
    dynastyId: "tang",
    dynastyName: "唐朝",
    name: "李渊",
    templeName: "高祖",
    posthumousName: "神尧大圣大光孝皇帝",
    eraName: "武德",
    reignPeriod: "618年 - 626年（在位8年）",
    lifespan: "566年 - 635年（享年70岁）",
    reignYears: 8,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/TangGaoZu.jpg/480px-TangGaoZu.jpg",
    tags: ["大唐开国", "晋阳起兵", "扫平群雄", "开创新纪元"],
    isFamous: true,
    summary: "关陇贵族出身，唐国公。大业末年晋阳起兵，迅速占领长安建立大唐。统筹全局扫平王世充、窦建德等群雄，实现全国一统。",
    achievements: [
      "晋阳起兵太原起事：审时度势，联络突厥借兵，秋风扫落叶般占领长安关中天险要地。",
      "扫平各路割据群雄：薛举、刘武周、王世充、窦建德、萧铣等诸强先后荡平，天下一统。",
      "开创大唐制度基石：颁布《武德律》，确立租庸调制与均田制，铸行“开元通宝”统一币制。"
    ],
    controversies: [
      "立储优柔寡断，任由太子李建成与秦王李世民结党内耗争斗，最终引爆玄武门之变，被迫退位为太上皇。"
    ],
    quotes: "此天授我也！今大事已成，宜乘虚入关，号令天下。",
    anecdotes: "雀屏中选射中雀目迎娶窦皇后、晋阳密谋起兵、玄武门变后泛舟海池。",
    evaluation: "《旧唐书》：“高祖识晦明之数，乘草昧之机，应运启图，翦鲸鲵而定区宇，建邦启土，盛矣哉！”"
  },
  {
    id: "tang-taizong-li-shimin",
    dynastyId: "tang",
    dynastyName: "唐朝",
    name: "李世民",
    templeName: "太宗",
    posthumousName: "文武大圣大广孝皇帝",
    eraName: "贞观",
    reignPeriod: "626年 - 649年（在位23年）",
    lifespan: "598年 - 649年（享年52岁）",
    reignYears: 23,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Tang_Taizong.jpg/480px-Tang_Taizong.jpg",
    tags: ["千古一帝", "贞观之治", "天可汗", "兼听则明", "魏征进谏"],
    isFamous: true,
    summary: "大唐实际军事奠基人。发动玄武门之变即位。善于纳谏任贤，对外击灭东突厥被尊为“天可汗”，开创名垂千古的“贞观之治”。",
    achievements: [
      "以人为镜，兼听则明：重用诤臣魏徵（进谏两百余次）、房玄龄、杜如晦（房谋杜断），朝政极为开明。",
      "天可汗威服四海：命李靖、李绩千里奔袭灭东突厥，俘颉利可汗；征服吐谷浑、高昌，被西北各族首领共尊为“天可汗”。",
      "文成公主入藏：开创汉藏民族和睦通好佳话；完善科举与三省六部制，实行羁縻府州治。",
      "贞观之治政治清明：天下大治，夜不闭户路不拾遗，死刑犯仅二十九人，民富国强。"
    ],
    controversies: [
      "玄武门之变射杀长兄李建成、齐王李元吉，逼父退位，有亏人伦。",
      "晚年亲征高句丽未能全功；稍渐骄矜，营建翠微宫。"
    ],
    quotes: "夫以铜为镜，可以正衣冠；以史为镜，可以知兴替；以人为镜，可以明得失。朕尝宝此三镜，以防己过。今魏徵殂逝，遂亡一镜矣！",
    anecdotes: "玄武门之变、昭陵六骏、魏征怒谏止猎、纵囚归家秋期就死。",
    evaluation: "司马光《资治通鉴》：“太宗文武之才，高出前古。听言纳谏，进德修业，开元之治，灿然可观，自三代以下，未之有也！”毛泽东：“自古能军无出李世民之右者。”"
  },
  {
    id: "tang-gaozong-li-zhi",
    dynastyId: "tang",
    dynastyName: "唐朝",
    name: "李治",
    templeName: "高宗",
    posthumousName: "天皇大帝 / 天皇大弘孝皇帝",
    eraName: "永徽、显庆、龙朔、麟德、乾封、总章、咸亨、上元、仪凤、调露、永隆、开耀、永淳、弘道",
    reignPeriod: "649年 - 683年（在位34年）",
    lifespan: "628年 - 683年（享年56岁）",
    reignYears: 34,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Tang_Gaozong.jpg/480px-Tang_Gaozong.jpg",
    tags: ["永徽之治", "疆域极盛", "平定百济高句丽", "二圣临朝"],
    isFamous: true,
    summary: "唐太宗第九子。性格仁慈隐忍，开创“永徽之治”。在位期间大唐疆域达到历史最鼎盛（东起朝鲜半岛，西至咸海，达1237万平方公里），晚年与武后“二圣临朝”。",
    achievements: [
      "疆域极盛：命苏定方、李绩灭西突厥、灭百济、彻底灭亡高句丽，设安东都护府与安西都护府，版图超1200万平方公里。",
      "颁布《唐律疏议》（《永徽律疏》）：中国历史上现存最早最完备的封建法典，东亚中华法系之渊源。",
      "白江口海战：大败日本倭国水军，日本从此仰慕华夏全面学习大唐数百年。"
    ],
    controversies: [
      "废王立武：立武则天为皇后，借此清洗长孙无忌、褚遂良等关陇贵族元老，使武后逐渐掌控朝政权力。",
      "晚年患风眩重疾，难以理政，朝权尽归天后武氏，“二圣临朝”。"
    ],
    quotes: "兵者凶器，不得已而用之，边关靖宁，方是苍生之福。",
    anecdotes: "二圣临朝、封禅泰山武后同拜、白江口大捷焚倭舟四百艘。",
    evaluation: "近世历史学家翻案：高宗非懦弱昏君，乃深藏不露之雄主，借立武后打破关陇世阀，开疆拓土远超太宗。"
  },
  {
    id: "wu-zetian",
    dynastyId: "tang",
    dynastyName: "武周（唐朝并列）",
    name: "武曌（武则天）",
    templeName: "太祖（武周） / 无（唐复辟去帝号）",
    posthumousName: "则天大圣皇后 / 则天顺圣皇后",
    eraName: "天授、如意、长寿、延载、证圣、天册万岁、万岁登封、万岁通天、神功、圣历、久视、大足、长安",
    reignPeriod: "690年 - 705年（称帝15年，称制参与国政近50年）",
    lifespan: "624年 - 705年（享年82岁）",
    reignYears: 15,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Wu_Zetian_portrait.jpg/480px-Wu_Zetian_portrait.jpg",
    tags: ["唯一正统女皇", "政启开元", "武周革命", "无字碑", "殿试创举"],
    isFamous: true,
    summary: "中国历史上唯一被正史承认的正统女皇帝。改国号为周。大力革新科举，首创殿试与武举，破格拔擢狄仁杰、姚崇等名相，上承贞观下启开元。",
    achievements: [
      "破格用人与科举革新：创立殿试制与武举制，推行“自荐求官”，打破世家门阀垄断，拔擢狄仁杰、张柬之、姚崇、宋璟。",
      "奖励农桑修养生息：编撰《兆人本业记》颁行天下，推行劝农减赋，全国户口持续大幅增长。",
      "政启开元，治宏贞观：保持了大唐社会的安定与经济向前发展，为开元盛世铺平道路。"
    ],
    controversies: [
      "大兴告密之风，起用周兴、来俊臣等酷吏严刑逼供，滥杀唐宗室及异己大臣。",
      "晚年宠信张易之、张昌宗男宠兄弟，朝政渐趋奢靡怠惰，引爆神龙政变被逼退位。"
    ],
    quotes: "日月当空，曌临天下。/ 己之功过，留待后人评说。（乾陵无字碑）",
    anecdotes: "请君入瓮（来俊臣入周兴之瓮）、自造新字（曌）、神龙政变、乾陵无字碑留后人评说。",
    evaluation: "郭沫若：“政启开元，治宏贞观；芳流剑阁，光映临邛。”司马光：“政由己出，明察善断，故当时英贤亦竞为之用。”"
  },
  {
    id: "tang-xuanzong-li-longji",
    dynastyId: "tang",
    dynastyName: "唐朝",
    name: "李隆基",
    templeName: "玄宗",
    posthumousName: "至道大圣大明孝皇帝（通称唐明皇）",
    eraName: "先天、开元、天宝",
    reignPeriod: "712年 - 756年（在位44年）",
    lifespan: "685年 - 762年（享年78岁）",
    reignYears: 44,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/TangXuanzong.jpg/480px-TangXuanzong.jpg",
    tags: ["开元盛世", "大唐极盛", "安史之乱", "天宝危机", "极盛而衰"],
    isFamous: true,
    summary: "唐睿宗第三子。诛韦后平太平公主。前期励精图治任用姚崇宋璟，缔造华夏极盛之“开元盛世”。后期宠杨贵妃怠政，爆发安史之乱，唐朝由盛转衰。",
    achievements: [
      "开创开元盛世：大唐政治、经济、文化、艺术达到巅峰，人口达八千万，四海升平，“稻米流脂粟米白，公私仓廪俱丰实”。",
      "任贤革新：任用姚崇、宋璟、韩休、张九龄等贤相，整顿吏治，检括户口土地，改革兵制（募兵制）。",
      "盛唐文化巅峰：李白、杜甫、高适、王维、孟浩然齐聚盛唐，梨园祖师，亲自谱写《霓裳羽衣曲》。"
    ],
    controversies: [
      "天宝怠政：改元天宝后沉溺享乐，宠幸杨贵妃，任用奸相李林甫“口蜜腹剑”、杨国忠弄权专横。",
      "重用胡将安禄山并赐予范阳、平卢、河东三镇节度使，致使“安史之乱”爆发，两京沦陷，逃奔蜀中，马嵬坡兵变赐死杨贵妃。",
      "安史之乱导致大唐由盛转衰，北方残破，藩镇割据尾大不掉。"
    ],
    quotes: "忆昔开元全盛日，小邑犹藏万家室。稻米流脂粟米白，公私仓廪俱丰实。（杜甫诗）",
    anecdotes: "马嵬坡兵变、霓裳羽衣舞、一骑红尘妃子笑、力士脱靴李白醉草吓蛮书、口蜜腹剑李林甫。",
    evaluation: "司马光：“玄宗前四十载，虽汉文景、宣帝不能及；后十余载，虽汉桓灵、隋炀帝亦无以加。盛衰之极，一人备之，悲夫！”"
  },
  {
    id: "tang-xianzong-li-chun",
    dynastyId: "tang",
    dynastyName: "唐朝",
    name: "李纯",
    templeName: "宪宗",
    posthumousName: "昭文章武大圣至神孝皇帝",
    eraName: "元和",
    reignPeriod: "805年 - 820年（在位15年）",
    lifespan: "778年 - 820年（终年43岁）",
    reignYears: 15,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Tang_Xianzong.jpg/480px-Tang_Xianzong.jpg",
    tags: ["元和中兴", "削平藩镇", "雪夜入蔡州", "中兴明主"],
    isFamous: true,
    summary: "唐德宗之孙。中唐杰出帝王。刚毅果决，以极大毅力重拳削藩，支持李愬雪夜入蔡州生擒吴元济，平定淮西、河北藩镇，实现大唐元和中兴。",
    achievements: [
      "削平割据藩镇：力主平定刘辟、李锜，命李愬雪夜奇袭蔡州灭吴元济，强迫成德、幽州等河北藩镇纳贡归命，全国暂归统一。",
      "任用贤相杜黄裳、裴度、李绛等，整顿财政税收，实现“元和中兴”。"
    ],
    controversies: [
      "晚年骄奢自矜，迎佛骨劳民伤财，服食道家丹药金石，脾气暴躁，最终被宦官陈弘志等弑杀。"
    ],
    quotes: "天下事在朕决之，藩镇跋扈，朕誓荡平！",
    anecdotes: "李愬雪夜入蔡州奇袭破城、韩愈谏迎佛骨被贬潮州。",
    evaluation: "《旧唐书》：“宪宗睿智宏深，明于听纳。提三尺剑以令四方，虽文帝、景帝不能加也。”"
  },
  {
    id: "tang-wuzong-li-yan",
    dynastyId: "tang",
    dynastyName: "唐朝",
    name: "李炎",
    templeName: "武宗",
    posthumousName: "至神昭道翼顺仁惠孝皇帝",
    eraName: "会昌",
    reignPeriod: "840年 - 846年（在位6年）",
    lifespan: "814年 - 846年（终年33岁）",
    reignYears: 6,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/TangSuzong.jpg/480px-TangSuzong.jpg",
    tags: ["会昌中兴", "会昌灭佛", "击溃回鹘", "刚毅英断"],
    isFamous: false,
    summary: "唐穆宗第五子。任用贤相李德裕，沉重打击飞扬跋扈的宦官与割据藩镇，击破回鹘残余部众。主持“会昌灭佛”收回大量土地人口，史称“会昌中兴”。",
    achievements: [
      "会昌灭佛（三武一宗灭佛之一）：拆毁寺院四万余所，强令二十六万僧尼还俗，没收寺院良田数千万亩充实国库与农耕。",
      "击溃回鹘乌介可汗，收降回鹘十万之众，降服泽潞刘稹叛乱，重振朝纲。"
    ],
    controversies: [
      "灭佛手段严酷激烈，毁坏无数传世佛像文物经卷；迷信丹药过早暴卒。"
    ],
    quotes: "僧尼食不耕之粮，衣不织之帛，大耗国家之财，岂可容忍！",
    anecdotes: "李德裕辅政力整朝局、会昌灭佛还俗天下僧尼。",
    evaluation: "司马光：“武宗雄谋勇断，能任用贤相，削平强乱，唐室几复振焉。”"
  },

  // ==================== 五代十国 (907 - 960年) ====================
  {
    id: "hou-zhou-shizong-chai-rong",
    dynastyId: "wu-dai",
    dynastyName: "五代·后周",
    name: "柴荣（郭荣）",
    templeName: "世宗",
    posthumousName: "睿武孝文皇帝",
    eraName: "显德",
    reignPeriod: "954年 - 959年（在位5年）",
    lifespan: "921年 - 959年（终年39岁）",
    reignYears: 5,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Emperor_Shizong_of_Later_Zhou.jpg/480px-Emperor_Shizong_of_Later_Zhou.jpg",
    tags: ["五代第一明君", "高平之战", "以十年开边", "为北宋奠基"],
    isFamous: true,
    summary: "后周太祖郭威内侄兼养子。五代时期公认最伟大帝王。高平之战亲冒矢石大破北汉契丹联军，整顿禁军，南征南唐、北伐契丹收复三关，为宋朝大一统铺平道路。",
    achievements: [
      "高平之战力挽狂澜：面对强敌临阵脱逃的危局，柴荣亲冒矢石督战，大败北汉契丹联军，斩杀溃敌将领严明军纪。",
      "整顿禁军精简冗员：招募天下壮勇组建“殿前诸班”，打造五代最精锐铁血禁军（赵匡胤即为其麾下大将）。",
      "三征南唐取江北十四州：迫使南唐中主李璟去帝号纳贡称臣割地。",
      "北伐契丹收复三关：四十二天兵不血刃收复莫州、瀛州二州及益津关、瓦桥关、淤口关三关十六县。",
      "治理经济澄清吏治：毁佛铸钱（周元通宝），均定田税，兴修水利，国势蒸蒸日上。"
    ],
    controversies: [
      "天不假年：北伐幽州前夕突染重病回师，英年早逝，留下七岁幼子郭宗训，导致赵匡胤陈桥兵变夺位。"
    ],
    quotes: "朕当以十年开拓天下，十年养百姓，十年致太平！",
    anecdotes: "高平督战斩逃将、毁铜佛铸钱言“佛以善道化人，苟利苍生，佛身尚可舍，何惜铜像乎”、瓦桥关受病符退兵。",
    evaluation: "欧阳修《新五代史》：“世宗区区五六载间，取秦陇，平江淮，败契丹，威震天下，其算无遗策，兵无留行，何其伟哉！”"
  },
  {
    id: "nan-tang-hou-zhu-li-yu",
    dynastyId: "wu-dai",
    dynastyName: "十国·南唐",
    name: "李煜",
    templeName: "无（后主）",
    posthumousName: "无（宋封违命侯）",
    eraName: "无（去帝号奉宋正朔）",
    reignPeriod: "961年 - 975年（在位14年）",
    lifespan: "937年 - 978年（终年42岁）",
    reignYears: 14,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Li_Yu_portrait.jpg/480px-Li_Yu_portrait.jpg",
    tags: ["词中之帝", "千古词帝", "悲情亡国", "春花秋月何时了"],
    isFamous: true,
    summary: "南唐中主李璟第六子。政治上昏弱偏安，文学艺术上却为千古独步之“词中之帝”。南唐亡于北宋后被俘汴京，因《虞美人》词被宋太宗牵机药毒杀。",
    achievements: [
      "千古词宗：将“词”从花间酒肆之艳曲提升至关照生命宇宙之绝高峰境，《虞美人》《相见欢》《破阵子》《浪淘沙》千古传诵。",
      "精通琴棋书画与音律，与小周后考订《霓裳羽衣曲》残谱。"
    ],
    controversies: [
      "作为一国之君，不问政事，崇佛误国，冤杀抗宋名将林仁肇，北宋大军围城时犹在宫中听道士讲经。",
      "亡国肉袒降宋，身陷囹圄受尽屈辱。"
    ],
    quotes: "问君能有几多愁？恰似一江春水向东流。/ 春花秋月何时了？往事知多少。小楼昨夜又东风，故国不堪回首月明中。",
    anecdotes: "金陵城破肉袒降宋、牵机药毒发腹痛致死、大小周后情史。",
    evaluation: "王国维《人间词话》：“词至李后主而眼界始大，感慨遂深，遂变伶工之词而为士大夫之词。词中之帝，当之无愧。”"
  },

  // ==================== 北宋 (960 - 1127年) ====================
  {
    id: "song-taizu-zhao-kuangyin",
    dynastyId: "bei-song",
    dynastyName: "北宋",
    name: "赵匡胤",
    templeName: "太祖",
    posthumousName: "启运立极英武睿圣文肃德宪大功至德高孝皇帝",
    eraName: "建隆、乾德、开宝",
    reignPeriod: "960年 - 976年（在位16年）",
    lifespan: "927年 - 976年（享年50岁）",
    reignYears: 16,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Song_Taizu.jpg/480px-Song_Taizu.jpg",
    tags: ["大宋开国", "黄袍加身", "杯酒释兵权", "重文抑武", "崇文之治"],
    isFamous: true,
    summary: "后周殿前都点检。陈桥兵变黄袍加身代周建宋。先南后北荡平荆南、后蜀、南汉、南唐，基本统一中原与南方。杯酒释兵权，终结唐末以来藩镇兵变乱局。",
    achievements: [
      "陈桥兵变和平夺权：兵不血刃代后周建立宋朝，保护后周柴氏皇族，立“誓碑”不杀士大夫及上书言事人。",
      "杯酒释兵权：设宴劝退石守信等禁军大将兵权，彻底解决唐末五代百余年军阀割据武人篡权之毒瘤。",
      "削藩分权：收天下精兵归中央（禁军），设转运使收地方财权，知州派文官担任，实行强干弱枝。",
      "先南后北统一大略：平荆南、湖南、灭后蜀、灭南汉、灭南唐，奠定大宋版图大一统基业。"
    ],
    controversies: [
      "重文抑武国策过甚，致使宋朝军队战斗力逐渐积弱，外战屡受北方游牧民族压制。",
      "“烛影斧声”千古之谜：开宝九年与弟赵光义饮酒，翌日暴卒，赵光义即位，死因众说纷纭。"
    ],
    quotes: "卧榻之侧，岂容他人鼾睡！/ 不杀士大夫及上书言事人。（宋太祖秘密誓碑）",
    anecdotes: "陈桥驿黄袍加身、杯酒释兵权、雪夜访赵普、烛影斧声。",
    evaluation: "范仲淹：“祖宗以来，以文治国，二百年间，天下无内乱之虞，自汉唐以来未之有也。”毛泽东：“唐宗宋祖，稍逊风骚。”"
  },
  {
    id: "song-taizong-zhao-guangyi",
    dynastyId: "bei-song",
    dynastyName: "北宋",
    name: "赵光义（赵炅）",
    templeName: "太宗",
    posthumousName: "至仁应道神功圣德文武睿烈明肃章圣大统至孝皇帝",
    eraName: "太平兴国、雍熙、端拱、淳化、至道",
    reignPeriod: "976年 - 997年（在位21年）",
    lifespan: "939年 - 997年（享年59岁）",
    reignYears: 21,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Song_Taizong.jpg/480px-Song_Taizong.jpg",
    tags: ["高梁河之战", "雍熙北伐", "金匮之盟", "崇文开科"],
    isFamous: true,
    summary: "宋太祖之弟。逼迫吴越钱弘俶纳土归印，灭北汉彻底结束五代十国分裂。两度北伐辽国试图收复燕云十六州，遭遇高梁河之战与岐沟关之败，转入全面战略防御。",
    achievements: [
      "灭北汉迫吴越纳土：攻灭北汉刘继元，消灭五代最后一个割据政权，天下终归一统。",
      "极力扩大科举规模：大幅扩招进士，录取人数为太祖朝十倍之多，彻底确立士大夫治国体制。",
      "编纂四大部书：主持编修《太平广记》《太平御览》《文苑英华》《册府元龟》，文化空前昌盛。"
    ],
    controversies: [
      "高梁河之战指挥极度拙劣，宋军惨败，太宗中箭乘驴车逃脱（驴车战神蔑称源于此）；雍正北伐杨业战死陈家谷。",
      "金匮之盟真伪莫辨，逼死太祖长子赵德昭、次子赵德芳，幽死亲弟赵廷美，皇位合法性饱受争议。"
    ],
    quotes: "开卷有益，朕不以为疲。（《太平御览》修成时语）",
    anecdotes: "乘驴车溃逃高梁河、金匮之盟、逼死侄儿赵德昭、开卷有益成语出处。",
    evaluation: "《宋史》：“帝沉谋英断，开疆定宇，崇文抑武，功业甚盛。唯高梁河之战、岐沟关之溃，未能克复燕云，惜哉！”"
  },
  {
    id: "song-zhenzong-zhao-heng",
    dynastyId: "bei-song",
    dynastyName: "北宋",
    name: "赵恒",
    templeName: "真宗",
    posthumousName: "膺符稽古神功让德文明武定章圣元孝皇帝",
    eraName: "咸平、景德、大中祥符、天禧、乾兴",
    reignPeriod: "997年 - 1022年（在位25年）",
    lifespan: "968年 - 1022年（享年55岁）",
    reignYears: 25,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Song_Zhenzong.jpg/480px-Song_Zhenzong.jpg",
    tags: ["澶渊之盟", "咸平之治", "封禅泰山", "书中自有黄金屋"],
    isFamous: true,
    summary: "宋太宗第三子。前期任用寇准、李沆开创“咸平之治”。亲征澶州抵抗辽军，签订著名的“澶渊之盟”，为宋辽带来百余年和平。晚年沉迷天书封禅。",
    achievements: [
      "澶渊之盟：在寇准坚决力劝下御驾亲征澶州北城鼓舞士气，射杀辽军统军萧挞凛，与辽萧太后订立和约，以三十万岁币换得宋辽百年无大战。",
      "推广占城稻：从福建引种早熟耐旱的占城稻到江淮两浙，极大提升粮食总产量。",
      "劝学千古绝唱：撰写《励学篇》，“书中自有黄金屋，书中自有颜如玉”，推动读书风气风靡全国。"
    ],
    controversies: [
      "因签订和约深感屈辱，听信王钦若奸计，伪造“天书降世”，劳民伤财大举泰山封禅与汾阴祀后土，闹剧收场。"
    ],
    quotes: "富家不用买良田，书中自有千钟粟。安居不用架高楼，书中自有黄金屋。娶妻莫恨无良媒，书中自有颜如玉。（《劝学诗》）",
    anecdotes: "澶州御驾亲征、天书封禅泰山闹剧、狸猫换太子（其皇后刘娥故事原型）。",
    evaluation: "司马光：“真宗亲征澶渊，息民休兵，可谓明矣。然中被王钦若所诱，遂有天书封禅之举，君子惜之。”"
  },
  {
    id: "song-renzong-zhao-zhen",
    dynastyId: "bei-song",
    dynastyName: "北宋",
    name: "赵祯",
    templeName: "仁宗",
    posthumousName: "条天阐道极功全德神文圣武睿感昭孝皇帝",
    eraName: "天圣、明道、景祐、宝元、康定、庆历、皇祐、至和、嘉祐",
    reignPeriod: "1022年 - 1063年（在位41年）",
    lifespan: "1010年 - 1063年（享年54岁）",
    reignYears: 41,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Song_Renzong.jpg/480px-Song_Renzong.jpg",
    tags: ["仁宗盛世", "千古第一仁君", "名臣璀璨", "庆历新政", "文豪井喷"],
    isFamous: true,
    summary: "宋真宗第六子，在位41年为两宋最长。中国历史上唯一的“仁”字至高庙号。宽仁包容，名臣文豪井喷式爆发（包拯、范仲淹、欧阳修、苏轼、司马光等），社会文化极其繁荣。",
    achievements: [
      "群星闪耀的仁宗朝：包拯铁面无私、范仲淹与富弼主持“庆历新政”、司马光撰《资治通鉴》、王安石展露头角，唐宋八大家宋代六人（欧阳修、苏洵、苏轼、苏辙、曾巩、王安石）全聚此时。",
      "科技文化革命：毕昇发明活字印刷术、苏颂发明水运仪象台、沈括早年求学，纸币交子正式官办发行。",
      "宽仁律己虚心纳谏：包拯唾沫星子喷到仁宗脸上仍能虚心接受，苏辙殿试直斥其非照常录取，深得天下万民与辽国君臣由衷敬佩。"
    ],
    controversies: [
      "性格偏软，庆历新政遇旧贵族阻挠后未能坚决坚持到底，宋夏三川口、好水川之战屡屡受挫败给李元昊。",
      "冗官、冗兵、冗费“三冗”危机日益严重。"
    ],
    quotes: "朕若杀人，岂复为仁！/ 忍一夕之馁，免千古之费。（深夜忍饿不索羊汤）",
    anecdotes: "深夜忍渴不责内侍、包拯唾沫喷面容忍不罪、苏辙策论极谏仁宗拔擢之、驾崩时洛阳开封罢市巷哭辽道宗握手哀哭。",
    evaluation: "苏轼：“宋兴百五十年，休养生息，至于庆历、嘉祐之治，极矣！”全祖望：“宋之仁宗，古来未有之盛德也！”"
  },
  {
    id: "song-shenzong-zhao-xu",
    dynastyId: "bei-song",
    dynastyName: "北宋",
    name: "赵顼",
    templeName: "神宗",
    posthumousName: "绍天法古运德建功英文烈武钦仁耀孝皇帝",
    eraName: "熙宁、元丰",
    reignPeriod: "1067年 - 1085年（在位18年）",
    lifespan: "1048年 - 1085年（终年38岁）",
    reignYears: 18,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Song_Shenzong.jpg/480px-Song_Shenzong.jpg",
    tags: ["王安石变法", "熙宁变法", "富国强兵", "熙河开边"],
    isFamous: true,
    summary: "宋英宗长子。二十岁即位，立志富国强兵洗刷外患耻辱。力排众议任用王安石推行“熙宁新法”，主持“元丰改制”与“熙河开边”，引发新旧党争。",
    achievements: [
      "熙宁变法：任用王安石为宰相，推行青苗法、免役法、市易法、方田均税法、农田水利法、保甲法，国库积蓄丰盈。",
      "熙河开边收复河湟：命王韶进军陇右，收复熙、河、洮、岷、岷等五州之地两千余里，重创西夏。",
      "元丰改制：废除五代以来的差遣官制，恢复唐代三省六部实权体制。"
    ],
    controversies: [
      "新法推行过于急躁激进，地方官吏层层加码侵害百姓利益；引发朝廷长达数十年的新旧党争惨烈内耗。",
      "永乐城之战惨败：对西夏五路大伐失败，永乐城被西夏军围攻陷落二十万人丧命，神宗闻讯早朝当众痛哭，从此一病不起。"
    ],
    quotes: "天变不足畏，祖宗不足法，人言不足恤！（王安石变法纲领）",
    anecdotes: "永乐城之溃痛哭朝堂、神宗罢新法因郑侠《流民图》、苏轼乌台诗案因神宗宽宥免死。",
    evaluation: "列宁称王安石为“中国十一世纪时的改革家”。《宋史》：“神宗志在富强，毅然以天下自任，然急于成功，用人不能兼采，新旧相倾，宋之弊端启矣。”"
  },
  {
    id: "song-huizong-zhao-ji",
    dynastyId: "bei-song",
    dynastyName: "北宋",
    name: "赵佶",
    templeName: "徽宗",
    posthumousName: "体神合道骏烈逊功圣德仁宪纯文显武大圣皇帝",
    eraName: "建中靖国、崇宁、大观、政和、重和、宣和",
    reignPeriod: "1100年 - 1126年（在位26年）",
    lifespan: "1082年 - 1135年（终年54岁）",
    reignYears: 26,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Song_Huizong.jpg/480px-Song_Huizong.jpg",
    tags: ["瘦金体宗师", "工笔画绝巅", "靖康之耻", "花石纲", "诸事皆能独不能君"],
    isFamous: true,
    summary: "宋神宗第十一子。天才艺术大师却为灾难帝王。独创“瘦金体”书法与宣和画院院体画。任用蔡京童贯花石纲搜刮江南，海上之盟联金灭辽招致金军南下，靖康之变被俘北狩惨死五国城。",
    achievements: [
      "艺术造诣登峰造极：独创“瘦金体”铁画银钩，工笔花鸟画《瑞鹤图》《芙蓉锦鸡图》绝世传神。",
      "创立翰林图画院与宣和画学，培养出天才画家王希孟（作《千里江山图》）、张择端（作《清明上河图》）。",
      "编撰《宣和书谱》《宣和画谱》《宣和博古图》，奠定中国金石学与艺术鉴定学巅峰。"
    ],
    controversies: [
      "任用奸相蔡京、童贯、王黼、朱勔“六贼”，大搞花石纲激起方腊、宋江起义。",
      "愚蠢的外交政策：搞“海上之盟”联金灭辽，暴露北宋虚弱本质；金兵南下围攻开封，仓促禅位长子钦宗逃往江南。",
      "靖康之耻：1127年汴京被金兵攻破，徽钦二帝及皇族后妃大臣三千余人被俘押往金国，北宋灭亡，受尽奇耻大辱死于五国城。"
    ],
    quotes: "彻夜西风撼破扉，萧条孤馆一灯微。家山何处三千里，目断天南无雁飞。（徽宗北狩被俘诗）",
    anecdotes: "瘦金体创制、宣和画院瑞鹤祥云、微服私访李师师、五国城坐井观天。",
    evaluation: "脱脱《宋史·徽宗纪》：“宋徽宗诸事皆能，独不能为君耳！自古人君玩物而丧志，纵欲而败度，鲜不夷灭，徽宗是也。”"
  },
  {
    id: "song-qinzong-zhao-huan",
    dynastyId: "bei-song",
    dynastyName: "北宋",
    name: "赵桓",
    templeName: "钦宗",
    posthumousName: "恭文顺德仁孝皇帝",
    eraName: "靖康",
    reignPeriod: "1126年 - 1127年（在位1年2个月）",
    lifespan: "1100年 - 1156年（终年57岁）",
    reignYears: 1.2,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Song_Qinzong.jpg/480px-Song_Qinzong.jpg",
    tags: ["靖康之耻", "北宋覆亡", "优柔寡断", "北狩受难"],
    isFamous: true,
    summary: "宋徽宗长子。金兵兵临城下受禅登基。性格优柔寡断懦弱无能。罢黜李纲、信任神棍郭京“六甲神兵”，致汴京陷落，与父徽宗一同被俘，北宋灭亡。",
    achievements: [
      "即位初期在主战派李纲支持下任用李纲主持开封保卫战，曾击退金东路军完颜宗望。"
    ],
    controversies: [
      "战守失据：割地赔款屈辱求和，金兵暂退即罢黜忠良李纲，遣散勤王大军。",
      "荒唐听信妖道郭京用七千七百七十七名市井神棍施展“六甲神兵”开宣化门迎敌，汴京瞬间城破。",
      "亲赴金营求和被扣为人质，靖康之难三千宗室被俘北去，受辱半生惨死金国。"
    ],
    quotes: "便当退位，若得脱此厄，朕甘为匹夫！",
    anecdotes: "郭京六甲神兵破城、两度亲往金营受降被俘、金国封重昏侯。",
    evaluation: "《宋史》：“钦宗在位岁余，优柔无断，信谗逐贤，召郭京以御金兵，岂有是理哉！靖康之难，自取之也。”"
  },

  // ==================== 南宋 (1127 - 1279年) ====================
  {
    id: "song-gaozong-zhao-gou",
    dynastyId: "nan-song",
    dynastyName: "南宋",
    name: "赵构",
    templeName: "高宗",
    posthumousName: "受命中兴全功至德圣神武文昭仁宪孝皇帝",
    eraName: "建炎、绍兴",
    reignPeriod: "1127年 - 1162年（在位35年，太上皇25年）",
    lifespan: "1107年 - 1187年（享年81岁）",
    reignYears: 35,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Song_Gaozong.jpg/480px-Song_Gaozong.jpg",
    tags: ["南宋开国", "泥马渡江", "风波亭冤杀岳飞", "绍兴和议", "偏安江南"],
    isFamous: true,
    summary: "宋徽宗第九子。靖康之难唯一幸免于难的皇子。应天府即位建立南宋定都临安。起用韩世忠岳飞抵御金军，但因惧迎二帝与军权尾大，听信秦桧以“莫须有”冤杀岳飞，签订屈辱绍兴和议。",
    achievements: [
      "南宋政权创立：在金兵狂风骤雨南侵下艰难保全大宋半壁江山，定都临安（杭州），延续宋祚一百五十二年。",
      "黄天荡之战、顺昌大捷、郾城大捷等多次挫败金兀术南进企图。"
    ],
    controversies: [
      "风波亭之冤千古同悲：连发十二道金牌勒令北伐势如破竹的岳飞班师，与奸相秦桧以“莫须有”罪名惨杀岳飞、岳云、张宪于风波亭。",
      "屈辱绍兴和议：称臣金国，割让唐州、邓州，每年进贡岁币银二十五万两、绢二十五万匹。",
      "偏安一隅，贪图享乐，“暖风熏得游人醉，直把杭州作汴州”。"
    ],
    quotes: "岳飞虽有谋反之名，莫须有！（秦桧语）/ 尔身虽在，君父安在？（民间质问）",
    anecdotes: "泥马渡江传说、十二道金牌催岳飞、苗刘兵变惊吓丧失生育能力、禅位孝宗赵昚还政太祖一系。",
    evaluation: "林升：“山外青山楼外楼，西湖歌舞几时休？暖风熏得游人醉，直把杭州作汴州。”文天祥：“高宗之杀岳飞，自戕其手足，甘为儿皇帝，千载不可湔也！”"
  },
  {
    id: "song-xiaozong-zhao-shen",
    dynastyId: "nan-song",
    dynastyName: "南宋",
    name: "赵昚（赵伯琮）",
    templeName: "孝宗",
    posthumousName: "绍统同道冠德昭功哲文神武明圣悉孝皇帝",
    eraName: "隆兴、乾道、淳熙",
    reignPeriod: "1162年 - 1189年（在位27年）",
    lifespan: "1127年 - 1194年（享年68岁）",
    reignYears: 27,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Song_Xiaozong.jpg/480px-Song_Xiaozong.jpg",
    tags: ["南宋第一明君", "平反岳飞", "乾淳之治", "隆兴北伐"],
    isFamous: true,
    summary: "宋太祖赵匡胤七世孙。南宋最具远见与作为的英主。即位立即下诏为抗金名将岳飞昭雪平反，锐意恢复中原发起“隆兴北伐”，开创“乾淳之治”。",
    achievements: [
      "为民族英雄岳飞平反昭雪：追复官爵，以礼改葬西湖栖霞岭，追谥武穆，追封鄂王，极大振奋天下人心士气。",
      "隆兴北伐与乾淳之治：命张浚北伐收复灵璧、虹县，虽符离之溃未能竟功，仍签“乾道和约”改宋金“君臣”为“叔侄”关系并减免岁币。",
      "励精图治整顿朝政：打击贪腐，淘汰冗官，重视农业水利，南宋社会经济文化步入极盛期（辛弃疾、陆游、杨万里等活跃于此时）。"
    ],
    controversies: [
      "受制于太上皇高宗赵构掣肘，北伐战略难以大展拳脚；符离之溃后信心受挫，晚年渐倾向于防守自保。"
    ],
    quotes: "白首为功名，旧山桃李，寻思此计全非！（辛弃疾词）/ 岳飞精忠报国，朕当复其爵，明示天下！",
    anecdotes: "高宗赐十宫女测试皇子人品、栖霞岭改葬岳飞遗骨、淳熙禅位光宗遵重丧礼。",
    evaluation: "《宋史》：“宋之庙号，若仁宗之为仁，孝宗之为孝，其皆无愧焉！孝宗锐意恢复，洗雪国耻，内修政事，南渡诸帝称首矣。”"
  },
  {
    id: "song-mo-di-zhao-bing",
    dynastyId: "nan-song",
    dynastyName: "南宋",
    name: "赵昺（宋帝昺）",
    templeName: "无（怀宗 / 幼主）",
    posthumousName: "少帝 / 祥兴帝",
    eraName: "祥兴",
    reignPeriod: "1278年 - 1279年（在位10个月）",
    lifespan: "1272年 - 1279年（终年8岁）",
    reignYears: 0.8,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Song_Xiaozong.jpg/480px-Song_Xiaozong.jpg",
    tags: ["崖山海战", "陆秀夫负帝蹈海", "宋祚终结", "气节千古"],
    isFamous: true,
    summary: "南宋末代幼帝。宋度宗幼子。崖山海战元军张弘范猛攻宋水寨，宋军全线溃败。左丞相陆秀夫背负年仅八岁的赵昺投海殉国，十万军民随之投海，南宋彻底覆亡。",
    achievements: [
      "象征中华气节与抗元士魂的最后据点，在文天祥、陆秀夫、张世杰“宋末三杰”辅佐下战斗至最后一息。"
    ],
    controversies: [
      "幼童天子，一生皆在海上风浪漂泊中度过，未及亲政便身死国灭。"
    ],
    quotes: "国事至此，陛下当为国死，德祐皇帝已辱，陛下不可再辱！（陆秀夫投海言）",
    anecdotes: "陆秀夫负帝蹈海、十万军民投海殉难、文天祥过零丁洋“留取丹心照汗青”。",
    evaluation: "古人叹云：“崖山之后无中国。”王夫之：“陆秀夫负帝蹈海，张世杰狂飙覆舟，君臣节义，浩然塞乎天地之间！”"
  },

  // ==================== 辽、金、西夏 ====================
  {
    id: "liao-taizu-yelv-abaoli",
    dynastyId: "liao-jin-xia",
    dynastyName: "辽朝",
    name: "耶律阿保机",
    templeName: "太祖",
    posthumousName: "大圣大明天皇帝",
    eraName: "神册、天赞、天显",
    reignPeriod: "916年 - 926年（在位10年，任可汗9年）",
    lifespan: "872年 - 926年（享年55岁）",
    reignYears: 10,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Liao_Taizu.jpg/480px-Liao_Taizu.jpg",
    tags: ["辽朝开国", "统一契丹", "创契丹文", "因俗而治"],
    isFamous: true,
    summary: "契丹迭剌部首领。统一契丹八部，称天皇帝建立契丹国（后改国号为辽）。创制契丹大字与小字，推行“以国制治契丹，以汉制待汉人”之南北面官制。",
    achievements: [
      "统一契丹各部建立契丹帝国，东征灭渤海国建立东丹国。",
      "独创“南北面官制”：北面官治理契丹部族游牧事务，南面官仿唐制治理汉人州县农耕事务，开创多民族二元治理先例。",
      "命耶律突吕不与耶律鲁不古创制契丹文字，修筑皇都上京临潢府。"
    ],
    controversies: [
      "东征渤海国班师途中暴病卒于扶余城；逼迫妻子述律平断腕殉葬。"
    ],
    quotes: "凡为大位，必顺天命，以国制治契丹，以汉制待汉人。",
    anecdotes: "述律皇后断腕殉夫、盐池宴射群酋夺权统一各部。",
    evaluation: "《辽史》：“辽之先世，兵弱而部散，太祖崛起，拔诸部落，北逾幽朔，东并高丽，实辽之创业英主也。”"
  },
  {
    id: "jin-taizu-wanyan-aguda",
    dynastyId: "liao-jin-xia",
    dynastyName: "金朝",
    name: "完颜阿骨打（完颜旻）",
    templeName: "太祖",
    posthumousName: "应乾兴运昭德定功睿神庄宪仁文睿武皇帝",
    eraName: "收国、天辅",
    reignPeriod: "1115年 - 1123年（在位8年）",
    lifespan: "1068年 - 1123年（享年56岁）",
    reignYears: 8,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Jin_Taizu.jpg/480px-Jin_Taizu.jpg",
    tags: ["金朝开国", "女真不满万", "护步达冈之战", "灭辽先驱"],
    isFamous: true,
    summary: "女真完颜部首领。起兵反抗辽国残酷压迫，建立大金王朝。护步达冈之战以两万女真铁骑大破辽天祚帝七十万大军，奠定灭辽鼎定中原根基。",
    achievements: [
      "建立金国起兵反辽：公元1115年会宁府称帝，定国号为“大金”（言辽以镔铁为号，黄金终不坏，遂国号金）。",
      "护步达冈之战：中国历史上最悬殊以少胜多战役之一，以两万骑兵大败辽军七十万，一举击垮辽朝脊梁骨。",
      "创设猛安谋克制度：军政合一的女真部族组织，战时为兵平时为民；命完颜希尹创制女真文字。"
    ],
    controversies: [
      "南下掠夺残酷，掳掠人口财富，为日后金军残酷攻破汴京酿成靖康之耻埋下暴烈基因。"
    ],
    quotes: "辽以镔铁为号，铁虽坚亦复变坏，唯金终不坏，金之色白，完颜部色尚白，于是国号大金！",
    anecdotes: "头鱼宴拒绝为辽天祚帝起舞、护步达冈以两万大破七十万、金瓯一统。",
    evaluation: "《金史》：“太祖以三十打下宁江州，以三千破达鲁古城，以二万败七十万于护步达冈，其勇略非前人所能及，女真不满万，满万不可敌！”"
  },
  {
    id: "xi-xia-yuan-hao",
    dynastyId: "liao-jin-xia",
    dynastyName: "西夏",
    name: "李元昊（嵬名元昊）",
    templeName: "景宗",
    posthumousName: "武烈皇帝",
    eraName: "显道、开运、广运、大宝、天授礼法延祚",
    reignPeriod: "1038年 - 1048年（在位10年）",
    lifespan: "1003年 - 1048年（终年46岁）",
    reignYears: 10,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Li_Yuanhao.jpg/480px-Li_Yuanhao.jpg",
    tags: ["西夏开国", "创西夏文字", "三川口之战", "一代枭雄"],
    isFamous: true,
    summary: "党项族首领李德明长子。脱离宋辽称帝建立大夏国（西夏），定都兴庆府。三败宋军、一胜辽军，创制西夏文，确立宋辽夏三国鼎立格局。",
    achievements: [
      "称帝立国：1038年正式称帝，改汉姓李为嵬名，颁布“秃发令”，创制西夏文字与官制军制（铁鹞子、步跋子）。",
      "三川口、好水川、定川寨三大战役重创北宋大军，迫使宋朝签订“庆历和议”，西夏向宋称臣但获宋岁赐茶绢。",
      "贺兰山之战击败辽兴宗亲率十万大军，使西夏与辽、宋平分秋色屹立西北两百年。"
    ],
    controversies: [
      "性格残暴多疑，晚年好色酗酒，抢夺太子宁令哥未婚妻没藏氏为皇后，被愤怒的亲生儿子宁令哥刺削鼻梁受重伤而死。"
    ],
    quotes: "英雄之生，当王霸四海，岂能臣服受制于人！",
    anecdotes: "好水川之战泥鳅鸽子计谋大破宋军、削鼻弑父悲剧、西夏死士“铁鹞子”。",
    evaluation: "《宋史》：“元昊沉鸷多智，自负雄才，西夏建国，遂抗衡宋辽两朝达数百年。”"
  },

  // ==================== 元朝 (1271 - 1368年) ====================
  {
    id: "yuan-taizu-genghis-khan",
    dynastyId: "yuan",
    dynastyName: "大蒙古国 / 元朝",
    name: "孛儿只斤·铁木真（成吉思汗）",
    templeName: "太祖（元世祖追尊）",
    posthumousName: "法天启运圣武皇帝",
    eraName: "无",
    reignPeriod: "1206年 - 1227年（在位22年）",
    lifespan: "1162年 - 1227年（享年66岁）",
    reignYears: 22,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/YuanGaoZuAlbum.jpg/480px-YuanGaoZuAlbum.jpg",
    tags: ["一代天骄", "世界征服者", "蒙古帝国开创", "斡难河大会"],
    isFamous: true,
    summary: "大蒙古国建立者。统一蒙古高原各部，斡难河畔被尊为“成吉思汗”。颁布《大扎撒》，发起横扫欧亚大陆的西征风暴，灭西辽、征花剌子模、降西夏，彻底改变世界历史版图。",
    achievements: [
      "统一蒙古诸部：结束草原数百年混战仇杀，建立大蒙古国，创立千户百户兵制与怯薛军军制。",
      "世界大征服：征服中亚强国花剌子模，铁骑席卷钦察草原、高加索直至黑海，打破东西方封闭藩篱，促进亚欧大陆丝绸之路商贸空前互通。",
      "开明宗教政策：兼收并蓄佛教、道教、基督教、伊斯兰教，长春真人丘处机一言止杀留佳话。"
    ],
    controversies: [
      "西征与南下屠城灭国无数，杀戮甚重，中亚与华北众多繁华城池被夷为平地，人口惨遭空前浩劫。"
    ],
    quotes: "一代天骄，成吉思汗，只识弯弓射大雕。（毛泽东词）/ 要让青草覆盖的地方都成为我的牧马场！",
    anecdotes: "斡难河九斿白纛称汗、丘处机雪山论道一言止杀、西夏六盘山遗嘱联宋灭金。",
    evaluation: "联合国教科文组织评选为“千年第一风云人物”。毛泽东：“一代天骄。”"
  },
  {
    id: "yuan-shizu-kublai-khan",
    dynastyId: "yuan",
    dynastyName: "元朝",
    name: "孛儿只斤·忽必烈",
    templeName: "世祖",
    posthumousName: "圣德神功文武皇帝",
    eraName: "中统、至元",
    reignPeriod: "1260年 - 1294年（在位35年，建元朝24年）",
    lifespan: "1215年 - 1294年（享年80岁）",
    reignYears: 35,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/YuanShiZuAlbum.jpg/480px-YuanShiZuAlbum.jpg",
    tags: ["大元开国", "行省制开创", "营建北京大都", "灭南宋大一统", "马可波罗来华"],
    isFamous: true,
    summary: "成吉思汗之孙、拖雷第四子。改国号为“大元”，定都元大都（今北京）。灭南宋彻底实现全中国大一统，开创深远影响后世的“行省制度”，接纳马可·波罗来华。",
    achievements: [
      "建立大元大一统：公元1271年取《易经》“大哉乾元”改国号为大元；1279年灭南宋彻底统一全国，结束中国自唐末数百年大分裂割据。",
      "首创行中书省制（行省制）：设中书省总领全国政务，在地方推行行省制度，成为中国现代各省行政体制之源头。",
      "营建元大都（北京）：刘秉忠主持设计，奠定近八百年北京作为全国政治文化中心的城市中轴线格局。",
      "重新贯通京杭大运河（开凿通惠河），极大地繁荣海运与漕运；马可·波罗客居游历大元写下名著《马可·波罗游记》。"
    ],
    controversies: [
      "推行“四等人制”残酷民族阶级压迫政策（蒙古人、色目人、汉人、南人），极度不公。",
      "两度远征日本均遇台风“神风”覆没；远征爪哇安南失利，耗费巨资国库空虚。"
    ],
    quotes: "大哉乾元，万物资始，乃统天！（大元国号诏书）",
    anecdotes: "刘秉忠营建元大都、马可·波罗朝觐忽必烈、文天祥大义凛然拒降就义。",
    evaluation: "《元史·世祖纪》：“世宗度量弘广，知人善任，信用儒术，立纲陈纪，混一南北，拓土开疆，虽汉唐盛时莫能及也。”"
  },
  {
    id: "yuan-shundi",
    dynastyId: "yuan",
    dynastyName: "元朝",
    name: "孛儿只斤·妥懽帖睦尔",
    templeName: "惠宗（明称顺帝）",
    posthumousName: "宣仁普孝皇帝 / 顺皇帝",
    eraName: "元统、至元、至正",
    reignPeriod: "1333年 - 1368年（在位35年，北元2年）",
    lifespan: "1320年 - 1370年（享年51岁）",
    reignYears: 35,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Temur_Khan.jpg/480px-Temur_Khan.jpg",
    tags: ["元朝末帝", "红巾军起义", "至正新政", "退居漠北"],
    isFamous: true,
    summary: "元明宗长子。元朝在全国统治的最后一位皇帝。前期清算权相伯颜推行“至正新政”，后期因黄河决口滥发纸币引发红巾军大起义。明军攻克大都，顺帝携残部北逃漠北（北元）。",
    achievements: [
      "至正新政：任用贤相脱脱，恢复科举，治理黄河，主持修纂《辽史》《金史》《宋史》三大正史。",
      "精通机械天文发明，亲手制作精巧绝伦的七宝宫漏水运水钟，有“鲁班天子”之称。"
    ],
    controversies: [
      "至正交钞滥印导致恶性通货膨胀，黄河白鹿渡决口征发十五万民工治河引爆红巾军大起义（“莫道石人一只眼，挑动黄河天下反”）。",
      "临阵猜忌阵前撤换正在大败高邮张士诚的脱脱宰相，导致元廷丧失最后扑灭义军良机；后宫沉迷十六天魔舞与藏传房中术。",
      "徐达常遇春大军兵临大都，顺帝仓惶北逃上都，元朝九十八年统治瓦解。"
    ],
    quotes: "天命有归，朕安得久留于此？（夜出大都健德门北狩言）",
    anecdotes: "自制七宝大宫漏机械钟、脱脱被谗死于贬途、健德门逃亡退回大漠。",
    evaluation: "朱元璋：“顺帝知天命已去，避兵北狩，不抗大军，可赠谥曰‘顺’。”"
  },

  // ==================== 明朝 (1368 - 1644年) 十六帝全谱精选 ====================
  {
    id: "ming-taizu-zhu-yuanzhang",
    dynastyId: "ming",
    dynastyName: "明朝",
    name: "朱元璋",
    templeName: "太祖",
    posthumousName: "开天行道肇纪立极大圣至神仁文义武俊德成功高皇帝",
    eraName: "洪武",
    reignPeriod: "1368年 - 1398年（在位31年）",
    lifespan: "1328年 - 1398年（享年71岁）",
    reignYears: 31,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Hongwu1.jpg/480px-Hongwu1.jpg",
    tags: ["大明开国", "开局一个碗", "驱逐鞑虏", "废除丞相", "洪武之治", "铁腕反腐"],
    isFamous: true,
    summary: "中国历史上唯一真正赤贫平民出身的大一统开国天子。放牛为僧投红巾起义，扫平陈友谅张士诚，北伐驱逐蒙元，恢复中华社稷。废除丞相设锦衣卫，铁腕肃贪开创“洪武之治”。",
    achievements: [
      "驱逐鞑虏恢复中华：北伐檄文“驱逐胡虏，恢复中华，立纲陈纪，救济斯民”，结束蒙古对中原统治，定都南京。",
      "废宰相集皇权：诛杀胡惟庸后彻底废除实行一千五百年的丞相制度，分权于六部，直接对皇帝负责。",
      "铁腕肃贪重典治国：颁布《大诰》，贪官污吏受贿六十两银子以上即剥皮实草悬于官衙，惩治贪官数万人。",
      "编制《大明清册》鱼鳞图册与赋役黄册，大修农田水利，移民屯田，百姓安居乐业，史称“洪武之治”。"
    ],
    controversies: [
      "杀戮功臣过甚：胡惟庸案、蓝玉案、空印案、郭桓案“洪武四大案”株连屠戮十万余人，李善长、蓝玉等开国元勋几乎被斩尽杀绝。",
      "创立锦衣卫特务刺探机构；行分封诸王镇守边疆，为日后燕王朱棣靖难之役埋下惨烈祸根。"
    ],
    quotes: "驱逐胡虏，恢复中华，立纲陈纪，救济斯民！/ 天下贪官污吏，朕誓剥皮实草以惩效尤！",
    anecdotes: "开局一只破碗当和尚、马皇后大脚恩爱辅政、刘伯温烧饼歌、郭桓案大写数字创制（壹贰叁肆）。",
    evaluation: "《明史》：“太祖起自田里，提三尺剑，三年而成帝业，开辟之难，古所未有也！”毛泽东：“自古能君者，无如汉高祖、明太祖，而明太祖文化虽低，然雄才大略，善用兵法。”"
  },
  {
    id: "ming-chengzu-zhu-di",
    dynastyId: "ming",
    dynastyName: "明朝",
    name: "朱棣",
    templeName: "成祖（初为太宗）",
    posthumousName: "启天弘道高明肇运圣武神功纯仁至孝文皇帝",
    eraName: "永乐",
    reignPeriod: "1402年 - 1424年（在位22年）",
    lifespan: "1360年 - 1424年（享年65岁）",
    reignYears: 22,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Yongle-emperor.jpg/480px-Yongle-emperor.jpg",
    tags: ["永乐大帝", "靖难之役", "迁都北京", "修永乐大典", "郑和下西洋", "五征漠北"],
    isFamous: true,
    summary: "明太祖第四子。以“清君侧”发起靖难之役夺位。在位期间五征漠北，迁都北京营建紫禁城，派遣郑和七下西洋，修纂《永乐大典》，开创远迈汉唐之“永乐盛世”。",
    achievements: [
      "迁都北京营建紫禁城：将首都从南京迁往北京，“天子守国门，君王死社稷”，营建紫禁城天坛，巩固北部边疆防务。",
      "郑和七下西洋：派遣三宝太监郑和率庞大宝船队七次下西洋，遍历三十余国，开创世界大航海时代先河。",
      "修纂《永乐大典》：命解缙等汇聚三千学者编成三亿七千万字的百科全书巨著，为当时世界最大百科全书。",
      "五次亲征漠北亲冒矢石：彻底瓦解阿鲁台、本雅失里、马哈木残余势力，终病逝于第五次北征榆木川回师途中。",
      "正式设立内阁首辅制度，设立东厂特务监察。"
    ],
    controversies: [
      "靖难之役夺取侄儿建文帝皇位，诛戮建文朝忠臣齐泰、黄子澄等极其残酷，方孝孺被惨灭“株连十族”。"
    ],
    quotes: "我国家天造地设，幅员万里，天子守国门，君王死社稷！",
    anecdotes: "方孝孺不屈灭十族、建文帝下落失踪谜团、郑和宝船威震西洋、五征漠北病卒榆木川。",
    evaluation: "《明史》：“雄武之略，同符高祖。六师屡出，漠北尘清。至其季年，威德遐被，四方宾服，受朝命而入贡者怠三十国。盛矣哉！”"
  },
  {
    id: "ming-xuanzong-zhu-zhanji",
    dynastyId: "ming",
    dynastyName: "明朝",
    name: "朱瞻基",
    templeName: "宣宗",
    posthumousName: "宪天崇道英明神圣钦文昭武宽仁纯孝章皇帝",
    eraName: "宣德",
    reignPeriod: "1425年 - 1435年（在位10年）",
    lifespan: "1399年 - 1435年（终年37岁）",
    reignYears: 10,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Ming_Xuanzong.jpg/480px-Ming_Xuanzong.jpg",
    tags: ["仁宣之治", "宣德青花", "宣德炉", "蟋蟀天子", "太平治世"],
    isFamous: true,
    summary: "明仁宗长子。与父亲朱高炽共同缔造被史家盛赞为大明文治顶峰的“仁宣之治”。平定汉王朱高煦叛乱，精通书画艺术，开创宣德炉与宣德青花瓷巅峰时代。",
    achievements: [
      "缔造“仁宣之治”：息兵养民，改革税粮制度，实行宽刑，任用“三杨”（杨士奇、杨荣、杨溥）辅政，社会经济繁荣，仓廪充实。",
      "迅速平定汉王朱高煦武装叛乱，御驾亲征，兵不血刃瓦解叛军巩固皇权。",
      "艺术与工艺极峰：书法画技不逊徽宗，烧造传世绝品“宣德青花瓷”与精绝后世的“大明宣德炉”。"
    ],
    controversies: [
      "创设内书堂教授宦官识字读书，赋予司礼监太监“批红”大权，为明朝中后期太监乱政（王振、魏忠贤等）打开制度魔盒。",
      "酷爱斗蟋蟀，民间四处索贡蟋蟀，有“蟋蟀天子”之谑称。"
    ],
    quotes: "国之大事，在民安物阜，无扰农时而已。",
    anecdotes: "烤死汉王朱高煦于铜缸中、宣德炉炼金十二炼、斗蟋蟀促织天子民间奇案。",
    evaluation: "《明史》：“仁宣之治，吏称其职，政得其平，纲纪修明，仓廪充羡，闾阎乐业。后之论三代之治者，必归于仁宣焉。”"
  },
  {
    id: "ming-yingzong-zhu-qizhen",
    dynastyId: "ming",
    dynastyName: "明朝",
    name: "朱祁镇",
    templeName: "英宗",
    posthumousName: "法天立道仁明诚敬昭文宪武至德广孝睿皇帝",
    eraName: "正统、天顺",
    reignPeriod: "1435-1449年（正统14年），1457-1464年（天顺7年，共21年）",
    lifespan: "1427年 - 1464年（终年38岁）",
    reignYears: 21,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Zhengtong-emperor.jpg/480px-Zhengtong-emperor.jpg",
    tags: ["土木堡之变", "夺门之变", "叫门天子", "废除活人殉葬", "两登帝位"],
    isFamous: true,
    summary: "明宣宗长子。两度登基。轻信太监王振亲征瓦剌，酿成全军覆没大明国运由盛转衰的“土木堡之变”，沦为俘虏被囚八年。发动夺门之变复辟，临终废除活人殉葬制度。",
    achievements: [
      "天顺八年临终前下遗诏：彻底废除自明太祖以来残酷野蛮的后妃宫女活人殉葬制度，德政泽及后世。"
    ],
    controversies: [
      "土木堡之变惨败：盲信宦官王振瞎指挥，五十万大军在土木堡惨遭也先全歼，三大营精锐尽丧，无数重臣勋贵战死，英宗被俘沦为“叫门皇帝”。",
      "夺门之变复辟后，恩将仇报冤杀挽救大明危局的民族英雄于谦，天下冤之痛之。"
    ],
    quotes: "用人殉葬，吾不忍也。此事宜自我而止，后世子孙勿复效！（临终废殉诏）",
    anecdotes: "土木堡被俘瓦剌大营、也先护送还京居南宫幽禁八年、夺门之变雪夜复辟、杀于谦于市。",
    evaluation: "《明史》：“英宗坐土木之覆，仓皇北狩，夺门之举，杀害忠良（于谦），固天下之公论。然罢宫妃殉葬，则盛德之至矣！”"
  },
  {
    id: "ming-daizong-zhu-qiyu",
    dynastyId: "ming",
    dynastyName: "明朝",
    name: "朱祁钰",
    templeName: "代宗",
    posthumousName: "符天建道恭仁康定庄宪纯诚懿皇帝（景泰帝）",
    eraName: "景泰",
    reignPeriod: "1449年 - 1457年（在位8年）",
    lifespan: "1428年 - 1457年（终年30岁）",
    reignYears: 8,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Jingtai-emperor.jpg/480px-Jingtai-emperor.jpg",
    tags: ["北京保卫战", "挽狂澜于既倒", "景泰蓝", "悲情帝王"],
    isFamous: true,
    summary: "明英宗异母弟。土木堡之变后受命危难之间登基。坚决支持兵部尚书于谦，力排南迁议，赢得北京保卫战彻底击退瓦剌挽救大明。夺门之变后被废暴卒。",
    achievements: [
      "挽狂澜于既倒：任用兵部尚书于谦主持北京保卫战，痛斥徐珵南逃迁都谬论，重炮轰退瓦剌也先，保全大明江山社稷。",
      "休养生息整饬军备：治理黄河水患，招抚流民，景泰蓝珐琅工艺发扬光大流芳百世。"
    ],
    controversies: [
      "迎回太上皇英宗后将其幽禁于南宫七年之久；执意废去英宗之子朱见深太子位，立自己儿子朱见济，子夭折后储位空虚引爆“夺门之变”。"
    ],
    quotes: "社稷为重，君为轻！有言迁都者，斩！（于谦言景泰帝纳之）",
    anecdotes: "景泰蓝工艺盛极、南宫囚兄锁门灌铅、夺门复辟后被废死于西宫。",
    evaluation: "《明史》：“景帝当危难之时，受命宗祏，任用于谦，内平乱政，外却强寇，社稷晏然。虽天道反侧，终不能没其功！”"
  },
  {
    id: "ming-shizong-zhu-houcong",
    dynastyId: "ming",
    dynastyName: "明朝",
    name: "朱厚熜（嘉靖帝）",
    templeName: "世宗",
    posthumousName: "钦天履道英毅神圣宣文荣武大统孝皇帝",
    eraName: "嘉靖",
    reignPeriod: "1521年 - 1566年（在位45年）",
    lifespan: "1507年 - 1567年（享年60岁）",
    reignYears: 45,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Jiajing-emperor.jpg/480px-Jiajing-emperor.jpg",
    tags: ["嘉靖皇帝", "大礼议", "二十年不上朝", "权术巅峰", "戚继光抗倭", "海瑞罢官"],
    isFamous: true,
    summary: "兴献王长子。小宗入继大统。以“大礼议之争”力战群臣大权独揽。虽深居西苑修道炼丹二十年不上朝，却洞察朝堂牢握兵柄皇权。任用戚继光荡平东南倭寇。",
    achievements: [
      "嘉靖中兴前期革除弊政：整顿厂卫与太监庄田，淘汰冗员，轻徭薄赋。",
      "荡平东南倭寇：任用胡宗宪、戚继光、俞大猷组建戚家军，取得台州大捷等彻底扫清东南沿海倭寇之患。",
      "严嵩专权二十载终被嘉靖明察罢相抄家，徐阶继任首辅。"
    ],
    controversies: [
      "修仙炼丹二十年不视朝政，劳民伤财营建斋醮宫观，为采处子初经毒打宫女酿成“壬寅宫变”（差点被杨金英等宫女勒死）。",
      "严嵩父子卖官鬻爵长达二十年贪污朝纲败坏；海瑞上《直言天下第一事疏》痛骂“嘉靖嘉靖，家家皆净”。"
    ],
    quotes: "嘉靖者，言家家皆净而无财用也！（海瑞上疏言）/ 朕御极四十五年，练修玄修，未尝一日废天下大事。",
    anecdotes: "壬寅宫变宫女勒颈刺杀、海瑞抬棺上疏痛骂嘉靖、大礼议左顺门廷杖百官、严嵩青词宰相。",
    evaluation: "谈迁《国榷》：“世宗天资英断，驾驭群臣，指麾如意。虽深居禁闼，二十余年不临视朝，而四方万里，威柄不移，英察之主也。”"
  },
  {
    id: "ming-shenzong-zhu-yijun",
    dynastyId: "ming",
    dynastyName: "明朝",
    name: "朱翊钧（万历帝）",
    templeName: "神宗",
    posthumousName: "范天合道哲肃敦简光文章武安仁止孝显皇帝",
    eraName: "万历",
    reignPeriod: "1572年 - 1620年（在位48年）",
    lifespan: "1563年 - 1620年（享年58岁）",
    reignYears: 48,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Wanli-emperor.jpg/480px-Wanli-emperor.jpg",
    tags: ["在位最长大明帝王", "张居正一条鞭法", "万历三大征", "万历怠政三十年", "明亡实亡于万历"],
    isFamous: true,
    summary: "明穆宗第三子，在位48年为明朝最长。前十年由内阁首辅张居正主持改革，推行“一条鞭法”，国富民安。亲政后主持赢得“万历三大征”（含抗倭援朝）。后期因国本之争消极怠政近三十年不上朝。",
    achievements: [
      "张居正万历改革：推行“考成法”整肃吏治，清丈全国田地，推行“一条鞭法”把田赋、徭役合并按亩折银征收，大明国库储银达七百万两。",
      "万历三大征全胜：宁夏哱拜之乱平定、播州杨应龙之乱平定；特别是抗倭援朝战役，派遣李如松、麻贵大破日本丰臣秀吉大军，保全朝鲜，重创日本数百年不敢窥视中原。"
    ],
    controversies: [
      "万历怠政近三十年：因欲立郑贵妃之子朱常洵为太子遭百官激烈反对（“国本之争”），长期罢工不上朝、不批奏折、不补官职，朝廷各部堂官空虚，党争激烈。",
      "派出矿监税使横征暴敛中饱私囊搜刮天下民脂民膏；萨尔浒之战大败于努尔哈赤，丧失辽东战场主动权。"
    ],
    quotes: "先生所言，无不遵行。（尊称张居正）/ 国朝大事，自有天定。（怠政叹息）",
    anecdotes: "张居正万历夺情事件、抗倭援朝碧蹄馆之战、万历皇帝三十年不上朝却连赢三大征、萨尔浒四路溃败。",
    evaluation: "《明史·神宗纪》：“明之亡，实亡于神宗（万历）！怠政三十载，六卿半空，萨尔浒兵衄辽沈，亡形已具矣。”"
  },
  {
    id: "ming-sizong-zhu-youjian",
    dynastyId: "ming",
    dynastyName: "明朝",
    name: "朱由检（崇祯帝）",
    templeName: "思宗 / 毅宗 / 怀宗",
    posthumousName: "绍天绎道刚明恪俭揆宪宽和仁圣产孝庄烈愍皇帝",
    eraName: "崇祯",
    reignPeriod: "1627年 - 1644年（在位17年）",
    lifespan: "1611年 - 1644年（终年34岁）",
    reignYears: 17,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Chongzhen-emperor.jpg/480px-Chongzhen-emperor.jpg",
    tags: ["崇祯自缢", "君王死社稷", "天子守国门", "诛魏忠贤", "多疑急躁", "煤山殉国"],
    isFamous: true,
    summary: "明熹宗之弟。十七岁即位即雷霆扫除魏忠贤阉党，励精图治十七年夜以继日勤政。然遇百年罕见小冰期大旱蝗灾，性多疑急躁斩杀袁崇焕换辅五十人。李自成破京煤山自缢殉国，大明覆亡。",
    achievements: [
      "雷霆除奸：以惊人定力与手段，几个月内一举彻底铲除权倾朝野的九千岁魏忠贤及其阉党势力。",
      "极度勤政节俭：十七年不迩声色，鸡鸣而起夜半而寝，内宫衣服带补丁，粗茶淡饭，誓死不肯南逃偏安。"
    ],
    controversies: [
      "生性多疑刚愎自用苛刻寡恩：十七年间频繁更换首辅五十人、诛杀巡抚巡按总督三十余人，中后金反间计冤杀督师袁崇焕毁长城。",
      "加派“辽饷、剿饷、练饷”三饷重税，逼民反乱，李自成、张献忠起义如燎原之火。",
      "李自成兵临城下拒绝南迁避难，决绝殉国。"
    ],
    quotes: "朕自登基十七年，逆贼直逼京师，虽朕薄德匪躬，上干天怒，致逆贼直逼京师，然皆诸臣误朕也！朕死，无面目见祖宗于地下，自去冠冕，以发覆面，任贼分裂朕尸，勿伤百姓一人！",
    anecdotes: "十七岁智诛魏忠贤、反间计磔杀袁崇焕、煤山（景山）歪脖树自缢身亡、大明最后的悲歌。",
    evaluation: "《明史·庄烈帝纪》：“帝承神、熹之后，竭力图治，撙节爱民，草茅之言皆听纳。然性多疑急遽，诛戮过当，终致社稷倾覆。然非亡国之君而当亡国之运，君王死社稷，浩然正气垂于万世！”"
  },

  // ==================== 清朝 (1636 - 1912年) 关键十二帝全谱 ====================
  {
    id: "qing-taizu-nurhaci",
    dynastyId: "qing",
    dynastyName: "清朝（后金）",
    name: "爱新觉罗·努尔哈赤",
    templeName: "太祖",
    posthumousName: "承天广运圣德神功肇纪立极仁孝睿武端毅钦安弘文定业高皇帝",
    eraName: "天命",
    reignPeriod: "1616年 - 1626年（在位11年）",
    lifespan: "1559年 - 1626年（享年68岁）",
    reignYears: 11,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Nurhaci.jpg/480px-Nurhaci.jpg",
    tags: ["大清奠基", "十三副遗甲起兵", "创立八旗", "萨尔浒之战", "七大恨誓天"],
    isFamous: true,
    summary: "建州女真首领。以祖父遗留十三副铠甲起兵，统一女真各部，创立八旗制度与满文，赫图阿拉称汗建立后金。发布“七大恨”誓师伐明，萨尔浒之战大败明军四路围攻奠定鼎新之势。",
    achievements: [
      "十三副铠甲起兵起家：平定建州、海西女真各部，建立后金政权，定都赫图阿拉。",
      "创立八旗制度：正黄、镶黄、正白、镶白、正红、镶红、正蓝、镶蓝八旗，出则为兵入则为民，打造十七世纪东亚最强战斗铁骑。",
      "创制满文：命额尔德尼、噶盖借用蒙古字母创制老满文。",
      "萨尔浒大捷：以“凭尔几路来，我只一路去”集中优势兵力，五天内全歼明朝杨镐四路围攻主力十万大军。"
    ],
    controversies: [
      "占领辽东后推行残酷的“杀穷鬼、除富户”民族屠杀与强占田土政策，引发辽东汉人激烈反抗。",
      "宁远之战受挫于袁崇焕的红衣大炮，疽发身亡。"
    ],
    quotes: "凭尔几路来，我只一路去！（萨尔浒用兵神机）/ 天地所生，岂有偏庇！朕今以七大恨布告天下。",
    anecdotes: "十三副铠甲起兵、七大恨告天起兵、宁远城中红衣大炮重创。",
    evaluation: "《清史稿》：“太祖以十三副铠甲起兵，诛叛讨逆，荡平强邻，建邦创制，开八旗之烈，实一代之雄杰也！”"
  },
  {
    id: "qing-taizong-huang-taiji",
    dynastyId: "qing",
    dynastyName: "清朝",
    name: "爱新觉罗·皇太极",
    templeName: "太宗",
    posthumousName: "应天兴国弘德彰武宽温仁圣睿孝敬敏昭定隆道显功文皇帝",
    eraName: "天聪、崇德",
    reignPeriod: "1626年 - 1643年（在位17年）",
    lifespan: "1592年 - 1643年（享年52岁）",
    reignYears: 17,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Huang-tai-ji.jpg/480px-Huang-tai-ji.jpg",
    tags: ["改国号大清", "改族名满洲", "松锦之战", "建立汉八旗与蒙八旗", "清初雄主"],
    isFamous: true,
    summary: "努尔哈赤第八子。改国号为“大清”，改族名为“满洲”。废除四大贝勒共治确立君尊臣卑，设六部、创汉八旗与蒙八旗。松锦之战全歼明军洪承畴十三万重兵，敲响大明丧钟。",
    achievements: [
      "定国号“大清”改元崇德：1636年盛京称帝，由后金汗国升格为大清帝国，改女真族名为“满洲”。",
      "重用汉臣与火器：设立汉八旗、蒙古八旗，起用洪承畴、范文程、祖大寿，大量制造红衣大炮，摆脱单纯游牧政权性质。",
      "两次亲征朝鲜使其俯首称臣（丁卯胡乱、丙子胡乱）；降服漠南蒙古各部取得传国玉玺。",
      "松锦决战大胜：围困锦州两年，全歼明军精锐十三万人，生俘洪承畴、祖大寿出降，大明辽东防线荡然无存。"
    ],
    controversies: [
      "连年征伐消耗巨大；因最宠爱妃子海兰珠（宸妃）病逝悲痛过度骤卒，未能亲自见证清军入关。"
    ],
    quotes: "满汉一体，共享太平，朕何偏向！",
    anecdotes: "海兰珠生死情深、范文程巧说洪承畴归降、庄妃（孝庄太后）智辅三代清帝。",
    evaluation: "《清史稿》：“太宗智勇天锡，善于驭众，设官分职，创立制度，松锦一战定乾坤，成开国之大业，英谟宏图矣！”"
  },
  {
    id: "qing-shizu-shunzhi",
    dynastyId: "qing",
    dynastyName: "清朝",
    name: "爱新觉罗·福临",
    templeName: "世祖",
    posthumousName: "体天隆运定统建极英睿钦文显武大德弘功至仁纯孝章皇帝",
    eraName: "顺治",
    reignPeriod: "1643年 - 1661年（在位18年）",
    lifespan: "1638年 - 1661年（终年24岁）",
    reignYears: 18,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Emperor_Shunzhi.jpg/480px-Emperor_Shunzhi.jpg",
    tags: ["清军入关第一帝", "定都北京", "多尔衮摄政", "董鄂妃传奇", "早逝出家谜团"],
    isFamous: true,
    summary: "皇太极第九子，六岁即位，叔父多尔衮摄政。1644年清军入关迁都北京，确立对全国的统治。亲政后重用汉官提倡汉化，因董鄂妃病逝悲痛成疾染天花二十四岁英年早逝。",
    achievements: [
      "清军入关定都北京：多尔衮率清军入山海关击败李自成大顺军，顺治帝定都北京，实现满清定鼎中原。",
      "亲政后整肃朝纲：追夺多尔衮封爵，重用汉臣推行汉文化，停圈地之令，整顿赋税，开创大清中原统治基石。"
    ],
    controversies: [
      "摄政王多尔衮强力推行残酷的“剃发易服令”（留头不留发，留发不留头），制造扬州十日、嘉定三屠惨剧。",
      "情深不寿：迷信佛教，宠爱董鄂妃致废后风波，董鄂妃死后消沉厌世，死因引发五台山出家千古民间传说。"
    ],
    quotes: "我本西方一衲子，因何落在帝王家？（民间托名顺治出家诗）",
    anecdotes: "多尔衮太庙追降、汤若望洋和尚结为忘年交、董鄂妃红颜早逝、五台山出家传说。",
    evaluation: "《清史稿》：“世祖涉历多艰，入定中原，能崇儒重道，招徕人才，天寿不永，惜哉！”"
  },
  {
    id: "qing-shengzu-kangxi",
    dynastyId: "qing",
    dynastyName: "清朝",
    name: "爱新觉罗·玄烨",
    templeName: "圣祖",
    posthumousName: "合天弘运文武睿哲恭俭宽裕孝敬诚信中和功德大成仁皇帝",
    eraName: "康熙",
    reignPeriod: "1661年 - 1722年（在位61年）",
    lifespan: "1654年 - 1722年（享年69岁）",
    reignYears: 61,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Kangxi_Emperor_in_Court_Dress.jpg/480px-Kangxi_Emperor_in_Court_Dress.jpg",
    tags: ["千古一帝", "在位时间最长皇帝", "康乾盛世开创", "擒鳌拜", "平三藩", "收复台湾", "雅克萨抗俄"],
    isFamous: true,
    summary: "中国历史上在位时间最长的皇帝（61年）。八岁登基，智擒鳌拜，平定三藩之乱，收复台湾设府，雅克萨之战击败沙俄签订《尼布楚条约》，三征噶尔丹，奠定近代中国辽阔疆域，开创“康乾盛世”。",
    achievements: [
      "少年智擒鳌拜：十四岁亲政，布库少年奇计生擒专横跋扈辅政大臣鳌拜，收归皇权。",
      "平定三藩之乱：历经八年血战彻底平定吴三桂、耿精忠、尚可喜三藩割据，维护国家统一。",
      "收复台湾统一海疆：命施琅统帅水师攻克澎湖收复台湾，设台湾府隶属福建省，正式巩固东南海防。",
      "雅克萨之战抗俄保疆：两次雅克萨反击战重创沙俄侵略军，签订中俄《尼布楚条约》，从法律上明确外兴安岭以南属于中国。",
      "三征噶尔丹亲征大漠，乌兰布通大捷彻底粉碎准噶尔分裂企图，设木兰围场，多伦会盟蒙古各部归心。",
      "文化盛举：主持编纂《康熙字典》《古今图书集成》《佩文韵府》，绘制第一部实测全国地图《皇舆全览图》。",
      "滋生人丁永不加赋：宣布“盛世滋生人丁，永不加赋”，为雍正“摊丁入亩”奠定关键前提。"
    ],
    controversies: [
      "大兴文字狱（庄廷鑨《明史》案等），严酷禁锢汉人思想文人士气。",
      "晚年“九子夺嫡”储位之争：两废太子胤礽，诸皇子结党营私明争暗斗，朝局吏治渐趋松弛腐败。"
    ],
    quotes: "鞠躬尽瘁，死而后已。朕即位六十一年，自省不敢有片刻懈怠。（《康熙遗诏》）",
    anecdotes: "智擒鳌拜、施琅收复台湾、木兰秋狝、学西方微积分天文几何、九子夺嫡风云。",
    evaluation: "白晋（法国传教士）：“他具有超凡的智慧与才能，是世界上罕有的伟大君王。”《清史稿》：“圣祖仁孝性成，智勇天锡，平三藩，定台湾，抗沙俄，服喀尔喀，文治武功，千古一帝无愧焉！”"
  },
  {
    id: "qing-shizong-yongzheng",
    dynastyId: "qing",
    dynastyName: "清朝",
    name: "爱新觉罗·胤禛",
    templeName: "世宗",
    posthumousName: "敬天昌运建中表正文武英明宽仁信毅睿圣大孝至诚宪皇帝",
    eraName: "雍正",
    reignPeriod: "1722年 - 1735年（在位13年）",
    lifespan: "1678年 - 1735年（享年58岁）",
    reignYears: 13,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Yongzheng_Emperor_in_Court_Dress.jpg/480px-Yongzheng_Emperor_in_Court_Dress.jpg",
    tags: ["铁血勤政", "最勤劳皇帝", "设立军机处", "摊丁入亩", "耗羡归公", "改土归流"],
    isFamous: true,
    summary: "康熙第四子。历经“九子夺嫡”胜出。中国历史上最勤政务实的皇帝之一，在位十三年朱批奏折达千万字。设立军机处、实行摊丁入亩、耗羡归公、改土归流，为乾隆盛世积攒雄厚家底。",
    achievements: [
      "设立军机处：彻底简化中枢决策流程，军国大政全决于皇帝一人，君主专制集权登峰造极。",
      "摊丁入亩（地丁合一）：取消延续数千年的“人头税”，将丁银摊入田赋，废除贫苦农民人头负担，刺激全国人口大爆发。",
      "耗羡归公与养廉银：将地方私征赋税耗羡合法化充入国库，发放“养廉银”给官员，重拳整肃吏治惩贪治乱。",
      "西南改土归流：废除世袭土司改设流官治理，促进少数民族地区与内地一体化。",
      "创立“秘密立储制”：将建储密诏藏于乾清宫“正大光明”匾额之后，彻底终结清廷皇位公开争夺惨祸。"
    ],
    controversies: [
      "刻薄寡恩：即位后对昔日争位兄弟允禩（阿其那）、允禟（塞思黑）百般摧残折磨幽死，诛杀年羹尧、隆科多两大重臣功臣。",
      "文字狱愈演愈烈：曾静吕留良案、查嗣庭案；由于常年过劳服食金石丹药，终暴卒于圆明园。"
    ],
    quotes: "朕就是这样汉子！就是这样秉性！就是这样皇帝！尔等欺我不得！（批田文镜折）/ 俯仰不愧天地，褒贬自有春秋。",
    anecdotes: "朱批千万字“朕就是这样汉子”、正大光明匾藏密诏、圆明园戴西洋假发画像、年羹尧赐死。",
    evaluation: "日本学者佐伯富：“康熙宽大，乾隆疏阔，若无雍正十三年之铁腕整饬，清朝国运早已中衰。”南怀瑾：“雍正是大清朝最了不起、最能吃苦的皇帝。”"
  },
  {
    id: "qing-gaozong-qianlong",
    dynastyId: "qing",
    dynastyName: "清朝",
    name: "爱新觉罗·弘历",
    templeName: "高宗",
    posthumousName: "法天隆运至诚先觉体元立极敷文奋武孝慈神圣纯皇帝",
    eraName: "乾隆",
    reignPeriod: "1735年 - 1795年（在位60年，太上皇3年，享寿89岁）",
    lifespan: "1711年 - 1799年（享年89岁）",
    reignYears: 60,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/The_Qianlong_Emperor_in_Ceremonial_Armour_on_Horseback.jpg/480px-The_Qianlong_Emperor_in_Ceremonial_Armour_on_Horseback.jpg",
    tags: ["十全老人", "康乾盛世极峰", "编纂四库全书", "平定准噶尔", "闭关锁国", "和珅跌倒"],
    isFamous: true,
    summary: "雍正第四子。中国历史上实际掌权时间最长（63年）、寿命最长的皇帝（89岁）。平定准噶尔部彻底解决蒙古西北边患，编修《四库全书》。然晚年好大喜功闭关锁国，宠信巨贪和珅，大清迅速滑向深渊。",
    achievements: [
      "平定准噶尔与大小和卓叛乱：彻底收复新疆，统一天山南北，设伊犁将军辖区，将百余万平方公里新疆牢牢纳入版图。",
      "编纂《四库全书》：纪晓岚等汇聚三千学者历时十余年，编纂七万九千卷皇皇巨著，收录古籍三千余种，保存中国浩瀚典籍。",
      "十全武功维护统一：两平准噶尔、定回部、两征金川、平缅甸、平台湾林爽文、两抗廓尔喀保西藏，自诩“十全老人”。",
      "乾隆六十年为不超过祖父康熙61年在位记录，主动禅位十五子颙琰（嘉庆帝），做太上皇训政。"
    ],
    controversies: [
      "闭关锁国盲目自大：实行“一口通商”，傲慢拒绝英国马戛尔尼使团通商要求，彻底错失融入世界工业革命的历史机遇。",
      "晚年骄奢淫逸六下江南挥霍国库积蓄，宠信千古巨贪和珅，吏治彻底腐败败坏。",
      "大兴残酷文字狱达一百三十余次，焚毁禁毁典籍数千部，扼杀思想活力；全国各地爆发白莲教大起义。"
    ],
    quotes: "天朝物产丰盈，无所不有，原不藉外夷货物以通有无。（致英王乔治三世信）/ 朕自谓十全武功，非夸也，事实也。",
    anecdotes: "六下江南巡游、给传世字画疯狂盖印章（盖章狂魔）、和珅跌倒嘉庆吃饱、接见英国使臣马戛尔尼。",
    evaluation: "马戛尔尼《使中日记》：“清帝国如同一艘破败不堪的头等战舰，只因庞大未立刻沉没，一旦出现意外将四分五裂。”《清史稿》：“高宗运际隆平，扬休玉宇，文治武功，极于盛矣。唯晚节崇尚奢华，和珅弄权，防微杜渐，有遗议焉。”"
  },
  {
    id: "qing-xuanzong-daoguang",
    dynastyId: "qing",
    dynastyName: "清朝",
    name: "爱新觉罗·旻宁",
    templeName: "宣宗",
    posthumousName: "效天符运立中体正至文圣武智勇仁慈俭勤孝敏成皇帝",
    eraName: "道光",
    reignPeriod: "1820年 - 1850年（在位30年）",
    lifespan: "1782年 - 1850年（享年69岁）",
    reignYears: 30,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Daoguang_Emperor.jpg/480px-Daoguang_Emperor.jpg",
    tags: ["鸦片战争", "南京条约", "近代史开端", "极度节俭穿补丁", "盲目守旧"],
    isFamous: true,
    summary: "嘉庆次子。中国近代史开端的皇帝。为人极度节俭甚至穿补丁裤。起用林则徐虎门销烟。然而鸦片战争爆发后战和不定割地求和，签订中国近代第一个不平等条约《南京条约》。",
    achievements: [
      "平定新疆张格尔叛乱：生擒叛匪头目张格尔，保全西北边疆领土完整。",
      "支持林则徐严禁鸦片：任命林则徐为钦差大臣赴广东查禁鸦片，促成举世震惊的“虎门销烟”英雄壮举。",
      "躬行极端节俭：裁减宫廷用度，身穿打补丁龙袍，提倡素食清苦。"
    ],
    controversies: [
      "鸦片战争战败屈辱投降：英军兵临南京江面，道光惊慌失措罢黜林则徐流放伊犁，派遣耆英签订丧权辱国的中英《南京条约》，割让香港岛，赔款二千一百万银元，五口通商，中国沦为半殖民地半封建社会。",
      "对外部世界两眼一抹黑，战中竟荒唐发问“英国与俄罗斯是否接壤、女王可有夫婿”，愚昧昏聩。"
    ],
    quotes: "英吉利至回疆，有无旱路可通？该国女主年方二十二岁，何以被推为共主？（道光问案）",
    anecdotes: "龙袍膝盖打补丁带头节俭、问大臣一碗鸡蛋几个钱、林则徐虎门销烟、割让香港岛痛哭。",
    evaluation: "《清史稿》：“宣宗恭俭之德，宽仁之量，自古帝王少有其比。然值中西变局之会，所用非人，关防失守，遂致外夷乘隙，兵辱城下，千古恨事也！”"
  },
  {
    id: "qing-de-zong-guangxu",
    dynastyId: "qing",
    dynastyName: "清朝",
    name: "爱新觉罗·载湉",
    templeName: "德宗",
    posthumousName: "同天崇运大中至正经文纬武仁孝睿智端俭宽勤景皇帝",
    eraName: "光绪",
    reignPeriod: "1875年 - 1908年（在位34年）",
    lifespan: "1871年 - 1908年（终年38岁）",
    reignYears: 34,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Guangxu_Emperor.jpg/480px-Guangxu_Emperor.jpg",
    tags: ["戊戌变法", "百日维新", "甲午海战", "悲情傀儡", "瀛台幽禁", "被慈禧砒霜毒杀"],
    isFamous: true,
    summary: "醇亲王奕譞之子，慈禧太后养子与傀儡。四岁登基。甲午战争力主抗日惨败。1898年任用康有为、梁启超发起“戊戌变法”，被慈禧太后发动政变囚禁于中南海瀛台十年，死于砒霜中毒。",
    achievements: [
      "支持甲午抗战主战派：支持翁同龢，严令李鸿章北洋水师主动出击决战（虽终因清廷腐朽失败）。",
      "主持“戊戌变法”（百日维新）：短短一百零三天颁布上百道诏书，提倡废除八股设立京师大学堂（北京大学前身），修筑铁路鼓励工商业，试图变法图强挽救危局。"
    ],
    controversies: [
      "政治经验极度幼稚不成熟，变法操之过急，轻信袁世凯告密，未能掌控兵权即图谋围颐和园劫持慈禧，导致政变迅速破灭。",
      "马关条约与辛丑条约均在其在位期间签订，割让台湾赔款空前，民族危机空前加深。"
    ],
    quotes: "朕何忍作亡国之君！设使变法而能保社稷，朕粉身碎骨何足惜！",
    anecdotes: "百日维新除旧布新、创设京师大学堂、袁世凯告密荣禄、珍妃被慈禧推入水井、瀛台十年泣血幽禁。",
    evaluation: "当代法医检验其头发遗骨，证实确系被慈禧在临终前夕以高浓度砒霜毒杀。梁启超：“德宗皇帝之仁，足以救天下；其毅，足以图自强，唯运会不造，受制于权后，呜呼痛哉！”"
  },
  {
    id: "qing-xuantong-puyi",
    dynastyId: "qing",
    dynastyName: "清朝",
    name: "爱新觉罗·溥仪",
    templeName: "无",
    posthumousName: "无（逊帝 / 末代皇帝）",
    eraName: "宣统",
    reignPeriod: "1908年 - 1912年（称帝3年，伪满洲国执政13年）",
    lifespan: "1906年 - 1967年（享年62岁）",
    reignYears: 3,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Puyi_as_child.jpg/480px-Puyi_as_child.jpg",
    tags: ["末代皇帝", "清帝逊位", "终结两千年帝制", "伪满洲国傀儡", "特赦公民"],
    isFamous: true,
    summary: "中国封建历史最后一位皇帝。三岁登基。1912年辛亥革命爆发，隆裕太后代其颁布《清帝逊位诏书》，宣告清朝及中国两千余年君主专制帝制终结。后沦为伪满傀儡，新中国成立后改造为普通公民。",
    achievements: [
      "颁布《清帝逊位诏书》：避免了全国更大规模的流血内战，和平交权予中华民国，宣告中国两千一百三十二年封建君主专制历史彻底落幕。",
      "撰写回忆录《我的前半生》，成为研究中国近代政治与末代宫廷生活的第一手国宝级文献。"
    ],
    controversies: [
      "张勋复辟中被拥立复辟十二天闹剧；九一八事变后投靠日本侵略者出任伪满洲国傀儡皇帝，犯下背叛民族严重罪行。",
      "东京审判作为证人出庭指控日本战犯罪行。"
    ],
    quotes: "前清宣统帝，今日新公民。（晚年感慨）/ 今全国人民心理多倾向共和……特率皇帝将统治权公诸全国，定为共和立宪国体。（《清帝逊位诏书》）",
    anecdotes: "三岁登基哭闹摄政王言“快完了”、被冯玉祥逐出紫禁城、伪满洲国长春傀儡岁月、抚顺战犯管理所改造成普通公民并拥有一张选民证。",
    evaluation: "周恩来：“把末代皇帝改造成新中国社会主义自食其力的普通公民，这是中国共产党创造的世界奇迹。”电影《末代皇帝》获奥斯卡九项大奖。"
  }
];

// ==================== 华夏朝代演进大系（时间轴深度数据） ====================
const DYNASTIES_DATA = [
  {
    id: "xia-shang-zhou",
    name: "先秦·华夏起源（夏·商·西周·东周春秋战国）",
    shortName: "先秦时代",
    period: "约公元前2070年 - 公元前221年",
    duration: "约1850年",
    capitals: "阳城/二里头（夏）、亳/殷墟（商）、镐京/洛邑（周）",
    founders: "夏禹 / 商汤 / 周武王姬发",
    fallRulers: "夏桀 / 商纣王帝辛 / 周赧王",
    overview: "华夏文明的奠基期与黄金破晓。从原始部族联盟走向早期国家，开创分封制与宗法制。春秋战国大变革，百家争鸣，奠定中华民族哲学思想底色。",
    battles: [
      {
        name: "鸣条之战（约前1600年）",
        desc: "商汤率领商军与夏桀决战于鸣条，夏军溃败，夏桀被流放，夏朝灭亡，商朝建立，开创商汤革命。“汤武革命，顺乎天而应乎人”。"
      },
      {
        name: "牧野之战（约前1046年）",
        desc: "周武王率各路诸侯联军誓师伐商，于牧野击溃商纣王数十万倒戈前锋奴隶大军，纣王自焚鹿台，商亡周立，确立西周八百年宗法礼乐根基。"
      },
      {
        name: "城濮之战（前632年）",
        desc: "春秋时期晋楚争霸之战。晋文公践行“退避三舍”诱敌深入，大败楚军，晋文公一战确立中原霸主地位。"
      },
      {
        name: "长平之战（前260年）",
        desc: "战国战局决定性大转折。秦名将白起对阵赵括“纸上谈兵”，秦军穿插合围赵军四十五万人，白起坑杀赵降卒四十万，赵国元气丧尽，秦国统一大势已不可阻挡。"
      }
    ],
    reforms: [
      {
        name: "管仲改革（齐国·春秋）",
        desc: "“尊王攘夷”，推行相地而衰征（按土地质量定赋税），官山海（盐铁官营），助齐桓公成春秋首霸。"
      },
      {
        name: "商鞅变法（秦国·战国）",
        desc: "废井田开阡陌，重农抑商，奖军功废世卿世禄，推行连坐县制。使偏狭弱秦迅速蜕变为虎狼之师，奠定统一天下制度根基。"
      },
      {
        name: "百家争鸣（先秦诸子）",
        desc: "儒、道、法、墨、兵、阴阳等学派交相辉映。孔孟仁政、老庄无为、韩非法治、墨子兼爱，成为中华文明永不磨灭的元初思想内核。"
      }
    ]
  },
  {
    id: "qin",
    name: "秦朝（公元前221 - 前207）",
    shortName: "大秦帝国",
    period: "公元前221年 - 公元前207年",
    duration: "15年",
    capitals: "咸阳",
    founders: "秦始皇 嬴政",
    fallRulers: "秦王子婴",
    overview: "中国历史上首个大一统中央集权封建帝国。书同文、车同轨、行同伦，奠定中国两千余年大一统郡县制官僚体制框架，二世而亡留千古镜鉴。",
    battles: [
      {
        name: "秦灭六国之战（前230 - 前221）",
        desc: "十年间先后扫平韩、赵、魏、楚、燕、齐，结束春秋战国五百余年诸侯割据兼并混战，建立首个天下一统帝国。"
      },
      {
        name: "巨鹿之战（前207年）",
        desc: "楚霸王项羽率五万楚军“破釜沉舟”，九战九捷以一当十歼灭秦名将章邯、王离四十万精锐主力，彻底敲响大秦覆灭丧钟。"
      },
      {
        name: "垓下之战（前202年）",
        desc: "韩信十面埋伏合围项羽于垓下，四面楚歌瓦解楚军军心，西楚霸王乌江自刎，楚汉争霸落幕，汉朝开国。"
      }
    ],
    reforms: [
      {
        name: "全面确立郡县制",
        desc: "廷议废除封建分封，分天下为三十六郡，郡下设县，官吏由中央直接任免，开创两千年中央集权帝国体制。"
      },
      {
        name: "统一车轨、度量衡与文字（小篆）",
        desc: "消除列国壁垒，使华夏大地无论方言如何各异，皆能通过统一文字小篆沟通，为多民族国家永久统一提供文化血脉黏合剂。"
      }
    ]
  },
  {
    id: "xi-han",
    name: "西汉（公元前202 - 公元9年）",
    shortName: "西汉（前汉）",
    period: "公元前202年 - 公元9年",
    duration: "210年",
    capitals: "长安（今西安）",
    founders: "汉高祖 刘邦",
    fallRulers: "孺子婴（王莽篡位）",
    overview: "中华大一统强盛帝国之确立。“汉人”、“汉字”、“汉族”之名自此定格。文景之治修养生息，汉武帝北却匈奴、凿空西域丝绸之路、独尊儒术，昭宣中兴达至鼎盛。",
    battles: [
      {
        name: "白登之围（前200年）",
        desc: "汉高祖亲征匈奴被冒顿单于四十万骑围于白登山七天七夜，陈平用奇计脱险，开启西汉前期和亲忍辱负重战略。"
      },
      {
        name: "漠北之战（前119年）",
        desc: "汉匈全面决战。卫青出定襄击伊稚斜单于；霍去病出代郡封狼居胥，打通河西走廊，“匈奴远遁，幕南无王庭”。"
      },
      {
        name: "昆阳之战（公元23年）",
        desc: "刘秀以少胜多巅峰战役。绿林军刘秀率精锐死士大破王莽四十二万新莽主力大军，新朝直接走向覆灭。"
      }
    ],
    reforms: [
      {
        name: "汉武帝推恩令",
        desc: "主父偃献策，允许诸侯王将领地分封子弟为列侯，大国化小，和平消解王国割据隐患而皇权大尊。"
      },
      {
        name: "罢黜百家，独尊儒术",
        desc: "董仲舒提出天人感应、大一统说，儒家思想正式成为中国封建社会两千年的官方钦定正统哲学思想。"
      },
      {
        name: "设西域都护府（前60年）",
        desc: "汉宣帝命郑吉统领西域南北道，新疆地区正式纳入中国版图与中央政府管辖。"
      }
    ]
  },
  {
    id: "dong-han",
    name: "东汉（公元25 - 220年）",
    shortName: "东汉（后汉）",
    period: "公元25年 - 220年",
    duration: "195年",
    capitals: "洛阳",
    founders: "汉光武帝 刘秀",
    fallRulers: "汉献帝 刘协",
    overview: "光武中兴重振大汉社稷。明章之治天下安宁，佛教传入建白马寺，蔡伦造纸革新科技，班超投笔从戎经营西域。后期外戚宦官交替乱政引爆黄巾之乱，军阀割据走向三国。",
    battles: [
      {
        name: "窦宪勒石燕然（89年）",
        desc: "大将军窦宪、耿秉大破北匈奴主力于稽落山，登燕然山刻石纪功（班固作铭），彻底解决汉朝四百年北匈奴边患。"
      },
      {
        name: "黄巾起义（184年）",
        desc: "张角创太平道聚众百万喊出“苍天已死，黄天当立，岁在甲子，天下大吉”，朝廷令各地州牧拥兵自平乱，东汉名存实亡开启军阀混战。"
      }
    ],
    reforms: [
      {
        name: "光武度田与柔道治国",
        desc: "清丈全国土地与核实人丁，抑制豪强；精简地方官吏，退功臣重文吏，宽简治民。"
      },
      {
        name: "蔡伦改进造纸术（105年）",
        desc: "采用树皮、麻头、破布与旧渔网制成质优价廉植物纤维纸（蔡侯纸），引发全人类文明记录载体革命。"
      }
    ]
  },
  {
    id: "san-guo",
    name: "三国（公元220 - 280年）",
    shortName: "三国鼎立",
    period: "公元220年 - 280年",
    duration: "60年",
    capitals: "洛阳（魏）、成都（蜀）、建业/南京（吴）",
    founders: "魏文帝曹丕 / 汉昭烈帝刘备 / 吴大帝孙权",
    fallRulers: "曹奂 / 刘禅 / 孙皓",
    overview: "英雄辈出、谋略交锋之传奇时代。魏蜀吴三足鼎立，赤壁之战定天下三分，夷陵之战定国界，开发江南与西南，九品中正制确立门阀时代序幕。",
    battles: [
      {
        name: "官渡之战（200年）",
        desc: "曹操以弱胜强以两万兵击破袁绍十万大军，偷袭乌巢粮仓一战定胜负，奠定统一中国北方宏基。"
      },
      {
        name: "赤壁之战（208年）",
        desc: "孙刘联军周瑜、诸葛亮火烧曹操战船八百里赤壁，曹操败走华容道，奠定魏蜀吴天下三分雏形。"
      },
      {
        name: "夷陵之战（221 - 222年）",
        desc: "刘备率蜀汉精锐为关羽报仇伐吴，陆逊扼守防线火烧连营七百里大破蜀军，打破蜀吴均势，刘备白帝托孤。"
      }
    ],
    reforms: [
      {
        name: "九品中正制创立（220年）",
        desc: "陈群创立，由中正官评定士人九品官资，后逐渐演变为“上品无寒门，下品无势族”之士族特权制度。"
      },
      {
        name: "孙吴经营江南与开拓夷洲（台湾）",
        desc: "230年遣卫温率万余水师航海抵夷洲（台湾），开辟六朝古都建业，江南水乡农桑工贸迅速腾飞。"
      }
    ]
  },
  {
    id: "liang-jin",
    name: "两晋（西晋 265-316，东晋 317-420）",
    shortName: "西晋与东晋",
    period: "公元265年 - 420年",
    duration: "155年",
    capitals: "洛阳（西晋）、建康/南京（东晋）",
    founders: "晋武帝司马炎 / 晋元帝司马睿",
    fallRulers: "晋愍帝司马邺 / 晋恭帝司马德文",
    overview: "西晋灭吴一统三国，旋因八王之乱与五胡内迁骤然倾覆。衣冠南渡建立东晋，门阀士族当道，淝水之战以少胜多保全江南汉文明火种。",
    battles: [
      {
        name: "八王之乱（291 - 306年）",
        desc: "西晋宗室八王长达十六年自相残杀夺权战争，消耗西晋全国元气，中原沦为人间地狱，直接引发五胡乱华。"
      },
      {
        name: "淝水之战（383年）",
        desc: "前秦苻坚率八十余万投鞭断流大军企图灭东晋，谢安运筹帷幄，谢玄率八万北府兵于淝水草木皆兵大破前秦，保全南方汉家文明火种。"
      }
    ],
    reforms: [
      {
        name: "占田制与课田制（西晋）",
        desc: "太康年间颁布，规定官民占有土地限额与缴纳田租法，短期促进太康繁荣。"
      },
      {
        name: "衣冠南渡与门阀政治",
        desc: "北方流民与士族大规模迁徙江南（“王与马共天下”），促进长江中下游大开发与江南文化勃兴。"
      }
    ]
  },
  {
    id: "nan-bei-chao",
    name: "南北朝（公元420 - 589年）",
    shortName: "南北朝对峙",
    period: "公元420年 - 589年",
    duration: "169年",
    capitals: "建康/南京（南朝宋齐梁陈）、平城/洛阳（北魏）、邺城/长安（东魏西魏北齐北周）",
    founders: "宋武帝刘裕 / 北魏道武帝拓跋珪",
    fallRulers: "陈后主陈叔宝（隋灭陈）",
    overview: "中华大分裂与民族大融合之剧烈阵痛期。南朝宋齐梁陈六朝风流，北朝北魏孝文帝汉化改革打破胡汉隔阂，关陇军事贵族集团崛起为隋唐大一统孕育力量。",
    battles: [
      {
        name: "刘裕北伐与却月阵（417年）",
        desc: "刘裕率北府兵北伐灭南燕、后秦，以战车舟船组成“却月阵”以步克骑，两千步兵射杀数万北魏铁骑奇迹。"
      },
      {
        name: "沙苑之战（537年）",
        desc: "西魏宇文泰以不满万人伏击高欢东魏二十万大军，以少胜多大胜，奠定西魏与北周鼎立根基。"
      }
    ],
    reforms: [
      {
        name: "北魏孝文帝汉化改革（太和改制）",
        desc: "迁都洛阳，改汉姓、穿汉服、禁胡语、通汉婚，推行均田制与三长制，完成中华民族历史上最波澜壮阔的胡汉大交融。"
      },
      {
        name: "北周府兵制创立（宇文泰）",
        desc: "创立八柱国十二大将军与二十四军府兵体制，兵民合一，形成隋唐核心统治阶层“关陇集团”。"
      }
    ]
  },
  {
    id: "sui",
    name: "隋朝（公元581 - 618年）",
    shortName: "大隋王朝",
    period: "公元581年 - 618年",
    duration: "37年",
    capitals: "大兴（长安）、东都洛阳",
    founders: "隋文帝 杨坚",
    fallRulers: "隋恭帝杨侑 / 隋炀帝杨广",
    overview: "结束数百年南北分裂重归大一统。创设三省六部制与科举制度，开凿京杭大运河，修筑长城驰道。虽二世而亡，但开创之典章制度奠定盛唐极盛基石。",
    battles: [
      {
        name: "隋灭陈之战（589年）",
        desc: "晋王杨广统帅五十一万水陆大军渡江攻破建康，生擒陈后主，结束近三百年南北大分裂局面，华夏重归大一统。"
      },
      {
        name: "三征高句丽之战（612 - 614年）",
        desc: "隋炀帝三次征集百万大军跨辽东远征高句丽，萨水之战三十万前锋仅存二千七百人，耗尽民力触发全国大起义。"
      }
    ],
    reforms: [
      {
        name: "创立科举考试制度",
        desc: "废除九品中正制，初设进士科，按考试才能择优录用官吏，打破世家大族垄断，开创世界封建文官制度先河。"
      },
      {
        name: "完善三省六部制",
        desc: "确立中书、门下、尚书三省与吏户礼兵刑工六部中枢体制，分工明确、相互制衡，沿用至清末。"
      },
      {
        name: "开凿隋唐大运河",
        desc: "开凿通济渠、邗沟、永济渠、江南河，连通五大水系全长两千七百公里，成为维系中国南北经济命脉的黄金水道。"
      }
    ]
  },
  {
    id: "tang",
    name: "唐朝（公元618 - 907年）",
    shortName: "大唐盛世",
    period: "公元618年 - 907年",
    duration: "289年",
    capitals: "长安（西京）、洛阳（东都）",
    founders: "唐高祖李渊 / 唐太宗李世民",
    fallRulers: "唐哀帝 李柷（朱温篡唐）",
    overview: "中国封建社会的最巅峰黄金时代。政治开明包容自信，贞观之治、开元盛世万国来朝。诗歌艺术灿若星河。安史之乱后藩镇割据尾大不掉，黄巢起义彻底摧垮帝国。",
    battles: [
      {
        name: "虎牢关之战（621年）",
        desc: "李世民以三千五百精锐玄甲铁骑直插虎牢关，一举生擒窦建德十万大军，迫使洛阳王世充开城投降，一战定天下大势。"
      },
      {
        name: "白江口之战（663年）",
        desc: "刘仁轨率唐朝战船一百七十艘于朝鲜白江口四战皆捷，火烧日本水师四百艘战船，斩倭军万人，日本此后千载向唐称臣学艺。"
      },
      {
        name: "安史之乱（755 - 763年）",
        desc: "安禄山、史思明叛军反唐攻陷两京，郭子仪、李光弼历时八年平乱，大唐由极盛跌入深渊，藩镇割据自此难收。"
      }
    ],
    reforms: [
      {
        name: "贞观纳谏与开明民族治理（天可汗）",
        desc: "太宗任贤虚己听纳魏征诤谏；羁縻府州因俗而治，唐朝开放包容吸纳波斯、新罗、日本等四海人才入朝为官。"
      },
      {
        name: "两税法改革（780年·杨炎）",
        desc: "由于均田制瓦解，宰相杨炎改租庸调制为两税法，“户无主客，以见居为簿；人无丁中，以贫富为差”，夏秋两征，深刻影响后世千年税制。"
      }
    ]
  },
  {
    id: "wu-dai",
    name: "五代十国（公元907 - 960年）",
    shortName: "五代十国",
    period: "公元907年 - 960年",
    duration: "53年",
    capitals: "开封、洛阳（五代中原）",
    founders: "后梁朱温 / 后唐李存勖 / 后晋石敬瑭 / 后汉刘知远 / 后周郭威",
    fallRulers: "后周恭帝柴宗训（赵匡胤代周建宋）",
    overview: "唐末藩镇割据的极度演变。五代后梁后唐后晋后汉后周如走马灯在中原更替，石敬瑭割让燕云十六州遗患四百年。后周世宗柴荣改革治国，为北宋终结乱世奠定坚实先机。",
    battles: [
      {
        name: "高平之战（954年）",
        desc: "后周世宗柴荣登基初面对北汉契丹联军压境，临阵斩杀畏缩将领亲临督战，一举击溃联军，稳固后周江山并开启统一序幕。"
      }
    ],
    reforms: [
      {
        name: "石敬瑭割让燕云十六州（936年）",
        desc: "后晋高祖石敬瑭称契丹耶律德光为“父皇帝”，割让幽蓟燕云十六州并输岁绢，使中原失去抵御北方游牧铁骑的天然长城屏障达四百年之久。"
      },
      {
        name: "后周世宗大整军政与毁佛铸钱",
        desc: "整顿禁军组建殿前司精兵；清理寺院僧尼还俗，铜佛铸行“周元通宝”，开除冗弊，为北宋奠定统一实力。"
      }
    ]
  },
  {
    id: "bei-song",
    name: "北宋（公元960 - 1127年）",
    shortName: "大宋北宋",
    period: "公元960年 - 1127年",
    duration: "167年",
    capitals: "东京开封府（汴梁）",
    founders: "宋太祖 赵匡胤",
    fallRulers: "宋钦宗 赵桓（靖康之难）",
    overview: "文治辉煌之巅峰。重文抑武彻底消弭武人割据之祸，士大夫与皇帝共治天下。印刷术、指南针、火药三大发明走向成熟，理学萌芽，交子问世。惜军力积弱，靖康之变北宋灭亡。",
    battles: [
      {
        name: "高梁河之战（979年）",
        desc: "宋太宗灭北汉后乘胜北伐辽国燕京，辽名将耶律休哥夹击大败宋军于高梁河，太宗中箭负伤乘驴车逃脱，宋辽转入战略攻守易位。"
      },
      {
        name: "澶州之战与澶渊之盟（1004年）",
        desc: "辽萧太后率大军深入南下，宋真宗御驾亲征澶州射杀辽将萧挞凛，双方订立“澶渊之盟”结为兄弟之国，以少量岁币换取宋辽百余年和平安宁。"
      },
      {
        name: "靖康之难（1127年）",
        desc: "金军铁骑两度南下围困汴京，郭京妖术破城，金兵俘虏徽钦二帝及宗室三千余人北去，开封府被洗劫一空，北宋悲惨灭亡。"
      }
    ],
    reforms: [
      {
        name: "宋太祖杯酒释兵权与收天下精兵",
        desc: "解除禁军统领大将兵权，分设枢密院与三衙，地方财权归转运使，知州全用文臣，彻底消弭唐末藩镇割据。"
      },
      {
        name: "王安石熙宁变法（1069年）",
        desc: "神宗支持王安石推行青苗、免役、市易、方田均税、保甲等新法，富国强兵充实国库，但因急进激起新旧党争惨烈内耗。"
      },
      {
        name: "三大发明成熟与纸币交子诞生",
        desc: "活字印刷术（毕昇）、指南针用于航海、火药广泛应用于军事；四川诞生世界最早纸币“交子”。"
      }
    ]
  },
  {
    id: "nan-song",
    name: "南宋（公元1127 - 1279年）",
    shortName: "大宋南宋",
    period: "公元1127年 - 1279年",
    duration: "152年",
    capitals: "临安府（今杭州）",
    founders: "宋高宗 赵构",
    fallRulers: "宋末帝 赵昺（崖山蹈海）",
    overview: "偏安江南但经济文化登峰造极。经济重心南移彻底完成，海外海上丝绸之路繁荣无比。岳飞精忠报国抗金留悲歌，朱熹理学大成。顽强抗击蒙元近半个世纪，终陨于崖山海战。",
    battles: [
      {
        name: "郾城与颍昌大捷（1140年）",
        desc: "岳飞率岳家军北伐，以背嵬军铁骑大破金兀术“拐子马”与“铁浮屠”王牌骑兵，收复郑州洛阳，直逼朱仙镇，惜遭十二道金牌班师。"
      },
      {
        name: "采石之战（1161年）",
        desc: "金帝完颜亮率六十万大军南侵扬言投鞭断江，文臣虞允文挺身督战，南宋水军以霹雳炮火烧金军战船于采石矶大捷，完颜亮被部将弑杀溃败。"
      },
      {
        name: "襄阳保卫战（1267 - 1273年）",
        desc: "南宋抗元最关键枢纽决战。吕文焕率孤军坚守襄阳长达六年之久，元军使用回回炮巨石破樊城，襄阳弹尽粮绝出降，南宋门户洞开。"
      },
      {
        name: "崖山海战（1279年）",
        desc: "宋元最后决战。张弘范元水军猛烈围攻崖山宋军水寨，宋军全线溃散，丞相陆秀夫负幼帝赵昺投海殉国，十万军民随之蹈海，南宋彻底灭亡。"
      }
    ],
    reforms: [
      {
        name: "绍兴和议与宋金对峙确立",
        desc: "高宗、秦桧冤杀岳飞，与金订立屈辱和议称臣割地纳岁币，确立淮河—大散关宋金分界线。"
      },
      {
        name: "经济重心南移完成与海上丝路鼎盛",
        desc: "“苏湖熟，天下足”，泉州、广州成为东方第一大海港，市舶司关税收入成为南宋财政重要支柱；朱熹集理学大成。"
      }
    ]
  },
  {
    id: "yuan",
    name: "元朝（公元1271 - 1368年）",
    shortName: "大元帝国",
    period: "公元1271年 - 1368年",
    duration: "98年",
    capitals: "大都（今北京）、上都（开平）",
    founders: "元世祖 忽必烈",
    fallRulers: "元顺帝 妥懽帖睦尔",
    overview: "首个由少数民族建立的全国大一统帝国。幅员辽阔“东尽辽左西极流沙”。开创行省制度，营建北京城中轴线，贯通大运河漕运与驿道系统。四等人制民族压迫与滥发纸币导致红巾军起义迅速瓦解。",
    battles: [
      {
        name: "元灭南宋之战（1276 - 1279年）",
        desc: "伯颜率元大军顺江而下直取临安，谢太后与宋恭帝出降，最终崖山海战彻底平定南宋残余，实现全中国大一统。"
      },
      {
        name: "元末红巾军起义（1351年起）",
        desc: "韩山童、刘福通白莲教起义喊出“虎贲三千，直抵幽燕之地；龙飞九五，重开大宋之天”，朱元璋等群雄并起席卷江南。"
      }
    ],
    reforms: [
      {
        name: "开创行省制度（行中书省）",
        desc: "忽必烈确立行省制，打破以山川形便划分界限的传统，以犬牙交错强化中央集权控制，成为现代中国各省制度源头。"
      },
      {
        name: "重新贯通京杭大运河与重开亚欧陆海丝路",
        desc: "开凿通惠河使漕船直通大都积水潭；设遍布全国的急递铺与驿站系统，马可·波罗来华见证东方帝国繁华。"
      }
    ]
  },
  {
    id: "ming",
    name: "明朝（公元1368 - 1644年）",
    shortName: "大明王朝",
    period: "公元1368年 - 1644年",
    duration: "276年",
    capitals: "南京（应天府，1368-1421）、北京（顺天府，1421-1644）",
    founders: "明太祖 朱元璋",
    fallRulers: "明思宗崇祯帝 朱由检",
    overview: "驱逐蒙元恢复中华。不和亲、不赔款、不割地，天子守国门君王死社稷。废丞相设内阁首辅与厂卫，郑和七下西洋远扬国威，张居正改革，明末抗倭援朝。终因小冰期天灾、满洲崛起与农民军起义亡于煤山。",
    battles: [
      {
        name: "鄱阳湖水战（1363年）",
        desc: "朱元璋二十万水师对阵陈友谅六十万巨舰大军，火攻决战鄱阳湖三十六天，射杀陈友谅，奠定朱元璋统一江南霸主大局。"
      },
      {
        name: "靖难之役（1399 - 1402年）",
        desc: "燕王朱棣以“清君侧、靖国难”起兵反抗建文帝削藩，千里长驱渡江攻占南京，建文帝失踪，朱棣登基即明成祖。"
      },
      {
        name: "北京保卫战（1449年）",
        desc: "土木堡之变英宗被俘瓦剌大军围京，于谦扶立景泰帝，率全城军民背城死战，神机营重炮轰退也先，拯救大明王朝于悬崖绝境。"
      },
      {
        name: "万历朝鲜之役（1592 - 1598年）",
        desc: "抗倭援朝保卫战。明军跨鸭绿江大破日本关白丰臣秀吉十四万侵朝精锐，碧蹄馆血战、露梁海战全歼日寇水师，日本数百年不敢窥视华夏。"
      },
      {
        name: "萨尔浒之战（1619年）",
        desc: "明廷调集八路大军四路围攻后金努尔哈赤，努尔哈赤集中兵力逐个击破，明军主力丧尽，辽东攻守大势彻底逆转。"
      }
    ],
    reforms: [
      {
        name: "废除宰相与确立内阁制度",
        desc: "洪武十三年诛胡惟庸彻底废相，权分六部；永乐帝设内阁大学士参预机务，后演化为掌握票拟大权之内阁首辅制。"
      },
      {
        name: "张居正一条鞭法改革（1581年）",
        desc: "万历首辅张居正丈量土地，推行一条鞭法，将田赋徭役合并按亩折银征纳，赋税货币化，极大减轻农民负担充实国库。"
      },
      {
        name: "郑和下西洋与资本主义萌芽",
        desc: "1405-1433年郑和率最大船队七下西洋通好三十余国；隆庆开关解除海禁，江南丝织工商业萌发资本主义雏形。"
      }
    ]
  },
  {
    id: "qing",
    name: "清朝（公元1644 - 1912年，入关前称后金）",
    shortName: "大清帝国",
    period: "公元1644年 - 1912年",
    duration: "268年（入关后）",
    capitals: "盛京（沈阳）、北京（顺天府）",
    founders: "清太祖努尔哈赤 / 清世祖福临",
    fallRulers: "宣统帝 溥仪",
    overview: "中国历史上最后一个封建封建王朝。奠定中国近代辽阔疆域版图（逾1300万平方公里）。康雍乾盛世达至封建专制巅峰。晚年闭关锁国错失工业革命，西方列强坚船利炮轰开国门沦为半殖民地，辛亥革命推翻两千年帝制走向共和。",
    battles: [
      {
        name: "山海关大战（一片石之战，1644年）",
        desc: "吴三桂降清开山海关迎多尔衮清骑入关，联手大败李自成大顺军主力，李自成仓皇撤离北京，大清定鼎中原。"
      },
      {
        name: "平定准噶尔之战（1690 - 1757年）",
        desc: "康熙、雍正、乾隆祖孙三代跨越近七十年接力远征，彻底消灭准噶尔汗国，新疆全境重新归入中国中央政府治理。"
      },
      {
        name: "鸦片战争（1840 - 1842年）",
        desc: "英国发动侵华战争，清军腐朽溃败，签订中国近代第一个不平等条约《南京条约》，中国近代屈辱史拉开序幕。"
      },
      {
        name: "甲午中日海战（1894 - 1895年）",
        desc: "黄海海战邓世昌撞向敌舰殉国，北洋水师全军覆没威海卫，签订《马关条约》割让台湾赔款两亿两白银，列强掀起瓜分中国狂潮。"
      },
      {
        name: "武昌起义与辛亥革命（1911年）",
        desc: "湖北新军打响第一枪，十八省响应脱离清廷独立，推举孙中山为临时大总统，1912年清帝退位，两千余年中国封建帝制终结。"
      }
    ],
    reforms: [
      {
        name: "军机处设立与君主专制极峰",
        desc: "雍正设军机房（军机处），跪受笔录直接传达上意，架空内阁与议政王大臣会议，皇权专制集权达历史登峰造极之境。"
      },
      {
        name: "摊丁入亩与改土归流",
        desc: "彻底废除人头税，丁银并入田亩按田亩纳税；西南地区取消世袭少数民族土司设置中央直派流官，促进国家治理一体化。"
      },
      {
        name: "洋务运动与戊戌变法",
        desc: "曾国藩、李鸿章掀起“师夷长技以自强”洋务运动兴办近代军工实业；康有为梁启超推动百日维新，启迪近代中华民主宪政觉醒。"
      }
    ]
  }
];

// 导出全局对象，支持模块与浏览器直接挂载
if (typeof module !== "undefined" && module.exports) {
  module.exports = { EMPERORS_DATA, DYNASTIES_DATA };
}
