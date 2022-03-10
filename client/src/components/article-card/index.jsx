import { Card, CardBody, CardTitle, CardSubtitle, CardText } from "reactstrap"
import { dateTime, textLimit } from "../../util/helper";
import Link from 'next/link';



const ArticleCard = (props) => {
    return (
        <Card
        >
            <CardBody>
                <CardTitle tag="h5">
                    {props.title}
                </CardTitle>
                <CardSubtitle
                    className="mb-2 text-muted"
                    tag="h6"
                >
                    {dateTime(props.publishDate)}
                </CardSubtitle>
                <CardText>
                    {textLimit(props.description, 440)}
                </CardText>
                <Link href={`/details/${props._id}`}>
                    <a > Details</a>
                </Link>
            </CardBody>
        </Card>
    )
}
export default ArticleCard;