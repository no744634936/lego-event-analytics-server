nginx 测试流程

1,根据lego_zhang_backend 的3_dev 分支里的步骤设置aws的ec2
 
2，远程登录 ssh zhang@54.238.147.167

3，开放端口，根据lego_zhang_backend 的3_dev 分支里的aws-open-port2.png
  开放80端口
  开放8083端口

aws 设置流程
https://docs.aws.amazon.com/ja_jp/AWSEC2/latest/UserGuide/working-with-security-groups.html
aws控制台里点击已经运行的实例，
安全--->【安全组sg-0cc5e4adfd470cf13 (launch-wizard-6)】---->
インバウンドルールを編集---->ルールを追加,
输入 aws-open-port2.png 的内容
开放80端口
保存


4,下载nginx
https://qiita.com/e-onm/items/0814b6c4db395e331df1

然后浏览器输入 public ip地址 54.238.147.167就可以测试80端口是否开启了

4, 安装git
    sudo yum install git -y
    git version

--------------------------
常用命令
• sudo nginx -t  测试配置文件语法（查看配置文件位置）

• sudo systemctl start nginx 启动

• sudo nginx -s reload 重启

• sudo nginx -s stop 停止

• systemctl status nginx 查看nginx 状态

• sudo nginx -c xxx.conf修改配置文件位置
---------------------------
配置dev 环境下的nginx

注意: 因为用的电脑是windows不是mac，所以本地nginx的配置比较麻烦
下面的流程是将aws的ec2 当作本地环境来配置的
如果是mac那么下面这些路径会有不同，
如果使用的是mac那么最开始的 pwd 的路径可能是 /Users/zhang/xxx
到时根据mac的路径来配置
但是流程是一样的，


1,远程登录 ssh zhang@54.238.147.167

2,pwd       //查看当前目录显示  /home/zhang

3, 创建存放log的文件夹，以及log文件

    mkdir -p "./nginx_logs/event_analytics/"

    touch "./nginx_logs/event_analytics/access.log"  // 存放access log
    
    touch "./nginx_logs/event_analytics/error.log"  // 存放error log

4, 创建projects文件夹，

    mkdir -p "./projects"

    cd ./projects

5，从github上将 lego_event_analytics_server库clone进来
    
    git clone https://github.com/no744634936/lego_event_analytics_server.git

   可以看到lego_event_analytics_server文件夹出现了

   里面的 nginx_conf里
   dev/event.conf  的路径是上面设置的那些

   dev/event.conf 这个文件的内容是，
   8083 是端口号
   root的意思是 浏览器输入 54.238.147.167:8083/xxx 访问的是这个root文件夹下的文件
   浏览器输入 54.238.147.167:8083/xxx 的访问log放在access.log文件
   浏览器输入 54.238.147.167:8083/xxx 的错误log放在error.log文件
   main 是 /etc/nginx/nginx.conf 这个nginx的配置文件里 设置好的 log 的格式

   另外
   prd-dev/event.conf
   prd/event.conf
   要参考上面的写法，再配置一次

   nginx_static_files文件夹里有一张图片event.png

6，查看nginx 配置文件位置

    sudo nginx -t

7，修改 nginx 配置文件

    sudo vim /etc/nginx/nginx.conf       //ec2上要加上sudo 才能执行nginx相关命令

    按下i，进入insert 模式

    将user 从 nginx 改为 zhang 赋予 nginx 访问文件的权限

    然后写入

    include /home/zhang/projects/lego_event_analytics_server/nginx_conf/dev/*;  //表示引入dev/event.conf 文件

    按Esc 
    :wq
    退出


8  sudo nginx -s stop 停止

9  sudo systemctl start nginx 启动

10 systemctl status nginx 查看nginx 状态

11 sudo nginx -t  测试配置文件语法（查看配置文件位置）

12,设置linux服务器的时区 timezone为东京

   sudo timedatectl set-timezone Asia/Tokyo

   nginx的log的时间也会变成东京时间

   

13，浏览器输入 
    54.238.147.167:8083/event.png
    54.238.147.167:8083/event.png?website=test

    mac本地环境的话输入 localhost:8083/event.png

    可以看到event.png

14,可以查看日志
   这两次访问情况都没记录了
    54.238.147.167:8083/event.png
    54.238.147.167:8083/event.png?website=test


----------------------------------------------------------------

快速查看access.log
sudo vim /home/zhang/nginx_logs/event_analytics/access.log
快速查看error.log
sudo vim /home/zhang/nginx_logs/event_analytics/error.log
