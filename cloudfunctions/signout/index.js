// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command
// 云函数入口函数
let t1
let daysumNow
exports.main = async (event, context) => {  
  const wxContext = cloud.getWXContext()

  const res = await db.collection('check').where({ "_openid": wxContext.OPENID }).get()
  t1 = new Date(event.time) - res.data[0].finalStartTime
  t1 = t1 % (3600 * 1000)
  t1 = Math.floor(t1 / (60 * 1000))
  daysumNow = res.data[0].daysum + t1

  await db.collection('check').where({
    "_openid": wxContext.OPENID
  }).update({
    data: {
      finalCheck: true,
      daysum: daysumNow,
      check: _.push({
        each: [{
          startTime: res.data[0].finalStartTime,
          stopTime: new Date(event.time),
          howLong: t1,
          distence: res.data[0].finalDistence,
          chair: res.data[0].finalChair,
          sfinalStartTime: res.data[0].sfinalStartTime
        }],
        position: 0
      })
    }
  })

  const res2 = await db.collection('chairs').where({ _id: "chairs" }).get()
  let newC = res2.data[0].chairs
  newC[res.data[0].finalChair - 1] = true

  await db.collection('chairs').where({ _id: "chairs" }).update({
    data: {
      chairs: newC
    }
  })
  return 666

}