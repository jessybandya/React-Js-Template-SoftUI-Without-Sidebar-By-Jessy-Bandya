import React, { useState, useEffect, useRef, useContext } from "react";

// react-router components
import { useLocation, Link, useNavigate } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";
import { useSelector, useDispatch } from 'react-redux'

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "../../../components/SoftBox";
import SoftTypography from "../../../components/SoftTypography";
import SoftInput from "../../../components/SoftInput";

// Soft UI Dashboard React examples
import Breadcrumbs from "../../../examples/Breadcrumbs";
import NotificationItem from "../../../examples/Items/NotificationItem";

// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from "./styles";

// Soft UI Dashboard React context
import {
  useSoftUIController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from "../../../context";
import {Button,Modal} from 'react-bootstrap';
// Images
import team2 from "../../../assets/images/team-2.jpg";
import logoSpotify from "../../../assets/images/small-logos/logo-spotify.svg";
import { auth, db } from "../../../auth/firebase";
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { updateAuthId } from "../../../auth/redux/dataSlice";
import StarIcon from '@mui/icons-material/Star';
import ContactUs from "./ContactUs";
import Feedback from "./Feedback";
import swal from "@sweetalert/with-react";
import { toast } from "react-toastify";
import { Divider, Rating } from "@mui/material";
import { SendOutlined } from "@mui/icons-material";
import { Input } from 'antd';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import WebIcon from '@material-ui/icons/Web';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ArrowForwardIosSharpIcon from '@material-ui/icons/ArrowForwardIosSharp';
import ArrowBackIosSharpIcon from '@material-ui/icons/ArrowBackIosSharp';
import PeopleSharpIcon from '@material-ui/icons/PeopleSharp';
import BusinessSharpIcon from '@material-ui/icons/BusinessSharp';
import NotificationsIcon from '@material-ui/icons/Notifications';
import BusinessCenterSharpIcon from '@material-ui/icons/BusinessCenterSharp';
import ContactPhoneSharpIcon from '@material-ui/icons/ContactPhoneSharp';
import VpnKeySharpIcon from '@material-ui/icons/VpnKeySharp';
import WorkIcon from '@material-ui/icons/Work';
import BookIcon from '@material-ui/icons/Book';
import { CSSTransition } from 'react-transition-group';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import SignIn from "./SignIn";
import Signup from "./SignUp";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import TelegramIcon from '@mui/icons-material/Telegram';


const { TextArea } = Input;

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}



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


function DashboardNavbar({ absolute, light, isMini }) {
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const route = useLocation().pathname.split("/").slice(1);
  const authId = useSelector((state) => state.authId);
  const history = useNavigate("")
  const dispatch1 = useDispatch();
  const [aboutModal, setAboutModal] = React.useState(false);
  const [contactModal, setContactModal] = React.useState(false);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);
   const theme = useTheme();
    const [value, setValue] = React.useState(0);

     const [modalShow, setModalShow] = React.useState(false);
     const [modalShowAuth, setModalShowAuth] = React.useState(false);
    const [currentUser, setCurrentUser] = useState(``)
    const [submitComment, setSubmitComment] = useState('')
    const [value1, setValue1] = React.useState(0);
    const [hover, setHover] = React.useState(-1);
    const [posts, setPosts] = React.useState([])


  React.useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      unsub();
      if (user) {
        db.collection('users').doc(`${user?.uid}`).onSnapshot((doc) => {
          setCurrentUser(doc.data());
        });
      } else {
        // not logged in
      }
    });
  }, []);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    const handleChangeIndex = (index) => {
      setValue(index);
    };
  
  //   return (
  //     <Box sx={{ bgcolor: 'background.paper', width: 500 }}>
 

  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const [showCart, setShowCart] = useState(false);
  const handleCloseCart = () => setShowCart(false);
  const handleShowCart = () => setShowCart(true);

  
  const logout = () => {
    auth.signOut();
    history("/")
    dispatch1(updateAuthId(''))
    window.location.reload();
}


function numberWithCommas(x) {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}


  // Render the notifications menu
  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      <NotificationItem
        image={<img src={team2} alt="person" />}
        title={["New message", "from Jessy Bandya"]}
        date="13 minutes ago"
        onClick={handleCloseMenu}
      />
      <NotificationItem
        image={<img src={logoSpotify} alt="person" />}
        title={["New album", "by Chris Brown"]}
        date="1 day"
        onClick={handleCloseMenu}
      />
      <NotificationItem
        color="secondary"
        image={
          <Icon fontSize="small" sx={{ color: ({ palette: { white } }) => white.main }}>
            payment
          </Icon>
        }
        title={["", "Payment successfully completed"]}
        date="2 days"
        onClick={handleCloseMenu}
      />
    </Menu>
  );


  React.useEffect(() => {
    db.collection("feedbacks").onSnapshot(snapshot => {
        setPosts(snapshot.docs.map(doc => ({
            id: doc.id,
            post: doc.data(),
        })));
    })
}, []);

  const totalRatings = (posts.reduce((a,v) =>  a = a + v.post.rating , 0 ))
  const numberOfRatings = posts.length
  const rating = totalRatings / numberOfRatings
  var a = Math.round(rating * 10) / 10
  var b = posts.length


const submitCommentFun = () => {
  if(value1 === 0){
    toast.error("Kindly rate the stars!")
}else if(value1 === null){
 toast.error("Kindly rate the stars!")
}else if(submitComment === ''){
  toast.error("Kindly leave a comment!")
 }else{
 db.collection("feedbacks").add({
     ratedByUid:auth?.currentUser?.uid,
     rating:value1,
     ratingComment:submitComment,
     ratingTime: Date.now(),
 }).
 then((e)=> 
 setValue1(0),
 setSubmitComment(""),
 swal("Thanks for your feedback ✔️!")
 )
}
}

const date = new Date;
let hours = date.getHours();
let status = (hours < 12)? "Good Morning" : (hours >= 12 && hours < 16)? "Good Afternoon" : (hours >= 16 && hours < 19)? "Good Evening" : (hours >= 19 && hours < 12)? "Good Night" : ((hours <= 12 && hours >= 12 ) ? "Good Morning" : "Good Night");
function abbrNum(number, decPlaces) {
  // 2 decimal places => 100, 3 => 1000, etc
  decPlaces = Math.pow(10,decPlaces);

  // Enumerate number abbreviations
  var abbrev = [ "K", "M", "B", "T" ];

  // Go through the array backwards, so we do the largest first
  for (var i=abbrev.length-1; i>=0; i--) {

      // Convert array index to "1000", "1000000", etc
      var size = Math.pow(10,(i+1)*3);

      // If the number is bigger or equal do the abbreviation
      if(size <= number) {
           // Here, we multiply by decPlaces, round, and then divide by decPlaces.
           // This gives us nice rounding to a particular decimal place.
           number = Math.round(number*decPlaces/size)/decPlaces;

           // Add the letter for the abbreviation
           number += abbrev[i];

           // We are done... stop
           break;
      }
  }

  return number;
}

  return (
    <>
    <AppBar
    style={{zIndex:10}}
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light })}
      className='container'
    >
      <Toolbar sx={(theme) => navbarContainer(theme)} style={{display:'flex'}}>
        <SoftBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
        </SoftBox>
       
          <SoftBox sx={(theme) => navbarRow(theme, { isMini })}>
            {authId ?(
              <>
              <div align="right" style={{display:'flex',alignItems:'center',textAlign:'right'}} color={light ? "white" : "inherit"}>
              <SoftTypography
              variant="button"
              sx={({ palette: { dark, white } }) => ({
                color: light ? white.main : dark.main,
              })}
              fontWeight="medium"
              color={light ? "white" : "dark"}
              style={{marginRight:8,cursor:'pointer',fontWeight:'bold',color:"#2152ff"}}
              onClick={() => setAboutModal(true)}
              >
              {numberOfRatings === 0 ?(<>0</>):(<>{a}</>)}/5<StarIcon  style={{color:'#FFD700'}}/>
            </SoftTypography>
            <SoftTypography
            variant="button"
            sx={({ palette: { dark, white } }) => ({
              color: light ? white.main : dark.main,
            })}
            fontWeight="medium"
            color={light ? "white" : "dark"}
            style={{marginRight:8,cursor:'pointer',fontWeight:'bold',color:"#2152ff"}}
            onClick={() => setContactModal(true)}
            >
            Contact Us
          </SoftTypography>

          <SoftTypography
          variant="button"
          sx={({ palette: { dark, white } }) => ({
            color: light ? white.main : dark.main,
          })}
          fontWeight="medium"
          color={light ? "white" : "dark"}
          style={{marginRight:8,cursor:'pointer',fontWeight:'bold',color:"#2152ff"}}
          onClick={handleShowCart}
          
          >
          <Badge color="error" badgeContent={20}>
          <ShoppingCartIcon fontSize='small' style={{cursor:'pointer',color:'#2152ff'}}/>
           </Badge>  
        </SoftTypography>

          <IconButton
            size="small"
            color="inherit"
            sx={navbarIconButton}
            aria-controls="notification-menu"
            aria-haspopup="true"
            variant="contained"
           
            onClick={handleOpenMenu}
          >
            <Icon fontSize="medium" style={{cursor:'pointer',color:'#2152ff'}}>notifications</Icon>
          </IconButton>
          {renderMenu()}
          
          <SoftTypography
          variant="button"
          sx={({ palette: { dark, white } }) => ({
            color: light ? white.main : dark.main,
          })}
          fontWeight="medium"
          color={light ? "white" : "dark"}
        >
        {authId === "L0HxxASCIzgqHJJDYS2cDCzWKLK2" ?(
          <PowerSettingsNewIcon fontSize="medium" onClick={logout} style={{cursor:'pointer',color:'#2152ff'}}/>
        ):(
          <div>
          <div ><Navbar/></div>
          <div className='largeDeviceToNotDisplayed'><PowerSettingsNewIcon fontSize="medium" onClick={logout} style={{cursor:'pointer',color:'#2152ff'}}/></div>
          </div>
        )}
        </SoftTypography>
        </div>
              </>
            ):(
              <>
              <div style={{display:'flex',alignItems:'center',textAlign:'right'}} color={light ? "white" : "inherit"}>
              <SoftTypography
              variant="button"
              sx={({ palette: { dark, white } }) => ({
                color: light ? white.main : dark.main,
              })}
              fontWeight="medium"
              color={light ? "white" : "dark"}
              style={{marginRight:8,fontWeight:'bold',color:'#2152ff',cursor:'pointer'}}
              onClick={() => setAboutModal(true)}

            >
            {numberOfRatings === 0 ?(<>0</>):(<>{a}</>)}/5<StarIcon  style={{color:'#FFD700'}}/>
            </SoftTypography>
            <SoftTypography
            variant="button"
            sx={({ palette: { dark, white } }) => ({
              color: light ? white.main : dark.main,
            })}
            fontWeight="medium"
            color={light ? "white" : "dark"}
            style={{marginRight:8,fontWeight:'bold',color:'#2152ff',cursor:'pointer'}}
            onClick={() => setContactModal(true)}
          >
            Contact Us
          </SoftTypography>

          <SoftTypography
          variant="button"
          sx={({ palette: { dark, white } }) => ({
            color: light ? white.main : dark.main,
          })}
          fontWeight="medium"
          color={light ? "white" : "dark"}
          style={{marginRight:8,cursor:'pointer',fontWeight:'bold',color:"#2152ff"}}
          onClick={handleShowCart}
          
          >
          <Badge color="error" badgeContent={20}>
          <ShoppingCartIcon fontSize='small' style={{color:'#2152ff'}}/>
           </Badge>  
        </SoftTypography>

          <SoftTypography
          variant="button"
          sx={({ palette: { dark, white } }) => ({
            color: light ? white.main : dark.main,
          })}
          fontWeight="medium"
          color={light ? "white" : "dark"}
          style={{fontWeight:'bold',color:'#2152ff',cursor:'pointer'}}
          onClick={() => setModalShowAuth(true)}
        >
          Sign In
        </SoftTypography>
        </div>
              </>
            )}

          </SoftBox>
      </Toolbar>
    </AppBar>
    <Modal
    show={modalShowAuth}
    onHide={() => setModalShowAuth(false)}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header>
         <AppBar position="static">
           <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="inherit"
              variant="fullWidth"
              style={{backgroundColor:'#fff'}}
              aria-label="full width tabs example"
            >
              <Tab label="Sign In" {...a11yProps(0)} />
              <Tab label="Sign Up" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
    </Modal.Header>
    <Modal.Body
    >
    <SwipeableViews
    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
    index={value}
    onChangeIndex={handleChangeIndex}
  >
    <TabPanel value={value} index={0} dir={theme.direction}>
      <SignIn setModalShow={setModalShowAuth}/>
    </TabPanel>
    <TabPanel value={value} index={1} dir={theme.direction}>
      <Signup setModalShow={setModalShowAuth}/>
    </TabPanel>
  </SwipeableViews>

    </Modal.Body>
  </Modal>






  <Modal
  show={aboutModal}
  onHide={() => setAboutModal(false)}
  size="lg"
  aria-labelledby="contained-modal-title-vcenter"
  centered
>
  <Modal.Header style={{display:'flex',justifyContent:'space-between'}}>
          <div style={{fontWeight:'bold'}}>Feedback Modal <span style={{fontSize:15,alignItems:'center'}}>{numberOfRatings === 0 ?(<>0</>):(<>{a}</>)}/5<StarIcon  style={{color:'#FFD700'}}/></span></div>
          <div><CloseIcon fontSize="large" onClick={()=> setAboutModal(false)} style={{color:'#88888888',cursor:'pointer'}}/></div>
  </Modal.Header>
  <Modal.Body
  style={{
    height: '65vh',
    overflowY: 'auto',
    width:'100%'
  }}
  >
    <span style={{fontWeight:"bold",color:'#2152ff'}}>{abbrNum(posts.length, 1)} Feedbacks</span>
        <Feedback />
  </Modal.Body>
  <div>
  {authId &&(
    <center>
    <Box
    sx={{
      width: 200,
      display: 'flex',
      alignItems: 'center',
    }}
  >
    <Rating
      name="hover-feedback"
      value={value1}
      precision={0.5}
      getLabelText={getLabelText}
      onChange={(event, newValue) => {
        setValue1(newValue);
      }}
      onChangeActive={(event, newHover) => {
        setHover(newHover);
      }}
      emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
    />
    {value !== null && (
      <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value1]}</Box>
    )}
  </Box>
  <div style={{display:'flex',alignItems:'center',padding:5}}>
  <TextArea placeholder={`${status} ${currentUser?.firstName}, we value your feedback!😊`} style={{borderRadius:10,width:'100%'}}
  value={submitComment}
  onChange={e => setSubmitComment(e.target.value)}
  /> 
  
  <TelegramIcon onClick={submitCommentFun} fontSize="medium" style={{marginRight:20,marginLeft:3,cursor:'pointer',fontSize:'25px',color:'#2152ff'}}/>
  </div>
   </center>
  )}
  </div>
</Modal>


<Modal
show={contactModal}
onHide={() => setContactModal(false)}
size="lg"
aria-labelledby="contained-modal-title-vcenter"
centered
>
<Modal.Header style={{display:'flex',justifyContent:'space-between'}}>
<div style={{fontWeight:'bold',color:'#2152ff'}}>Contact Us</div>
<div><CloseIcon fontSize="large" onClick={()=> setContactModal(false)} style={{color:'#88888888',cursor:'pointer'}}/></div>
</Modal.Header>
<Modal.Body>
    <h1>Contact Us</h1>
</Modal.Body>
</Modal>

<Modal show={showCart} onHide={handleCloseCart}>
<Modal.Header closeButton>
<div style={{width:'100%',alignItems:'center',justifyContent:'space-between',display:'flex'}}>
<span><span style={{padding:4,borderRadius:8,fontWeight:'bold',color:'#2152ff',fontSize:18,cursor:'pointer'}}><a className="cart-checkout-btn hover-btn">Clear Cart</a></span></span> <span style={{fontWeight:'bold'}}>CART</span> <span><ClearIcon style={{cursor:'pointer',color:'#2152ff'}} onClick={handleCloseCart}/></span>
</div>
</Modal.Header>
<Modal.Body style={{
maxHeight: 'calc(100vh - 210px)',
overflowY: 'auto'
}}>
<div className="offcanvas-body p-0">
    <div className="side-cart-items">
      <h1>Cart Modal</h1>
    </div>
  </div>
</Modal.Body>
<Modal.Footer>

    <div style={{display:'flex',width:'100%',justifyContent:'space-between',alignItems:'center'}}>
      <span style={{fontWeight:'bold',color:'#2152ff'}}>Total(Ksh): {numberWithCommas(2000)}</span>
      <div >
        {auth?.currentUser?.uid ?(
                  <a href="/check-out" className="cart-checkout-btn hover-btn">Proceed to Checkout</a>
        ):(
          <a onClick={() => alert('progress...')} className="cart-checkout-btn hover-btn">Proceed to Checkout</a>
        )}
</div>
    </div>
</Modal.Footer>
</Modal>
    </>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;



function Navbar(props) {
  const history = useNavigate("")
  const dispatch1 = useDispatch();
  const [currentUser, setCurrentUser] = useState(``)
  const authId = useSelector((state) => state.authId);

  React.useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      unsub();
      if (user) {
        db.collection('users').doc(`${user?.uid}`).onSnapshot((doc) => {
          setCurrentUser(doc.data());
        });
      } else {
        // not logged in
      }
    });
  }, []);
  


  const logout = () => {
    auth.signOut();
    history("/")
    dispatch1(updateAuthId(''))
    window.location.reload();
}

  return (
    <>
    {authId !== '' ?(
      <NavItem icon={<Avatar src={`${currentUser?.profilePhoto}`} alt={`${currentUser?.firstName}`} style={{cursor:'pointer'}} />}>
      <DropdownMenu></DropdownMenu>
    </NavItem>
    ):(
      <NavItem icon={<ArrowDropDownCircleIcon fontSize="medium" style={{cursor:'pointer',color:"#2152ff"}} />}>
      <DropdownMenu></DropdownMenu>
    </NavItem>
    )}
    </>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item1">
      <a className="icon-button1" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>

      {open && props.children}
    </li>
  );
}

function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
  }, [])

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
      
    return (
      <a className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        <span className="icon-button1">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right1">{props.rightIcon}</span>
      </a>
    );
  }


  const [user, setUser] = useState([]);
      useEffect(() => {
        auth.onAuthStateChanged((authUser) =>{
          if(authUser){
            setUser(authUser)
          }else{
            setUser(false);
          }
        })
      }, [])



      const history = useNavigate("")
      const dispatch1 = useDispatch();
      const [currentUser, setCurrentUser] = useState(``)
      const authId = useSelector((state) => state.authId);
      React.useEffect(() => {
        const unsub = auth.onAuthStateChanged((user) => {
          unsub();
          if (user) {
            db.collection('users').doc(`${user?.uid}`).onSnapshot((doc) => {
              setCurrentUser(doc.data());
            });
          } else {
            // not logged in
          }
        });
      }, []);
      
    
    
      const logout = () => {
        auth.signOut();
        history("/")
        dispatch1(updateAuthId(''))
        window.location.reload();
    }

  return (
    <div className="dropdown1" style={{ height: menuHeight }} ref={dropdownRef}>



{authId ?(
  <>
          <CSSTransition
        in={activeMenu === 'main'}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}>
        <div style={{height: 180}} className="menu">
            <DropdownItem
            
            leftIcon={<Avatar src={`${currentUser?.profilePhoto}`} alt={`${currentUser?.firstName}`} style={{cursor:'pointer'}}/>}
          > 
              <i style={{fontSize:16}}>{currentUser?.firstName} {currentUser?.lastName}</i>
          </DropdownItem>
          <DropdownItem
          leftIcon={<AddCircleOutlineIcon style={{color:"#fff"}}/>}
          goToMenu="">
              <a style={{color:"#fff",fontWeight:'bold'}} href={`/account`}>
          My Account (Profile)
          </a>
        </DropdownItem>

          <DropdownItem
          
            leftIcon={<ExitToAppIcon onClick={logout}/>}
            >
            <p style={{marginTop:10,color:"#fff",fontWeight:'bold'}} onClick={logout}>Logout</p>
          </DropdownItem>
        </div>
      </CSSTransition>
  </>
):(
  <>
  <CSSTransition
  in={activeMenu === 'main'}
  timeout={500}
  classNames="menu-primary"
  unmountOnExit
  onEnter={calcHeight}>
  <div style={{height: 200}} className="menu">
    <DropdownItem 
      leftIcon={<WebIcon />}
      rightIcon={<ArrowForwardIosSharpIcon style={{color: "#fff"}}/>}
      goToMenu="Charity">
      Charity
    </DropdownItem>
    <DropdownItem
    leftIcon={<WorkIcon />}
    rightIcon={<ArrowForwardIosSharpIcon style={{color: "#fff"}}/>}
    goToMenu="Partners">
    Partnership
  </DropdownItem>

    <DropdownItem
      leftIcon={<WorkIcon />}
      rightIcon={<ArrowForwardIosSharpIcon style={{color: "#fff"}}/>}
      goToMenu="Developers">
      Developers
    </DropdownItem>
  </div>
</CSSTransition>
</>
)}



<CSSTransition
        in={activeMenu === 'Charity'}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}>
        <div style={{height: 180}} className="menu">
          <DropdownItem goToMenu="main" leftIcon={<ArrowBackIosSharpIcon style={{color: "#00BFFF"}}/>}>
            <i style={{color:'#fff'}}>back</i>
          </DropdownItem>
          <DropdownItem style={{marginTop: 15}} leftIcon={<BusinessCenterSharpIcon />}>
              <a style={{color:"#fff"}} target="_blank" href="https://elimishacharity.org/">
              <p>Elimisha Campaign</p>
              </a>
                </DropdownItem>
          <DropdownItem style={{marginTop: 15}} leftIcon={<BusinessCenterSharpIcon />}>

          <a style={{color:"#fff"}}>
          <p>Comrade for comrades</p>
          </a>
         </DropdownItem>
        </div>
      </CSSTransition>
      <CSSTransition
        in={activeMenu === 'Developers'}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}>
        <div style={{height: 180}} className="menu">
          <DropdownItem goToMenu="main" leftIcon={<ArrowBackIosSharpIcon style={{color: "#00BFFF"}} />}>
          <i style={{color:'#fff'}}>back</i>
          </DropdownItem>
          <DropdownItem leftIcon={<ContactPhoneSharpIcon />}>
            <a style={{color:"#fff"}}>
            System Design
            </a>
          </DropdownItem>

          <DropdownItem style={{marginTop: 15}} leftIcon={<BusinessCenterSharpIcon />}>
           <a style={{color:"#fff"}}>
           Technology
           </a>
                </DropdownItem>
        </div>
      </CSSTransition>
      <CSSTransition
      in={activeMenu === 'Partners'}
      timeout={500}
      classNames="menu-secondary"
      unmountOnExit
      onEnter={calcHeight}>
      <div style={{height: 320}} className="menu">
        <DropdownItem goToMenu="main" leftIcon={<ArrowBackIosSharpIcon style={{color: "#00BFFF"}} />}>
        <i style={{color:'#fff'}}>back</i>
        </DropdownItem>
        <DropdownItem leftIcon={<ContactPhoneSharpIcon />}>
          <a style={{color:"#fff"}}>
          ESA
          </a>
        </DropdownItem>

        <DropdownItem style={{marginTop: 15}} leftIcon={<BusinessCenterSharpIcon />}>
         <a style={{color:"#fff"}}>
         SEES
         </a>
              </DropdownItem>
              <DropdownItem style={{marginTop: 15}} leftIcon={<BusinessCenterSharpIcon />}>
              <a style={{color:"#fff"}}>
              MESA
              </a>
                   </DropdownItem>
                   <DropdownItem style={{marginTop: 15}} leftIcon={<BusinessCenterSharpIcon />}>
                   <a style={{color:"#fff"}}>
                   ACES
                   </a>
                        </DropdownItem>
                        <DropdownItem style={{marginTop: 15}} leftIcon={<BusinessCenterSharpIcon />}>
                        <a style={{color:"#fff"}}>
                        GESA
                        </a>
                             </DropdownItem>
      </div>
    </CSSTransition>
    </div>
  );
}