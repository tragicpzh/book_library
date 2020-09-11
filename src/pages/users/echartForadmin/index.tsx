import React, { useEffect, useState } from 'react';
import EchartComp from '@/pages/users/echartForadmin/components/EchartComp';
import {DatePicker} from 'antd';
import {MonthFormat} from '@/utils/constants'
import { useSelector,useDispatch } from 'umi';
import moment from 'moment';
const{RangePicker}=DatePicker;
const EchartForadmin=()=>{
  const dispatch=useDispatch();
  const [option,setOption]=useState({option:{},onEvents:{}});
  const [value,setValue]=useState([]);
  console.log(useSelector((temp:any)=>temp['echartForadmin']))
  const {data,start,end}=useSelector((temp:any)=>temp['echartForadmin']);
  const getBarOption=(month:string)=>{
    const index=moment(month).diff(moment(start),'month');
    const newOption={
      option:{
        baseOption:{
          timeline:{
            axisType:'category',
            autoplay:false,
            data:data.map((item:any,index:any)=>{
              return item.month;
            }),
            currentIndex:index,
            platInterval:1000,
          }
        },
        options:data.map((item:any,index:any)=>{
          const option={
            xAxis:{
              type:'category',
              data:['出借量','新添量','还回量']
            },
            yAxis:{
              type:'value',
              name:'图书量（本）',
              max:500
            },
            title:{
              text:`${item.month}月图书流量总览`
            },
            series:[
              {
                data:[
                  {
                    value:item.borrow,
                    name:'borrow'
                  },
                  {
                    value:item.addNew,
                    name:'addNew'
                  },
                  {
                    value:item.back,
                    name:'back'
                  }
                ],
                type:'bar',
              }
            ]
          }
          return option;
        })
      },
      onEvents:{click:onclick}
    }
    setOption(newOption);
  }
  const getBarAndLineOption=(name:string)=>{
      let xArr=[];
      const newOption={
          option:{
            title:{
              text:name
            },
            tooltip:{
              trigger:'item',

            },
            yAxis: {
              name:'图书量(本)',
              max:500,
              type:'value'
            },
            xAxis: {
              type:'category',
              data:data.map((item:any)=>item['month'])
            },
            series: {
              type:'bar',
              data:data.map((item:any)=>item[name])
            },
            animationThreshold:500,
          },
          onEvents: {click:onclickToBar}
      }
      setOption(newOption);
  }
  const handleChange=(value:any)=>{
    setValue(value);
  }
  const handlePanelChange=(value:any,mode:any)=>{
    setValue(value);
  }
  const handleOk=(value:any)=>{
    dispatch({
      type:'echartForadmin/query',
      payload:{
        start:value[0].format(MonthFormat),
        end:value[1].format(MonthFormat),
      }
    })
  }
  const onclick=(e:any)=>{
    const name=e.name;
    if(name!=='borrow'&&name!=='addNew'&&name!=='back')return;
    getBarAndLineOption(name);
  }
  const onclickToBar=(e:any)=>{
    const month=e.name;
    getBarOption(month);
  }
  useEffect(()=>{
    const newOption={
      option:{
        baseOption:{
        timeline:{
          axisType:'category',
          autoplay:false,
          data:data.map((item:any,index:any)=>{
            return item.month;
          }),
          currentIndex:0,
        }
      },
        options:data.map((item:any,index:any)=>{
        const option={
          xAxis:{
            type:'category',
            data:['出借量','新添量','还回量']
          },
          yAxis:{
            type:'value',
            name:'图书量（本）',
            max:500
          },
          title:{
            text:`${item.month}月图书流量总览`
          },
          series:[
            {
              data:[
                {
                  value:item.borrow,
                  name:'borrow'
                },
                {
                  value:item.addNew,
                  name:'addNew'
                },
                {
                  value:item.back,
                  name:'back'
                }
              ],
              type:'bar',
            }
          ]
        }
        return option;
      })
      },
      onEvents:{click:onclick}
    }
    setOption(newOption);
  },[data]);
  return(
    <div>
      <RangePicker
        format={MonthFormat}
        placeholder={['Start Time','End Time']}
        mode={['month','month']}
        value={value}
        onChange={handleChange}
        showTime
        onPanelChange={handlePanelChange}
        onOk={handleOk}
      >
      </RangePicker>
      <EchartComp {...option} ></EchartComp>
    </div>
  );
}
export default EchartForadmin;
