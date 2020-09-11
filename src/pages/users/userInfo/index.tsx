import React from 'react';
import {connect,useDispatch} from 'dva';
import { Button, Form, Input, message } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { useSelector } from '@@/plugin-dva/exports';

const IndexForm=(props:FormComponentProps)=>{
  const dispatch=useDispatch();
  const {
    username,
    password,
    email,
    telephone
  }=useSelector((state:any)=>state['user']);
  const {getFieldDecorator}=props.form;

  const handleUser=(e:any)=>{
    e.preventDefault();
    props.form.validateFieldsAndScroll((err,values)=>{
      if(!err){
        const getvalue=props.form.getFieldValue;
        dispatch({
          type:"user/update",
          payload:{
            username:getvalue('username'),
            password:getvalue('password'),
            email:getvalue('email'),
            telephone:getvalue('telephone'),
          }
        })
        message.success("success");
      }
      else{
        message.error("input error",1);
      }
    })
  }
  return(
    <div>
      <Form onSubmit={handleUser}>
        <Form.Item label="username">
          {
            getFieldDecorator('username',{
                initialValue:username,
                  rules:[
                    {
                      required:true,
                      message:"please input your username"
                    }
                  ]
              }
            )(<Input/>)
          }
        </Form.Item>
        <Form.Item label="password">
          {
            getFieldDecorator('password',{
                initialValue:password,
                rules:[
                  {
                    required:true,
                    message:"please input your password"
                  }
                ]
              }
            )(<Input />)
          }
        </Form.Item>
        <Form.Item label="email">
          {
            getFieldDecorator('email',{
                initialValue:email,
                rules:[
                  {
                    required:true,
                    message:"please input your email"
                  },
                  {
                    type:"email",
                    message:"please input correct email"
                  }
                ]
              }
            )(<Input />)
          }
        </Form.Item>
        <Form.Item label="telephone">
          {
            getFieldDecorator('telephone',{
                initialValue:telephone,
                rules:[
                  {
                    required:true,
                    message:"please input your telephone"
                  }
                ]
              }
            )(<Input/>)
          }
        </Form.Item>
        <Form.Item>
          {
            <Button type="primary" htmlType="submit" style={{width:'100%'}}>修改</Button>
          }
        </Form.Item>
      </Form>
    </div>
  );
}
const Index=Form.create()(IndexForm);
export default Index;
