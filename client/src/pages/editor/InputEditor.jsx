import React from 'react';
import { Form, Button, FormGroup, Label, Input } from "reactstrap";
import axios from '../../util/axios'


const InputEditor = ({ addEditor, getData }) => {
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [contact, setContact] = React.useState('')


    async function submitHandler(e) {
        e.preventDefault()

        let obj = {
            name, email, password, contact
        }

        try {
            await axios.post('users', obj)
            getData()
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <>
            <div className='d-flex justify-content-between mt-2'>
                <h3>Add new Editor</h3>
                <Button
                    size='sm'
                    onClick={addEditor}
                >
                    Close
                </Button>
            </div>

            <Form onSubmit={submitHandler}>
                <FormGroup>
                    <Label for="name">
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

                <FormGroup>
                    <Label for="contact">
                        Contact
                    </Label>
                    <Input
                        id="contact"
                        type="number"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        placeholder="Type here.."
                        required
                    />
                </FormGroup>

                <Button>
                    Submit
                </Button>
            </Form>
        </>
    )
}
export default InputEditor;