// components/search/search.js
import {
  KeywordModel
} from "../../models/keyword.js";
// import {
//   BookModels
// } from "../../models/book.js";
const keywordModel = new KeywordModel();
// const bookModel = new BookModels()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hotKeywordList:Array,
    searchResult:Array,
    searchings:Boolean,
    more: { // 属性名
      type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: '', // 属性初始值（可选），如果未指定则会根据类型选择一个
      observer: function(newVal, oldVal, changedPath) {
        console.log(this.properties.more)
         // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
         // 通常 newVal 就是新设置的数据， oldVal 是旧数据
      }
    },
    more:{
      type:String,
      observer:function(){
        console.log(this.properties.more);
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyList:[],
    valueInp:''
    // hotKeywordList:[]
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
      // const val = event.detail.value;
      // keywordModel.addHistory(val);
      this.setData({
        searchings:true,
        valueInp:event.detail.text
      })
      // console.log(event)
      this.triggerEvent("onSreaching",{
        val:event.detail.value || event.detail.text
      },{})
    },
    onTapcancels(event){
      this.setData({
        searchings:false,
        valueInp:""
      })
    },
    _getMore(newVal, oldVal, changedPath){
      console.log(newVal, oldVal, changedPath)
    }
  }
})
