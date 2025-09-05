import { Volume2, VolumeX } from 'lucide-react';
import { ControlButton } from '../control-button';
import './style.css';

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
  onMuteToggle 
}: VolumeSliderProps) => {
  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(event.target.value, 10);
    onVolumeChange(newVolume);
  };

  const handleMuteToggle = () => {
    if (onMuteToggle) {
      onMuteToggle();
    }
  };

  const getVolumeIcon = () => {
    if (muted || volume === 0) {
      return <VolumeX size={16} />;
    }
    return <Volume2 size={16} />;
  };

  return (
    <div className="volume-slider-container">
      <ControlButton
        icon={getVolumeIcon()}
        onClick={handleMuteToggle}
      />
      <div className="volume-slider">
        <input
          type="range"
          min="0"
          max="100"
          value={muted ? 0 : volume}
          onChange={handleSliderChange}
          className="volume-range"
        />
      </div>
    </div>
  );
}; 