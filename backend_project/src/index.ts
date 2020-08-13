import express ,{Request,Response,NextFunction}from 'express';
import bodyParser from 'body-parser';//解析请求体
import cookieSession from 'cookie-session'//存储登陆状态
import './controller/loginController';
import './controller/crowllerController';
import router from './router';

const app = express();
//bodyParser中间件解析请求体
app.use(bodyParser.urlencoded({
    extended: true
  }));
  
app.use(
  cookieSession({
    name:'session',
    keys:['lxr'],
    maxAge:24*60*60*1000
  })
)
app.use(router);

app.listen(7002,()=>{
    console.log('server is running')
})