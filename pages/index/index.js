//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    hint1: "请选择预约时段",
    hint2: "座位需提前一天预约！",
    times: [{
      name: "上午",
      value: "上午：8:00-12:00",checked:"true"
    }, {
      name: "下午",
      value: "下午：12:00-18:00"
    }, {
      name: "晚上",
      value: "晚上：18:00-23:00"
    }],

formSubmit:function(){

    }, 

    radioChange(e) {
     console.log(e.detail.value);
    },
  }
})