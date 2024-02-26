import * as yup from 'yup'
import {Form, Formik} from "formik";
import {Alert, Button, Form as BootstrapForm, Row, Spinner} from 'react-bootstrap'
import {Link, useNavigate} from "react-router-dom";
import FormikTextInput from "../row-text-input";
import {useAuthService} from "../../hooks";


const RegisterForm = () => {
    const {loading, error, register} = useAuthService()
    const navigate = useNavigate();

    const onSubmit = (values) => {
        const {email, password} = values;
        register(email, password)
            .then(response => {
                if (response.status === 200) {
                    navigate('/login')
                }
            })
    }

    return (
        <>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    confirmPassword: '',
                }}
                validationSchema={yup.object({
                    email: yup
                        .string()
                        .email()
                        .required('Email is required'),
                    password: yup
                        .string()
                        .required('Password is required')
                        .min(3, 'Password is too short'),
                    confirmPassword: yup
                        .string()
                        .oneOf([yup.ref('password')], 'Passwords do not match')
                })}
                onSubmit={onSubmit}
            >
                <Form
                >
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
                    <FormikTextInput
                        label={'Потвердите пароль'}
                        type={'password'}
                        name={'confirmPassword'}
                        placeholder={'confirm password'}
                    />

                    <Row className={'mt-4'}>
                        <Button
                            disabled={loading}
                            variant="info"
                            type={'submit'}
                            className={'offset-sm-1 col-sm-3'}
                        >
                            Register
                        </Button>

                        <BootstrapForm.Text className={'offset-sm-1 col-sm-5'}>
                            У вас уже есть учетная запись?
                            <Link to="/login" className={'ms-2'}>Войти</Link>
                        </BootstrapForm.Text>
                    </Row>
                </Form>
            </Formik>
            {error? <Alert className={'text-center mt-3'} variant={'warning'}>{error}</Alert> : null}
            {loading? <Spinner className={'d-block mx-auto mt-3'} /> : null}
        </>
    )
}

export default RegisterForm