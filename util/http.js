import {config} from '../config.js'
const tips = {
    "1": "抱歉，发现了一个错误",
    "1000":'输入参数错误',	
    "1001": "输入的json格式不正确",
    "1002": "找不到资源",
    "1003":"未知错误",
    "1004":"禁止访问",
    "1005":"不正确的开发者key",
    "1006":"服务器内部错误",
    "400" :"请求包含不支持的参数",
    "401" :	"UNAUTHORIZED 	未授权",
    "403" :	"FORBIDDEN 	被禁止访问",
    "404" :"NOT FOUND 	请求的资源不存在",
    "413" :"REQUIRED LENGTH TOO LARGE 	上传的File体积太大",
    "500" :"INTERNAL SERVER ERROR 	内部错误"
}
// 简单的http请求封装
class HTTP{
    request(params){
        // 默认为get方式
        if(!params.method){
            params.method == 'GET'
        }
        wx.request({
            url: config.api_base_url + params.url,
            method:params.method,
            header:{
                "Content-type":'application/json',
                appkey:config.appkey
            },
            data:params.data,
            success:(res)=>{
                let code = res.statusCode.toString();
                if(code.startsWith('2')){
                    // 返回请求结果
                    // 这样写指的是，如果传的有回调函数就执行回调函数，没有就不执行，相当于if语句判断是否为空
                    params.success && params.success(res.data)
                }else{
                    this._show_error(res.data.error_code.toString())
                }
            },
            fail:(err) =>{
                this._show_error("1")
                // wx.showToast({
                //     title: tips["1"],
                //     icon: 'none',
                //     duration: 2000
                // })
            }
        })
    }
    _show_error(err_code){
        if(!err_code){
            err_code = '1';
        }
        wx.showToast({
        title: tips[err_code] ? tips[err_code] : tips['1'],
        icon: 'none',
        duration: 2000
        })
    }
}

export {HTTP}








