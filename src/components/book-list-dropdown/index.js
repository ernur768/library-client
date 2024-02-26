import {Dropdown} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useUserService} from "../../hooks/services/use-user-service";

import cn from "classnames";
import style from './style.module.sass'

const BookListDropdown = ({user, book}) => {
    const [show, setShow] = useState(false)
    const [defaultList, setDefaultList] = useState('Добавить в список')
    const {addBook, removeBook} = useUserService()

    useEffect(() => {
        for (let i = 0; i < user.books.length; i++) {
            if (user.books[i].id === book.id) {
                setDefaultList(user.books[i].listType)
                break
            }
        }
    }, []);

    const onAdd = (e) => {
        const list = e.target.textContent
        book.listType = list
        addBook(book)
            .then(() => {
                setDefaultList(list)
                setShow(false)
            })
    }

    const onRemove = () => {
        removeBook(book.id)
            .then(() => {
                setDefaultList('Добавить в список')
                setShow(false)
            })
    }

    return (
        <Dropdown>
            <Dropdown.Toggle
                onClick={() => setShow(show => !show)}
                variant="info"
                id="dropdown-basic"
                className={'mt-3 mx-auto d-block'}
                style={{width: 250}}
            >
                {defaultList}
            </Dropdown.Toggle>

            <Dropdown.Menu show={show}>
                {
                    user.listTypes.map(listType => (
                        <div
                            onClick={onAdd}
                            key={listType}
                            className={cn('dropdown-item', style.dropdown__item)}
                        >
                            {listType}
                        </div>
                    ))

                }
                {
                    defaultList !== 'Добавить в список' ?
                        <div
                            onClick={onRemove}
                            className={cn('dropdown-item', style.dropdown__item)}
                        >
                            удалить
                        </div>
                        : null
                }
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default BookListDropdown