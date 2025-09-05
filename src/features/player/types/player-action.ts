export type PlayerAction = 
  | { type: 'LOAD_VIDEO'; payload: string }
  | { type: 'SET_DURATION'; payload: number }
  | { type: 'SET_CURRENT_TIME'; payload: number }
  | { type: 'PLAY' }
  | { type: 'PAUSE' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_READY'; payload: boolean }
  | { type: 'SET_TRIM_BOUNDS'; payload: { minStartTime: number; maxEndTime: number } }
  | { type: 'SET_VOLUME'; payload: number }
  | { type: 'TOGGLE_MUTE' }
  | { type: 'SET_MUTE'; payload: boolean }
  | { type: 'RESET' };