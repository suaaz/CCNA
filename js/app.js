/**
 * NetVisual Pro - Main Application Controller
 * Handles navigation, search, modal rendering, daily spotlight, and beginner context
 */

const App = {
  activeTrack: "all",
  activeCcnaDomain: "all",
  activeEncorDomain: "all",
  searchQuery: "",
  bookmarks: JSON.parse(localStorage.getItem("netvisual_bookmarks") || "[]"),
  currentDailyOffset: 0, // 0 = today, -1 = yesterday, etc.
  allTopics: [...CCNA_TOPICS, ...ENCOR_TOPICS],

  /**
   * Initialize App on DOMContentLoaded
   */
  init: function() {
    this.renderDailySpotlight();
    this.renderCcnaTopics();
    this.renderEncorTopics();
    InteractiveTools.renderSimulator("packet-simulator-container");
    InteractiveTools.renderSubnetCalculator("subnet-calculator-container");
    this.setupEventListeners();
    this.updateBookmarkCount();
  },

  /**
   * Setup Global Event Listeners & Keyboard Shortcuts
   */
  setupEventListeners: function() {
    // Search input
    const searchInput = document.getElementById("global-search-input");
    const mobileSearchInput = document.getElementById("mobile-search-input");

    const handleSearch = (val) => {
      this.searchQuery = val.trim().toLowerCase();
      if (searchInput && searchInput.value !== val) searchInput.value = val;
      if (mobileSearchInput && mobileSearchInput.value !== val) mobileSearchInput.value = val;
      this.renderCcnaTopics();
      this.renderEncorTopics();
    };

    searchInput?.addEventListener("input", (e) => handleSearch(e.target.value));
    mobileSearchInput?.addEventListener("input", (e) => handleSearch(e.target.value));

    // Mobile Drawer Toggle
    const mobileBtn = document.getElementById("mobile-menu-toggle-btn");
    const mobileDrawer = document.getElementById("mobile-drawer");
    const hamburgerIcon = document.getElementById("hamburger-icon");
    const closeIcon = document.getElementById("close-icon");

    mobileBtn?.addEventListener("click", () => {
      const isHidden = mobileDrawer.classList.contains("hidden");
      if (isHidden) {
        mobileDrawer.classList.remove("hidden");
        hamburgerIcon.classList.add("hidden");
        closeIcon.classList.remove("hidden");
        mobileSearchInput?.focus();
      } else {
        mobileDrawer.classList.add("hidden");
        hamburgerIcon.classList.remove("hidden");
        closeIcon.classList.add("hidden");
      }
    });

    // Close mobile drawer when clicking any nav link
    document.querySelectorAll(".mobile-nav-link").forEach(link => {
      link.addEventListener("click", () => {
        mobileDrawer?.classList.add("hidden");
        hamburgerIcon?.classList.remove("hidden");
        closeIcon?.classList.add("hidden");
      });
    });

    // Keyboard shortcut: '/' or 'Ctrl+K' focuses search
    window.addEventListener("keydown", (e) => {
      if ((e.key === "/" && document.activeElement !== searchInput && document.activeElement !== mobileSearchInput) || 
          (e.ctrlKey && e.key === "k") || 
          (e.metaKey && e.key === "k")) {
        e.preventDefault();
        searchInput?.focus();
      }
      if (e.key === "Escape") {
        this.closeModal();
      }
    });

    // Modal background click to close
    document.getElementById("topic-modal")?.addEventListener("click", (e) => {
      if (e.target.id === "topic-modal") {
        this.closeModal();
      }
    });
  },

  /**
   * Render Today's Concept Spotlight & Daily Quiz with Beginner-Friendly Expanders
   */
  renderDailySpotlight: function() {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + this.currentDailyOffset);
    const daily = DailyEngine.getTodayConcept(targetDate);

    const container = document.getElementById("daily-spotlight-card");
    if (!container) return;

    // Pick SVG diagram if available
    let diagramSvg = "";
    if (daily.diagramType && NetworkDiagrams[daily.diagramType]) {
      diagramSvg = NetworkDiagrams[daily.diagramType]();
    }

    const badgeClass = daily.track === "CCNA" ? "badge-ccna" : "badge-encor";
    const ctx = daily.deepContext || {};

    container.innerHTML = `
      <div class="relative overflow-hidden rounded-2xl glass-panel-elevated p-6 lg:p-8 border border-sky-500/20 shadow-2xl">
        <!-- Background subtle glow -->
        <div class="absolute -top-24 -right-24 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div class="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div class="flex items-center gap-2">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${badgeClass}">
              <span class="w-2 h-2 rounded-full ${daily.track === 'CCNA' ? 'bg-sky-400' : 'bg-purple-400'} animate-pulse"></span>
              ${daily.track} Spotlight
            </span>
            <span class="text-xs text-slate-400 font-medium">${daily.domain}</span>
          </div>

          <div class="flex items-center gap-2 text-xs">
            <button id="daily-prev-day-btn" class="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition flex items-center gap-1" title="Previous Day">
              ◀ Prev Day
            </button>
            <span class="font-mono text-slate-300 bg-slate-900/80 px-2.5 py-1 rounded border border-slate-800">
              📅 ${daily.currentDate}
            </span>
            <button id="daily-next-day-btn" class="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition flex items-center gap-1" title="Next Day">
              Next Day ▶
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div class="lg:col-span-7 space-y-4">
            <h2 class="text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-tight">
              ${daily.title}
            </h2>
            <p class="text-slate-300 text-sm sm:text-base leading-relaxed">
              ${daily.summary}
            </p>

            <!-- Interactive Action Bar: Deep Context & Beginner Guidance -->
            <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 py-1">
              <button id="daily-toggle-analogy-btn" class="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-md transition flex items-center justify-center gap-2">
                <span>💡</span> 
                <span id="daily-toggle-analogy-text">Explain Like I'm New (Analogy)</span>
                <span id="daily-toggle-icon">▼</span>
              </button>

              <button id="daily-open-context-modal-btn" class="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-300 hover:text-white font-semibold text-xs border border-sky-800/60 transition flex items-center justify-center gap-2 text-center">
                <span>📖</span> Full Context & Jargon Decoder Studio ➔
              </button>
            </div>

            <!-- Inline Expandable Beginner Context Drawer -->
            <div id="daily-inline-analogy-drawer" class="hidden rounded-xl bg-slate-950/90 border border-sky-500/30 p-4 sm:p-5 space-y-3 transition-all">
              <div class="flex items-center gap-2 text-sky-300 font-bold text-sm">
                <span>🌱</span>
                <h4>${ctx.analogyTitle || "Beginner Mental Model"}</h4>
              </div>
              <p class="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line">
                ${ctx.analogy || ctx.whatIsIt}
              </p>
              
              <div class="pt-2 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2">
                <span class="text-slate-400">💡 <strong>Why We Need It:</strong> ${ctx.whyDoWeNeedIt ? ctx.whyDoWeNeedIt.substring(0, 110) + '...' : ''}</span>
                <button id="drawer-deep-dive-btn" class="text-sky-400 hover:text-sky-300 font-semibold underline whitespace-nowrap self-start sm:self-auto sm:ml-2">
                  Read Full Walkthrough ➔
                </button>
              </div>
            </div>

            <div class="p-4 rounded-xl bg-sky-950/40 border border-sky-500/30 flex items-start gap-3">
              <span class="text-xl">💡</span>
              <div>
                <strong class="text-sky-300 text-xs uppercase tracking-wider block font-bold">Key Exam Takeaway:</strong>
                <p class="text-xs sm:text-sm text-slate-200 mt-0.5">${daily.takeaway}</p>
              </div>
            </div>

            <!-- Command of the Day Accordion -->
            <div class="bg-slate-950 rounded-xl p-4 border border-slate-800">
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs uppercase tracking-wider font-bold text-amber-400 flex items-center gap-1.5">
                  ⚡ Cisco Command of the Day:
                </span>
                <span class="text-[11px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  ${daily.commandOfDay.command}
                </span>
              </div>
              <p class="text-xs text-slate-400 mb-2">${daily.commandOfDay.description}</p>
              <pre class="cisco-terminal p-3 rounded text-[11px] text-slate-300 overflow-x-auto"><code>${daily.commandOfDay.sampleOutput}</code></pre>
            </div>
          </div>

          <!-- Right Column: Interactive Diagram or Daily Quiz -->
          <div class="lg:col-span-5 space-y-4">
            <!-- Diagram Container -->
            ${diagramSvg ? `
              <div class="svg-diagram-wrapper p-2 shadow-lg">
                <div class="text-[11px] text-slate-400 px-2 py-1 flex items-center justify-between border-b border-slate-800/80 mb-1">
                  <span>📐 Architectural Vector Blueprint</span>
                  <button id="zoom-diagram-btn" class="text-sky-400 hover:text-sky-300 text-[10px] font-mono flex items-center gap-1">
                    🔍 ZOOM IN
                  </button>
                </div>
                ${diagramSvg}
              </div>
            ` : ''}

            <!-- Daily Quiz Card -->
            <div class="bg-slate-900/90 rounded-xl p-5 border border-slate-800 shadow-md">
              <div class="flex items-center justify-between mb-3">
                <h4 class="text-xs uppercase tracking-wider font-bold text-emerald-400 flex items-center gap-1.5">
                  🎯 Daily Exam Challenge
                </h4>
                <span class="text-[10px] text-slate-400">Multiple Choice</span>
              </div>
              <p class="text-xs sm:text-sm font-medium text-slate-200 mb-3">
                ${daily.quiz.question}
              </p>
              <div class="space-y-2" id="daily-quiz-options">
                ${daily.quiz.options.map((opt, i) => `
                  <button class="w-full text-left p-2.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-xs text-slate-300 border border-slate-800 hover:border-slate-700 transition daily-quiz-btn" data-index="${i}">
                    ${opt}
                  </button>
                `).join('')}
              </div>
              <div id="daily-quiz-result" class="hidden mt-3 p-3 rounded-lg text-xs"></div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Bind Day navigation
    document.getElementById("daily-prev-day-btn")?.addEventListener("click", () => {
      this.currentDailyOffset--;
      this.renderDailySpotlight();
    });
    document.getElementById("daily-next-day-btn")?.addEventListener("click", () => {
      this.currentDailyOffset++;
      this.renderDailySpotlight();
    });

    // Toggle Inline Analogy Drawer
    const analogyBtn = document.getElementById("daily-toggle-analogy-btn");
    const analogyDrawer = document.getElementById("daily-inline-analogy-drawer");
    const toggleIcon = document.getElementById("toggle-icon");
    analogyBtn?.addEventListener("click", () => {
      if (analogyDrawer.classList.contains("hidden")) {
        analogyDrawer.classList.remove("hidden");
        document.getElementById("daily-toggle-icon").textContent = "▲";
      } else {
        analogyDrawer.classList.add("hidden");
        document.getElementById("daily-toggle-icon").textContent = "▼";
      }
    });

    // Open Full Context Modal Buttons
    document.getElementById("daily-open-context-modal-btn")?.addEventListener("click", () => {
      this.openDailyContextModal(daily);
    });
    document.getElementById("drawer-deep-dive-btn")?.addEventListener("click", () => {
      this.openDailyContextModal(daily);
    });
    document.getElementById("zoom-diagram-btn")?.addEventListener("click", () => {
      this.openDailyContextModal(daily);
    });

    // Bind Quiz Option Clicks
    const quizButtons = container.querySelectorAll(".daily-quiz-btn");
    const resultBox = document.getElementById("daily-quiz-result");

    quizButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const selected = parseInt(btn.getAttribute("data-index"), 10);
        quizButtons.forEach(b => b.classList.add("pointer-events-none"));

        if (selected === daily.quiz.correctIndex) {
          btn.classList.add("bg-emerald-950", "border-emerald-500", "text-emerald-300");
          if (resultBox) {
            resultBox.className = "mt-3 p-3 rounded-lg text-xs bg-emerald-950/80 border border-emerald-500/40 text-emerald-200";
            resultBox.innerHTML = `<strong>✅ Correct!</strong> ${daily.quiz.explanation}`;
            resultBox.classList.remove("hidden");
          }
        } else {
          btn.classList.add("bg-red-950", "border-red-500", "text-red-300");
          quizButtons[daily.quiz.correctIndex]?.classList.add("bg-emerald-950/60", "border-emerald-500/60", "text-emerald-300");
          if (resultBox) {
            resultBox.className = "mt-3 p-3 rounded-lg text-xs bg-red-950/80 border border-red-500/40 text-red-200";
            resultBox.innerHTML = `<strong>❌ Incorrect.</strong> ${daily.quiz.explanation}`;
            resultBox.classList.remove("hidden");
          }
        }
      });
    });
  },

  /**
   * Open Dedicated Daily Context & Beginner Breakdown Studio Modal
   */
  openDailyContextModal: function(daily) {
    const modal = document.getElementById("topic-modal");
    const content = document.getElementById("topic-modal-content");
    if (!modal || !content) return;

    const ctx = daily.deepContext || {};
    let diagramSvg = "";
    if (daily.diagramType && NetworkDiagrams[daily.diagramType]) {
      diagramSvg = NetworkDiagrams[daily.diagramType]();
    }

    const badgeClass = daily.track === "CCNA" ? "badge-ccna" : "badge-encor";

    content.innerHTML = `
      <div class="p-4 sm:p-6 md:p-8 modal-enter space-y-6">
        <!-- Header -->
        <div class="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div class="flex items-center gap-2 mb-2">
              <span class="px-3 py-0.5 rounded-full text-xs font-semibold ${badgeClass}">
                ${daily.track} • ${daily.domain}
              </span>
              <span class="text-xs text-sky-400 font-mono">📅 ${daily.currentDate}</span>
              <span class="text-xs bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">
                Beginner-Accessible Guide
              </span>
            </div>
            <h1 class="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              ${daily.title}
            </h1>
            <p class="text-sm sm:text-base text-slate-300 mt-1">
              ${daily.summary}
            </p>
          </div>
          <button id="modal-close-btn" class="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-base">
            ✕
          </button>
        </div>

        <!-- Section 1: The Real-World Analogy (No Prior Experience Required) -->
        <div class="p-5 rounded-xl bg-gradient-to-br from-slate-900 to-slate-950 border border-sky-500/30 shadow-lg">
          <div class="flex items-center gap-2 text-sky-400 font-bold text-base mb-3">
            <span class="text-xl">💡</span>
            <h3>${ctx.analogyTitle || "The Real-World Analogy"}</h3>
          </div>
          <div class="text-xs sm:text-sm text-slate-200 leading-relaxed space-y-2 whitespace-pre-line bg-slate-950/60 p-4 rounded-lg border border-slate-800/80">
            ${ctx.analogy || "A clear mental model to understand this concept."}
          </div>
        </div>

        <!-- Section 2: First-Principles Breakdown -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
            <h4 class="text-xs uppercase tracking-wider font-bold text-sky-400 mb-2 flex items-center gap-1.5">
              <span>🎯</span> What Is It (In Simple Words)?
            </h4>
            <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
              ${ctx.whatIsIt || daily.summary}
            </p>
          </div>
          <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
            <h4 class="text-xs uppercase tracking-wider font-bold text-emerald-400 mb-2 flex items-center gap-1.5">
              <span>❓</span> Why Was It Invented?
            </h4>
            <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
              ${ctx.whyDoWeNeedIt || "Solves scalability and isolation challenges in network designs."}
            </p>
          </div>
        </div>

        <!-- Scalable Diagram Section -->
        ${diagramSvg ? `
          <div class="svg-diagram-wrapper shadow-2xl p-3 border border-slate-800">
            <div class="flex items-center justify-between text-xs text-slate-400 px-2 py-1 border-b border-slate-800 mb-2">
              <span class="font-bold text-sky-400">📐 High-Resolution Architectural Blueprint</span>
              <span class="text-[10px] font-mono text-slate-500">VECTOR SVG</span>
            </div>
            ${diagramSvg}
          </div>
        ` : ''}

        <!-- Section 3: Step-by-Step Under The Hood -->
        ${ctx.howItWorksStepByStep ? `
          <div class="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <h4 class="text-xs uppercase tracking-wider font-bold text-amber-400 flex items-center gap-1.5">
              <span>⚙️</span> How It Works Under The Hood (Step-by-Step)
            </h4>
            <div class="space-y-2 text-xs sm:text-sm text-slate-300">
              ${ctx.howItWorksStepByStep.map(step => `
                <div class="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 flex items-start gap-2.5">
                  <span class="text-sky-400 font-bold">➜</span>
                  <span>${step}</span>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Section 4: Jargon Decoder / Glossary -->
        ${ctx.jargonGlossary ? `
          <div class="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <h4 class="text-xs uppercase tracking-wider font-bold text-purple-400 flex items-center gap-1.5">
              <span>📖</span> Network Jargon Decoded (For Beginners)
            </h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              ${ctx.jargonGlossary.map(j => `
                <div class="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <strong class="text-sky-300 font-semibold block mb-1 font-mono">${j.term}</strong>
                  <p class="text-slate-400 leading-relaxed">${j.def}</p>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Section 5: What Breaks If Misconfigured? -->
        <div class="p-4 rounded-xl bg-red-950/30 border border-red-500/30 text-xs sm:text-sm">
          <h4 class="text-red-400 font-bold uppercase tracking-wider text-xs mb-1.5 flex items-center gap-1.5">
            <span>⚠️</span> Real-World Impact: What Happens If Misconfigured?
          </h4>
          <p class="text-slate-200 leading-relaxed">
            ${ctx.whatHappensIfWrong || "Misconfiguration leads to packet loss, broadcast loops, or degraded latency."}
          </p>
        </div>

        <!-- Section 6: Cisco Command & Verification Output -->
        <div class="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-xs uppercase tracking-wider font-bold text-sky-400 font-mono">
              💻 Cisco IOS Console Verification:
            </span>
            <span class="text-[11px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
              ${daily.commandOfDay.command}
            </span>
          </div>
          <pre class="cisco-terminal p-3 rounded text-[11px] text-slate-300 overflow-x-auto"><code>${daily.commandOfDay.sampleOutput}</code></pre>
        </div>

        <!-- Bottom Close Button -->
        <div class="pt-4 border-t border-slate-800 flex justify-end">
          <button id="modal-done-btn" class="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs transition">
            Close Deep-Dive Studio
          </button>
        </div>
      </div>
    `;

    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";

    // Bind Close Buttons
    document.getElementById("modal-close-btn")?.addEventListener("click", () => this.closeModal());
    document.getElementById("modal-done-btn")?.addEventListener("click", () => this.closeModal());
  },

  /**
   * Filter and render CCNA Topics
   */
  renderCcnaTopics: function() {
    const container = document.getElementById("ccna-cards-grid");
    if (!container) return;

    let topics = CCNA_TOPICS;

    if (this.activeCcnaDomain !== "all") {
      topics = topics.filter(t => t.domain === this.activeCcnaDomain);
    }

    if (this.searchQuery) {
      topics = topics.filter(t => 
        t.title.toLowerCase().includes(this.searchQuery) ||
        t.subtitle.toLowerCase().includes(this.searchQuery) ||
        t.summary.toLowerCase().includes(this.searchQuery) ||
        t.tags.some(tag => tag.toLowerCase().includes(this.searchQuery))
      );
    }

    if (topics.length === 0) {
      container.innerHTML = `
        <div class="col-span-full py-12 text-center text-slate-400 glass-card rounded-xl">
          <p class="text-base font-semibold">No CCNA topics match your filter or search query.</p>
          <p class="text-xs text-slate-500 mt-1">Try resetting the domain filter or search bar.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = topics.map(t => this.renderTopicCard(t)).join('');
    this.attachCardListeners(container);
  },

  /**
   * Filter and render ENCOR Topics
   */
  renderEncorTopics: function() {
    const container = document.getElementById("encor-cards-grid");
    if (!container) return;

    let topics = ENCOR_TOPICS;

    if (this.activeEncorDomain !== "all") {
      topics = topics.filter(t => t.domain === this.activeEncorDomain);
    }

    if (this.searchQuery) {
      topics = topics.filter(t => 
        t.title.toLowerCase().includes(this.searchQuery) ||
        t.subtitle.toLowerCase().includes(this.searchQuery) ||
        t.summary.toLowerCase().includes(this.searchQuery) ||
        t.tags.some(tag => tag.toLowerCase().includes(this.searchQuery))
      );
    }

    if (topics.length === 0) {
      container.innerHTML = `
        <div class="col-span-full py-12 text-center text-slate-400 glass-card rounded-xl">
          <p class="text-base font-semibold">No ENCOR topics match your filter or search query.</p>
          <p class="text-xs text-slate-500 mt-1">Try resetting the domain filter or search bar.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = topics.map(t => this.renderTopicCard(t)).join('');
    this.attachCardListeners(container);
  },

  /**
   * Render individual Topic Card HTML
   */
  renderTopicCard: function(topic) {
    const isBookmarked = this.bookmarks.includes(topic.id);
    const badgeClass = topic.track === "CCNA" ? "badge-ccna" : "badge-encor";

    return `
      <div class="glass-card rounded-xl p-5 border border-slate-800 flex flex-col justify-between cursor-pointer group" data-topic-id="${topic.id}">
        <div>
          <div class="flex items-center justify-between gap-2 mb-3">
            <span class="text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${badgeClass}">
              ${topic.track} • ${topic.domain}
            </span>
            <button class="bookmark-btn text-slate-500 hover:text-amber-400 transition text-sm p-1" data-id="${topic.id}" title="${isBookmarked ? 'Remove Bookmark' : 'Save for Review'}">
              ${isBookmarked ? '⭐' : '☆'}
            </button>
          </div>

          <h3 class="text-base font-bold text-white group-hover:text-sky-300 transition-colors line-clamp-2 mb-1">
            ${topic.title}
          </h3>
          <p class="text-xs text-sky-400/90 font-medium mb-2 line-clamp-1">
            ${topic.subtitle}
          </p>
          <p class="text-xs text-slate-400 leading-relaxed line-clamp-3 mb-4">
            ${topic.summary}
          </p>
        </div>

        <div>
          <div class="flex flex-wrap gap-1 mb-3">
            ${topic.tags.slice(0, 3).map(tag => `
              <span class="text-[10px] bg-slate-900 text-slate-400 px-2 py-0.5 rounded font-mono border border-slate-800/80">
                #${tag}
              </span>
            `).join('')}
          </div>

          <div class="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs">
            <span class="text-slate-500 text-[11px]">${topic.readingTime || '10 min read'}</span>
            <span class="text-sky-400 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
              Read Deep-Dive ➔
            </span>
          </div>
        </div>
      </div>
    `;
  },

  /**
   * Attach card open and bookmark click listeners
   */
  attachCardListeners: function(container) {
    container.querySelectorAll(".glass-card").forEach(card => {
      card.addEventListener("click", (e) => {
        if (e.target.closest(".bookmark-btn")) return;
        const topicId = card.getAttribute("data-topic-id");
        this.openTopicModal(topicId);
      });
    });

    container.querySelectorAll(".bookmark-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = btn.getAttribute("data-id");
        this.toggleBookmark(id);
      });
    });
  },

  /**
   * Toggle Bookmark Status
   */
  toggleBookmark: function(topicId) {
    if (this.bookmarks.includes(topicId)) {
      this.bookmarks = this.bookmarks.filter(b => b !== topicId);
    } else {
      this.bookmarks.push(topicId);
    }
    localStorage.setItem("netvisual_bookmarks", JSON.stringify(this.bookmarks));
    this.updateBookmarkCount();
    this.renderCcnaTopics();
    this.renderEncorTopics();
  },

  /**
   * Update Bookmarks Pill Badge
   */
  updateBookmarkCount: function() {
    const el = document.getElementById("bookmark-count-badge");
    const mobileEl = document.getElementById("mobile-bookmark-count-badge");
    if (el) el.textContent = this.bookmarks.length;
    if (mobileEl) mobileEl.textContent = this.bookmarks.length;
  },

  /**
   * Open Topic Reader Modal
   */
  openTopicModal: function(topicId) {
    const topic = this.allTopics.find(t => t.id === topicId);
    if (!topic) return;

    const modal = document.getElementById("topic-modal");
    const content = document.getElementById("topic-modal-content");
    if (!modal || !content) return;

    let diagramHtml = "";
    if (topic.diagramType && NetworkDiagrams[topic.diagramType]) {
      diagramHtml = `
        <div class="my-6">
          <div class="svg-diagram-wrapper shadow-2xl p-2 border border-slate-800">
            <div class="flex items-center justify-between text-xs text-slate-400 px-3 py-2 border-b border-slate-800/80 mb-2">
              <span class="font-bold text-sky-400">📐 Blueprint Illustration</span>
              <span class="font-mono text-[10px]">SCALABLE VECTOR GRAPHIC</span>
            </div>
            ${NetworkDiagrams[topic.diagramType]()}
          </div>
        </div>
      `;
    }

    const badgeClass = topic.track === "CCNA" ? "badge-ccna" : "badge-encor";
    const isBookmarked = this.bookmarks.includes(topic.id);

    content.innerHTML = `
      <div class="p-4 sm:p-6 md:p-8 modal-enter">
        <div class="flex items-start justify-between gap-4 mb-4 pb-4 border-b border-slate-800">
          <div>
            <div class="flex items-center gap-2 mb-2">
              <span class="px-3 py-0.5 rounded-full text-xs font-semibold ${badgeClass}">
                ${topic.track} • ${topic.domain}
              </span>
              <span class="text-xs text-slate-400 font-mono">${topic.readingTime}</span>
            </div>
            <h1 class="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              ${topic.title}
            </h1>
            <p class="text-sm sm:text-base text-sky-400 mt-1">
              ${topic.subtitle}
            </p>
          </div>
          <div class="flex items-center gap-2">
            <button id="modal-bookmark-btn" class="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-base" title="Toggle Bookmark">
              ${isBookmarked ? '⭐' : '☆'}
            </button>
            <button id="modal-close-btn" class="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-base">
              ✕
            </button>
          </div>
        </div>

        <!-- Render Scalable Diagram if available -->
        ${diagramHtml}

        <!-- Topic Deep Dive Content -->
        <div class="prose prose-invert max-w-none text-slate-300 text-sm sm:text-base leading-relaxed space-y-4">
          ${topic.content}
        </div>

        <!-- Tags and Bottom Bar -->
        <div class="mt-8 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div class="flex items-center gap-1.5">
            <span class="text-slate-500">Exam Domains:</span>
            ${topic.tags.map(t => `<span class="bg-slate-900 text-slate-400 px-2 py-0.5 rounded border border-slate-800">#${t}</span>`).join(' ')}
          </div>
          <button id="modal-done-btn" class="px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold transition">
            Close Deep-Dive
          </button>
        </div>
      </div>
    `;

    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";

    // Bind Close Buttons
    document.getElementById("modal-close-btn")?.addEventListener("click", () => this.closeModal());
    document.getElementById("modal-done-btn")?.addEventListener("click", () => this.closeModal());
    document.getElementById("modal-bookmark-btn")?.addEventListener("click", () => {
      this.toggleBookmark(topic.id);
      this.openTopicModal(topic.id);
    });
  },

  /**
   * Close Reader Modal
   */
  closeModal: function() {
    const modal = document.getElementById("topic-modal");
    if (modal) {
      modal.classList.add("hidden");
      document.body.style.overflow = "auto";
    }
  },

  /**
   * Filter CCNA by Domain
   */
  filterCcnaDomain: function(domain) {
    this.activeCcnaDomain = domain;
    document.querySelectorAll(".ccna-filter-btn").forEach(btn => {
      if (btn.getAttribute("data-domain") === domain) {
        btn.classList.add("bg-sky-600", "text-white");
        btn.classList.remove("bg-slate-900", "text-slate-400");
      } else {
        btn.classList.remove("bg-sky-600", "text-white");
        btn.classList.add("bg-slate-900", "text-slate-400");
      }
    });
    this.renderCcnaTopics();
  },

  /**
   * Filter ENCOR by Domain
   */
  filterEncorDomain: function(domain) {
    this.activeEncorDomain = domain;
    document.querySelectorAll(".encor-filter-btn").forEach(btn => {
      if (btn.getAttribute("data-domain") === domain) {
        btn.classList.add("bg-purple-600", "text-white");
        btn.classList.remove("bg-slate-900", "text-slate-400");
      } else {
        btn.classList.remove("bg-purple-600", "text-white");
        btn.classList.add("bg-slate-900", "text-slate-400");
      }
    });
    this.renderEncorTopics();
  }
};

// Global Exposure for HTML inline handlers
window.App = App;

// Bootstrap on Load
document.addEventListener("DOMContentLoaded", () => {
  App.init();
});
