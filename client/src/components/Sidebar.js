import React from 'react';
import { Grid } from '@mui/material';
import '../style.css';
import { a } from 'react-router-dom';
import logon from '../Capture.PNG';
import { Route, Routes } from 'react-router-dom';
import Student from './Student';
import Admission from './Admission';
import Login from './Login';
import Staff from './Staff';

const Sidebar = () => {
  return (<>
    <Grid container>
      <Grid item xs={2}>
        <div>
          <nav id="sidebar ">
            <div className="sidebar-header" >
              <div className='school_img'>
                <img src={logon} alt="pics" id="school_logo" />
              </div>

            </div>

            <ul className="list-unstyled components">
              <p>Little Hands</p>

              <li>
                <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Student</a>
                <ul className="collapse list-unstyled" id="pageSubmenu">
                  <li>
                    <a href="/admission"> Admission</a>
                  </li>
                  <li>
                    <a href="#"> Details</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#">Academic Details</a>
              </li>
              <li>
                <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Staff</a>
                <ul className="collapse list-unstyled" id="homeSubmenu">
                  <li>
                    <a href="/acdemicDetails">Admit</a>
                  </li>
                  <li>
                    <a href="#">Infomation</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#">Fees Information</a>
              </li>
              <li>
                <a href="#">Sign In</a>
              </li>
            </ul>
          </nav>
        </div>
      </Grid>
      <Grid item xs={10}>
        <div id="content">
          <div >Admin Panel</div>
          <Routes>
            <Route path="/admission" element={< Admission />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/student" element={<Student />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Grid>
    </Grid>


  </>);
}


export default Sidebar;