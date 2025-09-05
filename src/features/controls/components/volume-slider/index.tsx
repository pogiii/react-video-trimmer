import { Volume2, VolumeX } from 'lucide-react';
import { ControlButton } from '../control-button';
import './style.css';
import { useCallback, useMemo } from 'react';

interface VolumeSliderProps {
  volume: number;
  onVolumeChange: (volume: number) => void;
  muted?: boolean;
  onMuteToggle?: () => void;
}

export const VolumeSlider = ({
  volume,
  onVolumeChange,
  muted = false,
  onMuteToggle,
}: VolumeSliderProps) => {
  const handleSliderChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(event.target.value, 10);
    onVolumeChange(newVolume);
  }, [onVolumeChange]);

  const handleMuteToggle = useCallback(() => {
    if (onMuteToggle) {
      onMuteToggle();
    }
  }, [onMuteToggle]);

  const volumeIcon = useMemo(() => {
    if (muted || volume === 0) {
      return <VolumeX size={16} />;
    }
    return <Volume2 size={16} />;
  }, [muted, volume]);

  const displayVolume = muted ? 0 : volume;

  return (
    <div className='volume-slider-container'>
      <ControlButton icon={volumeIcon} onClick={handleMuteToggle} />
      <div className='volume-slider'>
        <input
          type='range'
          min='0'
          max='100'
          value={displayVolume}
          onChange={handleSliderChange}
          className='volume-range'
        />
      </div>
    </div>
  );
};
