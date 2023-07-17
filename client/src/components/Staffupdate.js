import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const Staffupdate = () => {
    let navigate = useNavigate();
    const obj = useParams("");
    const [error, setError] = useState("");
    const [show, setShow] = useState(false);
    const [teaherState, setTeacher] = useState({
        idno: "", firstname: "", lastname: "", fathername: "", mothername: "", gender: "", dob: "", salary: "", adharcardno: "", address: "", mobile: ""
    })
    const handleClose = () => {
        setShow(false);
        navigate('/');
    }
    const handleShow = (e) => {
        submitinfo(e);
        setShow(true);}

    
    let name, value;
    const handleInput = (e) => {
        name = e.target.name;
        value = e.target.value;
        setTeacher({ ...teaherState, [name]: value });
    }

    const getdata = async () => {
        const res = await fetch(`/staff/edit/${obj.id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })
        const output = await res.json();
        const obj1 = output[0];
        setTeacher(obj1);
    
       // console.log(outputres);
    }
    
    useEffect(()=>{
        getdata();
    }, []);

    const submitinfo = async (e) =>{
        e.preventDefault();
        const { idno, firstname, lastname, fathername, mothername, gender, dob, salary, adharcardno, address, mobileno } = teaherState;
        const res =  await fetch(`/staff/update/${obj.id}`,{
            method : "PATCH",
            headers :{
                "Content-Type":"application/json"
            },
            body : JSON.stringify({
                idno, firstname, lastname, fathername, mothername, gender, dob, salary, adharcardno, address, mobileno 
            })
        });

        const data = await res.json();

        console.log(data);
        if(data.status ===  422 || !data){
           setError("error");
           console.log(data.status);
        }
        else{
          console.log(data);
        }
    }
    return (<>
           <div className='admission_form'>
            <div className='container'>
                <h2 id="student_details_handing">Teacher Details</h2>
                {console.log(obj._id)}
                <form method="POST">
                    <div className="row">
                        <div className="col">
                            <label>Id No</label>
                            <input type="text" className="form-control" placeholder="Id No" name="idno" onChange={handleInput} value={teaherState.idno} />
                        </div>
                        <div className="col">
                            <label>First Name{teaherState.firstname.length == 0 && <span style={{ "color": "red", "font-weight": "bolder" }}>*</span>}</label>
                            <input type="text" className="form-control" placeholder="First Name" name="firstname" onChange={handleInput} value={teaherState.firstname} />
                        </div>
                        <div className="col">
                            <label>Last Name{teaherState.lastname.length == 0 && <span style={{ "color": "red", "font-weight": "bolder" }}>*</span>}</label>
                            <input type="text" className="form-control" placeholder="Last Name" name="lastname" onChange={handleInput} value={teaherState.lastname} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <label>Father's Name{teaherState.fathername.length == 0 && <span style={{ "color": "red", "font-weight": "bolder" }}>*</span>}</label>
                            <input type="text" className="form-control" placeholder="Father's name" name="fathername" onChange={handleInput} value={teaherState.fathername} />
                        </div>
                        <div className="col">
                            <label>Mother's Name{teaherState.mothername.length == 0 && <span style={{ "color": "red", "font-weight": "bolder" }}>*</span>}</label>
                            <input type="text" className="form-control" placeholder="Mother's Name" name="mothername" onChange={handleInput} value={teaherState.mothername} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <label>Gender{teaherState.gender.length == 0 && <span style={{ "color": "red", "font-weight": "bolder" }}>*</span>}</label>
                            <select id="inputgender" class="form-control" name='gender' onChange={handleInput} value={teaherState.gender}>
                                <option value="Female">Female</option>
                                <option value="Male">Male</option>
                                <option>UKG</option>

                            </select>
                        </div>
                        <div className="col">
                            <label>D.O.B{teaherState.dob.length == 0 && <span style={{ "color": "red", "font-weight": "bolder" }}>*</span>}</label>
                            <input type="date" className="form-control" placeholder="Admission No" name="dob" onChange={handleInput} value={teaherState.dob} />
                        </div>
                        <div className="col">
                            <label>Salary{teaherState.salary.length == 0 && <span style={{ "color": "red", "font-weight": "bolder" }}>*</span>}</label>
                            <input type="text" className="form-control" placeholder="Salary" name="salary" onChange={handleInput} value={teaherState.salary} />
                        </div>
                        <div className="col">
                            <label>Adhar Card No{teaherState.adharcardno.length < 13 && <span style={{ "color": "red", "font-weight": "bolder" }}>*</span>} </label>
                            <input type="text" className="form-control" placeholder="Adhar Card No" name="adharcardno" onChange={handleInput} value={teaherState.adharcardno} />
                            {teaherState.adharcardno.length > 13 && <span style={{ "color": "red", "font-weight": "bolder" }}>contains 12 characters</span>}
                        </div>
                    </div>


                    <div className="row">
                        <div className="col">
                            <label> Full Address</label>
                            <input type="text" className="form-control" placeholder=" Full Address" name="address" onChange={handleInput} value={teaherState.address} />
                        </div>
                        <div className="col">
                            <label>Mobile No</label>
                            <input type="text" className="form-control" placeholder="Mobile No" name="mobileno" onChange={handleInput} value={teaherState.mobileno} />
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

        </div >
       
    </>)
}
export default Staffupdate;