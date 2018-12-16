// pages/index/register.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // verifCode:'',
    account:'',
    verifText:'获取验证码',
    currentTime:61,
    btndisabled:false,
    
    //globalData中的选择的时间
    time:"",
    
    
    selectedDesk:"0",
    selectedChair:"0",
    userPhone:"",
    sourceData:{},
    availableDesk:{
      
    },
    washedData:{

    },
    availableChairs:{},//存放pos
    deskBtnClicked:false,
    chairBtnClicked:false,
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  clickSelectDesk: function(){
   
      this.setData({
        deskBtnClicked:true,
      });

  
  },
  selectDesk: function(event){
    this.setData({
      selectedDesk:event.target.dataset.id+"",
    });
    this.setData({
      deskBtnClicked:false,
    })
    console.log(event.target.dataset.id);
    this.setData({
      availableChairs:this.data.availableDesk[id],
    });
  },
  selectChair: function(event){
    this.setData({
      selectedChair:event.target.dataset.id+"",
    });
    this.setData({
      chairBtnClicked:false,
    });
  },
  clickSelectChair: function(){
    this.setData({
      chairBtnClicked:true,
    })
  },
  onLoad: function (options) {
    // wx.navigateTo({
    //   url: '../logs/logs?name=time'
    // })


    // this.setData({
    //   time:options.time,
    //   userPhone:options.userPhone,
    // });


    
    //请求所有预约
    // /position/getall 包含手机号信息
    let that = this;
    wx.request({
      url: 'http://132.232.91.230:8080/position/getall',
      method:'POST',
      
      success: function(res){
        console.log(res.data);
        console.log("data: "+res.data[0].positionId);
        that.setData({
          sourceData:res.data,
        });
        
        that.setData({
        availableDesk: {
          1:{
            1:res.data[-1],
            2:res.data[-2],
            3:res.data[-3],
            4:res.data[-4],
          },
          2: {
            1: res.data[-5],
            2: res.data[-6],
            3: res.data[-7],
            4: res.data[-8],
          },
          3: {
            1: res.data[-9],
            2: res.data[-10],
          },
          4: {
            1: res.data[-11],
            2: res.data[-12],
            3: res.data[-13],
            4: res.data[-14],
          },
          5: {
            1: res.data[-15],
            2: res.data[-16],
            3: res.data[-17],
            4: res.data[-18],
          },
          6: {
            1: res.data[-19],
            2: res.data[-20],
          },
          7: {
            1: res.data[-21],
            2: res.data[-22],
            3: res.data[-23],
            4: res.data[-24],
            5: res.data[-25],
            6: res.data[-26],
          },
          8: {
            1: res.data[-27],
            2: res.data[-28],
            3: res.data[-29],
            4: res.data[-30],
            5: res.data[-31],
            6: res.data[-32],
          },
        }
      })
      ;
      for (var i =1; i<=8; i++)
      {
        for(var j=1;j<=that.data.availableDesk[i].length; j++){
          if (that.data.availableDesk[i][j][that.data.time]==true)//某个座位已被占用
          {
            delete that.data.availableDesk[i][j];
          }
        } ;
        if (that.data.availableDesk[i].length==0){
          delete that.data.availableDesk[i];//某个桌子全部座位都被占用，删除某个桌子号
        }
      };
      if (that.data.availableDesk.length==0){
        wx.showToast({
          title: '无剩余座位，稍后再来',
          icon:'loading',
          duration:2000,
        })
        setTimeout(function(){
          wx.hideToast();
        }, 2000)
        wx.navigateTo({
          url: '../index/index',
        })
      }
      for (var i=0; i<30; i++){
        if (res.data[i].userPhone==this.data.userPhone){
          wx.showToast({
            title: '你已预约',
            icon: 'loading',
            duration: 2000,
          })
          setTimeout(function () {
            wx.hideToast();
          }, 2000)
          wx.navigateTo({
            url: '../index/index',
          })
        }
      }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  backLoginBtn: function(){
    wx.navigateTo({
      url: '../login/login',
    })
  },
  forgetPwd: function (options) {
    wx.navigateTo({
      url: '../forgetPwd/forgetPwd',
    })
  },
  getVerifCode: function(){
    var that = this;
    console.log(this.data.userPhone);
    if (this.data.userPhone.length!=11){
      wx.showToast({
        title:'手机号码错误',
        icon:'loading',
        duration:2000,
      })
      setTimeout(function(){
        wx.hideToast();
      }, 2000)
    }
    else{
      wx.request({
        url: 'http://132.232.91.230:8080/position/getcode',
        header:{
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        method:'POST',
        
        data:{
          'phonenumber':this.data.userPhone,

        },
        success: function(res){
          console.log(res.data);
          that.setData({
            btndisabled:true,
          })
          let interval = null;
          let currentTime = that.data.currentTime;
          interval = setInterval(function(){
            currentTime--;
            that.setData({
              verifText:currentTime+'s后获取',
            })
            if (currentTime<=0){
              clearInterval(interval);
              that.setData({
                verifText:'重新获取',
                btndisabled:false,
                currentTime:61,
              })
            }
          }, 1000)
        },
      })
    }
  },
  inputName: function(event){
    this.setData({
      name:event.detail.value,
    });
    console.log(event.detail.value);
  },
  formSubmit: function (e) {
    console.log(e.detail.value.verifCode);
    if (e.detail.value.name.length == 0 ) {

      wx.showToast({

        title: '姓名不得为空!',

        icon: 'loading',

        duration: 2000

      })

      setTimeout(function () {

        wx.hideToast()

      }, 2000)

    } 
    else if (e.detail.value.verifCode.length==0){
      wx.showToast({
        title: '验证码为空',
        icon: 'loading',
        duration:2000
      })
      setTimeout(function () {

        wx.hideToast()

      }, 2000)
    }
    else if (this.data.selectedChair=="0"||this.data.selectDesk=="0"){
      wx.showToast({
        title: '请选择座位',
        icon: 'loading',
        duration: 2000
      })
      setTimeout(function () {

        wx.hideToast()

      }, 2000)
    }
    else {
      
      wx.request({

        url: 'http://132.232.91.230:8080/position/reservation',

        header: {

          "Content-Type": "application/x-www-form-urlencoded"

        },

        method: "POST",

        data: {
          phone:this.data.userPhone,
          time:this.data.time,
          code:this.data.code,
          id:this.data.availableDesk[this.data.selectedDesk][this.data.selectedChair].positionId,
          name:this.data.name,
         },

        success: function (res) {
          wx.showToast({
            title: '预约成功',
            icon:'success',
            duration:2000,
          });
          setTImeout(function(){
            wx.hideToast();
          }, 2000);
          wx.navigateTo({
            url: '../index/index',
          })
          
            
        },
        fail: function(){
          console.log("submit fail");
        },
        complete: function(){
          console.log("submit complete");
        },

        
      })

    }

  },

})
