import React, { useState } from 'react'
import Icon from '@src/component/Icon'
import YsbInput from '@src/components/ysbInput'
import YsbButton from '@src/components/ysbButton'
import YsbTabs from '@src/components/ysbTabs/tabs'
import YsbTabPabs from '@src/components/ysbTabs/tabPane'
import './index.less'
import YsbModal from '@src/components/ysbModal/YsbModal'
const Personal = () => {
  const [open2, setOpen2] = useState(false);
  return (
    <div className='flex-row '>
      <div className='purchaseput-container pt6 pb12'>
        <YsbInput
          className='mlr12'
          prele={<Icon className='pl12' icon='icon-sousuo-copy'/>}
          suffix={<YsbButton className='mr1' >搜索</YsbButton>}
        />
      </div>
      <YsbTabs defaultActive="1">
        <div className='query_header pt12 pb16 h28 lh25 fs16 flex--row justify-around'>
          <div className="acalendar">
            <div
              onClick={()=>{setOpen2(true);}}
              className="calendar-info w161"
              style={{}}
            >
              <YsbModal visible={open2} onClose={() => setOpen2(false)}><YsbButton onClick={()=>{setOpen2(false)}}>delete</YsbButton></YsbModal>
              <Icon icon='icon-rili' className='pl8'/>
              <span className='ysb-ellipsis w109'> 2022-09-22 </span>
              <Icon icon='icon-sanjiaoxing'/>
            </div>
          </div>
          <div className="acalendar">
            <div
              className="calendar-info w161 h28"
              style={{}}
            >
              <span className='ysb-ellipsis w112'>请选择送货地址</span>
              <Icon icon='icon-sanjiaoxing' className='pl4'/>
            </div>
          </div>
        </div>
        <YsbTabPabs type='1' title='待取货' >待取货</YsbTabPabs>
        <YsbTabPabs type='2' title='已完成' >已完成</YsbTabPabs>
      </YsbTabs>
    </div>
  )
}

export default Personal