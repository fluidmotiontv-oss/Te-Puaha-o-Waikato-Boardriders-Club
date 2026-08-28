// Web Audio Synthesizer for Ambient Ocean Waves & Surf Stoke FX

let audioCtx: AudioContext | null = null;
let ambientOceanNode: AudioNode | null = null;
let isAmbientPlaying = false;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

// Play a celebratory surf chime/wave sound on stoke events
export function playStokeSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Ocean swell sweep tone
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(520, now + 0.3);
    osc.frequency.exponentialRampToValueAtTime(320, now + 0.6);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.15, now + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.7);
  } catch (e) {
    console.error("Audio error:", e);
  }
}

// Toggle continuous ambient ocean wave sound generated with pink noise filter
export function toggleAmbientOceanSound(): boolean {
  try {
    const ctx = getAudioContext();

    if (isAmbientPlaying && ambientOceanNode) {
      (ambientOceanNode as any).stop?.();
      ambientOceanNode.disconnect();
      ambientOceanNode = null;
      isAmbientPlaying = false;
      return false;
    }

    // Generate 4 seconds of white/pink noise buffer
    const bufferSize = ctx.sampleRate * 4;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      output[i] *= 0.04; // low volume
      b6 = white * 0.115926;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Lowpass filter modulating like ocean surf rhythm
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(250, ctx.currentTime);

    // LFO for swell rhythm (waves every ~7 seconds)
    const lfo = ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.14, ctx.currentTime); // ~7sec cycle
    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(350, ctx.currentTime);

    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.12, ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(masterGain);
    masterGain.connect(ctx.destination);

    whiteNoise.start();
    lfo.start();

    ambientOceanNode = whiteNoise as any;
    isAmbientPlaying = true;
    return true;
  } catch (e) {
    console.error("Failed to play ambient sound", e);
    return false;
  }
}
