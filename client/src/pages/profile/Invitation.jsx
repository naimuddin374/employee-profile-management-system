import React from 'react';
import { Context } from '../../store/Context';
import axios from '../../util/axios'





const Invitation = ({ submitSuccess }) => {
    const [user] = React.useContext(Context)
    const [email, setEmail] = React.useState('')




    async function submitHandler() {
        try {
            const { data } = await axios.post(`/companies/invite`, { email }, { headers: { 'Authorization': user.token } });
            console.log(data)
            alert('Invitation sent successfully!');
            setEmail('')
            submitSuccess()
        } catch (err) {
            alert('Something went wrong!')
            console.error('err', err.response)
        }
    }






    return (
        <div>
            <p>Invite to onboard this company</p>
            <input
                type="email"
                id='email'
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Enter a valid email'
            />
            <button type="button" onClick={() => submitHandler()}>Send</button><br />
            <button type="button" onClick={() => submitSuccess()}>Close</button>
        </div>
    )
}
export default Invitation