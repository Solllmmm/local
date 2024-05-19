window.eventBus = {
  listeners: {},

  emit(eventName, data) {
    (this.listeners[eventName] || []).forEach((callback) => {
      callback(data);
    });
  },

  on(eventName, callback) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(callback);
  }
};