import { useRef, useEffect, forwardRef, useImperativeHandle, useCallback } from 'react';
import { usePlayer } from '../../hooks/use-player';
import './style.css';

export interface PlayerRef {
  play: () => void;
  pause: () => void;
  seek: (time: number) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  getVideoElement: () => HTMLVideoElement | null;
}

export const Player = forwardRef<PlayerRef>((_, ref) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafId = useRef<number | null>(null);

  const {
    video,
    currentTime,
    isPlaying,
    volume,
    muted,
    dispatch,
    minStartTime,
    maxEndTime,
  } = usePlayer();

  useImperativeHandle(
    ref,
    () => ({
      play: () => videoRef.current?.play(),
      pause: () => videoRef.current?.pause(),
      seek: (time: number) => {
        if (videoRef.current) videoRef.current.currentTime = time;
      },
      getCurrentTime: () => videoRef.current?.currentTime ?? 0,
      getDuration: () => videoRef.current?.duration ?? 0,
      getVideoElement: () => videoRef.current,
    }),
    []
  );


  useEffect(() => {

    if (maxEndTime < currentTime) {
      dispatch({ type: 'PAUSE' });
    }

    if (minStartTime > currentTime) {
      dispatch({ type: 'PAUSE' });
    }
  }, [maxEndTime, minStartTime, currentTime, dispatch]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    dispatch({ type: 'SET_READY', payload: false });
    dispatch({ type: 'SET_DURATION', payload: 0 });
    dispatch({ type: 'SET_CURRENT_TIME', payload: 0 });
    dispatch({ type: 'SET_LOADING', payload: !!video });

    v.load();
  }, [video, dispatch]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    if (isPlaying) {
      v.play().catch(() => {
      });
    } else {
      v.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    v.volume = muted ? 0 : volume / 100;
  }, [volume, muted]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    if (v.paused && Math.abs(v.currentTime - currentTime) > 0.04) {
      v.currentTime = currentTime;
    }
  }, [currentTime]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const tick = () => {
      dispatch({ type: 'SET_CURRENT_TIME', payload: v.currentTime });
      rafId.current = requestAnimationFrame(tick);
    };

    if (!v.paused) {
      rafId.current = requestAnimationFrame(tick);
    }
    return () => {
      if (rafId.current != null) cancelAnimationFrame(rafId.current);
      rafId.current = null;
    };
  }, [isPlaying, dispatch, minStartTime, maxEndTime]);

  const handleLoadedMetadata = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    dispatch({ type: 'SET_DURATION', payload: v.duration });
    dispatch({ type: 'SET_READY', payload: true });
  }, [dispatch]);

  const handleTimeUpdate = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    dispatch({ type: 'SET_CURRENT_TIME', payload: v.currentTime });
  }, [dispatch]);

  const handlePlay = useCallback(() => dispatch({ type: 'PLAY' }), [dispatch]);
  const handlePause = useCallback(() => dispatch({ type: 'PAUSE' }), [dispatch]);

  const handleLoadStart = useCallback(() =>
    dispatch({ type: 'SET_LOADING', payload: true }), [dispatch]);
  const handleCanPlay = useCallback(() => dispatch({ type: 'SET_LOADING', payload: false }), [dispatch]);
  const handleWaiting = useCallback(() => dispatch({ type: 'SET_LOADING', payload: true }), [dispatch]);
  const handlePlaying = useCallback(() => dispatch({ type: 'SET_LOADING', payload: false }), [dispatch]);

  const handleEnded = useCallback(() => {
    dispatch({ type: 'PAUSE' });
  }, [dispatch]);

  const handleError = useCallback(() => {
    dispatch({ type: 'SET_LOADING', payload: false });
    dispatch({ type: 'SET_READY', payload: false }); // if you have this action
  }, [dispatch]);

  return (
    <div className='video-player-container'>
      <video
        ref={videoRef}
        className='video-player'
        src={video ?? undefined}
        preload='metadata'
        playsInline
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onPlay={handlePlay}
        onPause={handlePause}
        onLoadStart={handleLoadStart}
        onCanPlay={handleCanPlay}
        onWaiting={handleWaiting}
        onPlaying={handlePlaying}
        onEnded={handleEnded}
        onError={handleError}
      />
    </div>
  );
});

Player.displayName = 'Player';
