import {Badge, Card, Col, Container, Image, Row, Spinner} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useBooksService} from "../../hooks/services/use-books-service";
import BookListDropdown from "../../components/book-list-dropdown";
import {Helmet} from "react-helmet";

const BookPage = ({user}) => {
    const [book, setBook] = useState(null)
    const {id} = useParams()
    const {loading, getBookById} = useBooksService()

    useEffect(() => {
        getBookById(id)
            .then(({data}) => {
                setBook(data)
            })
    }, [id]);

    return (
        <Container className={'py-5'}>
            {book? <BookView user={user} data={book} /> : null}
            {loading? <Spinner className={'d-block mx-auto mt-3'} /> : null}
        </Container>
    )
}

const BookView = ({data, user}) => {
    const {title, subtitle, authors, publisher, description, pageCount, categories, thumbnail} = data

    return (
        <Row>
            <Helmet>
                <title>{title}</title>
            </Helmet>

            <Col sm={3}>
                <Image className={'w-100'} style={{minHeight: 400}} src={thumbnail} thumbnail />
                {
                    user ?
                        <BookListDropdown user={user} book={data} />
                        :  null
                }
            </Col>
            <Col>
                <Card>
                    <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    {
                        subtitle?
                            <Card.Subtitle
                                className={'mt-2'}
                            >
                                {subtitle}
                            </Card.Subtitle>
                            : null
                    }
                    {
                        authors && authors.length !== 0?
                            <Card.Subtitle className={'mt-2'}>
                                Авторы:
                                {
                                    authors.map((author) => (
                                        <Badge key={author} className={'ms-2'} bg={'secondary'}>{author}</Badge>
                                    ))
                                }
                            </Card.Subtitle>
                            : null
                    }
                    {
                        publisher?
                            <Card.Subtitle className={'mt-2'}>
                                Издатель: {publisher}
                            </Card.Subtitle>
                            : null
                    }

                    {
                        description?
                            <Card.Text className={'mt-3'} dangerouslySetInnerHTML={{__html: description}}>
                            </Card.Text>
                            : null
                    }
                    {
                        pageCount?
                            <Card.Text className={'mt-2'}>
                                Количество страниц: {pageCount}
                            </Card.Text>
                            : null
                    }
                    {
                        categories?
                            <Card.Text className={'mt-2'}>
                                категории:
                                {
                                    categories.map((category) => (
                                        <Badge key={category} className={'ms-2'} bg={'secondary'}>{category}</Badge>
                                    ))
                                }
                            </Card.Text>
                            : null
                    }
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

export default BookPage