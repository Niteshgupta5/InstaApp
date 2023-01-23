import axios from 'axios';
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const HandleSignup = async (e)=>{
    try {
      e.preventDefault();
      const apiurl = "/signup";
      const UserDetails = {"firstname": firstname, "lastname": lastname, "username": "@"+ username, "email": email, "password": password};
      const res = await axios.post(apiurl, UserDetails);
      
      if (res) {
         if(res.data.result === "Registered Successfully"){
          alert(res.data.result);
           navigate('/');
          }else{
           alert(res.data.result);
          }
        setFirstname("");
        setLastname("");
        setUsername("");
        setEmail("");
        setPassword("");
      } 
    } catch (err) {
        console.log(err);
    }
    
}
  return (
    <>
        <section className="text-center text-lg-start">
          <div className="container py-4">
            <div className="row g-0 align-items-center">
              <div className="col-lg-6 mb-5 mb-lg-0">
                <div className="card cascading-right" style={{background: "hsla(0, 0%, 100%, 0.55)", backdropFilter: "blur(30px)"}}>
                  <div className="card-body p-5 shadow-5 text-center">
                    <h2 className="fw-bold mb-5">Sign up now</h2>
                    <form onSubmit={HandleSignup}>
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input type="text" id="form3Example1" className="form-control" value={firstname} onChange={(e)=>{setFirstname(e.target.value)}} style={{boxShadow:  "2px 2px 4px 0px rgb(214 199 199 / 28%)"}} required/>
                            <label className="form-label" style={{color: "#00000091", fontSize: "14px"}}>First Name</label>
                          </div>
                        </div>
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input type="text" id="form3Example2" className="form-control" value={lastname} onChange={(e)=>{setLastname(e.target.value)}} style={{boxShadow:  "2px 2px 4px 0px rgb(214 199 199 / 28%)"}} required/>
                            <label className="form-label" style={{color: "#00000091", fontSize: "14px"}}>Last Name</label>
                          </div>
                        </div>
                      </div>
                      <div className="form-outline mb-4">
                        <input type="text" id="form3Example3" className="form-control" value={username} onChange={(e)=>{setUsername(e.target.value)}} style={{boxShadow:  "2px 2px 4px 0px rgb(214 199 199 / 28%)"}} required/>
                        <label className="form-label" style={{color: "#00000091", fontSize: "14px"}}>Username</label>
                      </div>
                      <div className="form-outline mb-4">
                        <input type="email" id="form3Example4" className="form-control" value={email} onChange={(e)=>{setEmail(e.target.value)}} style={{boxShadow:  "2px 2px 4px 0px rgb(214 199 199 / 28%)"}} required/>
                        <label className="form-label" style={{color: "#00000091", fontSize: "14px"}}>Email address</label>
                      </div>
                      <div className="form-outline mb-4">
                        <input type="password" id="form3Example5" className="form-control" value={password} onChange={(e)=>{setPassword(e.target.value)}} pattern="[A-Za-z0-9]{8,}" style={{boxShadow:  "2px 2px 4px 0px rgb(214 199 199 / 28%)"}} required/>
                        <label className="form-label" style={{color: "#00000091", fontSize: "14px"}}>Password</label>
                      </div>
                      <button type="submit" value="submit" className="btn btn-primary btn-block mb-4">
                        Sign Up
                      </button>
                      <div className="text-center">
                        <p>or sign up with</p>
                        <button type="button" className="btn btn-link btn-floating mx-1">
                          <i className="fab fa-facebook-f"></i>
                        </button>
        
                        <button type="button" className="btn btn-link btn-floating mx-1">
                          <i className="fab fa-google"></i>
                        </button>
        
                        <button type="button" className="btn btn-link btn-floating mx-1">
                          <i className="fab fa-twitter"></i>
                        </button>
        
                        <button type="button" className="btn btn-link btn-floating mx-1">
                          <i className="fab fa-github"></i>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
        
              <div class="col-lg-6 mb-5 mb-lg-0">
                <img src="/assets/images/signup.jpg" class="w-100 rounded-4 shadow-4" alt="Signup_image"/>
              </div>
            </div>
          </div>
        </section>
        
    </>
  )
}

export default SignUp;
