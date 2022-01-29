技术方案设计

url的设计
------------------------------------------------------------------
要做一个通用的自定义事件统计服务，而不仅仅是为了作品分渠道统计
• 需求是什么
• 需要收集哪些信息
• 需要输备什么信息
• 如何做到


需求是什么
收集统计数据
分渠道统计。例如，一个h5页，一段时间之内
• 总 pv100
• 渠道A pv 30
• 渠道B pv 20
• 渠道C pv 50



需要收集哪些信息
以一个作品 http: //182.92.168.192: 8082/p/85-8dl4?channel=41 为例子，需要收集
• 作品id 85
• 作品渠道id 41

根据nginx收集日志的服务，通过http://localhost:8083/event.png?xxxx可以上报统计数据（目前服务在本地，以后会部署到测试机）

那么上报数据应该是 http://local.host:8083/event.png?workId=85&channelId=41 ------------但不能这样做！ ！ ！

如何收集
要做一个通用的自定义事件统计服务，而不仅仅是为了作品分渠道统计。
所以，不能按照分渠道统计的需求来设计参数。
按照通用的参数设计，可以定义四个参数（很多企业内部的事件统计服务，都是这么定义的）

• category
• action
• label
• value


例如: http: //localhost: 8083/event.png?category=h5&action=pv&labe1=85&value=41

如果再有新需求，有两个按钮 '参与' 和 '不参与'，想统计一下用户点击了哪个按钮
•点击"参与"则发送？category=h5&action=buttonClick&label=85&value=l
•点击"不参与"则发送？category=h5&action=buttonClick&label=85&value=0

----------------------------------------------------------
统计的方式

按天计算

离线计算，每天凌晨定时分析昨天的日志，计算出昨天的统计结果。
离线计算，要晚于拆分日志（凌晨10：00）,拆分完再计算。

• 根据日志文件名，得到昨天的日志（一个文件，如果按小时分的日志，就是多个文件）
• 逐行读取日志文件，累加统计结果 (stream 方式 readline来读取数据 )
• 读取完毕，输出统计结果

---------------------------------------------------------

数据结构
数据结构的设计

label 表示作品id
value 表示渠道号(wechat,facebook,line 之类的渠道)

{
    eventDate: '2021-03-21',
    // 统计结果的日期
    eventKey: 'h5',
    eventData: { pv: 10000 }   // category=h5 的数据汇总
}

{
    eventDate: '2021-03-21',
    eventKey: 'h5・pv',
    eventData: { pv: 8000 }   // category=h5&action=pv 的数据汇总 
} 

{
    eventDate: '2021-03-21',
    eventKey: 'h5.pv.85',
    eventData: { pv: 100 }       // category=h5&action=pv&label=85 的数据汇总
}

{
    eventDate: '2021-03-21',
    eventKey: 'h5.pv.85.41',
    eventData: { pv: 30 }       // category=h5&action=pv&label=85&value=41 的数据汇总
}

{
    eventDate: '2021-03-21',
    eventKey: 'h5.pv.85.42',
    eventData: { pv: 20 }       // category=h5&action=pv&label=85&value=42 的数据汇总
}

{
    eventDate: '2021-03-21',
    eventKey: 'h5.pv.85.43',
    eventData: { pv: 50 }       // category=h5&action=pv&label=85&value=43 的数据汇总
}

--------------------------------------------------------------
存入数据库
选 择 m o n g o d b 数 据 库 ， 按 照 数 据 结 构 设 计 s c h e m a
mongoose.Schema(
    {
        eventKey: String,
        eventData: {
            pv: Number,
            // uv: Number,   // 后续可扩展 uv
        },
        eventDate: Date,
    },
    { timestamps: true }
)