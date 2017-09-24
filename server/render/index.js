const fs = require('fs');
const path = require('path');
const render = require('./render').default; // eslint-disable-line

const paths = require('../../paths');

const template = fs.readFileSync(path.join(paths.build, 'index.html'), { encoding: 'utf-8' });

module.exports = (ctx) => {
  const location = ctx.path;
  const rendered = render(location);

  ctx.body = template.replace(
    '<div id="root"></div>',
    `<div id="root">${rendered}</div>`,
  );
};
