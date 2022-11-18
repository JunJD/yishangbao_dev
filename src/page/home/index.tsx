import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import Marquee from 'react-fast-marquee';
import { useLocation } from 'react-router-dom';
import avatar from './base64'
import { req } from './../../utils/req';
import YsbCard from './../../components/ysbCard';
import "./index.less"
import Icon from './../../component/Icon'

interface FlagNameMapType{
  [supplierFlag: number] : string,
}

const FlagNameMap: FlagNameMapType = {
  1:'普通',
  2:'子供',
  3:'父供'
}

interface IPData {
  supplierFlag?: number,
  suppName?: string,
  suppCode?: number,
  phoneNumber?: string
}

const Home: FC = () => {
  const location = useLocation()
  const infoNumber = useMemo(()=>(
    [
      {label: '待对账(元)', value: 12},
      {label: '待预约(单)', value: 122},
      {label: '待报价(个)', value: 12},
    ]
  ),[])

  const GetRequestToken = useCallback(()=>{
    var url = location.search; //获取url中"?"符后的字串
    if (url.indexOf("?") !== -1) { //判断是否有参数
      var str = url.substring(1); //从第一个字符开始 因为第0个是?号 获取所有除问号的所有符串
      const strs = str.split("="); //用等号进行分隔拿后面的token
      return strs
    }
    return []
  },[location])

  const [ pData,setPData ] = useState<IPData>({})
  
  useEffect(()=>{
    const arr: string[] = GetRequestToken();
    localStorage.setItem('token', arr[1])
    getInfo()
  },[GetRequestToken])

  const getInfo = async() => {
    try {
      const res = await req('busops.supplierInfo.querySupplierInfo')
      if (res.success) {
        setPData(res.result)
        localStorage.setItem('suppCode', res.result.suppCode)
      }
    } catch (e) {
      console.warn(e)
    }
  }

  return (
    <div className='home-container plr12 pt12'>
      <YsbCard className='h188 flex--column'>
        <div className='ysb-card ysb-card-header flex--row flex--aitm-center h38 plr12 pt8 pb4 fs12'>
          <div className='w61 fs14'><Icon icon='icon-bell' />通知</div>
          <div className='w258 flex--column flex--aitm-start' style={{ boxSizing: 'content-box',borderLeft:'1px #7564E9 solid'}} > 
            <div className='plr8'>
              <Marquee pauseOnHover gradient={false}>
 			         dingjunjie审核通过了<span style={{color:'red'}} >重庆1123xx公司</span>的报价
 			        </Marquee>
            </div>
            <div className='fs10 pl8' style={{color:'#666666'}}>
              2022-12-31
              </div>
          </div>
          <div className='w32'>
            <Icon icon='icon-xiangyoujiantou' />
          </div>
        </div>

        <div className='flex--row flex--aitm-start pt12'>
          <div className='ysb-avatar flex--column flex--aitm-center h55 w61 pl12'>
            <img src={avatar} alt='' />
            <div className="ysb-avatar-label w25 fs10 plr5">
              {FlagNameMap[pData?.supplierFlag!]}
            </div>
          </div>
          <div className='flex--column flex--aitm-start pt6 pl6 fs16'>
            <div className='fw600 fs16 lh18' >
              { pData.suppName }
            </div>
            <div className='flex--row pt5'>
              <div className='supp-code fs14'>
                { pData.suppCode }
              </div>
              <div className='phone-number pl16 fs13'>
                <Icon icon='icon-dianhuatianchong'/>
                <span className='pl4'>
                  { pData.phoneNumber }
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className='flex--row pt24'>
          { infoNumber.map(item=>(
            <div key={item.label} className='flex--column flex--aitm-center w125'>
              <div className='fs20 fw600'>{item.value}</div>
              <div className='fs14'>{item.label}</div>
            </div>
          )) }

        </div>
      </YsbCard>

      {/* ---------- */}

      <YsbCard className='h190 mt12' title="业务协同">
          <div className='flex--row'>
            <div className='fs36'>
              <Icon icon='icon-goumaicantuan'/>
            </div>
            <div className='fs36'>
              <Icon icon='icon-tuihuo'/>
            </div>
            <div className='fs36'>
              <Icon icon='icon-query1'/>
            </div>
            <div className='fs36'>
              <Icon icon='icon-yuyuechaxun'/>
            </div>
          </div>
      </YsbCard >
    </div>
  )
}
export default Home