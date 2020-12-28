import {extend} from 'umi-request';
const errorHandler=(error)=>{
  navigator.sendBeacon("http://172.16.9.129:3000/log",JSON.stringify(error));
  return error;
}
const request=extend({
  errorHandler
})
request.use(async (ctx,next)=>{
  const startTime=Number(new Date());
  await next();
  const endTime=Number(new Date());
  const Time=endTime-startTime;
  const {req}=ctx;
  const data={
    ...req,Time
  }
  req.options.body=req.options.body?JSON.parse(req.options.body):undefined;
  navigator.sendBeacon("http://172.16.9.129:3000/log",JSON.stringify(data));
})
export default request;
