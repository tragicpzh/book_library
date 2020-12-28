import React, {useCallback, useEffect, useState} from 'react';
import echarts from 'echarts/lib/echarts';
import ReactEcharts from 'echarts-for-react';
import { dataTransForm, generatorData } from './dataTransform';
import Todos from './Todos'
import styles from './todos.less'
const symbolSize = 10;

const Echart = () => {
  const [myChart, setRef] = useState(null);
  const [data, setData] = useState([]);
  const [addData,setAdd]=useState([]);
  console.log(addData)
  const option = {
    toolbox:{
      show:true,
      feature:{
        saveAsImage:{
          type:'png'
        },

      }
    },
    grid: {
      right:'40%',
      left:'5%'
    },
    xAxis: {
      type:'value',
      name: '月份',
      min: 0,
    },
    yAxis: {
      type:'value',
      max: 15,
      min: 0,
      name: '阅读时间',
      minInterval:1,
      splitNumber:15
    },
    tooltip: {
      trigger: 'axis',
      formatter: param => {
        return `阅读时间：${param[0].data[1]}小时`;
      },
    },
    series: [
      {
        type: 'sunburst',
        center: ['78%', '50%'],
        nodeClick: 'rootToNode',
        itemStyle: {
          borderWidth: 2,
          borderColor: '#000',
        },
        animationDelayUpdate: index => index * 40,
        data: dataTransForm(data),
        levels: [
          {
            r: 52,
          },
          {
            r0: 0,
            r: 60,
          },
          {
            r0: 60,
            r: 125,
          },
          {
            r0: 125,
            r: 130,
            label: {
              position: 'outside',
            },
          },
        ],
      },
    ],
    dataZoom:{
      type:'slider'
    }
  };
  //原始数据筛选(月份|书目)
  function getData({ start = null, end = null, book = null}){
    let datas = [];
    if (book) {
      data.forEach(item => {
        item.children.forEach(ite => {
          if (ite.name === book) {
            datas = datas.concat(ite.months);
          }
        });
      });
      console.log(addData)
      addData.forEach(item=>{
        if(item.book===book){
          datas.push([datas.length+1,item.value])
        }
      })
    }
    else if (start && end) {
      datas = datas.concat(
        data.map(item => {
          item.children = item.children.map(ite => {
            ite['value'] = ite['months'].reduce((pre, cur) => {
              if (cur[0] >= start && cur[0] <= end) return pre + cur[1];
              else return pre;
            }, 0);
            ite['children'][0] = {
              ...ite.children,
              name: ite['value'],
              value: ite['value'],
            };
            return ite;
          });
          return item;
        }),
      );
    }
    return datas;
  }

  //eCharts 点击事件与dataZoom事件监听
  useEffect(() => {
    myChart &&
      myChart.on('click', 'series.sunburst', function (param) {
        const clickData = param.data;
        if (clickData && clickData.type && clickData.type === 'click') {
          //添加折线图相关配置
          const option = myChart.getOption();
          const seriesLine = {
            id:'line',
            type: 'line',
            name: clickData.book,
            //获取对应book的数据
            data: echarts.util.bind(getData)({ book: clickData.book}),
            symbolSize,
            //连线点样式变化
            itemStyle:{
              color:(param)=>{
                if(param.dataIndex===clickData.next-1)return '#F00';
                else return '#000'
              }
            },
          };
          const title = {
            text: clickData.book,
            left:'35%'
          };
          option.series[1] = seriesLine;
          option.title = title;
          option.xAxis={
            max: clickData.next,
          }
          myChart.setOption(option);
          //添加连线点
          option.graphic=[];
          const xAxis=[];
          for(let i=4;i<=15;i++)xAxis.push(i);
          xAxis.unshift(0);
          xAxis.forEach(item=>{
            const point=[clickData.next,item];
            option.graphic.push({
              type:'circle',
              position:myChart.convertToPixel('grid',point),
              shape:{
                cx:0,
                cy:0,
                r:symbolSize/2
              },
              z:100,
              invisible:true,
              onclick:echarts.util.curry(addNewPoint,clickData.next-1)
            })
          })
          myChart.setOption(option);
        }
      });
    myChart &&
      myChart.on('dataZoom', param => {
        //dataZoom改变时，上方旭日图数据对应月份改变
        const max = data && data[0]['children'][0]['months'].length+1;
        const dimension = 100 / (max);
        const start = Math.floor(param.start / dimension+1);
        const end = Math.floor(param.end / dimension);
        const option = myChart.getOption();
        option.series[0].data = getData({ start, end });
        myChart.setOption(option);
        // dataZoom改变时,连线点变化
        if(param.end!=100){
          const graphic=new Array(option.graphic[0].elements.length);
          graphic.fill({
            onclick:null,
            cursor:'default'
          })
          myChart.setOption({
            graphic:{
              elements:graphic
            }
          })
        }
        else {
          const graphic=new Array(option.graphic[0].elements.length);
          graphic.fill({
            onclick:echarts.util.curry(addNewPoint,end-1),
            cursor:'pointer'
          })
          myChart.setOption({
            graphic:{
              elements:graphic
            }
          })
        }
      });
  }, [myChart]);

  //组件初始化，随机生成原始数据
  useEffect(() => {
    const data=generatorData();
    setData(data);
    const newAddData=[];
    data.forEach(item=>{
      item.children.forEach(ite=>{
        newAddData.push({
          book:ite.name,
          value:Math.floor(ite['value']/ite.['months'].length)
        })
      })
    })
    setAdd(newAddData)
  }, []);

  //连线点点击产生新节点
  function addNewPoint(dataIndex){
    const option=myChart.getOption();
    const newData=option.series[1].data;
    newData[dataIndex]=myChart.convertFromPixel('grid',this.position);
    newData[dataIndex][0]=Math.round(newData[dataIndex][0]);
    newData[dataIndex][1]=Math.round(newData[dataIndex][1]);
    myChart.setOption({
      series:[{
        id:'line',
        data:newData
      }]
    })
    //更新计划阅读量
    addData.forEach(item=>{
      if(item.book===option.series[1].name){
        item.value=newData[dataIndex][1];
      }
    })
    setAdd([].concat(addData));
  }
  //移除阅读计划
  const removeAddData=(book)=>{
    addData.forEach(item=>{
      if(item.book===book){
        item.value=0
      }
    })
    setAdd(addData.slice(0));
    //更新当前折线图
    const option=myChart.getOption();
    if(!option.series[1])return;
    const newData=option.series[1].data;
    if(option.series[1].name===book) {
      newData[newData.length - 1][1] = 0;
      myChart.setOption({
        series: [{
          id: 'line',
          data: newData
        }]
      })
    }
  }

  //解决浏览器窗口变化导致的graphic失效
  window.onresize=()=>{
    myChart.resize();
    const option=myChart.getOption();
    const end=option.dataZoom[0].end;
    if(!option.series[1])return;
    const x=option.series[1].data.length;
    const xAxis=[];
    for(let i=4;i<=15;i++)xAxis.push(i);
    xAxis.unshift(0);
    if(end!=100){
      const graphic=[];
      xAxis.forEach(item=>{
        graphic.push({
          position:myChart.convertToPixel('grid',[x,item]),
          onclick:null,
          cursor:'default',
        })
      })

      myChart.setOption({
        graphic:{
          elements:graphic
        }
      })
    }
    else {
      const graphic=[];
      xAxis.forEach(item=>{
        graphic.push({
          position:myChart.convertToPixel('grid',[x,item]),
          onclick:echarts.util.curry(addNewPoint,x-1),
          cursor:'pointer',
        })
      })
      myChart.setOption({
        graphic:{
          elements:graphic
        }
      })
    }
  }

  return (
    <>
      <ReactEcharts
        option={option}
        ref={node => setRef(node && node.getEchartsInstance())}
        style={{
          height: 550,
        }}
      />
      <Todos
        addData={addData}
        onClose={removeAddData}
        className={styles.checkList}
      />
    </>
  );
};
export default Echart;
