const initialState = "null";

const CurrUserStatus = (state = initialState, action)=>{
    switch (action.type) {
        case "CURRENTUSER": return action.payload;
        default: return state;
    }
}

export default CurrUserStatus;