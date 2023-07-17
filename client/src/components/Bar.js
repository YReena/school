import { width } from '@mui/system';
import React from 'react';
import logon from '../Capture.PNG';

const Bar = () => {
    return (<>
        <div className="wrapper">

            <nav id="sidebar">
                <div className="sidebar-header">
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
                                <a href="#"> Admission</a>
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
                                <a href="#">Admit</a>
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
            <div id="content" style={{backgroundColor:"yellow" }}>
              <div >hello</div>
            </div>

        </div>
    </>);
}

export default Bar;
