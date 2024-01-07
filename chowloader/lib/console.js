const ChowLoaderRenderer = require("$lib/renderer");

const whiteBg = new ChowLoaderRenderer(640, 480, "#ffffff");

let consoleOpacity = 1;

class ConsoleCommandBuilder {
  constructor(command, callback){
    this.name = command;
    this.callback = callback;
    this.args = [];
    this.persist = {};
  }

  setName(command){
    this.name = command;
    return this;
  }

  /* type: string, number, boolean, eval */
  addArg(name, type, optional = false){
    if(this.args.find(a => a.name === name)) return this;
    if(this.args[this.args.length-1] && this.args[this.args.length-1].optional) optional = true;
    this.args.push({name, type, optional});
    return this;
  }

  setPersist(name, value){
    this.persist[name] = value;
    return this;
  }

  setCallback(callback){
    this.callback = callback;
    return this;
  }
}

class VirtualKeyboard extends ChowLoaderRenderer {
  keys = [
    [{
      default: { text: "1", position: [39, 290], isSymbol: false },
      shifted: { text: "!", position: [39, 290], isSymbol: false },
      box: [22, 270, 66, 315]
    }, {
      default: { text: "2", position: [85, 290], isSymbol: false },
      shifted: { text: "@", position: [85, 290], isSymbol: false },
      box: [68, 270, 112, 315]
    }, {
      default: { text: "3", position: [131, 290], isSymbol: false },
      shifted: { text: "#", position: [131, 290], isSymbol: false },
      box: [114, 270, 158, 315]
    }, {
      default: { text: "4", position: [177, 290], isSymbol: false },
      shifted: { text: "$", position: [177, 290], isSymbol: false },
      box: [160, 270, 204, 315]
    }, {
      default: { text: "5", position: [223, 290], isSymbol: false },
      shifted: { text: "%", position: [223, 290], isSymbol: false },
      box: [206, 270, 250, 315]
    }, {
      default: { text: "6", position: [269, 290], isSymbol: false },
      shifted: { text: "^", position: [269, 290], isSymbol: false },
      box: [252, 270, 296, 315]
    }, {
      default: { text: "7", position: [315, 290], isSymbol: false },
      shifted: { text: "&", position: [315, 290], isSymbol: false },
      box: [298, 270, 342, 315]
    }, {
      default: { text: "8", position: [361, 290], isSymbol: false },
      shifted: { text: "*", position: [361, 290], isSymbol: false },
      box: [344, 270, 388, 315]
    }, {
      default: { text: "9", position: [407, 290], isSymbol: false },
      shifted: { text: "(", position: [407, 290], isSymbol: false },
      box: [390, 270, 434, 315]
    }, {
      default: { text: "0", position: [453, 290], isSymbol: false },
      shifted: { text: ")", position: [453, 290], isSymbol: false },
      box: [436, 270, 480, 315]
    }, {
      default: { text: "-", position: [499, 290], isSymbol: false },
      shifted: { text: "_", position: [499, 290], isSymbol: false },
      box: [482, 270, 526, 315]
    }, {
      default: { text: "=", position: [545, 290], isSymbol: false },
      shifted: { text: "+", position: [545, 290], isSymbol: false },
      box: [528, 270, 572, 315]
    }, {
      default: { text: "\u232B", position: [586, 290], isSymbol: true },
      shifted: { text: "\u232B", position: [586, 290], isSymbol: true },
      box: [574, 270, 618, 315]
    }], [{
      default: { text: "q", position: [39, 337], isSymbol: false },
      shifted: { text: "Q", position: [39, 337], isSymbol: false },
      box: [22, 317, 66, 362]
    }, {
      default: { text: "w", position: [85, 337], isSymbol: false },
      shifted: { text: "W", position: [85, 337], isSymbol: false },
      box: [68, 317, 112, 362]
    }, {
      default: { text: "e", position: [131, 337], isSymbol: false },
      shifted: { text: "E", position: [131, 337], isSymbol: false },
      box: [114, 317, 158, 362]
    }, {
      default: { text: "r", position: [177, 337], isSymbol: false },
      shifted: { text: "R", position: [177, 337], isSymbol: false },
      box: [160, 317, 204, 362]
    }, {
      default: { text: "t", position: [223, 337], isSymbol: false },
      shifted: { text: "T", position: [223, 337], isSymbol: false },
      box: [206, 317, 250, 362]
    }, {
      default: { text: "y", position: [269, 337], isSymbol: false },
      shifted: { text: "Y", position: [269, 337], isSymbol: false },
      box: [252, 317, 296, 362]
    }, {
      default: { text: "u", position: [315, 337], isSymbol: false },
      shifted: { text: "U", position: [315, 337], isSymbol: false },
      box: [298, 317, 342, 362]
    }, {
      default: { text: "i", position: [361, 337], isSymbol: false },
      shifted: { text: "I", position: [361, 337], isSymbol: false },
      box: [344, 317, 388, 362]
    }, {
      default: { text: "o", position: [407, 337], isSymbol: false },
      shifted: { text: "O", position: [407, 337], isSymbol: false },
      box: [390, 317, 434, 362]
    }, {
      default: { text: "p", position: [453, 337], isSymbol: false },
      shifted: { text: "P", position: [453, 337], isSymbol: false },
      box: [436, 317, 480, 362]
    }, {
      default: { text: "[", position: [499, 337], isSymbol: false },
      shifted: { text: "{", position: [499, 337], isSymbol: false },
      box: [482, 317, 526, 362]
    }, {
      default: { text: "]", position: [545, 337], isSymbol: false },
      shifted: { text: "}", position: [545, 337], isSymbol: false },
      box: [528, 317, 572, 362]
    }, {
      default: { text: "\u21E5", position: [588, 336], isSymbol: true },
      shifted: { text: "\u21E5", position: [588, 336], isSymbol: true },
      box: [574, 317, 618, 362]
    }], [{
      default: { text: "a", position: [39, 384], isSymbol: false },
      shifted: { text: "A", position: [39, 384], isSymbol: false },
      box: [22, 364, 66, 409]
    }, {
      default: { text: "s", position: [85, 384], isSymbol: false },
      shifted: { text: "S", position: [85, 384], isSymbol: false },
      box: [68, 364, 112, 409]
    }, {
      default: { text: "d", position: [131, 384], isSymbol: false },
      shifted: { text: "D", position: [131, 384], isSymbol: false },
      box: [114, 364, 158, 409]
    }, {
      default: { text: "f", position: [177, 384], isSymbol: false },
      shifted: { text: "F", position: [177, 384], isSymbol: false },
      box: [160, 364, 204, 409]
    }, {
      default: { text: "g", position: [223, 384], isSymbol: false },
      shifted: { text: "G", position: [223, 384], isSymbol: false },
      box: [206, 364, 250, 409]
    }, {
      default: { text: "h", position: [269, 384], isSymbol: false },
      shifted: { text: "H", position: [269, 384], isSymbol: false },
      box: [252, 364, 296, 409]
    }, {
      default: { text: "j", position: [315, 384], isSymbol: false },
      shifted: { text: "J", position: [315, 384], isSymbol: false },
      box: [298, 364, 342, 409]
    }, {
      default: { text: "k", position: [361, 384], isSymbol: false },
      shifted: { text: "K", position: [361, 384], isSymbol: false },
      box: [344, 364, 388, 409]
    }, {
      default: { text: "l", position: [407, 384], isSymbol: false },
      shifted: { text: "L", position: [407, 384], isSymbol: false },
      box: [390, 364, 434, 409]
    }, {
      default: { text: ";", position: [453, 384], isSymbol: false },
      shifted: { text: ":", position: [453, 384], isSymbol: false },
      box: [436, 364, 480, 409]
    }, {
      default: { text: "'", position: [499, 384], isSymbol: false },
      shifted: { text: "\"", position: [499, 384], isSymbol: false },
      box: [482, 364, 526, 409]
    }, {
      default: { text: "\\", position: [545, 384], isSymbol: false },
      shifted: { text: "|", position: [545, 384], isSymbol: false },
      box: [528, 364, 572, 409]
    }, {
      default: { text: "\u23CE", position: [588, 384], isSymbol: true },
      shifted: { text: "\u23CE", position: [588, 384], isSymbol: true },
      box: [574, 364, 618, 409]
    }], [{
      default: { text: "z", position: [39, 431], isSymbol: false },
      shifted: { text: "Z", position: [39, 431], isSymbol: false },
      box: [22, 411, 66, 456]
    }, {
      default: { text: "x", position: [85, 431], isSymbol: false },
      shifted: { text: "X", position: [85, 431], isSymbol: false },
      box: [68, 411, 112, 456]
    }, {
      default: { text: "c", position: [131, 431], isSymbol: false },
      shifted: { text: "C", position: [131, 431], isSymbol: false },
      box: [114, 411, 158, 456]
    }, {
      default: { text: "v", position: [177, 431], isSymbol: false },
      shifted: { text: "V", position: [177, 431], isSymbol: false },
      box: [160, 411, 204, 456]
    }, {
      default: { text: "b", position: [223, 431], isSymbol: false },
      shifted: { text: "B", position: [223, 431], isSymbol: false },
      box: [206, 411, 250, 456]
    }, {
      default: { text: "n", position: [269, 431], isSymbol: false },
      shifted: { text: "N", position: [269, 431], isSymbol: false },
      box: [252, 411, 296, 456]
    }, {
      default: { text: "m", position: [315, 431], isSymbol: false },
      shifted: { text: "M", position: [315, 431], isSymbol: false },
      box: [298, 411, 342, 456]
    }, {
      default: { text: ",", position: [361, 431], isSymbol: false },
      shifted: { text: "<", position: [361, 431], isSymbol: false },
      box: [344, 411, 388, 456]
    }, {
      default: { text: ".", position: [407, 431], isSymbol: false },
      shifted: { text: ">", position: [407, 431], isSymbol: false },
      box: [390, 411, 434, 456]
    }, {
      default: { text: "/", position: [453, 431], isSymbol: false },
      shifted: { text: "?", position: [453, 431], isSymbol: false },
      box: [436, 411, 480, 456]
    }, {
      default: { text: "`", position: [499, 431], isSymbol: false },
      shifted: { text: "~", position: [499, 431], isSymbol: false },
      box: [482, 411, 526, 456]
    }, {
      default: { text: "\u2423", position: [544, 431], isSymbol: true },
      shifted: { text: "\u2423", position: [544, 431], isSymbol: true },
      box: [528, 411, 572, 456]
    }, {
      default: { text: "\u21E7", position: [588, 431], isSymbol: true },
      shifted: { text: "\u21E7", position: [588, 431], isSymbol: true },
      box: [574, 411, 618, 456]
    }],
  ];

  isShifted = false;

  selectedKey = [0, 0];

  maxX = 13;
  maxY = 4;

  constructor(){
    super(640, 480, "rgba(0,0,0,0)");
    this.renderRect(20, 268, 600, 190, "rgba(0,0,0,0.9)");
    this.show = false;
  }

  moveLeft(){
    if(this.selectedKey[0] - 1 >= 0 && this.selectedKey[0] - 1 < this.maxX){
      this.selectedKey[0]--;
    }
  }

  moveRight(){
    if(this.selectedKey[0] + 1 >= 0 && this.selectedKey[0] + 1 < this.maxX){
      this.selectedKey[0]++;
    }
  }

  moveUp(){
    if(this.selectedKey[1] - 1 >= 0 && this.selectedKey[1] - 1 < this.maxY){
      this.selectedKey[1]--;
    }
  }

  moveDown(){
    if(this.selectedKey[1] + 1 >= 0 && this.selectedKey[1] + 1 < this.maxY){
      this.selectedKey[1]++;
    }
  }

  onPress = () => {};

  doAction(){
    if(this.selectedKey[0] === 12){
      if(this.selectedKey[1] === 0){
        this.onPress("bksp");
      } else if(this.selectedKey[1] === 1){
        this.onPress("tab");
      } else if(this.selectedKey[1] === 2){
        this.onPress("return");
      } else {
        this.isShifted = !this.isShifted;
      }
      return;
    } else if(this.selectedKey[0] === 11 && this.selectedKey[1] === 3){
      this.onPress(" ");
      return;
    }

    let key = this.keys[this.selectedKey[1]][this.selectedKey[0]];
    this.onPress(this.isShifted ? key.shifted.text : key.default.text);
  }

  render(){
    for(let y = 0; y < this.keys.length; y++){
      for(let x = 0; x < this.keys[y].length; x++){
        let key = this.keys[y][x];
        let letter = this.isShifted ? key.shifted : key.default;
        let color = (function(){
          if(this.selectedKey[0] === x && this.selectedKey[1] === y){
            return "rgba(0,0,0,0.8)";
          } else if(this.isShifted && letter.text === "\u21E7"){
            return "rgba(0,0,0,0.75)";
          } else {
            return "rgba(0,0,0,0.7)";
          }
        }).call(this);
        this.clearXY(...key.box, color);
        this.renderRectXY(...key.box, color);
        this.renderText(letter.text, letter.position[0], letter.position[1], 15, `./chowloader/assets/${letter.isSymbol ? "Inter" : "JetBrainsMono"}.ttf`, "#ffffff", 4, "rgba(0,0,0,0.20)");
      }
    }
    this.setAlpha(consoleOpacity);
    super.render();
  }
}

const vkbd = new VirtualKeyboard();

const charLimit = 66;

class Console extends ChowLoaderRenderer {
  heightNoVKBD = 432;
  heightWithVKBD = 237;
  heightInput = 20;
  vkbd = vkbd;

  constructor(){
    super(640, 480, "rgba(0,0,0,0)");
    this.show = false;
    vkbd.onPress = this.onAction.bind(this);
  }

  render(){
    this.clearAll();

    const height = vkbd.show ? this.heightWithVKBD : this.heightNoVKBD;
    this.renderRect(20, 22, 600, height + 4, "rgba(0,0,0,0.9)");
    this.clear(22, 24, 596, height - this.heightInput - 2);
    this.renderRect(22, 24, 596, height - this.heightInput - 2, "rgba(0,0,0,0.7)");
    this.clear(22, height + 4, 596, this.heightInput);
    this.renderRect(22, height + 4, 596, this.heightInput, "rgba(0,0,0,0.7)");

    this.renderLogs();
    this.renderCommand(height);

    this.setAlpha(consoleOpacity);
    super.render();
  }

  logs = [];
  _logsPos = 0;

  editableLog(color, text){
    if(text.length > charLimit) throw new Error("You can't do a realtime log greater than the charLimit");
    const proxy = new Proxy({}, {
      get(_, prop){
        if(prop === "text") return text;
        else if(prop === "color") return color;
      },
      set(_, prop, value){
        if(prop === "text" && value > charLimit) throw new Error("You can't set a realtime log greater than the charLimit");
        if(prop === "text"){
          if(value > charLimit) throw new Error("You can't set a realtime log greater than the charLimit");
          text = value;
        } else if(prop === "color"){
          color = value;
        }
        return true;
      }
    });
    this.logs.push(proxy);
    return proxy;
  }

  pushLog(color, text){
    for(let t of text.split("\n")){
      this._processText(color, t);
    }
  }

  _processText(color, text){
    if(text.length <= charLimit){
      this.logs.push({ color, text });
    } else {
      const words = text.split(" ");
      const lines = [];
      const line = [];
      for(let word of words){
        if(word.length > charLimit){
          if(line.length > 0){
            const start = word.substring(0, charLimit - line.join(" ").length - 1);
            if(start){
              lines.push(line.join(" ") + " " + start);
              word = word.substring(line.join(" ").length + 1);
            } else {
              lines.push(line.join(" "));
            }
            line.splice(0, line.length);
          }
          do {
            if(word.length > charLimit){
              lines.push(word.substring(0, charLimit));
              word = word.substring(charLimit);
            } else {
              line.push(word);
              word = '';
            }
          } while(word);
        } else {
          line.push(word);
          if(line.join(" ").length > charLimit){
            lines.push(line.slice(0, line.length - 1).join(" "));
            line.splice(0, line.length-1);
          }
        }
      }
      lines.push(line.join(" "));
      for(let l of lines){
        this.logs.push({ color, text: l });
      }
    }
  }

  get logsPos(){
    return this._logsPos;
  }

  set logsPos(val){
    const nLogs = vkbd.show ? 12 : 24;
    if(this.logs.length < nLogs) return this._logsPos = 0;
    if(val < 0) val = 0;
    if(val > this.logs.length - nLogs) val = this.logs.length - nLogs;
    this._logsPos = val;
  }

  renderLogs(){
    const nLogs = vkbd.show ? 12 : 24;
    let pos = this.logs.length - nLogs - this._logsPos;
    if(pos < 0) pos = 0;
    const compare = this.logs.length < nLogs ? this.logs.length : nLogs;
    for(let i = 0; i < compare; i++){
      this.renderText(this.logs[pos + i].text, 23, 30+17*i, 15, "./chowloader/assets/JetBrainsMono.ttf", this.logs[pos + i].color, 4, "rgba(0,0,0,0.20)");
    }
  }

  commands = [];

  addCommand(command){
    if(command instanceof ConsoleCommandBuilder && this.commands.indexOf(command) === -1) this.commands.push(command);
  }

  previousCommand = "";
  command = [];
  commandPos = 0;
  _cursorPos = 0;

  get cursorPos(){
    return this._cursorPos;
  }

  set cursorPos(val){
    if(val < 0) val = 0;
    if(val > this.command.length) val = this.command.length;
    const diff = val - this._cursorPos;
    this._cursorPos = val;
    if(diff === 0) return;
    else if((diff > 0 && this._cursorPos - this.commandPos > 62) ||
            (diff < 0 && this._cursorPos - this.commandPos + 1 <= 1)) this.commandPos += diff;
    if(this.commandPos < 0) this.commandPos = 0;
  }

  renderCommand(height){
    let command = this.command.join('');
    this.renderText("$ " + command.substring(this.commandPos, this.commandPos + 62), 30, 11 + height, 15, "./chowloader/assets/JetBrainsMono.ttf", "#ffffff", 4, "rgba(0,0,0,0.20)");
    if(command.split(" ").length === 1 && command){
      const _command = this.commands.find(c => c.name.startsWith(command));
      if(_command){
        const str = _command.name.substring(command.length);
        this.renderText(str, 48 + command.length * 9, 11 + height, 15, "./chowloader/assets/JetBrainsMono.ttf", "#b5b5b5", 4, "rgba(0,0,0,0.20)");
      }
    }
    if(vkbd.show && ~~(chowjs.time() * 2) % 2){
      this.renderRect(49 + (this._cursorPos - this.commandPos) * 9, height + 5, 4, 17, "#000000");
      this.renderRect(50 + (this._cursorPos - this.commandPos) * 9, height + 6, 2, 15, "#ffffff");
    }
  }

  enterCommand(text){
    if(!text.split(" ")[0]) return;
    const command = this.commands.find(c => c.name === text.split(" ")[0]);
    if(!command) return chowloader.logger.error(`Command(${text.split(" ")[0]}): This command doesn't exist.`);
    const strings = text.split(" ").slice(1).join(" ").split('"');
    const args = [];

    let adder = 0;
    for(let i = 0; i < strings.length - adder; i++){
      if(i % 2){
        let str = strings[i+adder];
        if(str.endsWith("\\")) (str = str.substring(0, str.length - 1), str += '"' + strings[i+adder+1], adder++);
        args.push(processAntiSlashes(str));
      } else {
        args.push(...strings[i+adder].split(" ").filter(s => s));
      }
    }

    const cArgs = {};
    for(let i = 0; i < command.args.length; i++){
      const cArg = command.args[i];
      const arg = args.splice(0, 1)[0];
      if(arg === undefined){
        if(!cArg.optional) return chowloader.logger.error(`Command(${command.name}): The argument ${cArg.name} is missing.`);
        else break;
      } if(cArg.type === "number"){
        cArgs[cArg.name] = Number(arg);
      } else if(cArg.type === "boolean"){
        cArgs[cArg.name] = arg === "true" || arg === "1";
      } else if(cArg.type === "eval"){
        cArgs[cArg.name] = Function(`return ${arg}`)();
      } else {
        cArgs[cArg.name] = arg;
      }
    }

    if(command.callback) command.callback(cArgs, command.persist, args, text);
  }

  onAction(key){
    switch(key){
      case "bksp":
        if(this.cursorPos - 1 !== -1)
          this.command.splice(--this.cursorPos, 1);
        break;
      case "tab":
        let tCommand = this.command.join('');
        if(tCommand && tCommand.split(" ").length === 1){
          const _command = this.commands.find(c => c.name.startsWith(tCommand));
          if(_command){
            let str = _command.name.substring(tCommand.length);
            this.command.push(...str, " ");
            this.cursorPos += str.length + 1;
          }
        } else if(!tCommand && this.previousCommand) {
          this.command.push(...this.previousCommand);
          this.cursorPos += this.previousCommand.length;
        }
        break;
      case "return":
        this.previousCommand = this.command.join('');
        this.command.splice(0, this.command.length);
        this.cursorPos = 0;
        this.enterCommand(this.previousCommand);
        break;
      default:
        this.command.splice(this.cursorPos, 0, key);
        this.cursorPos++;
    }
  }
}

const console = new Console();

let states = {buttons: [], axis: [
  { up: [false], down: [false], left: [false], right: [false] },
  { up: [false], down: [false], left: [false], right: [false] }
]};

function isButtonPressed(key, canRepeat = true){
  if(chowjs.gamepadConnected(0)){
    const actualState = chowjs.gamepadPressed(0, key);
    if(!states.buttons[key]) states.buttons[key] = [];
    const k = states.buttons[key];
    if(k[0] !== actualState){
      return (k[1] = actualState ? chowjs.time() : null, k[0] = actualState);
    }
    if(canRepeat && k[1]){
      const diff = chowjs.time() - k[1];
      const result = diff > 1 && ~~(diff * 20) % 2;
      if(k[3] !== result) return k[3] = result;
    }
  }
  return false;
}

function doesStickGoes(key, stick = 0, canRepeat = true){
  if(chowjs.gamepadConnected(0)){
    const axis = chowjs.gamepadGetAxis(0, stick * 2 + 1 * ['up', 'down'].includes(key));
    const actualState = ['up', 'right'].includes(key) ? axis > 0.75 : axis < -0.75;
    const k = states.axis[stick][key];
    if(k[0] !== actualState){
      return (k[1] = actualState ? chowjs.time() : null, k[0] = actualState);
    }
    if(canRepeat && k[1]){
      const diff = chowjs.time() - k[1];
      const result = diff > 1 && ~~(diff * 20) % 2;
      if(k[3] !== result) return k[3] = result;
    }
  }
  return false;
}

chowloader.on("update", () => {
  if(isButtonPressed(6, false)){
    console.show = !console.show;
    if(!console.show) chowloader.freezeGame = false;
  }
  if(console.show){
    if(isButtonPressed(7, false)){
      vkbd.show = !vkbd.show;
      console.logsPos = console.logsPos;
    } if(isButtonPressed(10, false)){
      chowloader.freezeGame = !chowloader.freezeGame;
    }

    if(doesStickGoes('right', 1)){
      console.cursorPos++;
    } if(doesStickGoes('left', 1)){
      console.cursorPos--;
    } if(isButtonPressed(11, false)){
      console.logsPos = 0;
    } if(doesStickGoes('up', 1)){
      console.logsPos--;
    } if(doesStickGoes('down', 1)){
      console.logsPos++;
    }

    if(vkbd.show){
      if(isButtonPressed(12)){
        vkbd.moveUp();
      } if(isButtonPressed(13)){
        vkbd.moveDown();
      } if(isButtonPressed(14)){
        vkbd.moveLeft();
      } if(isButtonPressed(15)){
        vkbd.moveRight();
      } if(isButtonPressed(1)){
        vkbd.doAction();
      }
    }
  }
});

chowloader.on("render_console", () => {
  chowloader.freezeGame && whiteBg.render();
  console.show && console.render();
  console.show && vkbd.show && vkbd.render();
});

// Generic commands

const opacityCommand = new ConsoleCommandBuilder("console_opacity", (args) => {
  if(isNaN(args.opacity)) return;
  if(args.opacity > 1) consoleOpacity = 1;
  else if(args.opacity < 0) consoleOpacity = 0;
  else consoleOpacity = args.opacity;
}).addArg("opacity", "number");

console.addCommand(opacityCommand);

let debug = false;

const setDebugCommand = new ConsoleCommandBuilder("set_debug", (args) => {
  chowjs.setDebug(debug = args.debug);
}).addArg("debug", "boolean");

const toggleDebugCommand = new ConsoleCommandBuilder("toggle_debug", () => {
  chowjs.setDebug(debug = !debug);
});

console.addCommand(setDebugCommand);
console.addCommand(toggleDebugCommand);

const evalCommand = new ConsoleCommandBuilder("eval", (cArgs, persist, args, originalCommand) => {
  Function(processAntiSlashes(originalCommand.split(" ").slice(1).join(" ")))();
});

console.addCommand(evalCommand);

function processAntiSlashes(str){
  return str.replace(/\\+[^\\]+/g, (text) => {
    let slashes = text.split("\\").slice(0, -1);
    let t = text.split("\\").slice(-1)[0];
    if(slashes.length % 2){
      return "\\".repeat((slashes.length-1)/2) + Function("return '\\"+t+"'")();
    } else {
      return "\\".repeat(slashes.length/2) + t;
    }
  })
}

function addConsoleCommand(command){
  return command.addCommand(command);
}

return {
  console,
  addConsoleCommand,
  ConsoleCommandBuilder
};