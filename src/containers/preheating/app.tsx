/*
 * @Author: bamboo
 * @Description:
 * @Date: 2023-03-30 10:37:26
 * @LastEditors: Do not Edit
 * @LastEditTime: 2023-04-12 14:21:42
 */
import React from 'react';
import './app.scss';
import testImg from 'containers/preheating/static/image/test.png';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
          Learn React
        </a>
      </header>
      <img className='App-test-img' src={testImg} alt='' />
    </div>
  );
}

export default App;
