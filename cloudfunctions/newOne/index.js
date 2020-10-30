// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  await db.collection('check').add({
    data: {
      check: [],
      _openid: wxContext.OPENID,
      finalCheck: true,
      name: event.name,
      class: event.class,
      finalStartTime: null,
      finalDistence: 0,
      finalChair: null,
      sfinalStartTime: null,
      finalDistence: null,
      daysum: 0,
      allsum: 0
    }
  })

  return event
}