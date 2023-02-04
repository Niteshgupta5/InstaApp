import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { notloged } from './actions/Action.js';
import { toast } from 'react-toastify';

function FollowersList() {
  const logstate = useDispatch();
  const navigate = useNavigate();
  const [followers, setFollowers] = useState([]);

  const connectToChat = async (e) =>{
    try {
         e.preventDefault();
         let username = e.target.value;
         const apiurl = "/connect/user/tochat";
         const res = await fetch(apiurl,{method: 'POST',
         headers: { 
           Accept: "application/json",
           "Content-Type": "application/json"
         },
         credentials: "include",
         body: JSON.stringify({name: username})
       })
     
       const data = await res.json();
       if(data){
       if(data.msg === "Unauthorized: No token provided"){
         toast.error(data.msg);
         logstate(notloged(false));
         navigate('/');
       }else{
          if (data.msg === "success") {
            navigate('/eodneddxc/api/message/ioopqihrnmncpowejnop243jsiqjl14vghywtsjyuor');
          }
       }
      }else{
        return;
      }
    } catch (err) {
      console.log(err);
      logstate(notloged(false));
      navigate('/');
    }       
  };

    const fetchFollowers = async () =>{
        try {
             const apiurl = "/fetch/followers/list";
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
              setFollowers(data.msg);
           }
          }else{setFollowers([])}
        } catch (err) {
          console.log(err);
          logstate(notloged(false));
          navigate('/');
        }       
      };
  
    useEffect(()=>{
      fetchFollowers();
    },[]);

  return (
    <>
       <div className="container mt-5" id='followerslistdiv'>
        <div className="d-flex justify-content-center row">
            <div className="col-md-6">
                <div className="p-3 bg-white text-center">
                    <div><img src="/assets/images/logo.png" alt=""/>
                        <h1>Your Followers</h1>
                    </div>
                    <p>Chat with some beautiful soul who&nbsp;<br/>have some interests like you!<br/><br/></p>
                    {
                      followers.length>0 ? (<>{
                                followers.map((ele,index)=>{
                                  return(<>
                                    <div className="d-flex flex-row justify-content-between align-items-center mb-3" key={index}>
                                    <div className="d-flex flex-row align-items-center"><img className="rounded-circle" src={ele.followerprofile} width="55" alt=""/>
                                    <div className="d-flex flex-column align-items-start ml-2" style={{marginLeft: "10px"}}><span className="font-weight-bold">{ele.follower}</span></div>
                                   </div>
                                   <div className="d-flex flex-row align-items-center mt-2">
                                     <button className="btn btn-outline-primary btn-sm" type="button" value={ele.follower} onClick={connectToChat}><i className="fas fa-paper-plane" style={{color: "#3b71ca"}}></i></button>
                                   </div>
                                  </div></>
                                  )
                                })
                      }</>) : (<div>There is no followers</div>)
                    }
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default FollowersList;
