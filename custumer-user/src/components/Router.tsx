import React from 'react';
import * as ReactDOM from "react-dom";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider, Route
} from "react-router-dom";
import LoginPage from './LoginPage.component';
import ChatPage from './ChatPage.component';

const Router = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<LoginPage />}/>
            <Route path="/login" element={<LoginPage />}/>
            <Route path="/chat/:roomName" element={<ChatPage />} />
        </Route>
    )
  )

  return (
    <div style={{ height: '100%' }}>
      <RouterProvider router={router} />
    </div>
  );
}

export default Router;