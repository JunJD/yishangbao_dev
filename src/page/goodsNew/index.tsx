import React from 'react'
import { Grid } from 'react-vant'
import { ShopO } from '@react-vant/icons'

const Personal = () => {
  return (
    <div style={{width:'375px'}} >
    <Grid columnNum={3}>
      {Array.from({ length: 6 }, (_, i) => (
        <Grid.Item key={i} icon={<ShopO />} text='文2字' />
      ))}
    </Grid>
    </div>
  )
}

export default Personal