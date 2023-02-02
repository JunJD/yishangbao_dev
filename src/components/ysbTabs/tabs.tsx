import classNames from "classnames";
import React, { FC, memo, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import {IYsbTabPabsPorps} from './tabPane'
// import usePrevious from '@src/hooks/usePrvious'
interface IYsbTabsPorps {
    children: ReactNode
    defaultActive?: string | number
}

const YsbTabs: FC<IYsbTabsPorps> = ({children, defaultActive}) => {
    const [active, setActive] = useState(defaultActive)
    const lineRef = useRef(null)
    useEffect(()=>{
        if ('geolocation' in navigator) {
            navigator.geolocation.watchPosition((position) => {
                console.log(position.coords.latitude, position.coords.longitude)
            });
          } else {
            /* geolocation 不存在 */
          }
        const resizeObserver = new ResizeObserver((entries) => {
            const calcBorderRadius = (size1: number, size2: number) =>
              `${Math.min(100, size1 / 10 + size2 / 10)}px`;
          
            for (const entry of entries) {
              if (entry.borderBoxSize && false) {
                const size = calcBorderRadius(
                  entry.borderBoxSize[0].inlineSize,
                  entry.borderBoxSize[0].blockSize
                );
                console.log(size,'size')
              } else {
                const borderRadius = calcBorderRadius(
                  entry.contentRect.width,
                  entry.contentRect.height
                );
                console.log(borderRadius, 'borderRadius')
              }
            }
            
          });
          
          resizeObserver.observe(lineRef.current!);
    },[])
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
    const clientWidth_ref = useRef(document.documentElement.clientWidth)
    useEffect(()=>{
        const cst =  clientWidth_ref.current / 375
        let doc = Array.from(document.getElementsByClassName("titleItem"))
        const {clientWidth: width, offsetLeft: left} = (doc.find(item=>item.id===active) as any)
        setTabLeft(left)
        setTabNum(Math.floor(width / cst))
    },[active])

    return (
        <div className="ysbtabs-container w375">
            <div className="ysbtabs-container-title pt12 pb6 flex--row justify-around fw550">
                {renderTitle}
            </div>
            <div ref={lineRef} className={lineClass} style={lineStyle}/>
            {renderChildren}
        </div>
    )
}

export default memo(YsbTabs)