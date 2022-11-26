import classNames from "classnames";
import { FC, HtmlHTMLAttributes, memo } from "react";
import './index.less'
type YsbButtonType = 'primary' | 'info' | 'fail'

interface IYsbButtonProps {
    type?: YsbButtonType
}

type IProp = Partial<IYsbButtonProps & HtmlHTMLAttributes<HTMLButtonElement>>

const YsbButton: FC<IProp> = (props) => {
    const { children, type, className, ...reset } = props
    const classs = classNames('ysb-button plr14', className, {
        [`ysb-button-${type}`]: type
    })
    return (
        <button {...reset} className={classs} >{children}</button>
    )
}
YsbButton.defaultProps={
    type: 'primary'
}

export default memo(YsbButton)