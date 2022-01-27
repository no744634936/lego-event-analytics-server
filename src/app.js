/**
 * @description 统计服务入口文件
 * @author zhang
 */

const { splitLogFileTimed } = require('./split_and_analysis/index')

splitLogFileTimed() // 定时拆分日志文件
