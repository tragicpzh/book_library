import React, { useState } from 'react';
import { Form, Input, Icon, Button, Card,  message ,Select,Cascader} from 'antd';
import {FormComponentProps} from "antd/lib/form";
import style from './index.less'
import {history} from 'umi';
import {useDispatch} from 'dva';
import RcCascader from 'rc-cascader'

const Login=(props:FormComponentProps)=>{
  const dispatch=useDispatch();
  const [formVisible,setVisible]=useState(false);
  const handleSubmit=(e:any)=>{
    e.preventDefault();
    props.form.validateFieldsAndScroll((err,values)=>{
      if(!err){
        let username=props.form.getFieldValue('username');
        let password=props.form.getFieldValue('password');
        dispatch({
          type:'user/login',
          payload:{
            username,
            password
          },
          callback:(flag:any)=>{
            if(flag===true){
              message.success("登录成功");
              history.push('/users')
            }
            else{
              message.error("登录失败")
            }
          }
        })
      }
    })
  }
  const register=()=>{
    setVisible(true);
  }
  const handleRegister=(e:any)=>{
    e.preventDefault();
    props.form.validateFieldsAndScroll((err,values)=>{
      if(!err){
        let username=props.form.getFieldValue("_username");
        let password=props.form.getFieldValue("_password");
        let role=props.form.getFieldValue("_role");
        dispatch({
          type:'user/register',
          payload:{
            username,
            password,
            role
          },
          callback:(flag:any)=>{
            if(flag===true){
              message.success("注册成功");
              setVisible(false);
            }
            else{
              message.error("注册失败");
            }
          }
        })
      }
    })
  }
  const toNewPage=()=>{
    const newPage=window.open('https://www.baidu.com',"test");
  }
  const {getFieldDecorator}=props.form;
  return(
    <div className={style.normal} id="oi">{
      formVisible===false
      ?
        <Card size="default">
        <Form onSubmit={handleSubmit}>
          <Form.Item>
            {getFieldDecorator('username', {
                rules: [
                  {
                    required: true,
                    message: 'please input your username'
                  }
                ]
              }
            )(<Input
              prefix={<Icon type="user"/>}
              placeholder="username"
            />)
            }
          </Form.Item>
          <Form.Item>
            {
              getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: 'please input your password'
                    },
                  ]
                }
              )(<Input
                prefix={<Icon type="lock"/>}
                type="password"
                placeholder="password"
              />)
            }
          </Form.Item>
          <Form.Item>
            {
              <>
                <Button type="primary" htmlType="submit" style={{ width: '100%' }}>Log in</Button>
                <Button onClick={register} style={{ width: '100%' }}>Register</Button>
              </>
            }
          </Form.Item>
        </Form>
      </Card>
      :
        <Card size="default">
          <Form onSubmit={handleRegister}>
            <Form.Item>
              {getFieldDecorator('_username', {
                  rules: [
                    {
                      required: true,
                      message: 'please input your username'
                    }
                  ]
                }
              )(<Input
                prefix={<Icon type="user"/>}
                placeholder="username"
              />)
              }
            </Form.Item>
            <Form.Item>
              {
                getFieldDecorator('_password', {
                    rules: [
                      {
                        required: true,
                        message: 'please input your password'
                      },
                    ]
                  }
                )(<Input
                  prefix={<Icon type="lock"/>}
                  type="password"
                  placeholder="password"
                />)
              }
            </Form.Item>
            <Form.Item>{
                getFieldDecorator('_role',{
                  rules:[
                    {
                      required:true,
                      message:'please input your role'
                    }
                  ]
                })(
                  <Select placeholder="role">
                    <Select.Option value="student">student</Select.Option>
                    <Select.Option value="teacher">teacher</Select.Option>
                    <Select.Option value="admin">admin</Select.Option>
                  </Select>
                )
            }</Form.Item>
            <Form.Item>{
              <Button type="primary" htmlType="submit" style={{ width: '100%' }}>Register</Button>
            }</Form.Item>
          </Form>
        </Card>
    }
      <a type='primary' onClick={toNewPage}>新页面</a>
    </div>
  )
}
const LoginForm=Form.create({name:'LoginForm'})(Login)
export default LoginForm;
