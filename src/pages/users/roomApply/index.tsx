import React, {useContext} from 'react';
import { useDispatch, useSelector } from 'dva';
import { Card, Table } from 'antd';
import { getColumns } from './columns';

const Index = () => {
  const dispatch = useDispatch();
  const { rooms, pageNo, pageSize, total } = useSelector(({ rooms }: any) => ({
    rooms: rooms.rooms,
    pageNo: rooms.pageNo,
    pageSize: rooms.pageSize,
    total: rooms.total,
  }));
  const apply = (e: any, id: any) => {
    e.preventDefault();
    dispatch({
      type: 'rooms/updateRoom',
      payload: {
        id,
        type: 'apply',
      },
    });
  };
  const cancel = (e: any, id: any) => {
    e.preventDefault();
    dispatch({
      type: 'rooms/updateRoom',
      payload: {
        id,
        type: 'cancel',
      },
    });
  };

  const onChange = (pagination,filter,_) => {
    console.log(filter);
    dispatch({
      type: 'rooms/updateState',
      payload: {
        pageNo: pagination.current,
        pageSize: pagination.pageSize,
      },
    });
    dispatch({
      type: 'rooms/getRooms',
    });
  };
  return (
    <Card>
      <Table
        columns={getColumns(apply, cancel)}
        dataSource={rooms}
        onChange={onChange}
        pagination={{
          total: total,
          current: pageNo,
          pageSize: pageSize,
        }}
      ></Table>
    </Card>
  );
};
export default Index;
