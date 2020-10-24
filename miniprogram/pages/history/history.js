// pages/history/history.js.
const { globalData } = getApp()
const db = wx.cloud.database()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    me: null,
    sumtime: 50
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMe()



  },

  onPullDownRefresh: function () {
    this.getMe()
    setTimeout(function () {
      wx.stopPullDownRefresh()
    }, 1000);
  },

  getMe: function () {
    wx.cloud.database().collection('check').where({
      "_openid": "o8Mur5QAncbRzYbDj05yRhD_VRo4"
    }).get({
      success: res => {
        console.log(res);

        this.setData({
          me: res.data[0]
        })

      }
    })
  }
})