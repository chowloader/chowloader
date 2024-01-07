return class AssetsLoader {
  loadImage(path){
    if(!chowloader.natives.assets.loadImage(path)){
      throw new MediaError("An error occured while loading the image " + path);
    };
  }

  loadImageSync(path){
    this.loadImage(path);
    const image = chowjs.getImage(path)[0];
    while(!chowjs.imageReady(image));
  }

  loadAudio(path){
    if(!chowloader.natives.assets.loadAudio(path)){
      throw new MediaError("An error occured while loading the audio " + path);
    };
  }

  loadAudioSync(path){
    this.loadAudio(path);
    while(!chowjs.createAudio(path, false, 0));
  }
}