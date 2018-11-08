// 搜索model   缓存历史搜索记录

class KeywordModel {
    key = "q"
    maxLength = 10
    getHistory(){
        const words = wx.getStorageSync(this.key);
        if(!words){
            return [];
        }
        return words;
    }
    getHot(){

    }
    addHistory(keyword){
        if(!keyword){
            return;
        }
        let words = this.getHistory();
        let has = words.includes(keyword);
        if(!has){
            // 设置数组长度最长为10
            if(words.length >= this.maxLength){
                words.pop();  //大于等于10的时候删除最后一个，在添加第一个
            }
            // 添加到数组第一位
            words.unshift(keyword)
            wx.setStorageSync(this.key, words);
        }
    }
}
export {KeywordModel}