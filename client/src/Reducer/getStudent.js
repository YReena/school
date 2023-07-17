let initial ={
   tokn:""
}

const studentredux = (state= initial,action)=>{
   console.log(action.payload);
 switch(action.type){
    case "User" :  
    const  data= action.payload ;
    return ({...state,tokn:data});

    case "delUser" :  
    console.log(action.payload);
    const  d= action.payload ;
    return ({...state,tokn:d});

    default : return state ;
 }
}

export default studentredux;

