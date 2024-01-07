Function(chowjs.loadFile(`chowloader/internal/require.js`)).call({
  cache: {},
  filename: "./full.js"
})("chowloader");

throw new Error();