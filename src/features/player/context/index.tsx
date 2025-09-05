import { createContext } from 'react';
import type { PlayerState } from '../types/player-state';
import type { PlayerAction } from '../types/player-action';

// Updated context type with dispatch
export type PlayerContextType = PlayerState & {
  dispatch: (action: PlayerAction) => void;
};

// Initial state
export const initialPlayerState: PlayerState = {
  video: null,
  file: null,
  currentTime: 0,
  duration: 0,
  isPlaying: false,
  isLoading: false,
  isReady: false,
  minStartTime: 0,
  maxEndTime: 0,
  volume: 75,
  muted: false,
};

// Player reducer
export const playerReducer = (
  state: PlayerState,
  action: PlayerAction
): PlayerState => {
  switch (action.type) {
    case 'LOAD_VIDEO':
      return {
        ...state,
        video: action.payload.url,
        file: action.payload.file,
        currentTime: 0,
        duration: 0,
        isPlaying: false,
        isLoading: true,
        isReady: false,
        minStartTime: 0,
        maxEndTime: 0,
        // Preserve volume and mute settings when loading new video
      };
    case 'SET_DURATION':
      return {
        ...state,
        duration: action.payload,
        maxEndTime: action.payload,
      };
    case 'SET_CURRENT_TIME':
      return {
        ...state,
        currentTime: action.payload,
      };
    case 'PLAY':
      return {
        ...state,
        isPlaying: true,
      };
    case 'PAUSE':
      return {
        ...state,
        isPlaying: false,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'SET_READY':
      return {
        ...state,
        isReady: action.payload,
        isLoading: !action.payload,
      };
    case 'SET_TRIM_BOUNDS':
      return {
        ...state,
        minStartTime: action.payload.minStartTime,
        maxEndTime: action.payload.maxEndTime,
      };
    case 'SET_VOLUME':
      return {
        ...state,
        volume: Math.max(0, Math.min(100, action.payload)),
        muted: action.payload === 0 ? true : state.muted,
      };
    case 'TOGGLE_MUTE':
      return {
        ...state,
        muted: !state.muted,
      };
    case 'SET_MUTE':
      return {
        ...state,
        muted: action.payload,
      };
    case 'RESET':
      return initialPlayerState;
    default:
      return state;
  }
};

// Create context with default values
export const PlayerContext = createContext<PlayerContextType>({
  ...initialPlayerState,
  dispatch: () => {},
});
