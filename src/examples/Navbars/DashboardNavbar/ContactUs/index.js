import React, { useState } from 'react'
import { Space, Spin } from 'antd';
import { useSelector } from 'react-redux';
import { db } from '../../../../auth/firebase';
import { toast } from 'react-toastify';
import swal from "@sweetalert/with-react";
import SoftButton from '../../../../components/SoftButton';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import EmailIcon from '@mui/icons-material/Email';

function ContactUs({ setContactModal, setModalShow }) {
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false);
  const authId = useSelector((state) => state.authId);
  
  const submitComplaint = (e) => {
     if(!authId){
      setModalShow(true)
     }else{
      e.preventDefault()
      setLoading(true)
      if(!subject){
        toast.error('Subject input is empty!', {
          position: toast.POSITION.TOP_CENTER
      })
        setLoading(false)
    }else if(!message){
      toast.error('Message input is empty!', {
        position: toast.POSITION.TOP_CENTER
    })
      setLoading(false)
  }else{
    setLoading(true)
    const complaintId = db.collection('complaints').doc().id
    db.collection("complaints").doc(complaintId).set({
      fromId:`${authId}`,
      complaintId,
      subject,
      message,
      helperRole:"",
      helperName:"",
      helperPhone:"",
      helped: "Not done",
      timestamp:Date.now(),
      done:false
    })
    setLoading(false)
    setContactModal(false)
    swal("✔️ complaint has been sent to the admin, a leader will act upon the complaint & make a follow up.\nThanks for your patience.");
  }


     }
  }

  return (
    <div className="contact3 py-0">
        <div className="row no-gutters">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="card-shadow">
                  <img src="/media/images/logo2.jpg" className="img-fluid" />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="contact-box ml-3">
                  <h1 className="font-weight-light mt-2">Quick Contact</h1>
                  <div className="mt-4">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="form-group mt-2">
                          <input className="form-control" type="text" placeholder="Subject" />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group mt-2">
                          <textarea className="form-control" rows={3} placeholder="message" defaultValue={""} />
                        </div>
                      </div>
                      <div className="col-lg-12">
                      <SoftButton style={{backgroundColor:'#2152ff',color:'#fff',marginTop:8}} fullWidth>
                         Submit
                      </SoftButton>                      
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="card mt-4 border-0 mb-4">
                  <div className="row">
                    <div className="col-lg-4 col-md-4">
                      <div className="card-body d-flex align-items-center c-detail pl-0">
                        <div className>
                        <LocationOnIcon fontSize='large' style={{color:'#2152ff'}}/>
                          <p className>
                          <a style={{fontWeight:'bold',fontSize:15}} className="text-muted">Kimathi Street , opposite Total petrol station , equity bank building . KIMATHI CHAMBERS 2ND FLOOR RM 9</a>
                            </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4">
                      <div className="card-body d-flex align-items-center c-detail">
                        <div className>
                        <AddIcCallIcon fontSize='large' style={{color:'#2152ff'}}/>
                          <p className>
                          <a style={{fontWeight:'bold',fontSize:15}} href="tel:+254713441634" className="text-muted"> +254713441634</a>
                            </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4">
                      <div className="card-body d-flex align-items-center c-detail">
                        <div className>
                        <EmailIcon fontSize='large' style={{color:'#2152ff'}}/>
                          <p className>
                          <a style={{fontWeight:'bold',fontSize:15}} href="mailto:info@electrikacomputers.co.ke" className="text-muted"> info@electrikacomputers.co.ke</a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default ContactUs