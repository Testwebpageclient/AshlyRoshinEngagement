import ambientMusicAsset from './Audioone.mp3';

const ambientMusicUrl = ambientMusicAsset;

let isPlaying = false;
let ambientMusicElement: HTMLAudioElement | null = null;

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
