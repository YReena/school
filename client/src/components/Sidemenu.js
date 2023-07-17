import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import logon from '../sahil.jpg';
import { Routes, Route } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Dashboard from './Dashboard';
import Admission from './Admission';
import Login from './Login';
import Staff from './Staff';
import Firstsem from './Firstsem';
import Student from './Student';
import Update from './Update';
import Expenditure from './Expenditure';
import Exam from './Exam';
import Subject from './Subject';
import StaffInfo from './StaffInfo';
import Secondsem from './Secondsem';
import Thirdsem from './Thirdsem';
import Report from './Report';
import StudentList from './StudentList';
import StaffList from './StaffList';
import Staffupdate from './Staffupdate';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Logout from './Logout';
import {getUser,delUser} from '../Action/index'


const Sidemenu = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [item, setItems] = useState([]);
    const [birth, setBirth] = useState([]);
    const USR = useSelector((state)=>state.studentredux);
    const getData = async () => {
        const res = await fetch('/student', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem('token')
            }
        })

        const Ts = await res.json(res);
        if(Ts.message == "please add valid token to headers"){
         
        }else{
            setBirth(Ts);
               birth.length != 0 &&  birth.forEach(ele => {
                    const dob = ele.dob;
                    let d = new Date(dob).toLocaleDateString();
                    let curdate = new Date().toLocaleDateString();
                    if (d === curdate) {
                        setItems([...item , (ele.firstname +" "+ ele.lastname)]);
                        // setBirName(ele.firstname +" "+ ele.lastname);
                    }
                });

        }
      

    }
    const Rendernemu = () => {
        if (USR.tokn == '' || USR.tokn == 'reen') {
            return (<>
                <li>
                     {console.log("reena after login")}
                    <NavLink to="/login">Login</NavLink>
                </li>
            </>)
        }
        else {
            return (<>
                <li>
                    <NavLink to='/dashboard'>Dashboard</NavLink>
                </li>

                <li>
                    <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Student</a>
                    <ul className="collapse list-unstyled" id="homeSubmenu">
                        <li>
                            < NavLink to="/admission">Admission</NavLink>
                        </li>
                        <li>
                            < NavLink to="/student">Search </NavLink>

                        </li>

                    </ul>
                </li>
                <li>
                    <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Staff</a>
                    <ul className="collapse list-unstyled" id="pageSubmenu">
                        <li>
                            <NavLink to="/staff">Admit</NavLink>
                        </li>
                        <li>
                            <NavLink to="/staffinfo">Search</NavLink>
                        </li>

                    </ul>
                </li>
                <li>
                    <NavLink to='/subject'>Subject</NavLink>
                </li>
                <li>
                    <a href="#acapage" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Academic Details</a>
                    <ul className="collapse list-unstyled" id="acapage">
                        <li>
                            <NavLink to="/firstsem">First Semester</NavLink>
                        </li>
                        <li>
                            <NavLink to="/secondsem">Second Semester</NavLink>
                        </li>
                        <li>
                            <NavLink to="/thirdsem">Third Semester</NavLink>
                        </li>

                    </ul>
                </li>
                <li>
                    <NavLink to="/report">Report</NavLink>
                </li>
                <li>
                    {console.log("reena after logged out")}
                    <NavLink to="/logout">LogOut</NavLink>
                </li>

            </>)
        }
    }
    // const menu =()=>{
    //     if(localStorage.getItem = "" || localStorage.getItem = null)
    // }


    useEffect(() => {
        getData();
        Rendernemu();
    }, []);

    return (<>
        <Grid container>
            <Grid item xs={2}>
                <div className="wrapper">

                    <nav id="sidebar">
                        <div className='school_name'>
                            <h3>Admin Portal</h3>
                        </div>
                        <div className="sidebar-header school_logon">
                            <img src={logon} alt='pic' id="img" />
                        </div>
                        <p id='admin_portal_line'>Little Hand Play School</p>
                        <ul className="list-unstyled components">
                         <Rendernemu/>
                            {/* <li>
                                <NavLink to='/'>Dashboard</NavLink>
                            </li>

                            <li>
                                <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Student</a>
                                <ul className="collapse list-unstyled" id="homeSubmenu">
                                    <li>
                                        < NavLink to="/admission">Admission</NavLink>
                                    </li>
                                    <li>
                                        < NavLink to="/student">Search </NavLink>

                                    </li>

                                </ul>
                            </li>
                            <li>
                                <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Staff</a>
                                <ul className="collapse list-unstyled" id="pageSubmenu">
                                    <li>
                                        <NavLink to="/staff">Admit</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/staffinfo">Search</NavLink>
                                    </li>

                                </ul>
                            </li>
                            <li>
                                <NavLink to='/subject'>Subject</NavLink>
                            </li>
                            <li>
                                <a href="#acapage" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Academic Details</a>
                                <ul className="collapse list-unstyled" id="acapage">
                                    <li>
                                        <NavLink to="/firstsem">First Semester</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/secondsem">Second Semester</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/thirdsem">Third Semester</NavLink>
                                    </li>

                                </ul>
                            </li>
                            <li>
                                <NavLink to="/report">Report</NavLink>
                            </li>
                             <li>
                                <NavLink to="/login">Login</NavLink>
                            </li>  */}
                        </ul>
                    </nav>

                </div>
            </Grid>
            <Grid item xs={10}>
                <div id="admin_heading">{item.length == 0 ? <h4>no birthday today</h4> : <h4>It's <b><i> {item.map((na, id) => {
                    return (na + " , ");
                })
                } </i></b>Birthday. Let's Bring cake for them</h4>}

                </div>
                
                <Routes>
                    <Route path='/dashboard'  element={<Dashboard />} />
                    <Route path="/admission" element={< Admission />} />
                    <Route path="/firstsem" element={< Firstsem />} />
                    <Route path="/student" element={< Student />} />
                    <Route path="/student/edit/:id" element={< Update />} />
                    <Route path="/staff/edit/:id" element={<Staffupdate />} />

                    <Route path="/dashboard/expenditure" element={<Expenditure />} />
                    <Route path='/dashboard/studentlist' element={<StudentList />} />
                    <Route path='/dasboard/stafflist' element={<StaffList />} />
                    <Route path="/exam" element={<Exam />} />
                    <Route path="/subject" element={<Subject />} />
                    <Route path="/staffinfo" element={<StaffInfo />} />
                    <Route path='/secondsem' element={<Secondsem />} />
                    <Route path='/thirdsem' element={<Thirdsem />} />
                    <Route path='/report' element={<Report />} />

                    <Route path="/staff" element={<Staff />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<Logout />} />
                </Routes>
            </Grid>
        </Grid>


    </>);
}
export default Sidemenu;