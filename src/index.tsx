// import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'react-vant';
import zhCN from 'react-vant/es/locale/lang/zh-CN';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

const themeVars = {
  buttonPrimaryBorderColor: '#951fff',
  buttonPrimaryBackgroundColor: '#951fff',
  tabbarHeight: '57px'
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
  <ConfigProvider locale={zhCN} themeVars={themeVars} >
      <App />
  </ConfigProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
