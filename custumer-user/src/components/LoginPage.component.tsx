import React, { useContext, useEffect, useRef, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { useNavigate } from "react-router-dom";
import Select from "@mui/material/Select";
import { MenuItem, OutlinedInput } from '@material-ui/core';
import { getAllAddresses } from '../services/Address.service';
import LinearProgress from '@material-ui/core/LinearProgress';
import SocketContext from '../context/Socket.context';


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
    option: {
        height: '10%',
    },
    input: {
        height: '10%'
    },
    select: {
        borderRadius: '6px',
        width: '100%'
    },
    personalData: {
        display: 'flex',
        marginTop:'3%'
    },
    inputText: {
        display: 'flex',
        justifyContent: 'flex-start'
    },
    textField: {
        width:'100%',
        display: 'flex',
        justifyContent: 'center',
        marginTop:'0.5%'
    },
    namesDiv: {
        width: '50%',
        marginBottom: '1rem'
    },
    secondDetailsSpaceTop: {
        marginTop: '1rem'
    },
    button: {
        width: '30%',
        textTransform: 'none'
    }
  }),
);


const LoginPage: React.FC = ({ }) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const firstNameRef = useRef<HTMLInputElement>();
    const lastNameRef = useRef<HTMLInputElement>();
    const emailRef = useRef<HTMLInputElement>();
    const [address, setAddress] = useState<string>()
    const [addresses, setAddresses] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [validations, setValidations] = useState({
        firstNameValid: true,
        lastNameNameValid: true,
        emailValid: true,
    });
    const { socket, joinRoom, disconnect } = useContext(SocketContext);

    useEffect(() => {
        fetchAllAddress();
    },[])

    const fetchAllAddress = () => {
        getAllAddresses().then((addresses: string[]) => {
            setAddresses(addresses);
        })
    }

    const getRoomName = () => {
        return `${firstNameRef.current.value}-${lastNameRef.current.value}-${emailRef.current.value}` 
    }

    const onClick = () => {
        const isvalidForm: boolean = validateForm();
        if (isvalidForm === true){
            setIsLoading(true);
            const eventData = {
                socketId: socket.id,
                roomName: getRoomName(),
                user: {
                    firstName: firstNameRef.current.value,
                    lastName: lastNameRef.current.value,
                    email: emailRef.current.value,
                    address: address
                }
            }
            joinRoom(eventData)
            navigate(`/chat/${getRoomName()}`);
            setIsLoading(false);
        }  
    }

    const validateForm = () => {
        const data = {
            firstNameValid: firstNameRef.current.value?.length > 0,
            lastNameNameValid: lastNameRef.current.value?.length > 0,
            emailValid: emailRef.current.value?.length > 0,
        }
        setValidations(data)
        const isFormValid: boolean = Object.values(data).some((isValid: boolean) => isValid === true); 
        return isFormValid;
    }

    const handleSelectChange = (event: any) => {
        setAddress(event.target.value);
    }

   
    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <CardContent>
                    <div>
                        <div className={classes.personalData}>
                            <div className={classes.namesDiv}>
                                <span className={classes.inputText}>First Name</span>
                                <TextField error={!validations.firstNameValid} inputRef={firstNameRef} className={classes.textField} variant="outlined" />
                            </div>
                        
                            <div className={classes.namesDiv}>
                                <span className={classes.inputText}>Last Name</span>
                                <TextField error={!validations.lastNameNameValid} inputRef={lastNameRef} className={classes.textField} variant="outlined" />
                            </div>
                        </div>

                        <div className={classes.secondDetailsSpaceTop}>
                            <span className={classes.inputText}>Email</span>
                            <TextField error={!validations.emailValid} inputRef={emailRef} className={classes.textField} variant="outlined" />
                        </div>


                        <div className={classes.secondDetailsSpaceTop}>
                            <span className={classes.inputText}>Address</span>
                            <Select
                                className={classes.select}
                                onChange={handleSelectChange}
                                input={<OutlinedInput margin='dense' classes={{ input: classes.input }} />}
                                >
                                    {addresses.map((address: string, index: number) => {
                                        return (
                                            <MenuItem key={index} value={address} className={classes.option}>
                                                {address}
                                            </MenuItem>
                                        )
                                    })}
                            </Select>
                        </div>
                    </div>
                    <div className={classes.root}>
                        <Button onClick={onClick} className={classes.button} variant="contained" color="primary">
                        Start Chat
                        </Button>
                    </div>

                    {isLoading && <LinearProgress className={classes.secondDetailsSpaceTop} color="secondary" />}
                </CardContent>
            </Card>
        </div>
    )
};

export default LoginPage;