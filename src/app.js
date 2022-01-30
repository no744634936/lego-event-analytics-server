const Koa = require('koa')
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const helmet = require('koa-helmet')
const cors = require('./middlewares/cors')
const { splitLogFileTimed, rmLogsTimed, analysisLogsTimed } = require('./split_and_analysis/index')
const index = require('./routes/index')
const users = require('./routes/users')

const app = new Koa()

splitLogFileTimed() // 定时拆分日志文件
rmLogsTimed() // 定时删除过期的日志文件
analysisLogsTimed() // 定时分析日志文件

// error handler
onerror(app)

// 安装预防，设置必要的 http 头
app.use(helmet())

// 支持跨域
app.use(cors)

// middlewares
app.use(
    bodyparser({
        enableTypes: ['json', 'form', 'text'],
    })
)
app.use(json())
app.use(logger())
app.use(require('koa-static')(`${__dirname}/public`))

app.use(
    views(`${__dirname}/views`, {
        extension: 'pug',
    })
)

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

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})

module.exports = app
