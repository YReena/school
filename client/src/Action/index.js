export const getUser = ()=>{
    return{
        type :"User",
        payload : localStorage.getItem("token")
    }
}

export const delUser = ()=>{
    return{
        type :"delUser",
        payload : "reen"
    }
}