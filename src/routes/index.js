const router = require('koa-router')()
const EventModel = require('../dbTables/eventModel')
const { ENV } = require('../utils/env')
const packageInfo = require('../../package.json')

router.get('/', async (ctx, next) => {
    await ctx.render('index', {
        title: 'Hello Koa 2!',
    })
})

router.get('/string', async (ctx, next) => {
    ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
    ctx.body = {
        title: 'koa2 json',
    }
})

// 测试数据库连接
router.get('/api/db-check', async (ctx, next) => {
    // 测试 mongodb 连接
    let mongodbConn
    try {
        mongodbConn = true
        await EventModel.findOne()
    } catch (ex) {
        mongodbConn = false
    }

    ctx.body = {
        errno: 0,
        data: {
            name: 'event analytics sever',
            version: packageInfo.version,
            ENV,
            mongodbConn,
        },
    }
})

module.exports = router
