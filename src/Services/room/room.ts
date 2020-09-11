
function RoomApi(){
  let rooms:any=null;
  return function(type:string,roomInfo:any){
      switch (type){
        case "get":{
          return rooms;
        }
        case "apply":{
          let id=roomInfo;
          rooms[id].state="已预约";
          return true;
        }
        case "cancel":{
          let id=roomInfo;
          rooms[id].state="有空位";
          return true;
        }
        case "init":{
          rooms=[];
          roomInfo.forEach((room:any)=>{rooms.push(room)});
          return true;
        }
      }
  }
}
export default RoomApi;
