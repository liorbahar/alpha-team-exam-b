import React, { useEffect, useRef, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate, useParams } from "react-router-dom";

import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import socket from '../services/Socket';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop:'3%'
    },
    card: {
        width:'50%',
        height:'80%',
        border: '1px solid black'
      },
    closeButton: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    inputText: {
        display: 'flex',
        justifyContent: 'flex-start'
    },
    textArea: {
        width: '100%',
        minHeight: '30px',
        display: 'flex',
        justifyContent: 'center',
        marginTop:'0.5%'
    },
    inputForm: {
        width: '50%', 
        marginBottom: '1rem'
    },
    textCounter: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    buttonDiv: {
        display: 'flex',
        justifyContent: 'center',
        width: '50%',
        marginTop:'3%'
    },
    button: {
        width: '30%',
        textTransform: 'none'
    }


  }),
);


const ChatPage: React.FC = ({ }) => {
    const classes = useStyles();
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { roomName } = useParams();
    const maxLength = 200;

    useEffect(() => {
        socket.on('closeChat', (message: any) => {
            console.log("close chat");
            onCloseChat();
        });
    },[])

    const onSendMessageClick = () => {
        socket.emit('chat',{ roomName: roomName, message: message })
    }

    const onChange = (event: any) => {
        setMessage(event.target.value);
    }

    const onCloseChat = () => {
        navigate('/login')
    }
 
    return (
    <div className={classes.root}>
        <Card className={classes.card}>
            <CardContent>
            <div className={classes.closeButton}>    
                <Button onClick={onCloseChat} startIcon={<ClearIcon />}/>
            </div>

            
            <div className={classes.root}>
                <div className={classes.inputForm}>
                    <span className={classes.inputText}>Message</span>
                    <div >
                        <TextareaAutosize
                            maxLength={maxLength}
                            onChange={onChange}
                            className={classes.textArea}
                            minRows={7}
                        />
                    </div>

                    <span className={classes.textCounter}>{message.length}/{maxLength}</span>
                </div>

                <div className={classes.buttonDiv}>
                    <Button disabled={message.length === 0} onClick={onSendMessageClick} className={classes.button} variant="contained" color="primary">
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