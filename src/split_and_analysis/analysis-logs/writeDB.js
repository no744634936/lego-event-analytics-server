/**
 * @description 将统计结果写入数据库
 * @author zhang
 */

const { createEventsService } = require('../../model/analysisDatas')
const { yesterdayDate } = require('../utils/util')

/**
 * 将统计结果写入数据库
 * @param {object} result 统计结果，格式见 ./eventData.js
 */
async function writeDB(result = {}) {
    // 格式化数据，符合 model/analysisDatas.js 中的 schema 规范
    const keys = Object.keys(result)
    const dataList = keys.map(key => {
        return {
            eventKey: key,
            eventData: result[key],
            eventDate: yesterdayDate(), // 昨天，因为此时在计算昨天的日志
        }
    })

    // 写入数据库
    try {
        await createEventsService(dataList)
        console.log('日志分析入库成功')
    } catch (ex) {
        console.error('日志分析入库错误', ex)
    }
}

module.exports = writeDB
