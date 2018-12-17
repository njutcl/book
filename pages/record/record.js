// pages/record/record.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNumber: null
  },
  array: [],

  search: function(e) {
    this.setData({
      phoneNumber: e.detail
    })

  },
  submitPhone() {
    var that = this;
    if (this.data.phoneNumber == null) {
      wx.showToast({
        title: '请先输入手机号',
        icon: 'loading',
        duration: 1000
      })
    } else {
      wx.request({
        url: 'https://forklp.cn/position/getreuserinfo',
        method: 'POST',
        data: {
          phone: that.data.phoneNumber
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        success: function(res) {
          console.log(res.data);
          that.setData({

          })
        }
      })
    }
  },
  delete: function() {
    wx.request({
      url: 'https://forklp.cn/position/deletere',
      method: 'POST',
      data: {
        phone: that.data.phoneNumber
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      success: function(res) {
        wx.showToast({
          title: '删除成功！',
          icon: "success",
          duration: 1000
        })
      }
    })
  },


/**
 * 生命周期函数--监听页面加载
 */
onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})