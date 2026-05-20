// 慈濟大學介紹網站 - 互動邏輯

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. 暗黑模式 (Dark Mode) 切換
  // ==========================================
  const themeToggle = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // 初始化主題
  if (storedTheme === 'dark' || (!storedTheme && systemPrefersDark)) {
    document.documentElement.classList.add('dark');
    updateThemeIcon(true);
  } else {
    document.documentElement.classList.remove('dark');
    updateThemeIcon(false);
  }

  // 點擊事件
  themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcon(isDark);
  });

  function updateThemeIcon(isDark) {
    const icon = themeToggle.querySelector('i') || themeToggle;
    if (isDark) {
      icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`;
    } else {
      icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;
    }
  }

  // ==========================================
  // 2. 行動端漢堡選單 (Mobile Menu)
  // ==========================================
  const menuToggle = document.getElementById('menu-toggle');
  const navLinksContainer = document.getElementById('nav-links-container');
  const navLinks = document.querySelectorAll('.nav-link');

  menuToggle.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
    menuToggle.classList.toggle('open');
  });

  // 點擊連結後自動關閉選單
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinksContainer.classList.remove('active');
      menuToggle.classList.remove('open');
    });
  });

  // ==========================================
  // 3. 滾動偵測：導覽列縮小與 Active 狀態
  // ==========================================
  const header = document.querySelector('header');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // 導覽列縮小
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // 當前閱讀區塊對應導覽列 Active 狀態
    let currentId = '';
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });

  // ==========================================
  // 4. 校區 Tab 切換機制
  // ==========================================
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      // 切換 Button 狀態
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // 切換 Panel 狀態
      tabPanels.forEach(panel => {
        if (panel.id === `${targetTab}-panel`) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });

  // ==========================================
  // 5. 學術學院詳細介紹彈窗 (Modal)
  // ==========================================
  const collegeData = {
    medicine: {
      title: '醫學院',
      sub: 'College of Medicine',
      desc: '與慈濟醫療志業體密切合作，結合東台灣醫療樞紐「花蓮慈濟醫院」，擁有卓越的教學資源與臨床實習場域。',
      highlights: [
        '**無語良師 (Silent Mentor)**：全球領先之模擬手術教學，培養仁心仁術之良醫。',
        '**全人醫療教育**：除了專業醫學知識，更融入生命倫理、慈善人文的品格教育。',
        '**高師資比與頂尖設備**：提供精準醫學、臨床技能中心等前瞻性研究設備。'
      ],
      departments: ['醫學系', '後中醫學系', '醫學檢驗生物技術學系', '物理治療學系', '作業治療學系']
    },
    nursing: {
      title: '護理學院',
      sub: 'College of Nursing',
      desc: '整合原慈濟科技大學護理系所之優勢，為台灣與國際培育優秀、溫暖、專業護理人才的搖籃。',
      highlights: [
        '**百分之百就業保證**：與慈濟各院區無縫對接，提供公費生制度與優渥獎助學金。',
        '**模擬臨床病房**：建置先進的擬真護理教學中心，讓學生在安全環境下精進臨床技術。',
        '**國際化學術交流**：每年選送學生至美、日、星等國進行海外實習與學術發表。'
      ],
      departments: ['護理學系（學士班、碩士班、博士班）']
    },
    biomedical: {
      title: '生物醫學科技學院',
      sub: 'College of Bio-medical Science & Technology',
      desc: '專注於生命科學前沿研究與生醫產業發展，結合基礎科學與臨床應用的跨領域研究重鎮。',
      highlights: [
        '**卓越生醫研究**：緊密結合慈濟醫學研究中心，推動癌症、幹細胞與免疫學研究。',
        '**產學無縫接軌**：與生技產業、藥廠進行長期合作，提供學生企業實習與研發專題。',
        '**師徒制實驗室**：大一起即可加入教授實驗室，進行一對一研究指導。'
      ],
      departments: ['生命科學系', '分子生物及人類遺傳學系']
    },
    humanities: {
      title: '人文社會科學院',
      sub: 'College of Humanities & Social Sciences',
      desc: '深耕人文素養，陶冶溫暖情懷與社會科學視野，著重「理論、實務、慈濟人文」的有機融合。',
      highlights: [
        '**多元跨領域學習**：推動傳播、心理、語文與社工的跨界整合課程。',
        '**在地深耕與國際關懷**：學生深入社區進行弱勢關懷、心理諮商輔導與非營利機構實作。',
        '**現代化數位傳播**：傳播學系配備專業影音製播中心，強調媒體識讀與人文敘事力。'
      ],
      departments: ['社會工作學系', '人類發展與心理學系', '傳播學系', '東方語文學系', '英美語文學系']
    },
    sustainability: {
      title: '智慧永續管理學院',
      sub: 'College of Smart & Sustainable Management',
      desc: '響應全球數位轉型與綠色永續（ESG）趨勢，培養具備科技應用與永續經營思維的跨界管理人才。',
      highlights: [
        '**AI 與大數據應用**：課程融入人工智慧、雲端運算與數據分析，培養科技實戰力。',
        '**永續與綠色金融**：聚焦企業永續、社會責任（CSR）以及 ESG 規劃管理。',
        '**實務專題導向**：強調產學合作案與企業專題，讓學生在校即可參與真實商業模式設計。'
      ],
      departments: ['資訊工程學系', '資訊管理學系', '經營管理學系', '行銷與流通管理學系']
    }
  };

  const modal = document.getElementById('college-modal');
  const modalBody = document.getElementById('modal-body');
  const modalClose = document.getElementById('modal-close');
  const collegeCards = document.querySelectorAll('.college-card');

  collegeCards.forEach(card => {
    card.addEventListener('click', () => {
      const type = card.getAttribute('data-college');
      const data = collegeData[type];
      if (!data) return;

      // 渲染 Modal 內容
      let highlightsHTML = data.highlights.map(hl => {
        // 簡單解析 **bold**
        const cleanHl = hl.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        return `<li>${cleanHl}</li>`;
      }).join('');

      let departmentsHTML = data.departments.map(dept => `<span>${dept}</span>`).join('');

      modalBody.innerHTML = `
        <div class="modal-header-content">
          <div class="modal-badge">${data.sub}</div>
          <h2>${data.title}</h2>
        </div>
        <div class="modal-info-grid">
          <div class="modal-desc-section">
            <h3>學院簡介</h3>
            <p>${data.desc}</p>
            <h3 style="margin-top: 1.5rem;">核心特色</h3>
            <ul class="modal-highlights">
              ${highlightsHTML}
            </ul>
          </div>
          <div class="modal-dept-section">
            <h3>開設學系 / 班別</h3>
            <div class="modal-depts">
              ${departmentsHTML}
            </div>
          </div>
        </div>
      `;

      // 顯示 Modal
      modal.classList.add('active');
      document.body.style.overflow = 'hidden'; // 鎖定背景捲動
    });
  });

  // 關閉 Modal
  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // ESC 鍵關閉
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // ==========================================
  // 6. 聯絡表單前端模擬驗證
  // ==========================================
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const message = document.getElementById('form-message').value.trim();

      if (!name || !email || !message) {
        showStatus('請填寫所有欄位！', 'error');
        return;
      }

      if (!validateEmail(email)) {
        showStatus('請輸入正確的電子信箱格式！', 'error');
        return;
      }

      // 模擬傳送狀態
      showStatus('傳送中，請稍候...', 'info');
      
      setTimeout(() => {
        showStatus('感謝您的來信！我們已收到您的訊息，將會盡快與您聯絡。', 'success');
        contactForm.reset();
      }, 1200);
    });
  }

  function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  }

  function showStatus(msg, type) {
    formStatus.className = `form-status-msg ${type}`;
    formStatus.textContent = msg;
    formStatus.classList.add('visible');

    if (type === 'success') {
      setTimeout(() => {
        formStatus.classList.remove('visible');
      }, 5000);
    }
  }

  // ==========================================
  // 7. Scroll Reveal 動態效果
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal');

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    revealElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      const elementVisible = 120; // 觸發動畫的距離下邊緣距離

      if (elementTop < windowHeight - elementVisible) {
        el.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  // 初始化檢查一次（有些元素一開始就在畫面中）
  setTimeout(revealOnScroll, 100);
});
