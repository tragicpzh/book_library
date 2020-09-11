function BookAPi(){
  let books:any=null;
  return function(type:string,bookInfo:any){
    switch (type){
      case "get":{
        return books;
      }
      case "init":{
        books=[];
        bookInfo.forEach((book:any)=> {
          books.push(book)
        });
        return true;
      }
      case "renew":{
        const {id}=bookInfo;

        let time=new Date(books[id].backTime);
        time.setDate(time.getDate()+7);
        books[id].backTime=new Date(time);

        if(books[id].backTime>books[id].borrowTime)books[id].state="仍可使用";
        else books[id].state="待归还";
        return books[id].state;
      }
      default:{
        return ;
      }
    }
  }
}
export default BookAPi;
