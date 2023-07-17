import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import {getUser} from '../Action/index'


const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [admin, setAdmin] = useState({
        email: "", password: ""
    });

    let name, value;
    const handleInput = (e) => {
        name = e.target.name;
        value = e.target.value;
        setAdmin({ ...admin, [name]: value })
    }
    const submitInfo = async (e) => {
        e.preventDefault();
        const { email, password } = admin;
        const data = await fetch('/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })
        });
        const res = await data.json();
        
        if (data.status === 422) {
            window.alert("please enter credentails !..");
        }
        else if (data.status === 202) {
            window.alert("logged in successfully.... !..");
            localStorage.setItem('token' , res.message);
            dispatch(getUser());
            navigate("/");
        }
        else
            window.alert("Invalid credentails..");
    }
    return (<>
        <div className='login'>
            <div className='login-box '>
                <h2>Login In</h2>
                <form method='POST'>
                    <div className="row login_input">
                        <div className="col">
                            <label>Email</label>
                            <input type="email" className="form-control" placeholder="Email" name="email" value={admin.email} onChange={handleInput} />
                        </div>
                    </div>
                    <div className="row login_input">
                        <div className="col">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Password" name="password" value={admin.password} onChange={handleInput} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <button className='btn btn-primary' onClick={submitInfo}>Submit</button>
                        </div>
                    </div>
                </form>
            </div>    
        </div>
    </>);

}
export default Login;