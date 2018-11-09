// pages/book/book.js
import {
  BookModels
} from '../../models/book.js';
import {
  KeywordModel
} from "../../models/keyword.js";
import {
  randomMore
} from "../../util/common.js"
const bookModel = new BookModels();
const keywordModel = new KeywordModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    book:[],
    searching:true,//点击搜索框显示搜索页面，，状态变量
    hotKeywordList:[],
    searchResult:[],
    // searchings:false,
    more:"",
    loading:false,
    total:null,
    noResult:false,//没有搜索结果
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const bookmodel = bookModel.getHotList();
    bookmodel.then((res)=>{
      this.setData({
        book:res
      })
    })
    bookModel.getHotKeyword().then(res=>{
      this.setData({
        hotKeywordList:res.hot
      })
    })
  },
  onSearch(event){
    this.setData({
      searching:false,
      // total:null,
    })
  },
  onCancel(event){
   this._initPage();
  },
  onSreaching(event){
    bookModel.getSearch(0,event.detail.val)
      .then(res=>{
        this.setData({
          searchResult:res.books,
          total:res.total,
          loadingCenter:false
        })
        this._isTotalNull(this.data.total)
        // console.log("book",this.data.total);
        keywordModel.addHistory(event.detail.val);
      })
  },
  onMoreLoad(event){
    // console.log(event);
    // if(!event.detail.q){
    //   return;
    // }
    // if(this._showLocked()){
    //   return;
    // }
    // const lengths = this.data.searchResult.length;
    // 从第多少条开始加载，说明是现有搜索数据结果的数组长度，在开始加载新的，，内容的话就是
    // this.data.loading = true;//避免用户在同时触发多次回调，，影响效率
    // this._locked()
    bookModel.getSearch(event.detail.lengths,event.detail.q)
    .then(res=>{
      this._unlocked();
      this.setData({
        searchResult:this.data.searchResult.concat(res.books),
      }),()=>{
        this._unlocked();
      }
      // keywordModel.addHistory(event.detail.q);
    })
  },
  // 解锁开锁
  // _locked(){
  //   this.data.loading = true;
  // },
  _unlocked(){
    this.setData({
      loading:false
    })
    // this.data.loading = false;
  },
  _initPage(){
    this.setData({
      searching:true,
      searchResult:[],
      total:null,
      noResult:false
    })
  },
  _isTotalNull(total){
    if(total == 0){
      this.setData({
        noResult:true
      })
    }
  },
  // _showLocked(){
  //   return this.data.loading? true:false
  // },
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
    // console.log(randomMore(16))
    this.setData({
      more:randomMore(16),
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})