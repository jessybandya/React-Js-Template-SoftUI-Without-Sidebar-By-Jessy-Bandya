import React from 'react'
import SoftButton from '../../components/SoftButton'
import Footer from '../../examples/Footer'
import DashboardNavbar from '../../examples/Navbars/DashboardNavbar'

function Nopage() {
  return (
    <div>
    <DashboardNavbar />
    <div className="thank-you-area mtb-60px">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-8">
              <div className="inner_complated">
                <div className="img_cmpted"><h1><i>Error 404</i></h1></div>
                <p className="dsc_cmpted">Oops! Sorry we can't find the page you are looking for :)</p>
                <div className="btn_cmpted">
                  <a href="/">
                  <SoftButton 
      style={{backgroundColor:'#2152ff',color:'#fff'}} fullWidth>Go back to home page</SoftButton>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    <Footer />
    </div>
  )
}

export default Nopage