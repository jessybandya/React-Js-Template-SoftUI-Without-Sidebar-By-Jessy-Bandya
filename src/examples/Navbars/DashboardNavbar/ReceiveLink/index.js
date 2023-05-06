import swal from '@sweetalert/with-react'
import { Spin } from 'antd'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import SoftBox from '../../../../components/SoftBox'
import SoftButton from '../../../../components/SoftButton'
import SoftInput from '../../../../components/SoftInput'
import { db } from '../../../../firebase'

function ReceiveLink({ setModalShowForgetPass }) {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [loading, setLoading] = useState(false)
    const registerID = db.collection('registration-failed').doc().id
    const history = useNavigate("");


    const completeRegistration = () =>{
        setLoading(true)
        if(!fullName){
            toast.error("Full Name is required!", {
                position: toast.POSITION.TOP_CENTER
            })
            setLoading(false)
        }else if(!email){
            toast.error("School email is required!", {
                position: toast.POSITION.TOP_CENTER
            })
            setLoading(false)
        }else if(!/\S+@[students]+\.[uonbi]+\.[ac]+\.[ke]+/.test(email)) {
            setLoading(false)
            toast.error('Student Email address is invalid\nFormat (...@students.uonbi.ac.ke)', {
              position: toast.POSITION.TOP_CENTER
          });
          setLoading(false)
        }else if(!phone) {
            setLoading(false)
            toast.error('Phone number is required!', {
              position: toast.POSITION.TOP_CENTER
          });
          setLoading(false)
        }else{
          db.collection("registration-failed").where("email","==",email).get().then((resultSnapShot) =>{
            if(resultSnapShot.size == 0){
              db.collection("registration-failed").doc(registerID).set({
                registerID,
                  timestamp:Date.now(),
                  email,
                  phone,
                  fullName,
                  helped:false
              })
              setLoading(false)
              setModalShowForgetPass(false)
              swal("You are now directed to a page to complete your registration!\n\nThank you for your patience!")
              history(`/authentication/sign-up-main`)
          }else{
            toast.error(`Email(${email}) entered already submitted!`)
            }
          })
        }
    }

  return (
    <div>            
    <SoftBox style={{display:'flex'}} mb={2}>
    <SoftInput style={{marginRight:3}}
    value={fullName}
    onChange={e => setFullName(e.target.value)}
    placeholder="Full Name" />
    <SoftInput style={{marginLeft:3}} 
    value={phone}
    onChange={e => setPhone(e.target.value)}
    placeholder="Phone No." />
  </SoftBox>
  
  <SoftBox mb={2}>
  <SoftInput style={{marginRight:3}}
  value={email}
  onChange={e => setEmail(e.target.value)}
  placeholder="School E-mail" />
</SoftBox>

<SoftBox mt={4} mb={1}>
<SoftButton onClick={completeRegistration} variant="gradient" color="dark" fullWidth>
{loading === true ?(
  <span><span style={{color:'#fff'}}>Requesting...<Spin size="middle" /></span></span>
):(
  <span>Request for a link</span>
)}
</SoftButton>
</SoftBox>
  </div>
  )
}

export default ReceiveLink