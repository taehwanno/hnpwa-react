/* global ga */

/**
 * Creates a ga() proxy function that calls commands on all passed trackers.
 * @param {!Array} trackers an array or objects containing the `name` and
 *     `trackingId` fields.
 * @return {!Function} The proxied ga() function.
 */
export default function createGaProxy(trackers) {
  return function gaProxy(command, ...args) {
    // eslint-disable-next-line
    for (const { name } of trackers) {
      if (typeof command === 'function') {
        ga(() => {
          command(ga.getByName(name));
        });
      } else {
        ga(`${name}.${command}`, ...args);
      }
    }
  };
}
