import React from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import { Context } from '../../store/Context';
import axios from '../../util/axios'


const CompanyForm = (props) => {
    const [name, setName] = React.useState(null)
    const [email, setEmail] = React.useState(null)
    const [password, setPassword] = React.useState(null)
    const [phone, setPhone] = React.useState(null)
    const [address, setAddress] = React.useState(null)

    const [user] = React.useContext(Context)




    const submitHandler = async (e) => {
        e.preventDefault();
        const obj = {
            name, email, phone, address, password
        }
        try {
            const { data } = await axios.post(`/companies`, obj, { headers: { 'Authorization': user.token } })
            alert(data.message)
            console.log(data)
            props.submitSuccess()
        } catch (err) {
            alert('Something went wrong!')
            console.error('err', err)
        }


    }

    return (
        <div>
            <h4>Add new company</h4>
            <Form onSubmit={submitHandler}>
                <FormGroup>
                    <Input
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Enter Name'
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Input
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Enter Email'
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Input
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Enter Password'
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Input
                        type='text'
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder='Enter Phone'
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Input
                        type='text'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder='Enter address'
                        required
                    />
                </FormGroup>
                <Button type="submit">Submit</Button>
                <Button type='reset'>Reset</Button>
                <Button type='button' onClick={() => props.submitSuccess()}>Close</Button>
            </Form>
        </div>
    )
}
export default CompanyForm;