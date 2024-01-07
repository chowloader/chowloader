const Event = require("$lib/event");

class ChowLoader extends Event {
  natives = chowloader;
  renderer = chowloader.renderer;
  aot = chowloader.aot;
  thread = chowloader.thread;
  nextTick = chowloader.nextTick;
  freezeGame = false;
}

globalThis.chowloader = new ChowLoader();

const splash = require("internal/splash");
splash.setMessage("Initialization...");
splash.setProgress(0);
splash.render();

chowloader.logger = require("$lib/logger");

chowloader.on("error", (e) => {
  chowloader.logger.error(`${e.name}: ${e.message}${e.stack ? "\n" + e.stack.trimEnd() : ""}`);
});

let printLength = 0;

const _print = globalThis.print;
globalThis.print = function print(...args){
  const output = String(args.map(a => {
    if(typeof a === "undefined") a = "undefined";
    if(typeof a === "null") a = "null";
    return a;
  }));
  chowloader.logger.debug(output);

  printLength++;

  if(!splash.isOMORILaunched()){
    splash.setProgress(5 + Math.min(25, (printLength / 179) * 25));
    splash.setSubMessage(output);
    splash.render();
  }

  return _print.call(this, ...args);
}

chowloader.on("omori_loaded", () => {
  function hookFunc(func, event){
    const _func = globalThis[func];
    globalThis[func] = function(...args){
      function emit(){
        chowloader.emit(event);
        if(event == "render")
          chowloader.emit("render_console");
      }
      if(!chowloader.freezeGame){
        const ret = _func(...args);
        emit();
        return ret;
      }
      emit();
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

  splash.setMessage("AOT Initialization...");
  splash.setSubMessage("");
});

chowloader.aot.jsaots = [];
chowloader.aot.jsvals = [];

chowloader.on("aot_object", obj => {
  if(obj.type === "jsaot"){
    chowloader.aot.jsaots.push(obj);
  } else {
    chowloader.aot.jsvals.push(obj);
  }

  const len = chowloader.aot.jsaots.length + chowloader.aot.jsvals.length;

  if(!splash.isOMORILaunched() && len % 200 === 0){
    splash.setProgress(30 + Math.min(40, 40 * len / 5584));
    splash.setSubMessage(obj.path);
    splash.render();
  }
});

chowloader.on("aot_loaded", () => {
  splash.setMessage("Loading JS native offsets...");
  splash.setSubMessage("");
  splash.setProgress(70);
  splash.render();

  const len = chowloader.aot.jsvals.length;

  for(let i = 0; i < len; i++){
    try {
      chowloader.aot.jsvals[i].offset = chowloader.aot.find(len, chowloader.aot.jsvals[i].object);
    } catch(e){
      chowloader.aot.jsvals[i].corrupted = true;
    }

    if(i % 100 === 0){
      splash.setProgress(70 + Math.min(30, 30 * i / len));
      splash.setSubMessage(chowloader.aot.jsvals[i].path);
      splash.render();
    }
  }

  chowloader.aot.jsvals = chowloader.aot.jsvals.filter(c => c.corrupted);

  splash.setMessage("Loading OMORI...")
  splash.setSubMessage("");
  splash.setProgress(100);
  splash.render();

  splash.setOMORILaunched();
});

chowloader.on("update", chowloader.natives.executeJobs);

splash.setMessage("OMORI Initialization...");
splash.setProgress(5);
splash.render();

return chowloader;