import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { currentuser } from './actions/Action.js';
import { loged } from './actions/Action.js';
import axios from 'axios';
import { toast } from 'react-toastify';


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const mydispatch = useDispatch();

  const HandleLogin = async (e)=>{

      try {
        e.preventDefault();
        const apiurl = "http://localhost:3001/login";
        const UserDetails = {"email": email, "password": password};
        
        axios.post(apiurl,UserDetails,{withCredentials: true}).then(res=>{
          if(res.data.result === "Login Successfully"){
            toast.success(res.data.result);
          }else{
            toast.error(res.data.result);
          }
          setEmail("");
          setPassword("");
          if(res.data.result === "Login Successfully"){
            mydispatch(currentuser(res.data.username));
            mydispatch(loged(true));
          }
        }).catch((err)=>{
          toast.error("Something went wrong");
          console.log("failed in connection");
        });
        
      } catch (err) {
        console.log(err);
      }
  }

  return (
    <>
        <section className="vh-100" style={{backgroundColor: "transparent"}}>
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col col-xl-10">
                <div className="card" style={{borderRadius: "1rem"}}>
                  <div className="row g-0">
                    <div className="col-md-6 col-lg-5 d-none d-md-block">
                      <img src="/assets/images/login.webp"
                        alt="login form" className="img-fluid" style={{borderRadius: "1rem 0 0 1rem"}} />
                    </div>
                    <div className="col-md-6 col-lg-7 d-flex align-items-center">
                      <div className="card-body p-4 p-lg-5 text-black">

                        <form onSubmit={HandleLogin}>

                          <div className="d-flex align-items-center mb-3 pb-1">
                            <i className="fas fa-cubes fa-2x me-3" style={{color: "rgb(104 156 240)"}}></i>
                            <span className="h1 fw-bold mb-0">Insta App</span>
                          </div>

                          <h5 className="fw-normal mb-3 pb-3" style={{letterSpacing: "1px"}}>Login into your account</h5>

                          <div className="form-outline mb-4">
                            <label className="form-label" style={{color: "black"}}>Email address</label>
                            <input type="email" id="form2Example17" className="form-control form-control-lg" value={email} onChange={(e)=>{setEmail(e.target.value)}} style={{boxShadow:  "2px 2px 4px 0px rgba(103, 102, 102, 0.28)"}} required/>
                          </div>

                          <div className="form-outline mb-4">
                            <label className="form-label" style={{color: "black"}}>Password</label>
                            <input type="password" id="form2Example27" className="form-control form-control-lg" pattern="[A-Za-z0-9]{8,}" value={password} onChange={(e)=>{setPassword(e.target.value)}} style={{boxShadow:  "2px 2px 4px 0px rgba(103, 102, 102, 0.28)"}} required/>
                          </div>

                          <div className="pt-1 mb-4">
                            <button className="btn btn-primary btn-lg btn-block" type="submit" value="submit">Login</button>
                          </div>

                          <Link to="/forget/password/xzb73jadbYF675YTfsqu74bjHGBgykjaio74" className="small text-muted">Forgot password?</Link>
                          <p className="mb-5 pb-lg-2" style={{color: "#393f81"}}>Don't have an account? <Link to="/BUjxjw224/api/sign/up/iopwqbndinHUYRhs238490VGTuheokwjbUiG"
                              style={{color: "#393f81", textDecoration: 'underline'}}>Register here</Link></p>
                          <p className="small text-muted">Terms of use. | Privacy policy</p>
                        </form>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
    </>
  )
}

export default Login;
