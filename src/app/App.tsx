import './App.css';
import { FullscreenIcon, Pause, Play } from 'lucide-react';
import { AppLayout } from '../components/layouts/app-layout';
import { Controls } from '../features/controls/';
import { FileLoader } from '../features/ingest/components/file-loader';
import { loadFile } from '../features/ingest/lib/load-file';
import { Player } from '../features/player';
import { usePlayer } from '../features/player';
import { Timeline } from '../features/timeline/';
import { ControlContainer } from '../features/controls';;
import { useEffect, useCallback } from 'react';

function App() {
  const {
    dispatch,
    video,
    file,
    currentTime,
    duration,
    isPlaying,
    volume,
    muted,
    maxEndTime,
    minStartTime,
  } = usePlayer();

  useEffect(() => {
  }, [currentTime]);

  const handlePlay = useCallback(() => {
    dispatch({ type: 'PLAY' });
  }, [dispatch]);

  const handlePause = useCallback(() => {
    dispatch({ type: 'PAUSE' });
  }, [dispatch]);

  const handleVolumeChange = useCallback((newVolume: number) => {
    dispatch({ type: 'SET_VOLUME', payload: newVolume });
  }, [dispatch]);

  const handleMuteToggle = useCallback(() => {
    dispatch({ type: 'TOGGLE_MUTE' });
  }, [dispatch]);

  const handlePointerInput = useCallback((event: React.FormEvent<HTMLInputElement>) => {
    const newTime = parseFloat(event.currentTarget.value);

    if (newTime < minStartTime) {
      console.log('newTime < minStartTime', newTime, minStartTime);
      return;
    }
    if (newTime > maxEndTime) {
      console.log('newTime > maxEndTime', newTime, maxEndTime);
      return;
    }

    dispatch({ type: 'SET_CURRENT_TIME', payload: newTime });
  }, [dispatch]);

  const handleFullscreen = useCallback(() => {
    const videoElement = document.querySelector('video');
    if (videoElement) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoElement.requestFullscreen();
      }
    }
  }, []);

  const handlePointerStart = useCallback(() => {
    dispatch({ type: 'PAUSE' });
  }, [dispatch]);

  const handlePointerEnd = useCallback(() => {
    dispatch({ type: 'PLAY' });
  }, [dispatch]);

  const handleStartChange = useCallback((value: number) => {
    console.log('handleStartChange:', value);
    dispatch({ type: 'SET_TRIM_BOUNDS', payload: { minStartTime: value, maxEndTime: maxEndTime } });
  }, [dispatch, maxEndTime, currentTime]);

  const handleEndChange = useCallback((value: number) => {
    dispatch({ type: 'SET_TRIM_BOUNDS', payload: { minStartTime: minStartTime, maxEndTime: duration - value } });
  }, [dispatch, minStartTime, currentTime, duration]);

  const handleFileAvailable = useCallback((files: FileList) => {
    const url = loadFile(files[0]) ?? '';
    dispatch({ type: 'LOAD_VIDEO', payload: { url, file: files[0] } });
  }, [dispatch]);

  return (
    <AppLayout>
      {!video && (
        <FileLoader
          whenFileAvailable={handleFileAvailable}
        />
      )}
      {video && (
        <>
          <Player />
          <Timeline.Root>
            <Timeline.Header>
              <Timeline.Title title={file?.name ?? ''} />
              <ControlContainer>
                {!isPlaying ? (
                  <Controls.Button
                    icon={<Play size={16} />}
                    onClick={handlePlay}
                  />
                ) : (
                  <Controls.Button
                    icon={<Pause size={16} />}
                    onClick={handlePause}
                  />
                )}
                <Controls.Button
                  icon={<FullscreenIcon size={16} />}
                  onClick={handleFullscreen}
                />
                <Controls.VolumeSlider
                  volume={volume}
                  muted={muted}
                  onVolumeChange={handleVolumeChange}
                  onMuteToggle={handleMuteToggle}
                />
              </ControlContainer>
              <Timeline.Time currentTime={currentTime} duration={duration} />
            </Timeline.Header>
            <Timeline.Body>
              {file && (
                <>
                  <Timeline.TrimBar
                    onStartChange={handleStartChange}
                    onEndChange={handleEndChange}
                    maxDuration={duration}
                  />
                  <Timeline.FilmstripPreview file={file} />
                  <Timeline.Pointer
                    min={0}
                    max={duration}
                    step={0.05}
                    value={currentTime}
                    onInput={handlePointerInput}
                    onMouseDown={handlePointerStart}
                    onMouseUp={handlePointerEnd}
                    onTouchStart={handlePointerStart}
                    onTouchEnd={handlePointerEnd}
                  />
                </>
              )}
            </Timeline.Body>
          </Timeline.Root>
        </>
      )}
    </AppLayout>
  );
}

export default App;
