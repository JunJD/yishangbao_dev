import { FC, HtmlHTMLAttributes, useMemo } from "react";
import classNames from "classnames";
import './index.less'
interface IysbCardProps {
    title?: string
}

type IProps = Partial<HtmlHTMLAttributes<HTMLDivElement> & IysbCardProps>

const YsbCard: FC<IProps> = ({ children, className, title }) => {
    
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