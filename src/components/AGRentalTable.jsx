import { useState, useEffect, useCallback, useMemo, useRef, } from 'react';

import { Box, Rating, Typography, Grid, Card, CardContent } from "@mui/material";

import { AllCommunityModule } from 'ag-grid-community';
import { AgGridProvider, AgGridReact } from 'ag-grid-react';

import PropertyRating from './PropertyRating.jsx';
import { searchRentals, getStates, getPropertyTypes } from "../models/RentalModel.jsx";
import { useNavigate } from 'react-router-dom';

export default function RentalTable({ filterModel, setFilterModel }) {
    const [rows, setRows] = useState([]);
    const [rowCount, setRowCount] = useState(0);

    const [paginationModel, setPaginationModel] = useState({
        page: 0,       // DataGrid is 0-based
        pageSize: 10,
    });

    const navigate = useNavigate();

    const modules = [AllCommunityModule];

    const gridApiRef = useRef(null);

    const defaultColDef = useMemo(() => {
        return {
            filter: true,
            floatingFilter: true,
            filterParams: {
                maxNumConditions: 1,
            },
        };
    }, []);

    useEffect(() => {
        if (gridApiRef.current != null) return gridApiRef.current.setGridOption("datasource", createDataSource(filterModel));
    }, [filterModel])

    const [columnDefs, setColumnDefs] = useState([
        {
            field: 'title',
            headerName: 'Title',
            width: 500,
            filter: false,
        },
        {
            field: 'rent',
            headerName: 'Rent',
            width: 80,
            filter: "agNumberColumnFilter",
            filterParams: {
                maxNumConditions: 1,
                filterOptions: ["inRange", "greaterThan", "lessThan"]
            },
        },
        {
            field: 'propertyType',
            headerName: 'Property Type',
            width: 150,
            filter: false
        },
        {
            field: 'postcode',
            headerName: 'Postcode',
            width: 80,
            filterParams: {
                filterOptions: ["equals"],
            }
        },
        {
            field: 'state',
            headerName: 'State',
            width: 80,
        },
        {
            field: 'suburb',
            headerName: 'Suburb',
            width: 150,
            filterParams: {
                filterOptions: ["equals"],
            }
        },
        {
            field: 'bathrooms',
            headerName: '# Bathrooms',
            width: 100,
        },
        {
            field: 'bedrooms',
            headerName: '# Bedrooms',
            width: 100,
        },
        {
            field: 'parkingSpaces',
            headerName: '# Parks',
            width: 80,
        },
        {
            field: 'averageRating',
            headerName: 'Rating',
            width: 160,
            cellRenderer: Rating,
            cellRendererParams: {
                readOnly: true
            }
        },
    ]);


    const createDataSource = filterModel => {
        return (
            {
                rowCount: undefined,
                getRows: async (params) => {
                    const pageSize = params.endRow - params.startRow;
                    const currentPageNumber = Math.floor(params.endRow / pageSize);

                    try {
                        const nextPageData = await searchRentals(currentPageNumber, params.sortModel, filterModel);
                        let list = nextPageData.data;

                        let lastRow = -1;

                        if (list.length < pageSize) {
                            lastRow = params.startRow + list.length;
                        }

                        params.successCallback(list, lastRow)

                    } catch {
                        params.failCallback();
                    }
                },
            }
        );
    }

    const onGridReady = useCallback(async (params) => {
        gridApiRef.current = params.api;
        params.api.setGridOption("datasource", createDataSource(filterModel));
    }, [filterModel]);

    return (
        <>
            <Box sx={{ height: 650, width: '100%' }}>
                <AgGridProvider modules={modules}>
                    <AgGridReact
                        defaultColDef={defaultColDef}
                        columnDefs={columnDefs}
                        rowBuffer={0}
                        rowModelType={'infinite'}
                        cacheBlockSize={10}
                        cacheOverflowSize={2}
                        maxConcurrentDatasourceRequests={1}
                        infiniteInitialRowCount={20}
                        maxBlocksInCache={10}
                        onGridReady={onGridReady}
                    >

                    </AgGridReact>
                </AgGridProvider>
            </Box>
        </>
    );
}

