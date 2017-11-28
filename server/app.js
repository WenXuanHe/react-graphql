import Koa from 'koa'
import views from 'koa-views'
import json from 'koa-json'
import onerror from 'koa-onerror'
import koaBodyparser from 'koa-bodyparser'
import render from 'koa-swig'
import co from 'co'
import path from 'path'
import index from './router/index'
import cors from  '@koa/cors';

const app = new Koa();
const bodyparser = koaBodyparser();
const PORT = process.env.PORT || 5000;
console.log("PORT", PORT);
console.log("PID", process.pid);

// error handler
onerror(app);

app.context.render = co.wrap(render({
    root: path.resolve(__dirname + '/views'),
    autoescape: true,
    cache: 'memory',
    ext: 'html',
    writeBody: true
}));

app.use(cors());
// middlewares
app.use(bodyparser);
app.use(json());

app.use(require('koa-static')(path.resolve(__dirname, './', 'public')));
// app.use(historyFallback())
app.use(views(path.resolve(__dirname + '/views'), {
  extension: 'html'
}));

app.use(index.routes(), index.allowedMethods());
app.listen(PORT);
console.log('your koa server is running in ' + PORT);