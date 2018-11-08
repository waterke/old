// components/episode/episode.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index:{
      type:String,
      // observer属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
      // 通常 newVal 就是新设置的数据， oldVal 是旧数据
      observer:function(newVal, oldVal, changedPath){
          let val = newVal < 10 ? "0"+newVal : newVal;
          // 不要在属性监听函数中更新本身属性值，会造成无限循环，使内存泄漏。
          //  可以修改其他属性，在把值赋给其他值
          // 这个问题也可以通过wxs解决，，，wxs要好好学习
          this.setData({
            _index: val
          })
          // console.log(this.properties.index);
          // return newVal;
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    year:0,
    month:'',
    _index:0,
    _month:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"]
  },
  attached(){
    // console.log(this.data);
    // console.log(this.properties.index)
    let  date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    this.setData({
      year:year,
      month:this.data._month[month]
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
