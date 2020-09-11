import RoomApi from '../Services/room/room';

const api:any=RoomApi();
export default {
  namespace:"rooms",
  state:{
    rooms:[]
  },
  reducers:{
    get(state:any){
      return{ rooms:api("get")};
    },
    apply(state:any,Info:{roomInfo:any}){
      api("apply",Info.roomInfo);
      let rooms=state.rooms;
      rooms[Info.roomInfo].state="已预约";
      return {rooms:rooms};
    },
    cancel(state:any,Info:{roomInfo:any}){
      api("cancel",Info.roomInfo);
      let rooms=state.rooms;
      rooms[Info.roomInfo].state="有空位";
      return {rooms:rooms};
    },
    init(state:any){
      let rooms:any=[];
      let size=Math.floor(Math.random()*20+5);
      for(let i=0;i<size;i++){
        let room={
          id:i,
          key:i,
          name:`Room ${i}`,
          position:`No. ${i+1} Road`,
          contact_people:'abc',
          state:(i%2===0)?"有空位":"满人"
        }
        rooms.push(room);
      }
      api("init",rooms);
      return {rooms:rooms};
    }
  }
}
