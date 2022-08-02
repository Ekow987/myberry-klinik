import React, { useState } from "react"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import md5 from "md5"

export default function Signup() {
	const [show, setShow] = useState(false)
	const [passwordField, setPasswordField] = useState(false)
	const [errorField, setErrorField] = useState(false)
	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)
	const [staffId, setStaffId] = useState("")
	const [checkPayload, setCheckPayload] = useState({})

	const [state, setState] = useState({
		password: "",
		confirmPassword: "",
		code: ""
	})

	const handleState = e => {
		const { name, value } = e.target
		setState({ ...state, [name]: value.trim() })
	}
	const handleStaffId = e => {
		e.preventDefault()
		setStaffId(e.target.value.trim())
		setPasswordField(false)
	}

	const handleSubmit = e => {
		e.preventDefault()
		if (
			state.password === state.confirmPassword &&
			state.code == checkPayload.verification
		) {
			registerUser()
			clearForms()
			handleClose()
		} else {
		}
	}

	const clearForms = () => {
		setState({
			password: "",
			confirmPassword: ""
		})
	}

	const checkStaffId = e => {
		e.preventDefault()
		var myHeaders = new Headers()
		myHeaders.append("Content-Type", "application/json")

		var requestOptions = {
			method: "GET",
			headers: myHeaders,
			redirect: "follow"
		}

		try {
			fetch(
				`http://localhost:5000/api/v1/users/check/${staffId}`,
				requestOptions
			)
				.then(response => response.json())
				.then(result => {
					if (result.status === 200) {
						setPasswordField(true)
						setCheckPayload(result.data)
					}
					if (result.status === 404) {
						setErrorField(true)
					}
				})
				.catch(error => console.log("error", error))
		} catch (error) {
			console.log("error", error)
		}
	}
	const registerUser = () => {
		var myHeaders = new Headers()
		myHeaders.append("Content-Type", "application/json")

		var raw = JSON.stringify({
			staffId: checkPayload.staffId,
			staffName: checkPayload.staffName,
			staffStation: checkPayload.staffStation,
			staffDepartment: checkPayload.staffDepartment,
			staffUnit: checkPayload.staffUnit,
			staffPassword: md5(state.password)
		})

		var requestOptions = {
			method: "POST",
			headers: myHeaders,
			redirect: "follow",
			body: raw
		}

		try {
			fetch(
				`http://localhost:5000/api/v1/users/register/`,
				requestOptions
			)
				.then(response => response.json())
				.then(result => {
					/**
					 *further processes may come in
					 */
					if (result.code === 200) {
					}
				})
				.catch(error => console.log("error", error))
		} catch (error) {
			console.log("error", error)
		}
		setCheckPayload({})
	}
	return (
		<div>
			<Button variant="primary" onClick={handleShow} id="btn">
				Signup
			</Button>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>User Registration</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<>
						ddd
						{errorField ? (
							<span className="bg-danger text-white">
								No User with saff {staffId} was Found
							</span>
						) : null}
						{passwordField ? (
							<>
								<p>{checkPayload.staffId}</p>
								<p>{checkPayload.staffName}</p>
							</>
						) : null}
					</>
					<Form>
						<Form.Group
							className="mb-3"
							controlId="exampleForm.ControlInput1"
						>
							<Form.Label>Staff Id</Form.Label>
							<Form.Control
								type="number"
								placeholder="Staff id"
								autoFocus
								value={staffId}
								onChange={handleStaffId}
								required
							/>
						</Form.Group>
						{passwordField ? null : (
							<>
								{" "}
								<Button
									variant="primary"
									onClick={checkStaffId}
								>
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
										onChange={handleState}
										required
									/>
								</Form.Group>
								<Form.Group className="mb-3">
									<Form.Label>
										Confirm New Password
									</Form.Label>
									<Form.Control
										type="password"
										placeholder="Confirm Password"
										name="confirmPassword"
										onChange={handleState}
										required
									/>
								</Form.Group>

								<Form.Group className="mb-3">
									<Form.Label>
										Enter Verification Code
									</Form.Label>
									<Form.Control
										type="number"
										name="code"
										placeholder="Enter code"
										onChange={handleState}
										required
									/>
								</Form.Group>
							</>
						) : null}
					</Form>
				</Modal.Body>
				<Modal.Footer>
					{passwordField ? (
						<>
							{" "}
							<Button variant="primary" onClick={handleSubmit}>
								Register
							</Button>
						</>
					) : null}
				</Modal.Footer>
			</Modal>
		</div>
	)
}
