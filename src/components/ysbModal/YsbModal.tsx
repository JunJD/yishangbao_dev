import { forwardRef, ForwardRefRenderFunction, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import ReactDOM from "react-dom";
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

const YsbModal: ForwardRefRenderFunction<HTMLDivElement,Partial<Iprops>> = ((props,ref) => {
  const {
    visible,
    title,
    onClose,
    height = "50%",
    destroyOnClose = true,
    children
  } = props;
  const body = useRef<HTMLElement>(document.getElementById('root'))
  const modalRoot =useRef<HTMLElement>( document.getElementById('modal-root'))
  const refDom = useRef<HTMLDivElement>(document.createElement('div'))

  const drawerWarpRef = useRef<HTMLDivElement>(null)

  useEffect(()=>{
    const refNode = refDom.current
    const modalRootNode = modalRoot.current
    modalRootNode!.appendChild(refNode);
    return ()=>{
      modalRootNode!.removeChild(refNode);
    }
  },[]) 

  // 控制关闭弹框清空弹框里面的元素
  const [clearContentDom, setClearContentDom] = useState(false);

  // 控制drawer 的显示隐藏
  const [drawerVisible, setDrawerVisible] = useState(visible);

  const handleDestroyOnClose = useCallback(()=>{
    !drawerVisible && destroyOnClose && setClearContentDom(true);
  },[drawerVisible, destroyOnClose])

  useEffect(()=>{
    const drawerWarpNode = drawerWarpRef.current
    drawerWarpNode?.addEventListener("transitionend",handleDestroyOnClose,false)
    return ()=>{
      drawerWarpNode?.removeEventListener("transitionend", handleDestroyOnClose, false)
    }
  },[handleDestroyOnClose])

  // 点击弹框关闭
  const handleClose = useCallback((v: boolean) => {
    setDrawerVisible(v);
    if(v){
      body.current!.setAttribute("style", "filter: contrast(0.5);");
      setClearContentDom(false)
    }else{
      body.current!.setAttribute("style", "");
    }
    !visible && onClose && onClose();
  },[onClose, visible])
  
  useEffect(() => {
    handleClose(visible!)
  }, [visible, handleClose]);

  const con = useMemo(()=>{
    return(
      <div
          className='drawerWarp w375'
          style={{
            height,
            bottom: !drawerVisible ? '-100%' : '0',
          }}
        >
          <div ref={ref} className='drawerContent'>
            {title && <div className='titleDrawer'> {title} </div>}
            <div className="plr16 ptb16">
              {clearContentDom ? null : children}
            </div>
          </div>
        </div>
    )
  },[drawerVisible, ref, clearContentDom, title, children, height])

  return ReactDOM.createPortal(
    con,
    refDom.current
  );

})

export default forwardRef(YsbModal)