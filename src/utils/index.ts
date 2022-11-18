import mitt from 'mitt'
import NP from 'number-precision'
import wx from 'weixin-js-sdk-ts' 


// export const getUrlParams = (url, name) => {
//   const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
//   const r = url.substr(1).match(reg)
//   if (r !== null) return unescape(r[2])
//   return ''
// }
const emitter = mitt()

const {location} = window

export const getUrlParam = (url: string) => {
  let obj = {}
  let arr: any[] = []
  let osr =
    url && url.split('?')[1]
      ? url.split('?')[1]
      : location.search
      ? location.search.split('?')[1]
      : ''
  if (osr) {
    arr = osr.split('&')
  }
  arr.forEach((d) => {
    let no = d.search('=')
    obj[d.slice(0, no)] = d.slice(no + 1)
  })
  return obj
}

export const redirectBank = (data: { reqData: any; requestUrl: any }) => {
  const { reqData, requestUrl } = data
  let tpl = ''
  let key
  for (key in reqData) {
    tpl += `<input name=${key.toUpperCase()} value=${
      reqData[key]
    } type="hidden"/>`
  }
  const form = document.createElement('form')
  form.style.display = 'none'
  form.action = requestUrl
  form.method = 'post'
  form.innerHTML = tpl
  document.body.appendChild(form)
  // console.log('form>>', form)
  form.submit()
  document.body.removeChild(form)
}

export function strToDate(str: string) {
  if (typeof str == 'string') {
    return new Date(str.split('.') as any)
  }
  return new Date()
}

export function dotStrsToDashStrs(str: string, noEndStr: any) {
  // return str.split('-').map(dotStrToDashStr)
  if (str) {
    const arr = str.split('-')
    return [
      dotStrToDashStr(arr[0], noEndStr),
      dotStrToDashEndStr(arr[1], noEndStr),
    ]
  }
  return []
}
export function dotStrToDashStr(str: string, noEndStr: any) {
  return str.split('.').join('-') + (noEndStr ? '' : ' 00:00:00')
}
export function dotStrToDashEndStr(str: string, noEndStr: any) {
  return str.split('.').join('-') + (noEndStr ? '' : ' 23:59:59')
}
export function dateToStr(date: any) {
  if (date.constructor === Date) {
    return (
      date.getFullYear() +
      '.' +
      ('0' + (date.getMonth() + 1)).slice(-2) +
      '.' +
      ('0' + date.getDate()).slice(-2)
    )
  }
  return null
}

export function fullDashStrToDotStr(str: string) {
  const arr = str.split(' ')
  return dashStrToDotStr(arr[0])
}

export function dashStrToDotStr(str: string) {
  return str.split('-').join('.')
}

export function dateToDashStr(date: any) {
  if (date.constructor === Date) {
    return (
      date.getFullYear() +
      '-' +
      ('0' + (date.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + date.getDate()).slice(-2)
    )
  }
  return null
}

export function dateToFullStr(date: any) {
  if (date.constructor === Date) {
    return (
      ('0' + (date.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + date.getDate()).slice(-2) +
      ' ' +
      ('0' + date.getHours()).slice(-2) +
      ':' +
      ('0' + date.getMinutes()).slice(-2)
    )
  }
  return null
}

export function getLastYearDay() {
  const today = new Date()
  return new Date(today.getFullYear() - 1, today.getMonth(), today.getDate())
}

function filter(str: string) {
  // 特殊字符转义
  str += ''
  str = str.replace(/%/g, '%25')
  str = str.replace(/\+/g, '%2B')
  str = str.replace(/ /g, '%20')
  str = str.replace(/\//g, '%2F')
  str = str.replace(/\?/g, '%3F')
  str = str.replace(/&/g, '%26')
  str = str.replace(/=/g, '%3D')
  str = str.replace(/#/g, '%23')
  return str
}

export function formateObjToParamStr(paramObj: { [x: string]: string }) {
  const data = []
  for (let attr in paramObj) {
    data.push(`${attr}=${filter(paramObj[attr])}`)
  }
  return data.join('&')
}

export function getStorage(key: string) {
  if (!key) return null
  return localStorage.getItem(key) || null
}

export function setTitle(title: string) {
  document.title = title
}

export function getCurrentDates() {
  // return [new Date(), new Date(Date.now() + 24 * 60 * 60 * 1000)]
  return [new Date(), new Date()]
}

export function getRecentDates(days = 13) {
  return [new Date(Date.now() - days * 24 * 60 * 60 * 1000), new Date()]
}

export function formatDate(date: string) {
  if (date && date.length > 0) return date.split(' ')[0]
  return ''
}

export function getEmitter() {
  return emitter
}
/* eslint-disable */
export function goToLogin() {
  if ((window as any).__wxjs_environment == 'miniprogram') {
    if(!wx)return
    wx.miniProgram.postMessage({ data: 'clearToken' })
    wx.miniProgram.reLaunch({
      // url: '/offlinePages/login/index'
      url: '/subPages/loginGuide/index'
      // url: `/offlinePages/login/index?redirectUrl=${encodeURIComponent(globalThis.location.href)}`,
    })
  } else {
    console.log('登录')
  }
}
/* eslint-disable */
export function wxSubscribe() {
  try {
    if ((window as any).__wxjs_environment == 'miniprogram') {
      wx.miniProgram.postMessage({ data: 'subscribe' })
    } else {
      console.log('调用')
    }
  } catch (error) {
  alert(error)
}
}
/* eslint-disable */

export const phone_reg = {
  re: /^1(3|4|5|6|7|8|9)\d{9}$/,
  name: '手机号',
}
export const password_reg = {
  re: /[a-zA-Z0-9]{8}$/,
  name: '密码',
}
export const imgcode_reg = {
  re: /\d{4,6}$/,
  name: '图片验证码',
}
export const smscode_reg = {
  re: /\d{4,6}$/,
  name: '短信验证码',
}

export function format2nums(num: string | number) {
  return num ? (+num).toFixed(2) : num
}

// 3天内return true
export function limit3days(str: string | number | Date) {
  return (new Date(str).getTime() - new Date().getTime()) / (1440 * 60000) <= 3
}
export function datesRange(arr: { getTime: () => number }[]) {
  if (arr && arr[0] && arr[1]) {
    return (arr[1].getTime() - arr[0].getTime()) / (1440 * 60000) + 1
  }
  return 0
}

export const offerPriceStatus = {
  1: '草稿',
  2: '待报价',
  3: '未审核',
  4: '部分审核',
  5: '审核完成',
  6: '失效',
}

export const numberReg = /^[1-9]\d*$/
export const numricReg = /(^[1-9]\d*(\.\d{0,2})?$)|(^0\.\d{0,2}$)/
export const numric3Reg = /(^[1-9]\d*(\.\d{0,3})?$)|(^0\.\d{0,3}$)/

export const LoadingUtil = {
  loadCb: (s:boolean) => {},
  setLoading(cb: () => void) {
    this.loadCb = cb
  },
  show() {
    this.loadCb(true)
  },
  hide() {
    this.loadCb(false)
  },
}

export function randomString(e: number) {
  e = e || 32
  let t = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678',
    a = t.length,
    n = ''
  for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a))
  return '@@@' + n
}

export function sum(...values: any[]) {
  return NP.plus(...values)
}
export function multiple(...values: any[]) {
  return NP.times(...values)
}

export function minus(...values: any[]) {
  return NP.minus(...values)
}

export function nonDashText(v: string | null | undefined) {
  return v === '' || v === void 3 || v === null ? '--' : v
}

export function copyToClipboard(text: string | null) {
  var textarea = document.createElement('textarea')
  textarea.textContent = text
  textarea.style.position = 'fixed' // Prevent scrolling to bottom of page in Microsoft Edge.
  document.body.appendChild(textarea)
  textarea.select()
  try {
    return document.execCommand('copy') // Security exception may be thrown by some browsers.
  } catch (ex) {
    console.warn('Copy to clipboard failed.', ex)
    return false
  } finally {
    document.body.removeChild(textarea)
  }
}
