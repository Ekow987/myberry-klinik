import md5 from 'md5';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label, Row, Col } from 'reactstrap';
import Modal from 'react-bootstrap/Modal';
// import * as Yup from 'yup';
import Logo from '../assets/images/logo12.jpg';
import ForgetPassword from './ForgetPassword';
// import { Formik } from 'formik';
import { FormControl } from 'react-bootstrap';
export default function Login() {
    const navigate = useNavigate();
    const baseUrl = process.env.REACT_APP_SERVER;
    const [showSignupModal, setShowSignupModal] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [passwordField, setPasswordField] = useState(false);
    const [staffId, setStaffId] = useState('');
    const [checkPayload, setCheckPayload] = useState({});

    // const validateSchema = Yup.object({
    //     username: Yup.string().required,
    //     password: Yup.string()
    //         .required('Please Enter your password')
    //         .matches(
    //             /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
    //             'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
    //         )
    // });

    const [loginState, setLoginState] = useState({
        username: '',
        password: ''
    });
    const [signUpState, setSignupState] = useState({
        password: '',
        confirmPassword: '',
        code: ''
    });
    const handleClose = () => setShowSignupModal(false);
    const handleShow = () => setShowSignupModal(true);
    const handlePasswordMocalClose = () => setShowSignupModal(false);
    const handlePasswordMocalShow = () => setShowSignupModal(true);

    const handleForgotPassword = () => {};

    const handleLoginState = (e) => {
        const { name, value } = e.target;
        setLoginState({ ...loginState, [name]: value.trim() });
    };

    const handleSignUpState = (e) => {
        const { name, value } = e.target;
        setSignupState({
            ...signUpState,
            [name]: value.trim()
        });
        // console.log(
        // 	"%cCurrent Sign Up State: ",
        // 	"background:purple; color:white; border-radius:20px",
        // 	signUpState
        // )
    };

    const handleStaffId = (e) => {
        e.preventDefault();
        setStaffId(e.target.value.trim());
        setPasswordField(false);
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        // console.log(checkPayload)
        // console.log(
        // 	"%cSign Up Sate:",
        // 	"background:purple;color:white",
        // 	signUpState
        // )
        if (signUpState.password === signUpState.confirmPassword && signUpState.code == checkPayload.verification) {
            registerUser();
            clearForms();
            handleClose();
        } else {
        }
    };

    const clearForms = () => {
        setSignupState({
            password: '',
            confirmPassword: ''
        });
    };

    const checkStaffId = (e) => {
        e.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        var requestOptions = {
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
                    }
                })
                .catch((error) => console.log('error', error));
        } catch (error) {
            console.log('error', error);
        }
    };

    const registerUser = () => {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        var raw = JSON.stringify({
            staffId: checkPayload.staffId,
            staffName: checkPayload.staffName,
            staffStation: checkPayload.staffStation,
            staffDepartment: checkPayload.staffDepartment,
            staffUnit: checkPayload.staffUnit,
            staffPassword: md5(signUpState.password)
        });

        var requestOptions = {
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
                    }
                })
                .catch((error) => console.log('error', error));
        } catch (error) {
            console.log('error', error);
        }
        setCheckPayload({});
    };

    const handleLogin = (e) => {
        e.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        var raw = JSON.stringify({
            username: loginState.username,
            password: md5(loginState.password)
        });

        var requestOptions = {
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
                    if (result.code != 200) {
                        return;
                    }

                    localStorage.setItem('userObject', JSON.stringify(result.data));
                    navigate('/dashboard/default');
                });
            console.log(localStorage).catch((error) => console.log('error', error));
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
                                    <Label for="staff-id">Staff Id</Label>
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
                                    <Label for="staff-password">Password</Label>
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
                                    <small className="d-flex justify-content-center ">Forgot password?</small>
                                    {/* <ForgetPassword /> */}
                                </Row>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>

            <Modal show={showSignupModal} onHide={handleClose}>
                <Form onSubmit={handleSignUp}>
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
                            <Input type="number" placeholder="Staff id" autoFocus value={staffId} onChange={handleStaffId} required />
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
                                <div className="mb-3 form-group">
                                    <label>Set New Password</label>
                                    <Input
                                        type="password"
                                        placeholder="Enter password"
                                        name="password"
                                        onChange={handleSignUpState}
                                        required
                                    />
                                </div>
                                <div className="mb-3 form-group">
                                    <label>Confirm New Password</label>
                                    <Input
                                        type="password"
                                        placeholder="Confirm Password"
                                        name="confirmPassword"
                                        onChange={handleSignUpState}
                                        required
                                    />
                                </div>

                                <div className="mb-3 form-group">
                                    <label>Enter Verification Code</label>
                                    <Input type="number" name="code" placeholder="Enter code" onChange={handleSignUpState} required />
                                </div>
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
            </Modal>
            <Modal show={showPasswordModal} onHide={handlePasswordMocalClose}>
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
                        <Button className="btn btn-sm btn-primary" type="submit">
                            Reset Password
                        </Button>
                    </Modal.Body>
                </Form>
            </Modal>
        </div>
    );
}
