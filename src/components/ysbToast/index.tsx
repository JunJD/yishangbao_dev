import ReactDOM from 'react-dom'
import ToastItem, { IType } from './toastItem'
import './index.less'

class Toast {
  private static divDom: HTMLDivElement | null

  private constructor(){}

  public static info(msg: string, showTime: number = 1000 ){
    this.render( msg, showTime, 'info')
  }

  private static createDomCon(){
    if(this.divDom){
      // eslint-disable-next-line
      return
    }
    this.divDom = document.createElement('div')
    this.divDom.setAttribute('class','toast-wrap')
    document.body.appendChild(this.divDom)
  }

  private static destroy() {
    const DOM = Toast.divDom
    const unmountResult = ReactDOM.unmountComponentAtNode(DOM!)
    if (unmountResult && DOM!.parentNode) {
      DOM!.parentNode.removeChild(DOM!)
    }
    Toast.divDom = null
  }

  private static render(message: string, showTime: number, type: IType) {
    this.createDomCon()

    ReactDOM.render(
      <ToastItem message={message} destroy={this.destroy} showTime={showTime} />,
      this.divDom
    )

  }

}
// type ToastType = Pick< Toast, 'info' >
export default Toast