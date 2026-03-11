// Lightweight sound effect utility
// Sounds are optional — failures are silently ignored

const cache = new Map<string, HTMLAudioElement>();

const SOUND_MAP: Record<string, string> = {
  click: "/sounds/click.wav",
  open: "/sounds/open.wav",
  close: "/sounds/close.wav",
  error: "/sounds/error.wav",
  startup: "/sounds/startup.wav",
};

let muted = false;

export function setMuted(value: boolean) {
  muted = value;
}

export function isMuted() {
  return muted;
}

export function playSound(name: keyof typeof SOUND_MAP | string) {
  if (muted || typeof window === "undefined") return;

  const src = SOUND_MAP[name] ?? name;

  try {
    let audio = cache.get(src);
    if (!audio) {
      audio = new Audio(src);
      audio.preload = "auto";
      cache.set(src, audio);
    }

    // Reset and play
    audio.currentTime = 0;
    audio.play().catch(() => {
      // Autoplay blocked — ignore
    });
  } catch {
    // Ignore all sound errors
  }
}

export function preloadSounds() {
  if (typeof window === "undefined") return;
  Object.values(SOUND_MAP).forEach((src) => {
    if (!cache.has(src)) {
      const audio = new Audio(src);
      audio.preload = "auto";
      cache.set(src, audio);
    }
  });
}
