// pages/openDoor/openDoor.js
const { globalData } = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isOpen: false,
    whoOpen: "NULL",
    whoClose: "NULL",
    right:globalData.right
  },
  onShow:function (params) {
    this.setData({
    right:globalData.right
      
    })
    this.isOpenDoor()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.isOpenDoor()
  },
  isOpenDoor: async function () {
    const door = await db.collection('chairs').where({ _id: "openDoor" }).get()
    this.setData({
      isOpen: door.data[0].isOpen,
      whoOpen: door.data[0].whoOpen,
      whoClose: door.data[0].whoClose
    })
    console.log(door.data[0]);
    wx.hideLoading()
  },
  nextDoor: async function () {

    const that = this
    if (!this.data.isOpen) {//开门
      wx.showLoading({
        title: "加载中",
        mask: true
      })
      await wx.cloud.callFunction({
        name: 'door',
        data: {
          name: globalData.uname,
        },
        success: res => {
          console.log(res);
          wx.navigateBack({
            delta: 0,
          })
          that.onLoad()
        }
      })

    } else {//关门
      wx.showModal({
        title: '你确定吗？',
        content: '确保你是最后走的，记得关灯',
        success(res) {
          if (res.confirm) {
            wx.showLoading({
              title: "加载中",
              mask: true
            })
            wx.cloud.callFunction({
              name: 'door',
              data: {
                name: globalData.uname,
              },
              success: res => { 
                console.log(res);
                that.onLoad() }
            })

          }
        }
      })

    }
    // wx.reLaunch({
    //   url: "/pages/openDoor/openDoor"
    // })


  }
})