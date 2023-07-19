export const getUser = (data)=>{
    console.log(data);
    return{
        type :"User",
        payload : data
    }
}

export const delUser = ()=>{
    return{
        type :"delUser",
        payload : "deluser"
    }
}

export const headerauthenication =(data)=>{
    return{
        type  : "headAuth",
        payload : data
    }
}