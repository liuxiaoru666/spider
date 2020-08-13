import {Router,Request,Response,NextFunction} from 'express';
import{controller,get,post} from '../decorator/index';
import {getResponseData }from '../utils/util'

//解决：d.ts文件定义不准确
interface bodyRequest extends Request{
    body:{
        [key:string]:string|undefined
    }
 }

 @controller
class LoginController{
    @get('/api/loginStatus')
    loginStatus(req:Request,res:Response){
        const isLogin = !!(req.session?req.session.login:false);
        res.json(getResponseData(isLogin))

    }

    @post('/api/login')
    login(req:Request,res:Response):void{
        const {password} = req.body;
        const isLogin = !!(req.session?req.session.login:false);
        if(isLogin){
            res.json(getResponseData(true))
        }else{
            if(password==='123'&&req.session){
                    req.session.login = true;   
                    res.json(getResponseData(true))
                    
                }else{
                    res.json(getResponseData(false,'登陆失败'))
                }
        }
    }

    @get('/api/logout')
    logout(req:Request,res:Response):void{
        if(req.session){
            req.session.login = undefined
            res.json(getResponseData(true))
        }
    }
}