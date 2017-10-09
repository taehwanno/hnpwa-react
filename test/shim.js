import fetch from 'node-fetch';

global.fetch = fetch;

global.requestAnimationFrame = function (callback) {
  setTimeout(callback, 0);
};
