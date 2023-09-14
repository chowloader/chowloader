const assetpath = "./chowloader/assets/";

let images = chowjs.readDir(assetpath).filter(f => f.endsWith(".png"));
for(let image of images){
  chowloader.assets.loadImage(assetpath + image);
}
let audios = chowjs.readDir(assetpath).filter(f => f.endsWith(".ogg"));
for(let audio of audios){
  chowloader.assets.loadAudio(assetpath + audio);
}

Function(chowjs.loadFile(`chowloader/components/require.js`)).call({
  cache: {},
  filename: "./full.js"
})("chowloader");

throw new Error();