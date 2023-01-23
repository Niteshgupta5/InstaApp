export const loged = (val)=>{
    return {
        type: "LOGED",
        payload: val
    }
}

export const notloged = (val)=>{
    return {
        type: "NOTLOGED",
        payload: val
    }
}

export const currentuser = (val)=>{
    return {
        type: "CURRENTUSER",
        payload: val
    }
}

export const currentprofile = (val)=>{
    return {
        type: "CURRENTPROFILE",
        payload: val
    }
}

export const currsearch = (val)=>{
    return {
        type: "SEARCH",
        payload: val
    }
}