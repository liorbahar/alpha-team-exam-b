import React, { useEffect, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Config from '../Config';
import { Socket, io } from 'socket.io-client';
import { TextField, withStyles } from '@material-ui/core';
import ActievChat from '../services/types/Chat';
import { getAllActiveChats } from '../services/Chat.service';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    closeButton: {
      cursor: 'pointer',
      color: 'blue',
      textDecoration: 'underline'
    },
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop:'3%'
    },
    inputText: {
        display: 'flex',
        alignSelf: 'flex-start'
    },
    textField: {
      width:'100%',
      display: 'flex',
      justifyContent: 'center',
      marginTop:'0.5%'
    },
    namesDiv: {
        width: '40%',
        marginBottom: '1rem',
        flexDirection:'column',
        display:'flex',
        alignItems: 'flex-end',
        justifyContent:'flex-end'
    },
    mainDiv: {
      width:'80%'
    },
    emailSearch: {
      width:'100%',
      display:'flex',
      justifyContent: 'flex-end'
    },
    table:{
      width:'100%',
      border: '2px solid #ddd',
      
    },
    cell: {
      borderRight: '1px solid #ddd'
    }
  }),
);

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: '#D0D3D4',
      color: theme.palette.common.black,
    },
    body: {
      fontSize: 14,
    }
  }),
)(TableCell);

type ChatMap = { [id: string] : ActievChat}

const ChatTable = ({  }) => {
  const classes = useStyles();
  const [orderBy, setOrderBy] = useState(null);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [socket, setSocket] = useState<Socket>();
  const [activeChats, setActiveChats] = useState<ChatMap>({});
  const [filtersactiveChats, setFiltersActiveChats] = useState<ChatMap>({});
  

  useEffect(() => {
    fetchAllActiveChats();
    listenToActiveChats();

    return () => {
      if (socket){
        socket.disconnect();
      }
    }
  }, []);

  const listenToActiveChats = () => {
    const currentSocket = io(Config.url);

    currentSocket.on('connect', () => {  
      setSocket(currentSocket);  
       const eventData = {
        socketId: currentSocket.id,
        roomName: 'custumerServiceRoom'
      }
      currentSocket.emit('join_room', eventData);
      currentSocket.on('chat', (message: ActievChat) => {
        setActiveChats(chats => ({...chats, [message.roomName]: message}));
        setFiltersActiveChats(chats => ({...chats, [message.roomName]: message}));

        console.log(activeChats)
        console.log(filtersactiveChats)
      });

      currentSocket.on('closeChat', (message: { roomName: string, chatRoom: string}) => {
        removeChats(message.chatRoom);
        
      });
    });
  }

  const fetchAllActiveChats = () => {
    getAllActiveChats().then((activeChats: ActievChat[]) => {
      const originalChats: ChatMap = {};
      activeChats.forEach((activeChat: ActievChat) => {
        originalChats[activeChat.roomName] = activeChat;
      })

      const filtersChats: ChatMap = {};
      activeChats.forEach((activeChat: ActievChat) => {
        filtersChats[activeChat.roomName] = activeChat;
      })


      setActiveChats(originalChats)
      setFiltersActiveChats(filtersChats)
    })
  }

  const closeChat = (chat: ActievChat) => {
    if (socket) {
      socket.emit('closeChat', { roomName: chat.roomName, chatRoom: chat.roomName })
      removeChats(chat.roomName);
    }
  }

  const removeChats = (roomName: string) => {
    setActiveChats(chats => {
      const newChats = { ...chats };
      delete newChats[roomName]
      return { ...newChats };
    });


    setFiltersActiveChats(chats => {
      const newChats = { ...chats };
      delete newChats[roomName]
      return { ...newChats };
    });
  }

  const onChangeEmailSearch = (event: any) => {
    const searchedEmail: string = event.target.value;
    if (searchedEmail === '')
    {
      setFiltersActiveChats(activeChats);
      return;
    } 
    const filteredChats = Object.values(activeChats).filter(actievChat => actievChat.email.includes(searchedEmail))
    const newChats: ChatMap = {};
    filteredChats.forEach(chat => {
      newChats[chat.roomName] = chat
    })
    setFiltersActiveChats(newChats)
  }

  const onDateFilter = () => {
    setOrderBy('date');
    const newChats: ChatMap = {};
    let sortedList = []
    if (order === 'asc') {
      setOrder('desc')
      sortedList = Object.values(filtersactiveChats).sort((a, b) => {
        const datetimeA = new Date(a.startDate).getTime();
        const datetimeB = new Date(b.startDate).getTime();
        
        return datetimeB - datetimeA;
      });

    } else {
      setOrder('asc')
      sortedList = Object.values(filtersactiveChats).sort((a, b) => {
        const datetimeA = new Date(a.startDate).getTime();
        const datetimeB = new Date(b.startDate).getTime();
        
        return datetimeA - datetimeB;
      });
    }

    sortedList.forEach(chat => {
      newChats[chat.roomName] = chat
    })
    setFiltersActiveChats(newChats);
  }

  

  return (
    <div className={classes.root}>
         <div className={classes.mainDiv}>
            <div className={classes.emailSearch}>
              <div className={classes.namesDiv}>
                  <span className={classes.inputText}>Email</span>
                  <TextField onChange={onChangeEmailSearch} className={classes.textField} variant="outlined" />
              </div>
            </div>

            <Paper className={classes.table}>
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCell className={classes.cell}>First Name</StyledTableCell>
                    <StyledTableCell className={classes.cell}>Last Name</StyledTableCell>
                    <StyledTableCell className={classes.cell}>Email</StyledTableCell>
                    <StyledTableCell className={classes.cell}>Address</StyledTableCell>
                    <StyledTableCell className={classes.cell}>
                        <TableSortLabel
                          active={orderBy === 'date'}
                          direction={orderBy === 'date' ? order : 'asc'}
                          onClick={onDateFilter}>Start Date</TableSortLabel>
                    </StyledTableCell>
                    <StyledTableCell className={classes.cell}>Last Message</StyledTableCell>
                    <StyledTableCell className={classes.cell}>Total Messages</StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.values(filtersactiveChats).map((chat: ActievChat, index: number) => (
                    <TableRow key={index}>
                      <TableCell className={classes.cell} align="left">{chat.firstName}</TableCell>
                      <TableCell className={classes.cell} align="left">{chat.lastName}</TableCell>
                      <TableCell className={classes.cell} align="left">{chat.email}</TableCell>
                      <TableCell className={classes.cell} align="left">{chat.address}</TableCell>
                      <TableCell className={classes.cell} align="left">{chat.startDate}</TableCell>
                      <TableCell className={classes.cell} align="left">{chat.lastMesage}</TableCell>
                      <TableCell className={classes.cell} align="left">{chat.totalMessage}</TableCell>
                      <TableCell align="left">
                        <div className={classes.closeButton} onClick={() => { closeChat(chat) }}>Close</div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
         </div>        
    </div>  
  );
};

export default ChatTable;