import React, { useEffect } from 'react';
import { connect, useDispatch } from 'dva';
import {
  Button,
  Form,
  Input,
  message,
  Cascader as AntCascader,
  Upload,
  Select,
} from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { useSelector } from '@@/plugin-dva/exports';
import Trigger from './components/Trigger/Trigger';
import Cascader from '@/components/Cascader/index';
import Slider from './components/Slider/index';
import Rate from './components/Rate/index';
import BigUpload from './components/BigUpload';
import Progress from './components/Progress';

let requst=false;
const IndexForm = (props: FormComponentProps) => {
  const dispatch = useDispatch();
  const { username, password, email, telephone, books } = useSelector(
    (state: any) => state['user'],
  );
  console.log(books)
  const { getFieldDecorator } = props.form;
  const handleUser = (e: any) => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const getvalue = props.form.getFieldValue;
        dispatch({
          type: 'user/update',
          payload: {
            username: getvalue('username'),
            password: getvalue('password'),
            email: getvalue('email'),
            telephone: getvalue('telephone'),
          },
        });
        message.success('success');
      } else {
        message.error('input error', 1);
      }
    });
  };

  const uploadProps = {
    onChange: info => {
      const file = info.file;
      file.percent && console.log(file.percent);
    },
  };
  const toNewPage = () => {
    let newPage = window.open('');
    newPage.location.href = 'bookManage';
  };
  const load =(e)=>{
    const {target}=e;
    if(!requst&&target.scrollTop+target.offsetHeight>=target.scrollHeight-50){
      requst=true;
      dispatch({
        type:'user/getBooks',
        callback:()=>{
          requst=false;
        }
      })
    }
  }
  return (
    <div>
      <Progress />
      <Button type="primary" onClick={toNewPage}>
        新页面
      </Button>
      <BigUpload></BigUpload>
      <Rate></Rate>
      <Slider></Slider>
      <div>
        <AntCascader popupVisible={false}></AntCascader>
      </div>
      <div>
        <Trigger></Trigger>
      </div>
      <Upload {...uploadProps}>
        <Button>上传</Button>
      </Upload>
      <Cascader></Cascader>
      <Select onPopupScroll={e => load(e)} style={{width:200}}>
        {books.map(item => (
          <Select.Option key={item.code}>{item.name}</Select.Option>
        ))}
      </Select>
      <Form onSubmit={handleUser}>
        <Form.Item label="username">
          {getFieldDecorator('username', {
            initialValue: username,
            rules: [
              {
                required: true,
                message: 'please input your username',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="password">
          {getFieldDecorator('password', {
            initialValue: password,
            rules: [
              {
                required: true,
                message: 'please input your password',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="email">
          {getFieldDecorator('email', {
            initialValue: email,
            rules: [
              {
                required: true,
                message: 'please input your email',
              },
              {
                type: 'email',
                message: 'please input correct email',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="telephone">
          {getFieldDecorator('telephone', {
            initialValue: telephone,
            rules: [
              {
                required: true,
                message: 'please input your telephone',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item>
          {
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              修改
            </Button>
          }
        </Form.Item>
      </Form>
    </div>
  );
};
const Index = Form.create()(IndexForm);
export default Index;
