//sudo apt install ffmpeg
//ffmpeg -re -i 20180607_144927.mp4 -c copy -f flv rtmp://localhost/live/a
const koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');
const co = require('co');
const render = require('koa-swig');
const dotenv = require('dotenv').load();

const app = new koa();
const router = Router();

app.use(logger());
app.use(bodyParser());
app.use(serve(__dirname+'/views'));
app.use(router.routes());

app.context.render = co.wrap(render({
  root: __dirname + '/views',
  autoescape: true,
  cache: 'memory',
  ext: 'html',
}));

app.use(logger());
app.use(serve('./views'));
app.use(serve('./public'));

router.get('/',home);
router.get('/socket',socket);

async function home(ctx){
  ctx.body = await ctx.render('home',{data:'Hello RTMP'});
}

async function socket(ctx){
  ctx.body = await ctx.render('socket',{data:'Hello RTMP'});
}

app.listen(3000);
console.log('listening on port 3000');