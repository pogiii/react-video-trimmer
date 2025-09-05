import { useReducer, useMemo } from 'react';
import { PlayerContext, playerReducer } from '../../context';
import type { PlayerState } from '../../types/player-state';

const initialState: PlayerState = {
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

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(playerReducer, initialState);

  const contextValue = useMemo(() => ({
    ...state,
    dispatch
  }), [state, dispatch]);

  return (
    <PlayerContext.Provider value={contextValue}>
      {children}
    </PlayerContext.Provider>
  );
};
