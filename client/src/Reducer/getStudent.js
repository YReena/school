let initial ={
   tokn:"",
   header:""
}

const studentredux = (state= initial,action)=>{
   console.log(action.payload);
 switch(action.type){
    case "User" :  
    return ({...state,tokn:action.payload });

    case "delUser" :  
    return ({...state,tokn:action.payload });

    case "headAuth" :  
    return ({...state,header:action.payload });

    default : return state ;
 }
}

export default studentredux;

