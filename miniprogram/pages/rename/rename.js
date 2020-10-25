// pages/rename/rename.js
const { globalData } = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    class: "",
    name: "",
    yesIknow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  bindclass: function (e) {
    this.setData({
      class: e.detail.value
    })
  },
  bindname: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  switch2Change: function (e) {
    this.setData({
      yesIknow: e.detail
    })
  },
  yes: function () {
    if (this.data.yesIknow) {
      if (this.data.class.replace(/\s*/g, "") != "" && this.data.name.replace(/\s*/g, "") != "") {
        wx.showLoading({
          title: '正在创建档案',
          mask: true
        })
        wx.cloud.callFunction({
          name: 'newOne',
          data: {
            name: this.data.name,
            class: this.data.class,
            time: Date()
          },
          success: res => {
            wx.hideLoading()
            globalData.isNewPeople = false
            wx.navigateBack({
              delta: 1
            })
          },
          fail: (res) => {
            wx.showToast({
              title: '未完成，请重试',
              icon: "none"
            })
          }
        })
      } else {
        wx.showToast({
          title: '请完整填写',
          icon: "none"
        })
      }
    } else {
      wx.showToast({
        title: '未勾选',
        icon: "none"
      })

    }


  }
})