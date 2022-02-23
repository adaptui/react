'use strict';

var react = require('react');

function createGlobalTooltipState() {
  return {
    activeRef: null,
    listeners: new Set(),

    subscribe(listener) {
      this.listeners.add(listener);
      return () => {
        this.listeners.delete(listener);
      };
    },

    show(ref) {
      this.activeRef = ref;
      this.listeners.forEach(listener => listener(ref));
    },

    hide(ref) {
      if (this.activeRef === ref) {
        this.activeRef = null;
        this.listeners.forEach(listener => listener(null));
      }
    }

  };
}
const TooltipContext = /*#__PURE__*/react.createContext(undefined);

exports.TooltipContext = TooltipContext;
exports.createGlobalTooltipState = createGlobalTooltipState;
