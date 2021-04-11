// pages/check/check.js
const { globalData } = getApp()
const db = wx.cloud.database()
const _ = db.command
var t = false
var tt = false
Page({
  data: {
    chair: null,
    isFree: false,
    isMe: false,
    right: false,
    lastN: "NULL",
    isOpen: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideLoading()
    wx.showLoading({
      title: "加载中",
      mask: true
    })
    this.isOpenDoor()
    this.setData({
      right: globalData.right,
      chair: Number(options.chair)
    })
    //判断参数
    if (options.noDistence != undefined) {
      this.setData({
        right: true
      })
    }


    //座位查询
    db.collection('chairs').where({ _id: "chairs" }).get({
      success: (res) => {

        db.collection('chairs').where({ _id: "openid" }).get({
          success: (res1) => {

            db.collection('chairs').where({ _id: "names" }).get({
              success: (res2) => {

                this.setData({
                  isFree: res.data[0].chairs[Number(options.chair) - 1],
                  isMe: globalData.openid == res1.data[0].openid[Number(options.chair) - 1],
                  lastN: res2.data[0].names[Number(options.chair) - 1]
                })
                wx.hideLoading()
              }
            })
          }
        })
      }
    })

    if (globalData.isOP) {
      this.setData({
        right: true,
        notice: {
          text: "当前为管理员状态，可无视范围打卡"
        }
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
  onShow: function () {
    this.isOpenDoor()
  },
  check: async function () {

    wx.requestSubscribeMessage({
      tmplIds: ['YT5WwUDkbE2OaixVEi8xPzwvvyCOQH7Q_SJSb3wGq-c'],
      complete(res) {
        console.log(res);
        tt = true
        if (t) {
          wx.redirectTo({
            url: '/pages/check/check?chair=' + that.data.chair
          })
          t = false
          tt = false
        }
      }
    })
    const that = this
    await wx.showLoading({
      title: '正在确认',
      mask: true
    })
    //落座前检查
    if (globalData.isNewPeople) {
      //实名检查
      wx.hideLoading()
      wx.showModal({
        title: "你还没有登记",
        content: "这是必要的记录。",
        confirmText: "去实名",
        success: (res) => {
          console.log(1);
          if (res.confirm) {
            wx.navigateTo({
              url: "/pages/rename/rename"
            })
          }
        }
      })
    } else {
      db.collection('check').where({ "_openid": globalData.openid }).get({
        success: function (res88) {
          console.log(res88.data[0].finalCheck);
          wx.hideLoading()
          if (res88.data[0].finalCheck) {
            that.seatdown()
          } else {
            wx.showModal({
              title: "你已坐下" + res88.data[0].finalChair + "号座位",
              content: "若跳转后不能签退，请联系管理员。",
              confirmText: "查看座位",
              success: (res) => {
                wx.redirectTo({
                  url: '/pages/check/check?chair=' + res88.data[0].finalChair
                })
              }
            })
          }
        }
      })
    }
  },
  seatdown: function () {
    const that = this
    wx.showLoading({
      title: '正在占领座位',
      mask: true
    })

    const T = new Date()
    const sT = this.formatDate(T)
    //更新占座与座位信息
    wx.cloud.callFunction({
      name: 'seatdown',
      data: {
        time: T,
        distence: globalData.distence,
        finalChair: this.data.chair,
        sfinalStartTime: sT

      },
      success: function () {
        //刷新
        wx.hideLoading()
        t = true
        if (tt) {
          wx.redirectTo({
            url: '/pages/check/check?chair=' + that.data.chair
          })
          t = false
          tt = false
        }
      }
    })
  },
  signout: function () {
    wx.requestSubscribeMessage({
      tmplIds: ['YT5WwUDkbE2OaixVEi8xPzwvvyCOQH7Q_SJSb3wGq-c'],
      complete(res) {
        console.log(res);
        tt = true
        if (t) {
          wx.redirectTo({
            url: '/pages/check/check?chair=' + that.data.chair
          })
          t = false
          tt = false
        }
      }
    })
    wx.showLoading({
      title: '正在签退...',
      mask: true
    })
    /////////////////////////////////////
    const that = this
    const T = new Date()
    wx.cloud.callFunction({
      name: 'signout',
      data: {
        time: T,
        notice: {
          text: "null"
        },
      },
      success: function () {
        // wx.cloud.callFunction({
        //   name: 'door',
        //   complete(ress){
        //     console.log(ress);
        //   }
        // })
        wx.hideLoading()
        t = true
        if (tt) {
          wx.redirectTo({
            url: '/pages/check/check?chair=' + that.data.chair
          })
          t = false
          tt = false
        }

        //刷新

      }
    })
    /////////////////////////////////////
  },
  formatDate: function (value) {
    var time = value;
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var date = time.getDate();
    var hour = time.getHours();
    var minute = time.getMinutes();
    var second = time.getSeconds();
    month = month < 10 ? "0" + month : month;
    date = date < 10 ? "0" + date : date;
    hour = hour < 10 ? "0" + hour : hour;
    minute = minute < 10 ? "0" + minute : minute;
    second = second < 10 ? "0" + second : second;
    return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
  },
  notic: function () {
    wx.navigateTo({
      url: "/pages/notic/notic"
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
      url: '/pages/openDoor/openDoor',
    })
  }
})