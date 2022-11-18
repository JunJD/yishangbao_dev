import { FC, ReactNode, useMemo } from "react";
import classNames from "classnames";
import './index.less'
interface IysbCardProps {
    children: ReactNode,
    className?: string,
    title?: string
}
const YsbCard: FC<IysbCardProps> = ({ children, className, title }) => {
    
    const classes = classNames('ysb-card ysb-card--round ysb-card--border', className)

    const content = useMemo(()=>{
        return title? (
            <>
                <div className="tal pl16 pt12 fw700 fs16">
                    {title}
                </div>
                {children}
            </>
        ): children
    },[title, children])

    return (<>
        <div className={classes} >
            {content}
        </div>
    </>)
}

export default YsbCard