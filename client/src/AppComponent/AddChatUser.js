import React from 'react';
import { useState} from 'react';
import './AddChatUser.css'
import FollowersList from './FollowersList.js';
import FollowingList from './FollowingList.js';

function AddChatUser() {
    const [flag, setFlag] = useState(true);
    const ToggleActive = (toggle)=>{

        var x = document.getElementById('active-list-1');
        var y = document.getElementById('active-list-2');
        if(toggle){
            if(x.classList.contains('active')){
                x.classList.remove('active');
            }
            if(!y.classList.contains('active')){
                y.classList.add('active');
            }
        }else{
            if(!x.classList.contains('active')){
                x.classList.add('active');
            }
            if(y.classList.contains('active')){
                y.classList.remove('active');
            }
        }      
    }
    
  return (
    <>
        <ul className='d-flex justify-content-center addchatuser'>
            <li className='d-inline-block m-auto' id='active-list-1' onClick={()=>{setFlag(false); ToggleActive(false);}}>Followers</li>
            <li className='d-inline-block m-auto active' id='active-list-2' onClick={()=>{setFlag(true); ToggleActive(true);}}>Followings</li>
        </ul>
      {
        flag ? <FollowingList/> : <FollowersList/>
      }
    </>
  )
}

export default AddChatUser;
