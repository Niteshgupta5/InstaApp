import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { notloged } from './actions/Action.js';
import { toast } from 'react-toastify';

function FollowingList() {
    const logstate = useDispatch();
  const navigate = useNavigate();
  const [following, setFollowing] = useState([]);

    const fetchFollowing = async () =>{

        try {
             const apiurl = "/fetch/following/list";
             const res = await fetch(apiurl,{method: 'POST',
             headers: { 
               Accept: "application/json",
               "Content-Type": "application/json"
             },
             credentials: "include",
           })
         
           const data = await res.json();
           if(data){
           if(data.msg === "Unauthorized: No token provided"){
             toast.error(data.msg);
             logstate(notloged(false));
             navigate('/');
           }else{
              setFollowing(data.msg);
           }
          }else{setFollowing([])}
        } catch (err) {
          console.log(err);
          logstate(notloged(false));
          navigate('/');
        }       
      };
  
    useEffect(()=>{
      fetchFollowing();
    },[]);

  return (
    <>
       <div className="container mt-5">
        <div className="d-flex justify-content-center row">
            <div className="col-md-6">
                <div className="p-3 bg-white text-center">
                    <div><img src="/assets/images/logo.png" alt=""/>
                        <h1>Your Followings</h1>
                    </div>
                    <p>Chat with some beautiful soul who&nbsp;<br/>have some interests like you!<br/><br/></p>
                    {
                      following.length>0 ? (<>{
                                following.map((ele,index)=>{
                                  return(<>
                                    <div className="d-flex flex-row justify-content-between align-items-center mb-3" key={index}>
                                    <div className="d-flex flex-row align-items-center"><img className="rounded-circle" src={ele.followingprofile} width="55" alt=""/>
                                    <div className="d-flex flex-column align-items-start ml-2" style={{marginLeft: "10px"}}><span className="font-weight-bold">{ele.followingto}</span></div>
                                   </div>
                                   <div className="d-flex flex-row align-items-center mt-2">
                                     <button className="btn btn-outline-primary btn-sm" type="button" value={ele.username}><i className="fas fa-paper-plane" style={{color: "#3b71ca"}}></i></button>
                                   </div>
                                  </div></>
                                  )
                                })
                      }</>) : (<div>There is no following</div>)
                    }
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default FollowingList;
