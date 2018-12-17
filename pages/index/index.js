//index.js
//获取应用实例
const app = getApp()

Page({
  data: {

    times: [{
      value: "morning",
      name: "上午：8:30-12:30",
      checked: "true"
    }, {
      value: "afternoon",
      name: "下午：12:30-18:00"
    }, {
      value: "evening",
      name: "晚上：18:00-22:30"
    }],
    time: 'morning',
  },
  checkboxChange(e) {
    var choice = e.detail.value;
    this.setData({
      time: choice
    })
  },

  formSubmit: function() {
    var that = this;
    wx.navigateTo({
      url: '../preorder/preorder?time=' + that.data.time,
    })
  },
  toRecord: function() {
    wx.navigateTo({
      url: '../record/record',
    })


  }


})
>>>>>>> f53653f33b7e36c00970b214fb8c72b18709aebc
