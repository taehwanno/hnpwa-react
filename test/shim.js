import fetch from 'node-fetch';

global.fetch = fetch;

global.requestAnimationFrame = function raf(callback) {
  setTimeout(callback, 0);
};
