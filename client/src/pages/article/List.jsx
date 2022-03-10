import React from 'react';
import { Table, Button } from "reactstrap";
import { dateTime } from '../../util/helper'



const List = ({ articles, addArticle }) => {



    return (
        <>
            <div className='d-flex justify-content-between mt-2'>
                <h3>List of Article</h3>
                <Button
                    size='sm'
                    onClick={addArticle}
                >
                    Add new Article
                </Button>
            </div>

            <Table
            >
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Joining Date</th>
                    </tr>
                </thead>
                <tbody>
                    {articles.length !== 0 && articles.map((item, i) =>
                        <tr key={item._id}>
                            <th scope="row">{++i}</th>
                            <td>{item.title}</td>
                            <td>{item.description}</td>
                            <td>{item.status === 1 ? 'Active' : 'Inactive'}</td>
                            <td>{dateTime(item.createdAt)}</td>
                        </tr>)}
                </tbody>
            </Table>
        </>
    )
}
export default List;