import * as yup from "yup";
import {Form, Formik} from "formik";
import FormikTextInput from "../row-text-input";
import {Button, Row, Form as BootstrapForm, Alert, Spinner} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {useAuthService} from "../../hooks";

const LoginForm = () => {
    const {loading, error, login} = useAuthService()
    const navigate = useNavigate();

    const onSubmit = (values) => {
        const {email, password} = values;
        login(email, password)
            .then(response => {
                if (response.status === 200) {
                    navigate('/')
                }
            })
    }

    return (
        <>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validationSchema={yup.object({
                    email: yup.string().email().required('Email is required'),
                    password: yup.string().required('Password is required'),
                })}
                onSubmit={onSubmit}
            >
                <Form>
                    <FormikTextInput
                        label={'Электронная почта'}
                        type={'email'}
                        name={'email'}
                    />
                    <FormikTextInput
                        label={'Пароль'}
                        type={'password'}
                        name={'password'}
                    />


                    <Row className={'mt-4'}>
                        <Button variant="info" type={'submit'} className={'offset-sm-1 col-sm-3'}>Login</Button>

                        <BootstrapForm.Text className={'offset-sm-1 col-sm-6'}>
                            У вас нет учетной записи?'
                            <Link to="/register" className={'ms-2'}>Регистрация</Link>
                        </BootstrapForm.Text>
                    </Row>
                </Form>
            </Formik>
            {error? <Alert className={'text-center mt-3'} variant={'warning'}>{error}</Alert> : null}
            {loading? <Spinner className={'d-block mx-auto mt-3'} /> : null}
        </>
    )
}

export default LoginForm;