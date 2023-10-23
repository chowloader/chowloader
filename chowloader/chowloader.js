const Event = require("$lib/event");
const ChowLoaderSplash = require("$components/splash");

const natives = globalThis.chowloader;
  
class ChowLoader extends Event {
  natives = natives;
  renderer = natives.renderer;
  aot = natives.aot;
  thread = natives.thread;
  assets = natives.assets;
  splash = new ChowLoaderSplash();
  logs = [];

  constructor(){
    super();
    this.aot.jsaots = [];
    this.aot.jsvals = [];
    this.on("update", natives.executeJobs);
  }
}

globalThis.chowloader = new ChowLoader();

chowloader.assets.isImageLoaded = function(path){
  return chowjs.imageReady(path);
}

chowloader.assets.isAudioLoaded = function(path){
  return chowjs.createAudio(path) !== null;
}

chowloader.splash.setMessage("Initialization...");
chowloader.splash.render();

const _print = globalThis.print;
globalThis.print = function print(...args){
  chowloader.logs.push(args);

  if(!chowloader.splash.isOMORILaunched()){
    chowloader.splash.setProgress(5 + Math.min(25, (chowloader.logs.length / 179) * 25));
    chowloader.splash.setSubMessage(String(args));
    chowloader.splash.render();
  }

  return _print.call(this, ...args);
}

chowloader.on("omori_loaded", () => {
  function hookFunc(func, event){
    const _func = globalThis[func];
    globalThis[func] = function(...args){
      const ret = _func(...args);
      chowloader.emit(event);
      return ret;
    }
  }

  hookFunc("chowjsUpdate", "update") // chowjsUpdate(int updated = 1) : always 1, every js loop
  hookFunc("chowjsRender", "render") // chowjsRender() : every draw on the screen
  hookFunc("chowjsDebugdraw", "debugdraw") // chowjsDebugdraw() : never used
  hookFunc("onKeyDown", "keydown") // onKeyDown(int key) :  on key down
  hookFunc("onKeyUp", "keyup") // onKeyUp(int key) : on key up
  hookFunc("onTouchStart", "touchstart") // onTouchStart(int x, int y) : on screen touch/click down
  hookFunc("onTouchMove", "touchmove") // onTouchMove(int x, int y) : on screen touch/click move
  hookFunc("onTouchEnd", "touchend") // onTouchEnd(int x, int y) : on screen touch/click up

  chowloader.splash.setMessage("AOT Initialization...");
  chowloader.splash.setSubMessage("");
});

chowloader.on("aot_object", obj => {
  if(obj.type === "jsaot"){
    chowloader.aot.jsaots.push(obj);
  } else {
    chowloader.aot.jsvals.push(obj);
  }

  const len = chowloader.aot.jsaots.length + chowloader.aot.jsvals.length;

  if(!chowloader.splash.isOMORILaunched() && len % 200 === 0){
    chowloader.splash.setProgress(30 + Math.min(40, 40 * len / 5584));
    chowloader.splash.setSubMessage(obj.path);
    chowloader.splash.render();
  }
});

chowloader.on("aot_loaded", () => {
  chowloader.splash.setMessage("Loading JS native offsets...");
  chowloader.splash.setSubMessage("");
  chowloader.splash.setProgress(70);
  chowloader.splash.render();

  const len = chowloader.aot.jsvals.length;

  for(let i = 0; i < len; i++){
    try {
      chowloader.aot.jsvals[i].offset = chowloader.aot.find(len, chowloader.aot.jsvals[i].object);
    } catch(e){
      chowloader.aot.jsvals[i].corrupted = true;
    }

    if(i % 100 === 0){
      chowloader.splash.setProgress(70 + Math.min(30, 30 * i / len));
      chowloader.splash.setSubMessage(chowloader.aot.jsvals[i].path);
      chowloader.splash.render();
    }
  }

  chowloader.aot.jsvals = chowloader.aot.jsvals.filter(c => c.corrupted);

  chowloader.splash.setMessage("Loading OMORI...")
  chowloader.splash.setSubMessage("");
  chowloader.splash.setProgress(100);
  chowloader.splash.render();

  chowloader.splash.setOMORILaunched();
});

chowloader.splash.setMessage("OMORI Initialization...");
chowloader.splash.setProgress(5);
chowloader.splash.render();

return chowloader;