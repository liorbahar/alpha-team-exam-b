import React, { useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import ChatTable from './ChatTable.component';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      marginTop: '3%',
      marginBottom:'3%'
    }
  }),
);


const Dashboard: React.FC = ({ }) => {
    const classes = useStyles();
   
    return (
        <div>
          <Typography className={classes.title} variant="h6" gutterBottom>Custumer Service</Typography>
          <ChatTable/>  
        </div>
    )
};

export default Dashboard;