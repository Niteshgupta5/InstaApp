import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { notloged, currsearch} from './actions/Action.js';
import SearchData from '../reducer/SearchData.js'

function FollowPage() {
    const curresearch = useSelector((state)=> state.SearchData);
    const [userdata, setUserdata] = useState([]);
    const [temp , setTemp] = useState(false);
    const logstate = useDispatch();
    const searchclear = useDispatch();
    const navigate = useNavigate();

    const HandleFollow = async (e) =>{
      try {
        e.preventDefault();
        let temp = e.target.value;  
        const res = await fetch("/follow/person",{method: 'POST',
        headers: { 
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({username : temp})      
        });
        const data = await res.json();
        if(data){
          setTemp(!temp);
        }  

      } catch (err) {
        console.log(err);
      }

    }

    const HandleUnFollow = async (e) =>{
      try {
        e.preventDefault();
        let temp = e.target.value;  
        const res = await fetch("/unfollow/person",{method: 'POST',
        headers: { 
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({username : temp})      
        });
        const data = await res.json();
        if(data){
          setTemp(!temp);
        }  

      } catch (err) {
        console.log(err);
      }

    }
  
    const fetchUsers = async () =>{
      try {
           const apiurl = "/fetch/search";
           const res = await fetch(apiurl,{method: 'POST',
           headers: { 
             Accept: "application/json",
             "Content-Type": "application/json"
           },
           credentials: "include",
           body: JSON.stringify({currsearch: curresearch})
         })
       
         const data = await res.json();
         if(data.msg === "Unauthorized: No token provided"){
           alert(data.msg);
           logstate(notloged(false));
           navigate('/');
         }else{
           setUserdata(data.msg);
          //  searchclear(currsearch(""));
         }
    } catch (err) {
         console.log(err);
         logstate(notloged(false));
         navigate('/');
   }
  };
  
useEffect(()=>{
      fetchUsers();
},[curresearch,temp]);

  return (
    <>
      <div className="container mt-5">
        <div className="d-flex justify-content-center row">
            <div className="col-md-6">
                <div className="p-3 bg-white text-center">
                    <div><img src="/assets/images/logo.png" alt=""/>
                        <h1>Insta Souls</h1>
                    </div>
                    <p>Follow some beautiful soul who&nbsp;<br/>have some interests like you!<br/><br/></p>
                    {
                      userdata.length>0 ? (<>{
                                userdata.map((ele)=>{
                                  return(<>
                                    <div className="d-flex flex-row justify-content-between align-items-center mb-3" key={ele.username}>
                                    <div className="d-flex flex-row align-items-center"><img className="rounded-circle" src={ele.profile} width="55" alt=""/>
                                    <div className="d-flex flex-column align-items-start ml-2" style={{marginLeft: "10px"}}><span className="font-weight-bold">{ele.username}</span><span className="followers" style={{fontSize: "12px"}}>{ele.followers} Followers</span></div>
                                   </div>
                                   <div className="d-flex flex-row align-items-center mt-2">
                                   {
                                    ele.flag ? <button className="btn btn-primary btn-sm" type="button" value={ele.username} onClick={HandleUnFollow}>Un Follow</button> : <button className="btn btn-outline-primary btn-sm" type="button" value={ele.username} onClick={HandleFollow}>Follow</button>
                                   }
                                   </div>
                                  </div></>
                                  )
                                })
                      }</>) : (<div>No Search Result</div>)
                    }
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default FollowPage;
