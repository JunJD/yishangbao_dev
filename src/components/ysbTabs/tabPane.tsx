import classNames from "classnames";
import { FC, ReactNode } from "react";
import './index.less'
export interface IYsbTabPabsPorps {
    children?: ReactNode,
    title: string | number,
    type: string | number,
    isActive? :string | number
}
const YsbTabPabs: FC<IYsbTabPabsPorps> = ({children, isActive, type}) => {

    const classs = classNames('ysbTabPabs', {
        "ysbTabPabs--disabled": isActive !== type 
    })
    return (
        <div className={classs}>
            {children}
        </div>
    )
}

export default YsbTabPabs