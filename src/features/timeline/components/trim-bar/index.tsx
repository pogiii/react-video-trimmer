import { useState, useCallback } from 'react';
import './style.css';

export const TrimBar = ({
  maxDuration,
  onStartChange: onStartChangeProp,
  onEndChange: onEndChangeProp,
}: {
  onStartChange?: (value: number) => void;
  onEndChange?: (value: number) => void;
  maxDuration?: number;
}) => {
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);

  const onStartChange = useCallback((value: number) => {
    if (value > 100 - end) return;

    setStart(value);

    if(onStartChangeProp) {
      onStartChangeProp(value);
    }
  }, [end, onStartChangeProp]);

  const onEndChange = useCallback((value: number) => {
    if (value > 100 - start) return;

    setEnd(value);

    if(onEndChangeProp) {
      onEndChangeProp(value);
    }
  }, [start, onEndChangeProp]);

  const handleStartChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onStartChange(Number(e.target.value));
  }, [onStartChange]);

  const handleEndChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onEndChange(Number(e.target.value));
  }, [onEndChange]);

  return (
    <div className='trim-bar'>
      <div className='trim-bar-input-container'>
        <input
          className='trim-bar-input trim-bar-input-start'
          type='range'
          value={start}
          onChange={handleStartChange}
          step={0.05} max={maxDuration}
        />
        <progress
          className='trim-bar-progress trim-bar-progress-start'
          value={start}
          max={maxDuration}
        />
      </div>
      <div className='trim-bar-input-container'>
        <input
          className='trim-bar-input trim-bar-input-end'
          type='range'
          value={end}
          max={maxDuration}
          onChange={handleEndChange}
          step={0.05}
        />
        <progress
          className='trim-bar-progress trim-bar-progress-end'
          value={end}
          max={maxDuration}
        />
      </div>
    </div>
  );
};
