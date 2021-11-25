/*
 * @Descripttion: 
 * @Author: JayShen
 * @Date: 2021-10-27 17:18:26
 * @LastEditors: JayShen
 * @LastEditTime: 2021-11-25 14:11:14
 */
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const mongoConnect = require('./db')
const cors = require('koa2-cors')
const koaJwt = require('koa-jwt') //路由权限控制
// 连接数据库
mongoConnect()

const users = require('./routes/users')
const upload = require('./routes/upload')
const article = require('./routes/article')
app.use(cors())
// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// jwt
app.use(koaJwt({
  secret: 'jianshu-server-jwt'
}).unless({
  // 排除jwt验证路由
  path: [/^\/users\/login/, /^\/users\/reg/]
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(users.routes(), users.allowedMethods())
app.use(upload.routes(), upload.allowedMethods())
app.use(article.routes(), article.allowedMethods())
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app