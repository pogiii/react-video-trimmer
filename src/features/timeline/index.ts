import { FilmstripPreview } from "./components/filmstrip/preview";
import { Pointer } from "./components/pointer";
import { Timeline as TimelineComponent } from "./components/timeline";
import { TrimBar } from "./components/trim-bar";

const Timeline = {
  ...TimelineComponent,
  FilmstripPreview,
  Pointer,
  TrimBar,
};


export { Timeline };