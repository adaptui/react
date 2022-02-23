import { canUseDOM } from './dom.js';

/**
 * Detects if the device has touch capabilities.
 */

function isTouchDevice() {
  return canUseDOM && !!navigator.maxTouchPoints;
}
/**
 * Detects Apple device.
 */

function isApple() {
  if (!canUseDOM) return false;
  return /mac|iphone|ipad|ipod/i.test(navigator.platform);
}
/**
 * Detects Safari browser.
 */

function isSafari() {
  return canUseDOM && isApple() && /apple/i.test(navigator.vendor);
}
/**
 * Detects Firefox browser.
 */

function isFirefox() {
  return canUseDOM && /firefox\//i.test(navigator.userAgent);
}
/**
 * Detects Mac computer.
 */

function isMac() {
  return canUseDOM && navigator.platform.startsWith("Mac") && !isTouchDevice();
}

export { isApple, isFirefox, isMac, isSafari, isTouchDevice };
