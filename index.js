import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import HandleAuth from './Auth.js';
import { HandleLogin, HandleProfile, HandleLatestPosts, HandleCreatePost, HandleSearchData, 
  HandleFollow, HandleUnFollow,HandlePostLike, HandleLikedPost, HandlePostUnLike, HandleDeletePost,
   HandleChatlist, HandleComment, HandleEditProfile, HandleFetchProfile, HandleOtp, HandleVerifyOtp, 
   HandleFollowersList, HandleFollowingList, HandleConversationList, HandleSendMessage} from './Auth.js';
import Authenticate from './Authenticate.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config({ path: './config.env' });
const port = process.env.PORT || 3001;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
  origin: 'https://erin-wandering-drill.cyclic.app',
  credentials:true,            //access-control-allow-credentials:true
}));
app.use(cookieParser());


app.post('/signup',(req,res)=>{
    HandleAuth(req.body, function(result){
      res.send({result : result});
    });
  });

app.post('/login',(req,res)=>{
    HandleLogin(req.body, function(result){
      if(result.token){
        res.cookie('instaapp', result.token, {
        expires: new Date(Date.now() + 3000000),
        httpOnly: true,
        secure: true,
        sameSite : "none",
        path :"/",
      });
      }
      res.send({result : result.login, username : result.username});
    });
  });

app.post('/logout',(req,res)=>{
    res.clearCookie('instaapp',{path:"/", httpOnly : true,secure: true,sameSite : "none",});
    res.send({logout: "success"});
    res.end();
});

app.post('/profile', Authenticate ,(req,res)=>{
    HandleProfile(req.rootUsername, function(result){
        res.send({msg: result});
    });
});

app.post('/latest/posts', Authenticate ,(req,res)=>{
  HandleLatestPosts(req.rootUsername, function(result){
      res.send({msg: result.data});
  });
});

app.post('/create/post', Authenticate ,(req,res)=>{
  HandleCreatePost(req.rootUsername,req.body, function(result){
      res.send({msg: result.data});
  });
});

app.post('/fetch/search', Authenticate ,(req,res)=>{
  HandleSearchData(req.rootUsername, req.body, function(result){
    res.send({msg: result.data});
  });
});

app.post('/follow/person', Authenticate ,(req,res)=>{
  HandleFollow(req.rootUsername, req.body, function(result){
    res.send({msg: result.data});
  });
});

app.post('/unfollow/person', Authenticate ,(req,res)=>{
  HandleUnFollow(req.rootUsername, req.body, function(result){
    res.send({msg: result.data});
  });
});

app.post('/post/like', Authenticate ,(req,res)=>{
  HandlePostLike(req.rootUsername, req.body, function(result){
    res.send({msg: result.data});
  });
});

app.post('/post/unlike', Authenticate ,(req,res)=>{
  HandlePostUnLike(req.rootUsername, req.body, function(result){
    res.send({msg: result.data});
  });
});

app.post('/liked/post', Authenticate ,(req,res)=>{
  HandleLikedPost(req.rootUsername, function(result){
    res.send({msg: result.data});
  });
});

app.post('/post/delete', Authenticate ,(req,res)=>{
  HandleDeletePost(req.rootUsername, req.body, function(result){
    res.send({msg: result.data});
  });
});

app.post('/chat/list', Authenticate ,(req,res)=>{
  HandleChatlist(req.rootUsername, function(result){
    res.send({msg: result.data});
  });
});

app.post('/post/comment', Authenticate ,(req,res)=>{
  HandleComment(req.rootUsername,req.body, function(result){
    res.send({msg: result.data});
  });
});

app.post('/edit/profile', Authenticate ,(req,res)=>{
  HandleEditProfile(req.rootUsername,req.body, function(result){
    res.send({msg: result.data});
  });
});

app.post('/fetch/profile', Authenticate ,(req,res)=>{
  HandleFetchProfile(req.rootUsername, function(result){
    res.send({msg: result.data});
  });
});

app.post('/fetch/followers/list', Authenticate,(req,res)=>{
  HandleFollowersList(req.rootUsername, function(result){
    res.send({msg: result.data});
  });
});

app.post('/fetch/following/list', Authenticate,(req,res)=>{
  HandleFollowingList(req.rootUsername, function(result){
    res.send({msg: result.data});
  });
});

app.post('/user/conversation/list', Authenticate,(req,res)=>{
  HandleConversationList(req.rootUsername, req.body, function(result){
    res.send({msg: result.data});
  });
});

app.post('/send/chat/message', Authenticate,(req,res)=>{
  HandleSendMessage(req.rootUsername, req.body, function(result){
    res.send({msg: result.data});
  });
});

app.post('/api/send/otp',(req,res)=>{
  HandleOtp(req.body, function(result){
    res.send({msg : result});
  });
});

app.post('/api/verify/otpvalid',(req,res)=>{
  HandleVerifyOtp(req.body, function(result){
    res.send({msg : result});
  });
});


const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname,"./client/build")));

app.get("*",(req,res)=>{
    res.sendFile(
      path.join(__dirname,"./client/build/index.html"),
      function(err){
        res.status(500).send(err);
      }
    );
});

app.listen(port,()=>{
    console.log(`Server is working at ${port}`);
   });
 
 //{}