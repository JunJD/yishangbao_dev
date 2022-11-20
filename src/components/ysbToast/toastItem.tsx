import React, { FC, useEffect } from "react";
// import classNames from "classnames";
// import Loading from "./../../component/Loading";
import './index.less'

export type IType = 'success' | 'fail' | 'info'

export interface ToastItemType {
    type?: IType,
    message: string,
    showTime: number
    destroy: ()=>void
}

const ToastItem: FC<ToastItemType> = ( props ) => {

    const { message, showTime, destroy } = props

    useEffect(()=>{
        setTimeout(() => {
            destroy()
        }, showTime);
    },[showTime, destroy])

    return (
         <div className="toast-con plr3 ptb3">
            {/* <div>加载中</div> */}
            <div className="toast-text">{message}</div>
         </div>
    )
}

export default ToastItem