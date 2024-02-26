import {Alert, Button, Col, Container, Form, ListGroup, Modal, Row} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import BooksList from "../../components/books-list";
import {useUserService} from "../../hooks/services/use-user-service";
import {useAuthService} from "../../hooks";

import cn from "classnames";
import style from './style.module.sass'
import {Helmet} from "react-helmet";

const UserPage = () => {
    const [showModal, setShowModal] = useState(false)
    const [user, setUser] = useState(null)
    const [activeListIndex, setActiveListIndex] = useState(0)
    const {getUserInfo, addList, loading} = useUserService()
    const {logout} = useAuthService()
    const navigate = useNavigate()

    useEffect(() => {
        getUserInfo()
            .then(res => {
                if (res && res.data) {
                    setUser(res.data)
                }
            })
    }, []);

    if (!user) {
        if (loading) {
            return (
                <></>
            )
        }

        return (
            <Container className={'py-5'}>
                <Helmet>
                    <title>Моя библиотека</title>
                </Helmet>
                <Alert variant={'info'} className={'offset-3 col-6'}>
                    вы не вошли в свой аккаунт
                    <Link to={'/login'} className={'ms-2'}>войти</Link>
                </Alert>
                <Alert variant={'info'} className={'offset-3 col-6'}>
                    нету аккаунта?
                    <Link to={'/register'} className={'ms-2'}>создать</Link>
                </Alert>
            </Container>
        )
    }

    const filterBooks = (listType) => {
        return user.books.filter(book => book.listType === listType);
    }

    const onLogout = () => {
        logout()
            .then(res => {
                if (res && res.status === 200) {
                    navigate('/')
                }
            })
    }

    const onCreateList = (e) => {
        e.preventDefault()
        const form = e.target
        const {list} = Object.fromEntries( new FormData(form).entries());
        addList(list)
            .then(res => {
                if (res && res.data) {
                    setUser(res.data)
                }
                setShowModal(false)
            })
    }

    return (
        <Container className={'py-4'}>
            <Row>
                <Col sm={12} className={'mb-3 justify-content-end d-flex'}>

                    {
                        user.role === 'admin'?
                            <Link
                                className={'btn btn-info me-3'}
                                to={'/admin-page'}
                            >
                                Admin
                            </Link>
                            : null
                    }

                    <Button
                        variant={'info'}
                        onClick={onLogout}
                    >
                        Выйти
                    </Button>
                </Col>
                <Col sm={3}>
                    <ListGroup>
                        {
                            user.listTypes.map((list, i) => (
                                <ListGroup.Item
                                    onClick={() => setActiveListIndex(i)}
                                    key={list}
                                    className={cn(i === activeListIndex ? 'bg-info' : '', style.list__item)}
                                >
                                    {list}
                                </ListGroup.Item>
                            ))
                        }
                    </ListGroup>
                    <Button
                        variant={'info'}
                        onClick={() => setShowModal(true)}
                        className={'mt-4'}
                    >
                        создать вкладку
                    </Button>
                </Col>
                <Col>
                    <BooksList books={filterBooks(user.listTypes[activeListIndex])} />
                </Col>
            </Row>

            <Modal
                show={showModal}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Создать вкладку
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form
                        onSubmit={onCreateList}
                    >
                        <Form.Group controlId={'list'}>
                            <Form.Label visuallyHidden>Имя вкладки</Form.Label>
                            <Form.Control name={'list'} type="text" placeholder="Имя вкладки" />
                        </Form.Group>

                        <div className={'mt-4 d-flex justify-content-around'}>
                            <Button
                                onClick={() => setShowModal(false)}
                            >
                                Отмена
                            </Button>
                            <Button
                                type={'submit'}
                            >
                                Создать
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    )
}

export default UserPage