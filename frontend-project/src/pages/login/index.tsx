import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import { Form, Input, Button,message } from 'antd';
import {LockOutlined } from '@ant-design/icons';
import './index.css'

class loginPage extends Component {
  state = {
    isLogin:false
  }

  onFinish = (values:any) => {
    axios.post('/api/login',qs.stringify({password:values.password})).then(res=>{
      if(res.data.data){
        this.setState({
          isLogin:true
        })
      }else{
        message.error(res.data.errMsg)
      }
    })
  };

  render(){
    const isLogin = this.state.isLogin;
    if(isLogin){
      return(
        <Redirect to = '/'/>
      )
    }else{
      return (
        <div className="login">
          <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={this.onFinish}
        >
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
          </Form.Item>
        </Form>
        </div>
      );
    }
    
  }
};

export default loginPage;