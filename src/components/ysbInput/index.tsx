import React, { FC, ReactNode } from "react";
import './index.less'

interface IYsbInputProps {
    prefix?: ReactNode,
    suffix?: ReactNode,
}

const YsbInput: FC<IYsbInputProps> = ({ prefix, suffix}) => {
    return (
        <div className="inputContainer flex--row flex-justify-space-around flex--aitm-center fs16 lh32 w343 h32" >
            {prefix}
            <input className="inputEle" type="text" />
            {suffix}
        </div>
    )
}

export default YsbInput