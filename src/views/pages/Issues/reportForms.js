import React, { useRef, useEffect, useState } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Col, Row,Container,Card,CardBody } from 'reactstrap';
import Box from '@mui/material/Box';
import { CSVLink, CSVDownload } from 'react-csv';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

export default function ReportForms(submit) {
    const [data, setData] = useState({
        dateFrom: '',
        dateTo: '',
        issueType: '',
        status: ''
    });

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'firstName', headerName: 'First name', width: 130 },
        { field: 'lastName', headerName: 'Last name', width: 130 },
        {
            field: 'age',
            headerName: 'Age',
            type: 'number',
            width: 90
        },
        {
            field: 'fullName',
            headerName: 'Full name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
        }
    ];

    const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);
        // try {
        //     let result =  Axios({
        //         method: 'POST',
        //         url: ``,
        //         data: dataToUpload
        //     });
        //     console.log(result.data);
        // } catch (error) {
        //     console.log(error);
        // }
    };
    return (
        <div>
            {/* <Box sx={{ height: 400, width: '100%' }}>
             
             
             
           
         </Box> */}

            <Container className="report">
                <Row>
                    <Col>
                        <Card>
                            <CardBody>
                                <Form className="form-form">
                                    <FormGroup>
                                        <Label for="exampleDate">Date From:</Label>
                                        <Input type="date" id="exampleDate" name="dateFrom" onChange={handleChange} value={data.dateFrom} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="exampleDate">Date To:</Label>
                                        <Input type="date" id="exampleDate" name="dateTo" onChange={handleChange} value={data.dateTo} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="issue">IssuesType</Label>
                                        <Input type="select" id="issue" name="issueType" onChange={handleChange} value={data.issueType}>
                                            <option value="1">All</option>
                                            <option value="2">Networking</option>
                                            <option value="3">User Support</option>
                                            <option value="4">Database And Application</option>
                                            <option value="5">Emerging Technologies</option>
                                        </Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="exampleSelect">Status</Label>
                                        <Input type="select" name="status" id="reportStatus" onChange={handleChange} value={data.status}>
                                            <option>All</option>
                                            <option>Pending</option>
                                            <option>Resolved</option>
                                            <option>Assigned</option>
                                        </Input>
                                    </FormGroup>
                                    <Button onClick={handleSubmit}>Submit</Button>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
            
            <Container className="report">
            <Row>
                    <Col>
                        <Card>
                            <CardBody>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} checkboxSelection />
            </div>
            </CardBody>
            </Card>
            </Col>
            </Row>
            </Container>
            <Row>
                <Col className="d-flex justify-content-center ">
                    <Button className="btn-sm btn-warning d-flex justify-content-center" id="toast">
                        Print
                    </Button>
                </Col>
            </Row>

            <p className="csv">
                <CSVLink data={rows} columns={columns}>
                    Download Csv File
                </CSVLink>
            </p>
        </div>
    );
}
