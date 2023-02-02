import {useEffect,RefObject} from 'react'
function useClickOutside(refs: RefObject<HTMLElement>[], handler: Function) {
    useEffect(() => {
      const listener = (event: MouseEvent) => {
        for(let ref of refs){
          if (ref.current?.contains(event.target as HTMLElement)) {
            return  //点击到选中的ref直接return
          }
        }
        handler(event)
      }
      document.addEventListener('click', listener)
      return () => {
        document.removeEventListener('click', listener) //处理函数
      }
    }, [refs, handler])
  }
  
  export default useClickOutside