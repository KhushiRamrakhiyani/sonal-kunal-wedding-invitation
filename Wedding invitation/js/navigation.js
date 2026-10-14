/**
 * Navigation, Storybook Mode & Drawer Controller
 */
class NavigationController {
  constructor() {
    this.currentChapterIndex = 0;
    this.sections = Array.from(document.querySelectorAll('.invitation-section'));
    this.totalChapters = this.sections.length;
    this.isStorybookMode = false; // Default to smooth continuous scroll, with easy toggle

    this.progressBar = document.getElementById('scrollProgressBar');
    this.chapterBadge = document.getElementById('headerChapterBadge');
    this.drawer = document.getElementById('navDrawer');
    this.drawerBackdrop = document.getElementById('drawerBackdrop');
    this.modeBtn = document.getElementById('viewModeBtn');
    this.petalsBtn = document.getElementById('petalsToggleBtn');

    // Bottom Storybook Bar elements
    this.prevBtn = document.getElementById('prevChapterBtn');
    this.nextBtn = document.getElementById('nextChapterBtn');
    this.storyCounter = document.getElementById('storyCounter');

    this.chapterNames = [
      'Welcome',
      'The Invitation',
      'Guru Ghar & Mehendi',
      'Sacred Thread',
      'Behrana Sahib',
      'Carnival',
      'Sangeet Night',
      'The Wedding',
      'The Reception',
      'With Love'
    ];

    this.init();
  }

  init() {
    // Mode toggle button
    if (this.modeBtn) {
      this.modeBtn.addEventListener('click', () => this.toggleViewMode());
    }

    // Storybook Prev / Next
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.goToChapter(this.currentChapterIndex - 1));
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.goToChapter(this.currentChapterIndex + 1));
    }

    // Drawer triggers
    const menuToggle = document.getElementById('menuToggleBtn');
    const drawerClose = document.getElementById('drawerCloseBtn');

    if (menuToggle) {
      menuToggle.addEventListener('click', () => this.openDrawer());
    }
    if (drawerClose) {
      drawerClose.addEventListener('click', () => this.closeDrawer());
    }
    if (this.drawerBackdrop) {
      this.drawerBackdrop.addEventListener('click', () => this.closeDrawer());
    }

    // Drawer links
    document.querySelectorAll('.drawer-event-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('data-target');
        const idx = this.sections.findIndex(s => s.id === targetId);
        if (idx !== -1) {
          this.closeDrawer();
          this.goToChapter(idx);
          if (!this.isStorybookMode) {
            const el = document.getElementById(targetId);
            if (el) {
              const yOffset = -70;
              const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
              window.scrollTo({ top: y, behavior: 'smooth' });
            }
          }
        }
      });
    });

    // Keyboard navigation (Arrow keys)
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        if (this.isStorybookMode) this.goToChapter(this.currentChapterIndex + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        if (this.isStorybookMode) this.goToChapter(this.currentChapterIndex - 1);
      }
    });

    // Touch Swipe support for Storybook mode
    let touchStartX = 0;
    let touchEndX = 0;
    window.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    window.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (this.isStorybookMode) {
        if (touchStartX - touchEndX > 50) {
          // Swiped left -> next
          this.goToChapter(this.currentChapterIndex + 1);
        } else if (touchEndX - touchStartX > 50) {
          // Swiped right -> prev
          this.goToChapter(this.currentChapterIndex - 1);
        }
      }
    }, { passive: true });

    // Scroll listener for continuous mode
    window.addEventListener('scroll', () => {
      if (!this.isStorybookMode) {
        this.updateScrollProgress();
        this.detectActiveSectionOnScroll();
      }
    }, { passive: true });

    // Initial state
    this.updateActiveSectionUI();
  }

  toggleViewMode() {
    this.isStorybookMode = !this.isStorybookMode;
    if (this.isStorybookMode) {
      document.body.classList.add('mode-storybook');
      this.modeBtn.setAttribute('title', 'Switch to Continuous Scroll View');
      this.modeBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="8" y1="6" x2="21" y2="6"/>
          <line x1="8" y1="12" x2="21" y2="12"/>
          <line x1="8" y1="18" x2="21" y2="18"/>
          <line x1="3" y1="6" x2="3.01" y2="6"/>
          <line x1="3" y1="12" x2="3.01" y2="12"/>
          <line x1="3" y1="18" x2="3.01" y2="18"/>
        </svg>`;
      this.goToChapter(this.currentChapterIndex);
      window.scrollTo({ top: 0, behavior: 'instant' });
      if (window.showToast) window.showToast('📖 Storybook Card Mode (Swipe/Next to read)');
    } else {
      document.body.classList.remove('mode-storybook');
      this.modeBtn.setAttribute('title', 'Switch to Storybook Card Mode');
      this.modeBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <path d="M7 3v18"/>
        </svg>`;
      // Scroll to current section in continuous view
      const targetEl = this.sections[this.currentChapterIndex];
      if (targetEl) {
        const yOffset = -70;
        const y = targetEl.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
      if (window.showToast) window.showToast('📜 Continuous Scroll Mode');
    }
  }

  goToChapter(index) {
    if (index < 0 || index >= this.totalChapters) return;
    this.currentChapterIndex = index;
    this.updateActiveSectionUI();

    if (this.isStorybookMode) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  updateActiveSectionUI() {
    this.sections.forEach((sec, idx) => {
      if (idx === this.currentChapterIndex) {
        sec.classList.add('is-active');
      } else {
        sec.classList.remove('is-active');
      }
    });

    // Update Header Badge
    if (this.chapterBadge) {
      this.chapterBadge.textContent = `${this.currentChapterIndex + 1}/${this.totalChapters}: ${this.chapterNames[this.currentChapterIndex] || ''}`;
    }

    // Update Storybook Counter & Buttons
    if (this.storyCounter) {
      this.storyCounter.textContent = `${this.currentChapterIndex + 1} / ${this.totalChapters}`;
    }
    if (this.prevBtn) {
      this.prevBtn.disabled = this.currentChapterIndex === 0;
    }
    if (this.nextBtn) {
      this.nextBtn.disabled = this.currentChapterIndex === this.totalChapters - 1;
    }

    // Update Drawer Active Item
    document.querySelectorAll('.drawer-event-item').forEach((item, idx) => {
      if (idx === this.currentChapterIndex) {
        item.classList.add('is-active');
      } else {
        item.classList.remove('is-active');
      }
    });
  }

  updateScrollProgress() {
    const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
    const currentScroll = window.pageYOffset;
    const pct = scrollTotal > 0 ? (currentScroll / scrollTotal) * 100 : 0;
    if (this.progressBar) {
      this.progressBar.style.width = `${pct}%`;
    }
  }

  detectActiveSectionOnScroll() {
    const scrollPos = window.pageYOffset + window.innerHeight * 0.35;
    for (let i = this.sections.length - 1; i >= 0; i--) {
      const sec = this.sections[i];
      if (sec.offsetTop <= scrollPos) {
        if (this.currentChapterIndex !== i) {
          this.currentChapterIndex = i;
          this.updateActiveSectionUI();
        }
        break;
      }
    }
  }

  openDrawer() {
    if (this.drawer) this.drawer.classList.add('is-open');
    if (this.drawerBackdrop) this.drawerBackdrop.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
  }

  closeDrawer() {
    if (this.drawer) this.drawer.classList.remove('is-open');
    if (this.drawerBackdrop) this.drawerBackdrop.classList.remove('is-visible');
    document.body.style.overflow = '';
  }
}

window.NavigationController = NavigationController;
