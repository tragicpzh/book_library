import React from 'react';
import { useDispatch,useSelector } from 'dva';
import { Form, Input, Tabs } from 'antd';

const {TabPane}=Tabs;
const Index=()=>{
    const dispatch=useDispatch();
    const{
      recommends
    }=useSelector((state:any)=>state['recommends']);
    const TabPens= recommends.map((recommend:any)=> {
        const tab=`Tab ${recommend.id}`;
        const key=`${recommend.id}`;
        console.log(recommend.reason);
        return (
          <TabPane tab={tab} key={key}>
            <Form>
              <Form.Item label="name">
                <Input readOnly={true} defaultValue={recommend.name}></Input>
              </Form.Item>
              <Form.Item label="author">
                <Input readOnly={true} defaultValue={recommend.author}></Input>
              </Form.Item>
              <Form.Item label="reason">
                <Input readOnly={true} defaultValue={recommend.reason}></Input>
              </Form.Item>
            </Form>
          </TabPane>
        )
      }
    );
    return(
        <Tabs defaultActiveKey="0" tabPosition="bottom">
          {
            TabPens
          }
        </Tabs>
    );
}
export default Index;
