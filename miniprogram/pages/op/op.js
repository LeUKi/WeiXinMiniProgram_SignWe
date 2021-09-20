// pages/op/op.js
const db = wx.cloud.database()
const _ = db.command

Page({

  /**
   * 页面的初始数据
   */
  data: {
    chairNum: 1,

    search: '',

    noticetit: '',
    noticecon: '',
    noticetim: '',

    nbackground: '',
    ncolor: '',
    nicon: '',
    ntext: '',

    _openid: 'OPENID',
    class: 'CLASS',
    name: 'NAME',
    isOP: false,

    a_fun: '00',
    a_show: false,
    a_actions: [
      { name: '是的', loading: true, color: 'red', isYES: true },
    ],


  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection('chairs').where({
      _id: "notic"
    }).get({
      success: (res) => {
        console.log(res);
        this.setData({
          // steps: res.data[0].steps,
          nbackground: res.data[0].notice.background,
          ncolor: res.data[0].notice.color,
          nicon: res.data[0].notice.icon,
          ntext: res.data[0].notice.text,
          noticetit: res.data[0].noticetit,
          noticecon: res.data[0].noticecon,
          noticetim: res.data[0].noticetim,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },


  userSearch: function () {
    console.log(this.data.search);
    db.collection('check').where({
      name: this.data.search
    }).get({
      success: (res) => {
        console.log(res);
        this.setData({
          _openid: res.data[0]._openid,
          class: res.data[0].class,
          name: res.data[0].name,
          isOP: res.data[0].isOP,
        })
      }
    })

  },


  goFunc(e) {
    console.log(e.currentTarget.dataset.fun);
    this.setData({
      a_fun: e.currentTarget.dataset.fun,
      a_show: true
    })
    setTimeout(() => {
      this.setData({
        'a_actions[0].loading': false
      })
    }, 2000);

  },

  a_onClose() {
    this.setData({
      a_show: false,
    });
    setTimeout(() => {
      this.setData({
        'a_actions[0].loading': true
      })
    }, 2000);
  },

  a_onSelect(event) {
    if (event.detail.isYES) {

      switch (this.data.a_fun) {
        case 'a1':
          this.clearRank();
          break;
        case 'a2':
          this.clearHistory()
          break;
        case 'c1':
          this.forceSignOut()
          break;
        case 'd1':
          this.giveOP()
          break;
        case 'd2':
          this.delUser()
          break;
        default:
          break;
      }

    }
  },


  /**
   * 清除排名
   */
  clearRank: async function () {
    wx.showLoading({
      title: '加载中',
    })
    await db.collection('check')
      .where({ "allsum": _.neq(0) })
      .update({
        data: {
          allsum: 0
        },
        success: function (res) {
          wx.hideLoading()
          console.log(res)
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          })
        }
      })
  },

  /**
   * 清除记录
   */
  clearHistory: async function () {
    wx.showLoading({
      title: '加载中',
    })
    await db.collection('check')
      .where({})
      .update({
        data: {
          check: [],
          allsum: 0
        },
        success: function (res) {
          wx.hideLoading()
          console.log(res)
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          })
        }
      })
  },

  /**
   * 强制签退
   */
  forceSignOut: async function () {
    wx.showLoading({
      title: '加载中',
    })
    await db.collection('chairs').where({ _id: "chairs" }).update({
      data: {
        [`chairs.${this.data.chairNum - 1}`]: true
      },
      success: function (res) {
        wx.hideLoading()
        console.log(res)
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },
  giveOP: async function () {
    wx.showLoading({
      title: '加载中',
    })
    await db.collection('check').where({
      "_openid": this.data._openid
    }).update({
      data: {
        isOP: true,
      },
      success: function (res) {
        wx.hideLoading()
        console.log(res)
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },
  delUser: async function () {
    wx.showLoading({
      title: '加载中',
    })
    await db.collection('check').where({
      "_openid": this.data._openid
    }).remove({
      success: function (res) {
        wx.hideLoading()
        console.log(res)
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },
  pushNotic: async function () {
    wx.showLoading({
      title: '加载中',
    })
    await db.collection('chairs').where({ _id: "notic" }).update({
      data: {
        notice: {
          background: this.data.nbackground,
          color: this.data.ncolor,
          icon: this.data.nicon,
          text: this.data.ntext,
        },
        noticetit: this.data.noticetit,
        noticecon: this.data.noticecon,
        noticetim: this.data.noticetim,
      },
      success: function (res) {
        wx.hideLoading()
        console.log(res)
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  }
})