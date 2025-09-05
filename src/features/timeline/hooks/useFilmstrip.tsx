import { useEffect, useState, useRef } from 'react';
import { generateSimpleFilmstrip } from '../lib/generate-filmstrip';
import type { Filmstrip } from '../types/filmstrip';

export const useFilmstrip = (file: File | null, timelineWidth: number) => {
  const [sprite, setSprite] = useState<Filmstrip | null>(null);
  const currentSpriteRef = useRef<Filmstrip | null>(null);

  useEffect(() => {
    let cancel = false;

    if (!file || timelineWidth <= 0) {
      setSprite(null);
      return;
    }

    // Clean up previous sprite before generating new one
    if (currentSpriteRef.current?.url) {
      URL.revokeObjectURL(currentSpriteRef.current.url);
      currentSpriteRef.current = null;
    }

    generateSimpleFilmstrip(file, timelineWidth, 56)
      .then(s => {
        if (!cancel && s) {
          setSprite(s);
          currentSpriteRef.current = s;
        }
      })
      .catch(error => {
        if (!cancel) {
          console.error('Failed to generate filmstrip:', error);
          setSprite(null);
        }
      });

    return () => {
      cancel = true;
    };
  }, [file, timelineWidth]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (currentSpriteRef.current?.url) {
        URL.revokeObjectURL(currentSpriteRef.current.url);
      }
    };
  }, []);

  return { sprite };
};
