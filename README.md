搭建koa2环境
• 安装需要的npm插件
  将前面做的哪些定时任务放进koa2项目里去
  参考 lego-zhang-h5-server 项目的 1_set_up 分支

• 完善 src/appjs , cros,helmet中间件，

    引入定时拆分，删除，分析日志的三个方法 
    splitLogFileTimed, rmLogsTimed, analysisLogsTimed

    npm install koa-helmet --save   // 有什么用还不太清楚

    npm install koa2-cors --save // 跨域用

    middlewares/cors.js 文件


• 定义 /api/db-check 路由
