import React from 'react';
import { useDispatch, useSelector } from 'dva';
import { Table } from 'antd';
import { addOperation } from './columns';

const Index = () => {
  const dispatch = useDispatch();
  const { books } = useSelector((state: any) => state['books']);
  const renew = (e: any, id: any) => {
    e.preventDefault();
    dispatch({
      type: 'books/renew',
      payload: {
        id,
      },
    });
  };
  const onChange = (sorter, filters) => {
    console.log(sorter, filters);
  };
  console.log(books)
  return (
    <Table
      columns={addOperation(renew)}
      dataSource={books}
      onChange={onChange}
    ></Table>
  );
};
export default Index;
