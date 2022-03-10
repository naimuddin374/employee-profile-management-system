import Link from "next/link";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap"


const ArticlePagination = (props) => {
    return (
        <Pagination>
            {props.page > 1 &&
                <>
                    <PaginationItem>
                        <Link href={`article?page=1`}>
                            <a className="page-link">
                                <span>«</span>
                            </a>
                        </Link>
                    </PaginationItem>
                    <PaginationItem>
                        <Link href={`article?page=${props.page - 1}`}>
                            <a className="page-link">
                                <span>‹</span>
                            </a>
                        </Link>
                    </PaginationItem>
                </>}
            <PaginationItem>
                <Link href={`article?page=${props.page}`}>
                    <a className="page-link">
                        {props.page}
                    </a>
                </Link>
            </PaginationItem>
            {props.page < props.totalPage && <>
                <PaginationItem>
                    <Link href={`article?page=${props.page + 1}`}>
                        <a className="page-link">
                            <span>›</span>
                        </a>
                    </Link>
                </PaginationItem>
                <PaginationItem>
                    <Link href={`article?page=${props.totalPage}`}>
                        <a className="page-link">
                            <span>»</span>
                        </a>
                    </Link>
                </PaginationItem>
            </>}
        </Pagination>
    )
}
export default ArticlePagination;