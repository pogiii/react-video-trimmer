import { FullscreenIcon, Pause, Play } from 'lucide-react';
import { AppLayout } from '../components/layouts/app-layout';
import { ControlButton } from '../features/controls/components/control-button';
import { FileLoader } from '../features/ingest/components/file-loader';
import { loadFile } from '../features/ingest/lib/load-file';
import { Player } from '../features/player';
import { usePlayer } from '../features/player';
import { Timeline } from '../features/timeline/components/timeline';
import './App.css';
import { ControlContainer, VolumeSlider } from '../features/controls';

function App() {
  const { dispatch, video, currentTime, duration, isPlaying, volume, muted } = usePlayer();

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

  return (
    <AppLayout>
      {!video && (
        <FileLoader whenFileAvailable={(files) => {
          dispatch({ type: 'LOAD_VIDEO', payload: loadFile(files[0]) ?? '' });
        }} />
      )}
      {video && (
        <>
          <Player />
          <Timeline.Root>
            <Timeline.Header>
              <Timeline.Title title="Video Title" />
              <ControlContainer>
                {!isPlaying ? (
                  <ControlButton icon={<Play />} onClick={handlePlay} />
                ) : (
                  <ControlButton icon={<Pause />} onClick={handlePause} />
                )}
                <ControlButton icon={<FullscreenIcon/>} onClick={handleFullscreen} />
                <VolumeSlider 
                  volume={volume} 
                  muted={muted}
                  onVolumeChange={handleVolumeChange} 
                  onMuteToggle={handleMuteToggle}
                />
              </ControlContainer>
              <Timeline.Time currentTime={currentTime} duration={duration} />
            </Timeline.Header>
            <Timeline.Body>
              <div>Timeline content will go here</div>
            </Timeline.Body>
          </Timeline.Root>
        </>
      )}
    </AppLayout>
  );
}

export default App;
