
import fs from 'fs';
import path from 'path';
import superagent from 'superagent';//html内容获取

//传入得类需要又一个analyze方法，传入html和filePath,返回json字符串
interface analyze{
    analyze:(html:string,filePath:string) => string
}


class Crowller{
    private filePath = path.resolve(__dirname,'../../data/jianshu.json');
    //获取html
    async getRawHtml(){
    const result = await superagent.get(this.url);
    return result.text;
    }
    
    writeFilte(content:string){
        fs.writeFileSync(this.filePath,content);
    }


    async initSpider(){
        //获取html
        const html = await this.getRawHtml();
        //调用html分析逻辑类，获得最终json
        const fileContent = this.analyzer.analyze(html,this.filePath);
        //写入josn
       this.writeFilte(fileContent)
    }

    //
    constructor(private url:string,private analyzer:analyze){
        this.initSpider();
    }
}
// const  url = 'https://www.jianshu.com/';

// const analyzer = new jianshuAnalyzer();
// const crowller = new Crowller(url,analyzer);

export default Crowller;