import React, { useState, useEffect } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { Grid } from '@mui/material';
import logon from '../sahil.jpg';
import Downloadpage from './Downloadpage';

const Report = () => {

    const [Subject, setSubject] = useState([]);
    const [getStudent, setGetStudent] = useState({});
    const [Grade, setGrade] = useState({});
    const [student, setStudent] = useState({
        admissionno: ""
    });
    const [firstSem, setFirstSem] = useState([]);
    const [secondSem, setSecondSem] = useState([]);
    const [thirdSem, setThirdSem] = useState([]);
    const [tsum, setTsum] = useState(0);
    const [fsum, setFsum] = useState(0);
    const [ssum, setSsum] = useState(0);
    const [thsum, setThsum] = useState(0);
    let marksobj = {};

    let name, value;
    const handleInput = (e) => {
        name = e.target.name;
        value = e.target.value;
        setStudent({ ...student, [name]: value });
    }

    const searchInfo = async (e) => {
        e.preventDefault();
        const response = await fetch(`/student/${student.admissionno}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })
        const studentresult = await response.json();
        if (studentresult.status !== 204) {
            setGetStudent(studentresult[0]);
            setGrade(studentresult[0].grade);
        }
    }



    const getSubjectData = async () => {
        console.log("inside getsubjectdata")
        const sub = await fetch(`/subject/${Grade}`, {
            method: 'GET'
        });

        const subList = await sub.json();
        setSubject(subList);

    }

    useEffect(() => {
        getSubjectData();
    }, [Grade]);




    const countTimer = setInterval(() => {
        let count = 0;
        count = count + 1;

        if (count == 1) {
            clearInterval(countTimer);
        }
        Firstsem();
        Secondsem();
        Thirdsem();
        totalMarks();
        firstMarks();
        secondMarks();
        thirdMarks();
    }, 1000);



    const Firstsem = async () => {
        const first = await fetch('/firstsem/' + student.admissionno, {
            method: "GET"
        })

        const Sem1 = await first.json();
        if (Sem1.message != 'not found') {
            firstSem.push(Sem1);
            console.log(firstSem);
        }
    }


    const Secondsem = async () => {
        const second = await fetch('/secondsem/' + student.admissionno, {
            method: "GET"
        })

        const Sem2 = await second.json();
        if (Sem2.message != 'not found') {
            secondSem.push(Sem2);
            console.log(Sem2);
        }
    }

    const Thirdsem = async () => {
        const third = await fetch('/thirdsem/' + student.admissionno, {
            method: "GET"
        })

        const Sem3 = await third.json();
        if (Sem3.message != 'not found') {
            thirdSem.push(Sem3);
            console.log(Sem3);
        }
    }


    /*------------------------------------percentage part ---------------------------*/

    const totalMarks = () => {
        const sum = Subject.reduce((acc, curr) => {
            return (acc + parseInt(curr.smarks));
        }, 0)
        setTsum(sum);
    }

    const firstMarks = () => {

        let firstMarksObtained = Object.values(firstSem.length != 0 ? firstSem[0].firstsem : marksobj)
        console.log(firstMarksObtained);
        const firstSum = firstMarksObtained.reduce((acc, curr) => {
            return acc + parseInt(curr);
        }, 0);
        setFsum(firstSum);
    }


    const secondMarks = () => {

        let firstMarksObtained = Object.values(secondSem.length != 0 ? secondSem[0].secsem : marksobj)
        const Sum = firstMarksObtained.reduce((acc, curr) => {
            return acc + parseInt(curr);
        }, 0);
        setSsum(Sum);
    }

    const thirdMarks = () => {

        let firstMarksObtained = Object.values(thirdSem.length != 0 ? thirdSem[0].thirdsem : marksobj)
        const Sum = firstMarksObtained.reduce((acc, curr) => {
            return acc + parseInt(curr);
        }, 0);
        setThsum(Sum);
    }




    return (<>
        <div className='container' id='download'>
            <div className='box-border'>
                <div className='title-box'>
                    <Grid container>
                        <Grid item xs={3}>
                            <div className="sidebar-header school_logon">
                                <img src={logon} alt='pic' id="img" />
                            </div>
                        </Grid>
                        <Grid item xs={9}>
                            <h2 id='school-title'>Little Hands Play School</h2>
                            <h4>Gali no 1, Chanchal Park, Ranhola, Delhi 110041</h4>
                            <p>Phone : 9953940313   Email : newlittlehandplayschool@gmail.com</p>
                        </Grid>
                    </Grid>
                </div>
                {getStudent && <div>
                    < div>
                        <h3 id="report-card">Report Card (Session : {getStudent.session})</h3>
                    </div>
                    <div className='content-margin'>
                        <div className="row ">
                            <div className="col">
                                <label>Admission No</label>
                                <input type="text" className="form-control" placeholder="Admission No" name="admissionno" value={student.admissionno} onChange={handleInput} />
                            </div>

                            {Object.keys(getStudent) == 0 ?
                                <div className="col">
                                    <button className='button_search' onClick={searchInfo}>Search</button>
                                </div>
                                :
                                <div className="col">
                                    <label>Student Name</label>
                                    <input type="text" className="form-control" placeholder="Student Name" name="firstname" value={getStudent.firstname} />

                                </div>
                            }
                        </div>

                        {getStudent && <div>

                            <div className="row">
                                <div className="col">
                                    <label>Grade</label>
                                    <input type="text" className="form-control" placeholder="Grade" name="grade" value={getStudent.grade} />
                                </div>
                                <div className="col">
                                    <label>Gender</label>
                                    <input type="text" className="form-control" placeholder="Gender" name="gender" value={getStudent.gender} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label>Father's Name</label>
                                    <input type="text" className="form-control" placeholder="Father's name" name="fathername" value={getStudent.fathername} />
                                </div>
                                <div className="col">
                                    <label>Mother's Name</label>

                                    <input type="text" className="form-control" placeholder="Mother's Name" name="mothername" value={getStudent.mothername} />
                                </div>
                            </div>
                        </div>}

                        <Grid container>
                            <Grid item xs={3}>
                                <MDBTable>
                                    <MDBTableHead dark>
                                        <tr>
                                            <th>Subject</th>
                                        </tr>
                                    </MDBTableHead>
                                    <MDBTableBody className='report-table-border'>
                                        {Subject.length != 0 && <div>
                                            {Subject.length != 0 && Subject.map((ele, id) => {
                                                return (
                                                    <tr>
                                                        <td>
                                                            <input type="text" className="form-control" placeholder="0" name="subject" value={ele.subject} disabled style={{ "margin-bottom": "0px" }} />

                                                        </td>
                                                    </tr>

                                                );

                                            })}
                                            <tr>
                                                <td className="marks-bold"><input type="text" className="form-control" placeholder="0" style={{ "margin-bottom": "0px" }} value={tsum} disabled /></td>
                                            </tr>
                                            <tr>
                                                <td className="marks-bold"><input type="text" className="form-control" placeholder="0" style={{ "margin-bottom": "0px" }} value="Percentage %" disabled /></td>
                                            </tr>
                                        </div>}
                                    </MDBTableBody>

                                </MDBTable>
                            </Grid>
                            <Grid item xs={3}>
                                <MDBTable>
                                    <MDBTableHead dark>
                                        <tr>
                                            <th>First Semester</th>
                                        </tr>
                                    </MDBTableHead>

                                    <MDBTableBody className='report-table-border'>
                                        {Object.keys(firstSem).length != 0 && <div>

                                            {Object.keys(firstSem).length != 0 && Subject.map((ele, id) => {
                                                const mrks = firstSem[0]
                                                return (
                                                    <tr>
                                                        <td>
                                                            <input type="text" className="form-control" placeholder="0" style={{ "margin-bottom": "0px" }} name={ele.subject} value={mrks.firstsem[ele.subject]} />

                                                        </td>

                                                    </tr>

                                                );

                                            })}
                                            <tr>
                                                <td className="marks-bold"><input type="text" className="form-control" placeholder="0" style={{ "margin-bottom": "0px" }} value={fsum} /></td>
                                            </tr>
                                            <tr>
                                                <td className="marks-bold"><input type="text" className="form-control" placeholder="0" style={{ "margin-bottom": "0px" }} value={(fsum / tsum * 100).toFixed(2)} /></td>
                                            </tr>
                                        </div>
                                        }
                                    </MDBTableBody>

                                </MDBTable>
                            </Grid>
                            <Grid item xs={3}>
                                <MDBTable>
                                    <MDBTableHead dark>
                                        <tr>
                                            <th>Second Semester</th>
                                        </tr>
                                    </MDBTableHead>
                                    <MDBTableBody className='report-table-border'>
                                        {Object.keys(secondSem).length != 0 && <div>
                                            {Object.keys(secondSem).length != 0 && Subject.map((ele, id) => {
                                                const mrksec = secondSem[0]
                                                return (
                                                    <tr>
                                                        <td>
                                                            <input type="text" className="form-control" placeholder="0" style={{ "margin-bottom": "0px" }} name={ele.subject} value={mrksec.secsem[ele.subject]} />
                                                        </td>
                                                    </tr>

                                                );

                                            })}
                                            <tr>
                                                <td className="marks-bold"><input type="text" className="form-control" placeholder="0" style={{ "margin-bottom": "0px" }} value={ssum} /></td>
                                            </tr>
                                            <tr>
                                                <td className="marks-bold"><input type="text" className="form-control" placeholder="0" style={{ "margin-bottom": "0px" }} value={(ssum / tsum * 100).toFixed(2)} /></td>
                                            </tr>
                                        </div>}

                                    </MDBTableBody>


                                </MDBTable>
                            </Grid>
                            <Grid item xs={3}>
                                <MDBTable>
                                    <MDBTableHead dark>
                                        <tr>
                                            <th>Third Semester</th>

                                        </tr>
                                    </MDBTableHead>
                                    <MDBTableBody className='report-table-border'>
                                        {Object.keys(thirdSem).length != 0 && <div>
                                            {Object.keys(thirdSem).length != 0 && Subject.map((ele, id) => {
                                                const mrkthird = thirdSem[0]
                                                return (
                                                    <tr>
                                                        <td>
                                                            <input type="text" className="form-control" placeholder="0" style={{ "margin-bottom": "0px" }} name={ele.subject} value={mrkthird.thirdsem[ele.subject]} />
                                                        </td>
                                                    </tr>

                                                );

                                            })}
                                            <tr>
                                                <td className="marks-bold"> <input type="text" className="form-control" placeholder="0" style={{ "margin-bottom": "0px" }} value={thsum} /></td>
                                            </tr>
                                            <tr>
                                                <td className="marks-bold"><input type="text" className="form-control" placeholder="0" style={{ "margin-bottom": "0px" }} value={(thsum / tsum * 100).toFixed(2)} /></td>
                                            </tr>
                                        </div>}
                                    </MDBTableBody>

                                </MDBTable>
                            </Grid>

                            <Grid item xs={6}>
                                <label className="remark">Remarks</label><br />
                                <textarea name="w3review" rows="4" cols="40"></textarea>
                            </Grid>
                            <Grid item xs={6}>
                                <label className="remark">Status</label><br />
                                <textarea name="w3review" rows="4" cols="40"></textarea>
                            </Grid>
                            <Grid item xs={6}>
                                <textarea className='sign-border' rows="4" cols="40"></textarea><br />
                                <label className="remark">Class Teacher</label>
                            </Grid>
                            <Grid item xs={6}>
                                <textarea className='sign-border' rows="4" cols="40"></textarea><br />
                                <label className="remark">Principal</label>
                            </Grid>

                        </Grid>

                    </div>

                    <Downloadpage rootElementId={"download"} downloadFileName="Report" />
                </div>}
                {!getStudent && <div className='err'>Student doesn't Exist </div>}
            </div>

        </div>
    </>);
}
export default Report;