import React from 'react';
import List from './List'
import axios from '../../util/axios'
import InputEditor from './InputEditor';
import { useRouter } from 'next/router';
import { Context } from '../../store/Context'




const Editor = () => {
    const [editors, setEditors] = React.useState([])
    const [isOpen, setIsOpen] = React.useState(false)


    const [user] = React.useContext(Context)

    const router = useRouter()

    React.useEffect(() => {
        if (Object.keys(user).length === 0) {
            router.push('/login')
        }

        getData()
    }, [])

    async function getData() {
        try {
            // const { data } = await axios.get('users')
            const { data } = await axios.get('users/all')
            if (data.data.length !== 0) {
                setEditors(data.data)
            }
        } catch (err) {
            console.log('err', err)
        }
    }





    return (
        <>
            {isOpen ? <InputEditor addEditor={() => setIsOpen(!isOpen)} getData={() => { setIsOpen(false); getData(); }} /> :
                <List editors={editors} addEditor={() => setIsOpen(!isOpen)} />}
        </>
    )
}
export default Editor