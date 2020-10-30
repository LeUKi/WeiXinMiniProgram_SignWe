// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  return {
    text: "学技术就是要坐冷板凳",
    icon: "volume-o",
    color: "#1989fa",
    background: "#F0F3F6",
  }
}