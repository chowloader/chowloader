function renderImageXY(w, h, sx, sy, sw, sh, dx, dy, dw, dh){
  sw = Math.max(1, Math.min(Math.ceil(sw), w));
  sh = Math.max(1, Math.min(Math.ceil(sh), h));
  dw = Math.max(1, dw);
  dh = Math.max(1, dh);
  let source_x = Math.ceil(sx - w + sw);
  let source_y = Math.ceil(sy - h + sh);
  let scale_x = dw/sw;
  let scale_y = dh/sh;
  let destx = Math.ceil(dx - (w - sw) * scale_x);
  let desty = Math.ceil(dy - (h - sh) * scale_y);
  let dWidth = Math.ceil(dw + dx - sx * scale_x);
  let dHeight = Math.ceil(dh + dy - sy * scale_y);
  return [source_x, source_y, sw, sh, destx, desty, dWidth, dHeight];
}

return class ChowLoaderRenderer {
  x = 0;
  y = 0;

  constructor(width, height, backgroundColor){
    this.canvas = chowjs.createCanvas(backgroundColor || "rgba(0,0,0,0)");
    chowjs.setCanvasWidth(this.canvas, this.width = width);
    chowjs.setCanvasHeight(this.canvas, this.height = height);
  }

  setPosition(x, y){
    this.x = 0;
    this.y = 0;
  }

  setDimension(width, height){
    chowjs.setCanvasWidth(this.canvas, this.width = width);
    chowjs.setCanvasHeight(this.canvas, this.height = height);
  }

  setAlpha(alpha){
    chowjs.setCanvasAlpha(this.canvas, alpha);
  }

  renderImage(image, sx, sy, sw, sh, dx, dy, dw, dh){
    chowjs.drawCanvasImage(this.canvas, image, sx, sy, dw, sh, dx, dy, dw, dh);
  }

  renderCanvas(canvas, sx, sy, sw, sh, dx, dy, dw, dh){
    chowjs.drawCanvasImage(this.canvas, canvas, sx, sy, dw, sh, dx, dy, dw, dh);
  }

  renderText(text, x, y, fontSize, font, color, strokeWidth, strokeColor){
    const width = chowjs.measureTextWidth(text, `${fontSize}px ${font}`);
    chowjs.drawCanvasText(this.canvas, text, width/2 + x, fontSize/2 + y, width, "center", `${fontSize}px ${font}`, color, strokeWidth, strokeColor);
  }

  renderTextCenter(text, y, fontSize, font, color, strokeWidth, strokeColor){
    const width = chowjs.measureTextWidth(text, `${fontSize}px ${font}`);
    chowjs.drawCanvasText(this.canvas, text, width/2 + (this.width - width)/2, fontSize/2 + y, width, "center", `${fontSize}px ${font}`, color, strokeWidth, strokeColor);
  }

  renderRectXY(x1, y1, x2, y2, color){
    chowjs.drawCanvasRect(this.canvas, x1, y1, x2, y2, color);
  }

  renderRect(x, y, w, h, color){
    chowjs.drawCanvasRect(this.canvas, x, y, x + w, y + h, color);
  }

  renderGradientXY(x1, y1, x2, y2, c1, c2, v){
    chowjs.drawCanvasGradient(this.canvas, x1, y1, x2, y2, c1, c2, v);
  }

  renderGradient(x, y, w, h, c1, c2, v){
    chowjs.drawCanvasGradient(this.canvas, x, y, x + w, y + h, c1, c2, v);
  }

  clearXY(x1, y1, x2, y2){
    chowjs.clearCanvasRect(this.canvas, x1, y1, x2, y2);
  }

  clear(x, y, w, h){
    chowjs.clearCanvasRect(this.canvas, x, y, x + w, y + h);
  }

  clearAll(){
    chowjs.clearCanvasRect(this.canvas, 0, 0, this.width, this.height);
  }

  render(){
    ChowLoaderRenderer.renderCanvas(this.canvas, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
  }

  static renderImage(image, sx, sy, sw, sh, dx, dy, dw, dh){
    let width, height;
    if(typeof image === "string"){
      [image, width, height] = chowjs.getImage(image);
    } else {
      [width, height] = chowloader.renderer.getImageDimension(image);
    }
    chowjs.renderImage(image, ...renderImageXY(width, height, sx, sy, sw, sh, dx, dy, dw, dh));
  }

  static renderCanvas(canvas, sx, sy, sw, sh, dx, dy, dw, dh){
    const [width, height] = chowloader.renderer.getCanvasDimension(canvas);
    chowjs.renderImage(canvas, ...renderImageXY(width, height, sx, sy, sw, sh, dx, dy, dw, dh));
  }

  static renderRectXY(x1, y1, x2, y2, r, g, b, a){
    chowjs.renderQuad(x1, y1, x2, y2, r, g, b, a);
  }

  static renderRect(x, y, w, h, r, g, b, a){
    chowjs.renderQuad(x, y, x + w, y + h, r, g, b, a);
  }

  static renderText(text, x, y, fontSize, font, color, strokeWidth, strokeColor){
    const width = chowjs.measureTextWidth(text, `${fontSize}px ${font}`);
    chowjs.renderText(text, width/2 + x, fontSize/2 + y, width, "center", `${fontSize}px ${font}`, color, strokeWidth, strokeColor);
  }

  static renderTextCenter(text, y, fontSize, font, color, strokeWidth, strokeColor){
    const width = chowjs.measureTextWidth(text, `${fontSize}px ${font}`);
    chowjs.renderText(text, width/2 + (640 - width)/2, fontSize/2 + y, width, "center", `${fontSize}px ${font}`, color, strokeWidth, strokeColor);
  }
}
