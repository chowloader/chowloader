const req_func = Function(chowjs.loadFile(`chowloader/internal/require.js`));

req_func.call({
  cache: {},
  filename: "./full.js",
  req_func
})("chowloader");

throw new Error();