// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
let newC
let newI
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()


  const oldC = await db.collection('chairs').where({ _id: "chairs" }).get()
  console.log(oldC);
  newC = oldC.data[0].chairs
  newC[event.finalChair - 1] = false


  await db.collection('check').where({ "_openid": wxContext.OPENID }).update({
    data: {
      finalStartTime: event.time,
      finalDistence: event.distence,
      finalCheck: false,
      finalChair: event.finalChair,
      sfinalStartTime: event.sfinalStartTime
    }
  })
  console.log(1);
  const oldI = await db.collection('chairs').where({ _id: "openid" }).get()
  newI = oldI.data[0].openid
  newI[event.finalChair - 1] = wxContext.OPENID
  console.log(1);
  await db.collection('chairs').where({ _id: "chairs" }).update({
    data: {
      chairs: newC
    }
  })
  console.log(12);
  await db.collection('chairs').where({ _id: "openid" }).update({
    data: {
      openid: newI
    }
  })

  return 666

}