function RecommendApi(){
  let recommends:any=[];
  return function(type:string,recInfo:any){
    switch (type){
      case "get":{
        return recommends;
      }
      case "init":{
        recommends=[];
        recInfo.forEach((rec:any)=>{
            recommends.push(rec);
        })
        return recommends;
      }
    }
  }
}
export default RecommendApi;
