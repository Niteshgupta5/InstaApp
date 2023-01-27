import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function ForgetPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");
    const [toggle, setToggle] = useState(false);

    const handleForget = async (evt)=>{
        try {
            evt.preventDefault();
            const apiurl = "/api/send/otp";

            const res = await fetch(apiurl,{method: 'POST',
             headers: { 
               "Content-Type": "application/json"
             },
             body: JSON.stringify({email: email})
           })
     
           const data = await res.json();
           if (data.msg.status) {
            toast.success(data.msg.login);
            console.log(data.msg.preview);
             setToggle(true);
           } else {
            toast.error(data.msg.login);
             setEmail("");
           }

         } catch (err) {
            console.log(err);
            navigate('/');
         }
      }

      const handlePass = async (evt)=>{
        try {
            evt.preventDefault();
            if (password === cpassword) {
            const apiurl = "/api/verify/otpvalid";

            const res = await fetch(apiurl,{method: 'POST',
             headers: { 
               "Content-Type": "application/json"
             },
             body: JSON.stringify({email: email, otp : otp, password :password})
           })
     
           const data = await res.json();
           if (data.msg.status) {
              toast.success(data.msg.login);
           } else {
              toast.error(data.msg.login);
           }
            setEmail("");
            setOtp("");
            setPassword("");
            setCpassword("");
            setToggle(false);
            if(data.msg.status){
                navigate('/');
            }else{
                navigate('/forget/password/xzb73jadbYF675YTfsqu74bjHGBgykjaio74');
            }
          } else {
                toast.error("password and Confirm password not matched");
              }
        } catch (err) {
            console.log(err);
            navigate('/');
         }
      }

  return (
    <>
        <div className="edit-comp">
      	<div className="center">
        <form onSubmit={toggle ? (handlePass) : (handleForget)}>
            <div className="form-outline mb-4">
               <input type="email" id="form3Example1" className='form-control' value={email} onChange={(e)=>{setEmail(e.target.value)}} style={{boxShadow:  "2px 2px 4px 0px rgb(214 199 199)"}} required/>
               <label className="form-label" style={{color: "#00000091", fontSize: "14px"}}>Email</label>
            </div>
            {toggle ? (<>
            <div className="form-outline mb-4">
              <input type="text" id="form3Example2" className='form-control' value={otp} pattern="[0-9]{4}" maxLength="4" onChange={(e)=>{setOtp(e.target.value)}} style={{boxShadow:  "2px 2px 4px 0px rgb(214 199 199)"}} required/>
              <label className="form-label" style={{color: "#00000091", fontSize: "14px"}}>OTP</label>
            </div>
            <div className="form-outline mb-4">
              <input type="password" id="form3Example3" className='form-control' value={password} pattern="[A-Za-z0-9]{8,}" onChange={(e)=>{setPassword(e.target.value)}} style={{boxShadow:  "2px 2px 4px 0px rgb(214 199 199)"}} required/>
              <label className="form-label" style={{color: "#00000091", fontSize: "14px"}}>Password</label>
            </div>
            <div className="form-outline mb-4">
              <input type="password" id="form3Example4" className='form-control' value={cpassword} pattern="[A-Za-z0-9]{8,}" onChange={(e)=>{setCpassword(e.target.value)}} style={{boxShadow:  "2px 2px 4px 0px rgb(214 199 199)"}} required/>
              <label className="form-label" style={{color: "#00000091", fontSize: "14px"}}>CPassword</label>
            </div>
            <button type="submit" value="submit" className="btn btn-primary btn-block mb-4">Submit</button>
            </>) : (<button type="submit" value="submit" className="btn btn-primary btn-block mb-4">Send OTP</button>)}
           
          </form>
        </div>
        </div>
    </>
  )
}

export default ForgetPassword;
