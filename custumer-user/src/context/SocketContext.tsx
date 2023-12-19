import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';
import Config from '../Config';

const SocketContext = createContext(undefined);

interface SocketProviderProps {
    children: ReactNode;
  }

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket>(null);
  const [user, setUser] = useState({});

  useEffect(() => {
    connect();
  }, []);

  const connect = () => {
    const socket = io(Config.url);
    
    socket.on('connect',() => {
        setSocket(socket);
    });
  }

  const joinRoom = (eventData: any) => {
    setUser(eventData)
    socket.emit('join_room', eventData);
  }

  return (
    <SocketContext.Provider value={{socket, user, joinRoom}}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext