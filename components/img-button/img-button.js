// components/img-button/img-button.js
Component({
  /**
   * 组件的属性列表
   */
  options:{
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    openType:String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onGetuserInfos(event){
      // console.log(event)
      this.triggerEvent('getUserinfo',event.detail,{})
    }
  }
})
