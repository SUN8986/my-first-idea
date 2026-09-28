/**
 * My First Idea (내 첫 번째 아이디어) - Interactive Logic
 * Blue & Sapphire Theme Edition
 */

document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const card = document.getElementById("idea-card");
  const cardContainer = document.getElementById("card-wrapper");
  const mainSentence = document.getElementById("main-sentence");
  const btnSparkle = document.getElementById("btn-sparkle");
  const btnMemoToggle = document.getElementById("btn-memo-toggle");
  const btnCopy = document.getElementById("btn-copy");
  const ideaDrawer = document.getElementById("idea-drawer");
  const userIdeaInput = document.getElementById("user-idea-input");
  const charCounter = document.getElementById("char-counter");
  const btnSaveIdea = document.getElementById("btn-save-idea");
  const savedIdeasContainer = document.getElementById("saved-ideas-container");
  const toast = document.getElementById("toast");
  const inspirationText = document.getElementById("inspiration-text");
  const canvas = document.getElementById("ambient-canvas");
  const particlesOverlay = document.getElementById("particles-overlay");

  // Inspiring Quotes Array (Themed around clear vision, blue skies, and boundless possibilities)
  const inspirations = [
    "푸른 바다처럼 끝없는 상상이 이 순간 시작되었습니다.",
    "모든 위대한 발명은 처음에 그저 엉뚱한 상상이었습니다.",
    "첫 걸음은 언제나 두렵지만, 가장 찬란한 순간입니다.",
    "당신의 아이디어는 푸른 창공을 비추는 고유한 빛입니다.",
    "상상할 수 있다면 이미 실현의 절반에 다가선 것입니다.",
    "작은 스파크 하나가 거대한 변화의 물결을 만듭니다.",
    "오늘 떠올린 생각이 내일의 세상을 푸르게 바꿉니다."
  ];
  let quoteIndex = 0;

  /* ==========================================================================
     1. Ambient Canvas Particle Network (Blue / Cyan Theme)
     ========================================================================== */
  const ctx = canvas.getContext("2d");
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = Math.min(Math.floor((width * height) / 16000), 80);
  const particles = [];

  class AmbientParticle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2.2 + 0.8;
      this.speedX = (Math.random() - 0.5) * 0.35;
      this.speedY = (Math.random() - 0.5) * 0.35;
      this.opacity = Math.random() * 0.55 + 0.25;
      this.baseOpacity = this.opacity;
      this.pulseSpeed = Math.random() * 0.02 + 0.008;
      // Curated blue and cyan palette
      const palette = ["#38bdf8", "#60a5fa", "#2563eb", "#93c5fd", "#e0f2fe", "#00f2fe"];
      this.color = palette[Math.floor(Math.random() * palette.length)];
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x < 0 || this.x > width) this.speedX *= -1;
      if (this.y < 0 || this.y > height) this.speedY *= -1;

      // Subtle breathing opacity
      this.opacity = this.baseOpacity + Math.sin(Date.now() * this.pulseSpeed) * 0.18;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = Math.max(0.12, Math.min(1, this.opacity));
      ctx.shadowBlur = 14;
      ctx.shadowColor = this.color;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new AmbientParticle());
  }

  function renderAmbient() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      // Connecting subtle glowing lines between nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = "rgba(56, 189, 248, 0.1)";
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(renderAmbient);
  }
  renderAmbient();

  /* ==========================================================================
     2. 3D Card Interactive Tilt Effect
     ========================================================================== */
  if (window.matchMedia("(pointer: fine)").matches) {
    document.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) / (window.innerWidth / 2);
      const deltaY = (e.clientY - centerY) / (window.innerHeight / 2);

      const maxTilt = 8; // degrees
      const tiltX = -deltaY * maxTilt;
      const tiltY = deltaX * maxTilt;

      card.style.transform = `perspective(1200px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg)`;
    });

    document.addEventListener("mouseleave", () => {
      card.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg)`;
    });
  }

  /* ==========================================================================
     3. Micro Particle Spark Burst (Blue & Cyan Theme)
     ========================================================================== */
  function createBurst(x, y, count = 26) {
    const colors = ["#38bdf8", "#60a5fa", "#2563eb", "#93c5fd", "#00f2fe", "#ffffff", "#1d4ed8"];
    for (let i = 0; i < count; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";

      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.6;
      const distance = Math.random() * 95 + 45;
      const dx = `${Math.cos(angle) * distance}px`;
      const dy = `${Math.sin(angle) * distance}px`;

      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.setProperty("--dx", dx);
      particle.style.setProperty("--dy", dy);
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      particle.style.boxShadow = `0 0 12px ${particle.style.backgroundColor}`;

      particlesOverlay.appendChild(particle);
      setTimeout(() => particle.remove(), 900);
    }
  }

  /* ==========================================================================
     4. Toast Notification
     ========================================================================== */
  let toastTimer = null;
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 3200);
  }

  /* ==========================================================================
     5. Sparkle Button: Inspiring Quote Generator & Burst
     ========================================================================== */
  btnSparkle.addEventListener("click", (e) => {
    const rect = btnSparkle.getBoundingClientRect();
    createBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 30);

    // Fade out and swap quote
    inspirationText.style.opacity = "0";
    setTimeout(() => {
      quoteIndex = (quoteIndex + 1) % inspirations.length;
      inspirationText.textContent = inspirations[quoteIndex];
      inspirationText.style.opacity = "1";
    }, 200);

    showToast("푸른 영감의 메시지가 전해졌습니다! 🌊✨");
  });

  // Clicking on main text also triggers spark
  mainSentence.addEventListener("click", (e) => {
    createBurst(e.clientX, e.clientY, 24);
    showToast("✨ '내 첫 번째 아이디어'가 푸르게 빛납니다!");
  });

  /* ==========================================================================
     6. Copy Button
     ========================================================================== */
  btnCopy.addEventListener("click", async (e) => {
    const textToCopy = "내 첫 번째 아이디어";
    try {
      await navigator.clipboard.writeText(textToCopy);
      const rect = btnCopy.getBoundingClientRect();
      createBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 18);
      showToast("📋 '내 첫 번째 아이디어'가 클립보드에 복사되었습니다!");
    } catch (err) {
      // Fallback
      const textArea = document.createElement("textarea");
      textArea.value = textToCopy;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      showToast("📋 '내 첫 번째 아이디어'가 복사되었습니다!");
    }
  });

  /* ==========================================================================
     7. Memo Drawer & Local Storage Storage
     ========================================================================== */
  const STORAGE_KEY = "my_first_ideas_records";

  function loadIdeas() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function saveIdeasToStorage(ideas) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ideas));
    } catch (e) {
      console.warn("LocalStorage unavailable", e);
    }
  }

  function renderSavedIdeas() {
    const ideas = loadIdeas();
    savedIdeasContainer.innerHTML = "";

    if (ideas.length === 0) {
      return;
    }

    ideas.forEach((item, index) => {
      const cardEl = document.createElement("div");
      cardEl.className = "saved-idea-card";

      const textEl = document.createElement("div");
      textEl.className = "saved-idea-text";
      textEl.textContent = item.text;

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "delete-idea-btn";
      deleteBtn.innerHTML = "×";
      deleteBtn.title = "삭제";
      deleteBtn.setAttribute("aria-label", "아이디어 삭제");
      deleteBtn.addEventListener("click", () => {
        deleteIdea(index);
      });

      cardEl.appendChild(textEl);
      cardEl.appendChild(deleteBtn);
      savedIdeasContainer.appendChild(cardEl);
    });
  }

  function deleteIdea(index) {
    const ideas = loadIdeas();
    ideas.splice(index, 1);
    saveIdeasToStorage(ideas);
    renderSavedIdeas();
    showToast("아이디어가 삭제되었습니다.");
  }

  btnMemoToggle.addEventListener("click", () => {
    const isHidden = ideaDrawer.classList.contains("hidden");
    if (isHidden) {
      ideaDrawer.classList.remove("hidden");
      userIdeaInput.focus();
      btnMemoToggle.querySelector(".btn-label").textContent = "기록함 닫기";
      renderSavedIdeas();
    } else {
      ideaDrawer.classList.add("hidden");
      btnMemoToggle.querySelector(".btn-label").textContent = "생각 기록하기";
    }
  });

  userIdeaInput.addEventListener("input", () => {
    charCounter.textContent = `${userIdeaInput.value.length} / 300`;
  });

  btnSaveIdea.addEventListener("click", () => {
    const text = userIdeaInput.value.trim();
    if (!text) {
      showToast("내용을 입력해주세요!");
      userIdeaInput.focus();
      return;
    }

    const ideas = loadIdeas();
    ideas.unshift({
      text,
      date: new Date().toISOString()
    });
    saveIdeasToStorage(ideas);

    userIdeaInput.value = "";
    charCounter.textContent = "0 / 300";
    renderSavedIdeas();
    showToast("✨ 나만의 아이디어가 안전하게 기록되었습니다!");
  });
});
