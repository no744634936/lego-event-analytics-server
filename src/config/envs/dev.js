/**
 * @description dev 配置
 * @author zhanghaifeng
 */

module.exports = {
    // mongodb 连接配置
    mongodbConf: {
        host: 'localhost',
        port: '27017',
        dbName: 'imooc_lego_course',
    },

    // access_log 日志文件目录，要和 nginx_conf/dev/event.mac.conf 保持一致！
    accessLogPath: '/Users/zhanghaifeng/Projects_logs/nginx_logs/event_analytics/',

    // cors origin
    corsOrigin: '*',
}
