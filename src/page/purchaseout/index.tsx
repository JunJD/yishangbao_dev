import React from 'react'
import Icon from '@src/component/Icon'
import YsbInput from '@src/components/ysbInput'
import YsbButton from '@src/components/ysbButton'
const Personal = () => {
  return (
    <YsbInput 
      prefix={<Icon icon='icon-sousuo-copy'/>}
      suffix={<YsbButton>搜索</YsbButton>}
    />
  )
}

export default Personal