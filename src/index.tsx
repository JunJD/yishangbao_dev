// import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@src/styles/base/index.less'
import reportWebVitals from './reportWebVitals';
import App from './App';
import 'normalize.css'
import moment from 'moment'
import './index.less'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
      <App />
  </BrowserRouter>
);

const webVitals = {
  LCP: {
    good: 2500,
    poor: 4000,
    label:'加载性能'
  },
  FID: {
    good: 100,
    poor: 300,
    label:'交互性能'
  },
  CLS: {
    good: 0.1,
    poor: 0.25,
    label:'视觉稳定性'
  }
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals( (metric)=>{
  let path = window.location.pathname
  let time = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
  if(webVitals[metric.name].good > metric.value){
    console.log(path+"=>"+webVitals[metric.name].label+"=>"+'good:'+metric.value)
  } else if(webVitals[metric.name].poor <= metric.value){
    console.log(path+"=>"+webVitals[metric.name].label+"=>"+'poor:'+metric.value)
  } else {
    console.log(path+"=>"+webVitals[metric.name].label+"=>"+'待提升'+metric.value)
  }
  console.log(time)
});
