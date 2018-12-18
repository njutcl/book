// pages/record/record.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNumber: null, array: [{
      name: "姓名",
      src: "../images/logo1.png",
    }, {
      name: "座位号",
      src: "../images/logo2.png",
    }, {
      name: "上午",
      src: "../images/logo3.png",
    }, {
      name: "下午",
      src: "../images/logo4.png",
    }, {
      name: "晚上",
      src: "../images/logo5.png",
      }], position: ["1桌1座", "1桌2座", "1桌3座", "1桌4座", "2桌1座", "2桌2座", "2桌3座", "2桌4座", "3桌1座", "3桌2座", "4桌1座", "4桌2座", "4桌3座", "4桌4座", "5桌1座", "5桌2座", "5桌3座", "5桌4座", "6桌1座", "6桌2座", "7桌1座", "7桌2座", "7桌3座", "7桌4座", "7桌5座", "7桌6座", "8桌1座", "8桌2座", "8桌3座", "8桌4座", "8桌5座", "8桌6座",]
  },
  search: function(e) {
    this.setData({
      phoneNumber: e.detail
    })
  },
   submitPhone() {
    var that = this;
     var value1 = "array[0].value";
     var value2 = "array[1].value";
     var value3 = "array[2].value";
     var value4 = "array[3].value";
     var value5 = "array[4].value";
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
            if (res.data.user1Phone == that.data.phoneNumber.value) {
              {
                that.setData({
                  [value3]: "已预约"
                })
              }
            }
            else {

              that.setData({
                [value3]: "已被他人预约"
              })
            }
          } else {
            that.setData({
              [value3]: "未预约"
            })
          }
          if (res.data.afternoon) {
            if (res.data.user2Phone == that.data.phoneNumber.value){
            {that.setData({
              [value4]: "已预约"
            })}}
            else{
              
                that.setData({
                  [value4]: "已被他人预约"
                })
            }
          } else {
            that.setData({
              [value4]: "未预约"
            })
          }
          
          if (res.data.evening) {
            if (res.data.user3Phone == that.data.phoneNumber.value) {
              {
                that.setData({
                  [value5]: "已预约"
                })
              }
            }
            else {

              that.setData({
                [value5]: "已被他人预约"
              })
            }
          } else {
            that.setData({
              [value5]: "未预约"
            })
          }
          if (res.data.positionId) {
            that.setData({
              [value2]: that.data.position[res.data.positionId-1]
            })
          } else {
            that.setData({
             [value2]: "无"
            })
          }
          switch (that.data.phoneNumber.value) {
            case res.data.user1Phone:
              that.setData({
                [value1]: res.data.user1Name
              });break;
            case res.data.user2Phone:
              that.setData({
                [value1]: res.data.user2Name
              }); break;
      
            case res.data.user3Phone:
              that.setData({
                [value1]: res.data.user3Name
              }); break;
            default:
              that.setData({
                [value1]: "无"
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
    var value1 = "array[0].value";
    var value2 = "array[1].value";
    var value3 = "array[2].value";
    var value4 = "array[3].value";
    var value5 = "array[4].value";
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
          [value1]: "无",
         [value2]: "无",
         [value3]: "未预约",
         [value4]: "未预约",
          [value5]: "未预约"
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
    return {
      title: '小留同学自习预约选座小程序',
      desc: '从现在开始去小留同学自习需要预约选座啦，欢迎大家提前预约！',
      path: '/pages/index/index'
    }
  }
  
})