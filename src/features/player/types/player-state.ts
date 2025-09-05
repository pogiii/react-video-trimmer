export type PlayerState = {
  video: string | null;
  file: File | null;
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  isLoading: boolean;
  isReady: boolean;
  minStartTime: number;
  maxEndTime: number;
  volume: number;
  muted: boolean;
};
