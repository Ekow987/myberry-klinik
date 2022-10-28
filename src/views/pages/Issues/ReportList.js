import React,{useRef} from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { CSVLink, CSVDownload } from 'react-csv';
import { Button,Col,Row } from 'reactstrap';






export default function ReportList() {
    // const componentRef = useRef();
    // const handlePrint = useReactToPrint({
    //   content: () => componentRef.current,
    //   onAfterPrint:()=>swal({
    //     text: "Print Successful",
    //     icon: "success"
    //   })
    // });

  
    
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
            width: 160,
            valueGetter: (params: GridValueGetterParams) => `${params.row.firstName || ''} ${params.row.lastName || ''}`
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
    return (
        <div>
            <Box sx={{ height: 400, width: '100%' }}>
                <div style={{ height: 400, width: '100%' }}  >
                
                    <DataGrid rows={rows} columns={columns} density="compact"  />
                    
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
            </Box>
        </div>
    );
}
