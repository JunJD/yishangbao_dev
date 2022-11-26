import classNames from "classnames";
import React, { FC, memo, ReactNode, useEffect, useMemo, useState } from "react";
import {IYsbTabPabsPorps} from './tabPane'
// import usePrevious from '@src/hooks/usePrvious'
interface IYsbTabsPorps {
    children: ReactNode
    defaultActive?: string | number
}

const YsbTabs: FC<IYsbTabsPorps> = ({children, defaultActive}) => {
    const [active, setActive] = useState(defaultActive)

    const renderTitle = useMemo(()=>{
        return React.Children.map(children,(child,index)=>{
            const childElement = child as React.FunctionComponentElement<IYsbTabPabsPorps>
            const { title, type } = childElement.props
            const { name } = childElement.type

            const renderTitleClass = classNames('titleItem fs16', {
                'text-isDisabled': active === type,
                'fw550': active === type
            })

            if(name === 'YsbTabPabs'){
                return (
                    <div id={type+''} tabIndex={(title+'').length} className={renderTitleClass} onClick={()=>{setActive(type)}}>
                        {title ?? type }
                    </div>
                )
            }
        })
    },[children, active])

    const renderChildren = useMemo(()=>{  
        return React.Children.map(children,(child)=>{
            const childElement = child as React.FunctionComponentElement<IYsbTabPabsPorps>
            const { name } = childElement.type
            if(name === 'YsbTabPabs'){
                return React.cloneElement(childElement,{
                    isActive: active
                })
            }else{
                return child
            }
        })
    },[children, active])
     // 跟随下划线动画处理
    const [tabLeft, setTabLeft] = useState<number>(0)
    const [tabNum, setTabNum] = useState<number>(0)
    // const preTabNumRef  = usePrevious(tabNum) // 取tabNum上一次的值

    const lineStyle = useMemo(()=>{
        return {
            transform: `translateX(${tabLeft}px)`
        }
    },[tabLeft])

    const lineClass = useMemo(()=>{
        return classNames("ysb-tabs--line", {
            [`w${tabNum}`]: true,
        })
    },[tabNum])

    useEffect(()=>{
        let doc = Array.from(document.getElementsByClassName("titleItem"))
        const {clientWidth: width, offsetLeft: left} = (doc.find(item=>item.id===active) as any)
        setTabLeft(left)
        setTabNum(width)
    },[active])

    return (
        <div className="ysbtabs-container w375">
            <div className="ysbtabs-container-title pt12 pb6 flex--row justify-around fw550">
                {renderTitle}
            </div>
            <div className={lineClass} style={lineStyle}/>
            {renderChildren}
        </div>
    )
}

export default memo(YsbTabs)