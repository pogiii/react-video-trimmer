export type Filmstrip = {
  url: string; // blob URL for the sprite image
  cols: number; // number of tiles (columns)
  tileW: number; // tile width in CSS px
  tileH: number; // tile height in CSS px
  sheetW: number; // sheet width  (= cols * tileW)
  sheetH: number; // sheet height (= tileH)
};
