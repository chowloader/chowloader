const ChowLoaderRenderer = require("$lib/renderer");

let isOMORILaunched = false;
let firstDraw = true;

return class ChowLoaderSplash {
  constructor(){
    this.logo = chowjs.getImage("./chowloader/assets/logo.png");
    while(!chowjs.imageReady(this.logo[0])){}
    chowjs.setResolutionScaler(1);
    chowjs.setBorder("border_whitespace",255);

    this.canvas = new ChowLoaderRenderer(640, 480);
    this.canvas.renderImage(this.logo[0], 0, 0, this.logo[1], this.logo[2], 320 - this.logo[1]/2, 80, this.logo[1], this.logo[2]);
    this.canvas.renderRect(0, 380, 640, 20, "#000000");
    this.setProgress(0);
  }

  setMessage(message){
    if(isOMORILaunched) return;
    this.canvas.clearXY(0, 300, 640, 355);
    if(message !== "") this.canvas.renderTextCenter(message, 320, 30, "KTEGAKI", "#000000", 6, "rgba(0,0,0,0.5)");
  }

  setSubMessage(message){
    if(isOMORILaunched) return;
    this.canvas.clearXY(0, 345, 640, 380);
    if(message !== "") this.canvas.renderTextCenter(message, 355, 20, "KTEGAKI", "#000000", 4, "rgba(0,0,0,0.5)");
  }

  setProgress(progress){
    if(isOMORILaunched) return;
    this.canvas.renderRect(5, 385, 630, 10, "#FFFFFF");
    this.canvas.renderRect(5, 385, Math.ceil(630 * progress / 100), 10, "#808080");
  }

  setOMORILaunched(){
    isOMORILaunched = true;
    delete this.canvas;
  }

  isOMORILaunched(){
    return isOMORILaunched;
  }

  render(){
    if(isOMORILaunched) return;

    chowloader.renderer.clear("white");
    
    this.canvas.render();

    if(firstDraw){
      firstDraw = false;
      for(let i = 0; i < 50; i++)
        chowloader.renderer.draw();
    }

    chowloader.renderer.draw();
  }
}
