// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  console.log(wxContext);
  const op = [
    // "o8Mur5QAncbRzYbDj05yRhD_VRo4",
    // "o8Mur5WhSQe5igEYjO9Wi3pGLZNA"
  ]
  const a = await db.collection('check').where({
    "_openid": wxContext.OPENID
  }).get()
  console.log(a);
  var isNewGuys = a.data[0] == undefined ? true : false
  return {
    openid: wxContext.OPENID,
    uname: isNewGuys ? "未命名": a.data[0].name,
    isNewGuys: isNewGuys,
    isOP:op.includes(wxContext.OPENID),
  }
}