const { console } = require("$lib/console");

return {
  debug(text){
    console.pushLog("#5ba432", text);
  },

  log(text){
    console.pushLog("#ffffff", text);
  },

  warn(text){
    console.pushLog("#e5c73e", text);
  },

  info(text){
    console.pushLog("#5ba432", text);
  },

  verbose(text){
    console.pushLog("#5ba432", text);
  },

  error(text){
    console.pushLog("#dd3b46", text);
  },

  critical(text){
    console.pushLog("#dd3b46", text);
  },

  custom(color, text){
    console.pushLog(color, text);
  },

  editable(color, text){
    return console.editableLog(color, text);
  }
}
