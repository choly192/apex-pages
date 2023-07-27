/*
 * @Author: bamboo
 * @Description:
 * @Date: 2023-03-30 10:35:05
 * @LastEditors: Do not Edit
 * @LastEditTime: 2023-04-10 16:01:58
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'containers/demo/app';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
