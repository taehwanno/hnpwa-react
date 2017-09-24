const Koa = require('koa');
const serve = require('koa-static');

const app = new Koa();
const paths = require('../paths');
const render = require('./render');

app.use((ctx, next) => {
  if (ctx.path === '/') return render(ctx);
  return next();
});

app.use(serve(paths.build));
app.use(render);

app.listen(3000);
