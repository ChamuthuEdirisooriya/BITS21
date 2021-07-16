import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import '../../../App.css'
import { Container } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import taskDetails from '../../../Data/tasks.json'
import { Group } from '@material-ui/icons';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
  },

  ss: {
    paddingTop: '20px'
  },

  container: {
    padding: '0',
    height: '100vh',
    color: '#fff',
  },

  details: {
    background: 'linear-gradient(144deg, #275d8ccf, #21466766)',
    backdropFilter: 'blur(10px)',
    maxWidth: '800px',
    borderRadius: '20px',
    width: '70%',
    padding: '0',
    height: '500px',
    margin: 'auto',
    marginTop: '20px',
    color: '#fff',
    [theme.breakpoints.down('xs')]: {
      position: 'relative',
      width: '95%',
      margin: 'auto',
      marginTop: '20px'
    },
  },
  appbar: {
    width: '100%',
    backgroundColor: '#06192e',
    borderTopLeftRadius: '20px',
    borderTopRightRadius: '20px',
    borderBottomLeftRadius: '0px',
    borderBottomRightRadius: '0px',

  },
  title: {
    width: '85%',
    margin: 'auto',
    marginLeft: '90px',
    color: '#fff',
    fontStyle: 'bold',
    marginTop: '200px',
    maxWidth: '800px',
  },

  text: {
    color: '#fff',
    marginBottom: '20px',
  },
  switcher: {
    color: '#3ed1b8',
  }, 
  taskname: {
    width: '70%',
  },
  form: {
    position: 'relative',
    width: '98%',
    height: '600px',
  }
}));

export default function FullWidthTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  let { id } = useParams();

  var result = taskDetails.filter(obj => {
    return obj.id === id
  })
  const details = result[0]

  return (
    <Container className={classes.container}>
      
    <div className={classes.ss}>

      <Container className="taskname" color="primary">
      
        <Typography variant="h4" className={classes.title} color="#ffffff"><Button href="/tasks" color="secondary" variant='outlined' style={{marginRight: '50px'}}>Go Back</Button>{details.taskName}</Typography></Container>
    
    <Container fixed className={classes.details}>
        
<AppBar position="static" className={classes.appbar} color="#0f7bc7" elevation="0">
        <Tabs
          value={value}
         className={classes.switcher}
          onChange={handleChange}   
          indicatorColor="dfdfgdfdg"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Details" {...a11yProps(0)} />
          
          <Tab label="Submit" {...a11yProps(1)} />
        </Tabs>
      </AppBar>

      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}><Typography className={classes.text}>
        {details.description}
        </Typography>
        <ul style={{ color: '#fefefe', marrginTop: '90px'}}>
          { details.point1 !== "" && <li>{details.point1}</li> }
          { details.point2 !== "" && <li>{details.point2}</li> }
          { details.point3 !== "" && <li>{details.point3}</li> }
          { details.point4 !== "" && <li>{details.point4}</li> }
          { details.point5 !== "" && <li>{details.point5}</li> }
          { details.point6 !== "" && <li>{details.point6}</li> }
          { details.point7 !== "" && <li>{details.point7}</li> }
        </ul>
<br></br>
        </TabPanel>
       
        <TabPanel value={value} index={1} dir={theme.direction}> <Typography  className={classes.text}>
        Find the task in the tasks page and click the “Submit task” button. Then you will be redirected t a Form which you can attach your work files or send the link of your work. Complete the form
and hit the “SUBMIT” button and your task will be reviewed by the mentors in around 24 hours
and you will get a confirmation email.</Typography>
<br></br>
<br></br>

      <iframe src={details.submit} className={classes.form} backgroundColor="#000">Loading…</iframe>
        </TabPanel>
      </SwipeableViews>


      </Container>
      </div>
      </Container>
     
  
    
  );
}