import React, { useEffect, useState, useContext, useMemo } from 'react';
import { AppContext } from '../../../components/Context/AppContext';
import { DataGrid } from '@mui/x-data-grid';
import { getUser } from '../../../services/Auth';
import moment from 'moment';
import SelectOfficers from '../../../components/SelectOfficers';
import Axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Card, CardBody, CardHeader, Col, Container, FormGroup, Input, Label, Row, InputGroup } from 'reactstrap';
const formatDate = (date, full = true) => {
    return moment(date).format('DD MMM, YYYY');
};

export default function IssuesList({ officers }) {
    const userObject = JSON.parse(localStorage.getItem('userObject'));
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [details, setDetails] = useState({});
    const [officersList, setofficersList] = useState([]);
    const [officersInUnit, setOfficersInUnit] = useState([]);
    const [issueTypes, setIssueTypes] = useState();
    const [showDetails, setShowDetails] = useState(false);
    const [show, setShow] = useState(false);
    const [showRate, setShowRate] = useState(false);
    const [showAssign, setShowAssign] = useState(false);
    const [showResolve, setShowResolve] = useState(false);
    const [values, setValues] = useState({
        type: '',
        description: '',
        comment: '',
        range: 0,
        issueId: '',
        officerUnit: '',
        officerId: '',
        unitId: '',
        unitName: '',
        assignedBy: userObject?.id,
        remarks: '',
        diagnose: '',
        resolution: ''
    });
    const [rangeUnit, setRangeUnit] = useState('star');
    const baseUrl = process.env.REACT_APP_SERVER;

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleRateClose = () => setShowRate(false);
    const handleRateShow = () => setShowRate(true);

    const handleAssignClose = () => setShowAssign(false);

    const handleAssignShow = () => setShowAssign(true);
    const handleDetailsClose = () => setShowDetails(false);
    const handleDetailsShow = () => setShowDetails(true);

    const handleResolveClose = () => setShowResolve(false);
    const handleResolveShow = () => setShowResolve(true);

    const handleChange = (e) => {
        setValues((values) => ({
            ...values,
            [e.target.name]: e.target.value
        }));
        values.range > 1 ? setRangeUnit('stars') : setRangeUnit('star');
    };

    const { getStatistics } = useContext(AppContext);

    /**TODO: give a propper reset form function */
    const clearForms = () => {
        setValues({
            type: '',
            description: ''
        });
    };
    const fetchDetails = (e) => {
        e.preventDefault();

        const { row } = e.target.dataset.row;
        // console.log(row);
        // console.log(e.target.dataset.row);

        setDetails(JSON.parse(e.target.dataset.row));
        // console.log(details);

        handleDetailsShow();
    };

    const getuserByUnit = async (unit) => {
        try {
            let result = await fetch(`http://localhost:5000/api/v1/users/get-users-by-unit/${unit}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const response = await result.json();
            response.data ? setOfficersInUnit(response.data) : setOfficersInUnit([]);
        } catch (error) {
            console.log(error);
        }
    };

    const handleAssign = (e) => {
        e.preventDefault();
        const { unitid, unitname, issueid } = e.target.dataset;
        console.log(unitid, unitname, issueid);
        setValues({
            ...values,
            unitId: unitid,
            unitName: unitname,
            issueId: issueid
        });
        getuserByUnit(unitid);
        handleAssignShow();
    };
    const assignIssue = async (e) => {
        e.preventDefault();
        let dataToUpload = {
            issueId: values.issueId,
            technicianId: values.officerId,
            userId: userObject.staffId
        };
        try {
            let result = await Axios({
                method: 'PUT',
                url: `${baseUrl}/api/v1/issues/assign/`,
                data: dataToUpload
            });

            if (result.data.code == 200) {
                getData();
                setTimeout(() => {
                    handleAssignClose();
                    getStatistics();
                }, 1500); //e.target.reset() //Resetting the list of Sales Engineer
            } else {
                alert('Operation unsuccessful');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleRevolve = (e) => {
        e.preventDefault();
        const { id } = e.target.dataset;
        setValues({
            ...values,
            issueId: id
        });
        handleResolveShow();
    };
    const resolveIssue = async (e) => {
        e.preventDefault();
        let dataToUpload = {
            issueId: values.issueId,
            remarks: values.remarks,
            resolution: values.resolution,
            userId: userObject.staffId
        };

        try {
            let result = await Axios({
                method: 'PUT',
                url: `${baseUrl}/api/v1/issues/resolve-issue/`,
                data: dataToUpload
            });

            if (result.data.code == 200) {
                getData();

                setTimeout(() => {
                    handleResolveClose();
                    getStatistics();
                }, 1500);
            } else {
                alert('Operation unsuccessful');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleRating = (e) => {
        e.preventDefault();
        const id = e.target.dataset.id;
        console.log('id: ', id);
        setValues({
            ...values,
            issueId: id
        });
        handleRateShow();
    };
    const rate = async (e) => {
        e.preventDefault();

        let dataToUpload = {
            range: values.range,
            userId: userObject.staffId,
            issueId: values.issueId
        };
        try {
            let result = await Axios({
                method: 'PUT',
                url: `${baseUrl}/api/v1/issues/feedback`,
                data: dataToUpload
            });
            
            if (result.data.code == 200) {
                getData();
                setTimeout(() => {
                    handleRateClose();
                }, 1500);
            } else {
                alert('Operation unsuccessful');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const addIssue = async (e) => {
        e.preventDefault();
        let dataToUpload = {
            description: values.description,
            type: values.type,
            issuer: userObject.staffId
        };
        try {
            let result = await Axios({
                method: 'POST',
                url: `${baseUrl}/api/v1/issues/add/`,
                data: dataToUpload
            });
            setValues(result.data);
        } catch (error) {
            console.log(error);
        }

        getData();
        setTimeout(() => {
            handleClose();
            getStatistics();
        }, 1500);
    };

    const getOfficersList = async () => {
        try {
            let result = await fetch(`${baseUrl}/api/v1/users/get-users-by-type/officer`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let response = await result.json();
            setofficersList(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useMemo(async () => {
        let url;
        url = `${baseUrl}/api/v1/issues/issue-types`;

        try {
            let result = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const response = await result.json();
            response.data ? setIssueTypes(response.data) : setIssueTypes([]);
        } catch (error) {
            console.log(error);
        }
    }, [show]);

    useEffect(() => {
        getOfficersList();
    }, [1]);

    /**
     * @param {int} id
     * @param {int} batchId
     *
     * calling the API to reassign issue
     */
    const assignOfficer = async (dataToUpload) => {
        //console.log("dataToUpload: ", dataToUpload)
        try {
            let result = await Axios({
                method: 'PUT',
                url: `${baseUrl}/api/v1/issues/assign/`,

                data: dataToUpload
            });

            if (result.data.code == 200) {
                getData();
                //e.target.reset() //Resetting the list of Sales Engineer
            } else {
                alert('Issue could not be assigned');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const superUserColumns = [
        { field: 'id', headerName: '#', width: 5 },
        {
            headerName: 'Created At',
            field: 'createdAt',
            width: 100,
            valueGetter: (params) => `${formatDate(params.row.createdAt)}`
        },

        { field: 'issue_description', headerName: 'Description', width: 220 },
        { field: 'issuer', headerName: 'Issuer', width: 150 },
        { field: 'issue_name', headerName: 'Issue Type', width: 130 },
        {
            field: 'assign_by',
            headerName: 'Assign By',
            valueGetter: (params) => (params.row.assign_by == userObject.staffId ? `You` : '')
        },
        {
            field: 'surname',
            headerName: 'Assigned To',
            width: 200,
            valueGetter: (params) => params.row.firstname + ' ' + params.row.surname
        },
        {
            field: 'feedback_rating',
            headerName: 'Rating',
            width: 140,
            renderCell: (params) => {
                switch (params.row.status.toString()) {
                    case '1':
                        if (params.row.feedback_rating) {
                            return (
                                <div className="btn-group" role="group" aria-label="Button group with nested dropdown">
                                    <button type="button" className="btn btn-primary">
                                        {params.row.feedback_rating}
                                    </button>
                                </div>
                            );
                        }
                }
            }
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 140,
            renderCell: (params) => {
                switch (params.row.status.toString()) {
                    case '3':
                        return (
                            <span className="btn btn-sm btn-danger">
                                <div>Pending</div>
                            </span>
                        );
                        break;

                    case '2':
                        return (
                            <span className="btn btn-sm btn-warning">
                                <div> Assigned </div>
                            </span>
                        );
                        break;
                    case '1':
                        return (
                            <button type="button" className="btn btn-sm btn-success">
                                Resolved
                            </button>
                        );
                        // if (params.row.feedback_rating) {
                        // 	return (
                        // 		<div
                        // 			className="btn-group"
                        // 			role="group"
                        // 			aria-label="Button group with nested dropdown"
                        // 		>
                        // 			<button
                        // 				type="button"
                        // 				className="btn btn-primary"
                        // 			>
                        // 				{params.row.feedback_rating}
                        // 			</button>

                        // 		</div>
                        // 	)
                        // } else {
                        // 	return (
                        // 		<button
                        // 			type="button"
                        // 			className="btn btn-sm btn-success"
                        // 		>
                        // 			Resolved
                        // 		</button>
                        // 	)
                        // }

                        break;
                }
            }
        },
        {
            headerName: 'Action',
            sortable: false,
            width: 160,
            renderCell: (params) => {
                if (params.row.status != 1) {
                    return (
                        <>
                            <Button data-id={params.row.issue_id} data-row={JSON.stringify(params.row)} onClick={fetchDetails}>
                                Details
                            </Button>

                            <Button
                                variant="success"
                                data-unitid={params.row.unit_id}
                                data-unitname={params.row.unit_name}
                                data-issueid={params.row.issue_id}
                                onClick={handleAssign}
                            >
                                {params.row.status == 2 ? `Re-assign` : `Assign`}
                            </Button>
                        </>
                    );
                } else {
                }
            }
        }
    ];

    const directorColumns = [
        { field: 'id', headerName: '#', width: 5 },
        {
            headerName: 'Created At',
            field: 'createdAt',
            width: 100,
            valueGetter: (params) => `${formatDate(params.row.createdAt)}`
        },

        { field: 'issue_description', headerName: 'Description', width: 220 },
        { field: 'issuer', headerName: 'Issuer', width: 150 },
        { field: 'issue_name', headerName: 'Issue Type', width: 130 },
        {
            field: 'assign_by',
            headerName: 'Assign By',
            valueGetter: (params) => (params.row.assign_by == userObject.staffId ? `You` : '')
        },
        {
            field: 'surname',
            headerName: 'Assigned To',
            width: 200,
            valueGetter: (params) => params.row.firstname + ' ' + params.row.surname
        },
        {
            field: 'feedback_rating',
            headerName: 'Rating',
            width: 140,
            renderCell: (params) => {
                switch (params.row.status.toString()) {
                    case '1':
                        if (params.row.feedback_rating) {
                            return (
                                <div className="btn-group" role="group" aria-label="Button group with nested dropdown">
                                    <button type="button" className="btn btn-primary">
                                        {params.row.feedback_rating}
                                    </button>
                                </div>
                            );
                        }
                }
            }
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 140,
            renderCell: (params) => {
                switch (params.row.status.toString()) {
                    case '3':
                        return (
                            <span className="btn btn-sm btn-danger">
                                <div>Pending</div>
                            </span>
                        );
                        break;

                    case '2':
                        return (
                            <span className="btn btn-sm btn-warning">
                                <div> Assigned </div>
                            </span>
                        );
                        break;
                    case '1':
                        return (
                            <button type="button" className="btn btn-sm btn-success">
                                Resolved
                            </button>
                        );
                        // if (params.row.feedback_rating) {
                        // 	return (
                        // 		<div
                        // 			className="btn-group"
                        // 			role="group"
                        // 			aria-label="Button group with nested dropdown"
                        // 		>
                        // 			<button
                        // 				type="button"
                        // 				className="btn btn-primary"
                        // 			>
                        // 				{params.row.feedback_rating}
                        // 			</button>

                        // 		</div>
                        // 	)
                        // } else {
                        // 	return (
                        // 		<button
                        // 			type="button"
                        // 			className="btn btn-sm btn-success"
                        // 		>
                        // 			Resolved
                        // 		</button>
                        // 	)
                        // }

                        break;
                }
            }
        },
        {
            headerName: 'Action',
            sortable: false,
            width: 160,
            renderCell: (params) => {
                if (params.row.status != 1) {
                    return (
                        <>
                            <Button data-id={params.row.issue_id} data-row={JSON.stringify(params.row)} onClick={fetchDetails}>
                                Details
                            </Button>

                            <Button
                                variant="success"
                                data-unitid={params.row.unit_id}
                                data-unitname={params.row.unit_name}
                                data-issueid={params.row.issue_id}
                                onClick={handleAssign}
                            >
                                {params.row.status == 2 ? `Re-assign` : `Assign`}
                            </Button>
                        </>
                    );
                } else {
                }
            }
        }
    ];



    // const managerColumns = [
    //     { field: 'description', headerName: 'Description' },
    //     { field: 'issuer', headerName: 'Issuer', width: 130 },
    //     { field: 'createdAt', headerName: 'Created At' },
    //     {
    //         headerName: 'Status',
    //         sortable: false,
    //         width: 100,
    //         renderCell: (params) => {
    //             switch (params.row.status.toString()) {
    //                 case 'Unresolved':
    //                     return (
    //                         <span className="btn btn-sm btn-danger">
    //                             <div>Pending</div>
    //                         </span>
    //                     );
    //                     break;
    //                 case 'Resolved':
    //                     return (
    //                         <span className="btn btn-sm btn-success">
    //                             <div> Resolved</div>
    //                         </span>
    //                     );
    //                     break;
    //             }
    //         }
    //     },
    //     {
    //         headerName: 'Action',
    //         sortable: false,
    //         width: 300,
    //         renderCell: () => (
    //             <>
    //                 <span style={{ display: 'flex' }}>
    //                     <div></div>
    //                     <div></div>
    //                     <i className="bi bi-trash-fill"></i>
    //                 </span>
    //             </>
    //         )
    //     }
    // ];

    // const directorColumns = [
    //     { field: 'description', headerName: 'Description' },
    //     { field: 'issuer', headerName: 'Issuer', width: 130 },
    //     { field: 'createdAt', headerName: 'Created At' },
    //     { field: 'type', headerName: 'Issue Type' },
    //     { field: 'assignedBy', headerName: 'Assign By' },
    //     { field: 'assignedAt', headerName: 'Assigned At' },
    //     { field: 'taskDescription', headerName: 'Task Description' },
    //     { field: 'assignedTo', headerName: 'Assigned To' },
    //     { field: 'adminComment', headerName: 'Admin Remarks' },
    //     {
    //         headerName: 'Status',
    //         sortable: false,
    //         width: 100,
    //         renderCell: (params) => {
    //             switch (params.row.status.toString()) {
    //                 case 'Unresolved':
    //                     return (
    //                         <span className="btn btn-sm btn-danger">
    //                             <div>Pending</div>
    //                         </span>
    //                     );
    //                     break;
    //                 case 'Resolved':
    //                     return (
    //                         <span className="btn btn-sm btn-success">
    //                             <div> Resolved</div>
    //                         </span>
    //                     );
    //                     break;
    //             }
    //         }
    //     },
    //     {
    //         headerName: 'Action',
    //         sortable: false,
    //         width: 300,
    //         renderCell: () => (
    //             <>
    //                 <span style={{ display: 'flex' }}>
    //                     <div></div>
    //                     <div></div>
    //                     <i className="bi bi-trash-fill"></i>
    //                 </span>
    //             </>
    //         )
    //     }
    // ];

    const officerColumns = [
        { field: 'id', headerName: '#', width: 10 },
        { field: 'issue_description', headerName: 'Description', width: 250 },
        { field: 'issuer', headerName: 'Issuer', width: 180 },
        {
            field: 'createdAt',
            headerName: 'Created At',
            width: 130,
            valueGetter: (params) => `${formatDate(params.row.createdAt)}`
        },
        { field: 'issue_name', headerName: 'Issue Type', width: 130 },
        {
            field: 'status',
            headerName: 'Status',
            sortable: true,
            width: 100,
            renderCell: (params) => {
                switch (params.row.status.toString()) {
                    case '1':
                        return (
                            <span className="btn btn-sm btn-success">
                                <div>Resolved</div>
                            </span>
                        );
                        break;
                    case '2':
                        return (
                            <span className="btn btn-sm btn-danger">
                                <div> Pending </div>
                            </span>
                        );
                        break;
                    case '3':
                        return (
                            <span className="btn btn-sm btn-danger">
                                <div> Pending</div>
                            </span>
                        );
                        break;
                }
            }
        },

        {
            headerName: 'Action',
            sortable: false,
            width: 80,
            renderCell: (params) => {
                if (params.row.status != 1) {
                    return (
                        <Col>
                            {params.row.status.toString() == 1 ? (
                                <button style={{ display: 'flex' }} className="btn btn-sm btn-primary" disabled>
                                    Closed
                                </button>
                            ) : (
                                <button
                                    style={{ display: 'flex' }}
                                    className="btn btn-sm btn-primary"
                                    data-id={params.row.id}
                                    onClick={handleRevolve}
                                >
                                    Diagnose
                                </button>
                            )}
                        </Col>
                    );
                } else {
                }
            }
        }
    ];

    const userColumns = [
        { field: 'id', headerName: '#', width: 10 },
        { field: 'issue_description', headerName: 'Description', width: 600 },
        { field: 'issue_name', headerName: 'Issue Type', width: 200 },
        {
            field: 'status',
            headerName: 'Status',
            sortable: false,
            width: 100,
            renderCell: (params) => {
                switch (params.row.status.toString()) {
                    case '1':
                        return (
                            <span className="btn btn-sm btn-success">
                                <div>Resolved</div>
                            </span>
                        );
                        break;
                    case '2':
                        return (
                            <span className="btn btn-sm btn-warning">
                                <div> Assinged </div>
                            </span>
                        );
                        break;
                    case '3':
                        return (
                            <span className="btn btn-sm btn-danger">
                                <div> Pending</div>
                            </span>
                        );
                        break;
                }
            }
        },
        {
            headerName: 'Action',
            width: 70,
            renderCell: (params) => {
                if (params.row.status.toString() == 1) {
                    return (
                        <Button className="btn btn-sm btn-primary" data-id={params.row.id} onClick={handleRating}>
                            Rate
                            {/* <i className="bi bi-chat-dots"></i>{' '} */}
                        </Button>
                    );
                } else {
                    return null;
                }
            }
        }
    ];

    const getData = async () => {
        let url;
        switch (userObject?.type) {
            case 'user':
<<<<<<< HEAD
                url = `http://localhost:5000/api/v1/issues/user-issues/${userObject?.staffId}`;
                setColumns(userColumns);
                break;
            case 'officer':
                url = `http://localhost:5000/api/v1/issues/technician-issues/${userObject?.staffId}`;
=======
                url = `http://localhost:5000/api/v1/issues/user-issues/${userObject.staffId}`;
                setColumns(userColumns);
                break;
            case 'officer':
                url = `http://localhost:5000/api/v1/issues/technician-issues/${userObject.staffId}`;
>>>>>>> 16522116e73ed2849f7367c24a3e3427c93d56cc
                setColumns(officerColumns);
                break;
            case 'director':
                url = `http://localhost:5000/api/v1/issues/`;
                setColumns(directorColumns);
                break;
            case 'manager':
<<<<<<< HEAD
                url = `http://localhost:5000/api/v1/issues/manager-issues/${userObject?.unit}`;
=======
                url = `http://localhost:5000/api/v1/issues/manager-issues/${userObject.unit}`;
>>>>>>> 16522116e73ed2849f7367c24a3e3427c93d56cc
                setColumns(superUserColumns);
                break;
            case 'superuser':
                url = `http://localhost:5000/api/v1/issues/`;
                setColumns(superUserColumns);
                break;
        }
        try {
            let result = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const response = await result?.json();
            response?.data ? setData(response.data) : setData([]);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, [1]);

    return (
        <>
            <Row className="mb-3">
                <Col className="col">
                    {userObject?.type == 'user' ? (
                        <Button className="btn btn-primary mr-5 mt-2" onClick={handleShow}>
                            New Issues
                        </Button>
                    ) : null}
                    {/* <Button
							className="btn btn-danger mr-2 mt-2"
							title="Coming Soon"
						>
							Pending Issues
						</Button>{" "}
						<Button
							className="btn btn-success mr-2 mt-2"
							title="Coming Soon"
						>
							Resolved Issues
						</Button> */}
                </Col>
            </Row>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid rows={data} columns={columns} density="compact" />
            </div>

            <Modal show={show} onHide={handleClose} className="header">
                <Form onSubmit={addIssue}>
                    <Modal.Header closeButton className="bg-success text-white">
                        <Modal.Title>Add New issue</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormGroup>
                            <Label for="exampleSelect">Issue Type</Label>
                            <Input id="exampleSelect" name="type" type="select" value={values.type} onChange={handleChange} required>
                                <option>Select Issue</option>
                                {issueTypes &&
                                    issueTypes.map((issue, id) => {
                                        return (
                                            <option key={id} value={issue.issue_type_id}>
                                                {issue.issue_name}
                                            </option>
                                        );
                                    })}
                            </Input>
                        </FormGroup>

                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Input name="description" type="textarea" value={values.description} onChange={handleChange} />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" type="submit">
                            Send
                        </Button>
                    </Modal.Footer>{' '}
                </Form>
            </Modal>

            <Modal show={showRate} onHide={handleRateClose} className="header">
                <Form onSubmit={rate}>
                    <Modal.Header closeButton className="bg-primary text-white">
                        <Modal.Title>Comment and Rate</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormGroup>
                            <Label for="exampleRange">Range - 0 to 5</Label>
                            <InputGroup>
                                <Input
                                    id="exampleRange"
                                    name="range"
                                    type="range"
                                    step={1}
                                    max={5}
                                    min={0}
                                    value={values.range}
                                    onChange={handleChange}
                                />

                                <Button>
                                    <span>{`${values.range} ${rangeUnit}`}</span>
                                </Button>
                            </InputGroup>
                            {/* <span className="d-flex justify-content-between">


							</span> */}
                        </FormGroup>

                        {/* <Form.Group className="mb-3">
							<Form.Label>Comment</Form.Label>
							<Input
								name="comment"
								type="textarea"
								value={values.comment}
								onChange={handleChange}
							/>
						</Form.Group> */}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type="submit">
                            Rate
                        </Button>
                    </Modal.Footer>{' '}
                </Form>
            </Modal>

            <Modal show={showAssign} onHide={handleAssignClose} className="header">
                <Form onSubmit={assignIssue}>
                    <Modal.Header closeButton className="bg-success text-white">
                        <Modal.Title>Assign Issue</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormGroup>
                            <Label for="exampleSelect">Unit</Label>
                            <InputGroup>
                                <Button>{values.unitId}</Button>
                                <Input
                                    id="exampleSelect"
                                    name="unitId"
                                    type="text"
                                    value={values.unitName}
                                    // onChange={handleChange}
                                    required
                                    readOnly
                                />{' '}
                            </InputGroup>
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleSelect">Officers</Label>
                            <Input
                                id="exampleSelect"
                                name="officerId"
                                type="select"
                                value={values.officerId}
                                onChange={handleChange}
                                required
                            >
                                <option>Select Officers</option>
                                {officersInUnit &&
                                    officersInUnit.map((officer, id) => {
                                        return (
<<<<<<< HEAD
                                            <option key={id} value={officer?.staffId}>
                                                {officer?.staffFullname}
=======
                                            <option key={id} value={officer.staffId}>
                                                {officer.staffFullname}
>>>>>>> 16522116e73ed2849f7367c24a3e3427c93d56cc
                                            </option>
                                        );
                                    })}
                            </Input>
                        </FormGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" type="submit">
                            Assign
                        </Button>
                    </Modal.Footer>{' '}
                </Form>
            </Modal>
            <Modal show={showDetails} onHide={handleDetailsClose} className="editModal">
                <div className="edittor">
                    <p className="ceneter">Details of reported issues</p>
                    Description: {details?.issue_description}
                    <br />
                    Issuer: {details?.issuer}
                    <br />
                    Issue Name: {details?.issue_name}
                    <br />
                    Officer Unit: {details?.unit_name}
                </div>
            </Modal>
            <Modal show={showResolve} onHide={handleResolveClose} className="header">
                <Form onSubmit={resolveIssue}>
                    <Modal.Header closeButton className="bg-success text-white">
                        <Modal.Title>Resolve Issue</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormGroup>
                            <Label for="diagnose">Diagnose</Label>
                            <Input id="diagnose" name="diagnose" type="textarea" value={values.diagnose} onChange={handleChange} required />
                        </FormGroup>
                        <FormGroup>
                            <Label for="remarks">Remark</Label>
                            <Input id="remarks" name="remarks" type="textarea" value={values.remarks} onChange={handleChange} required />
                        </FormGroup>
                        <FormGroup>
                            <Label for="resolution">Resolution</Label>
                            <br />
                            <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                                <input
                                    type="radio"
                                    className="btn-check"
                                    name="resolution"
                                    id="resolution1"
                                    autocomplete="off"
                                    value={1}
                                    onChange={handleChange}
                                    required
                                />
                                <label className="btn btn-outline-success" for="resolution1">
                                    Resolved
                                </label>

                                <input
                                    type="radio"
                                    className="btn-check"
                                    name="resolution"
                                    id="resolution2"
                                    autocomplete="off"
                                    value={2}
                                    onChange={handleChange}
                                    required
                                />
                                <label className="btn btn-outline-danger" for="resolution2">
                                    Unresolved
                                </label>
                            </div>
                        </FormGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" type="submit">
                            Save
                        </Button>
                    </Modal.Footer>{' '}
                </Form>
            </Modal>
        </>
    );
}
