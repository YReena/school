import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const StaffInfo = () => {
    const [teacher, setTeacher] = useState({
        idno: ""
    })
    const [result, setResult] = useState([]);
    const [show, setShow] = useState(false);
    const [error, setError] = useState("");
    let name, value;
    const handleInput = (e) => {
        name = e.target.name;
        value = e.target.value;
        setTeacher({ ...teacher, [name]: value });
    }

    const handleClose = () => {
        setShow(false);
    }
    const handleShow = (e) => {
        setShow(true);
    }



    const submitInfo = async (e) => {
        e.preventDefault();

        const res = await fetch('/staffinfo/' + teacher.idno, {
            method: 'GET'
        })

        const data = await res.json();
        if (data.length == 0) {
            setError("error found");
            setResult([]);
        }
        else {
            setResult(data);
            setError("");
        }
    }


    const deleteTeacher = async (id) => {
        const del = await fetch(`/staff/deletestaff/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }
        })
        const deloutput = await del.json();
        if (deloutput.status === 404 && !deloutput)
            console.log("error");

        else {
            console.log("delelted successfully");
            handleClose();
            setResult([]);
            window.location.reload();

        }
    }

    return (<>
        <div id='student_details_form'>
            <div className='container'>
                <h2>Teacher Details</h2>
                <form method='GET' >
                    <div className="row">
                        <div className="col">
                            <label>Id No</label>
                            <input type="text" className="form-control" placeholder="Id No" name="idno" onChange={handleInput} value={teacher.idno} />
                        </div>


                    </div>
                    <div className="row">
                        <div className="col">
                            <button className='button_search' onClick={submitInfo}>Search</button>
                        </div>
                    </div>
                </form>
                <div>
                {error.length != 0 && <div className='err' >Student doesn't Exist</div>}
                    <MDBTable>
                        <MDBTableHead dark>
                            <tr>
                                <th scope='col'>Id No</th>
                                <th scope='col'>Joining Date</th>
                                <th scope='col'>Teacher Name</th>
                                <th scope='col'>Father's Name</th>
                                <th scope='col'>Salary</th>
                                <th scope='col'>Mobile No</th>
                                <th scope='col'>Update</th>
                                <th scope='col'>Delete</th>
                            </tr>
                        </MDBTableHead>
                        {result.length != 0 && <MDBTableBody>
                            {
                                result.map((element, id) => {
                                    return (
                                        <>

                                            <tr>
                                                <td>{element.idno}</td>
                                                <td>{element.createdAt && element.createdAt.substring(0, 10)}</td>
                                                <td>{element.firstname}</td>
                                                <td>{element.fathername}</td>
                                                <td>{element.salary}</td>
                                                <td >{element.mobileno}</td>
                                                <td>{Object.keys(element) != 0 && <NavLink to={`/staff/edit/${element._id}`}><button className='btn btn-success'><i class="fa-solid fa-pen"></i></button></NavLink>}</td>
                                                {/* <td>{Object.keys(element) != 0 && <button className='btn btn-danger' ><i class="fa-solid fa-trash-can"></i></button>}</td> */}
                                                <td><Button onClick={handleShow}
                                                    className='btn btn-danger' ><i class="fa-solid fa-trash-can"></i>
                                                </Button>
                                                    <Modal show={show} onHide={handleClose}>
                                                        <Modal.Header closeButton>
                                                            {/* <Modal.Title></Modal.Title> */}
                                                        </Modal.Header>
                                                        <Modal.Body style={{ "font-weight": "bolder" }}>Are you want to delete the student ?</Modal.Body>



                                                        <Modal.Footer>
                                                            <Button variant="secondary" onClick={handleClose}>
                                                                Cancel
                                                            </Button>
                                                            <Button variant="primary" onClick={() => { deleteTeacher(element._id) }}>
                                                                Delete
                                                            </Button>
                                                        </Modal.Footer>
                                                    </Modal></td>
                                            </tr>
                                        </>
                                    )
                                })
                            }

                        </MDBTableBody>
                        }

                    </MDBTable>


                </div>
            </div>
        </div>
    </>);
}
export default StaffInfo;