import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const Staff = () => {

    const [data, setData] = useState({
        idno: "", firstname: "", lastname: "", fathername: "", mothername: "", gender: "", dob: "", salary: "", adharcardno: "", address: "", mobile: ""
    })

//    const [error, setError] = useState("");
let navigate = useNavigate();
const [error, setError] = useState("");

const [show, setShow] = useState(false);
const handleClose = () => {
    setShow(false);
    navigate('/');
}
const handleShow = (e) => {
    submitInfo(e);
    setShow(true);}
    
    let name, value;
    const handleInput = (e) => {
        name = e.target.name;
        value = e.target.value;
        setData({ ...data, [name]: value });
    }

    const submitInfo = async (e) => {
        e.preventDefault();
        const { idno, firstname, lastname, fathername, mothername, gender, dob, salary, adharcardno, address, mobileno } = data;
        const res = await fetch('/staff', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idno, firstname, lastname, fathername, mothername, gender, dob, salary, adharcardno, address, mobileno
            })
        });

        const teacherAdd = await res.json();

        if (teacherAdd.error) {
            setError(teacherAdd.error);
        }
        // else {
        //     window.alert(" Registartion successfully    !!!...");
        //     console.log(" Registration successfully    !!!...");

        // }
    }



    return (<>
        <div className='admission_form'>
            <div className='container'>
                <h2 id="student_details_handing">Teacher Details</h2>
                {error && <p style={{"color":"red", "textAlign":"center","font-weight":"bolder"}}>{error}</p>} 

                <form method="POST">
                    <div className="row">
                        <div className="col">
                            <label>Id No</label>
                            <input type="text" className="form-control" placeholder="Id No" name="idno" onChange={handleInput} value={data.idno} />
                        </div>
                        <div className="col">
                            <label>First Name{data.firstname.length == 0 && <span style={{ "color": "red", "font-weight": "bolder" }}>*</span>}</label>
                            <input type="text" className="form-control" placeholder="First Name" name="firstname" onChange={handleInput} value={data.firstname} />
                        </div>
                        <div className="col">
                            <label>Last Name{data.lastname.length == 0 && <span style={{ "color": "red", "font-weight": "bolder" }}>*</span>}</label>
                            <input type="text" className="form-control" placeholder="Last Name" name="lastname" onChange={handleInput} value={data.lastname} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <label>Father's Name{data.fathername.length == 0 && <span style={{ "color": "red", "font-weight": "bolder" }}>*</span>}</label>
                            <input type="text" className="form-control" placeholder="Father's name" name="fathername" onChange={handleInput} value={data.fathername} />
                        </div>
                        <div className="col">
                            <label>Mother's Name{data.mothername.length == 0 && <span style={{ "color": "red", "font-weight": "bolder" }}>*</span>}</label>
                            <input type="text" className="form-control" placeholder="Mother's Name" name="mothername" onChange={handleInput} value={data.mothername} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <label>Gender{data.gender.length == 0 && <span style={{ "color": "red", "font-weight": "bolder" }}>*</span>}</label>
                            <select id="inputgender" class="form-control" name='gender' onChange={handleInput} value={data.gender}>
                                <option value="Female">Female</option>
                                <option value="Male">Male</option>
                                <option>UKG</option>

                            </select>
                        </div>
                        <div className="col">
                            <label>D.O.B{data.dob.length == 0 && <span style={{ "color": "red", "font-weight": "bolder" }}>*</span>}</label>
                            <input type="date" className="form-control" placeholder="Admission No" name="dob" onChange={handleInput} value={data.dob} />
                        </div>
                        <div className="col">
                            <label>Salary{data.salary.length == 0 && <span style={{ "color": "red", "font-weight": "bolder" }}>*</span>}</label>
                            <input type="text" className="form-control" placeholder="Salary" name="salary" onChange={handleInput} value={data.salary} />
                        </div>
                        <div className="col">
                            <label>Adhar Card No{data.adharcardno.length < 13 && <span style={{ "color": "red", "font-weight": "bolder" }}>*</span>} </label>
                            <input type="text" className="form-control" placeholder="Adhar Card No" name="adharcardno" onChange={handleInput} value={data.adharcardno} />
                            {data.adharcardno.length > 13 && <span style={{ "color": "red", "font-weight": "bolder" }}>contains 12 characters</span>}
                        </div>
                    </div>


                    <div className="row">
                        <div className="col">
                            <label> Full Address</label>
                            <input type="text" className="form-control" placeholder=" Full Address" name="address" onChange={handleInput} value={data.address} />
                        </div>
                        <div className="col">
                            <label>Mobile No</label>
                            <input type="text" className="form-control" placeholder="Mobile No" name="mobileno" onChange={handleInput} value={data.mobileno} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            {/* <button className=' btn-color' onClick={submitInfo}>Submit</button> */}
                            <Button className='btn-color' onClick={handleShow}>
                                Submit
                            </Button>
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title></Modal.Title>
                                </Modal.Header>
                               {error.length == 0 && <Modal.Body style={{"font-weight":"bolder"}}>Information Submit Successfully</Modal.Body>} 
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

        </div >

    </>);

}
export default Staff;