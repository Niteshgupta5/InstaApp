import React from 'react';
import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <>
     <div className="edit-comp">
      	<div className="center" style={{boxShadow: "none",backgroundColor:"transparent"}}>
            <h1 style={{fontSize: "11rem",color:"#0000001f"}}>404</h1>
            <h3 style={{position: "absolute",top: "70%"}}>Page Not Found</h3>
            <p style={{position: "absolute",top: "80%"}}>The Page you are looking dosen't exist</p>
            <p style={{position: "absolute",top: "85%"}}>Go to <Link to="/" style={{textDecoration: "underline"}}>Home Page</Link></p>
        </div>
    </div>
    </>
  )
}

export default ErrorPage;