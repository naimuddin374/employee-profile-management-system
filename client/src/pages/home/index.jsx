import React from 'react';
import axios from '../../util/axios'
import { useRouter } from 'next/router'



const Home = () => {
    const [articles, setArticles] = React.useState([])
    const [totalPage, setTotalPage] = React.useState(1)
    const [page, setPage] = React.useState(1)

    const router = useRouter()


    React.useEffect(() => {
        getData(router.query.page)
    }, [router.query])


    async function getData(_page = 1, _limit = 5) {
        try {
            if (_page < 1) {
                return;
            }
            setPage(_page)
            const { data } = await axios.get(`/users?page=${_page}&limit=${_limit}`);
            setArticles(data.data.data)
            setTotalPage(data.data.totalPage)
        } catch (err) {
            console.log('err', err)
        }
    }


    return (
        <div>
        </div>
    )
}
export default Home