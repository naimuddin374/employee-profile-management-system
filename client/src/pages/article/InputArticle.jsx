import React from 'react';
import { Form, Button, FormGroup, Label, Input } from "reactstrap";
import axios from '../../util/axios'


const InputArticle = ({ addArticle, getData }) => {
    const [title, setTitle] = React.useState('')
    const [description, setDescription] = React.useState('')


    async function submitHandler(e) {
        e.preventDefault()

        try {
            await axios.post('articles', { title, description })
            getData()
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <>
            <div className='d-flex justify-content-between mt-2'>
                <h3>Add new Article</h3>
                <Button
                    size='sm'
                    onClick={addArticle}
                >
                    Close
                </Button>
            </div>

            <Form onSubmit={submitHandler}>
                <FormGroup>
                    <Label for="title">
                        title
                    </Label>
                    <Input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Type here.."
                        required
                    />
                </FormGroup>

                <FormGroup>
                    <Label for="description">
                        Description
                    </Label>
                    <Input
                        id="description"
                        type="textarea"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Type here.."
                        required
                    />
                </FormGroup>

                <Button>Submit</Button>
            </Form>
        </>
    )
}
export default InputArticle;