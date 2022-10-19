import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
export default function ReportForms() {
    return (
       
               
        <Form >
            <FormGroup>
                <Label for="exampleDate">Date From:</Label>
                <Input type="date" name="date"/>
            </FormGroup>
            <FormGroup>
                <Label for="exampleDate">Date To:</Label>
                <Input type="date" name="date"/>
            </FormGroup>
            <FormGroup>
                <Label for="exampleSelect">IssuesType</Label>
                <Input type="select" name="select" id="exampleSelect">
                    <option>All</option>
                    <option>Networking</option>
                    <option>User Support</option>
                    <option>Database And Application</option>
                    <option>Emerging Technologies</option>
                </Input>
            </FormGroup>
            <FormGroup>
                <Label for="exampleSelect">Status</Label>
                <Input type="select" name="select" id="exampleSelect">
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
