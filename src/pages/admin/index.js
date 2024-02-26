import {Alert, Button, Col, Container, Form, Image, Row, Spinner, Table} from "react-bootstrap";
import {useBooksService} from "../../hooks/services/use-books-service";
import {useEffect, useState} from "react";

import example from '../../assets/example.jpg'
import {Link} from "react-router-dom";
import {Helmet} from "react-helmet";

const AdminPage = () => {
    const [books, setBooks] = useState([])
    const {getMainPageBooks, addMainPageBook, deleteMainPageBook, error, clearError, loading} = useBooksService()

    const refreshBooks = () => {
        getMainPageBooks()
            .then(res => {
                if (res && res.data) {
                    setBooks(res.data)
                }
            })
    }

    useEffect(() => {
        refreshBooks()
    }, []);

    const onAddBook = (e) => {
        e.preventDefault();
        clearError()
        const {bookId} = Object.fromEntries(new FormData(e.target).entries());
        e.target.reset()
        addMainPageBook(bookId)
            .then(res => {
                if (res && res.status && res.status === 200) {
                    refreshBooks()
                }
            })
    }

    const onDeleteBook = (id) => {
        clearError()
        deleteMainPageBook(id)
            .then(res => {
                if (res && res.status && res.status === 200) {
                    refreshBooks()
                }
            })

    }

    return (
        <Container className={'py-4'}>

            <Helmet>
                <title>Admin page</title>
            </Helmet>

            {error? <Alert className={'text-center mt-3'} variant={'warning'}>{error}</Alert> : null}

            <Form
                onSubmit={onAddBook}
            >
                <Row className={'align-items-end'}>
                    <Col sm={'3'}>
                        <Form.Group controlId={'bookId'}>
                            <Form.Label>Введите ID книги</Form.Label>
                            <Form.Control type={'text'} name={'bookId'} placeholder={'ID'} />
                        </Form.Group>
                    </Col>
                    <Col sm={'2'}>
                        <Button
                            variant={'info'}
                            type={'submit'}
                        >
                            Добавить
                        </Button>
                    </Col>
                    <Col>
                        {loading? <Spinner /> : null}
                    </Col>
                </Row>
            </Form>

            <Image
                src={example}
                alt={'example book id'}
                className={'mt-3'}
                style={{height: 250 }}
            />

            <Table className={'mt-5'}>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>title</th>
                        <th>authors</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {
                    books.map(book => (
                        <tr key={book.id}>
                            <td>
                                <Link
                                    className={' text-black'}
                                    to={`/book/${book.id}`}
                                >
                                    {book.id}
                                </Link>
                            </td>
                            <td>{book.title}</td>
                            <td>
                                {
                                    book.authors?
                                        book.authors.join(', ')
                                        : null
                                }
                            </td>
                            <td className={'p-0 align-middle'}>
                                <Button
                                    onClick={() => onDeleteBook(book.id)}
                                    className={'py-0 mx-auto d-block'}
                                    variant={'info'}
                                >
                                    удалить
                                </Button>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </Table>
        </Container>
    )
}

export default AdminPage