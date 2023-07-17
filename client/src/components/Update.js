import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const Update = () => {
    let navigate = useNavigate();
    const obj = useParams("");
    const [error, setError] = useState("");
    const [show, setShow] = useState(false);
    const [studentState, setStudent] = useState({
        admissionno: "", firstname: "", lastname: "", fathername: "", mothername: "", grade: "", gender: "", dob:"", session: "", adharcardno: "", address: "", mobileno: ""
    })
    const handleClose = () => {
        setShow(false);
        navigate('/');
    }
    const handleShow = (e) => {
        submitinfo(e);
        setShow(true);}

    
    let name, value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;
       setStudent({ ...studentState, [name]: value });
    }

    const getdata = async () => {
        const res = await fetch(`/student/edit/${obj.id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })
        const output = await res.json();
        const obj1 = output[0];
        setStudent(obj1);
    
       // console.log(outputres);
    }
    
    useEffect(()=>{
        getdata();
    }, []);

    const submitinfo = async (e) =>{
        e.preventDefault();
        const {admissionno,firstname,lastname,fathername,mothername,grade,gender,dob,session,adharcardno,address,mobileno } = studentState;
        const res =  await fetch(`/student/update/${obj.id}`,{
            method : "PATCH",
            headers :{
                "Content-Type":"application/json"
            },
            body : JSON.stringify({
                adharcardno,firstname,lastname,fathername,mothername,grade,gender,admissionno,session,dob,address,mobileno 
            })
        });

        const data = await res.json();

        console.log(data);
        if(data.status ===  422 || !data){
           setError(data.error);
        }
    }
    return (<>

        <div className='admission_form'>
            <div className='container'>
                <h2 id="student_details_handing">Student Details</h2>
                <form method="POST">
                    <div className="row">
                    <div className="col">
                            <label>Admission No</label>
                            <input type="text" className="form-control" placeholder="Admission No" name="admissionno" value={studentState.admissionno} onChange={handleInputs} />
                        </div>
                        <div className="col">
                            <label>First Name</label>
                            <input type="text" className="form-control" placeholder="First Name" name="firstname" value={studentState.firstname} onChange={handleInputs} />
                        </div>
                        
                        <div className="col">
                            <label>Last Name</label>
                            <input type="text" className="form-control" placeholder="Last Name" name="lastname" value={studentState.lastname} onChange={handleInputs} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <label>Father's Name</label>
                            <input type="text" className="form-control" placeholder="Father's name" name="fathername" value={studentState.fathername} onChange={handleInputs} />
                        </div>
                        <div className="col">
                            <label>Mother's Name</label>
                            <input type="text" className="form-control" placeholder="Mother's Name" name="mothername" value={studentState.mothername} onChange={handleInputs} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <label>Grade</label>
                            <select id="inputgrade" class="form-control" name='grade' onChange={handleInputs} value={studentState.grade}>
                                <option value="Nursary">Nursary</option>
                                <option value="LKG">LKG</option>
                                <option value="UKG">UKG</option>

                            </select>
                        </div>
                        <div className="col">
                            <label>Gender</label>
                            <select id="inputgender" class="form-control" name='gender' onChange={handleInputs} value={studentState.gender}>
                                <option value="Female">Female</option>
                                <option value="Male">Male</option>
                                <option>UKG</option>

                            </select>
                        </div>
                        <div className="col">
                            <label>D.O.B</label>
                            <input type="date" className="form-control" placeholder="Admission No" name="dob" value={studentState.dob} onChange={handleInputs} />
                        </div>
                        <div className="col">
                            <label>Session</label>
                            <input type="text" className="form-control" placeholder="Session" name="session" value={studentState.session} onChange={handleInputs} />
                        </div>
                        <div className="col">
                            <label>Adhar Card No</label>
                            <input type="text" className="form-control" placeholder="Adhar Card No" name="adharcardno" value={studentState.adharcardno} onChange={handleInputs} />
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
                            {/* <button className=' btn-color' onClick={submitinfo} >Update Info</button> */}
                            <Button className='btn-color' onClick={handleShow}>
                                Submit
                            </Button>
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title></Modal.Title>
                                </Modal.Header>
                               {error.length == 0 && <Modal.Body style={{"font-weight":"bolder"}}>Information Update Successfully</Modal.Body>} 
                               {error.length != 0 && <Modal.Body style={{"color":"red", "font-weight":"bolder"}}>Please fill mandatory fields</Modal.Body>}
                                {console.log(error)}

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
    </>)
}
export default Update;