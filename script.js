document.addEventListener('DOMContentLoaded', function() {
  // Section 取得
  const pages = {
    home: document.getElementById('home'),
    companyRegister: document.getElementById('company-register'),
    companyChat: document.getElementById('company-chat'),
    talentCards: document.getElementById('talent-cards'),
    studentRegister: document.getElementById('student-register'),
    studentResume: document.getElementById('student-resume'),
    resumeProgress: document.getElementById('resume-progress'),
    motivation: document.getElementById('motivation'),
    finish: document.getElementById('finish'),
    jobCards: document.getElementById('job-cards'),
  };

  function showPage(pageName) {
    Object.values(pages).forEach(p => p.classList.remove('active'));
    pages[pageName].classList.add('active');
  }

  // 首頁按鈕
  document.getElementById('btn-company').onclick = function() {
    showPage('companyRegister');
  };
  document.getElementById('btn-student').onclick = function() {
    showPage('studentRegister');
  };

  // 企業主註冊→AI對話
  document.getElementById('company-next').onclick = function() {
    showPage('companyChat');
    // 可在這裡初始化AI對話內容
  };

  // AI對話→人才卡片
  // 這裡假設AI對話結束後自動切換，或你可加一個按鈕/條件
  // 先用定時模擬
  let aiChatToCardsTimeout;
  pages.companyChat.addEventListener('show', function() {
    clearTimeout(aiChatToCardsTimeout);
    aiChatToCardsTimeout = setTimeout(() => {
      showPage('talentCards');
      renderTalentCard(0);
      currentCard = 0;
    }, 2000);
  });

  // 人才卡片滑動（內容與圖片一致）
  const talentCardsData = [
    {
      name: '軒軒',
      school: '輔仁大學中文系大三',
      tags: ['#文字轉化力強', '#觀察入微的內容企劃', '#耐心又細心的執行者', '#溫和好溝通', '#願意學也敢挑戰'],
      exp: ['提案競賽全國季軍', 'Coach 行銷策略銀獎', '系刊編輯＋影音企劃'],
      img: 'talent1.jpg'
    },
    {
      name: '軒軒',
      school: '輔仁大學中文系大三',
      tags: ['#文字轉化力強', '#觀察入微的內容企劃', '#耐心又細心的執行者', '#溫和好溝通', '#願意學也敢挑戰'],
      exp: ['提案競賽全國季軍', 'Coach 行銷策略銀獎', '系刊編輯＋影音企劃'],
      img: 'talent1.jpg',
      overlay: true // 第二張有左右滑動手勢圖示
    }
    // 可再加入更多卡片
  ];
  let currentCard = 0;
  function renderTalentCard(idx) {
    const t = talentCardsData[idx];
    const area = document.querySelector('.talent-cards-area');
    area.innerHTML = `
      <div class="talent-card${t.overlay ? ' overlay' : ''}">
        <img src="${t.img}" class="talent-img" alt="${t.name}">
        <div class="talent-info">
          <div class="talent-school">${t.school} ${t.name}</div>
          <div class="talent-tags">${t.tags.map(tag => `<div>${tag}</div>`).join('')}</div>
          <div class="talent-exp-title">實際經驗</div>
          <ul class="talent-exp">${t.exp.map(e => `<li>${e}</li>`).join('')}</ul>
        </div>
        ${t.overlay ? `<div class='swipe-overlay'><div class='swipe-left'>下一位</div><div class='swipe-right'>上一位</div></div>` : ''}
      </div>
    `;
  }
  document.getElementById('card-prev').onclick = function() {
    if (currentCard > 0) {
      currentCard--;
      renderTalentCard(currentCard);
    }
  };
  document.getElementById('card-next').onclick = function() {
    if (currentCard < talentCardsData.length - 1) {
      currentCard++;
      renderTalentCard(currentCard);
    }
  };

  // 學生註冊→履歷填寫
  document.getElementById('student-next').onclick = function() {
    showPage('studentResume');
  };
  // 履歷填寫→履歷進度
  document.getElementById('resume-next').onclick = function() {
    showPage('resumeProgress');
  };
  // 履歷進度→動機填寫
  document.getElementById('resume-motivation').onclick = function() {
    showPage('motivation');
  };
  // 動機填寫→完成
  document.getElementById('motivation-done').onclick = function() {
    showPage('finish');
  };

  // 學生履歷進度→推薦職缺
  document.getElementById('resume-progress-next').onclick = function() {
    showPage('job-cards');
    renderJobCard(0);
    currentJob = 0;
  };

  // 推薦職缺卡片資料與渲染
  const jobCardsData = [
    {
      title: '行銷企劃實習生',
      company: 'A公司',
      tags: ['#影音剪輯', '#社群經營', '#內容行銷'],
      desc: '協助短影音剪輯、社群貼文、素材整理，需細心、具責任感。',
      img: 'job1.jpg'
    },
    {
      title: '社群小編',
      company: 'B新創',
      tags: ['#社群經營', '#文案撰寫'],
      desc: '經營IG、FB，撰寫貼文、互動回覆，需創意與耐心。',
      img: 'job2.jpg'
    }
    // 可再加入更多職缺
  ];
  let currentJob = 0;
  function renderJobCard(idx) {
    const t = jobCardsData[idx];
    const area = document.querySelector('.job-cards-area');
    area.innerHTML = `
      <div class="job-card">
        <img src="${t.img}" class="job-img" alt="${t.title}">
        <div class="job-info">
          <div class="job-title">${t.title}</div>
          <div class="job-company">${t.company}</div>
          <div class="job-tags">${t.tags.map(tag => `<div>${tag}</div>`).join('')}</div>
          <div class="job-desc">${t.desc}</div>
        </div>
      </div>
    `;
  }
  document.getElementById('job-prev').onclick = function() {
    if (currentJob > 0) {
      currentJob--;
      renderJobCard(currentJob);
    }
  };
  document.getElementById('job-next').onclick = function() {
    if (currentJob < jobCardsData.length - 1) {
      currentJob++;
      renderJobCard(currentJob);
    }
  };

  // 自訂 show 事件（for AI對話自動切換）
  const origAdd = Element.prototype.classList.add;
  Element.prototype.classList.add = function(...args) {
    origAdd.apply(this.classList, args);
    if (args.includes('active')) {
      const evt = new Event('show');
      this.dispatchEvent(evt);
    }
  };
}); 