
import {ClassicModel} from "../../models/classic.js";
import {BookModels} from '../../models/book.js'
const classicModel = new ClassicModel();
const bookModels = new BookModels()
// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null,
    authorize:false,
    count:0,
    classics:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.userAuthorsize();
    this.getLike();
    this.getMyFavors()
      // wx.getUserInfo({
      //   // withCredentials: 'false',
      //   // lang: 'zh_CN',
      //   // timeout:10000,
      //   success: (result)=>{
      //    console.log(result) 
      //   },
      //   // fail: ()=>{},
      //   // complete: ()=>{}
      // });
  },
  userAuthorsize(){
    wx.getSetting({
      success: (result)=>{
        // console.log(result.authSetting['scope.userInfo'])
        if(result.authSetting['scope.userInfo']){
          // console.log('success')
          // 若条件符合说明用户授权成功
          wx.getUserInfo({
            success:data=>{
              this.setData({
                authorize:true,
                userInfo:data.userInfo
              })
            }
          })
        }else{
          // console.log('err')
        }
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },
  OngetUserInfo(event){
    // console.log(event.detail.userInfo);
    const userInfo = event.detail.userInfo;
    console.log(userInfo)
    if(userInfo){
      this.setData({
        authorize:true,
        userInfo:userInfo
      })
    }
  },
  getLike(event){
    bookModels.getBookLike().then(res=>{
        this.setData({
          count:res.count
        })
    })
  },
  onJumpToAbout(event){
    wx.navigateTo({
      url: '/pages/about/about',
      // success: (result)=>{
        
      // },
      // fail: ()=>{},
      // complete: ()=>{}
    });
  },
  onStudy(event){
    wx.navigateTo({
      url: '/pages/course/course',
    })
  },
  getMyFavors(){
    classicModel.getMyfavor(res=>{
      this.setData({
        classics:res
      })
      // console.log(this.data.classics)
    })
  },
  onJumpToDetail(event){
    const cid = event.detail.cid
    const type = event.detail.type
    // wx.navigateTo  跳转到详情页
    wx.navigateTo({
      url:`/pages/classic-detail/classic-detail?cid=${cid}&type=${type}`
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
    this.getMyFavors()
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