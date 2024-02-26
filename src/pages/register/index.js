import {Container} from "react-bootstrap";
import RegisterForm from "../../components/register-form";
import {Helmet} from "react-helmet";

const RegisterPage = () => {

    return (
        <Container>
            <Helmet>
                <title>Регистрация</title>
            </Helmet>

            <div
                className={'py-5 offset-3 col-6'}
            >
                <RegisterForm />
            </div>
        </Container>
    )
}

export default RegisterPage;