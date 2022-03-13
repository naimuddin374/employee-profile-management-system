import React from 'react';
import axios from '../../util/axios'
import { useRouter } from 'next/router'
import { Context } from '../../store/Context';
import Invitation from './Invitation';
import EditProfile from './EditProfile';
import EditCompany from './EditCompany';




const Profile = () => {
    const [user] = React.useContext(Context)

    const [data, setData] = React.useState({})
    const [openForm, setOpenForm] = React.useState(0)

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
            const { data } = await axios.get(`/users/${user._id}`, { headers: { 'Authorization': user.token } });
            setData(data.data)
        } catch (err) {
            alert('Something went wrong!')
            console.error('err', err.response)
        }
    }

    function submitSuccess() {
        setOpenForm(0)
        getData()
    }



    console.log('user', user, data)


    if (Object.keys(data).length === 0) {
        return (
            <div>
                <h3>Welcome to profile page</h3>
            </div>
        )
    }

    return (
        <div>
            <h3>Hi, {data.userId.name}</h3>
            <p>Email: {data.userId.email}</p>
            <p>Phone: {data.phone}</p>
            <p>Address: {data.address}</p>
            <p>Role: {(data.userId.role === 1 && 'Employee') || (data.userId.role === 2 && 'Company Administrator') || (data.userId.role === 3 && 'System Administrator')}</p>

            {data?.companyId && keys(data.companyId).length !== 0 && <>
                <h4>Company Info:</h4>
                <p>Company Name: {data.companyId.name}</p>
            </>}

            <button type='button' onClick={() => setOpenForm(2)}>Edit My Profile</button><br />


            {data.userId.role === 2 &&
                <>
                    <button type='button' onClick={() => setOpenForm(1)}>Invite</button><br />
                    <button type='button' onClick={() => setOpenForm(3)}>Edit Company Info</button><br />
                </>
            }

            {openForm === 1 && <>
                <Invitation submitSuccess={submitSuccess} />
            </>}
            <br />
            {openForm === 2 && <>
                <EditProfile
                    submitSuccess={submitSuccess}
                    profile={{
                        name: data.userId.name,
                        phone: data.phone,
                        address: data.address,
                        _id: data.userId._id
                    }}
                />
            </>}
            <br />
            {openForm === 3 && <>
                <EditCompany
                    submitSuccess={submitSuccess}
                    profile={{
                        name: data.companyId.name,
                        phone: data.companyId.phone,
                        address: data.companyId.address,
                        _id: data.companyId._id
                    }}
                />
            </>}


        </div>
    )
}
export default Profile