import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'dva';
import {Button, Table} from 'antd';
import { addOperation } from './columns';
import ReactDOM from 'react-dom'
import styles from './styles.less'

const Index = () => {
  const dispatch = useDispatch();
  const { books ,pageNo,pageSize,total} = useSelector((state: any) => state['books']);
  const [ref,setRef]=useState(null);
  const [list,setList]=useState([]);
  const renew = (e: any, id: any) => {
    e.preventDefault();
    dispatch({
      type: 'books/renew',
      payload: {
        id,
      },
    });
  };
  const onChange = (pagination, filters,sorter) => {
    dispatch({
      type:'books/updateState',
      payload:{
        pageNo:pagination.current,
        pageSize:pagination.pageSize,
      }
    })
    dispatch({
      type:'books/getBooksList'
    })
  };
  useEffect(()=>{
    const sizeOfCheck=Math.floor(Math.random()*3);
    const sizeOfOperate=Math.floor(Math.random()*3);
    const check={
      name:'主要诊断：xxx',
      value:'T1000'
    };
    const operate={
      name:'主要手术操作：yyy',
      value:'T2000'
    }
    const checkList=new Array(sizeOfCheck);
    checkList.fill({
      name:'其他诊断：other',
      value:'T-other'
    })
    const operateList=new Array(sizeOfOperate);
    operateList.fill({
      name:'其他手术操作:other',
      value:'S-other'
    })
    const newList=[].concat([check],checkList,[operate],operateList);
    setList(newList);
  },[]);
  const copyTable=()=>{
    const table=ReactDOM.findDOMNode(ref);
    const range=document.createRange();
    range.selectNode(table);
    const selection=window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('copy');
  }
  return (
    <>
      <Button onClick={()=>copyTable()}>复制表格</Button>
      <table ref={(node)=>setRef(node)} className={styles.tableOut}>
        {
          list.map((item,index)=>{
            return (
              <tr key={index}>
                <td key={1} style={{border: 'cadetblue',backgroundColor:'white',lineHeight:4}}>{item.name}</td>
                <td key={2} style={{border: 'cadetblue',backgroundColor:'white',lineHeight:4}}>{item.value}</td>
                {index===0&&<td rowSpan={list.length} key={3} className={styles.tableRowSpan} style={{border: 'cadetblue',backgroundColor: 'cadetblue',
                  color: 'white'}}>主要诊断问题:ppp</td>}
              </tr>
            )
          })
        }
      </table>
      <Table
        columns={addOperation(renew)}
        dataSource={books}
        onChange={onChange}
        pagination={{
          total:total,
          current:pageNo,
          pageSize:pageSize
        }}
      ></Table>
    </>
  );
};
export default Index;
