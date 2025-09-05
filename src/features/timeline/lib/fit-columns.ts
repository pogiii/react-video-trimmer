// helper: fit columns exactly to the timeline width
export function fitColumns(timelineWidth: number, approxTileW: number) {
  const cols = Math.max(1, Math.round(timelineWidth / approxTileW));
  const tileW = Math.max(1, Math.round(timelineWidth / cols)); // snap so cols*tileW == ~timelineWidth
  const sheetW = cols * tileW; // exact integer
  return { cols, tileW, sheetW };
}
