import React from 'react';
import { Table, Button } from "reactstrap";
import { dateTime } from '../../util/helper'



const List = ({ editors, addEditor }) => {
    console.log('editors', editors)



    return (
        <>
            <div className='d-flex justify-content-between mt-2'>
                <h3>List of Editor</h3>
                <Button
                    size='sm'
                    onClick={addEditor}
                >
                    Add new editor
                </Button>
            </div>

            <Table
            >
                <thead>
                    <tr>
                        <th> # </th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>Status</th>
                        <th>Joining Date</th>
                    </tr>
                </thead>
                <tbody>
                    {editors && editors.length !== 0 && editors.map((item, i) =>
                        <tr key={item._id}>
                            <th scope="row">{++i}</th>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.contact}</td>
                            <td>{item.status === 1 ? 'Active' : 'Inactive'}</td>
                            <td>{dateTime(item.createdAt)}</td>
                        </tr>)}
                </tbody>
            </Table>
        </>
    )
}
export default List;