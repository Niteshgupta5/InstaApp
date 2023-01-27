import React,{ useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { notloged } from './actions/Action.js';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const logstate = useDispatch();
    const navigate = useNavigate();
    const logout = async ()=>{
        try {
            const res = await fetch('http://localhost:3001/logout',{method: 'POST',
              headers: { 
                "Content-Type": "application/json"
              },
              credentials: "include"
            })
              
            logstate(notloged(false));
            navigate('/');
           }catch(err){
             console.log(err);
             logstate(notloged(false));
             navigate('/');
         }
    }
    useEffect(()=>{
       logout();
    },[]);

  return (
    <>logout</>
  )
}

export default Logout;