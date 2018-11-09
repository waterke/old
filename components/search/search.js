// components/search/search.js
import {
  KeywordModel
} from "../../models/keyword.js";
import {paginationBev} from "../behaviors/pagegation.js"
// import {
//   BookModels
// } from "../../models/book.js";
const keywordModel = new KeywordModel();
// const bookModel = new BookModels()
Component({
  /**
   * 组件的属性列表
   */
  behaviors:[paginationBev],
  properties: {
    hotKeywordList:Array,
    more: { // 属性名
      type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: '', // 属性初始值（可选），如果未指定则会根据类型选择一个
      observer: "getMore",
      // function(newVal, oldVal, changedPath) {
      //   console.log(this.properties.more)
      //    // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
      //    // 通常 newVal 就是新设置的数据， oldVal 是旧数据
      // }
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyList:[],
    searchs:false
  },
  attached(){
    // console.log(this.properties.more)
    // const historyList = keywordModel.getHistory();
    this.setData({
      historyList:keywordModel.getHistory()
    });
    // const hotKeyword = bookModel.getHotKeyword();
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCancel(event){
      this.triggerEvent("cancel",{},{})
    },
    onHistory(event){
      this.setData({
        searchings:true,//设置显示搜索结果部分
        q:event.detail.value || event.detail.text,//设置当前搜索的内容
        loadingCenter:true
      })
      this.triggerEvent("onSreaching",{
        val:this.data.q,
      },{})
    },
    onTapcancels(event){
      this.initalize();
    },
    getMore(){
        // console.log("在加载哦~");
        if(!this.data.q){
          return;
        }
        if(this.showLocked()){
          return;
        }
        if(this.hasTotal()){
          this.locked();
          this.triggerEvent("onMoreLoad",{
            q:this.data.q,
            lengths:this.properties.searchResult.length
          },{})
        }
    },
  }
})
