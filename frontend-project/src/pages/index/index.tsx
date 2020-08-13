import React,{Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import './index.css';
import {Button,message} from 'antd';

interface imgItem{
    imgUrl:string
}
interface State{
    imgData:{
        [prop:string]:imgItem[]
    },
    isLogin:boolean,
    recentImg:imgItem[],
    text:string
}
class Home extends Component{
    state:State = {
        isLogin:true,
        imgData:{},
        recentImg:[],
        text:'显示图片'
    }

    componentDidMount(){
        axios.get('/api/loginStatus').then(res=>{
            const loginStatus = res.data.data;
            if(!loginStatus){
                this.setState({
                    isLogin:false
                })
            }

        })
    }
    getData(){
        axios.get('/api/getData').then(res=>{
            if(res.data?.data){
                this.setState({
                    imgData:res.data.data
                })
                message.success('爬取数据成功')
            }
        })
    }
    showData(){
        const {imgData,recentImg} = this.state;
        if(Object.keys(imgData).length<1){
            message.error('请先爬取图片');
            return;
        }
        this.setState({
            text:'刷新图片'
        })
        message.success('刷新成功')
        const arr:string[] = [];
        for(var i in imgData){
            arr.push(i);
        }
        this.setState(()=>{
            return{
                recentImg:imgData[arr[arr.length-1]]
            }
        })
       
    }
    logout(){
        axios.get('/api/logout').then(res=>{
            if(res.data?.data){
                this.setState({
                    isLogin:false
                })
            }else{
                message.error(res.data.errMsg)
            }
        })
    }

    render(){
        const isLogin = this.state.isLogin;
        if(isLogin){
            return (
                <div className='homePage'>
                    <Button type="primary" block onClick = {this.getData.bind(this)}>爬取图片</Button>
            <Button type="primary" block onClick = {this.showData.bind(this)}>{this.state.text}</Button>
                    <Button type="primary" block onClick = {this.logout.bind(this)}>退出</Button>
                    {/* <ReactEcharts option={this.getOption()} /> */}
                    <div>
                        {
                            this.state.recentImg.map((item,index,imglist)=>{
                                return(
                                    <img src={item.imgUrl} key={index} className='imgItem'></img>
                                )
                            })
                        }
                    </div>
                </div>
            )
        }else{
            return(
                <Redirect to ='/login'></Redirect>
            )
        }
        
    }
}


export default Home;