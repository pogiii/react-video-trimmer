import { useRef, useEffect, useState, useCallback } from 'react';
import { Filmstrip } from '.';
import { useFilmstrip } from '../../hooks/useFilmstrip';
import './style.css';
import { Loader2 } from 'lucide-react';

export function FilmstripPreview({ file }: { file: File | null }) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const { sprite } = useFilmstrip(file, width);

  // Calculate width after component mounts and on resize
  const updateWidth = useCallback(() => {
    if (ref.current) {
      setWidth(ref.current.clientWidth);
    }
  }, []);

  useEffect(() => {
    updateWidth();
    window.addEventListener('resize', updateWidth);

    return () => window.removeEventListener('resize', updateWidth);
  }, [updateWidth]);

  if (!sprite)
    return (
      <div
        ref={ref}
        className='filmstrip-preview-generating flex justify-center items-center gap-5'
      >
        <div className='flex justify-center items-center spin-container'>
          <Loader2 className='animate-spin spinner' />
        </div>
        <span>Generating preview...</span>
      </div>
    );

  return (
    <div
      ref={ref}
      className='filmstrip-preview flex justify-center items-center'
    >
      <Filmstrip sprite={sprite} width={width} />
    </div>
  );
}
