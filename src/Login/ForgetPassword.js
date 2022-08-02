import React, { useState } from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import { FormGroup, Label, Input, Badge } from "reactstrap"
export default function Example() {
	const [show, setShow] = useState(false)
	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)
	const [passwordField, setPasswordField] = useState(false)
	const [staffId, setStaffId] = useState("")
	const [checkPayload, setCheckPayload] = useState({})
	const [state, setState] = useState({
		password: "",
		newPassword: "",
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

	return (
		<>
			<Badge onClick={handleShow} id="forgetPwd">
				Forget Password
			</Badge>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Reset Password</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<FormGroup>
							<Label for="exampleEmail">Staff ID</Label>
							<Input
								name="staffId"
								placeholder="Enter Staff ID"
								type="number"
							/>
						</FormGroup>
						<FormGroup>
							<Label for="old password">Old Password</Label>
							<Input
								name="password"
								placeholder="Enter Old Password "
								type="number"
								onChange={handleState}
								required
							/>
						</FormGroup>
					</Form>
					<Form>
						<FormGroup>
							<Label for="old password">New Password</Label>
							<Input
								name="newPassword"
								placeholder="Enter New Password "
								type="number"
								onChange={handleState}
								required
							/>
						</FormGroup>
					</Form>
					<Form>
						<FormGroup>
							<Label for="old password">
								Enter Verification Code
							</Label>
							<Input
								name="password"
								placeholder="Enter Code "
								type="number"
								onChange={handleState}
								required
							/>
						</FormGroup>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="primary">Reset</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}

// import { useNavigate } from "react-router-dom";
// import {
//     Card,
//     Row,
//     Col,
//     CardTitle,
//     CardBody,
//     Button,
//     Form,
//     FormGroup,
//     Label,
//     Input
//   } from "reactstrap";

//   const Forms = () => {
//     const navigate = useNavigate();

//     const handlePress =()=>{
//         navigate("/cards")
//     }
//     return (
//       <Row className="push">
//         <Col>
//           {/* --------------------------------------------------------------------------------*/}
//           {/* Card-1*/}
//           {/* --------------------------------------------------------------------------------*/}
//           <Card>
//             <CardTitle tag="h6" className="border-bottom p-3 mb-0">
//               <i className="bi bi-bell me-2"> </i>
//               CHANGE USER ROLE
//             </CardTitle>
//             <CardBody>
//               <Form>
//               <FormGroup>
//                 <Label for="exampleEmail">Staff ID</Label>
//                 <Input
//                   id="exampleEmail"
//                   name="email"
//                   placeholder="Enter Staff ID"
//                   type="number"
//                 />
//               </FormGroup>
//               <FormGroup>
//                 <Label for="examplePassword">Staff Name</Label>
//                 <Input
//                   id="examplePassword"
//                   name="password"
//                   placeholder="Staff Name"
//                   type="text"
//                 />
//               </FormGroup>
//               <FormGroup>
//                   <Label for="exampleSelect">Division</Label>
//                   <Input id="exampleSelect" name="select" type="select">
//                   <option>Audit Unit</option>
//                   <option>Corporate Affairs and Media Relations</option>
//                   <option>Climate Change Unit</option>
//                   <option>Chief Executive's Office</option>
//                   <option>Corporate Planning Monitoring and Evaluation</option>
//                   <option>Estate Unit</option>
//                   <option>Finance and Administration Department</option>
//                   <option>Forestry Commission Headquarters</option>
//                   <option>Forestry Commission Training Centre</option>
//                   <option>Forest Services Division</option>
//                   <option>Human Resource Department</option>
//                   <option>Information and Communication Technology Department</option>
//                   <option>Procurement Unit</option>
//                   <option>Plantations Department</option>
//                   <option>Resource Management Support Centre</option>
//                   <option>Stores Unit</option>
//                   <option>Timber Industry Development Division</option>
//                   <option>Timber Rights and Administration Unit</option>
//                   <option>Transport Unit</option>
//                   <option>Timber Validation Department</option>
//                   <option>Wildlife Division</option>
//                   </Input>
//                 </FormGroup>
//                 <FormGroup>
//                   <Label for="examplePassword">Old password</Label>
//                   <Input
//                     id="examplePassword"
//                     name="password"
//                     placeholder="Enter password"
//                     type="text"
//                   />
//                 </FormGroup>
//                 <FormGroup>
//                   <Label for="exampleText">New Password</Label>
//                   <Input id="exampleText" name="new password" type="password" placeholder="Enter password" />
//                 </FormGroup>

//                 <Button>Submit</Button>
//                 <Button id="reset" onClick={handlePress}>Cancel</Button>
//               </Form>
//             </CardBody>
//           </Card>
//         </Col>
//       </Row>
//     );
//   };

//   export default Forms;
