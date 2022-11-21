import React from 'react'
import Icon from '@src/component/Icon'
import YsbInput from '@src/components/ysbInput'
const Personal = () => {
  return (
    <YsbInput 
      prefix={<Icon icon='icon-sousuo-copy'/>}
      suffix={<button>搜索</button>}
    />
  )
}

export default Personal