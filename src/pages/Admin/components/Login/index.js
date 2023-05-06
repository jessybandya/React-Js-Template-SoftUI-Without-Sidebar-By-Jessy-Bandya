import React, { useEffect, useState } from 'react'
import SoftBox from '../../../../components/SoftBox'
import SoftButton from '../../../../components/SoftButton'
import SoftInput from '../../../../components/SoftInput'
import SoftTypography from '../../../../components/SoftTypography'
// import brand from "../../../../assets/images/logo-ct.png";
import { auth } from '../../../../auth/firebase'
import { toast } from 'react-toastify'
import { Space, Spin } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { updateAuthId } from '../../../../auth/redux/dataSlice'
import {Button,Modal} from 'react-bootstrap'
import { Container } from '@mui/system'

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();
  const authId = useSelector((state) => state.authId);
  const [modalShowForgetPass, setModalShowForgetPass] = React.useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if(user){
        const idTokenResult = await user.getIdTokenResult()
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            email: user.email,
            token: idTokenResult.token,
            
          }
        })
        dispatch(updateAuthId(user?.uid))

      }
    })
    return () => unsubscribe()
  }, [])

  const login = (e)=> {
    e.preventDefault();
   setLoading(true)
    auth.signInWithEmailAndPassword(email,password)
    .then((auth) =>{
      setLoading(false)
      toast.success("Welcome back Admin.")
    })
    .catch((e) =>{
            toast.error(e.message, {
              position: toast.POSITION.TOP_CENTER
          })      
          setLoading(false)     
    })
}

  return (
    <Container component="main" maxWidth="xs">
    <SoftBox style={{marginTop:-50}} p={3}>
    <center><img src="/media/images/logo2.jpg" style={{height:80}}/></center>
    <center style={{fontWeight:'bold',margin:10}}>Welcome Electrika Computers Admin!</center>
    <SoftBox component="form" role="form">
    <SoftBox mb={2}>
      <SoftBox mb={1} ml={0.5}>
        <SoftTypography component="label" variant="caption" fontWeight="bold">
          Email
        </SoftTypography>
      </SoftBox>
      <SoftInput type="email"
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Email" />
    </SoftBox>
    <SoftBox mb={2}>
      <SoftBox mb={1} ml={0.5}>
        <SoftTypography component="label" variant="caption" fontWeight="bold">
          Password
        </SoftTypography>
      </SoftBox>
      <SoftInput type="password" 
      onChange={(e) => setPassword(e.target.value)}
      placeholder="Password" />
    </SoftBox>
    <SoftBox mt={4}>
      <SoftButton 
      onClick={login}
      style={{backgroundColor:'#2152ff',color:'#fff'}} fullWidth>
      {loading === true ?(
        <span><span style={{color:'#fff'}}>signing in...<Spin size="middle" /></span></span>
      ):(
        <span>Sign In</span>
      )}
      </SoftButton>
    </SoftBox>
  </SoftBox>

    </SoftBox>
    </Container>
  )
}

export default SignIn