import React, {useState} from 'react';
import { Icon, Layout } from 'antd';
import NavSider from '@/components/NavSider';
import { NavLink } from 'umi';

const { Header, Footer, Sider, Content } = Layout;
import style from './users.less';
import { useDispatch } from 'dva';

const UserIndex = (props: any) => {
  const dispatch=useDispatch();
  const exitUser=()=>{
    dispatch({
      type:'user/updateState',
      payload:{
        isLogin:false
      }
    })
  }
  return (
    <Layout>
      <Sider>
        <div className={style.normal}>
          <NavLink to="/users" className={style.normalLink}>首页</NavLink>
        </div>
        <NavSider></NavSider>
      </Sider>
      <Layout id="test">
        <Header>
          <NavLink to="/users/userInfo"><Icon type="user" style={{ color: 'white', float: 'right', fontSize: '60px' }}
                                              className={style.HeaderIcon}/></NavLink>
          <NavLink to="/users"><Icon type="bank" style={{ color: 'white', float: 'right', fontSize: '60px' }}
                                     className={style.HeaderIcon}/></NavLink>
          <NavLink to="/login" onClick={exitUser}><Icon type="logout" style={{ color: 'white', float: 'right', fontSize: '60px' }}
                                     className={style.HeaderIcon}/></NavLink>
        </Header>
        <Content className={style.out}>
          <div className={style.flex}>
            <div className={style.content}>
              {props.children}
            </div>
            <div className={style.footer}>
              @made by pzh 0.0.1
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default UserIndex;
