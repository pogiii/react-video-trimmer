import { FullscreenIcon, Pause, Play } from 'lucide-react';
import { AppLayout } from '../components/layouts/app-layout';
import { Controls } from '../features/controls/';
import { FileLoader } from '../features/ingest/components/file-loader';
import { loadFile } from '../features/ingest/lib/load-file';
import { Player } from '../features/player';
import { usePlayer } from '../features/player';
import { Timeline } from '../features/timeline/components/timeline';
import './App.css';
import { ControlContainer } from '../features/controls';

import { FilmstripPreview } from '../features/timeline/components/filmstrip/preview';
import { Pointer } from '../features/timeline/components/pointer';

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

  const handlePlay = () => {
    dispatch({ type: 'PLAY' });
  };

  const handlePause = () => {
    dispatch({ type: 'PAUSE' });
  };

  const handleVolumeChange = (newVolume: number) => {
    dispatch({ type: 'SET_VOLUME', payload: newVolume });
  };

  const handleMuteToggle = () => {
    dispatch({ type: 'TOGGLE_MUTE' });
  };

    const handlePointerInput = (event: React.FormEvent<HTMLInputElement>) => {
    const newTime = parseFloat(event.currentTarget.value);
    dispatch({ type: 'SET_CURRENT_TIME', payload: newTime });
  };

  const handleFullscreen = () => {
    const videoElement = document.querySelector('video');
    if (videoElement) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoElement.requestFullscreen();
      }
    }
  };

  const handlePointerStart = () => {
    dispatch({ type: 'PAUSE' });
  };

  const handlePointerEnd = () => {
    dispatch({ type: 'PLAY' });
  };

  return (
    <AppLayout>
      {!video && (
        <FileLoader
          whenFileAvailable={files => {
            const url = loadFile(files[0]) ?? '';
            dispatch({ type: 'LOAD_VIDEO', payload: { url, file: files[0] } });
          }}
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
                  <FilmstripPreview file={file} />
                  <Pointer
                    min={minStartTime}
                    max={maxEndTime}
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
