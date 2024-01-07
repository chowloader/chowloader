function loadImage(path){
  if(!chowloader.natives.assets.loadImage(path)){
    throw new MediaError("An error occured while loading the image " + path);
  };
}

function loadImageSync(path){
  loadImage(path);
  const image = chowjs.getImage(path)[0];
  while(!chowjs.imageReady(image));
}

function loadAudio(path){
  if(!chowloader.natives.assets.loadAudio(path)){
    throw new MediaError("An error occured while loading the audio " + path);
  };
}

function loadAudioSync(path){
  loadAudio(path);
  while(!chowjs.createAudio(path, false, 0));
}

function isImageLoaded(path){
  return chowjs.imageReady(path);
}

function isAudioLoaded(path){
  return chowjs.createAudio(path) !== null;
}

return {
  loadImage,
  loadImageSync,
  loadAudio,
  loadAudioSync,
  isImageLoaded,
  isAudioLoaded
}
