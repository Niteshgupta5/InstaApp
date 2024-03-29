import './App.css';
import { Route, Routes} from 'react-router-dom';
import Login from './AppComponent/Login.js';
import SignUp from './AppComponent/SignUp.js';
import SecondaryNavbar from './AppComponent/SecondaryNavbar.js';
import { useSelector} from 'react-redux';
import Navbar from './AppComponent/Navbar.js';
import ChatMessage from './AppComponent/ChatMessage.js';
import { useEffect} from 'react';
import LatestPost from './AppComponent/LatestPost.js';
import CreatePost from './AppComponent/CreatePost.js';
import Likes from './AppComponent/Likes.js';
import Profile from './AppComponent/Profile.js';
import Logout from './AppComponent/Logout.js';
import FollowPage from './AppComponent/FollowPage.js';
import EditComponent from './AppComponent/EditComponent.js';
import ForgetPassword from './AppComponent/ForgetPassword.js';
import ErrorPage from './AppComponent/ErrorPage.js';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FollowersList from './AppComponent/FollowersList.js';
import FollowingList from './AppComponent/FollowingList.js';
import AddChatUser from './AppComponent/AddChatUser.js';


function App() {
  const mystate = useSelector((state)=> state.ChangeLoginStatus);

  useEffect(()=>{
    console.log("state changed");
  },[])

  return (
    <>
    <div id='main-div'>
    {
      mystate ? (<>
              <Navbar/>
              <Routes>
              <Route path='/' element={<LatestPost/>}></Route>
              <Route path='/eodneddxc/api/message/ioopqihrnmncpowejnop243jsiqjl14vghywtsjyuor' element={<ChatMessage/>}></Route>
              <Route path='/api/post/239fdnuiw9jHGF8923JKBMhbnjxssnxA5' element={<CreatePost/>}></Route>
              <Route path='/api/likes/14jhixowjghixdme43moceceifkqhg99xncbvbxnm' element={<Likes/>}></Route>
              <Route path='/api/Gsjku/profilr/7nbs892nxkwFISvywuh7289NKnixTVGbCRu9385' element={<Profile/>}></Route>
              <Route path='/search/user/cisdrUJnkcn355KHihdwp75oohYUiuxJoijwd76r46cdk' element={<FollowPage/>}></Route>
              <Route path='/edit/HGxdvh54/profile/cjnuw287dbhiTFrxdsnbhYgfnknGYG388' element={<EditComponent/>}></Route>
              <Route path='/see/list/followers/UHSunkw7368sbnkBqoiKHdu823jkonxd4uhH' element={<FollowersList/>}></Route>
              <Route path='/see/list/following/B6CXDFS388BJGsm0i2cn8hehlkaLIUdfe7fd' element={<FollowingList/>}></Route>
              <Route path='/follower/xnjh7GK/following/jHxh4nkNmn9f6jn0jHNBuhkVGjkj267sbJVcc' element={<AddChatUser/>}></Route>
              <Route path='/logout' element={<Logout/>}></Route>
              <Route path='*' element={<ErrorPage/>}></Route>
              </Routes>
      </>) : (<>
          <SecondaryNavbar/>
           <Routes>
            <Route path='/' element={<Login/>}></Route>
            <Route path='/BUjxjw224/api/sign/up/iopwqbndinHUYRhs238490VGTuheokwjbUiG' element={<SignUp/>}></Route>
            <Route path='/forget/password/xzb73jadbYF675YTfsqu74bjHGBgykjaio74' element={<ForgetPassword/>}></Route>
            <Route path='*' element={<ErrorPage/>}></Route>
          </Routes>
      </>)
    }
    </div>
    <ToastContainer position='top-right' theme='colored'/>
    </>
  );
}

export default App;
//{} []