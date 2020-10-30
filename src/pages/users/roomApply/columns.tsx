import { Button } from 'antd';
import React from 'react';
import FilterSearch from '@/components/FilterSearch/index'
import {FilterDropdownProps} from 'antd/es/table';
const filter=[
  {
    text:'1',
    value:'1',
  },
  {
    text:'11',
    value:'11',
  },
  {
    text:'111',
    value:'111',
    children:[
      {
        text:'1111',
        value:'1111'
      },
      {
        text:'11111',
        value:'11111'
      }
    ]
  }
]
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
    filterDropdown:({ selectedKeys, setSelectedKeys, confirm,visible }: FilterDropdownProps) => {
      return (
        <FilterSearch
          selectKeys={selectedKeys}
          setSelectedKeys={setSelectedKeys}
          confirm={confirm}
          filter={filter}
          visible={visible}
          multiple={true}
        />
      );
    },
    defaultFilteredValue:["11","1"]
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
