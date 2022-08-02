import React,{useState,useEffect,useContext} from 'react';
import { DataGrid } from '@mui/x-data-grid';
// import { AppContext } from '../../../components/Context/AppContext';

 
export default function DataTable() {
    const userObject = JSON.parse(localStorage.getItem('userObject'));
    const [data,setData] = useState([]);
    // const [columns,setColumns]=useState()

    // const { getStatistics } = useContext(AppContext);

    const superUserColumns = [
        { field: 'id', headerName: '#', width: 5 },,
        {
            headerName: 'Created At',
            field: 'createdAt',
            width: 100,
           
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
    ];


    const getSuperUserList = async () => {
            try {
                let result = await fetch("http://localhost:5000/api/v1/issues/", {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                let response = await result.json();
                setData(response.data)
                   console.log(response.data)
            } catch (error) {
                console.log(error);
            }
        };
    
        useEffect(()=>{
            getSuperUserList()
        },[])

    
        // const getData = async () => {
        //     let url;
        //     switch (data) {
        //         case 'superuser':
        //             url = `http://localhost:5000/api/v1/issues/`;
        //             setColumns(superUserColumns);
        //             break;
        //     }
        //     try {
        //         let result = await fetch(url, {
        //             headers: {
        //                 'Content-Type': 'application/json'
        //             }
        //         });
        //         const response = await result.json();
        //          console.log(response.data)
        //          setData(response.data)
        //     } catch (error) {
        //         console.log(error);
        //     }
        // };
    
        // useEffect(() => {
        //     getData();
        // }, [1]);

   



    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={data} columns={superUserColumns}  />
        </div>
    );
 }
