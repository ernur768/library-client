import {Col, Row} from "react-bootstrap";
import BookCard from "../book-card";


const BooksList = ({books, sm}) => {
    sm = sm || 2

    return (
        <Row>
            {
                books?
                    books.map(book => (
                    <Col sm={sm} className={'mb-3'} key={book.id}>
                        <BookCard
                            data={{
                                id: book.id,
                                title: book.title,
                                subtitle: book.subtitle,
                                author: book.author,
                                thumbnail: book.thumbnail,
                            }}
                        />
                    </Col>
                    ))
                    : null
            }
        </Row>
    )
}

export default BooksList;