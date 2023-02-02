import React, { FC, memo } from 'react'
import { createFromIconfontCN } from '@react-vant/icons'
import { IconBaseProps } from '@react-vant/icons/es/IconBase';

interface IIconProps {
  icon: string,
}
type IProps = Partial<IconBaseProps & IIconProps>

const IconFont = createFromIconfontCN(
  '//at.alicdn.com/t/c/font_3777953_83ckj6d2nm2.js'
)

const Icon: FC<IProps> = (props) => {
    const { icon, className } = props;
    const antIcon: { [key: string]: any } = IconFont;

    if(!antIcon[icon!]){
        return <IconFont className={className} name={icon} />
    }
    return React.createElement(icon?antIcon[icon]:antIcon["home"]);
};

export default memo(Icon)