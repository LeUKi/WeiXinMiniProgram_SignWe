// pages/admin/admin.js
const { globalData } = getApp()
const db = wx.cloud.database()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    all: [],
    show: false,

    outName: "",
    outClass: "",
    outsfinalStartTime: "",
    outdaysum: "",
    outallsum: "",
    outfinalCheck: true,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    wx.cloud.callFunction({
      name: 'isOP',
      success:
        (res) => {
          console.log(res);

        }
    })
    wx.cloud.callFunction({
      name: 'getallsum',
      success: (res) => {
        this.setData({
          all: res.result.data
        })
      }
    })


  },
  onClose: function () {
    this.setData({
      show: false
    })
  }
  ,
  Clk: function (res) {
    this.setData({
      outName: res.target.dataset.person.name,
      outClass: res.target.dataset.person.class,
      outsfinalStartTime: res.target.dataset.person.sfinalStartTime,
      outallsum: res.target.dataset.person.allsum,
      outdaysum: res.target.dataset.person.daysum,
      outfinalCheck: res.target.dataset.person.finalCheck,
    })
    this.setData({
      show: true,
    })
  }
})