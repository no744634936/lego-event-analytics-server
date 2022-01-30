/**
 * @description 分析日志
 * @author zhang
 */

 const fs = require('fs')
 const path = require('path')
 const readline = require('readline')
 const _ = require('lodash')
 const fse = require('fs-extra')
 const { accessLogPath } = require('../../config/index')    // '/Users/zhanghaifeng/Projects_logs/nginx_logs/event_analytics/'
 const { genYesterdayLogFileName, formatNow } = require('../utils/util')
 const { DIST_FOLDER_NAME } = require('../config/const')    //'logs_by_day'
 const EventData = require('./eventData') 
 // 统计结果
 const eventData = new EventData()
 
 /**
  * 从一行日志中找到 query
  * @param {string} line log line
  * @returns {object} query object
  */
 
 
  // line 的例子
  // 127.0.0.1 - - [29/Jan/2022:21:48:23 +0900] "GET /event.png?category=h5&action=pv&label=45&value=23 HTTP/1.1" 304 0 "-" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36" "-"
  function getQueryFromLogLine(line = '') {
     // 获取 url 格式是 `/event.png?xxx` 的 query 部分，即 category=h5&action=pv&label=45&value=23
     const reg = /GET\s\/event.png\?(.+?)\s/
     const matchResult = line.match(reg)
     if (matchResult == null) return {} // url 格式不符合
 
     const queryStr = matchResult[1]
     if (typeof queryStr !== 'string') return {} // 找不到 query
 
    const query= new URLSearchParams(queryStr)    //{ 'category' => 'h5', 'action' => 'pv', 'labe1' => '45', 'value' => '23' }
    const queryObject=Object.fromEntries(query)    //{ category: 'h5', action: 'pv', labe1: '45', value: '23' }
    return queryObject
 }
 
 /**
  * 分析日志文件，结果入库
  * 为什么要容promise包裹？ 因为要取出callback函数里的result必须要用resolve才能取出来
  */
 function analysisLogs() {
    return new Promise((resolve, reject) => {

        console.log('----------- 分析日志并入库 开始 -----------')
        console.log('当前的时间', formatNow())
    
        // 日志文件
        const logFile = path.join(accessLogPath, DIST_FOLDER_NAME, genYesterdayLogFileName())
        fse.ensureFileSync(logFile) // 如果该文件没有，则创建一个空的，以免程序运行报错
        console.log('1.日志文件', logFile)
    
        // 逐行读取日志文件。注意，必须使用 stream readline 逐行读取，不能直接使用readFile一次性读取
        const readStream = fs.createReadStream(logFile)
        const rl = readline.createInterface({
            input: readStream,
        })
        console.log('2.开始逐行读取')
        rl.on('line', line => {
            if (!line) return
            // 获取 url query
            const queryObject = getQueryFromLogLine(line)
            console.log(queryObject);
            if (_.isEmpty(queryObject)) return
            // 累加 pv
            eventData.addPV(queryObject)  // 累加之后的结果为这个样子{"h5":{"pv":9},"h5.pv":{"pv":9},"h5.pv.45":{"pv":2},"h5.pv.45.23":{"pv":1},"h5.pv.45.34":{"pv":1},"h5.pv.46":{"pv":1}}
        })
   
        rl.on('close',() => {
            // 逐行读取结束，存入数据库
            const result = eventData.getResult()
            console.log('3.分析结果', JSON.stringify(result))
            resolve(result)
        })
    })
     
 }
 
 module.exports = analysisLogs
 