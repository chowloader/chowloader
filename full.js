const req_script = chowjs.loadFile(`chowloader/internal/require.js`);

Function(req_script).call({
  cache: {},
  filename: "./full.js",
  req_script
})("chowloader");

throw new Error();