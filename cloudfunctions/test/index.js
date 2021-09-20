// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var result = false
  try {
    result = await cloud.openapi.subscribeMessage.send({
      touser: event.oid,
      data: {
        thing5: {
          value: '实验室门已打开，开门人：' + event.name
        },
        date2: {
          value: event.stime
        }
      },
      templateId: 'YT5WwUDkbE2OaixVEi8xPzwvvyCOQH7Q_SJSb3wGq-c',
    })
  } catch (error) {
    console.log("fail:" + event.oid + " " + error);
  }
  return { result,event }
}