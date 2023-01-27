const initialState = "";

const SearchData = (state = initialState, action)=>{
    switch (action.type) {
        case "SEARCH": return action.payload;
        default: return state;
    }
}

export default SearchData;