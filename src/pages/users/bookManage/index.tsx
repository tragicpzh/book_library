import React from 'react';
import { useDispatch, useSelector } from 'dva';
import { Table } from 'antd';
import { addOperation } from './columns';

const Index = () => {
  const dispatch = useDispatch();
  const { books ,pageNo,pageSize,total} = useSelector((state: any) => state['books']);
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
  console.log(books)
  return (
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
  );
};
export default Index;
