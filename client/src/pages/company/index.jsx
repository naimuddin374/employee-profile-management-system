import { useRouter } from 'next/router';
import React from 'react';
import { Context } from '../../store/Context';
const { Table, Button } = require("reactstrap");
import axios from '../../util/axios'
import CompanyForm from './CompanyForm';


const Company = () => {
    const [data, setData] = React.useState([])
    const [isOpen, setIsOpen] = React.useState(false)
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
            const { data } = await axios.get(`/companies`, { headers: { 'Authorization': user.token } });
            setData(data.data)
        } catch (err) {
            alert('Something went wrong!')
            console.error('err', err.response)
        }
    }


    async function activeUser(companyId) {
        try {
            const { data } = await axios.get(`companies/active/inactive/${companyId}?status=1`, { headers: { 'Authorization': user.token } });
            console.log(data)
            alert(data.message)
            getData()
        } catch (err) {
            alert('Something went wrong!')
            console.error('err', err.response)
        }
    }
    async function inactiveUser(companyId) {
        try {
            const { data } = await axios.get(`companies/active/inactive/${companyId}?status=0`, { headers: { 'Authorization': user.token } });
            console.log(data)
            alert(data.message)
            getData()
        } catch (err) {
            alert('Something went wrong!')
            console.error('err', err.response)
        }
    }


    function submitSuccess() {
        setIsOpen(false)
        getData()
    }

    console.log('user', user)

    return (
        <div>
            <div className='d-flex justify-content-between mt-2'>
                <h3>List of Company</h3>
            </div>
            <Button onClick={() => setIsOpen(!isOpen)}>Add New Company</Button>
            {isOpen && <CompanyForm submitSuccess={submitSuccess} />}
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length !== 0 && data.map((item, i) =>
                        <tr key={item._id}>
                            <th scope="row">{++i}</th>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td>{item.address}</td>
                            <td>
                                {item.status === 1 ? <button onClick={() => inactiveUser(item._id)}>Inactive</button> : <button onClick={() => activeUser(item._id)}>Active</button>}
                            </td>
                        </tr>)}
                </tbody>
            </Table>
        </div>
    )
}
export default Company;