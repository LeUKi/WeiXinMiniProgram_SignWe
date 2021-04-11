// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command

function getime() {
  var date = new Date();
  return `${date.getFullYear()}年${date.getMonth()}月${date.getDate()}日 ${date.getHours()}:${date.getMinutes()}`
}

// async function sendMsg(OPENID, uname,stime) {
//   console.log(uname + " sending:" + OPENID);
//   try {
//     const result = await cloud.openapi.subscribeMessage.send({
//       touser: OPENID,
//       data: {
//         thing5: {
//           value: '实验室门已打开，开门人：' + uname
//         },
//         date2: {
//           value: stime
//         }
//       },
//       templateId: 'YT5WwUDkbE2OaixVEi8xPzwvvyCOQH7Q_SJSb3wGq-c',
//     })
//     console.log(result);
//   } catch (error) {
//     console.log("fail:" + OPENID + " " + error);
//   }
// }
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const door = await db.collection('chairs').where({ _id: "openDoor" }).get()
  console.log(door);


  const a = await db.collection('check').where({
    "_openid": wxContext.OPENID
  }).get()




  var temp
  if (door.data[0].isOpen) {//当门为true
    console.log(1);

    temp = await db.collection('chairs').doc("openDoor").update({
      data: {
        isOpen: false,
        whoClose: a.data[0].name,
      }
    })


  } else {//当门为false
    console.log(2);

    temp = await db.collection('chairs').doc("openDoor").update({
      data: {
        isOpen: true,
        whoOpen: a.data[0].name,
      }
    })
    await db.collection('check').where({}).get().then(async res => {
      let stime = getime()
      for (let i = 0; i < res.data.length; i++) {
        // await sendMsg(res.data[i]["_openid"], event.name,stime)
        cloud.callFunction({
          name: 'test',
          data: {
            oid: res.data[i]["_openid"],
            name: a.data[0].name,
            stime: stime
          }
        })
      }
      console.log(res.data.length);
    })
  }
  return {
    isOk: !door.data[0].isOpen,
    msg: temp,
    e:event,
    c:context

  }
}