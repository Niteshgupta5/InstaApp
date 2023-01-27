import React, {useState}from 'react';
import { useDispatch } from 'react-redux';
import { notloged } from './actions/Action.js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


function CreatePost() {
  const [image, setImage] = useState(null);
  const [media, setMedia] = useState("");
  const [desc, setDesc] = useState("");
  const logstate = useDispatch();
  const navigate = useNavigate();

  const handleClick = ()=>{
    const data = new FormData()
    data.append('file', image)
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

  const createposts = async (e) =>{
    try {
        e.preventDefault();
        handleClick();
        if(!media && !desc){
          toast.warn("please fill all data");
          return;
        }
         const apiurl = "http://localhost:3001/create/post";
         const res = await fetch(apiurl,{method: 'POST',
         headers: { 
           Accept: "application/json",
           "Content-Type": "application/json"
         },
         credentials: "include",
         body: JSON.stringify({media: media, desc: desc})
       })
     
       const data = await res.json();
       if(data.msg === "Unauthorized: No token provided"){
         toast.error(data.msg);
         logstate(notloged(false));
         navigate('/');
       }else{
         toast.success("post created successfully");
         setMedia("");
         setDesc("");
         setImage(null);
       }
  } catch (err) {
       console.log(err);
       logstate(notloged(false));
       navigate('/');
 }
};

  
  return (
    <>
    <div className="edit-comp">
    <div className="center" style={{height:"420px !important"}}>
    
      <form onSubmit={createposts} name="postform" style={{width: "100%"}}>
      <div>
      <div className='mt-4 d-flex justify-content-center'>
        <div class="mb-4 d-flex justify-content-center upload-file-option">
           <i class="fas fa-cloud-arrow-up p-1" style={{fontSize: "24px", color: "#999797"}}></i> 
           {image? <p>{image.name}</p> : <p>Upload Image/Video</p>}
        </div>
      </div>
      <div class="d-flex justify-content-center">
        <div class="btn btn-primary btn-rounded">
            <label class="form-label text-white m-1" htmlFor='customFile1' style={{fontSize: "smaller"}}>Choose file</label>
            <input type="file" class="form-control d-none" id="customFile1" onChange={(e)=>{setImage(e.target.files[0])}} required/>
        </div>
      </div>
      
     
      <div class="form-outline mb-3 mt-4">
        <textarea class="form-control" id="form4Example3" rows="4" style={{backgroundColor: "rgb(46 47 49 / 6%)"}} value={desc} onChange={(e)=>{setDesc(e.target.value)}} required></textarea>
        <label class="form-label" htmlFor='form4Example3'>Description</label>
      </div>

      <button type="submit" value="submit" class="btn btn-primary btn-block mb-4">POST</button>
      </div>
      </form>
    </div>
    </div>
    </>
  )
}

export default CreatePost;
