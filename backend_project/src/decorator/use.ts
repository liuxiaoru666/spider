import { RequestHandler} from 'express';
export function use(middleWiare:RequestHandler){
    return function(target:any,key:string){
        Reflect.defineMetadata('middleware',middleWiare,target,key)
    }
}