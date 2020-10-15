import { Button } from 'antd';
import React from 'react';

const columns = [
  {
    title: '名字',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '位置',
    dataIndex: 'position',
    key: 'position',
  },
  {
    title: '联系人',
    dataIndex: 'contact',
    key: 'contact',
  },
  {
    title: '目前状态',
    dataIndex: 'state',
    key: 'state',
    filters: [
      {
        text: '已预约',
        value: '已预约',
      },
      {
        text: '有空位',
        value: '有空位',
      },
      {
        text: '满人',
        value: '满人',
      },
    ],
  },
  {
    title: '操作',
    key: 'action',
  },
];
export function getColumns(apply, cancel) {
  return columns.map(item => {
    if (item.key === 'action') {
      item['render'] = (_, record: any) => {
        switch (record.state) {
          case '已预约': {
            return <Button onClick={e => cancel(e, record._id)}>取消</Button>;
          }
          case '空闲': {
            return <Button onClick={e => apply(e, record._id)}>预约</Button>;
          }
          default:
            return;
        }
      };
    }
    return item
  });
}
