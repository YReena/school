import React, { useState, useEffect } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

const StaffList = () => {
    const [getTeacher, setGetTeaher] = useState([]);


    const Teacher = async () => {
        const res = await fetch('/staff', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        const teacher = await res.json();
        setGetTeaher(teacher);

    }
    useEffect(() => {
        Teacher();
    }, [])


    return (<>
        <div className='form'>
            <div className='container'>
                <h2 className='mt-4'>Staff List</h2>
                <MDBTable>
                    <MDBTableHead dark>
                        <tr>
                            <th scope='col'>S.No</th>
                            <th scope='col'>Id No</th>
                            <th scope='col'>Joining Date</th>
                            <th scope='col'>Teacher Name</th>
                            <th scope='col'>Father's Name</th>
                            <th scope='col'>Salary</th>
                            <th scope='col'>Mobile No</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {getTeacher.map((element, id) => {
                            return (<>
                                <tr>
                                    <td>{id+1}</td>
                                    <td>{element.idno}</td>
                                    <td>{element.createdAt && element.createdAt.substring(0, 10)}</td>
                                    <td>{element.firstname}</td>
                                    <td>{element.fathername}</td>
                                    <td>{element.salary}</td>
                                    <td >{element.mobileno}</td>
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
export default StaffList;