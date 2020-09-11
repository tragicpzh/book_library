import React from 'react';
import { useDispatch, useSelector } from 'dva';
import { Button, Table } from 'antd';

const Index = () => {
  const dispatch = useDispatch();
  const {
    books,
  } = useSelector((state: any) => state['books']);
  books.forEach((book: any) => {
    book.borrowTimeString = book.borrowTime.toLocaleString();
    book.backTimeString = book.backTime.toLocaleString();
  });
  const renew = (e: any, id: any) => {
    e.preventDefault();
    dispatch({
      type: 'books/renew',
      bookInfo: {
        id,
      },
    });
  };
  const columns = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '名字',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '作者',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: '借出时间',
      dataIndex: 'borrowTimeString',
      key: 'borrowTime',
      sorter: (a: any, b: any) => (a.borrowTime < b.borrowTime) ? -1 : 1,
    },
    {
      title: '归还时间',
      dataIndex: 'backTimeString',
      key: 'backTime',
      sorter: (a: any, b: any) => (a.backTime < b.backTime) ? -1 : 1,
    },
    {
      title: '目前状态',
      dataIndex: 'state',
      key: 'state',
      filters: [
        {
          text: '待归还',
          value: '待归还',
        },
        {
          text: '仍可使用',
          value: '仍可使用',
        },
      ],
      onFilter: (value: any, record: any) => (value === record.state),
    },
    {
      title: '操作',
      key: 'action',
      render: (text: any, record: any) => (
        <Button type="primary" onClick={(e) => renew(e, record.id)}>请求续借</Button>
      ),
    },
  ];
  return <Table columns={columns} dataSource={books}></Table>;
};
export default Index;
