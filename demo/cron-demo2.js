/**
 * @description cron demo2 
 * @author zhang
 */


const path = require('path')
const fse = require('fs-extra')
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

    // 写入文档，以证明：nodejs 进程停止之后，定时任务也立即停止，
    // node cron-demo2.js 执行这个文件就向files/a.txt 里写入时间
    // 不执行这个文件就不向files/a.txt 里写入时间
    function fn() {
        const txt = `当前时间 ${Date.now()}`
        const filePath = path.join(__dirname, 'files', 'a.txt')
        fse.outputFileSync(
            filePath,
            txt + '\n',
            { flag: 'a' }
        )
        console.log(`已写入文件：${txt}`)
    }

    const cronTime = '* * * * * *' 
    schedule(cronTime, fn)    //每秒钟向files/a.txt 里写入一次时间
}
main()
