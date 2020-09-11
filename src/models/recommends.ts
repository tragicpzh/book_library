import RecommendApi from '@/Services/recommend/recommend';

const api:any=RecommendApi();
export default {
  namespace:"recommends",
  state:{
    recommends:[],
  },
  reducers:{
    get(state:any){
      return{recommends:api("get")}
    },
    init(state:any){
      let recommends=[];
      let size=Math.floor(Math.random()*5+2);
      for(let i=0;i<size;i++){
        let recommend={
          id:i,
          key:i,
          name:'ssss',
          author:'ttt',
          reason:'qqq'
        }
        recommends.push(recommend);
      }
      return {recommends:api("init",recommends)}
    }
  }
}
