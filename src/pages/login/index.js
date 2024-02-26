import {Container} from "react-bootstrap";
import LoginForm from "../../components/login-form";
import {Helmet} from "react-helmet";

const LoginPage = props => {
    return (
        <Container>
            <Helmet>
                <title>Войти</title>
            </Helmet>
            <div
                className={'py-5 offset-3 col-6'}
            >
                <LoginForm />
            </div>
        </Container>
    )
}

export default LoginPage