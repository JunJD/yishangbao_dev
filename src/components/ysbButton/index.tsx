import React, { FC, ReactNode } from "react";

type YsbButtonType = 'success' | 'info' | 'fail'

interface IYsbButtonProps {
    children?: ReactNode;
    type?: YsbButtonType
}
const YsbButton: FC<IYsbButtonProps> = (props) => {
    const { children, type } = props

    return (
        <button>{children}</button>
    )
}

export default YsbButton