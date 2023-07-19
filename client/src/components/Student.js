import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { Modal, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const Student = () => {
    const headerAuth = useSelector((state)=>state.studentredux.header)
    const [result, setResult] = useState([]);
    const [show, setShow] = useState(false);
    const [error, setError] = useState("");
    const [studentresult, setStudentResult] = useState({
        admissionno: ""
    });
    let name, value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;
        setStudentResult({ ...studentresult, [name]: value });
    }

    const handleClose = () => {
        setShow(false);
    }
    const handleShow = (e) => {
        setShow(true);
    }

    const search = async (e) => {
        e.preventDefault();
        const response = await fetch('/student/' + studentresult.admissionno, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
               // authorization : localStorage.getItem('token')
                  authorization : headerAuth
            }
        })

        const data = await response.json();
        if (data.length == 0) {
            setError("error found");
            setResult([]);
        }
        else {
            setResult(data);
            setError("");
        }
    }

    const deleteStudent = async (id) => {
        const del = await fetch(`student/deletestudent/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                authorization : headerAuth
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
                <h2>Student Details</h2>
                <form method='GET' >
                    <div className="row">
                        <div className="col">
                            <label>Admission No</label>
                            <input type="text" className="form-control" placeholder="Admission No" name="admissionno" value={studentresult.admissionno} onChange={handleInputs} />
                        </div>


                    </div>
                    <div className="row">
                        <div className="col">
                            <button className='button_search' onClick={search}>Search</button>
                        </div>
                    </div>
                </form>
                <div>
                    {error.length != 0 && <div className='err' >Student doesn't Exist</div>}
                    <MDBTable>
                        <MDBTableHead dark>
                            <tr>
                                <th scope='col'>ADM No</th>
                                <th scope='col'>ADM Date</th>
                                <th scope='col'>Student Name</th>
                                <th scope='col'>Father's Name</th>
                                <th scope='col'>Grade</th>
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
                                                <td>{element.admissionno}</td>
                                                <td>{element.createdAt && element.createdAt.substring(0, 10)}</td>
                                                <td>{element.firstname + ' ' + element.lastname}</td>
                                                <td>{element.fathername}</td>
                                                <td>{element.grade}</td>
                                                <td >{element.mobileno}</td>
                                                <td><NavLink to={`/student/edit/${element._id}`}><button className='btn btn-success'><i class="fa-solid fa-pen"></i></button></NavLink></td>
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
                                                            <Button variant="primary" onClick={() => { deleteStudent(element._id) }}>
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
export default Student;