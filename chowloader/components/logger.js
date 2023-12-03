class Logger {
  console = require("$components/console").console;

  debug(text){
    this.console.pushLog("#5ba432", text);
  }

  log(text){
    this.console.pushLog("#ffffff", text);
  }

  warn(text){
    this.console.pushLog("#e5c73e", text);
  }

  info(text){
    this.console.pushLog("#5ba432", text);
  }

  verbose(text){
    this.console.pushLog("#5ba432", text);
  }

  error(text){
    this.console.pushLog("#dd3b46", text);
  }

  critical(text){
    this.console.pushLog("#dd3b46", text);
  }

  custom(color, text){
    this.console.pushLog(color, text);
  }

  editable(color, text){
    return this.console.editableLog(color, text);
  }
}

return new Logger();