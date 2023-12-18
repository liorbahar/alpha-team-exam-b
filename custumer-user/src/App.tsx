import React from 'react'
import ChatPage from './components/ChatPage.component';
import './App.css';
import LoginPage from './components/LoginPage.component';
import Router from './components/Router';

function App() {
  return (
    <div className='App'>
      <Router/>
      {/* <LoginPage/> */}
      {/* <ChatPage/> */}
    </div>
  );
}

export default App;
