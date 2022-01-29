/**
 * @description 分析日志 入口
 * @author zhang haifeng
 */
const fse = require('fs-extra')
const { CronJob } = require('cron')

const splitLogFile = require('./split-log-file/index')
const { accessLogPath } = require('../config/index')

// 判断 accessLogPath 是否存在，
// 也就是判断存放access.log,error.log的文件夹是否存在
// 读取 accessLogPath 的内容
const accessLogPathFiles = fse.readdirSync(accessLogPath)
console.log('accessLogPath 是否存在', accessLogPath, fse.pathExistsSync(accessLogPath))
console.log('accessLogPath 自文件', accessLogPathFiles)

/**
 * 定时任务 函数，上一个分支的demo有演示
 * @param {string} cronTime cron 规则
 * @param {Function} callback 回调函数
 */
function schedule(cronTime, callback) {
    if (!cronTime) return
    if (typeof callback !== 'function') return

    // 创建定时任务
    const c = new CronJob(
        cronTime,
        callback,
        null, // onComplete 何时停止任务，null
        true, // 初始化之后立刻执行，否则要执行 c.start() 才能开始
        'Asia/Tokyo' //  'Asia/Shanghai' 时区，重要！！电脑，服务器是哪个时区，这里就设置为哪个时区
    )

    // 进程结束时，停止定时任务
    process.on('exit', () => c.stop())
}

/**
 * 定时拆分日志文件
 */
function splitLogFileTimed() {
    const cronTime = '0 22 14 * * *' // 每天的 0:00:00 拆分日志
    schedule(cronTime, splitLogFile)  //splitLogFile 方法定义了如何拆分日志
    console.log('定时拆分日志文件', cronTime)
}

module.exports = {
    splitLogFileTimed
}
