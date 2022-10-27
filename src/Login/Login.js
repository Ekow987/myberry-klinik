import md5 from 'md5';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, FormGroup, Input, Label, Row, Col } from 'reactstrap';
import Modal from 'react-bootstrap/Modal';
import signupSchema from './schema';
import Logo from '../assets/images/logo12.jpg';
import ForgetPassword from './ForgetPassword';
import { Formik, useFormik } from 'formik';
import { Form } from 'react-bootstrap';
import swal from 'sweetalert';

export default function Login() {
    const navigate = useNavigate();
    // const signUpForm = useFormik()
    const baseUrl = process.env.REACT_APP_SERVER;
    const [showSignupModal, setShowSignupModal] = useState(false);
    const [showForgetPwdModal, setshowForgetPwdModal] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [passwordField, setPasswordField] = useState(false);
    const [staffId, setStaffId] = useState('');
    const [checkPayload, setCheckPayload] = useState({});
    const [loginState, setLoginState] = useState({
        username: '',
        password: ''
    });
    const [signUpState, setSignupState] = useState({
        password: 'q',
        confirmPassword: '',
        code: ''
    });
    const handleClose = () => setShowSignupModal(false);
    const handleShow = () => setShowSignupModal(true);
    const handlePwdShow = () => setshowForgetPwdModal(true);
    const handlePwdClose = () => setshowForgetPwdModal(false);
    const handlePasswordMocalClose = () => setShowSignupModal(false);
    const handlePasswordMocalShow = () => setShowSignupModal(true);

    const handleForgotPassword = () => {};

    const handleLoginState = (e) => {
        const { name, value } = e.target;
        setLoginState({ ...loginState, [name]: value.trim() });
    };

    const handleStaffId = (e) => {
        e.preventDefault();
        setStaffId(e.target.value.trim());
        setPasswordField(false);
    };

    const clearForms = () => {
        setSignupState({
            password: '',
            confirmPassword: ''
        });
    };

    const checkStaffId = (e) => {
        e.preventDefault();
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        try {
            fetch(`http://localhost:5000/api/v1/users/check/${staffId}`, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    if (result.status === 200) {
                        setPasswordField(true);
                        setCheckPayload(result.data);
                        swal({
                                text: "You will recieve an OTP code to complete your process",
                                icon: "success"
                              })
                    }
                })
                .catch((error) => console.log('error', error));
        } catch (error) {
            console.log('error', error);
        }
    };

    const registerUser = (code) => {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        const raw = JSON.stringify({
            staffId: checkPayload.staffId,
            staffName: checkPayload.staffName,
            staffStation: checkPayload.staffStation,
            staffDepartment: checkPayload.staffDepartment,
            staffUnit: checkPayload.staffUnit,
            staffPassword: md5(code)
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow',
            body: raw
        };

        try {
            fetch(`${baseUrl}/api/v1/users/register/`, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    /**
                     *further processes may come in
                     */
                    if (result.code === 200) {
                        swal({
                                 text: "Registration Successful",
                                icon: "success"
                              })
                    }
                })
                .catch((error) => console.log('error', error));
        } catch (error) {
            console.log('error', error);
        }
        setCheckPayload({});
    };

    const handleSignUpState = (e) => {
        const { name, value } = e.target;
        setSignupState({ ...signUpState, [name]: value.trim() });
        console.log('hi');
    };

    const handleSignUp = (formData) => {
        if (formData.code === checkPayload.verification) {
            registerUser(formData.password);
            clearForms();
            handleClose();

            return;
        }

        // eslint-disable-next-line no-alert
        alert('Check your code and try again');
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        const raw = JSON.stringify({
            username: loginState.username,
            password: md5(loginState.password)
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        try {
            fetch(`${baseUrl}/api/v1/users/login/`, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    /**
                     *further processes may come in
                     */
                    if (result.code === 404) {
                        return;
                    }
                    if (result.code !== 200) {
                        return;
                    }

                    localStorage.setItem('userObject', JSON.stringify(result?.data));
                    navigate('app/dashboard/default');
                });
            // console.log(localStorage).catch((error) => console.log('error', error));
        } catch (error) {
            console.log('error', error);
        }
    };

    return (
        <div className="img">
            <Container>
                <Row>
                    <Col>
                        <div className="App" id="go">
                            {/* <img id="none" src={Logo} alt="profile" width="170" height={100}></img> */}
                            <Form className="form" onSubmit={handleLogin}>
                                <FormGroup className="search-wrap">
                                    <Label for="staff-id" className="text">
                                        Staff Id
                                    </Label>
                                    <Input
                                        id="staff-id"
                                        value={loginState.username}
                                        onChange={handleLoginState}
                                        type="text"
                                        name="username"
                                        placeholder="Enter Staff ID"
                                        required
                                        // isInvalid={!!errors.username}
                                    />
                                    {/* <FormControl className="FeedBack" type="invalid">
                                        {errors.username}
                                    </FormControl> */}
                                </FormGroup>
                                {/* <Formik
                                    validationSchema={validateSchema}
                                    onSubmit={console.log}
                                    initialValues={{
                                        username: '',
                                        password: ''
                                    }}
                                /> */}
                                <FormGroup>
                                    <Label for="staff-password" className="text">
                                        Password
                                    </Label>
                                    <Input
                                        id="staff-password"
                                        type="password"
                                        value={loginState.password}
                                        onChange={handleLoginState}
                                        name="password"
                                        placeholder="********"
                                        required
                                        // isInvalid={!!errors.password}
                                    />
                                    {/* <FormControl className="FeedBack" type="invalid">
                                        {errors.password}
                                    </FormControl> */}
                                </FormGroup>
                                <Row>
                                    <Col className="d-flex justify-content-center ">
                                        <Button className="btn-sm btn-dark  d-flex justify-content-center" type="submit">
                                            Login
                                        </Button>
                                    </Col>
                                    <Col className="d-flex justify-content-center ">
                                        <Button className="btn-sm btn-warning d-flex justify-content-center" onClick={handleShow}>
                                            Sign up
                                        </Button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="d-flex justify-content-center ">
                                        <Button className="btn-sm btn-warning d-flex justify-content-center" onClick={handlePwdShow}>
                                            ForgetPassword?
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>

            <Modal show={showSignupModal} onHide={handleClose}>
                <Formik validationSchema={signupSchema} onSubmit={handleSignUp} onChange={handleSignUpState} initialValues={signUpState}>
                    {({ handleSubmit, handleChange, touched, values, errors }) => (
                        <Form onSubmit={handleSubmit}>
                            <Modal.Header closeButton>
                                <Modal.Title>User Registration</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <>
                                    {passwordField ? (
                                        <>
                                            <p>{checkPayload.staffId}</p>
                                            <p>{checkPayload.staffName}</p>
                                        </>
                                    ) : null}
                                </>

                                <div className="mb-3 form-group">
                                    <label>Staff Id</label>
                                    <Input
                                        type="number"
                                        placeholder="Staff id"
                                        autoFocus
                                        value={staffId}
                                        onChange={handleStaffId}
                                        required
                                    />
                                </div>
                                {passwordField ? null : (
                                    <>
                                        <Button className="btn btn-sm btn-primary" onClick={checkStaffId}>
                                            Check
                                        </Button>
                                    </>
                                )}

                                {passwordField ? (
                                    <>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Set New Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                placeholder="Enter password"
                                                name="password"
                                                isValid={touched.password && !errors.password}
                                                isInvalid={errors.password}
                                                value={values.password}
                                                onChange={handleChange}
                                            />
                                            <Form.Control.Feedback type={errors.password ? 'invalid' : 'valid'}>
                                                {errors.password}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Confirm New Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                placeholder="Confirm Password"
                                                name="confirmPassword"
                                                isValid={touched.confirmPassword && !errors.confirmPassword}
                                                isInvalid={errors.confirmPassword}
                                                value={values.confirmPassword}
                                                onChange={handleChange}
                                            />
                                            <Form.Control.Feedback type={errors.confirmPassword ? 'invalid' : 'valid'}>
                                                {errors.confirmPassword}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Enter Verification Code</Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="code"
                                                placeholder="Enter code"
                                                isValid={touched.code && !errors.code}
                                                isInvalid={errors.code}
                                                value={values.code}
                                                onChange={handleChange}
                                            />
                                            <Form.Control.Feedback type={errors.code ? 'invalid' : 'valid'}>
                                                {errors.code}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </>
                                ) : null}
                            </Modal.Body>
                            <Modal.Footer>
                                {passwordField ? (
                                    <>
                                        {' '}
                                        <Button className="btn-sm btn-prinary" type="submit">
                                            Register
                                        </Button>
                                    </>
                                ) : null}
                            </Modal.Footer>
                        </Form>
                    )}
                </Formik>
            </Modal>
            <Modal show={showForgetPwdModal} onHide={handlePwdClose}>
                <Form onSubmit={handleForgotPassword}>
                    <Modal.Header closeButton>
                        <Modal.Title>Reset Password</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div className="mb-3 form-group">
                            <label>Staff Id</label>
                            <Input
                                type="number"
                                placeholder="Staff id"
                                autoFocus
                                value={staffId}
                                onChange={handleStaffId}
                                name="staffId"
                                required
                            />
                        </div>
                        {passwordField ? null : (
                            <>
                                <Button className="btn btn-sm btn-primary" onClick={checkStaffId}>
                                    Check
                                </Button>
                            </>
                        )}
                    </Modal.Body>
                </Form>
            </Modal>
        </div>
    );
}
