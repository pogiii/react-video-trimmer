import React, { useCallback, useRef, useState, useEffect } from 'react';
import './style.css';

interface DualRangeSliderProps {
  min: number;
  max: number;
  minValue: number;
  maxValue: number;
  step?: number;
  onMinChange?: (value: number) => void;
  onMaxChange?: (value: number) => void;
  onRangeChange?: (min: number, max: number) => void;
  className?: string;
  disabled?: boolean;
}

export const DualRangeSlider: React.FC<DualRangeSliderProps> = ({
  min,
  max,
  minValue,
  maxValue,
  step = 1,
  onMinChange,
  onMaxChange,
  onRangeChange,
  className = '',
  disabled = false,
}) => {
  const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const minThumbRef = useRef<HTMLDivElement>(null);
  const maxThumbRef = useRef<HTMLDivElement>(null);

  // Ensure values are within bounds
  const clampedMinValue = Math.max(min, Math.min(minValue, maxValue));
  const clampedMaxValue = Math.min(max, Math.max(maxValue, minValue));

  // Calculate percentages for positioning
  const minPercent = ((clampedMinValue - min) / (max - min)) * 100;
  const maxPercent = ((clampedMaxValue - min) / (max - min)) * 100;

  const handleMouseDown = useCallback(
    (type: 'min' | 'max') => (event: React.MouseEvent) => {
      if (disabled) return;
      event.preventDefault();
      setIsDragging(type);
    },
    [disabled]
  );

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!isDragging || !containerRef.current || disabled) return;

      const rect = containerRef.current.getBoundingClientRect();
      const percent = Math.max(
        0,
        Math.min(100, ((event.clientX - rect.left) / rect.width) * 100)
      );
      const value = min + (percent / 100) * (max - min);
      const steppedValue = Math.round(value / step) * step;

      if (isDragging === 'min') {
        const newMinValue = Math.max(
          min,
          Math.min(steppedValue, clampedMaxValue)
        );
        onMinChange?.(newMinValue);
        onRangeChange?.(newMinValue, clampedMaxValue);
      } else if (isDragging === 'max') {
        const newMaxValue = Math.min(
          max,
          Math.max(steppedValue, clampedMinValue)
        );
        onMaxChange?.(newMaxValue);
        onRangeChange?.(clampedMinValue, newMaxValue);
      }
    },
    [
      isDragging,
      min,
      max,
      step,
      clampedMinValue,
      clampedMaxValue,
      onMinChange,
      onMaxChange,
      onRangeChange,
      disabled,
    ]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(null);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (type: 'min' | 'max') => (event: React.KeyboardEvent) => {
      if (disabled) return;

      const currentValue = type === 'min' ? clampedMinValue : clampedMaxValue;
      let newValue = currentValue;

      switch (event.key) {
        case 'ArrowLeft':
        case 'ArrowDown':
          newValue = Math.max(min, currentValue - step);
          break;
        case 'ArrowRight':
        case 'ArrowUp':
          newValue = Math.min(max, currentValue + step);
          break;
        case 'Home':
          newValue = min;
          break;
        case 'End':
          newValue = max;
          break;
        default:
          return;
      }

      event.preventDefault();

      if (type === 'min') {
        const finalValue = Math.min(newValue, clampedMaxValue);
        onMinChange?.(finalValue);
        onRangeChange?.(finalValue, clampedMaxValue);
      } else {
        const finalValue = Math.max(newValue, clampedMinValue);
        onMaxChange?.(finalValue);
        onRangeChange?.(clampedMinValue, finalValue);
      }
    },
    [
      min,
      max,
      step,
      clampedMinValue,
      clampedMaxValue,
      onMinChange,
      onMaxChange,
      onRangeChange,
      disabled,
    ]
  );

  // Handle track clicks
  const handleTrackClick = useCallback(
    (event: React.MouseEvent) => {
      if (disabled || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const percent = ((event.clientX - rect.left) / rect.width) * 100;
      const value = min + (percent / 100) * (max - min);
      const steppedValue = Math.round(value / step) * step;

      // Determine which thumb is closer
      const distanceToMin = Math.abs(steppedValue - clampedMinValue);
      const distanceToMax = Math.abs(steppedValue - clampedMaxValue);

      if (distanceToMin <= distanceToMax) {
        const newMinValue = Math.max(
          min,
          Math.min(steppedValue, clampedMaxValue)
        );
        onMinChange?.(newMinValue);
        onRangeChange?.(newMinValue, clampedMaxValue);
      } else {
        const newMaxValue = Math.min(
          max,
          Math.max(steppedValue, clampedMinValue)
        );
        onMaxChange?.(newMaxValue);
        onRangeChange?.(clampedMinValue, newMaxValue);
      }
    },
    [
      min,
      max,
      step,
      clampedMinValue,
      clampedMaxValue,
      onMinChange,
      onMaxChange,
      onRangeChange,
      disabled,
    ]
  );

  // Mouse event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div
      className={`dual-range-slider ${className} ${disabled ? 'disabled' : ''}`}
      ref={containerRef}
    >
      {/* Track */}
      <div className='dual-range-slider__track' onClick={handleTrackClick} />

      {/* Active range */}
      <div
        className='dual-range-slider__range'
        style={{
          left: `${minPercent}%`,
          width: `${maxPercent - minPercent}%`,
        }}
      />

      {/* Min thumb */}
      <div
        ref={minThumbRef}
        className={`dual-range-slider__thumb dual-range-slider__thumb--min ${isDragging === 'min' ? 'dragging' : ''}`}
        style={{ left: `${minPercent}%` }}
        onMouseDown={handleMouseDown('min')}
        onKeyDown={handleKeyDown('min')}
        tabIndex={disabled ? -1 : 0}
        role='slider'
        aria-label='Minimum value'
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={clampedMinValue}
        aria-disabled={disabled}
      />

      {/* Max thumb */}
      <div
        ref={maxThumbRef}
        className={`dual-range-slider__thumb dual-range-slider__thumb--max ${isDragging === 'max' ? 'dragging' : ''}`}
        style={{ left: `${maxPercent}%` }}
        onMouseDown={handleMouseDown('max')}
        onKeyDown={handleKeyDown('max')}
        tabIndex={disabled ? -1 : 0}
        role='slider'
        aria-label='Maximum value'
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={clampedMaxValue}
        aria-disabled={disabled}
      />
    </div>
  );
};

// Export the component and types for easy usage
export type { DualRangeSliderProps };

/*
Usage Example:

import { DualRangeSlider } from './features/timeline/components/trimmer';

function MyComponent() {
  const [range, setRange] = useState({ min: 10, max: 80 });

  const handleRangeChange = (min: number, max: number) => {
    setRange({ min, max });
  };

  return (
    <DualRangeSlider
      min={0}
      max={100}
      minValue={range.min}
      maxValue={range.max}
      step={1}
      onRangeChange={handleRangeChange}
      className="my-custom-slider"
    />
  );
}

// Custom styling example:
// .my-custom-slider {
//   --slider-range-color: #ff6b6b;
//   --slider-thumb-border: 2px solid #ff6b6b;
//   --slider-height: 8px;
//   --slider-thumb-size: 24px;
// }
*/
