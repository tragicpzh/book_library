import request from '@/utils/request';
export function getRooms(params) {
  return request
    .post('http://172.16.9.129:3000/room/getRooms', {
      data: {
        ...params,
      },
    })
    .then(response => {
      return response;
    })
    .catch(err => {
      return err;
    });
}
export function updateRoom(params) {
  return request
    .post('http://172.16.9.129:3000/room/updateRoom', {
      data: {
        ...params,
      },
    })
    .then(response => {
      return response;
    })
    .catch(err => {
      return err;
    });
}
