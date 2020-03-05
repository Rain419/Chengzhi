// pages/profile/profile.js
Page({

  /**
   * 页面的初始数据
   */


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 生成小程序码
  getQrCode(){
    wx.showLoading({
      title: '生成中...',
    })
    wx.cloud.callFunction({
      name: "getQrCode"
    }).then((res) => {
      console.log(res)
      this.setData({
        qrcodeImg: res.result,
        showQrcode: true
      })
      wx.hideLoading()
    })
  },

  // 关闭二维码弹窗
  closePopup(){
    this.setData({
      showQrcode: false
    })
  },

  // 预览二维码图片
  previewImage(){
    wx.previewImage({
      urls: [this.data.qrcodeImg]
    })
  },

  // 触发图片预览，并且长按可保存
  onLoadImage(){
    this.previewImage()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    const len = this.data.shareImage.length;
    let random = Math.floor(Math.random() * len)
    return{
      title: "快来体验音乐的世界 >>",
      path: "/pages/music/music",
      imageUrl: this.data.shareImage[random]
    }
  }
})