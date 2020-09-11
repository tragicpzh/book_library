import React, { useState } from 'react';
import { useDispatch,useSelector} from 'dva';
import { Button, Icon,Table } from 'antd';
const Index=()=>{
  const dispatch=useDispatch();
  const {
    todos
  }=useSelector((state:any)=> state['todo']);
  todos.forEach((todo:any)=>{
    todo.endTimeString=todo.endTime.toLocaleString();
  });
  const del=(e:any,id:any)=>{
    e.preventDefault();
    dispatch({
      type:'todo/del',
      todoInfo:{
        id:id
      },
    })
  };
  const columns=[
    {
      title: "待办内容",
      dataIndex: "content",
      key:"content"
    },
    {
      title: "截止时间",
      dataIndex: "endTimeString",
      key:"endTime",
    },
    {
      title: "操作",
      key:"action",
      render:(text:any,record:any,index:any)=>(
        <Button onClick={(e)=>del(e,record.id)}><Icon type="close" /></Button>
      )
    }
  ]
  return <Table columns={columns} dataSource={todos}></Table>
}
export default Index;
