//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    hint1: "请选择预约时段",
    hint2: "座位需提前一天预约！",
    times: [{
      name: "上午",
      value: "上午：8:30-12:30",checked:"true"
    }, {
      name: "下午",
      value: "下午：12:30-18:30"
    }, {
      name: "晚上",
      value: "晚上：18:30-22:30"
    }],

formSubmit:function(){

    }, 

    radioChange(e) {
     console.log(e.detail.value);
    },
  }
})