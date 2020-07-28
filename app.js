const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const path = require('path')
const render = require('koa-art-template');

const index = require('./routes/index')
const users = require('./routes/users')
const errorViewRouter = require('./routes/view/error')

// error handler  添加一个重定向参数到onerror中
const onerrorConf = {
  redirect: '/error'
}
onerror(app,onerrorConf)

//配置模板引擎
render(app, {
  root: path.join(__dirname, 'views'),
  extname: '.ejs',
  debug: process.env.NODE_ENV !== 'production'
});
// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))

app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

/* app.use(views(__dirname + '/views', {
  extension: '.ejs'
})) */

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes 
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(errorViewRouter.routes(),errorViewRouter.allowedMethods())  //errorViewRouter必须放在最下方，因为程序从上往下执行，如果放在第一个位置，就会优先进入*这个路由，不符合逻辑
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
