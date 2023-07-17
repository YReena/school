import React, { useEffect, useState } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { Grid } from '@mui/material';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const AcademicDetails = () => {
    const [Subject, setSubject] = useState([]);
    const [getStudent, setGetStudent] = useState({});
    const [Grade, setGrade] = useState({});
    const [student, setStudent] = useState({
        admissionno: ""
    });

    const [marks, setMarks] = useState({
        admissionno: "", firstsem: {}

    });
    let navigate = useNavigate();
    const [error, setError] = useState("");

    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        navigate('/');
    }
    const handleShow = (e) => {
        submitMarks (e);
        setShow(true);}

    let name, value;
    const handleInput = (e) => {
        name = e.target.name;
        value = e.target.value;
        setStudent({ ...student, [name]: value });

    }
    useEffect(() => {
        getData();
    }, [Grade]);


    var admissionnos = student.admissionno;

    const searchInfo = async (e) => {
        e.preventDefault();
        const response = await fetch('/student/' + student.admissionno, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })

        const data = await response.json();
        if (!data) {
            window.alert("not found");
        }
        else {
            setGetStudent(data[0]);
            setGrade(data[0].grade);
        }
    }

    const getData = async () => {
        const sub = await fetch(`/subject/${Grade}`, {
            method: 'GET'
        });

        const subList = await sub.json();
        setSubject(subList);
    }



    let names, values
    const handlemarks = (e) => {
        names = e.target.name;
        values = e.target.value;
        setMarks({
            ...marks,
            ...marks.admissionno,
            admissionno: admissionnos,
            firstsem: {
                ...marks.firstsem,
                [names]: values,
            },
        });
    }

    const submitMarks = async (e) => {
        e.preventDefault();
        const { admissionno, firstsem } = marks;
        const marksAdd = await fetch('/firstsem', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                admissionno, firstsem
            })
        })
        const result = await marksAdd.json();
        if (result.status == 201) {
            alert("Add marks sucessfully !!..");
            console.log("addd sucessfully");
            window.location.reload();
        }



    }





    return (<>
        <div className='form'>
            <div className='container'>
                <h2>Academic Details</h2>
                <form method='POST' >
                    <div className="row">
                        <div className="col">
                            <label>Admission No</label>
                            <input type="text" className="form-control" placeholder="Admission No" name="admissionno" value={student.admissionno} onChange={handleInput} />
                        </div>

                    </div>
                    <div className="row">
                        <div className="col">

                        </div>
                        <div className="col">
                        </div>
                        <div className="col">
                            <button className='button_search' onClick={searchInfo}>Search</button>
                        </div>
                    </div>
                    {!getStudent && <div className='err'>Student doesn't Exist </div>}

                    {getStudent && <div>
                        <div className='row'>
                            <div className="col">
                                <label>Name</label>
                                <input type="text" className="form-control" placeholder="name" name="name" value={getStudent.firstname} disabled />

                            </div>

                            <div className="col">
                                <label>Grade</label>
                                <input type="text" className="form-control" placeholder="Grade" name="grade" disabled value={getStudent.grade} />
                            </div>

                        </div>

                    </div>}
                    <div>
                        <h3 className='sem-name'>First Semester</h3>
                        <Grid container>
                            <Grid item xs={4}>
                                <MDBTable>
                                    <MDBTableHead dark>
                                        <tr>
                                            <th>Subject</th>
                                        </tr>
                                    </MDBTableHead>
                                    <MDBTableBody>
                                        {Subject.map((ele, id) => {
                                            return (
                                                <tr>
                                                    <td>
                                                        <input type="text" className="form-control" placeholder="0" name="subject" value={ele.subject} disabled style={{ "margin-bottom": "0px" }} />
                                                    </td>
                                                </tr>

                                            );

                                        })}
                                    </MDBTableBody>

                                </MDBTable>
                            </Grid>
                            <Grid item xs={8}>
                                <MDBTable>
                                    <MDBTableHead dark>
                                        <tr>
                                            <th> Total Marks</th>
                                            <th>Marks Obtained</th>

                                        </tr>
                                    </MDBTableHead>
                                    <MDBTableBody>
                                        {Subject.map((ele, id) => {
                                            return (
                                                <tr>
                                                    <td>
                                                        <input type="text" className="form-control" placeholder="marks" name="" value={ele.smarks} disabled style={{ "margin-bottom": "0px" }} />
                                                    </td>
                                                    <td>
                                                        <input type="text" className="form-control" placeholder="0" style={{ "margin-bottom": "0px" }} onChange={handlemarks} value={marks.firstsem[ele.subject]} name={ele.subject} />
                                                    </td>
                                                </tr>

                                            );

                                        })}
                                    </MDBTableBody>

                                </MDBTable>
                                {Subject.length != 0 && <div>
                                    {/* {Subject.length != 0 && <button className='button_search' onClick={submitMarks} >Submit</button>} */}
                                    <Button className='btn-color' onClick={handleShow}>
                                        Submit
                                    </Button>
                                    <Modal show={show} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                            <Modal.Title></Modal.Title>
                                        </Modal.Header>
                                        {error.length == 0 && <Modal.Body style={{ "font-weight": "bolder" }}>Information Submit Successfully</Modal.Body>}
                                        {error.length != 0 && <Modal.Body style={{ "color": "red", "font-weight": "bolder" }}>Please fill mandatory fields</Modal.Body>}
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
                                </div>}
                            </Grid>

                        </Grid>
                    </div>
                </form>
            </div>
        </div>


    </>);

}
export default AcademicDetails;