import React, { useState} from 'react';
import './EditComponent.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch , useSelector} from 'react-redux';
import { notloged } from './actions/Action.js';
import CurrUserStatus from '../reducer/CheckUserStatus.js';
import { currentprofile } from './actions/Action.js';
import { toast } from 'react-toastify';

function EditComponent() {
  const curruser = useSelector((state)=> state.CurrUserStatus);
  const [file, setFile] = useState(null);
  const [media, setMedia] = useState("");
  const [city, setCity] = useState("");
  const [about, setAbout] = useState("");
  const logstate = useDispatch();
  const navigate = useNavigate();
  const currimg = useDispatch();

  const handleImage = ()=>{
    if (file === null) {
      return
    } else {
      const data = new FormData()
    data.append('file', file)
    data.append('upload_preset', 'instaapp')
    data.append('cloud_name', 'djychaq75')

    fetch("https://api.cloudinary.com/v1_1/djychaq75/image/upload",{
      method: "POST",
      body: data
    }).then((res)=> res.json())
    .then((data)=> {
      setMedia(data.url);
      return;
    }).catch(err => console.log(err));
    }
  }


  const HandleEditProfile = async (e) =>{
    try {
       e.preventDefault();
       if(media === ""){
          handleImage();
        }
       if(!media){
        toast.warn("please include all feilds")
        
       } else {
        const res = await fetch("/edit/profile",{method: 'POST',
        headers: { 
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({media: media, city: city, about: about})
        })

        const data = await res.json();
        if(data.msg === "Unauthorized: No token provided"){
         toast.error(data.msg);
         logstate(notloged(false));
         navigate('/');
       }else{
        toast.success("Profile Updated Successfully")
          currimg(currentprofile(media));
          setFile(null);
          setCity("");
          setAbout("");
          setMedia("");
          navigate('/api/Gsjku/profilr/7nbs892nxkwFISvywuh7289NKnixTVGbCRu9385');
        }     
      }
       
    } catch (err) {
       console.log(err);
       logstate(notloged(false));
       navigate('/');
    }
 }

  return (
    <>
      <div className="edit-comp">
      	<div className="center">
      		<form className='editform' onSubmit={HandleEditProfile}>
          <div className="form-outline mb-4" style={{borderRadius: "50%", marginTop: "-40px"}}>
           <img src='/assets/images/profilepic.webp' alt='' style={{borderRadius: "50%", border: "6px solid #f8f9fa"}} width="40%"/>
         </div>
          <div className="form-outline mb-4">
           <input type="file" id="form3Example3" style={{color: "rgb(79 129 210)"}} onChange={(e)=>{setFile(e.target.files[0])}} required/>
         </div>
         <div className="form-outline mb-4">
           <input type="text" id="form3Example4" className='form-control' value={city} onChange={(e)=>{setCity(e.target.value)}} style={{boxShadow:  "2px 2px 4px 0px rgb(214 199 199)"}} required/>
           <label className="form-label" style={{color: "#00000091", fontSize: "14px"}}>City</label>
         </div>
         <div className="form-outline mb-4">
           <textarea id="form3Example5" rows="4" className="form-control" value={about} onChange={(e)=>{setAbout(e.target.value)}} style={{boxShadow:  "2px 2px 4px 0px rgb(214 199 199)", resize: "none"}} required></textarea>
           <label className="form-label" style={{color: "#00000091", fontSize: "14px"}}>About</label>
         </div>
         <button type="submit" value="submit" className="btn btn-primary btn-block mb-4">
           Submit
         </button>
          </form>
      	</div>
      </div>
    </>
  )
}

export default EditComponent;
