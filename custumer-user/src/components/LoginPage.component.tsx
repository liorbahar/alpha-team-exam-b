import React, { useEffect, useRef, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@mui/material/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';



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


const LoginPage: React.FC = ({ }) => {
    const classes = useStyles();

    useEffect(() => {
       
    },[])

    const onClick = () => {}

   
    return (

    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop:'3%'}}>
    <Card className={classes.root}>
        <CardContent>
            <div>
            <div style={{ display: 'flex', marginTop:'3%'}}>
                
                
                <div style={{ width: '50%', marginBottom: '1rem'}}>
                    <span style={{ display: 'flex', justifyContent: 'flex-start' }}>First Name</span>
                    <div style={{ display: 'flex', justifyContent: 'center',  marginTop:'0.5%' }}>
                        <TextField style={{width:'100%'}} variant="outlined" />
                    </div>     
                </div>
               
                <div style={{ width: '50%', marginBottom: '1rem'}}>
                    <span style={{ display: 'flex', justifyContent: 'flex-start' }}>Last Name</span>
                    <div style={{ display: 'flex', justifyContent: 'center',  marginTop:'0.5%' }}>
                        <TextField style={{width:'100%'}} variant="outlined" />
                    </div>
                </div>
            </div>

            <div style={{ marginBottom: '1rem'}}>
                <span style={{ display: 'flex', justifyContent: 'flex-start' }}>Email</span>
                <div style={{ display: 'flex', justifyContent: 'center',  marginTop:'0.5%' }}>
                    <TextField style={{width:'100%'}} variant="outlined" />
                </div>
            </div>

            
        </div>
        <div style={{ display: 'flex', flexDirection: 'column',alignItems: 'center', marginTop:'3%' }}>
                <Button onClick={onClick} style={{ width: '30%' }} variant="contained" color="primary">
                    Send
                </Button>
            </div>
        
        </CardContent>
    </Card>
</div>
    )
};

export default LoginPage;