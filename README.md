# 定时拆分日志文件

说是拆分其实就是将产生的日志源文件，于每天的0点0时0分复制一份，按日期改名字，

复制的改好名字的日志文件放入另一个文件夹，然后清空日志源文件。




查看顺序
1, src/app.js

2, src/split_and_analysis/index.js

3, package.json 里写上

"dev": "cross-env NODE_ENV=dev ./node_modules/.bin/nodemon src/app.js"


4，npm run dev