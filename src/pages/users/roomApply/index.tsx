import React from 'react';
import { useDispatch, useSelector } from 'dva';
import {  Card, Table } from 'antd';
import {getColumns} from "./columns";

const Index=()=>{
  const dispatch=useDispatch();
  const {
    rooms
  }=useSelector(({rooms}:any)=>({rooms:rooms.rooms}));
  const apply=(e:any,id:any)=>{
    e.preventDefault();
    dispatch({
      type:"rooms/updateRoom",
      payload:{
        id,
        type:'apply'
      }
    });
  }
  const cancel=(e:any,id:any)=>{
    e.preventDefault();
    dispatch({
      type:"rooms/updateRoom",
      payload:{
        id,
        type:'cancel'
      }
    });
  }

  return (
    <Card>
      <Table columns={getColumns(apply,cancel)} dataSource={rooms}></Table>
    </Card>
  );
}
export default Index;
