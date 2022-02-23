'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var dom = require('./dom.js');

/**
 * Detects if the device has touch capabilities.
 */

function isTouchDevice() {
  return dom.canUseDOM && !!navigator.maxTouchPoints;
}
/**
 * Detects Apple device.
 */

function isApple() {
  if (!dom.canUseDOM) return false;
  return /mac|iphone|ipad|ipod/i.test(navigator.platform);
}
/**
 * Detects Safari browser.
 */

function isSafari() {
  return dom.canUseDOM && isApple() && /apple/i.test(navigator.vendor);
}
/**
 * Detects Firefox browser.
 */

function isFirefox() {
  return dom.canUseDOM && /firefox\//i.test(navigator.userAgent);
}
/**
 * Detects Mac computer.
 */

function isMac() {
  return dom.canUseDOM && navigator.platform.startsWith("Mac") && !isTouchDevice();
}

exports.isApple = isApple;
exports.isFirefox = isFirefox;
exports.isMac = isMac;
exports.isSafari = isSafari;
exports.isTouchDevice = isTouchDevice;
