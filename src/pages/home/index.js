import {Alert, Container, Spinner} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useBooksService} from "../../hooks/services/use-books-service";
import BooksList from "../../components/books-list";
import {Helmet} from "react-helmet";

const HomePage = () => {
    const [books, setBooks] = useState([])
    const {getMainPageBooks, loading, error} = useBooksService()

    useEffect(() => {
        getMainPageBooks()
            .then(res => {
                if (res && res.data) {
                    setBooks(res.data)
                }
            })
    }, []);

    return (
        <Container className={'py-5'}>
            <Helmet>
                <title>Библиотека</title>
            </Helmet>

            {error? <Alert className={'text-center mt-3'} variant={'warning'}>{error}</Alert> : null}
            {loading? <Spinner className={'d-block mx-auto mt-3'} /> : null}

            <h1 className={'h1 '}>
                Вам могут понравится
            </h1>

            <BooksList books={books} />
        </Container>
    )
}

export default HomePage