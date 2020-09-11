import request from '@/utils/request';
export function getData() {
  return (
    request
      .post('http://172.16.9.129:3000/book-type-analyze')
      .then(function(response) {
        return response
      })
      .catch(function(err) {
        return err
      })
  )
}
export function createData(){
  return(
    request
      .post('http://172.16.9.129:3000/book-type-analyze/create')
      .then(function(response) {
        return response
      })
      .catch(function(err) {
        return err
      })
  )
}
