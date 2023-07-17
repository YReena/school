import React from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import logon from '../Capture.PNG';

const Navbar = () => {
    return (<>

        <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-style-border">
            <NavLink className="navbar-brand" to="#"><img src={logon} alt='pic' style={{height: "40px" , width: "60px" , paddingLeft: "10px" }}/></NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item active">
                        <NavLink className="nav-link" to="/admission">Admission <span className="sr-only"></span></NavLink>
                    </li>
                    <li className="nav-item active">
                        <NavLink className="nav-link" to="/academicDetails">Academic Details <span className="sr-only"></span></NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/student">Student Detail</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/staff">Staff</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/login">Login</NavLink>
                    </li>
                    
                    
                </ul>

            </div>
        </nav>
    </>);

}
export default Navbar;