import React from 'react';
import { Menu } from 'antd';
import {NavLink} from 'umi';
import style from './NavSider.less'
import {useSelector} from "dva";
const NavSider=()=>{
  const {route}=useSelector(({global}:any)=>({route:global.route}))
  return (
    <Menu
      mode="inline"
      className={style.nav}
      selectedKeys={[route]}
    >
      <Menu.Item key="/users/todo">
          <NavLink to="/users/todo">待办事项</NavLink>
      </Menu.Item>
      <Menu.Item key="/users/bookManage">
          <NavLink to="/users/bookManage">书籍管理</NavLink>
      </Menu.Item>
      <Menu.Item key="/users/bookRecommend">
          <NavLink to="/users/bookRecommend">书籍推荐</NavLink>
      </Menu.Item>
      <Menu.Item key="/users/roomApply">
          <NavLink to="/users/roomApply">申请自习室</NavLink>
      </Menu.Item>
      <Menu.Item  key="/users/echartForadmin">
          <NavLink to="/users/echartForadmin">数据分析</NavLink>
      </Menu.Item>
      <Menu.Item  key="/users/bookTypeAnalyze">
        <NavLink to="/users/bookTypeAnalyze">数据分析</NavLink>
      </Menu.Item>
      <Menu.Item key='users/echarts'>
        <NavLink to="/users/echarts">echarts</NavLink>
      </Menu.Item>
      <Menu.Item key='users/chat'>
        <NavLink to="/users/chat">聊天室</NavLink>
      </Menu.Item>
      <Menu.Item key='users/game'>
        <NavLink to="/users/game">坦克大战</NavLink>
      </Menu.Item>
    </Menu>
  );
}
export default NavSider;
