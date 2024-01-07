const cache = this.cache;
const __filename = this.filename.replace(/\\/g, "/");
const __dirname = [...__filename.split("/").slice(0, -1), ""].join("/");

function newRequire(filename){
  return Function(chowjs.loadFile(`chowloader/internal/require.js`)).call({ cache, filename });
}

function resolve(path){
  if(path.startsWith("./")) path = __dirname + path.substring(2);
  if(path.startsWith("/")) path = "." + path;

  if(path === "chowloader") path = "./chowloader/chowloader.js";
  if(path.startsWith("$lib")) path = path.replace("$lib", "./chowloader/lib");
  if(path.startsWith("internal/")) path = "./chowloader/"+path;

  if(!path.startsWith("./")) path = __dirname + path;

  if(!path.endsWith(".js")) path = path + ".js";
  return path;
}

function require(path){
  if(typeof path !== "string") return;
  try {
    const module = resolve(path);
    if(cache[module]) return cache[module];
    const req = newRequire(module);
    return cache[module] = Function("require, __dirname, __filename", chowjs.loadFile(module))(req, req.dirname, req.filename);
  } catch(e){
    chowjs.writeFile("save/require_error.txt", `${e.name} [${__filename}:${path}]: ${e.message}\n${e.stack}`);
  }
}

require.cache = cache;
require.resolve = resolve;
require.filename = __filename;
require.dirname = __dirname;
return require;
