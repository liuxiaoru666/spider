import  'reflect-metadata';
enum Methods{
    get = 'get',
    post = 'post'
}
function createDecorator(type:Methods){
    return function(path:string){
        return function(target:any,key:string){
            Reflect.defineMetadata('path',path,target,key)
            Reflect.defineMetadata('method',type,target,key)
        }
    }
}

export const post = createDecorator(Methods.post);
export const get = createDecorator(Methods.get);