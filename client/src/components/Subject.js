import React, { useState } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

const Subject = () => {
    const [getSubject, setGetSubject] = useState([]);

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const [Subject, setSubject] = useState({
        grade: "", subject: "", smarks:""
    });
    let value, name;
    const inputHandle = (e) => {
        name = e.target.name;
        value = e.target.value;
        setSubject({ ...Subject, [name]: value });
    }

    const addSubject = async (e) => {
        e.preventDefault();
        const { grade, subject,smarks} = Subject;
        const res = await fetch('/subject', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                grade, subject , smarks
            })
        });

        const result = await res.json();
        if (result.message) {
            setMessage(result.message);
            setError();
        }
        else {
            setError(result.error);
            setMessage();
        }
        getData();

    }

    const getData = async () => {
        const sub = await fetch('/subject/' + Subject.grade, {
            method: 'GET'
        });

        const subList = await sub.json();
        setGetSubject(subList);

    }
    const deleteSubject = async(id)=>{
        const del = await fetch(`/subject/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }
        })
        const delSub = await del.json();
        if(delSub){
          getData();
        }
    }

    return (<>
        <div className='add-subject-form'>

            <div className='container'>

                <form method='POST'>
                    <h1 id='add-sub-handling'>Add Subject</h1>
                    <div className='row'>
                        <div className="col">
                            <label>Grade{Subject.grade.length == 0 && <span style={{ "color": "red", "font-weight": "bolder" }}>*</span>}</label>
                            <select id="inputgrade" class="form-control" name='grade' value={Subject.grade} onChange={inputHandle}>
                                <option >Grade</option>
                                <option value="Nursary">Nursary</option>
                                <option value="LKG">LKG</option>
                                <option value="UKG">UKG</option>
                            </select>
                        </div>
                        <div className="col">
                        <label>Marks{Subject.smarks.length == 0 && <span style={{ "color": "red", "font-weight": "bolder" }}>*</span>}</label>
                            <input type="text" className="form-control" placeholder="Marks" name="smarks" value={Subject.smarks} onChange={inputHandle} />
                        </div>
                        <div className="col">
                            <label>Subject Name{Subject.subject.length == 0 && <span style={{ "color": "red", "font-weight": "bolder" }}>*</span>}</label>
                            <input type="text" className="form-control" placeholder="Subject Name" name="subject" value={Subject.subject} onChange={inputHandle} />
                        </div>

                    </div>
                    <div className='row'>
                        <div className="col">
                            <button id='add-btn' onClick={addSubject}>Add</button>
                        </div>

                        <div className='error-div'>
                            {message === "error" ? <p className='error-display'>*{error} </p> : <p className='message-display'>{message}</p>}
                        </div>
                    </div>
                </form>
                <div>
                    <MDBTable>
                        <MDBTableHead dark>
                            <tr>
                                <th scope='col'>#</th>
                                <th scope='col'>Grade</th>
                                <th scope='col'>Marks</th>
                                <th scope='col'>Subject</th>
                                <th scope='col'>Delete</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            {getSubject.map((ele, id) => {
                                return (<>
                                    <tr>
                                        <th>{id + 1}</th>
                                        <td>{ele.grade}</td>
                                        <td>{ele.smarks}</td>
                                        <td>{ele.subject}</td>
                                        <td><button className='btn btn-danger' onClick={() => {deleteSubject(ele._id) }}><i class="fa-solid fa-trash-can"></i></button></td>
                                    </tr>
                                </>);

                            })
                            }



                        </MDBTableBody>
                    </MDBTable>
                </div>
            </div>
        </div>
    </>);
}
export default Subject;