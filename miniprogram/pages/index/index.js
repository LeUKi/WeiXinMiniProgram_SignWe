// pages/index/index.js
const {
  globalData
} = getApp()
const db = wx.cloud.database()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isOP: false,
    right: globalData.right,
    circles: [{
      latitude: 21.15204729309082,
      longitude: 110.302223046875,
      radius: 80,
      fillColor: '#00000011',
      color: "#74b9ff",
      strokeWidth: "4",
    }],
    notice: {
      text: "null"
    },
    isOpen: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.chair) {
      wx.showLoading({
        title: '加载定位中',
        mask: true
      })
      wx.getSetting({
        success(res) {
          wx.hideLoading()
          if (res.authSetting['scope.userLocation']) {
            wx.navigateTo({
              url: '/pages/check/check?chair=' + options.chair,
            })
          } else {
            wx.showToast({
              title: '未取得定位权限',
              icon: "none"
            })
          }
        }
      })
    }
    this.setData({
      isOP: globalData.isOP
    })
    this.isOpenDoor()
    wx.showShareMenu({
      menus: ['shareAppMessage']
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.isOpenDoor()
    wx.offLocationChange(this._locationChangeFn);
    wx.startLocationUpdate();
    console.log(globalData.isOP);
    if (globalData.isOP) {
      globalData.right = true
      this.setData({
        right: true,
        isOP: true
        // notice: {
        //   text: "当前为管理员状态，可无视范围打卡"
        // }
      })
    } else {
      wx.onLocationChange(this._locationChangeFn);
      db.collection('chairs').where({
        _id: "notic"
      }).get({
        success: (res) => {
          this.setData({
            notice: res.data[0].notice
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  },

  _locationChangeFn: function (res) {
    var TEMP = this.juli(res.latitude, res.longitude)
    this.setData({
      right: TEMP
    })
    globalData.right = TEMP
  },
  // 计算两地之间的距离
  juli: function (lat1, lng1, lat2 = this.data.circles[0].latitude, lng2 = this.data.circles[0].longitude) {
    if (lat1 == null) {
      return false
    }
    globalData.lat = lat1;
    globalData.lon = lng1;
    var radLat1 = lat1 * Math.PI / 180.0;
    var radLat2 = lat2 * Math.PI / 180.0;
    var a = radLat1 - radLat2;
    var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137;
    s = Math.round(s * 10000) / 10000;
    globalData.distence = s * 1000
    return s * 1000 <= this.data.circles[0].radius ? true : false
  },
  notic: function () {
    wx.navigateTo({
      url: "/pages/notic/notic"
    })
  },
  check: function () {
    // wx.openSetting()
    wx.scanCode({
      onlyFromCamera: true,
      success: function (res) {
        if (res.path[0] == '/') {
          wx.reLaunch({
            url: res.path
          })
        } else {
          wx.reLaunch({
            url: "/" + res.path
          })
        }
      }
    })
  },
  isOpenDoor: async function () {
    const door = await db.collection('chairs').where({ _id: "openDoor" }).get()
    this.setData({
      isOpen: door.data[0].isOpen,
    })
  },
  toOpenDoor: function () {
    wx.navigateTo({
      url: "/pages/openDoor/openDoor"
    })
  },
  onMSG() {
    wx.getSetting({
      withSubscriptions: true,
      success(res) {
        console.log(res.authSetting)
        // res.authSetting = {
        //   "scope.userInfo": true,
        //   "scope.userLocation": true
        // }
        console.log(res.subscriptionsSetting)
        // res.subscriptionsSetting = {
        //   mainSwitch: true, // 订阅消息总开关
        //   itemSettings: {   // 每一项开关
        //     SYS_MSG_TYPE_INTERACTIVE: 'accept', // 小游戏系统订阅消息
        //     SYS_MSG_TYPE_RANK: 'accept'
        //     zun-LzcQyW-edafCVvzPkK4de2Rllr1fFpw2A_x0oXE: 'reject', // 普通一次性订阅消息
        //     ke_OZC_66gZxALLcsuI7ilCJSP2OJ2vWo2ooUPpkWrw: 'ban',
        //   }
        // }
      }
    })
    wx.showModal({
      title: '接收实验室开门的通知（Beta）',
      content: '勾选“保持选择”后，每次打卡可接收下一次的开门通知。',
      cancelText: "取消",
      cancelColor: "red",
      confirmText: "我会勾选",
      confirmColor: "#ccc",

      success(res) {
        if (res.confirm) {
          wx.requestSubscribeMessage({
            tmplIds: ['YT5WwUDkbE2OaixVEi8xPzwvvyCOQH7Q_SJSb3wGq-c'],
            complete(res) {
              console.log(res);
              if (res['YT5WwUDkbE2OaixVEi8xPzwvvyCOQH7Q_SJSb3wGq-c'] === "accept") {
                console.log("isok");
                if (globalData.isNewPeople) {
                  wx.showModal({
                    title: '信息登记',
                    content: '需要登记一些信息以订阅开门通知',
                    cancelText: "取消",
                    cancelColor: "red",
                    confirmText: "前往登记",
                    confirmColor: "#ccc",
                    success(res) {
                      if (res.confirm) {
                        wx.navigateTo({
                          url: "/pages/rename/rename"
                        })
                      } else if (res.cancel) {
                        wx.showToast({
                          title: '未登记用户将无法接收通知',
                          icon: 'error',
                          duration: 5000
                        })

                      }
                    }
                  })
                }
              }
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  goadmin() {
    if (this.data.isOP) {
      wx.navigateTo({
        url: "/pages/op/op"
      })
    }
  }
})