import React, { useEffect, useRef, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import io from 'socket.io-client';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import ClearIcon from '@mui/icons-material/Clear';

import TextareaAutosize from '@material-ui/core/TextareaAutosize';
const socket = io('http://localhost:3001');


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        width:'50%',
        height:'80%',
        border: '1px solid black'
      },
      bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
      },
      title: {
        fontSize: 14,
      },
      pos: {
        marginBottom: 12,
      },
  }),
);


const ChatPage: React.FC = ({ }) => {
    const classes = useStyles();
    const emailRef = useRef();
    const [message, setMessage] = useState('');

    const data = { 
        email: "lior.bahar1412@gmail.com",
        name: "lior",
        lastName: "bahar" 
    }
    const roomName =  `${data.email}-${data.name}-${data.lastName}`
    
    

    useEffect(() => {
        socket.on('connect', () => {
            socket.emit('join_room',{ socketId: socket.id, roomName: roomName})
        });

        socket.on('chat', (message: any) => {
            console.log(message)
        });
    },[])

    const onSendMessageClick = () => {
        console.log((emailRef.current as any).value)
        // socket.emit('chat',{ roomName: roomName, data: { name: 'lior' }})
    }

    const onChange = (event: any) => {
        setMessage(event.target.value);
    }
 
    return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop:'3%'}}>
        <Card className={classes.root}>
            <CardContent>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>    
                <Button startIcon={<ClearIcon />}/>
            </div>

            
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop:'3%' }}>
                    <div style={{ width: '50%', marginBottom: '1rem' }}>
                        <span style={{ display: 'flex', justifyContent: 'flex-start' }}>Message</span>
                        <div style={{ display: 'flex', justifyContent: 'center',  marginTop:'0.5%' }}>
                            <TextareaAutosize
                                maxLength={200}
                                onChange={onChange}
                                style={{ width: '100%', minHeight: '30px' }}
                                minRows={7}
                            />
                        </div>

                        <span style={{ display: 'flex', justifyContent: 'flex-end' }}>{message.length}/200</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', width: '50%', marginTop:'3%' }}>
                        <Button disabled={message.length === 0} onClick={onSendMessageClick} style={{ width: '30%' }} variant="contained" color="primary">
                            Send
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    </div>
    )
};

export default ChatPage;