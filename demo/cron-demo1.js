/**
 * @description cron-node demo
 * @author zhang
 */

/**
    通用的定时表达式规则：
    * 号的含义就是 每~

    *    *    *    *    *    *
    ┬    ┬    ┬    ┬    ┬    ┬
    │    │    │    │    │    │
    │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)  一周的每一天
    │    │    │    │    └───── month (1 - 12)                       每个月
    │    │    │    └────────── day of month (1 - 31)                一个月的每一天
    │    │    └─────────────── hour (0 - 23)                        每小时
    │    └──────────────────── minute (0 - 59)                      每一分
    └───────────────────────── second (0 - 59, OPTIONAL)            每一秒 **【注意】linux crontab 不支持秒**
 */

const path = require('path')
const { CronJob } = require('cron')

/**
 * 开始定时任务
 * @param {string} cronTime cron 规则
 * @param {Function} onTick 回调函数
 */
function schedule(cronTime, onTick) {
    if (!cronTime) return
    if (typeof onTick !== 'function') return

    // 创建定时任务
    const c = new CronJob(
        cronTime,
        onTick,
        null, // onComplete 何时停止任务，null
        true, // 初始化之后立刻执行，否则要执行 c.start() 才能开始
        'Asia/Shanghai' // 时区，重要！！
    )

    // 进程结束时，停止定时任务
    process.on('exit', () => c.stop())
}

function main() {
    // 打印当前时间
    function fn() {
        console.log(`当前时间 ${Date.now()}`)
    }

    // const cronTime = '10 * * * * *' // 表示每10秒执行一次
    // const cronTime = '* 2 * * * *' // 表示每两分中执行一次

    const cronTime = '* * * * * *' // 表示每一秒执行一次
    schedule(cronTime, fn)    // 每秒钟打印一次当前时间
}

main()
