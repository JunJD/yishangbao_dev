import { useState } from 'react'
import { Tabbar } from 'react-vant'
import IconYSB from './../../component/IconForBase64/IconYSB'
import './index.less'
const {Item} = Tabbar

const TabsHome = () => {

  const [ active, setActive ] = useState('baojia')
  return (
    <div className='bgc-tabbar'>
      <div className='body-home'>
      </div>
      <Tabbar
        zIndex={999}
        style={{height:'49px',paddingBottom:'33px'}}
        fixed
        value={active}
      >
        <Item name='homePage' onClick={()=>setActive('homePage')} icon={<IconYSB highlight={active === 'homePage'} />}><span style={{fontSize: '14px'}} >首页</span></Item>
        <Item name='homePage' onClick={()=>setActive('homePage')} icon={<IconYSB highlight={active === 'homePage'} />}><span style={{fontSize: '14px'}} >首页</span></Item>
        <Item name='homePage' onClick={()=>setActive('homePage')} icon={<IconYSB highlight={active === 'homePage'} />}><span style={{fontSize: '14px'}} >首页</span></Item>
      </Tabbar>
    </div>
  )
}

export default TabsHome