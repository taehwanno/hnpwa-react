/**
 * Flatten nested comments
 *
 * @param {Object} data
 * @param {Number} data.id - Hacker news item id
 * @param {Array<Object>} data.comments - comments array
 * @return {Array<Object>} flattened comments
 */
function flattenComments(data) {
  let results = [];
  let iterables = [
    { parent: data.id, comments: data.comments },
  ];

  while (iterables.length !== 0) {
    results = iterables.map(
      iterable => iterable.comments.map(
        comment => ({
          ...comment,
          comments: comment.comments.map(v => v.id),
          parent: iterable.parent,
        }),
      ),
    ).reduce((prev, next) => next.concat(prev), results);

    iterables = iterables.map(
      iterable => iterable.comments.map(
        children => ({ parent: children.id, comments: children.comments }),
      ),
    ).reduce((prev, next) => next.concat(prev), []);
  }

  return results;
}

export default flattenComments;
