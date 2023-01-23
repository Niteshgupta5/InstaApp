import React, { useState, useEffect } from 'react';
import './ChatMessage.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { notloged } from './actions/Action.js';

function ChatMessage() {
  const logstate = useDispatch();
  const navigate = useNavigate();
  const [chatlist, setChatlist] = useState([]);

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
           alert(data.msg);
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
      <section className='gradient-custom'>
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
                                 return (<li style={{padding: "5px 5px 0px 5px", borderBottom: "1px solid rgb(255 255 255 / 25%)"}}>
                                    <div className="d-flex justify-content-between">
                                      <div className="d-flex flex-row">
                                        <div>
                                          <img
                                            src={ele.profile}
                                            alt="avatar" className="d-flex align-self-center border rounded-circle me-3" width="50"/>
                                          {/* <span className="badge bg-success badge-dot"></span> */}
                                        </div>
                                        <div className="pt-1">
                                          <p className="fw-bold mb-0 chat-side-text" style={{textDecoration: "none !important"}}>{ele.username}</p>
                                          <p className="small chat-side-text mt-2" style={{textDecoration: "none !important" , fontSize: "12px"}}>lorem ipsum</p>
                                        </div>
                                      </div>
                                      <div className="pt-1">
                                        <p className="small mb-1 chat-side-text" style={{textDecoration: "none !important"}}>2:30pm</p>
                                        <span className="badge bg-danger rounded-pill text-center float-end" style={{padding: "4px 6px"}}>3</span>
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

                    <div className="col-md-6 col-lg-7 col-xl-8">

                      <div className="pt-3 pe-3" data-mdb-perfect-scrollbar="true"
                        style={{position: "relative", height: "400px", overflowY : "scroll"}}>
                      {/* left chat */}
                        <div className="d-flex flex-row justify-content-start">
                          <img src="https://mdbootstrap.com/img/Photos/Avatars/img (31).jpg"
                            alt="avatar 1" className='border rounded-circle me-3' style={{width: "45px", height: "100%"}}/>
                          <div>
                            <p className="small p-2 ms-3 mb-1 rounded-3 mask-custom" style={{ width: "85%",color: "#fff"}}>Lorem ipsum
                              dolor
                              sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                              dolore
                              magna aliqua.</p>
                            <p className="small ms-3 mb-3 rounded-3 float-end" style={{color: "black"}}>12:00 PM | Aug 13</p>
                          </div>
                        </div>
                      {/* right chat */}
                        <div className="d-flex flex-row justify-content-end">
                          <div>
                            <p className="small p-2 me-3 mb-1 text-white rounded-3 mask-custom" style={{width: "85%"}}>Nemo enim ipsam
                              voluptatem quia
                              voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
                              qui
                              ratione voluptatem sequi nesciunt.</p>
                            <p className="small me-3 mb-3 rounded-3 " style={{color: "black"}}>12:00 PM | Aug 13</p>
                          </div>
                          <img src="https://mdbootstrap.com/img/Photos/Avatars/img (31).jpg"
                            alt="avatar 1" className='border rounded-circle me-3' style={{width: "45px", height: "100%"}}/>
                        </div>

                      </div>
                      
                      <div className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">
                      
                      <div class="form-outline form-white">
                      <form className='d-flex flex-row justify-content-end'>
                       <textarea class="form-control chat-message-box" id="textAreaExample3" rows="4" style={{backgroundColor: "transparent", resize: "none"}} required></textarea>
                       <label class="form-label chat-message-label" htmlFor="textAreaExample3">Message</label>
                       <button type='submit' value="submit" className="ms-1" style={{backgroundColor: "transparent", border: "none"}}><i className="fas fa-paper-plane" style={{color: "#fff"}}></i></button>
                       </form>
                     </div>
                        <a className="ms-3" href="#!"><i className="fas fa-paperclip" style={{color: "#fff"}}></i></a>
                        <a className="ms-3" href="#!"><i className="fas fa-smile" style={{color: "#fff"}}></i></a>
                      </div>
                     
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

export default ChatMessage;

