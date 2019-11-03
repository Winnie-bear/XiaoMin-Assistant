// pages/home/index/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    api:app.globalData.api,
    userName:'',
    category: [],
    doomData:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userName: app.globalData.userInfo.username
    });
    console.log(this.userName);
    const _this=this;
    wx.request({
      url: `${this.data.api}select/category`, 
      method:'post',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        _this.setData({
          category:res.data.data
        });
      }
    });
    wx.request({
      url: `${this.data.api}select/barrage`,
      method: 'post',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        _this.setData({
          doomData: res.data.data
        });
      }
    });
  },
  navigateToClassify(e){
    let categoryID = e.target.dataset.num;
    wx.navigateTo({
      url: `../classify/classify?categoryID=${categoryID}`,
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

  }
})