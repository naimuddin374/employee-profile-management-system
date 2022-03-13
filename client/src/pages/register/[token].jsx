import React from 'react';
import { useRouter } from 'next/router';
import axios from '../../util/axios'
import { Form, Button, FormGroup, Label, Input } from "reactstrap";
import Link from 'next/link';



const Register = () => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [name, setName] = React.useState('')


    const router = useRouter()


    async function submitHandler(e) {
        e.preventDefault()

        if (!name || !email || !password) {
            alert('Validation failed!')
            return;
        }


        try {
            const { data } = await axios.post('auth/register', { name, email, password, token: router.query.token })
            alert(data.message)
            router.push('/login')
        } catch (err) {
            alert('Something went wrong!')
            console.error(err)
        }
    }


    return (
        <Form onSubmit={submitHandler}>
            <FormGroup>
                <Label for="Name">
                    Name
                </Label>
                <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Type here.."
                    required
                />
            </FormGroup>

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


            <Button>Register</Button>
            <Link href='/login'><a>Have already account?</a></Link>
        </Form>
    )
}
export default Register;