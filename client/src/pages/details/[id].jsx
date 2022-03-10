import React from 'react';
import { useRouter } from 'next/router';
import { Card, CardBody, CardTitle, CardSubtitle, CardText } from "reactstrap"
import { dateTime } from '../../util/helper';
import axios from '../../util/axios'



const Details = () => {
    const [article, setArticle] = React.useState({})
    const router = useRouter()

    React.useEffect(() => {
        getData(router.query.id)
    }, [router.query.id])


    async function getData(_id) {
        if (!_id)
            return;

        try {
            const { data } = await axios.get(`/articles/${_id}`);
            setArticle(data.data)
        } catch (err) {
            console.log('err', err)
        }
    }

    return (
        <div>
            {Object.keys(article).length !== 0 &&
                <Card
                >
                    <CardBody>
                        <CardTitle tag="h5">
                            {article.title}
                        </CardTitle>
                        <CardSubtitle
                            className="mb-2 text-muted"
                            tag="h6"
                        >
                            {dateTime(article.publishDate)}
                        </CardSubtitle>
                        <CardText>
                            {article.description}
                        </CardText>
                    </CardBody>
                </Card>}
        </div>
    )
}
export default Details;