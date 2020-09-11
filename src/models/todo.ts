import TodoApi from '@/Services/todo/todo';

const api:any=TodoApi();
export default {
  namespace:"todo",
  state:{
    todos:[]
  },
  reducers:{
    get(state:any){
      return{todos:api("get")};
    },
    init(state:any){
      let todos=[];
      let size=Math.floor(Math.random()*10+5);
      for(let i=0;i<size;i++){
        let todo={
          id:i,
          key:i,
          content:"归还书籍ioi",
          endTime:new Date(),
        }
        todos.push(todo);
      }
      return {todos:api("init",todos)};
    },
    del(state:any,Info:{todoInfo:{id:any}}){
      return{todos:api("del",Info.todoInfo)};
    }
  }
}
