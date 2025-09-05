import type { Filmstrip } from '../../types/filmstrip';

export function Filmstrip({
  sprite,
  width,
}: {
  sprite: Filmstrip | null;
  width: number;
}) {
  if (!sprite) return null;

  const cells = Array.from({ length: sprite.cols });

  const styleGrid: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${sprite.cols}, ${sprite.tileW}px)`,
    gridAutoRows: `${sprite.tileH}px`,
    width,
    overflow: 'hidden',
  };

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
}
