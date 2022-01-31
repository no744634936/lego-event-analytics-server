/**
 * @description 事件统计接口
 * @author zhanghaifeng
 */

const { get } = require('./_server')

describe('事件统计结果', () => {
    test('事件统计结果', async () => {
        // 测试环境下，无法知道哪个时间段有数据，就可以随便写一个时间段
        const url = '/api/event?category=h5&action=pv&startDate=2020-10-01&endDate=2021-03-01'
        const { errno, data } = await get(url)

        // 无论日期范围内有没有数据，errno 都是 0 ，data 都是数组
        expect(errno).toBe(0)
        expect(Array.isArray(data)).toBe(true)
    })
})
