const initialState = "/assets/images/profilepic.webp";

const CurrUserProfile = (state = initialState, action)=>{
    switch (action.type) {
        case "CURRENTPROFILE": return action.payload;
        default: return state;
    }
}

export default CurrUserProfile;