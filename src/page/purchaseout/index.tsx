import Icon from '@src/component/Icon'
import YsbInput from '@src/components/ysbInput'
import YsbButton from '@src/components/ysbButton'
import YsbTabs from '@src/components/ysbTabs/tabs'
import YsbTabPabs from '@src/components/ysbTabs/tabPane'
import './index.less'
import YsbCalendar from '@src/components/ysbCalendar/index'
const Personal = () => {
  // const [open2, setOpen2] = useState(true);
  const handleClose = () => {

  }

  const handleBofang = () => {
    const encodedData = btoa('Hello, world'); // 编码字符串
    const decodedData = atob(encodedData); // 解码字符串
    console.log(encodedData,decodedData)
  }
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
          <YsbCalendar onClose={handleClose}/>
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
        <YsbTabPabs type='1' title='待取货ceshi1' >
          <YsbButton onClick={handleBofang}>播放</YsbButton>
        </YsbTabPabs>
        <YsbTabPabs type='2' title='已完成' >已完成</YsbTabPabs>
      </YsbTabs>
    </div>
  )
}

export default Personal