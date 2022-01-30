/**
 * @description 统计服务入口文件
 * @author zhang
 */

const { splitLogFileTimed,rmLogsTimed,analysisLogsTimed} = require('./split_and_analysis/index')

splitLogFileTimed()  // 定时拆分日志文件
rmLogsTimed()        // 定时删除过期的日志文件
analysisLogsTimed()  //定时分析日志文件