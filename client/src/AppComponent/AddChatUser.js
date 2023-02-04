import React from 'react';
import { useState} from 'react';
import './AddChatUser.css'
import FollowersList from './FollowersList.js';
import FollowingList from './FollowingList.js';

function AddChatUser() {
    const [flag, setFlag] = useState(true);
    
  return (
    <>
        <ul className='d-flex justify-content-center addchatuser'>
            <li className='d-inline-block m-auto' onClick={()=> setFlag(false)}>Followers</li>
            <li className='d-inline-block m-auto active' onClick={()=> setFlag(true)}>Followings</li>
        </ul>
      {
        flag ? <FollowingList/> : <FollowersList/>
      }
    </>
  )
}

export default AddChatUser;
