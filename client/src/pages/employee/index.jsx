import { useRouter } from 'next/router';
import React from 'react';
import { Context } from '../../store/Context';
const { Table } = require("reactstrap");
import axios from '../../util/axios'


const Employee = () => {
    const [data, setData] = React.useState([])
    const [user] = React.useContext(Context)
    const router = useRouter()


    React.useEffect(() => {
        if (Object.keys(user).length === 0) {
            router.push('/login')
            return;
        }
        getData()
    }, [])


    async function getData() {
        try {
            const { data } = await axios.get(`/users`, { headers: { 'Authorization': user.token } });
            setData(data.data)
        } catch (err) {
            alert('Something went wrong!')
            console.error('err', err.response)
        }
    }


    function userRole(role) {
        if (role === 1) {
            return 'Employee';
        }
        else if (role === 2) {
            return 'Company Administrator';
        }
        else {
            return 'Administrator';
        }
    }


    async function activeUser(userId) {
        try {
            const { data } = await axios.get(`users/active/inactive/${userId}?status=1`, { headers: { 'Authorization': user.token } });
            console.log(data)
            alert(data.message)
            getData()
        } catch (err) {
            alert('Something went wrong!')
            console.error('err', err.response)
        }
    }
    async function inactiveUser(userId) {
        try {
            const { data } = await axios.get(`users/active/inactive/${userId}?status=0`, { headers: { 'Authorization': user.token } });
            console.log(data)
            alert(data.message)
            getData()
        } catch (err) {
            alert('Something went wrong!')
            console.error('err', err.response)
        }
    }

    console.log('user', user)

    return (
        <div>
            <div className='d-flex justify-content-between mt-2'>
                <h3>List of Employee</h3>
            </div>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length !== 0 && data.map((item, i) =>
                        <tr key={item._id}>
                            <th scope="row">{++i}</th>
                            <td>{item.userId.name}</td>
                            <td>{item.userId.email}</td>
                            <td>{item.phone}</td>
                            <td>{item.address}</td>
                            <td>{userRole(item.userId.role)}</td>
                            <td>
                                {item.userId.status === 1 ? <button onClick={() => inactiveUser(item.userId._id)}>Inactive</button> : <button onClick={() => activeUser(item.userId._id)}>Active</button>}

                            </td>
                        </tr>)}
                </tbody>
            </Table>
        </div>
    )
}
export default Employee;