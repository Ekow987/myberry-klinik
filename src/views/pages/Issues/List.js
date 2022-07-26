import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

export default function IssuesList() {
    const [issueTypes, setIssueTypes] = useState();
    // const [rows,setRow] = useState([]);

    const superUserColumns = [
        { field: 'id', headerName: '#', width: 5 },
        {
            headerName: 'Created At',
            field: 'createdAt',
            width: 100
        },
        { field: 'issue_description', headerName: 'Description', width: 220 },
        { field: 'issuer', headerName: 'Issuer', width: 150 },
        { field: 'issue_name', headerName: 'Issue Type', width: 130 },
        {
            field: 'assign_by',
            headerName: 'Assign By'
        },

        {
            field: 'assign_by',
            headerName: 'Assign By'
        }
    ];

    const getSuperUserList = async () => {
        let url;
        url = `http://localhost:5000/api/v1/issues/issue-types`;
        try {
            let result = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const response = await result.json;
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        getSuperUserList();
    }, []);

    return (
        <div>
            {/* <DataGrid rows={issueTypes} columns={superUserColumns} /> */}
        </div>
    );
}
