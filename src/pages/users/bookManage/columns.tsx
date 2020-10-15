import { Button } from 'antd';
import React from 'react';

const columns = [
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
    dataIndex: 'borrowTime',
    key: 'borrowTime',
    sorter: true,
  },
  {
    title: '归还时间',
    dataIndex: 'backTime',
    key: 'backTime',
    sorter: true,
  },
  {
    title: '目前状态',
    dataIndex: 'state',
    key: 'state',
    filters: [
      {
        text: '待归还',
        value: 'Back',
      },
      {
        text: '仍可使用',
        value: 'Borrow',
      },
    ],
  },
  {
    title: '操作',
    key: 'action'
  },
];
const addOperation = renew => {
  return columns.map(item => {
    if (item.key === 'action') {
      item.render = (_, record: any) => (
        <Button type="primary" onClick={e => renew(e, record._id)}>
          请求续借
        </Button>
      );
      return item;
    } else {
      return item;
    }
  });
};
export {
  columns,
  addOperation
};
