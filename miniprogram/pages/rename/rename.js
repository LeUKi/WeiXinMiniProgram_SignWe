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
        db.collection('check').add({
          data: {
            check: [],
            finalCheck: true,
            name: this.data.name,
            class: this.data.class,
            finalStartTime: new Date(),
            finalDistence: 0,
            finalChair: null,
            sfinalStartTime: null,
            finalDistence: null,
            daysum:0
          },
          success: function () {
            globalData.isNewPeople = false
            wx.navigateBack({
              delta: 1
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