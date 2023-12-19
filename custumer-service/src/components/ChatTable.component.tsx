import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Config from '../Config';
import { Socket, io } from 'socket.io-client';

export type ActievChat = {
    roomName: string
    firstName: string
    lastName: string
    email: string
    address: string
    startDate: string
    totalMessage: number
    lastMesage: string
}

const ChatTable = ({  }) => {
      
  const [orderBy, setOrderBy] = useState(null);
  const [order, setOrder] = useState('asc');
  const [socket, setSocket] = useState<Socket>();
  const [activeChats, setActiveChats] = useState<ActievChat[]>([]);
  

  useEffect(() => {
    const socket = io(Config.url);
    setSocket(socket);

    socket.on('connect', () => {
        const eventData = {
            socketId: socket.id,
            roomName: 'custumerServiceRoom'
        }
        socket.emit('join_room', eventData);
        socket.on('chat', (message: ActievChat) => {
            console.log(message)
            setActiveChats((chats) => [...chats, message])
        });
    });

    return () => {
        socket.disconnect();
    }
    
  },[]);

  const closeChat = (chat: ActievChat) => {
    socket.emit('closeChat', { roomName: chat.roomName })
  }

  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>
                <TableSortLabel
                  onClick={() => {}}
                >
                  Start Date
                </TableSortLabel>
            </TableCell>
            <TableCell>Last Message</TableCell>
            <TableCell>Total Messages</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {activeChats.map((chat: ActievChat, index: number) => (
            <TableRow key={index}>
              <TableCell align="right">{chat.firstName}</TableCell>
              <TableCell align="right">{chat.lastName}</TableCell>
              <TableCell align="right">{chat.email}</TableCell>
              <TableCell align="right">{chat.address}</TableCell>
              <TableCell align="right">{chat.startDate}</TableCell>
              <TableCell align="right">{chat.lastMesage}</TableCell>
              <TableCell align="right">{chat.totalMessage}</TableCell>
              <TableCell align="right">
              <div
      onClick={() => { closeChat(chat)}}
      style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
    >
      Close
    </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default ChatTable;