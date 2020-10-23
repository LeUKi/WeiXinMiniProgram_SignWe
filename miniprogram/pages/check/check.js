// pages/check/check.js
const { globalData } = getApp()
const db = wx.cloud.database()
const _ = db.command
Page({
  data: {
    chair: null,
    isFree: false,
    isMe: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: "加载中"
    })

    //座位查询
    db.collection('chairs').where({ _id: "chairs" }).get({
      success: (res) => {
        db.collection('chairs').where({ _id: "openid" }).get({
          success: (res1) => {
            console.log(res1);
            this.setData({
              chair: options.chair,
              isFree: res.data[0].chairs[options.chair - 1],
              isMe: globalData.openid == res1.data[0].openid[options.chair - 1]
            })
            console.log(214);
            wx.hideLoading()
          }
        })
      }
    })
  },
  check: function () {
    //落座前检查
    if (globalData.isNewPeople) {
      //实名检查
      wx.showModal({
        title: "你还没有登记",
        content: "这是必要的记录。",
        confirmText: "去实名",
        success: (res) => {
          if (res.confirm) {
            wx.navigateTo({
              url: "/pages/rename/rename"
            })
          }
        }
      })
    } else {
      this.seatdown()
    }
  },
  seatdown: function () {
    const that = this
    wx.showLoading({
      title: '正在占领座位...',
    })
    //拉取座位信息
    db.collection('chairs').where({ _id: "chairs" }).get({
      success: (res) => {
        var newC = res.data[0].chairs
        newC[this.data.chair - 1] = false


        //更新个人信息
        db.collection('check').where({ "_openid": globalData.openid }).update({
          data: {
            finalStartTime: new Date(),
            finalDistence: globalData.distence,
            finalCheck: false,
            finalChair: globalData.chair
          },
          success: function () {
            console.log("//更新个人信息");

            //获取占座信息
            db.collection('chairs').where({ _id: "openid" }).get({
              success: (res1) => {
                console.log(res1);
                console.log(1);
                var newI = res1.data[0].openid
                console.log(2);
                newI[that.data.chair - 1] = globalData.openid
                console.log(2);

                console.log("//获取占座信息");


                //更新占座与座位信息
                wx.cloud.callFunction({
                  name: 'seatdown',
                  data: {
                    c: newC,
                    i: newI
                  },
                  success: function () {
                    console.log("//更新占座与座位信息");


                    //刷新
                    wx.hideLoading()
                    wx.redirectTo({
                      url: '/pages/check/check?chair=' + that.data.chair
                    })
                  }
                })
              }
            })

          }
        })
      }
    })

  },
  signout: function () {
    const that = this
    db.collection('check').where({ "_openid": globalData.openid }).get({
      success: function (res) {


        var nowtime = new Date()
        var t1 = nowtime - res.finalStartTime
        t1 = t1 % (3600 * 1000)
        t1 = Math.floor(t1 / (60 * 1000))
        db.collection('check').where({
          "_openid": globalData.openid
        }).update({
          data: {
            check: _.push({
              startTime: res.finalStartTime,
              stopTime: nowtime,
              howLong: t1,
              distence: res.distence,
              chair: res.finalChair
            })
          },
          success: function () {
wx.showLoading({
  title: '正在签退...',
})

            //拉取座位信息
            db.collection('chairs').where({ _id: "chairs" }).get({
              success: (res) => {
                var newC = res.data[0].chairs
                newC[that.data.chair - 1] = true

                //更新占座与座位信息
                wx.cloud.callFunction({
                  name: 'seatdown',
                  data: {
                    c: newC,
                    i: null
                  },
                  success: function () {
                    console.log("//更新占座与座位信息");


                    //刷新
                    wx.hideLoading()
                    wx.redirectTo({
                      url: '/pages/check/check?chair=' + that.data.chair
                    })
                  }
                })



              }
            })
          }
        })
      }
    })
  }
})