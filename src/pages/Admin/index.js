import React from 'react'
import SoftTypography from '../../components/SoftTypography'
import Footer from '../../examples/Footer'
import DashboardLayout from '../../examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from '../../examples/Navbars/DashboardNavbar'
import {useSelector,useDispatch} from "react-redux"
import { useNavigate } from 'react-router-dom'
import { updateAuthId } from '../../auth/redux/dataSlice'
import { auth,db } from '../../auth/firebase'
import { Grid } from '@mui/material'
import MiniStatisticsCard from '../../examples/Cards/StatisticsCards/MiniStatisticsCard'
import SoftBox from '../../components/SoftBox'
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Login from './components/Login'

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
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

function Admin() {
  const authId = useSelector((state) => state.authId)
  const history = useNavigate("")
  const dispatch = useDispatch();




  const logout = () => {
    auth.signOut();
    history("/")
    dispatch(updateAuthId(''))
    window.location.reload();
}

const theme = useTheme();
const [value, setValue] = React.useState(0);

const handleChange = (event, newValue) => {
  setValue(newValue);
};

const handleChangeIndex = (index) => {
  setValue(index);
};

const date1 = new Date();

let day = date1.getDate();
let month = date1.getMonth() + 1;
let year = date1.getFullYear();

// This arrangement can be altered based on how we want the date's format to appear.
let currentDate = `${day}/${month}/${year}`;

const date = new Date;
let hours = date.getHours();

let status = (hours < 12)? "Good Morning" : (hours >= 12 && hours < 16)? "Good Afternoon" : (hours >= 16 && hours < 19)? "Good Evening" : (hours >= 19 && hours < 12)? "Good Night" : ((hours <= 12 && hours >= 12 ) ? "Good Morning" : "Good Night");
  return (
    <div style={{padding:10}}>
    <DashboardNavbar />
    {authId === "ADMIN_ID" ?(
       <>
       <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
       <div>
       <span style={{fontWeight:'bold'}}>{status}, Admin</span>
       </div>
       <div>
       <span style={{cursor:'pointer',fontWeight:'bold'}}>{currentDate}</span>
       </div>
       </div>
       <SoftTypography>
       <SoftBox py={3}>
       <SoftBox mb={3}>
         <Grid container spacing={1}>
           <Grid item xs={12} sm={6} xl={3}>
             <MiniStatisticsCard
               title={{ text: "Users" }}
               count={20}
               percentage={{ color: "success", text: "+55%" }}
               icon={{ color: "info", component: "group" }}
             />
           </Grid>
           <Grid item xs={12} sm={6} xl={3}>
             <MiniStatisticsCard
               title={{ text: "Electronics" }}
               count={20}
               percentage={{ color: "success", text: "+3%" }}
               icon={{ color: "info", component: "speaker" }}
             />
           </Grid>
           <Grid item xs={12} sm={6} xl={3}>
             <MiniStatisticsCard
               title={{ text: "Orders" }}
               count={20}
               percentage={{ color: "error", text: "-2%" }}
               icon={{ color: "info", component: "list_alt" }}
             />
           </Grid>
           <Grid item xs={12} sm={6} xl={3}>
             <MiniStatisticsCard
               title={{ text: "Invoices" }}
               count={20}
               percentage={{ color: "success", text: "+5%" }}
               icon={{
                 color: "info",
                 component: "assignment",
               }}
             />
           </Grid>
         </Grid>
       </SoftBox>
   
       <Box sx={{ bgcolor: 'background.paper' }}>
         <AppBar position="static">
           <Tabs
             value={value}
             onChange={handleChange}
             indicatorColor="secondary"
             textColor="inherit"
             variant="fullWidth"
             aria-label="full width tabs example"
             style={{zIndex:1,backgroundColor:'#fff'}}
   
           >
             <Tab label="Users" {...a11yProps(0)} />
             <Tab label="Electronics" {...a11yProps(1)} />
             <Tab label="Orders" {...a11yProps(2)} />
             <Tab label="Invoices" {...a11yProps(3)} />
           </Tabs>
         </AppBar>
         <SwipeableViews
           axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
           index={value}
           onChangeIndex={handleChangeIndex}
           style={{
             height: '70vh',
             overflowY: 'auto'
            }}
         >
           <TabPanel value={value} index={0} dir={theme.direction}>
             Users
           </TabPanel>
           <TabPanel value={value} index={1} dir={theme.direction}>
             Electronics
           </TabPanel>
           <TabPanel value={value} index={2} dir={theme.direction}>
           Orders
         </TabPanel>
         <TabPanel value={value} index={3} dir={theme.direction}>
           Invoices
         </TabPanel>
         </SwipeableViews>
       </Box>
     </SoftBox>
       </SoftTypography>
       </>
    ):(
      <Login />
    )}
    <Footer/>
    </div>
  )
}

export default Admin