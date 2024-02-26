import {useBooksService} from "../../hooks/services/use-books-service";
import {useState} from "react";
import {Button, Col, Form as BootstrapForm, Form, Row, Spinner} from "react-bootstrap";
import BooksList from "../books-list";

const BooksByAuthorTab = () => {
    const [author, setAuthor] = useState('')
    const [books, setBooks] = useState([])
    const [newItemsLoading, setNewItemsLoading] = useState(false)
    const [itemsEnded, setItemsEnded] = useState(false)
    const [offset, setOffset] = useState(18)
    const {loading, getBooksByAuthor} = useBooksService()


    const onSubmit = (e) => {
        e.preventDefault()
        getBooksByAuthor(author)
            .then(({data}) => {
                setItemsEnded(data.length < 18)
                setBooks(data)
            })
    }

    const onMore = () => {
        setNewItemsLoading(true)
        getBooksByAuthor(author, offset)
            .then(({data}) => {
                if (data.length < 18) {
                    setItemsEnded(true)
                }
                setBooks([...books, ...data])
                setOffset(offset => offset + 18)
                setNewItemsLoading(false)
            })
    }

    const spinner = loading? <Spinner className={'d-block mx-auto mt-3'} /> : null

    return (
        <>
            <Form
                className={'mt-3'}
                onSubmit={onSubmit}
            >
                <Row>
                    <Col>
                        <BootstrapForm.Group>
                            <Form.Control
                                onInput={e => setAuthor(e.target.value)}
                                value={author}
                                type={'text'}
                                name={'author'}
                                placeholder={'автор'}
                            />
                        </BootstrapForm.Group>
                    </Col>
                    <Col>
                        <Button variant={'info'} type={'submit'}>Пойск</Button>
                    </Col>
                </Row>
            </Form>

            <div className={'py-5'}>
                <BooksList books={books} />
            </div>

            {spinner}

            <Button
                onClick={onMore}
                variant={'info'}
                disabled={newItemsLoading}
                style={{display: books.length === 0 || itemsEnded? "none": "block"}}
                className={'mx-auto mt-3'}
            >
                Еще
            </Button>
        </>
    )
}

export default BooksByAuthorTab