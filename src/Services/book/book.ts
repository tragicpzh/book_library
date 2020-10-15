import request from "@/utils/request";

export function booksRenew(params){
  return (
    request
      .post('http://172.16.9.129:3000/books/booksRenew',{
        data:{
          ...params
        }
      })
      .then(function (response){
        return response
      })
      .catch(function(err){
        return err
      })
  )
}
export function getBooksList(params){
  return (
    request
      .post('http://172.16.9.129:3000/books/getBooksTable',{
        data:{
          ...params
        }
      })
      .then(function (response){
        return response
      })
      .catch(function(err){
        return err
      })
  )
}
