import { FC, memo, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import ReactDOM from "react-dom";
import useClickOutside from "@src/hooks/useClickOutSide";
import './index.less'
interface IpropsDrawer {
  visible: boolean;
  title: React.ReactNode;
  height: number | string
  onClose: () => void;
  destroyOnClose: boolean;
  children: ReactNode
}
type Iprops = IpropsDrawer;

const YsbModal: FC<Partial<Iprops>> = (props) => {
  const {
    visible,
    title,
    onClose,
    height = "50%",
    destroyOnClose = true,
    children
  } = props;
  const body = document.getElementById('root') as HTMLElement;
  const modalRoot = document.getElementById('modal-root');
  const refDom = useRef<HTMLDivElement>(document.createElement('div'))
  const blurRef = useRef<HTMLDivElement>(null)
  const drawerWarpRef = useRef<HTMLDivElement>(null)

  useClickOutside(blurRef,()=>{
    drawerVisible && handleClose()
  })

  useEffect(()=>{
    modalRoot!.appendChild(refDom.current);
    return ()=>{
      modalRoot!.removeChild(refDom.current);
    }
  },[]) 

  // 控制关闭弹框清空弹框里面的元素
  const [clearContentDom, setClearContentDom] = useState(false);

  // 控制drawer 的显示隐藏
  const [drawerVisible, setDrawerVisible] = useState(visible);

  const handleDestroyOnClose = useCallback(()=>{
    !drawerVisible && destroyOnClose && setClearContentDom(true);
  },[drawerVisible])

  useEffect(()=>{
    drawerWarpRef.current?.addEventListener("transitionend",handleDestroyOnClose,false)
    return ()=>{
      drawerWarpRef.current?.removeEventListener("transitionend",handleDestroyOnClose,false)
    }
  },[handleDestroyOnClose])

  // 点击弹框关闭
  const handleClose = useCallback(() => {
    setDrawerVisible((prev) => {
      if (prev) {
        refDom.current.style.overflow = 'hidden';
        body.setAttribute("style", "");
      }
      return false;
    });
    onClose && onClose();
  },[drawerVisible, destroyOnClose, onClose])
  
  useEffect(() => {
    
    setDrawerVisible((prev) => {
      if (prev) {
        refDom.current.style.overflow = 'hidden';
      }
      return visible;
    })
    if(visible){
      body.setAttribute("style", "filter: blur(5px);");
      setClearContentDom(false)
    }
  }, [visible]);

  const con = useMemo(()=>{
    return(
      <div
          ref={drawerWarpRef}
          className='drawerWarp w375'
          style={{
            height,
            bottom: !drawerVisible ? '-100%' : '0',
          }}
        >
          <div ref={blurRef} className='drawerContent'>
            {title && <div className='titleDrawer'> {title} </div>}
            <div className="plr16 ptb16">
              {clearContentDom ? null : children}
            </div>
          </div>
        </div>
    )
  },[drawerVisible, clearContentDom, title, children, height])

  return ReactDOM.createPortal(
    con,
    refDom.current
  );

}

export default memo(YsbModal)