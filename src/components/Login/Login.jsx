import { React, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { Card, Button, Row, Col, Form } from 'react-bootstrap'
import "./Login.css";

async function checkMockUser(credentials) {
    return fetch('http://localhost:8080/mock/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}


const Login = ({ setToken, setUser }) => {
    // React States
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');
    let navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await checkMockUser({
            email: email
        });
        if (token.error) {
            setError(token.error);
        } else {
            setToken(token);
            setIsSubmitted(true);
            navigate("/heroes", { replace: true });

        }
    }

    // Generate JSX code for error message

    const renderForm = (
        <Row className="row d-flex justify-content-center mt-5">
            <Col className="col-md-6">
                <Card className='pt-2 bg-dark text-white'>
                    <Card.Img className='p-3 ' variant="top" src="https://kantar0.dev/media/marvel_banner_by_blackclaws12_da18ugq-pre.jpg" />
                    <Form className='m-3' onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Correo Electrónico</Form.Label>
                            <Form.Control id='validationEmailFeedback' className={error !== "" ? "is-invalid" : ""} type="email" name="email" onChange={e => setEmail(e.target.value)} placeholder="Ingrese el correo electrónico" />
                            <div id="validationEmailFeedback" className="invalid-feedback">
                                El correo Electrónico no exíste.
                            </div>
                        </Form.Group>
                        <div className='col-md-12 text-center d-grid gap-2'>
                            <Button className='submit_button' variant="primary" size="lg" type="submit">
                                Ingresar
                            </Button>
                        </div>
                    </Form>
                </Card>
            </Col>
        </Row>
    );

    const linkToHeroes = () => (
        <Navigate to="/heroes" replace={true} />
    );

    return (
        <div>
            {isSubmitted ? linkToHeroes() : renderForm}
        </div>
    )
}

export default Login