class SoundEngine {
  private ctx: AudioContext | null = null;
  private muted = false;

  private getContext(): AudioContext | null {
    if (this.muted || typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.muted = muted;
  }

  public isMuted(): boolean {
    return this.muted;
  }

  private playTone(
    freq: number,
    duration: number,
    type: OscillatorType = 'sine',
    volume = 0.12,
    delay = 0
  ) {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(volume, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration + 0.02);
  }

  public playTap() {
    this.playTone(520, 0.07, 'triangle', 0.08);
  }

  public playCoinSpend() {
    this.playTone(660, 0.09, 'sine', 0.11, 0);
    this.playTone(880, 0.14, 'sine', 0.1, 0.06);
  }

  public playCoinRefund() {
    this.playTone(784, 0.08, 'triangle', 0.09, 0);
    this.playTone(587, 0.12, 'triangle', 0.09, 0.06);
  }

  public playBlocked() {
    this.playTone(240, 0.12, 'triangle', 0.1, 0);
    this.playTone(190, 0.16, 'triangle', 0.1, 0.09);
  }

  public playPlotTwist() {
    this.playTone(440, 0.12, 'sawtooth', 0.06, 0);
    this.playTone(554, 0.12, 'sawtooth', 0.06, 0.11);
    this.playTone(392, 0.24, 'triangle', 0.09, 0.22);
  }

  public playSuccess() {
    this.playTone(523.25, 0.11, 'sine', 0.11, 0);
    this.playTone(659.25, 0.11, 'sine', 0.11, 0.08);
    this.playTone(783.99, 0.18, 'sine', 0.12, 0.16);
  }

  public playCelebration() {
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((n, idx) => {
      this.playTone(n, 0.22, 'triangle', 0.11, idx * 0.09);
    });
  }
}

export const soundFX = new SoundEngine();
