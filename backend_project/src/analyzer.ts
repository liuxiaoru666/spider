//爬简书四张图片

import fs from 'fs';
import cheerio from 'cheerio';//分析html文件

interface imgJson{
imgUrl:string
}

interface allJsonType{
    [prop:number]:imgJson[]
}

class jianshuAnalyzer{

    getBoardJson(html:string){
        const $ = cheerio.load(html);
        const BoardItems = $('.board a img');
        const jsonInfo :imgJson[]= [];
        BoardItems.map((index,ele)=>{
            jsonInfo.push({imgUrl:ele.attribs.src})
        })
        return {
            time:new Date().getTime(),
            data:jsonInfo
        }
    }

    getAllJson(html:string,filePath:string){
        const infoItem = this.getBoardJson(html);
        var  allJson:allJsonType={};
        if(fs.existsSync(filePath)){
            allJson = JSON.parse(fs.readFileSync(filePath,'utf-8'));
        }
        allJson[infoItem.time]=infoItem.data;

        return JSON.stringify(allJson)
    }

    public analyze(html:string,filePath:string){
        const jsonInfoResult = this.getAllJson(html,filePath);
        return jsonInfoResult;
    }
}

export default jianshuAnalyzer;