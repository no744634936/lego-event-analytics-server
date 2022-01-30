定时任务跟写入数据库就不用测了

因为不需要将测试写入数据库

查看 
src/split_and_analysis/analysis-logs/index.js
src/split_and_analysis/analysis-logs/analysis.js
这两个文件，代码做了一点调整，写入了一个promise来取出result


run 

npx jest __test__/analysis-logs/logs.test.js


