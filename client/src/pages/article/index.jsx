import React from 'react';
import List from './List'
import axios from '../../util/axios'
import InputArticle from './InputArticle';
import { useRouter } from 'next/router';
import { Context } from '../../store/Context'



const Article = () => {
    const [articles, setArticles] = React.useState([])
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
            const { data } = await axios.get('articles/all')
            if (data.data.length !== 0) {
                setArticles(data.data)
            }
        } catch (err) {
            console.log('err', err)
        }
    }





    return (
        <>
            {isOpen ? <InputArticle addArticle={() => setIsOpen(!isOpen)} getData={() => { setIsOpen(false); getData(); }} /> :
                <List articles={articles} addArticle={() => setIsOpen(!isOpen)} />}
        </>
    )
}
export default Article