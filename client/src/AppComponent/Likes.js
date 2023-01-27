import React,{useState, useEffect} from 'react';
import { notloged } from './actions/Action.js';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Likes.css';
import { toast } from 'react-toastify';

function Likes() {
  const [likepostdata, setLikepostdata] = useState([]);
  const logstate = useDispatch();
  const navigate = useNavigate();

  const fetchLikePost = async () =>{

      try {
           const apiurl = "/liked/post";
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
           setLikepostdata(data.msg);
         }
      } catch (err) {
        console.log(err);
        logstate(notloged(false));
        navigate('/');
      }
       
    };

  useEffect(()=>{
    fetchLikePost();
  },[]);

  return (
    <>
      <div className="like-container" style={{minHeight: "100vh"}}>
        <div className='like-gallery'>
        {
          likepostdata.length>0 ? (<>
            {
              likepostdata.map((ele,index)=>{
                return (<>
                    <img src={ele.media} alt='' key={index} style={{cursor: "pointer"}}/>
                </>)
              })
            }
          </>) : (<div className='d-flex justify-content-center mt-3'><p>There is no post to display</p></div>)
        }
        </div>
      </div>
    </>
  )
}

export default Likes;
