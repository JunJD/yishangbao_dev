import { useState } from 'react'
import { Outlet, useNavigate } from "react-router-dom";
import './index.less'
import Icon from './../../component/Icon';

const TabbarItem = [
  {name: 'home', label: '首页', icon: <Icon icon='icon-shucai1' />},
  {name: 'offerprice', label: '报价', icon: <Icon icon='icon-80' />},
  {name: 'personal', label: '我的', icon: <Icon icon='icon-wode' />},
]

const TabsHome = () => {
  const navigate = useNavigate()
  const [ active, setActive ] = useState('home')
  return (
    <div className='bgc-tabbar'>
      <div className='body-home'>
        <Outlet></Outlet>
      </div>
      <div className='ysb-tabbar ysb-tabbar--fixed pb33'>
        { TabbarItem.map(item=>
            <div 
              key={item.name}
              className={item.name === active?'ysb-tabbar-item ysb-tabbar-item--active': 'ysb-tabbar-item'}
              onClick={()=>{ setActive( item.name ); navigate(`/tabbar/${item.name}`) }}
            >
              {item.icon}
              {item.label}
            </div>
          )
        }
        
        
      </div>
    </div>
  )
}

export default TabsHome