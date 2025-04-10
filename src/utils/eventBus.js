import { reactive } from 'vue';

const listeners = reactive({});

export const eventBus = {
  $on(event, callback) {
    if (!listeners[event]) {
      listeners[event] = [];
    }
    listeners[event].push(callback);
  },

  $off(event, callback) {
    if (!listeners[event]) return;

    if (callback) {
      const index = listeners[event].indexOf(callback);
      if (index > -1) {
        listeners[event].splice(index, 1);
      }
    } else {
      listeners[event] = [];
    }
  },

  $emit(event, ...args) {
    if (listeners[event]) {
      listeners[event].forEach((callback) => {
        callback(...args);
      });
    }
  },
};
