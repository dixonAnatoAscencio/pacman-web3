import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Web3 from 'web3'
import { Web3ReactProvider } from "@web3-react/core";

function getLibrary(provider) {
  return new Web3(provider)
}
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Web3ReactProvider getLibrary={getLibrary}>
  <App/>
  </Web3ReactProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
