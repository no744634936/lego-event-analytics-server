routes/event.js 里只有一个api

npm run dev


然后浏览输入下面这几个链接看看效果

http://localhost:3002/api/event

http://localhost:3002/api/event?category=h5

http://localhost:3002/api/event?category=h5&action=pv&label=10&value=56 

http://localhost:3002/api/event?category=h5&action=pv&label=10&value=56&startDate=2022-01-27&endDate=2022-01-30


有关时区的归纳
------------------------------------------------------
nginx 里的日志记录的时间跟电脑服务器的时区有关，
我的电脑是东京时区，所以nginx的日志的时区就是东京时区，
例如 [30/Jan/2022:23:19:14 +0900]

cron的定时任务也是按电脑或服务器上的时间来运行的
我的电脑是东京时区，所以cron定时任务的时区也得是东京时区，

拆分日志文件之后，logs_by_day 文件夹里的日志文件也会是东京时区的时间

------------------------------------------------------

将日志分析后记录放入mongodb数据库的是 eventDate， 是一个世界标准世界
由yesterdayDate() 这个方法生成一个（前一天）24小时前的世界标准时间

------------------------------------------------------

然后controller/event.js 文件里
startDate 跟 endDate 不管是什么时区的时间都转换成世界标准时间，来从mongodb数据库里查找
