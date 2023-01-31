import React, { useState, useEffect } from 'react';
import './ChatMessage.css';
import CurrUserStatus from '../reducer/CheckUserStatus.js';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { notloged } from './actions/Action.js';
import { toast } from 'react-toastify';

//https://mernappbackend-lduv.onrender.com

function ChatMessage() {
  const curruser = useSelector((state)=> state.CurrUserStatus);
  const logstate = useDispatch();
  const navigate = useNavigate();
  const [chatlist, setChatlist] = useState([]);
  const [conversationlist, setConversationlist] = useState([]);
  const [chatuser, setChatuser] = useState("");
  const [message, setMessage] = useState("");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


  const SendMessage = async (e) =>{
    try {
      e.preventDefault();
      const apiurl = "/send/chat/message";
      const res = await fetch(apiurl,{method: 'POST',
      headers: { 
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({receiver: chatuser, message : message})
    })
  
    const data = await res.json();
    if(data){
    if(data.msg === "Unauthorized: No token provided"){
      toast.error(data.msg);
      logstate(notloged(false));
      navigate('/');
    }else{
       setMessage("");
       if(data.msg === "success"){
          openChat(chatuser);
       }
    }
   }
 } catch (err) {
   console.log(err);
   logstate(notloged(false));
   navigate('/');
 }
  }

  const openChat = async (val) =>{
    try {
      setChatuser(val);
      const apiurl = "/user/conversation/list";
      const res = await fetch(apiurl,{method: 'POST',
      headers: { 
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({receiver: val})
    })
  
    const data = await res.json();
    if(data){
    if(data.msg === "Unauthorized: No token provided"){
      toast.error(data.msg);
      logstate(notloged(false));
      navigate('/');
    }else{
       setConversationlist(data.msg); 
    }
   }else{setConversationlist([])}
 } catch (err) {
   console.log(err);
   logstate(notloged(false));
   navigate('/');
 }
  }

    const fetchChat = async () =>{

      try {
           const apiurl = "/chat/list";
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
            setChatlist(data.msg); 
         }
        }else{ console.log("false"); setChatlist([])}
      } catch (err) {
        console.log(err);
        logstate(notloged(false));
        navigate('/');
      }
       
    };

  useEffect(()=>{
    fetchChat();
  },[])

  return (
    <>
      <section className='gradient-custom' style={{height: "100%", overflowY: "scroll"}}>
       <div className="container py-2">

          <div className="row">
            <div className="col-md-12">

              <div className="card mask-custom" id="chat3" style={{borderRadius: "15px", backgroundColor: "transparent", borderColor: "#80808036", boxShadow: "10px 10px 10px rgb(46 54 68 / 31%)"}}>
                <div className="card-body">

                  <div className="row">
                    <div className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0">

                      <div className="p-3 mask-custom">

                        <div className="input-group rounded mb-3">
                          <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search"
                            aria-describedby="search-addon"/>
                          <span className="input-group-text border-0" id="search-addon" style={{backgroundColor: "transparent"}}>
                            <i className="fas fa-search"></i>
                          </span>
                        </div>

                        <div data-mdb-perfect-scrollbar="true" style={{position: "relative", height: "400px"}}>
                          <ul className="list-unstyled mb-0">
                          {
                            chatlist.length>0 ? (<>
                              {
                                chatlist.map((ele)=>{
                                 return (<li type="button" role="button" value={ele.username} onClick={(e)=>{e.preventDefault(); openChat(ele.username)}} style={{padding: "5px 5px 0px 5px", borderBottom: "1px solid rgb(255 255 255 / 25%)", cursor: "pointer"}}>
                                    <div className="d-flex justify-content-between" style={{position: "relative",zIndex: "-1", marginBottom: "10px"}}>
                                      <div className="d-flex flex-row">
                                        <div>
                                          <img
                                            src={ele.profile}
                                            alt="avatar" className="d-flex align-self-center border rounded-circle me-3" width="50"/>
                                          {/* <span className="badge bg-success badge-dot"></span> */}
                                        </div>
                                        <div className="pt-1" style={{textAlign: "left"}}>
                                          <p className="fw-bold mb-0 chat-side-text" style={{textDecoration: "none !important"}}>{ele.username}</p>
                                          {/* <p className="small chat-side-text mt-2" style={{textDecoration: "none !important" , fontSize: "12px"}}>lorem ipsum</p> */}
                                        </div>
                                      </div>
                                      <div className="pt-1">
                                        <p className="small mb-1 chat-side-text" style={{textDecoration: "none !important"}}>2:30pm</p>
                                        {/* <span className="badge bg-danger rounded-pill text-center float-end" style={{padding: "4px 6px"}}>3</span> */}
                                      </div>
                                    </div>
                                  </li>)
                                })
                              }
                            </>) : (<div className='d-flex justify-content-center mt-3'><p>There is no Chat to display</p></div>)
                          }
                            
                          </ul>
                        </div>

                      </div>

                    </div>
                  
                    {chatlist.length>0 ?
                    (<>
                    { 
                      chatuser.length>0 ? (<>
                        <div className="col-md-6 col-lg-7 col-xl-8">
                        <div className="pt-3 pe-3" id="scrollbardiv" data-mdb-perfect-scrollbar="true" style={{position: "relative", height: "400px", overflowY : "scroll"}}>
                        {
                          conversationlist.length>0 ? (<>
                                {
                                  conversationlist.map((ele,index)=>{ 
                                    let date = new Date(ele.time);
                                    let hour = date.getHours();
                                    let ampm = hour>=12 ? "PM" : "AM";
                                    hour = hour>12 ? hour-12 : hour;
                                    let min = date.getMinutes();
                                    min = min < 10 ? "0"+min : min;
                                    let month = months[date.getMonth()];
                                    let day = date.getDate();
                                    let fulltime = hour + ":" + min+ " " +ampm + " | " + month +" "+day;
                                      if(ele.sender === curruser){
                                          return(<>{/* right chat */}
                                           <div className="d-flex flex-row justify-content-end">
                                             <div>
                                               <p className="small p-2 me-3 mb-1 text-white mask-custom side-arrow-div-right" style={{width: "85%",margin:"0px !important", float: "right"}}>{ele.message}</p>
                                               <p className="small me-3 mb-3 rounded-3 " style={{color: "black",float:"right"}}>{fulltime}</p>
                                             </div>
                                             {/* <img src={ele.senderprofile}
                                               alt="avatar 1" className='border rounded-circle me-3' style={{width: "45px", height: "100%"}}/> */}
                                           </div></>)
                                      }else{
                                          return(<>{/* left chat */}
                                          <div className="d-flex flex-row justify-content-start">
                                            {/* <img src={ele.senderprofile}
                                              alt="avatar 1" className='border rounded-circle me-3' style={{width: "45px", height: "100%"}}/> */}
                                            <div>
                                              <p className="small p-2 ms-3 mb-1 mask-custom side-arrow-div-left" style={{ width: "85%",color: "#fff",margin:"0px !important", float: "left"}}>{ele.message}</p>
                                              <p className="small ms-3 mb-3 rounded-3" style={{color: "black", float: "left"}}>{fulltime}</p>
                                            </div>
                                          </div></>)
                                      }
                                  })
                                }
                          </>) : (<>
                          <div className='d-flex justify-content-center text-center' style={{flexDirection: "column"}}>
                              <p style={{marginBottom: "10px"}}>No Messages here yet..</p>
                              <p style={{marginBottom: "none"}}>Start a chat now</p>
                          </div>
                          </>)
                        }
                      
                      </div>
                      
                      <div className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">
                      
                      <div class="form-outline form-white">
                      <form className='d-flex flex-row justify-content-end' onSubmit={SendMessage}>
                       <textarea class="form-control chat-message-box" id="textAreaExample3" rows="4" value={message} onChange={(e)=> setMessage(e.target.value)} style={{backgroundColor: "transparent", resize: "none"}} required></textarea>
                       <label class="form-label chat-message-label" htmlFor="textAreaExample3">Message</label>
                       <button type='submit' value="submit" className="ms-1" style={{backgroundColor: "transparent", border: "none"}}><i className="fas fa-paper-plane" style={{color: "#fff"}}></i></button>
                       </form>
                     </div>
                        <a className="ms-3" href="#!"><i className="fas fa-paperclip" style={{color: "#fff"}}></i></a>
                        <a className="ms-3" href="#!"><i className="fas fa-smile" style={{color: "#fff"}}></i></a>
                      </div>
                      </div>
                      </>) : (<><div className='col-md-6 col-lg-7 col-xl-8' style={{textAlign: "center",margin: "auto"}}><p style={{fontSize: "24px"}}>Select a conversation to start a chat</p></div></>)    
                    }
                    </>) : (<><div className="col-md-6 col-lg-7 col-xl-8" style={{textAlign: "center",margin: "auto"}}><p style={{fontSize: "24px"}}>Click<Link to="/search/user/cisdrUJnkcn355KHihdwp75oohYUiuxJoijwd76r46cdk" style={{color:"blue"}}> here </Link>to start a chat</p></div></>)
                  }
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

export default ChatMessage;

