// Web Audio API ambient celebratory harp, piano & string pad synthesizer for luxury engagement experience
const ambientMusicUrl = '/audioone.mp3';

let audioCtx: AudioContext | null = null;
let isPlaying = false;
let masterGain: GainNode | null = null;
let ambientMusicElement: HTMLAudioElement | null = null;

// Rich romantic celebratory Lydian & Major chord progression
// Cmaj9 -> Fmaj9 -> Am9 -> Gsus4/G
const chordProgressions = [
  { bass: 130.81, notes: [261.63, 329.63, 392.00, 493.88, 587.33] }, // Cmaj9
  { bass: 174.61, notes: [261.63, 349.23, 392.00, 523.25, 659.25] }, // Fmaj9
  { bass: 220.00, notes: [329.63, 392.00, 493.88, 523.25, 659.25] }, // Am9
  { bass: 196.00, notes: [293.66, 392.00, 440.00, 587.33, 659.25] }, // Gsus4/G
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
      masterGain.gain.setValueAtTime(0.25, ctx.currentTime);
      masterGain.connect(ctx.destination);
    }
  } catch (e) {
    console.warn('Web Audio Context initialization error:', e);
  }
}

export function playWarmPad(freq: number, duration = 3.5, volume = 0.08) {
  try {
    const ctx = getAudioContext();
    if (!masterGain) initAudio();

    const osc = ctx.createOscillator();
    const noteGain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq / 2, ctx.currentTime); // Low octave warmth

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(350, ctx.currentTime);

    const now = ctx.currentTime;
    noteGain.gain.setValueAtTime(0.001, now);
    noteGain.gain.linearRampToValueAtTime(volume, now + 0.8);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(filter);
    filter.connect(noteGain);
    if (masterGain) noteGain.connect(masterGain);

    osc.start(now);
    osc.stop(now + duration);
  } catch (e) {}
}

export function playHarpPluck(freq: number, delay = 0, volume = 0.15) {
  try {
    const ctx = getAudioContext();
    if (!masterGain) initAudio();

    const osc = ctx.createOscillator();
    const noteGain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, ctx.currentTime + delay);
    filter.Q.setValueAtTime(1.8, ctx.currentTime + delay);

    const now = ctx.currentTime + delay;
    noteGain.gain.setValueAtTime(0.001, now);
    noteGain.gain.linearRampToValueAtTime(volume, now + 0.03);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);

    osc.connect(filter);
    filter.connect(noteGain);
    if (masterGain) noteGain.connect(masterGain);

    osc.start(now);
    osc.stop(now + 2.9);
  } catch (e) {}
}

function getAmbientMusicElement(): HTMLAudioElement | null {
  if (typeof window === 'undefined') return null;

  if (!ambientMusicElement) {
    ambientMusicElement = new Audio(ambientMusicUrl);
    ambientMusicElement.loop = true;
    ambientMusicElement.volume = 0.5;
  }

  return ambientMusicElement;
}

export function startAmbientMusic() {
  initAudio();
  if (isPlaying) return;

  isPlaying = true;
  const audio = getAmbientMusicElement();

  if (!audio) return;

  audio.currentTime = 0;
  audio.play().catch(() => {
    isPlaying = false;
    console.warn('Ambient music playback failed');
  });
}

export function stopAmbientMusic() {
  isPlaying = false;

  const audio = ambientMusicElement;
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
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
