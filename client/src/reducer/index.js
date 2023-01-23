import { combineReducers } from "redux";
import ChangeLoginStatus from "./DoAction.js";
import CurrUserStatus from "./CheckUserStatus.js";
import CurrUserProfile from "./CheckUserProfile.js";
import SearchData from "./SearchData.js";

const rootReducer = combineReducers({
    ChangeLoginStatus,
    CurrUserStatus,
    CurrUserProfile,
    SearchData
});

export default rootReducer;