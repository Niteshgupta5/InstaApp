import React, { useEffect, useState} from 'react'
import ReadMore from './ReadMore.js';
import {useSelector, useDispatch } from 'react-redux';
import { notloged } from './actions/Action.js';
import CurrUserStatus from '../reducer/CheckUserStatus.js';
import CurrUserProfile from '../reducer/CheckUserProfile.js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


function LatestPost() {
  const curruser = useSelector((state)=> state.CurrUserStatus);
  const currprofile = useSelector((state)=> state.CurrUserProfile);
  const [postdata, setPostdata] = useState([]);
  const [flaged, setFlaged] = useState(false);
  const [comment, setComment] = useState("");
  const logstate = useDispatch();
  const navigate = useNavigate();

  const HandleComment = async (e) =>{
    try {
       e.preventDefault();
       const id = e.target.value;
       const res = await fetch("/post/comment",{method: 'POST',
        headers: { 
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({id : id, comment : comment})
      })

      const data = await res.json();
      if(data.msg === "Unauthorized: No token provided"){
       toast.error(data.msg);
       logstate(notloged(false));
       navigate('/');
     }else{
        setComment("");
        setFlaged(!flaged);
     }

    } catch (err) {
       console.log(err);
       logstate(notloged(false));
       navigate('/');
    }
 }

  const HandleDeletePost = async (e) =>{
    try {
       e.preventDefault();
       const id = e.target.value;
       const res = await fetch("/post/delete",{method: 'POST',
        headers: { 
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({id : id})
      })

      const data = await res.json();
      if(data.msg === "Unauthorized: No token provided"){
       toast.error(data.msg);
       logstate(notloged(false));
       navigate('/');
     }else{
          if (data.msg === "Unsuccess") {
              toast.error("You are not allowed to delete the post");
          } else {
            setFlaged(!flaged);
          }
     }

    } catch (err) {
       console.log(err);
       logstate(notloged(false));
       navigate('/');
    }
 }


  const HandleUnLike = async (e) =>{
    try {
       e.preventDefault();
       const id = e.target.value;
       const res = await fetch("/post/unlike",{method: 'POST',
        headers: { 
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({id : id})
      })

      const data = await res.json();
      if(data.msg === "Unauthorized: No token provided"){
       toast.error(data.msg);
       logstate(notloged(false));
       navigate('/');
     }else{
         setFlaged(!flaged);
     }

    } catch (err) {
       console.log(err);
       logstate(notloged(false));
       navigate('/');
    }
 }

  const HandleLike = async (e) =>{
     try {
        e.preventDefault();
        const id = e.target.value;
        const res = await fetch("/post/like",{method: 'POST',
         headers: { 
           Accept: "application/json",
           "Content-Type": "application/json"
         },
         credentials: "include",
         body: JSON.stringify({id : id})
       })

       const data = await res.json();
       if(data.msg === "Unauthorized: No token provided"){
        toast.error(data.msg);
        logstate(notloged(false));
        navigate('/');
      }else{
        setFlaged(!flaged);
      }

     } catch (err) {
        console.log(err);
        logstate(notloged(false));
        navigate('/');
     }
  }

  const fetchPosts = async () =>{
    try {
         const apiurl = "/latest/posts";
         const res = await fetch(apiurl,{method: 'POST',
         headers: { 
           Accept: "application/json",
           "Content-Type": "application/json"
         },
         credentials: "include"
       })
     
       const data = await res.json();
       if(data.msg === "Unauthorized: No token provided"){
        toast.error(data.msg);
         logstate(notloged(false));
         navigate('/');
       }else{
         setPostdata(data.msg);
       }
  } catch (err) {
       console.log(err);
       logstate(notloged(false));
       navigate('/');
 }
};

  useEffect(()=>{
    fetchPosts();
  },[flaged])
 
  return (
    <>
    {
      postdata.length>0 ? (<>
        {
          postdata.map((ele,index)=>{
            const currtime = Date.now();
            var liked = false;
            var time = Math.floor((((currtime - ele.time)/1000)/60));
            if(time<60){
              time = time +" m";
            }else{
              time = Math.floor(time/60);
              if(time<24){
                  time = time + " h";
                }else{
                  time = Math.floor(time/24);
                  time = time + " d";
                }
            }
            for(let x of ele.likedby){
              if(x.username === curruser){
                liked = true;
                break;
              }
            }
            return (<section key={ele._id}>
          <div className="card post-card" style={{maxWidth: "35rem"}}>
            <div className="card-body" style={{padding: "10px 10px 0px 15px"}}>
              <div className="d-flex mb-2">
                <a href="#!">
                  <img src={ele.userprofile} class="border rounded-circle me-2"
                    alt="Avatar" style={{height: "40px"}} />
                </a>
                <div>
                  <a href="#!" className="text-dark mb-0 post-profile-name">
                    <strong>{ele.postedby}</strong>
                  </a>
                  <a href="#!" className="text-muted d-block post-profile-name" style={{marginTop: "-6px"}}>
                    <small>{time}</small>
                  </a>
                </div>
                <div style={{marginLeft: "auto"}}>
                <li className="nav-item me-3 me-lg-0 dropdown postdeletemarker" data-toggle="tooltip" data-placement="bottom" title="Delete" >
                  <a className="nav-link dropdown-toggle postdeleteoption" href="#!" id="navbarDropdown1" role="button" data-mdb-toggle="dropdown"
                    aria-expanded="false" style={{display: "inline-block"}}>
                    <i className="fa fa-ellipsis-v" style={{color: "black"}}></i>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown1">
                    <li data-toggle="tooltip" data-placement="bottom" title="Delete Post" role="button" value={ele._id}>
                      <button className="dropdown-item" value={ele._id} onClick={HandleDeletePost} style={{color: "red"}}><i className="fa fa-trash" style={{color: "red"}}></i> Delete</button>
                    </li>
                  </ul>
                </li>
                </div>
              </div>
            </div>
            <div className="bg-image hover-overlay ripple rounded-0" data-mdb-ripple-color="light">
              <img src={ele.media} class="w-100" alt="post" style={{objectFit: "cover"}}/>
              <a href="#!">
                <div className="mask" style={{backgroundColor: "rgb(251 251 251 / 10%)"}}></div>
              </a>
            </div>
            <div className="card-body" style={{paddingTop: "0px"}}>

              <div className="d-flex text-center">
                
                {
                  liked ? (<>
                  <button type="button" class="btn btn-link btn-lg" value={ele._id} data-mdb-ripple-color="dark" onClick={HandleUnLike} style={{color: "black"}}>
                  <i className="fas fa-heart" style={{color: "rgb(253, 29, 29)", fontSize: "16px"}}></i>&nbsp;{ele.likes}</button>
                  </>) : (<>
                  <button type="button" class="btn btn-link btn-lg" value={ele._id} data-mdb-ripple-color="dark" onClick={HandleLike} style={{color: "black"}}>
                  <i className="far fa-heart me-2" style={{color: "black", fontSize: "16px"}}></i>&nbsp;{ele.likes}</button>
                  </>)
                }

                <button type="button" class="btn btn-link btn-lg" data-mdb-ripple-color="dark" style={{color: "black"}}>
                  <i className="far fa-comment me-2" style={{color: "black", fontSize: "16px"}}></i> {ele.comments}
                </button>
                <button type="button" class="btn btn-link btn-lg" value={ele._id} data-mdb-ripple-color="dark">
                  <i className="fa fa-share me-2" style={{color: "black", fontSize: "16px"}}></i>
                </button>
                <button type="button" class="btn btn-link btn-lg" data-mdb-ripple-color="dark" style={{marginLeft: "auto"}}>
                  <i className="fa fa-bookmark-o me-2" style={{color: "black", fontSize: "16px"}}></i>
                </button>
              </div>
              <div>
              <ReadMore>
                {ele.desc}
              </ReadMore>                
              </div>
              <div className="d-flex mb-3">
                <a href="#!">
                  <img src={currprofile} class="border rounded-circle me-2"
                    alt="Avatar" style={{height: "40px"}} />
                </a>
                <form className="form-outline w-100 d-flex">
                <div style={{marginRight:"auto",width: "100%"}}>
                  <textarea className="form-control latest-post-textarea" id="textAreaExample" rows="2" value={comment} onChange={(e)=> setComment(e.target.value)} required></textarea>
                  <label className="form-label latest-post-label" htmlFor="textAreaExample" >Write a comment</label>
                </div>
                  <span style={{float: "right"}}><button type="submit" class="btn btn-link btn-lg mt-3" value={ele._id} onClick={HandleComment} data-mdb-ripple-color="dark" style={{marginLeft: "auto"}}>
                  <i className="far fa-paper-plane" style={{color: "black", fontSize: "medium"}}></i>
                  </button></span>
                </form>
              </div>
              {
                ele.comments>0 ? (<>
                  {
                     ele.commentlist.map((x)=>{
                      return (<div className="d-flex mb-3">
                        <a href="#!">
                          <img src={x.commenterprofile} className="border rounded-circle me-2"
                            alt="Avatar" style={{height: "40px"}}/>
                        </a>
                        <div style={{width: "-webkit-fill-available"}}>
                          <div className="bg-light rounded-3 px-3 py-1">
                            <a href="#!" className="text-dark mb-0 people-comment">
                              <strong style={{fontSize: "14px"}}>{x.commentby}</strong>
                            </a>
                            <ReadMore>
                                {x.comment}
                            </ReadMore>
                          </div>
                        </div>
                      </div>)
                     })
                  }
                </>) : ("")
              }
              
            </div>
          </div>
        </section>)
          })
        }
      </>) : (<div className='d-flex justify-content-center mt-3'><p>There is no post to display</p></div>)
    }
       
    </>
  )
}

export default LatestPost;
