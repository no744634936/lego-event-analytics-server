__test__/apis 文件夹里的所有文件

配置参考 lego-zhang-backend的 2_develop_prepare

REMOTE_HOST 发布到测试机的时候记得配置一下
// 测试机 host
const REMOTE_HOST = '发布到测试机时这个需要写一下' // 'http://182.92.168.192:8080'


因为test要链接数据库，所以测试， git push的时候，就只在mac电脑上做