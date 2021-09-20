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

  /**
   * 获取初始
   */
  const res = await db.collection('check').where({
    "_openid": wxContext.OPENID
  }).get()

  if (!res.data[0].finalCheck) {

    t1 = new Date(event.time) - res.data[0].finalStartTime
    t1 = Math.floor(t1 = t1 / 60000)
    daysumNow = res.data[0].daysum + t1

    /**
     * 添加记录
     */
    await db.collection('check').where({
      "_openid": wxContext.OPENID
    }).update({
      data: {
        finalCheck: true,
        allsum: _.inc(t1),
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

    /**
     * chair更新chair
     */
    await db.collection('chairs').where({ _id: "chairs" }).update({
      data: {
        [`chairs.${res.data[0].finalChair - 1}`]: true
      }
    })

  } else {
    await db.collection('check').where({
      "_openid": wxContext.OPENID
    }).update({
      data: {
        errsignout: _.inc(1),
      }
    })
  }

  return 666

}