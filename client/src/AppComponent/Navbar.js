import React,{useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import CurrUserProfile from '../reducer/CheckUserProfile.js';
import { useSelector, useDispatch} from 'react-redux';
import { currsearch, notloged, currentprofile} from './actions/Action.js';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  const currprofile = useSelector((state)=> state.CurrUserProfile);
  const [search, setSearch] = useState("");
  const searchdata = useDispatch();
  const navigate = useNavigate();
  const logstate = useDispatch();
  const profileuser = useDispatch();

  const HandleSearch = (e)=>{
      e.preventDefault();
      setSearch(e.target.value);
  }
  const HandleSearchData = (e)=>{
    e.preventDefault();
    searchdata(currsearch(search));
}

const fetchUserProfile = async ()=>{
    try {
         const apiurl = "/fetch/profile";
         const res = await fetch(apiurl,{method: 'POST',
         headers: { 
           Accept: "application/json",
           "Content-Type": "application/json"
         },
         credentials: "include"
       })
     
       const data = await res.json();
       if(data.msg === "Unauthorized: No token provided"){
         alert(data.msg);
         logstate(notloged(false));
         navigate('/');
       }else{
         profileuser(currentprofile(data.msg));
       }
    } catch (err) {
      console.log(err);
      logstate(notloged(false));
      navigate('/');
    }
}

useEffect(()=>{
  fetchUserProfile();
},[])

  return (
    <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand">
            <i className="fas fa-cubes fa-2x me-3" style={{color: "rgb(104 156 240)"}}></i> Insta App
            </Link>
            <button className="navbar-toggler" type="button" data-mdb-toggle="collapse"
              data-mdb-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
              aria-label="Toggle navigation">
              <i className="fas fa-bars"></i>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <form onSubmit={HandleSearchData} className="me-3">
                <div className="form-white input-group" style={{width: "250px"}}>
                  <Link to="/search/user/cisdrUJnkcn355KHihdwp75oohYUiuxJoijwd76r46cdk"><input type="search" value={search} onChange={HandleSearch} className="form-control rounded" placeholder=" Search here.."
                    aria-label="Search" aria-describedby="search-addon"/></Link>
                </div>
              </form>
              <ul className="navbar-nav d-flex flex-row ms-auto me-3">
              <li className="nav-item me-3 me-lg-0 dropdown" data-toggle="tooltip" data-placement="bottom" title="Home">
                  <Link className="nav-link " to="/" id="navbarDropdown"
                    aria-expanded="false">
                   <i className="fas fa-house" style={{fontSize: "21px"}}></i>
                  </Link>
                </li>
                <li className="nav-item me-3 me-lg-0 dropdown" data-toggle="tooltip" data-placement="bottom" title="Chats">
                  <Link className="nav-link " to="/eodneddxc/api/message/ioopqihrnmncpowejnop243jsiqjl14vghywtsjyuor" id="navbarDropdown"
                    aria-expanded="false">
                   <i className="fas fa-paper-plane" style={{fontSize: "21px"}}></i>
                   <span className="badge rounded-pill badge-notification bg-danger">1</span>
                  </Link>
                </li>
                <li className="nav-item me-3 me-lg-0 dropdown" data-toggle="tooltip" data-placement="bottom" title="Create Post">
                  <Link className="nav-link" to="/api/post/239fdnuiw9jHGF8923JKBMhbnjxssnxA5" id="navbarDropdown"
                    aria-expanded="false">
                    <i className="fas fa-square-plus" style={{fontSize: "21px"}}></i>
                  </Link>
                </li>
                <li className="nav-item me-3 me-lg-0 dropdown" data-toggle="tooltip" data-placement="bottom" title="Likes">
                  <Link className="nav-link" to="/api/likes/14jhixowjghixdme43moceceifkqhg99xncbvbxnm" id="navbarDropdown"
                    aria-expanded="false">
                    <i className="fas fa-heart" style={{fontSize: "21px"}}></i>
                  </Link>
                </li>
                <li className="nav-item me-3 me-lg-0 dropdown" data-toggle="tooltip" data-placement="bottom" title="Profile">
                  <a className="nav-link dropdown-toggle" href="#!" id="navbarDropdown1" role="button" data-mdb-toggle="dropdown"
                    aria-expanded="false">
                    <img src={currprofile} className="rounded-circle" height="30"
                      alt="profilepic" loading="lazy" />
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown1">
                    <li data-toggle="tooltip" data-placement="bottom" title="Profile"><Link className="dropdown-item" to="/api/Gsjku/profilr/7nbs892nxkwFISvywuh7289NKnixTVGbCRu9385">Profile</Link></li>
                    <li data-toggle="tooltip" data-placement="bottom" title="Settings"><Link className="dropdown-item" to="#!">Settings</Link></li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li data-toggle="tooltip" data-placement="bottom" title="Logout">
                      <Link className="dropdown-item" to="/logout">Logout</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
    </>
  )
}

export default Navbar
//{} []