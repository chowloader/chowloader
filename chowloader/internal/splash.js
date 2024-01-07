const ChowLoaderRenderer = require("$lib/renderer");
const { loadImageSync } = require("$lib/assets");

let isOMORILaunched = false;
let firstDraw = true;

loadImageSync("./chowloader/assets/logo.png");
const logo = chowjs.getImage("./chowloader/assets/logo.png");

chowjs.setResolutionScaler(1);
chowjs.setBorder("border_whitespace",255);

let canvas = new ChowLoaderRenderer(640, 480);
canvas.renderImage(logo[0], 0, 0, logo[1], logo[2], 320 - logo[1]/2, 80, logo[1], logo[2]);
canvas.renderRect(0, 380, 640, 20, "#000000");

return {
  setMessage(message){
    if(isOMORILaunched) return;
    canvas.clearXY(0, 300, 640, 355);
    if(message !== "") canvas.renderTextCenter(message, 320, 30, "KTEGAKI", "#000000", 6, "rgba(0,0,0,0.5)");
  },

  setSubMessage(message){
    if(isOMORILaunched) return;
    canvas.clearXY(0, 345, 640, 380);
    if(message !== "") canvas.renderTextCenter(message, 355, 20, "KTEGAKI", "#000000", 4, "rgba(0,0,0,0.5)");
  },

  setProgress(progress){
    if(isOMORILaunched) return;
    canvas.renderRect(5, 385, 630, 10, "#FFFFFF");
    canvas.renderRect(5, 385, Math.ceil(630 * progress / 100), 10, "#808080");
  },

  setOMORILaunched(){
    isOMORILaunched = true;
    canvas = null;
  },

  isOMORILaunched(){
    return isOMORILaunched;
  },

  render(){
    if(isOMORILaunched) return;

    chowloader.renderer.clear("white");
    
    canvas.render();

    if(firstDraw){
      firstDraw = false;
      for(let i = 0; i < 50; i++)
        chowloader.renderer.draw();
    }

    chowloader.renderer.draw();
  }
}
