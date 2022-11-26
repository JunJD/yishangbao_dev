import classNames from "classnames";
import { FC, HtmlHTMLAttributes, memo, ReactNode } from "react";
import './index.less'
interface IYsbInputProps {
    prele: ReactNode,
    suffix: ReactNode,
}

type IProps = Partial<HtmlHTMLAttributes<HTMLInputElement> & IYsbInputProps>

const YsbInput: FC<IProps> = ({ prele, suffix, className, ...reset}) => {
    const classs = classNames("inputContainer flex--row items-center fs16 lh30 w343 h32", className)
    return (
        <div className={classs} >
            {prele}
            <input {...reset} className="inputEle" type="text" />
            {suffix}
        </div>
    )
}

export default memo(YsbInput)