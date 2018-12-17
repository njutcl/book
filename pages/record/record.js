// pages/record/record.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNumber: null
  },
  search: function(e) {
    this.setData({
      phoneNumber: e.detail
    })

  },
  submitPhone() {
    var that = this;
    if (!this.data.phoneNumber.value) {
      wx.showToast({
        title: '请先输入手机号',
        icon: 'loading',
        duration: 1000,
        mask: true
      })
    } else {
      wx.request({
        url: 'https://forklp.cn/position/getreuserinfo',
        method: 'POST',
        data: {
          phone: that.data.phoneNumber.value,
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        success: function(res) {
          console.log(that.data.phoneNumber.value);
          console.log(res.data);
          if (res.data.morning) {
            that.setData({
              morning: "已预约"
            })
          } else {
            that.setData({
              morning: "未预约"
            })
          }
          if (res.data.afternoon) {
            that.setData({
              afternoon: "已预约"
            })
          } else {
            that.setData({
              afternoon: "未预约"
            })
          }
          if (res.data.evening) {
            that.setData({
              evening: "已预约"
            })
          } else {
            that.setData({
              evening: "未预约"
            })
          }
          if (res.data.positionId) {
            that.setData({
              id: res.data.positionId
            })
          } else {
            that.setData({
              id: "无"
            })}
            if (res.data.positionName) {
              that.setData({
                name: res.data.positionName
              })
            } else {
              that.setData({
                name:"无"
              })
              }
        },
        fail: function(res) {
          wx.showToast({
            title: '找不到啊',
            icon: 'success',
            duration: 1000,
            mask: true,

          })
        }
      })
    }
  },
  delete: function() {
    var that = this;
    wx.request({
      url: 'https://forklp.cn/position/deletere',
      method: 'POST',
      data: {
        phone: that.data.phoneNumber.value
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
        that.setData({
          id:"无",
          name:"无",
          morning: "未预约",
          afternoon:"未预约",
          evening: "未预约"
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