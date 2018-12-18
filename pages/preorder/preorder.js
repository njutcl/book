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
    time:[],
    
    
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
      availableChairs:this.data.availableDesk[event.target.dataset.id],
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
    wx.setNavigationBarTitle({
      title: '预约座位',
    });
    let array = [];
    //time要改为数组['morning','afternoon','evening'];
    //判断位置是否被占用处，要分别判断time的每一项是否成立
    //最后是上传时要将time转变为‘012’
    if (options.time.match('morning')){
      array.push('morning');
    }
    if (options.time.match('afternoon')) {
      array.push('afternoon');
    }
    if (options.time.match('evening')) {
      array.push('evening');
    }
    this.setData({
      time:array,
      // time:"morning",
      // userPhone:options.userPhone,
    });
    console.log(this.data.time);

    
    //请求所有预约
    // /position/getall 包含手机号信息
    let that = this;
    wx.request({

      url: 'https://forklp.cn/position/getallre',

      method:'POST',
      
      success: function(res){
        // console.log(res.data);
        // console.log("data: "+res.data[0].positionId);
        that.setData({
          sourceData:res.data,
        });
        
        that.setData({
        availableDesk: {
          1:{
            1:res.data[0],
            2:res.data[1],
            3:res.data[2],
            4:res.data[3],
          },
          2: {
            1: res.data[4],
            2: res.data[5],
            3: res.data[6],
            4: res.data[7],
          },
          3: {
            1: res.data[8],
            2: res.data[9]
          },
          4: {
            1: res.data[10],
            2: res.data[11],
            3: res.data[12],
            4: res.data[13],
          },
          5: {
            1: res.data[14],
            2: res.data[15],
            3: res.data[16],
            4: res.data[17],
          },
          6: {
            1: res.data[18],
            2: res.data[19],
          },
          7: {
            1: res.data[20],
            2: res.data[21],
            3: res.data[22],
            4: res.data[23],
            5: res.data[24],
            6: res.data[25],
          },
          8: {
            1: res.data[26],
            2: res.data[27],
            3: res.data[28],
            4: res.data[29],
            5: res.data[30],
            6: res.data[31],
          },
        }
      })
      ;
      console.log(res.data);
      console.log(that.data.availableDesk);
      for (var i =1; i<=8; i++)
      {
        console.log(that.data.time);
        console.log(that.data.availableDesk);
        console.log(Object.keys(that.data.availableDesk[i]).length);
        for (var j = 1; j <= Object.keys(that.data.availableDesk[i]).length; j++){
          for (var k=0;k<that.data.time.length;k++){
            if (that.data.availableDesk[i][j][that.data.time[k]] == true)//某个座位已被占用
            {
              delete that.data.availableDesk[i][j];
              break;
            }
          }
          
        } 
        if (that.data.availableDesk[i].length==0){
          delete that.data.availableDesk[i];//某个桌子全部座位都被占用，删除某个桌子号
        }
      };
      if (that.data.availableDesk.length==0){
        wx.showToast({
          title: '无剩余座位，稍后再来',
          icon:'loading',
          duration:1000,
        })
        setTimeout(function(){
          wx.hideToast();
        }, 2000)
        wx.navigateTo({
          url: '../index/index',
        })
      }
      console.log(that.data.availableDesk);
      // let userPhoneKey;
      // for (var i=0; i<that.data.time.length;i++){
      //   if (that.data.time == "morning") {
      //     userPhoneKey = 'user1Phone';
      //   }
      //   else if (that.data.time == "afternoon") {
      //     userPhoneKey = 'user2Phone';
      //   }
      //   else {
      //     userPhoneKey = 'user3Phone';
      //   }
      // }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   

  },
  inputPhone: function(event){
    this.setData({
      userPhone:event.detail.value,
    });
    // console.log(this.data.userPhone);
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
        duration:1000,
      })
      setTimeout(function(){
        wx.hideToast();
      }, 2000)
    }
    else{
      console.log(this.data.userPhone);
      wx.request({
        url: 'https://forklp.cn/position/getcode',
        header:{
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        method:'POST',
        
        data:{
          'phone':this.data.userPhone,
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
    // console.log(event.detail.value);
  },
  formSubmit: function (e) {
    console.log(e.detail.value.verifCode);
    if (e.detail.value.name.length == 0 ) {

      wx.showToast({

        title: '姓名不得为空!',

        icon: 'loading',

        duration: 1000

      })

      setTimeout(function () {

        wx.hideToast()

      }, 2000)

    } 
    else if (e.detail.value.verifCode.length==0){
      wx.showToast({
        title: '验证码为空',
        icon: 'loading',
        duration:1000
      })
      setTimeout(function () {

        wx.hideToast()

      }, 2000)
    }
    else if (this.data.selectedChair=="0"||this.data.selectDesk=="0"){
      wx.showToast({
        title: '请选择座位',
        icon: 'loading',
        duration: 1000
      })
      setTimeout(function () {

        wx.hideToast()

      }, 2000)
    }
    else {
      let timeid="";
      for (var i=0; i<this.data.time.length;i++){
        if (this.data.time[i] == "morning") {
          timeid += 0;
        }
        else if (this.data.time[i] == "afternoon") {
          timeid += 1;
        }
        else  {
          timeid += 2;
        }
      }
      
      console.log("timeid"+timeid);
      console.log("id:" + this.data.availableDesk[this.data.selectedDesk][this.data.selectedChair].positionId);
      console.log("code:"+e.detail.value.verifCode);
      wx.request({

        url: 'https://forklp.cn/position/reservation',

        header: {

          "Content-Type": "application/x-www-form-urlencoded"

        },

        method: "POST",
        

        data: {
          phone:this.data.userPhone,
          time:timeid,
          code:e.detail.value.verifCode,
          id:this.data.availableDesk[this.data.selectedDesk][this.data.selectedChair].positionId,
          name:this.data.name,
         },

        success: function (res) {
        
          console.log(res);
          if (res.data=="验证码错误"){
            wx.showToast({
              title: '验证码错误',
              icon:'loading',
              duration:1500,
            });
            setTimeout(function(){
              wx.hideToast();
            }, 2000);
            
          }
          else if (res.data=="预约成功"){
            wx.showModal({
              title: '预约成功',
              content: '即将返回主页',
              success: function(res){
                if (res.confirm){
                  wx.navigateTo({
                    url: '../index/index',
                  })
                }
              }
            })
          
          }
          else if (res.data =="您已经预约座位"){
            wx.showToast({
              title: '你已预约',
              icon:'loading',
              duration:1500,
            });
            setTimeout(function(){
              wx.hideToast();
            },2000);
            wx.navigateTo({
              url: '../index/index',
            })
          }
          else{
            wx.showToast({
              title: res.data,
              icon: 'loading',
              duration: 1500,
            });
            setTimeout(function () {
              wx.hideToast();
            }, 2000);
          }
          
            
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
