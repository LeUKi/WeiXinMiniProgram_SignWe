// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
let newC

let newI
exports.main = async (event, context) => {
  if (event.c == undefined) {


    const wxContext = cloud.getWXContext()

    /**
     * openid获取name
     */
    const resN = await db.collection('check').where({
      "_openid": wxContext.OPENID
    }).get()

    /**
     * chair更新name
     */
    await db.collection('chairs').where({ _id: "names" }).update({
      data: {
        [`names.${event.finalChair - 1}`]: resN.data[0].name
      }
    })

    /**
     * 初始记录
     */
    await db.collection('check').where({ "_openid": wxContext.OPENID }).update({
      data: {
        finalStartTime: new Date(event.time),
        finalDistence: event.distence,
        finalCheck: false,
        finalChair: event.finalChair,
        sfinalStartTime: event.sfinalStartTime
      }
    })

    /**
     * chair更新chair
     */
    await db.collection('chairs').where({ _id: "chairs" }).update({
      data: {
        [`chairs.${event.finalChair - 1}`]: false
      }
    })

    /**
     * chair更新openid
     */
    await db.collection('chairs').where({ _id: "openid" }).update({
      data: {
        [`openid.${event.finalChair - 1}`]: wxContext.OPENID
      }
    })

  } else {
    await db.collection('chairs').where({ _id: "chairs" }).update({
      data: {
        chairs: event.c
      }
    })
  }
  return 666

}