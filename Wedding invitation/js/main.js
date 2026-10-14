/**
 * Kunal Weds Sonal — Interactive Wedding Invitation Application
 * Main Entry Point
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Toast Notification Utility
  const toastEl = document.getElementById('toastNotice');
  let toastTimer = null;

  window.showToast = function(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('is-show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.remove('is-show');
    }, 3200);
  };

  // 2. Initialize Drifting Petals Canvas Engine
  let petalsEngine = null;
  if (window.PetalsCanvasEngine) {
    petalsEngine = new window.PetalsCanvasEngine('petalsCanvas');
  }

  const petalsToggleBtn = document.getElementById('petalsToggleBtn');
  if (petalsToggleBtn && petalsEngine) {
    petalsToggleBtn.addEventListener('click', () => {
      const active = petalsEngine.toggle();
      petalsToggleBtn.setAttribute('title', active ? 'Pause Petal Shower' : 'Start Petal Shower');
      window.showToast(active ? '🌸 Petal shower active' : 'Petal shower paused');
    });
  }

  // 3. Initialize Music Player Engine
  let musicPlayer = null;
  if (window.WeddingMusicPlayer) {
    musicPlayer = new window.WeddingMusicPlayer();
    window.weddingMusicPlayer = musicPlayer;
  }

  // 4. Initialize Navigation Controller
  let navCtrl = null;
  if (window.NavigationController) {
    navCtrl = new window.NavigationController();
    window.navController = navCtrl;
  }

  // 5. Enter Invitation Button Handler
  const enterBtn = document.getElementById('enterInvitationBtn');
  if (enterBtn) {
    enterBtn.addEventListener('click', (e) => {
      e.preventDefault();

      // Start music on first explicit user interaction
      if (musicPlayer && !musicPlayer.isPlaying) {
        musicPlayer.play();
      }

      // If in Storybook Mode, advance to chapter 1 (Page 2)
      if (navCtrl && navCtrl.isStorybookMode) {
        navCtrl.goToChapter(1);
      } else {
        // Continuous scroll: smoothly scroll to Page 2
        const targetSection = document.getElementById('section-invitation');
        if (targetSection) {
          const yOffset = -70;
          const y = targetSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
    });
  }

  // 6. Check for uploaded custom logo file
  const testLogoImg = new Image();
  testLogoImg.src = 'assets/logo/sk-monogram.png';
  testLogoImg.onload = () => {
    // If the user placed a custom PNG logo, update all monogram instances
    document.querySelectorAll('.monogram-logo').forEach(img => {
      img.src = 'assets/logo/sk-monogram.png';
    });
    document.querySelectorAll('.header-logo-icon').forEach(img => {
      img.src = 'assets/logo/sk-monogram.png';
    });
  };

  // 7. Share Action Listeners
  document.querySelectorAll('.btn-share-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (window.WeddingShare) window.WeddingShare.share();
    });
  });

  document.querySelectorAll('.btn-whatsapp-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (window.WeddingShare) window.WeddingShare.shareWhatsApp();
    });
  });

  document.querySelectorAll('.btn-copylink-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (window.WeddingShare) window.WeddingShare.copyLink();
    });
  });

  // 8. Calendar Action Listeners
  document.querySelectorAll('.btn-calendar-ics').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (window.WeddingCalendar) window.WeddingCalendar.downloadICS();
    });
  });

  document.querySelectorAll('.btn-calendar-google').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (window.WeddingCalendar) window.WeddingCalendar.openGoogleCalendar();
    });
  });

  console.log('Kunal Weds Sonal — Wedding Invitation Website initialized successfully.');
});
