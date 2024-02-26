import {Container, Nav, Navbar as BootstrapNavbar} from 'react-bootstrap';

import style from './style.module.sass'
import {Link} from "react-router-dom";

const Navbar = () => {

    return (
        <BootstrapNavbar sticky={'top'} className={style.navbar}>
            <Container>
                <Nav
                    className={'justify-content-around   w-100'}
                >
                    <Nav.Link
                        as={Link}
                        to={'/'}
                    >
                        Библиотека
                    </Nav.Link>

                    <Nav.Link
                        as={Link}
                        to={'/catalog'}
                    >
                        Каталог
                    </Nav.Link>

                    <Nav.Link
                        as={Link}
                        to={'/me'}
                    >
                        Моя библиотека
                    </Nav.Link>
                </Nav>
            </Container>
        </BootstrapNavbar>
    )
}

export default Navbar;