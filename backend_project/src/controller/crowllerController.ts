import fs from 'fs';
import path from 'path'
import {Router,Request,Response,NextFunction} from 'express';
import{controller,use,post,get} from '../decorator';
import {getResponseData }from '../utils/util'
import Crowller from '../utils/crowller';
import jianshuAnalyzer from '../analyzer';

//解决：d.ts文件定义不准确
interface bodyRequest extends Request{
    body:{
        [key:string]:string|undefined
    }
 }

 //登陆校验中间件
const checkLogin = (req:Request,res:Response,next:NextFunction):void=>{
    const isLogin =!! (req.session?req.session.login:false);
    if(isLogin){
        next();
    }else{
        res.json(getResponseData(null,'请先登陆'))
    }
}

 @controller
class crowllercontroller{
    @get('/api/getData')
    @use(checkLogin)
    getData(req:Request,res:Response):void{
        const  url = 'https://www.jianshu.com/';
        const analyzer = new jianshuAnalyzer();
        new Crowller(url,analyzer);
        // res.json(getResponseData('数据获取成功'))
        try{
            const filePath = path.resolve(__dirname,'../../data/jianshu.json');
            const result = fs.readFileSync(filePath,'utf-8');
            res.json(getResponseData(JSON.parse(result)))
           }catch(e){
            res.json(getResponseData('数据不存在'))
           }
    }
}