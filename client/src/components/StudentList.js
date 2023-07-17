import React, { useState, useEffect } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";

const StudentList = () => {
    const navigate = useNavigate();
    const [getstudent, setGetStudent] = useState([]);
    const Student = async () => {
        const res = await fetch('/student', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization : localStorage.getItem('token')
            }
        })

        const stud = await res.json(res);
        if(stud.message == "please provide valid token"){
            navigate("/login");
        }
        else{
            setGetStudent(stud);
        } 

    }
    useEffect(()=>{
       Student();
    },[])


    return (<>
        <div className='form'>
            <div className='container'>
                <h2 className='mt-4'>Student List</h2>
                <MDBTable>
                    <MDBTableHead dark>
                        <tr>
                            <th scope='col'>S.No</th>
                            <th scope='col'>ADM No</th>
                            <th scope='col'> ADM Date</th>
                            <th scope='col'>Student Name</th>
                            <th scope='col'>Father Name</th>
                            <th scope='col'>Grade</th>
                            <th scope='col'>Mobile No</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {  Object.keys(getstudent).length != 0 && getstudent.map((ele, id) => {
                            return (<>
                                <tr>
                                    <td>{id + 1}</td>
                                    <td>{ele.admissionno}</td>
                                    <td>{ele.createdAt && ele.createdAt.substring(0, 10)}</td>
                                    <td>{ele.firstname + ' ' + ele.lastname}</td>
                                    <td>{ele.fathername}</td>
                                    <td>{ele.grade}</td>
                                    <td>{ele.mobileno}</td>
                                </tr>

                            </>)
                        })
                        }

                    </MDBTableBody>
                </MDBTable>
            </div>
        </div>
    </>);
}

export default StudentList;