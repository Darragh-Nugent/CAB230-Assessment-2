
import { useState, useEffect } from 'react';
import { Box, Rating, Typography, Grid, Card, CardContent } from "@mui/material";
import { DataGrid, getGridNumericOperators, getGridStringOperators } from '@mui/x-data-grid';

import PropertyRating from './PropertyRating.jsx';
import { searchRentals, getStates, getPropertyTypes } from "../models/RentalModel.jsx";
import { useNavigate } from 'react-router-dom';

export default function RentalTable({ tableFilterModel, setTableFilterModel, advancedFilterModel, setAdvancedFilterModel }) {
    const [states, setStates] = useState([]);
    const [propertyTypes, setPropertyTypes] = useState([]);

    const [rows, setRows] = useState([]);
    const [rowCount, setRowCount] = useState(0);

    const [paginationModel, setPaginationModel] = useState({
        page: 0,       // DataGrid is 0-based
        pageSize: 10,
    });

    const [sortModel, setSortModel] = useState([]);

    const navigate = useNavigate();


    useEffect(() => {
        async function loadData() {
            const statesData = await getStates();
            const propertyTypesData = await getPropertyTypes();

            setStates(statesData);
            setPropertyTypes(propertyTypesData);
        }

        loadData();
    }, []);

    useEffect(() => {
        async function fetchData() {
            const data = await searchRentals(paginationModel, sortModel, tableFilterModel, advancedFilterModel);

            setRows(data.data);
            setRowCount(data.pagination.total);
        }

        fetchData();
    }, [paginationModel, sortModel, tableFilterModel, advancedFilterModel]);

    const columns = [
        {
            field: 'title',
            headerName: 'Title',
            width: 500,
            filterOperators: getGridStringOperators().filter(
                (op) => op.value === 'equals'
            )
        },
        {
            field: 'rent',
            headerName: 'Rent',
            width: 80,
            filterable: false,
            valueFormatter: (value) => {
                if (!value || typeof value !== 'number') {
                    return value;
                }
                return `$${value.toLocaleString()}`;
            },
        },
        {
            field: 'propertyType',
            headerName: 'Property Type',
            width: 150,
            type: 'singleSelect',
            valueOptions: propertyTypes
        },
        {
            field: 'postcode',
            headerName: 'Postcode',
            width: 80,
            filterOperators: getGridStringOperators().filter(
                (op) => op.value === 'equals'
            )
        },
        {
            field: 'state',
            headerName: 'State',
            width: 80,
            type: 'singleSelect',
            valueOptions: states,
        },
        {
            field: 'suburb',
            headerName: 'Suburb',
            width: 150,
            filterOperators: getGridStringOperators().filter(
                (op) => op.value === 'equals'
            )
        },
        {
            field: 'bathrooms',
            headerName: '# Bathrooms',
            width: 100,
            filterable: false,
            filterOperators: getGridNumericOperators().filter(
                (op) => op.value === '>' || op.value === '<'
            ),
        },
        {
            field: 'bedrooms',
            headerName: '# Bedrooms',
            width: 100,
            // type: 'number',
            filterable: false,
            filterOperators: getGridNumericOperators().filter(
                (op) => op.value === '>' || op.value === '<'
            ),
        },
        {
            field: 'parkingSpaces',
            headerName: '# Parks',
            width: 80,
            filterable: false,
            filterOperators: getGridNumericOperators().filter(
                (op) => op.value === '>' || op.value === '<'
            ),
        },
        {
            field: 'averageRating',
            headerName: 'Rating',
            width: 150,
            filterable: false,
            filterOperators: getGridNumericOperators().filter(
                (op) => op.value === '>' || op.value === '<'
            ),
            renderCell: (params) => (
                <Rating
                    value={params.value}
                    precision={0.1}
                    readOnly
                />
            ),
        }
    ];

    // const rows = await searchRentals();
    return (
        <Box sx={{ height: 650, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                rowCount={rowCount}

                paginationMode="server"
                sortingMode="server"
                filterMode="server"

                filterModel={tableFilterModel}
                onFilterModelChange={setTableFilterModel}

                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}

                sortModel={sortModel}
                onSortModelChange={setSortModel}

                onRowClick={(data) => navigate(`/rentals/${data.row.id}`)}

                sx={{
                    border: 'none',
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: '#14c58a', // Set your color here
                    },

                    '& .MuiDataGrid-columnHeaderTitle': {
                        // color: 'primary.contrastText',
                        //     fontWeight: 600,
                    },

                    '& .MuiDataGrid-row:hover': {
                        bgcolor: 'rgba(118, 137, 56, 0.08)', // soft green hover
                    },

                    '& .MuiDataGrid-cell': {
                        borderBottom: '1px solid',
                        borderColor: 'custom.border',
                    },

                    '& .MuiDataGrid-footerContainer': {
                        border: 'none',
                    },
                }
                }
            />
        </Box>
    );
}

