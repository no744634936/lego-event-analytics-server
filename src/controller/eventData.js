/* eslint-disable default-param-last */
/**
 * @description 自定义事件数据 controller
 * @author zhanghaieng
 */

const { findEventsService } = require('../model/analysisDatas')
const {
    categoryOrActionEmptyFailInfo,
    startDateOrEndDateEmptyFailInfo,
} = require('../responseModel/failInfo/event')
const { ErrorRes, SuccessRes } = require('../responseModel/index')

/**
 * 获取事件统计数据
 * @param {object} data category, action, label, value
 * @param {string} startDate 开始日期
 * @param {string} endDate 结束日期
 */
async function getEventData(data = {}, startDate, endDate) {
    const { category, action, label, value } = data

    // 检验数据
    if (!category == null || !action) return new ErrorRes(categoryOrActionEmptyFailInfo)
    if (!startDate || !endDate) return new ErrorRes(startDateOrEndDateEmptyFailInfo)

    // 拼接查询条件
    // startDate 跟 endDate 不管是什么时区的时间都转换成世界标准时间，来从mongodb数据库里查找
    const start = new Date(`${startDate} 0:00:00`) // 注意这里new Date得出的是世界标准时间
    const end = new Date(`${endDate} 23:59:59`) // 注意这里new Date得出的是世界标准时间

    let eventKey = `${category}.${action}` // 'h5.pv'
    if (label) eventKey += `.${label}` // 'p5.pv.82'
    if (value) eventKey += `.${value}` // 'p5.pv.82.21'

    // 获取数据
    const result = await findEventsService(
        {
            eventKey,
        },
        start,
        end
    )
    return new SuccessRes(result)
}

module.exports = {
    getEventData,
}
