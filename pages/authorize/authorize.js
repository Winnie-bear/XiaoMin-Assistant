const app = getApp();
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function() {
    var that = this;
    wx.login({
      success: function(res) {
        if (res.code) {
          console.log("res.code:" + res.code);
          let global = app.globalData; //这里存储了appid、secret、token串  
          let url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + global.appid + '&secret=' + global.secret + '&js_code=' + res.code + '&grant_type=authorization_code';
          wx.request({
            url: url,
            data: {},
            method: 'GET',
            success: function(res) {
              const user = {};
              user.openid = res.data.openid;
              user.expires_in = Date.now() + res.data.expires_in;
              wx.setStorageSync('user', user); //存储openid 
            }
          });
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
    // 查看是否授权
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function(res) {
              //从数据库获取用户信息
              that.queryUsreInfo();
              //用户已经授权过
              wx.switchTab({
                url: "/pages/home/index/index"
              })
            }
          });
        }
      }
    })
  },
  bindGetUserInfo: function(e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      const user = wx.getStorageSync('user');
      console.log(e.detail.userInfo);
      //插入登录的用户的相关信息到数据库
      wx.request({
        url: app.globalData.api + 'insert/information',
        data: {
          openid: user.openid,
          username: e.detail.userInfo.nickName,
          portrait: e.detail.userInfo.avatarUrl,
          sex: e.detail.userInfo.gender,
          grade:'2016'
        },
        method: 'post',
        header: {
          'content-type': 'application/json'
        },
        success: function(res) {
          //从数据库获取用户信息
          that.queryUsreInfo();
          console.log("插入小程序登录用户信息成功！");
        }
      });
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },
  //获取用户信息接口
  queryUsreInfo: function() {
    const user = wx.getStorageSync('user');
    wx.request({
      url: app.globalData.api + 'select/information',
      data: {
        openid: user.openid
      },
      method: 'post',
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        app.globalData.userInfo = res.data.data;
        //获取到用户信息之后再跳转主页
        wx.switchTab({
          url: "/pages/home/index/index"
        });
      }
    });
  },

})