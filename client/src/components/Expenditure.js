import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";

const Expenditure = () => {

    const navigate = useNavigate();

    const [result, setResult] = useState([]);
    const [error, setError] = useState("");
    const [amounts, setAmount] = useState(0);
    const [inputs, SetInput] = useState({
        date: "", amount: "", description: ""
    });

    let name, value;
    const inputHandle = (e) => {
        name = e.target.name;
        value = e.target.value;
        SetInput({ ...inputs, [name]: value });
    }
    const addItem = async (e) => {
        e.preventDefault();
        const { date, amount, description } = inputs;

        const expData = await fetch('/expenditure', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                date, amount, description
            })
        })
        const res = await expData.json();
        getList();
    }


    const getAmount = () => {
        var sum = result.reduce((acc, curval) => {
            return acc + curval.amount;
        }, 0);
        setAmount(sum);
    }


    useEffect(() => {
        getAmount();
    }, [result])


    useEffect(() => {
        getList();
    }, [])


    const getList = async () => {
        const expList = await fetch('/expenditure', {
            method: "GET",
            header: {
                "Content-Type": " application/json"
            }
        });

        const list = await expList.json();
        try {
            if (list) {
                setResult(list);
            }
        } catch (err) {
            console.log(err);

        }
    }


    const deleteitem = async (id) => {
        const delExp = await fetch(`/expenditure/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (delExp) {
            getList();
        }
    }


    return (<>
        <div className='container'>
            <h1 className='mt-4'> Monthly Expenditure List</h1>
            <form method='POST'>
                <div className='row'>
                    <div className="col">
                        <label>Date{inputs.date.length == 0 && <span style={{ "color": "red", "font-weight": "bolder" }}>*</span>}</label>
                        <input type="date" className="form-control" placeholder="" name="date" onChange={inputHandle} value={inputs.date} />
                    </div>

                    <div className="col">
                        <label>Amount{inputs.amount.length == 0 && <span style={{ "color": "red", "font-weight": "bolder" }}>*</span>}</label>
                        <input type="number" className="form-control" placeholder="0" name="amount" onChange={inputHandle} value={inputs.amount} />
                    </div>
                </div>
                <div className='row'>
                    <div className="col">
                        <label>Description{inputs.description.length == 0 && <span style={{ "color": "red", "font-weight": "bolder" }}>*</span>}</label>
                        <input type="textarea" className="form-control" placeholder="Description" name="description" onChange={inputHandle} value={inputs.description} />
                    </div>
                </div>
                <div className='row'>
                    <div className="col">
                        <button id='add-btn' onClick={addItem}>Add</button>
                    </div>
                </div>
            </form>
            <div>
                <MDBTable bordered>
                    <MDBTableHead dark>
                        <tr>
                            <th scope='col'>S.No</th>
                            <th scope='col'>Date</th>
                            <th scope='col'>Description</th>
                            <th scope='col'>Amount</th>
                            <th scope='col'>Delete</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {
                            result.map((element, id) => {
                                return (
                                    <>
                                        <tr>
                                            <td>{id + 1}</td>
                                            <td>{element.date}</td>
                                            <td>{element.description}</td>
                                            <td>{element.amount}</td>
                                            <td><button className='btn btn-danger' onClick={() => { deleteitem(element._id) }} ><i class="fa-solid fa-trash-can"></i></button></td>
                                        </tr>
                                    </>
                                )
                            })
                        }

                        <tr>
                            <td colSpan={3} style={{ "textAlign": "center", "font-weight": "bolder" }} >Total Amount</td>
                            <td>{amounts}</td>
                        </tr>
                    </MDBTableBody>
                </MDBTable>

            </div>
        </div>
    </>)
}
export default Expenditure;