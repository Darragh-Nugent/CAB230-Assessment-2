
import React from "react";
import { Box, Rating, Typography, Grid, Card, CardContent } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';

import searchRentals from "../models/RentalModel.jsx";

const columns = [
    {
        field: 'title',
        headerName: 'Title',
        width: 500
    },
    {
        field: 'rent',
        headerName: 'Rent',
        width: 80,
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
    },
    {
        field: 'postcode',
        headerName: 'Postcode',
        width: 110,
    },
    {
        field: 'state',
        headerName: 'State',
        width: 150,
    },
    {
        field: 'suburb',
        headerName: 'Suburb',
        width: 150,
    },
    {
        field: 'bathrooms',
        headerName: '# Bathrooms',
        width: 150,
    },
    {
        field: 'bedrooms',
        headerName: '# Bedrooms',
        width: 150,
    },
    {
        field: 'parkingSpaces',
        headerName: '# Parks',
        width: 150,
    },
    {
        field: 'averageRating',
        headerName: 'Rating',
        width: 180,
        renderCell: (params) => (
            <Rating
                value={params.value}
                precision={0.1}
                readOnly
            />
        ),
    }

];


export default function DataGridDemo() {
    const rows = searchRentals();
    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows.data}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    );
}

