import React, { useEffect, useRef, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import ChatTable from './ChatTable.component';
import socket from '../services/Socket';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    
  }),
);


const Dashboard: React.FC = ({ }) => {
    const classes = useStyles();

    useEffect(() => {
      
    },[])

    
   
    return (
        <div>
          <ChatTable/>  
        </div>
    )
};

export default Dashboard;