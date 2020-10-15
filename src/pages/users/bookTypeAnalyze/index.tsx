import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { useSelector,useDispatch } from 'dva';
import { Button } from 'antd';
const BookTypeAnalyze=(props)=>{
  const dispatch=useDispatch();
  const {types,list}=useSelector((temp:any)=>temp['bookTypeAnalyze']);
  const updateData=()=>{
    dispatch({
      type:'bookTypeAnalyze/update'
    })
  }
  const option={
    tooltip:{
      trigger:'axis',
      axisPointer:{
        type:'shadow'
      }
    },
    legend:{
      data:types,
    },
    xAxis:{
      type:'value',
      max:2000
    },
    yAxis:{
      type:'category',
      data:['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    series:list.data&&list.data.map((ite:any,index:any)=>{
      const item=ite[0];
      return {
        name:item.type,
        type:'bar',
        stack:'sum',
        data:item.data.map((itm:any,idx:any)=>{
          return [itm.value,itm.day]
        })
      }
    })
  };
  return (
    <>
      <Button onClick={updateData}>update</Button>
      <ReactEcharts option={option}></ReactEcharts>
    </>
  )
}
export default BookTypeAnalyze;
