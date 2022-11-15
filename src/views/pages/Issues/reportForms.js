import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
export default function ReportForms() {
const [date, setDate] = useState({
    data:'',
    userDate: '',
    issueType: '',
     stat: ''
})

const handleChange = (e) => {
    const { name, value } = e.target;
    setDate({ ...date, [name]: value.trim() });
};

const handleSubmit =(e)=>{
    e.preventDefault();
}
    return (  
        <Form onSubmit={handleSubmit} className="form-form">
            <FormGroup>
                <Label for="exampleDate">Date From:</Label>
                <Input type="date" name="data" onChange={handleChange} value={date.data}/>
            </FormGroup>
            <FormGroup>
                <Label for="exampleDate">Date To:</Label>
                <Input type="date" name="userDate" onChange={handleChange}  value={date.userDate}/>
            </FormGroup>
            <FormGroup>
                <Label for="exampleSelect">IssuesType</Label>
                <Input type="select" name="issueType" id="exampleSelect" onChange={handleChange} value={date.issueType} >
                    <option>All</option>
                    <option>Networking</option>
                    <option>User Support</option>
                    <option>Database And Application</option>
                    <option>Emerging Technologies</option>
                </Input>
            </FormGroup>
            <FormGroup>
                <Label for="exampleSelect">Status</Label>
                <Input type="select" name="stat" id="exampleSelect" onChange={handleChange} value={date.stat}>
                    <option>All</option>
                    <option>Pending</option>
                    <option>Resolved</option>
                    <option>Assigned</option>
                </Input>
            </FormGroup>
            <Button>Submit</Button>
        </Form>
        

    );
}
