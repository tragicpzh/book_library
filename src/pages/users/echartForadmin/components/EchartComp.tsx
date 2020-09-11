import React from 'react';
import ReactEcharts from 'echarts-for-react';
interface EchartProp{
  option:object
  onEvents:any,
}
const EchartComp=(props:EchartProp)=>{
  const option=props.option;
  const onEvents=props.onEvents;
  return <ReactEcharts option={option} onEvents={onEvents}></ReactEcharts>
}
export default EchartComp;
