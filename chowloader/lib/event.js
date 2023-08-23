return class Event {
  _events = [];

  on(type, listener){
    if(!type || !listener) return;
    if(!this._events[type]) this._events[type] = [];
    this._events[type].push({
      once: false,
      type,
      listener
    });
  }

  addListener(type, listener){
    return this.on(type, listener);
  }

  prependListener(type, listener){
    if(!type || !listener) return;
    if(!this._events[type]) this._events[type] = [];
    this._events[type].splice(0, 0, {
      once: false,
      type,
      listener
    });
  }

  once(type, listener){
    if(!type || !listener) return;
    if(!this._events[type]) this._events[type] = [];
    this._events[type].push({
      once: true,
      type,
      listener
    });
  }

  prependOnceListener(type, listener){
    if(!type || !listener) return;
    if(!type || !listener || !this._events[type]) this._events[type] = [];
    this._events[type].splice(0, 0, {
      once: true,
      type,
      listener
    });
  }

  off(type, listener){
    if(!type || !listener || !this._events[type]) return;
    const events = this._events[type].filter(e => e.listener === listener);
    if(event.length === 0) return;
    for(const event of events){
      this._events[type].splice(this._events[type].indexOf(event), 1);
    }
    if(this._events[type].length === 0) delete this._events[type];
  }

  removeListener(type, listener){
    return this.off(type, listener);
  };

  removeAllListeners(type){
    if(type){
      if(!this._events[type]) return;
      delete this._events[type];
      return;
    }
    this._events = [];
    return;
  }

  emit(type, ...args){
    if(!type || !this._events[type]) return;
    for(const event of this._events[type]){
      event.listener(...args);
      if(event.once) this._events[type].splice(this._events[type].indexOf(event), 1);
    }
  }

  eventNames(){
    return Object.keys(this._events);
  }

  listenerCount(type, listener){
    if(!type || !this._events[type]) return 0;
    if(listener)
      return this._events[type].filter(e => e.listener === listener).length;
    return this._events[type].length;
  }

  listeners(type){
    if(!type || !this._events[type]) return [];
    return this._events[type].map(e => e.listener);
  }

  static getEventListeners(self, type){
    if(!type || !self._events[type]) return;
    return self._events[type];
  }
}