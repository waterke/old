const paginationBev = Behavior({
    properties:{
        searchResult:Array,//搜做结果
        total:Number,
        loading:Boolean,//下拉加载控制状态loading，，和异步请求的多次发送
        loadingCenter:Boolean,//中间loading效果状态
        noResult:Boolean,
    },
    data:{
        searchings:false,//搜索结果是否显示
        q:""//搜索内容，，input框内容
    },
    methods:{
        hasTotal(){
            if(this.properties.searchResult.length>=this.properties.total){
                return false;
              }else{
                return true;
              }
        },
        initalize(){
            this.setData({
                searchings:false,
                q:"",
                searchResult: [],
                total:null,
                noResult:false,
                loading:false,//下拉加载控制状态loading，，和异步请求的多次发送
                loadingCenter:false//中间loading效果状态
            })
        },
         // 解锁开锁
         locked(){
            this.setData({
            loading:true
            })
            // this.properties.loading = true;
         },
        unlocked(){
            this.setData({
            loading:false
            })
            // this.data.loading = false;
        },
        showLocked(){
            return this.properties.loading? true:false
        },
    }
})
export {paginationBev}