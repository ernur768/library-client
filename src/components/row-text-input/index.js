import {useField} from "formik";
import {Col, Form as BootstrapForm, Row} from "react-bootstrap";

const FormikTextInput = ({label, placeholder, ...props}) => {
    const [field, meta] = useField(props);
    return (
        <BootstrapForm.Group as={Row} controlId={props.name} className={'mt-3'}>
            <BootstrapForm.Label column sm="4">{label}</BootstrapForm.Label>
            <Col>
                <BootstrapForm.Control
                    placeholder={placeholder || props.name}
                    {...props}
                    {...field}
                />
            </Col>
            {meta.touched && meta.error ? (<div className={'offset-sm-4 ps-3 text-danger form-text'}>{meta.error}</div>) : null}
        </BootstrapForm.Group>
    )
}

export default FormikTextInput