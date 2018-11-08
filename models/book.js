import {
    HTTP
} from '../util/http-p.js'
class BookModels extends HTTP {
    // 书单列表
    getHotList(){
        return this.request({
            url:'book/hot_list',
        })
    }
    // 获取点赞状态
    getBookFavor(bid){
        return this.request({
            url:`book/${bid}/favor`
        })
    }
    // 获取书籍详情
    getDetailbook(bid){
        return this.request({
            url:`book/${bid}/detail`
        })
    }
    // 获取书籍短评
    getBookComment(bid){
        return this.request({
            url:`book/${bid}/short_comment`
        })
    }
    getAddComments(bid,content){
        return this.request({
            url:"book/add/short_comment",
            method:'POST',
            data:{
                book_id:bid,
                content:content,
            }
        })
    }
    getHotKeyword(){
        return this.request({
            url:'book/hot_keyword'
        })
    }
    getSearch(start,content){
        return this.request({
            url:'book/search?summary=1',
            data:{
               start:start,
               q:content 
            }
        })
    }
}
export {BookModels}