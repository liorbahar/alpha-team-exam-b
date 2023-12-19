import React from 'react'
import './App.css';
import Router from './components/Router';
import { SocketProvider } from './context/Socket.context';

function App() {
  return (
    <div className='App'>
      <SocketProvider>
        <Router/>
      </SocketProvider>
    </div>
  );
}

export default App;
