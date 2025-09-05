import { fitColumns } from "./fit-columns";

// function seekTo(video: HTMLVideoElement, t: number) {
//   return new Promise<void>((res, rej) => {
//     const onSeeked = () => { cleanup(); res(); };
//     const onErr = () => { cleanup(); rej(new Error("seek failed")); };
//     const cleanup = () => {
//       video.removeEventListener("seeked", onSeeked);
//       video.removeEventListener("error", onErr);
//     };
//     const epsilon = 0.04;
//     video.addEventListener("seeked", onSeeked, { once: true });
//     video.addEventListener("error", onErr, { once: true });
//     video.currentTime = Math.max(0, Math.min(video.duration - epsilon, t));
//   });
// }

export async function generateSimpleFilmstrip(
  file: File,
  timelineWidth: number,
  tileHeight = 56,
  jpegQuality = 0.85
) {
  const v = document.createElement("video");
  const srcUrl = URL.createObjectURL(file);
  v.src = srcUrl;
  v.preload = "metadata";
  v.playsInline = true;

  await new Promise<void>((res, rej) => {
    v.addEventListener("loadedmetadata", () => res(), { once: true });
    v.addEventListener("error", () => rej(new Error("metadata load failed")), { once: true });
  });

  // 1) initial estimate from aspect ratio
  const ratio = (v.videoWidth || 16) / (v.videoHeight || 9);
  const approxTileW = Math.max(40, Math.round(tileHeight * ratio));

  // 2) snap columns/width to *exactly* fill the timeline
  const { cols, tileW, sheetW } = fitColumns(timelineWidth, approxTileW);
  const sheetH = tileHeight;

  // 3) canvases
  const sheet = document.createElement("canvas");
  sheet.width = sheetW;
  sheet.height = sheetH;
  const sctx = sheet.getContext("2d")!;
  sctx.imageSmoothingQuality = "high";

  const stage = document.createElement("canvas");
  stage.width = tileW;
  stage.height = tileHeight;
  const stx = stage.getContext("2d")!;

  // 4) evenly spaced frames, inclusive of the end
  const n = cols;
  const step = n > 1 ? v.duration / (n - 1) : 0;
  const EPS = 0.04;

  for (let i = 0; i < n; i++) {
    const t = Math.min(v.duration - EPS, i * step);
    await new Promise<void>((res, rej) => {
      const ok = () => { v.removeEventListener("seeked", ok); v.removeEventListener("error", err); res(); };
      const err = () => { v.removeEventListener("seeked", ok); v.removeEventListener("error", err); rej(new Error("seek failed")); };
      v.addEventListener("seeked", ok, { once: true });
      v.addEventListener("error", err, { once: true });
      v.currentTime = Math.max(0, t);
    });

    // cover-fit crop into the tile
    const vw = v.videoWidth, vh = v.videoHeight;
    const vr = vw / vh, tr = tileW / tileHeight;
    let sx = 0, sy = 0, sw = vw, sh = vh;
    if (vr > tr) { sw = Math.round(vh * tr); sx = Math.round((vw - sw) / 2); }
    else if (vr < tr) { sh = Math.round(vw / tr); sy = Math.round((vh - sh) / 2); }

    stx.clearRect(0, 0, tileW, tileHeight);
    stx.drawImage(v, sx, sy, sw, sh, 0, 0, tileW, tileHeight);

    sctx.drawImage(stage, i * tileW, 0);
  }

  const blob: Blob = await new Promise(res => sheet.toBlob(b => res(b!), "image/jpeg", jpegQuality));
  const url = URL.createObjectURL(blob);
  URL.revokeObjectURL(srcUrl);

  return {
    url,
    cols: n,
    tileW,
    tileH: tileHeight,
    sheetW,
    sheetH,
  };
}