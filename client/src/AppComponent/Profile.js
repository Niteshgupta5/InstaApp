import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import CurrUserStatus from '../reducer/CheckUserStatus.js';
import { notloged } from './actions/Action.js';
import { useNavigate, Link} from 'react-router-dom';


function Profile() {
  const curruser = useSelector((state)=> state.CurrUserStatus);
  const logstate = useDispatch();
  const navigate = useNavigate();
  const [profiledetail, setProfiledetail] = useState({});
  const [postdetail, setPostdetail] = useState([]);

    const fetchProfile = async () =>{

      try {
           const apiurl = "/profile";
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
            setProfiledetail(data.msg.data);
            if(data.msg.post){
              setPostdetail(data.msg.post); 
            }

         }
        }else{ console.log("false"); setProfiledetail({}); setPostdetail([])}
      } catch (err) {
        console.log(err);
        logstate(notloged(false));
        navigate('/');
      }
       
    };

  useEffect(()=>{
    fetchProfile();
  },[])

  return (
    <>
        <section class="h-100 gradient-custom-2">
          <div class="container py-3 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
              <div class="col col-lg-9 col-xl-7">
                <div class="card">
                  <div class="rounded-top text-white d-flex flex-row" style={{backgroundColor: "#0a58ca", height:"200px"}}>
                    <div class="ms-4 mt-5 d-flex flex-column" style={{width: "150px"}}>
                      <img src={profiledetail.profile}
                        alt="" class="img-fluid img-thumbnail mt-4 mb-2"
                        style={{width: "150px", zIndex: "1"}}/>
                      <Link to="/edit/HGxdvh54/profile/cjnuw287dbhiTFrxdsnbhYgfnknGYG388" type="button" class="btn btn-outline-dark" data-mdb-ripple-color="dark"
                        style={{zIndex: "1"}}>
                        Edit profile
                      </Link>
                    </div>
                    <div class="ms-3" style={{marginTop: "130px"}}>
                      <h5>{curruser}</h5>
                      <p>{profiledetail.city}</p>
                    </div>
                  </div>
                  <div class="p-4 text-black" style={{backgroundColor: "#f8f9fa"}}>
                    <div class="d-flex justify-content-end text-center py-1 profile-follow-sec">
                      <div>
                        <p class="mb-1 h5">{profiledetail.totalpost}</p>
                        <p class="small text-muted mb-0">Posts</p>
                      </div>
                      <div class="px-3">
                        <p class="mb-1 h5">{profiledetail.totalfollowers}</p>
                        <p class="small text-muted mb-0">Followers</p>
                      </div>
                      <div>
                        <p class="mb-1 h5">{profiledetail.totalfollowing}</p>
                        <p class="small text-muted mb-0">Following</p>
                      </div>
                    </div>
                  </div>
                  <div class="card-body p-4 text-black">
                    <div class="mb-5">
                      <p class="lead fw-normal mb-1">About</p>
                      <div class="p-4" style={{backgroundColor: "#f8f9fa"}}>
                        <p class="font-italic mb-1">{profiledetail.about}</p>
                      </div>
                    </div>
                    <div class="d-flex justify-content-between align-items-center mb-4">
                      <p class="lead fw-normal mb-0">Recent Posts</p>
                      {/* <p class="mb-0"><a href="#!" class="text-muted">Show all</a></p> */}
                    </div>
                    <div className="like-container">
                    <div className='like-gallery'>
                       {
                        postdetail.length>0 ? (<>
                          {
                            postdetail.map((ele)=>{
                              return <img src={ele.media} alt='' key={ele.time} style={{cursor: "pointer"}}/>
                            })
                          }
                        </>) : (<div className='d-flex justify-content-center mt-3'><p>There is no post to display</p></div>)
                      }
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

export default Profile;
