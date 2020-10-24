// pages/check/check.js
const { globalData } = getApp()
const db = wx.cloud.database()
const _ = db.command
Page({
  data: {
    chair: null,
    isFree: false,
    isMe: false,
    distence: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: "加载中",
      mask: true
    })
    this.setData({
      distence: globalData.distence,
      chair: options.chair
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
            wx.hideLoading()
          }
        })
      }
    })
  },
  check: function () {
    const that = this
    wx.showLoading({
      title: '正在确认...',
      mask: true
    })
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
      title: '正在占领座位...',
      mask: true
    })
    //拉取座位信息
    db.collection('chairs').where({ _id: "chairs" }).get({
      success: (res) => {
        var newC = res.data[0].chairs
        newC[this.data.chair - 1] = false
        var nowTime = new Date()

        //更新个人信息
        db.collection('check').where({ "_openid": globalData.openid }).update({
          data: {
            finalStartTime: nowTime,
            finalDistence: globalData.distence,
            finalCheck: false,
            finalChair: this.data.chair,
            sfinalStartTime: this.formatDate(nowTime)
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
    wx.showLoading({
      title: '正在签退...',
      mask: true
    })
    const that = this
    db.collection('check').where({ "_openid": globalData.openid }).get({
      success: function (res) {
        console.log(res.data[0]);


        var nowtime = new Date()
        var t1 = nowtime - res.data[0].finalStartTime
        t1 = t1 % (3600 * 1000)
        t1 = Math.floor(t1 / (60 * 1000))
        var daysumNow = res.data[0].daysum + t1
        db.collection('check').where({
          "_openid": globalData.openid
        }).update({
          data: {
            finalCheck: true,
            check: _.push({
              startTime: res.data[0].finalStartTime,
              stopTime: nowtime,
              howLong: t1,
              daysum: daysumNow,
              distence: res.data[0].finalDistence,
              chair: res.data[0].finalChair,
              sfinalStartTime: res.data[0].sfinalStartTime
            })
          },
          success: function () {


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
  }
})