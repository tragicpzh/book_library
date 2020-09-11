function TodoApi(){
    let todos:any=null;
    return function(type:string,todoInfo:any){
      switch (type){
        case "get":{
          return todos;
        }
        case "init":{
          todos=[];
          todoInfo.forEach((todo:any)=>{
            todos.push(todo);
          })
          return todos;
        }
        case "del":{
          const {id}=todoInfo;
          let index;
          for(let i=0;i<todos.size;i++){
            if(todos[i].id===id)index=i;
          }
          todos.splice(index,1);
          return todos
        }
      }
    }
}
export default TodoApi;
