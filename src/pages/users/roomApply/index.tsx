import React from 'react';
import { useDispatch, useSelector } from 'dva';
import { Button, Card, Table } from 'antd';

const Index=()=>{
  const dispatch=useDispatch();
  const {
    rooms
  }=useSelector((state:any)=>state['rooms']);
  const apply=(e:any,id:any)=>{
    e.preventDefault();
    dispatch({
      type:"rooms/apply",
      roomInfo:id,
    });
  }
  const cancel=(e:any,id:any)=>{
    e.preventDefault();
    dispatch({
      type:"rooms/cancel",
      roomInfo:id,
    });
  }
  const columns=[
    {
      title:"序号",
      dataIndex:"id",
      key:"id",
      sorter:(a:any,b:any)=>a.id-b.id,
      sortDirections:['descend','ascend'],
    },
    {
      title: "名字",
      dataIndex: "name",
      key:"name",
    },
    {
      title: "位置",
      dataIndex: "position",
      key:"position",
    },
    {
      title: "联系人",
      dataIndex: "contact_people",
      key:"contact_people",
    },
    {
      title: "目前状态",
      dataIndex: "state",
      key:"state",
      filters:[
        {
          text:'已预约',
          value:'已预约',
        },
        {
          text:'有空位',
          value:'有空位',
        },
        {
          text:'满人',
          value: '满人',
        }
      ],
      onFilter:(value:any,record:any)=>record.state===value,
    },
    {
      title:"操作",
      key:"action",
      render:(text:any,record:any,index:any)=>{
        switch(record.state){
          case"已预约":{
            return(
              <Button onClick={(e)=>cancel(e,record.id)} >取消</Button>
            )
          }
          case "有空位":{
            return(
              <Button onClick={(e)=>apply(e,record.id)}>预约</Button>
            )
          }
          default:return
        }
    }
    }
  ]
  return (
    <Card>
      <Table columns={columns} dataSource={rooms}></Table>
    </Card>
  );
}
export default Index;
