import {HTTP} from '../util/http.js'
class ClassicModel extends HTTP {
    // 首页加载最新一期
    getLatest(srcCallback){
        this.request({
            url:'classic/latest',
            success:(res) => {
                srcCallback(res);
                this._setLatestIndex(res.index);
                // 首次加载时也设置缓存
                let key = this._getKey(res.index);
                wx.setStorageSync(key,res)
            }
        })
    }
    // 下边两个函数的封装，，下一页
    getClassic(index, nextOrPervious, srcCallback){
        // console.log(index);
        // 加入缓存
        let key = nextOrPervious == 'next'?
            this._getKey(index+1) : this._getKey(index-1)
        let classic = wx.getStorageSync(key);//获取缓存
        if(!classic){
            this.request({
                url:'classic/'+index+'/'+ nextOrPervious,
                success:(res)=>{
                    console.log(res)
                    wx.setStorageSync(this._getKey(res.index),res)
                    srcCallback(res)
                }
            })
        }else{
            srcCallback(classic)
        }
        // 没加缓存
        // this.request({
        //     url:'classic/'+index+'/'+ nextOrPervious,
        //     success:(res)=>{
        //         srcCallback(res)
        //     }
        // })
    }
    // getPervious(index, srcCallback){
    //     this.request({
    //         url:'classic/'+index+'/previous',
    //         success:(res)=>{
    //             srcCallback(res)
    //         }
    //     })
    // }
    // getNext(index, srcCallback){
    //     this.request({
    //         url:'classic/'+index+'/next',
    //         success:(res)=>{
    //             srcCallback(res)
    //         }
    //     })
    // }
    // 是否是第一期
    isFirst(index){
        return index == 1 ? true:false;
    }
    // 是否是最后一期
    isLatest(index){
        let latest = this._getLatestIndex();
        return index == latest? true :false;
    }
    getMyfavor(srcCallback){
        this.request({
            url:'classic/favor',
            success:(res)=>{
                srcCallback(res)
            }    
        })
    }
    // 获取某一期的详情
    getById(cid, type, success) {
        let params = {
            url: `classic/${type}/${cid}`,
            success: success
        }
        this.request(params)
    }
    // 设置缓存
    _setLatestIndex(index){
        wx.setStorageSync('latest',index);
    }
    // 获取缓存
    _getLatestIndex(){
        return wx.getStorageSync("latest");
    }
    // 缓存名称key
    _getKey(index){
        return 'classic-' + index;
    }
}
export {ClassicModel}