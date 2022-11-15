import React, { useEffect, useState } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText,Container,Card,CardBody,Col,Row,Box} from 'reactstrap';
import { CSVLink, CSVDownload } from 'react-csv';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
export default function ReportForms() {
    const [data, setData] = useState({
        dateFrom: '',
        dateTo: '',
        issueType: '',
        status: ''
    });

    const [reportdata, setReportData] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    // const getReportDetails = async () => {
    //     try {
    //         let result = await fetch(``, {
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         });
    //         let response = await result.json();
    //         setReportData(response.data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // useEffect(()=>{
    //     getReportDetails()
    // },[])

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'firstName',
            headerName: 'Description',
            width: 150,
            editable: true
        },
        {
            field: 'lastName',
            headerName: 'IssueType',
            width: 150,
            editable: true
        },
        {
            field: 'age',
            headerName: 'Issuer',
            type: 'number',
            width: 110,
            editable: true
        },
        {
            field: 'fullName',
            headerName: 'Assign To',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160
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

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(data);
    };
    return (
        <div>
            <Container className="list">
                <Row>
                    <Col>
                        <Card>
                            <CardBody>
                                <Form onSubmit={handleSubmit} className="form-form">
                                    <FormGroup>
                                        <Label for="exampleDate">Date From:</Label>
                                        <Input type="date" name="dateFrom" onChange={handleChange} value={data.dateFrom} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="exampleDate">Date To:</Label>
                                        <Input type="date" name="dateTo" onChange={handleChange} value={data.dateTo} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="exampleSelect">IssuesType</Label>
                                        <Input
                                            type="select"
                                            name="issueType"
                                            id="exampleSelect"
                                            onChange={handleChange}
                                            value={data.issueType}
                                        >
                                            <option>All</option>
                                            <option>Networking</option>
                                            <option>User Support</option>
                                            <option>Database And Application</option>
                                            <option>Emerging Technologies</option>
                                        </Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="exampleSelect">Status</Label>
                                        <Input type="select" name="status" id="exampleSelect" onChange={handleChange} value={data.status}>
                                            <option>All</option>
                                            <option>Pending</option>
                                            <option>Resolved</option>
                                            <option>Assigned</option>
                                        </Input>
                                    </FormGroup>
                                    <Button>Submit</Button>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <Container className="list">
                <Row>
                    <Col>
                        <Card>
                            <CardBody>
                                <div style={{ height: 400, width: '100%' }}>
                                    <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} checkboxSelection />
                                </div>

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
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
