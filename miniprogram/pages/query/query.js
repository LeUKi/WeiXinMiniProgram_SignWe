// pages/query/query.js
const { globalData } = getApp()
const db = wx.cloud.database()
const _ = db.command
Page({

  data: {
    chairs: []
  },

  onLoad: function (options) {
    this.getC()

  },
  onShow: function () {
    wx.startPullDownRefresh()
  },
  onPullDownRefresh: function () {
    this.getC()
    setTimeout(function () {
      wx.stopPullDownRefresh()
    }, 1000);
  },
  getC: function () {
    db.collection('chairs').where({ _id: "chairs" }).get({
      success: (res) => {
        this.setData({
          chairs: res.data[0].chairs
        })

      }
    })
  }
})