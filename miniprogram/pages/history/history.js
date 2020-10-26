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
    sumtime: null,
    yesterday: [
      { name: '第一' },
      { name: '第二' },
      { name: '第三' },
      { name: '第四' },
      { name: '第五' }]
  },

  onShow: function () {
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
      "_openid": globalData.openid
    }).get({
      success: res => {
        this.setData({
          me: res.data[0],
        })
      }
    })
    wx.cloud.database().collection('chairs').where({
      "_id": "yesterday"
    }).get({
      success: res => {
        this.setData({
          yesterday: res.data[0].yesterday
        })
      }
    })
  }
})