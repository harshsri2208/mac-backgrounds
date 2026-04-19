export class ProceduralAudio {
  ctx: AudioContext | null = null;
  master: GainNode | null = null;
  nodes: AudioNode[] = [];

  init() {
    if (this.ctx) return;
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    
    this.ctx = new AudioContextClass();
    this.master = this.ctx.createGain();
    this.master.gain.value = 0.5; // Default subtle volume
    this.master.connect(this.ctx.destination);
  }

  stop() {
    this.nodes.forEach(n => {
      try { (n as any).stop?.(); } catch (e) {}
      n.disconnect();
    });
    this.nodes = [];
  }

  setVolume(val: number) {
    if (!this.ctx || !this.master) return;
    this.master.gain.setTargetAtTime(val, this.ctx.currentTime, 0.1);
  }

  play(theme: string) {
    this.init();
    if (!this.ctx || !this.master) return;
    
    this.stop();
    if (this.ctx.state === 'suspended') this.ctx.resume();

    if (theme === 'wind') this.playWind();
    else if (theme === 'space') this.playSpace();
    else if (theme === 'bubbles') this.playBubbles();
    else if (theme === 'fire') this.playFire();
  }

  playWind() {
    if (!this.ctx || !this.master) return;
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 250;

    const lfo = this.ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 0.1;
    
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.value = 150;
    
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    noise.connect(filter);
    filter.connect(this.master);
    
    noise.start(); 
    lfo.start();
    this.nodes.push(noise, filter, lfo, lfoGain);
  }

  playSpace() {
    if (!this.ctx || !this.master) return;
    const createDrone = (freq: number, modRate: number) => {
      if (!this.ctx || !this.master) return;
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = freq;

      const lfo = this.ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.value = modRate;

      const lfoGain = this.ctx.createGain();
      lfoGain.gain.value = freq * 0.05;
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);

      const ampLfo = this.ctx.createOscillator();
      ampLfo.type = 'sine';
      ampLfo.frequency.value = modRate * 0.8;
      
      const ampGain = this.ctx.createGain();
      ampLfo.connect(ampGain.gain);
      ampGain.gain.value = 0.2; // base volume

      osc.connect(ampGain);
      ampGain.connect(this.master!);

      osc.start(); lfo.start(); ampLfo.start();
      this.nodes.push(osc, lfo, lfoGain, ampLfo, ampGain);
    };

    createDrone(50, 0.05);
    createDrone(70, 0.03);
    createDrone(40, 0.07);
  }

  playBubbles() {
    if (!this.ctx || !this.master) return;
    const interval = window.setInterval(() => {
      if (!this.ctx || !this.master || Math.random() > 0.4) return;
      
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      
      const startPitch = 300 + Math.random() * 200;
      const endPitch = 800 + Math.random() * 400;
      osc.frequency.setValueAtTime(startPitch, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(endPitch, this.ctx.currentTime + 0.1);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.3, this.ctx.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);

      osc.connect(gain);
      gain.connect(this.master);
      
      osc.start(this.ctx.currentTime);
      osc.stop(this.ctx.currentTime + 0.15);
    }, 250);

    const dummyNode = this.ctx.createGain();
    dummyNode.connect(this.master);
    this.nodes.push(dummyNode);
    (dummyNode as any).stop = () => clearInterval(interval);
  }

  playFire() {
    if (!this.ctx || !this.master) return;
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0;
    
    // Approximate brown noise
    for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = data[i];
        data[i] *= 3.5; // Compensate for volume drop
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 150;

    noise.connect(filter);
    filter.connect(this.master);
    noise.start();
    this.nodes.push(noise, filter);

    // Crackles
    const interval = window.setInterval(() => {
      if (!this.ctx || !this.master || Math.random() > 0.3) return;
      const osc = this.ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(3000 + Math.random()*2000, this.ctx.currentTime);
      
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.05, this.ctx.currentTime + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.master);
      
      osc.start(this.ctx.currentTime);
      osc.stop(this.ctx.currentTime + 0.06);
    }, 150);

    const dummyNode = this.ctx.createGain();
    dummyNode.connect(this.master);
    this.nodes.push(dummyNode);
    (dummyNode as any).stop = () => clearInterval(interval);
  }
}

export const audioEngine = new ProceduralAudio();
