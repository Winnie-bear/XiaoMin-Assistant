// pages/cs/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    api:app.globalData.api,
    problem:'',
    chatLog:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
  //获取用户输入的问题
  getProblem(e){
    this.setData({
      problem:e.detail.value
    });
  },
  //发送问题
  send(){
    const _this = this;
    wx.request({
      url: `${this.data.api}select/ask`,
      data:{
        problem:this.data.problem
      },
      method: 'post',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        const newItem=res.data;
        _this.data.chatLog=_this.data['chatLog'].concat(newItem);
        console.log(_this.data.chatLog);
        _this.setData({
          chatLog: _this.data.chatLog,
          problem:''
        });
      }
    })
  }
})