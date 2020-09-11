import BookAPi from '@/Services/book/book';

const api:any=BookAPi();
export default {
  namespace:"books",
  state:{
    books:[]
  },
  reducers:{
    get(state:any){
      return {books:api("get")}
    },
    init(state:any){
      let books=[];
      let size=Math.floor(Math.random()*10+5);
      for (let i=0;i<size;i++){
        let borrowTime=new Date();
        let backTime=new Date(borrowTime);
        backTime.setDate(backTime.getDate()+Math.floor(Math.random()*14)-7);

        let state=(borrowTime<backTime)?"仍可使用":"待归还";

        let book={
          key:i,
          id:i,
          name:"pp-ppp",
          author:"uuu",
          borrowTime:borrowTime,
          backTime:backTime,
          state:state,
        }

         books.push(book);
      }
      api("init",books)
      return {books:books};
    },
    renew(state:any,Info:{bookInfo:{id:any}}){
      let newState=api("renew",Info.bookInfo);
      let books=state.books;
      books[Info.bookInfo.id].state=newState;
      return {books:books};
    }
  }
}
