// pages/test/test.js


Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl:""
  },
  
  getQR:function(){
    wx.cloud.callFunction({
      // 要调用的云函数名称
      name: 'getQR',
      // 传递给云函数的event参数
      data: {
        "flag":0,
        "chairIndex":2
      }
    }).then(res => {
     console.log(res.result);
     this.setData({
      imgUrl: wx.arrayBufferToBase64(res.result.buffer)

    })
  
    }).catch(err => {
      console.log(err);
    })
  }
})

