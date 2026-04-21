import { useState, useEffect, useCallback, useMemo, useRef, } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { Box, Rating, Typography, Grid, Card, CardContent, Container } from "@mui/material";
import BedIcon from '@mui/icons-material/Bed';
import GarageIcon from '@mui/icons-material/Garage';
import BathroomIcon from '@mui/icons-material/Bathroom';

import { AllCommunityModule, themeAlpine, themeMaterial } from 'ag-grid-community';
import { AgGridProvider, AgGridReact } from 'ag-grid-react';

import PropertyRating from './PropertyRating.jsx';
import { searchRentals, getStates, getPropertyTypes } from "../models/RentalModel.js";

export default function RentalTable({ filterModel, setFilterModel }) {
    const [rows, setRows] = useState([]);
    const [rowCount, setRowCount] = useState(0);

    const [paginationModel, setPaginationModel] = useState({
        page: 0,       // DataGrid is 0-based
        pageSize: 10,
    });

    const navigate = useNavigate();

    const modules = [AllCommunityModule];
    const theme = themeAlpine;

    const gridApiRef = useRef(null);

    const defaultColDef = useMemo(() => {
        return {
            filter: false,
            floatingFilter: false,
            sortable: true
        };
    }, []);

    useEffect(() => {
        if (gridApiRef.current != null) return gridApiRef.current.setGridOption("datasource", createDataSource(filterModel));
    }, [filterModel])

    function RowLink(props) {
    const {value, data} = props
    return (
        data != null ?
        <Link onClick={() => navigate(`/rentals/${data.id}`)}>
        {value}
        </Link>
        :
        null
    );
}
    

    const [columnDefs, setColumnDefs] = useState([
        {
            field: 'title',
            headerName: 'Title',
            width: 400,
            filter: false,
            cellRenderer: RowLink
        },
        {
            field: 'rent',
            headerName: 'Rent',
            width: 80,
            cellStyle: {
                fontWeight: 600,
                color: '#40231b', // primary.main
            },
            valueFormatter: (params) => `$${params.value}`,
        },
        {
            field: 'propertyType',
            headerName: 'Property Type',
            width: 175
        },
        {
            field: 'postcode',
            headerName: 'Postcode',
            width: 95,
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
        },
        {
            field: 'bathrooms',
            headerComponentParams: {
                innerHeaderComponent: BathroomIcon
            },
            width: 80,
        },
        {
            field: 'bedrooms',
            headerComponentParams: {
                innerHeaderComponent: BedIcon
            },
            sortable: true,
            width: 80,
        },
        {
            field: 'parkingSpaces',
            headerComponentParams: {
                innerHeaderComponent: GarageIcon
            },
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

            <Box sx={{
                height: 650,
                width: '100%',

                "& .ag-header": {
                    backgroundColor: "custom.backgroundLight",
                },

                "& .ag-row:hover": {
                    backgroundColor: "custom.backgroundDark",
                },

                "& .ag-cell": {
                    display: "flex",
                    alignItems: "center",
                },
            }}
            >
                <AgGridProvider modules={modules}>
                    <AgGridReact
                        theme={theme}
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
                        onRowClicked={(event) => navigate(`/rentals/${event.data.id}`)}
                    >
                    </AgGridReact>
                </AgGridProvider>
            </Box>
        </>
    );
}


