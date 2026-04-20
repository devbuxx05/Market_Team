/// <reference types="vite/client" />

interface Window {
  YT: typeof YT;
  onYouTubeIframeAPIReady: () => void;
}

declare namespace YT {
  class Player {
    constructor(elementId: string, options: PlayerOptions);
    playVideo(): void;
    pauseVideo(): void;
    seekTo(seconds: number, allowSeekAhead: boolean): void;
    mute(): void;
    unMute(): void;
    setVolume(volume: number): void;
    getDuration(): number;
    getCurrentTime(): number;
    destroy(): void;
  }
  interface PlayerOptions {
    videoId?: string;
    playerVars?: Record<string, any>;
    events?: {
      onReady?: (event: PlayerEvent) => void;
      onStateChange?: (event: OnStateChangeEvent) => void;
    };
  }
  interface PlayerEvent { target: Player; }
  interface OnStateChangeEvent { data: number; target: Player; }
  const PlayerState: { ENDED: number; PLAYING: number; PAUSED: number; };
}
