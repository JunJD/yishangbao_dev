import React from 'react'
import { createFromIconfontCN } from '@react-vant/icons'
const IconFont = createFromIconfontCN(
  '//at.alicdn.com/t/c/font_3777953_28vy3xyqbf1.js'
)
const Icon = (props: { icon: string }) => {
    const { icon } = props;
    const antIcon: { [key: string]: any } = IconFont;

    if(!antIcon[icon]){
        return <IconFont name={icon} />
    }
    return React.createElement(icon?antIcon[icon]:antIcon["home"]);
};

export default Icon