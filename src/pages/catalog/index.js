import {Container, Tab, Tabs} from "react-bootstrap";
import BooksByTitleTab from "../../components/books-by-title-tab";
import BooksByAuthorTab from "../../components/books-by-author-tab";
import BooksByPublisherTab from "../../components/books-by-publisher-tab";
import BooksByCategoryTab from "../../components/books-by-category-tab";
import {Helmet} from "react-helmet";

const CatalogPage = () => {
    return (
        <Container className={'py-5'}>
            <Helmet>
                <title>Каталог</title>
            </Helmet>

            <h1 className={'h1'}>Пойск по</h1>
            <Tabs
                defaultActiveKey="title"
            >
                <Tab eventKey="title" title="названию">
                    <BooksByTitleTab />
                </Tab>
                <Tab eventKey="publisher" title="издательству">
                    <BooksByPublisherTab />
                </Tab>
                <Tab eventKey="author" title="автору">
                    <BooksByAuthorTab />
                </Tab>
                <Tab eventKey="category" title="категории">
                    <BooksByCategoryTab />
                </Tab>
            </Tabs>
        </Container>
    )
}

export default CatalogPage