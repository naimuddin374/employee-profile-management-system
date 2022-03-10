import React from 'react';
import { Context } from '../../store/Context';
import { useRouter } from 'next/router';
import axios from '../../util/axios'
import { Form, Button, FormGroup, Label, Input } from "reactstrap";
import { setAuthToken } from './../../util/axios';
import jwtDecode from "jwt-decode";



const Login = () => {
    const [user, setUser] = React.useContext(Context)
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')


    const router = useRouter()


    if (Object.keys(user).length !== 0) {
        router.push('/home')
    }

    async function submitHandler(e) {
        e.preventDefault()

        if (!email || !password) {
            alert('Validation failed!')
            return;
        }


        try {
            const { data } = await axios.post('auth/login', { email, password })
            const decoded = jwtDecode(data.data)
            setAuthToken(data.data)
            setUser({ ...decoded, token: data.data })
            alert('Login Successful!')
            router.push('/home')
        } catch (err) {
            alert('Invalid Credentials!')
            console.log(err)
        }
    }


    return (
        <Form onSubmit={submitHandler}>
            <FormGroup>
                <Label for="email">
                    Email
                </Label>
                <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Type here.."
                    required
                />
            </FormGroup>

            <FormGroup>
                <Label for="password">
                    Password
                </Label>
                <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Type here.."
                    required
                />
            </FormGroup>


            <Button>Login</Button>
        </Form>
    )
}
export default Login;