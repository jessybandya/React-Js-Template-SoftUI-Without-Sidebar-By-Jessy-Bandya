import React, { useState } from 'react'
import SoftBox from '../../../../components/SoftBox'
import SoftButton from '../../../../components/SoftButton'
import SoftInput from '../../../../components/SoftInput'
import SoftTypography from '../../../../components/SoftTypography'
import brand from "../../../../assets/images/logo-ct.png";
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from 'react-toastify'
import { Space, Spin } from 'antd';
import { auth, db } from '../../../../auth/firebase'
import swal from '@sweetalert/with-react'
import { Button, Modal } from 'react-bootstrap'
import logo from '../../../../logo.svg';

function SignUp({setModalShow}) {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false);
  const [modalShowForgetPass, setModalShowForgetPass] = React.useState(false);

  const signUp = (e) => {
    e.preventDefault()
    setLoading(true)
    if(!email){
        toast.error('Email input is empty!', {
          position: toast.POSITION.TOP_CENTER
      })
        setLoading(false)
    }else if(!/\S+@[students]+\.[uonbi]+\.[ac]+\.[ke]+/.test(email)) {
      setLoading(false)
      toast.error('Student Email address is invalid\nFormat (...@students.uonbi.ac.ke)', {
        position: toast.POSITION.TOP_CENTER
    });
    }else{
      db.collection("users").where("email","==",email).get().then((resultSnapShot) =>{
        if(resultSnapShot.size == 0){
          const config = {
            url: `${process.env.REACT_APP_WEBSITE_URL}/authentication/sign-up`,
            handleCodeInApp: true
        }
        auth.sendSignInLinkToEmail(email, config)
        swal(`A link has been sent to ${email} INBOX Or SPAM, click the link to complete your registration.`)
        window.localStorage.setItem('emailForRegistration', email)
        setEmail("")
        setLoading(false)
        setModalShow(false)
        }else {
          //Already registered
          toast.warn("The email you enterd already in use", {
            position: toast.POSITION.TOP_CENTER
        })
          setLoading(false)
      }
      })

    }
  }
  return (
    <SoftBox p={2}>
    <center><img src={logo} className="App-logo" alt="logo" /></center>
    <center style={{fontWeight:'bold'}}>Create An Account!</center>
    <SoftBox component="form" role="form">
    <SoftBox mt={4}>
    <a href='/authentication/sign-up'>
    <SoftButton variant="gradient" color="info" fullWidth>
    Go to sign Up page
    </SoftButton>
    </a>
    </SoftBox>
    </SoftBox>
    </SoftBox>
  )
}

export default SignUp