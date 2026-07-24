// Web Audio API ambient harp & piano chord synthesizer for luxury experience

let audioCtx: AudioContext | null = null;
let isPlaying = false;
let masterGain: GainNode | null = null;
let intervalId: any = null;

// Frequencies for soothing luxury Pentatonic / Lydian chord progression in C major / G major
// Fmaj7 - Cmaj7 - Am9 - Em7
const chordProgressions = [
  [174.61, 220.00, 261.63, 329.63, 392.00], // Fmaj9
  [130.81, 164.81, 196.00, 246.94, 293.66], // Cmaj9
  [220.00, 261.63, 329.63, 392.00, 493.88], // Am9
  [164.81, 196.00, 246.94, 293.66, 392.00], // Em7
];

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function initAudio() {
  try {
    const ctx = getAudioContext();
    if (!masterGain) {
      masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.2, ctx.currentTime);
      masterGain.connect(ctx.destination);
    }
  } catch (e) {
    console.warn('Web Audio Context initialization error:', e);
  }
}

export function playHarpPluck(freq: number, delay = 0, volume = 0.15) {
  try {
    const ctx = getAudioContext();
    if (!masterGain) initAudio();

    const osc = ctx.createOscillator();
    const noteGain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    // Harp / Piano warm timbre mix
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);

    // Warm low-pass filter
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200, ctx.currentTime + delay);
    filter.Q.setValueAtTime(1.5, ctx.currentTime + delay);

    // Envelope: quick attack, smooth exponential decay
    const now = ctx.currentTime + delay;
    noteGain.gain.setValueAtTime(0.001, now);
    noteGain.gain.linearRampToValueAtTime(volume, now + 0.04);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

    osc.connect(filter);
    filter.connect(noteGain);
    if (masterGain) noteGain.connect(masterGain);

    osc.start(now);
    osc.stop(now + 2.6);
  } catch (e) {
    // Ignore audio autoplay restrictions gracefully
  }
}

export function startAmbientMusic() {
  initAudio();
  if (isPlaying) return;
  isPlaying = true;

  let step = 0;

  const playNextArpeggio = () => {
    if (!isPlaying) return;
    const chord = chordProgressions[step % chordProgressions.length];
    
    // Play arpeggiated harp notes
    chord.forEach((freq, idx) => {
      const arpeggioDelay = idx * 0.18 + Math.random() * 0.05;
      playHarpPluck(freq, arpeggioDelay, 0.12 - idx * 0.015);
    });

    step++;
  };

  playNextArpeggio();
  intervalId = setInterval(playNextArpeggio, 3600);
}

export function stopAmbientMusic() {
  isPlaying = false;
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

export function toggleAmbientMusic(): boolean {
  if (isPlaying) {
    stopAmbientMusic();
    return false;
  } else {
    startAmbientMusic();
    return true;
  }
}

export function playBoxOpenChime() {
  try {
    const ctx = getAudioContext();
    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, i) => {
      playHarpPluck(freq, i * 0.1, 0.18);
    });
  } catch (e) {}
}

export function playSealChime() {
  try {
    const ctx = getAudioContext();
    playHarpPluck(523.25, 0, 0.2);
    playHarpPluck(659.25, 0.12, 0.25);
    playHarpPluck(783.99, 0.25, 0.3);
  } catch (e) {}
}
