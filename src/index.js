import { is } from '@babel/types';
import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Container from "./container";

const App = (props) =>{
  return (
    <>
      <Container/>
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);