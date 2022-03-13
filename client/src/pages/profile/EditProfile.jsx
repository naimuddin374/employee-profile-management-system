import React from 'react';
import { Context } from '../../store/Context';
import axios from '../../util/axios'





const EditProfile = ({ submitSuccess, profile }) => {
    const [user] = React.useContext(Context)
    const [name, setName] = React.useState(null)
    const [phone, setPhone] = React.useState(null)
    const [address, setAddress] = React.useState(null)

    React.useEffect(() => {
        setName(profile.name)
        setPhone(profile.phone)
        setAddress(profile.address)
    }, [profile])


    async function submitHandler() {
        if (!name || !phone || !address) {
            alert('Please provide required data')
            return;
        }


        try {
            const { data } = await axios.put(`/users/${profile._id}`, { name, phone, address }, { headers: { 'Authorization': user.token } });
            console.log(data)
            alert(data.message);
            submitSuccess()
        } catch (err) {
            alert('Something went wrong!')
            console.error('err', err)
        }
    }






    return (
        <div>
            <p>Update profile info</p>
            <input
                type="text"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
                placeholder='Name'
            /><br />
            <input
                type="text"
                value={phone}
                required
                onChange={(e) => setPhone(e.target.value)}
                placeholder='Phone'
            /><br />
            <input
                type="text"
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}
                placeholder='Address'
            /><br />
            <button type="button" onClick={() => submitHandler()}>Update</button><br />
            <button type="button" onClick={() => submitSuccess()}>Close</button>
        </div>
    )
}
export default EditProfile