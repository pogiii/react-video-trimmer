import type { Filmstrip as FilmstripType } from '../../types/filmstrip';
import { useMemo, memo } from 'react';

export const Filmstrip = memo(function Filmstrip({
  sprite,
  width,
}: {
  sprite: FilmstripType | null;
  width: number;
}) {
  const cells = useMemo(() => {
    if (!sprite) return [];
    return Array.from({ length: sprite.cols });
  }, [sprite]);

  const styleGrid: React.CSSProperties = useMemo(() => {
    if (!sprite) return {};
    return {
      display: 'grid',
      gridTemplateColumns: `repeat(${sprite.cols}, ${sprite.tileW}px)`,
      gridAutoRows: `${sprite.tileH}px`,
      width,
      overflow: 'hidden',
    };
  }, [sprite, width]);

  if (!sprite) return null;

  return (
    <div style={styleGrid}>
      {cells.map((_, i) => (
        <div
          key={i}
          style={{
            width: sprite.tileW,
            height: sprite.tileH,
            backgroundImage: `url(${sprite.url})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: `${sprite.sheetW}px ${sprite.sheetH}px`,
            backgroundPosition: `-${i * sprite.tileW}px 0`,
          }}
        />
      ))}
    </div>
  );
});
