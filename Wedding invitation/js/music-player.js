/**
 * Luxury Wedding Audio Engine
 * Combines an ambient audio file player with an authentic synthesized
 * Indian wedding Shehnai/Sitar & Tanpura Raag generator via Web Audio API.
 */
class WeddingMusicPlayer {
  constructor() {
    this.audioElement = new Audio();
    // Support MP4 audio soundtrack from reference video or custom MP3
    this.audioElement.src = 'assets/audio/wedding-ambient.mp4';
    this.audioElement.loop = true;
    this.audioElement.preload = 'auto';

    this.isPlaying = false;
    this.isMuted = false;
    this.audioContext = null;
    this.synthOscillators = [];
    this.synthInterval = null;
    this.isUsingSynth = false;

    // Raga Yaman / Bilawal notes frequency scale (Sa, Re, Ga, Ma, Pa, Dha, Ni, Sa')
    // Base pitch C4 (261.63 Hz)
    this.ragaFrequencies = [
      261.63, // Sa
      293.66, // Re
      329.63, // Ga
      369.99, // Tivra Ma
      392.00, // Pa
      440.00, // Dha
      493.88, // Ni
      523.25, // Sa'
      587.33, // Re'
      659.25  // Ga'
    ];

    this.button = document.getElementById('musicToggleBtn');
    this.init();
  }

  init() {
    if (this.button) {
      this.button.addEventListener('click', () => this.togglePlay());
    }

    // Audio element error handler -> fallback to Web Audio Synth
    this.audioElement.addEventListener('error', () => {
      // Audio file not present; Web Audio synth will handle playback
      this.isUsingSynth = true;
    });

    this.audioElement.addEventListener('canplaythrough', () => {
      this.isUsingSynth = false;
    });
  }

  initSynth() {
    if (!this.audioContext) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioContext = new AudioContext();
    }
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }

  playSynthNote(freq, duration = 2.2, type = 'sine', gainVal = 0.08) {
    if (!this.audioContext || this.isMuted) return;

    try {
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();

      // Harmonics for warm acoustic sound
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.audioContext.currentTime);

      // Gentle attack and slow decay like a plucked sitar / shehnai breath
      gain.gain.setValueAtTime(0.0001, this.audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(gainVal, this.audioContext.currentTime + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.audioContext.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.audioContext.destination);

      osc.start();
      osc.stop(this.audioContext.currentTime + duration);
    } catch (e) {
      console.warn('Audio note play error:', e);
    }
  }

  startSynthAmbient() {
    this.initSynth();
    if (!this.audioContext) return;

    // Tanpura Drone (Continuous Root C4 and Pa G4)
    const playTanpura = () => {
      if (!this.isPlaying) return;
      this.playSynthNote(130.81, 4.0, 'triangle', 0.05); // Low Sa
      this.playSynthNote(196.00, 3.8, 'sine', 0.04);     // Pa
      this.playSynthNote(261.63, 3.5, 'sine', 0.03);     // Sa
    };

    playTanpura();
    this.tanpuraInterval = setInterval(playTanpura, 3600);

    // Shehnai / Sitar melodic motifs (traditional joyful wedding melody)
    const melodyPattern = [0, 2, 4, 3, 4, 6, 7, 6, 4, 2, 1, 0, 4, 7, 9, 7];
    let noteIdx = 0;

    this.synthInterval = setInterval(() => {
      if (!this.isPlaying) return;
      const freq = this.ragaFrequencies[melodyPattern[noteIdx % melodyPattern.length]];
      this.playSynthNote(freq, 1.8, 'sine', 0.07);
      noteIdx++;
    }, 1200);
  }

  stopSynthAmbient() {
    if (this.synthInterval) clearInterval(this.synthInterval);
    if (this.tanpuraInterval) clearInterval(this.tanpuraInterval);
  }

  async play() {
    this.isPlaying = true;
    this.updateUI();

    // Try playing MP3 first
    try {
      await this.audioElement.play();
      this.isUsingSynth = false;
    } catch (err) {
      // Autoplay or missing file: seamlessly start ambient synth
      this.isUsingSynth = true;
      this.startSynthAmbient();
    }
  }

  pause() {
    this.isPlaying = false;
    this.updateUI();

    this.audioElement.pause();
    this.stopSynthAmbient();
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  updateUI() {
    if (!this.button) return;
    if (this.isPlaying) {
      this.button.classList.add('is-playing');
      this.button.setAttribute('aria-label', 'Pause Wedding Music');
      this.button.setAttribute('title', 'Pause Wedding Music');
    } else {
      this.button.classList.remove('is-playing');
      this.button.setAttribute('aria-label', 'Play Wedding Music');
      this.button.setAttribute('title', 'Play Wedding Music');
    }
  }
}

window.WeddingMusicPlayer = WeddingMusicPlayer;
