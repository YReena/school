import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {getUser,delUser} from '../Action/index'


const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
    useEffect(()=>{
     localStorage. removeItem('token');
     dispatch(delUser());
     navigate("/login");
     console.log("logoutpage");
    },[]);
  return (
    <></>
  );
}

export default Logout;