// Draws the brand scene off the main thread (see brandScene.js).
import { createScene } from "./brandScene.js";

let scene = null;
self.onmessage = ({ data: m }) => {
  if (m.type === "init") {
    scene = createScene(m.canvas, { intro: m.intro, reduce: m.reduce, width: m.width, height: m.height, dpr: m.dpr, scrollY: m.scrollY });
    return;
  }
  if (!scene) return;
  if (m.type === "resize") scene.resize(m.w, m.h, m.d);
  else if (m.type === "scroll") scene.setScroll(m.y);
  else if (m.type === "veil") scene.setVeil(m.v);
  else if (m.type === "visible") scene.setVisible(m.v);
};
