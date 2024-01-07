const nativesAssets = chowloader.natives.assets;

function internalLoadImage(path){
  if(!nativesAssets.isImagePreloaded(path) && !nativesAssets.loadImage(path)){
    throw new MediaError("An error occured while loading the image " + path);
  }
}

function internalLoadAudio(path){
  if(!nativesAssets.isAudioPreloaded(path) && !nativesAssets.loadAudio(path)){
    throw new MediaError("An error occured while loading the image " + path);
  }
}

function loadImageCb(path, cb){
  if(typeof cb !== 'function') cb = () => {};
  internalLoadImage(path);

  if(!nativesAssets.isImageLoaded(path)){
    function resolveIfLoaded(){
      if(nativesAssets.isImageLoaded(path)){
        return cb(chowjs.getImage(path));
      }
      chowloader.nextTick(resolveIfLoaded);
    }
    chowloader.nextTick(resolveIfLoaded);
  } else {
    cb(chowjs.getImage(path));
  }
}

function loadImage(path){
  return new Promise(loadImageCb.bind(null, path));
}

function loadImageSync(path, shouldReturn = true){
  internalLoadImage(path);
  while(!nativesAssets.isImageLoaded(path));
  if(shouldReturn) return chowjs.getImage(path);
}

function loadAudioCb(path, loop, playingOffset, cb){
  if(typeof cb !== 'function') cb = () => {};
  internalLoadAudio(path);

  if(!nativesAssets.isAudioLoaded(path)){
    function resolveIfLoaded(){
      if(nativesAssets.isAudioLoaded(path)){
        return cb(chowjs.createAudio(path, loop, playingOffset));
      }
      chowloader.nextTick(resolveIfLoaded);
    }
    chowloader.nextTick(resolveIfLoaded);
  } else {
    cb(chowjs.createAudio(path, loop, playingOffset));
  }
}

function loadAudio(path, loop, playingOffset){
  return new Promise(loadAudioCb.bind(null, path, loop, playingOffset));
}

function loadAudioSync(path, loop, playingOffset, shouldReturn = true){
  internalLoadAudio(path);
  while(!nativesAssets.isAudioLoaded(path));
  if(shouldReturn) return chowjs.createAudio(path, loop, playingOffset);
}

function isImageLoaded(path){
  return nativesAssets.isImageLoaded(path);
}

function isAudioLoaded(path){
  return nativesAssets.isAudioLoaded(path);
}

return {
  internalLoadImage,
  loadImage,
  loadImageCb,
  loadImageSync,
  internalLoadAudio,
  loadAudio,
  loadAudioCb,
  loadAudioSync
}
