import { Modal, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';



const Admission = () => {
    let navigate = useNavigate();
    const headerAuth = useSelector((state)=>state.studentredux.header);
    const [error, setError] = useState("");

    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        navigate('/dashboard/studentlist');
    }
    const handleShow = (e) => {
        submitinfo(e);
        setShow(true);}

    const [studentState, setStudent] = useState({
        firstname: "", lastname: "", fathername: "", mothername: "", grade: "", gender: "", admissionno: "", dob: "", session: "", adharcardno: "", address: "", mobileno: ""
    })
    let name, value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;
        setStudent({ ...studentState, [name]: value });
    }

    const submitinfo = async (e) => {
        e.preventDefault();
        const { firstname, lastname, fathername, mothername, grade, gender, admissionno, dob, session, adharcardno, address, mobileno } = studentState;
        const res = await fetch('/admission', {
            method: "POST",
            headers: {

                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstname, lastname, fathername, mothername, grade, gender, admissionno, dob, session, adharcardno, address, mobileno
            })
        });

        const data = await res.json();

        if (data.error) {
            setError(data.error);
            console.log(data.error);
        }
        // else{
        //     window.alert(" Registartion successfully    !!!...");
        //     console.log(" Registration successfully    !!!...");

        //     navigate('/');
        // }
    }

    return (<>
        <div className='form'>
            <div className='container'>
                <h2 id="student_details_handing">Student Details</h2>

                <form method="POST">
                    <div className="row">
                        <div className="col">
                            <label>Admission No</label>
                            <input type="text" className="form-control" placeholder="Admission No" name="admissionno" value={studentState.admissionno} onChange={handleInputs} />
                        </div>
                        <div className="col">
                            <label>First Name{studentState.firstname.length == 0 && <span style={{ "color": "red", "font-weight": "bolder" }}>*</span>}</label>
                            <input type="text" className="form-control" placeholder="First Name" name="firstname" value={studentState.firstname} onChange={handleInputs} />

                        </div>
                        <div className="col">
                            <label>Last Name {studentState.lastname.length == 0 && <span style={{ "color": "red", "font-weight": "bolder" }}>*</span>}</label>
                            <input type="text" className="form-control" placeholder="Last Name" name="lastname" value={studentState.lastname} onChange={handleInputs} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <label>Father's Name{studentState.fathername.length == 0 && <span style={{ "color": "red", "font-weight": "bolder" }}>*</span>}</label>
                            <input type="text" className="form-control" placeholder="Father's name" name="fathername" value={studentState.fathername} onChange={handleInputs} />
                        </div>
                        <div className="col">
                            <label>Mother's Name{studentState.mothername.length == 0 && <span style={{ "color": "red", "font-weight": "bolder" }}>*</span>}</label>
                            <input type="text" className="form-control" placeholder="Mother's Name" name="mothername" value={studentState.mothername} onChange={handleInputs} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <label>Grade{studentState.grade.length == 0 && <span style={{ "color": "red", "font-weight": "bolder" }}>*</span>}</label>
                            <select id="inputgrade" class="form-control" name='grade' onChange={handleInputs} value={studentState.grade} >
                                <option>Option</option>
                                <option value="Nursary">Nursary</option>
                                <option value="LKG">LKG</option>
                                <option value="UKG">UKG</option>

                            </select>
                        </div>
                        <div className="col">
                            <label>Gender{studentState.gender.length == 0 && <span style={{ "color": "red", "font-weight": "bolder" }}>*</span>}</label>
                            <select id="inputgender" class="form-control" name='gender' onChange={handleInputs} value={studentState.gender} >
                                <option>Option</option>
                                <option value="Female">Female</option>
                                <option value="Male">Male</option>


                            </select>
                        </div>
                        <div className="col">
                            <label>D.O.B{studentState.dob.length == 0 && <span style={{ "color": "red", "font-weight": "bolder" }}>*</span>}</label>
                            <input type="date" className="form-control" placeholder="Admission No" name="dob" value={studentState.dob} onChange={handleInputs} />
                        </div>
                        <div className="col">
                            <label>Session{studentState.session.length == 0 && <span style={{ "color": "red", "font-weight": "bolder" }}>*</span>}</label>
                            <input type="text" className="form-control" placeholder="Session" name="session" value={studentState.session} onChange={handleInputs} />
                        </div>
                        <div className="col">
                            <label>Adhar Card No{studentState.adharcardno.length < 13 && <span style={{ "color": "red", "font-weight": "bolder" }}>*</span>} </label>
                            <input type="text" className="form-control" placeholder="Adhar Card No" name="adharcardno" value={studentState.adharcardno} onChange={handleInputs} />
                            {studentState.adharcardno.length > 13 && <span style={{ "color": "red", "font-weight": "bolder" }}>contains 12 characters</span>}

                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <label> Full Address</label>
                            <input type="text" className="form-control" placeholder=" Full Address" name="address" value={studentState.address} onChange={handleInputs} />
                        </div>
                        <div className="col">
                            <label>Mobile No</label>
                            <input type="text" className="form-control" placeholder="Mobile No" name="mobileno" value={studentState.mobileno} onChange={handleInputs} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">

                        </div>
                        <div className="col btn_submit">
                            {/* <button className='btn-color' onClick={submitinfo} >Submit</button> */}
                            <Button className='btn-color' onClick={handleShow}>
                                Submit
                            </Button>
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title></Modal.Title>
                                </Modal.Header>
                               {error.length == 0 && <Modal.Body style={{"font-weight":"bolder"}}>Information Submit Successfully</Modal.Body>} 
                               {error.length != 0 && <Modal.Body style={{"color":"red", "font-weight":"bolder"}}>Please fill mandatory fields</Modal.Body>}

                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                    <Button variant="primary" onClick={handleClose}>
                                        Okay
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    </>);

}
export default Admission;