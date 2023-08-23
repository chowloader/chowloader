chowloader.assets.loadImage("./chowloader/assets/logo.png");

Function(chowjs.loadFile(`chowloader/components/require.js`)).call({
  cache: {},
  filename: "./full.js"
})("chowloader");

throw new Error();