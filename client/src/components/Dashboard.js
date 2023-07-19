import React, { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Dashboard = () => {
    const [studCount, setStudCount] = useState(0);
    const [teachCount, setTeachCount] = useState(0);
    const [amount, setAmount] = useState(0);
    const [explist, setExpList] = useState([]);

    const headerAuth =  useSelector((state)=>state.studentredux.header);

    const getStudent = async () => {
        const res = await fetch('/student', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
               // Authorization : localStorage.getItem('token')
                  authorization: headerAuth
            }
        })

        const Ts = await res.json(res);
        setStudCount(Ts.length);

    }

    const getTeacher = async () => {
        const res = await fetch('/staff', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        const teacher = await res.json();
        setTeachCount(teacher.length);

    }

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
                setExpList(list);
            }
        } catch (err) {
            console.log(err);

        }
    }


    const getAmount = () => {
        var sum = explist.reduce((acc, curval) => {
            return acc + curval.amount;
        }, 0);
        setAmount(sum);
    }


    useEffect(() => {
        getAmount();
    }, [explist]);

    useEffect(() => {
        getStudent();
        getTeacher();
        getList();
    }, []);

    return (<>
        <div className='dashboard'>
            <div className='dashboard_box'>
                <Link
                    to='/dashboard/studentlist'>
                    <div id='Dbox1'>
                        <div>Students</div>
                        <div><h1>{studCount}</h1></div>
                    </div>
                </Link>
                <Link to='/dasboard/stafflist'>
                    <div id='Dbox2'>
                        <div>Staff</div>
                        <div><h1>{teachCount}</h1></div>
                    </div>
                </Link>

                <Link
                    to='/dashboard/expenditure'>
                    <div id='Dbox4'>
                        Expenditure
                        <div><h1>{amount}</h1></div>
                    </div>
                </Link>

                {/* <div id='Dbox5'>Add Events</div> */}

            </div>
            <div className='Dashboard-box2'>
                <div className='row' id='list-area'>
                    <div className='col'>
                        <div></div>
                    </div>
                    <div className='col'>
                        <div></div>
                    </div>
                </div>
            </div>

        </div>

    </>);
}
export default Dashboard;