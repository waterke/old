import {HTTP} from "../util/http.js"
class LikeModel extends HTTP{
    getLike(behaviors,artId,ceotroy){
        let url = behaviors == 'like' ? 'like':'like/cancel';
        this.request({
            url:url,
            data:{
                art_id:artId,
                type:ceotroy
            },
            method:'POST'
        })
    }
    getClassicLikeStatus(artId,ceotroy,srcCallback){
        this.request({
            url:'classic/'+ceotroy+'/'+artId+'/favor',
            // get方法不用data传参数
            // data:{
            //     art_id:artId,
            //     type:ceotroy
            // },
            success:srcCallback
        })
    }
}
export {LikeModel}