import { generateUUID } from '@/utils/utils';
class MySocket {
  private socket;
  private heartCheckTimeOut = 10000;
  private reconnectTimeOut = 3000;
  private timeout;
  private heartCheck;
  private lockReconnect = false;
  private url;
  private socketID;
  private events={
    onclose: [
      {
        name:'heartCheck',
        run: (msg) => {
          const {reason}=msg;
          console.log(`Socket关闭`);
          if (reason !== 'do not reconnect') this.reconnect();
        },
      }
    ],
    onerror: [
      {
        name:'heartCheck',
        run:(msg) => {
          console.log(msg);
          console.log(`Socket发生错误`);
          this.socket.close();
        },
      }
    ],
    onmessage: [
      {
        name:'heartCheck',
        run: (msg) => {
          console.log(msg)
          console.log(`Socket接收到消息`);
          //处理心跳(继续发起心跳)
          this.heartCheck && clearTimeout(this.heartCheck);
          this.startHeartCheck();
        }
      }
    ],
    onopen: [
      {
        name:'heartCheck',
        run:() => {
          console.log(`Socket开始连接`);
          this.heartCheck && clearTimeout(this.heartCheck);
          this.startHeartCheck();
        },
      }
    ],
  };
  //构造函数
  constructor(url) {
    this.url = url;
  }
  //创建websocket
  createSocket=() => {
    try {
      this.socketID=generateUUID();
      this.socket = new WebSocket(this.url+'/'+this.socketID);
      this.initSocket();
    } catch (e) {
      console.log(e);
      this.reconnect();
    }
  }
  //send
  send=(msg)=>{
    try{
      this.socket&&this.socket.send(msg);
    } catch (e) {
      console.log(e);
    }
  }
  //发起心跳
  startHeartCheck = () => {
    this.heartCheck = setTimeout(() => {
      this.socket && this.socket.close();
    }, this.heartCheckTimeOut);
  };
  //socket重连
  reconnect = () => {
    if (this.lockReconnect) return;
    this.timeout && clearTimeout(this.timeout);
    this.lockReconnect = true;
    this.timeout = setTimeout(() => {
      console.log('重新连接');
      this.createSocket();
      this.lockReconnect = false;
    }, this.reconnectTimeOut);
  };
  //关闭socket
  public closeSocket = () => {
    this.socket && this.socket.close(3000, 'do not reconnect');
    clearTimeout(this.timeout);
    this.socket = undefined;
  };
  //socket初始化
  initSocket = () => {
    const socket = this.socket;
    if (!socket) return;
    const onEvent = ['onclose', 'onerror', 'onmessage', 'onopen'];
    onEvent.forEach(item => {
      this.socket[item] = (event) => {
        this.events[item].forEach(ite => {
          ite.run(event);
        });
      };
    });
  };
  //注册事件
  public registerEvent=(event, func, name) => {
    if (!this.events.hasOwnProperty(event)) {
      console.log(`${event}事件不存在`);
      return;
    }
    const index = this.events[event].findIndex(item => item.name === name);
    if(index>=0){
      this.events[event][index]={
        run: func,
        name: name,
      };
      console.log(`覆盖了${event}-${name}事件`)
    }
    else {
      this.events[event].push({
        run: func,
        name: name,
      });
      console.log(`新增了${event}-${name}事件`)
    }
  }
  //注销事件
  public unRegisterEvent=(event, name) => {
    if (!this.events.hasOwnProperty(event)) {
      console.log(`${event}事件不存在`);
      return;
    }
    const eventArr = this.events[event].filter(item => item.name === name);
    if (eventArr.length === 0) {
      console.log(`${event}-${name}事件不存在`);
      return;
    }
    let count = 0;
    eventArr.forEach(() => {
      const index = this.events[event].findIndex(item => item.name === name);
      if (index >= 0) {
        this.events[event].splice(index, 1);
        count++;
      }
    });
    console.log(`注销了${count}个${event}-${name}事件`);
  }
  //
  public getEvents=(event) => {
    if (!this.events.hasOwnProperty(event)) {
      console.log(`${event}事件不存在`);
      return;
    }
    console.log(`${event}注册的事件:`);
    this.events[event].forEach(item => {
      console.log(item.name);
    });
  }
}
export {
  MySocket
};
