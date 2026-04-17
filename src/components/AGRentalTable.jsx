import { useState, useEffect, useCallback, useMemo } from 'react';

import { Box, Rating, Typography, Grid, Card, CardContent } from "@mui/material";

import { AllCommunityModule } from 'ag-grid-community';
import { AgGridProvider, AgGridReact } from 'ag-grid-react';

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

    const navigate = useNavigate();

    const modules = [AllCommunityModule];



    useEffect(() => {
        async function loadData() {
            const statesData = await getStates();
            const propertyTypesData = await getPropertyTypes();

            setStates(statesData);
            setPropertyTypes(propertyTypesData);
        }

        loadData();
    }, []);

    const [columnDefs, setColumnDefs] = useState([
        // this row just shows the row index, doesn't use any data from the row
        {
            headerName: "ID",
            maxWidth: 100,
            valueGetter: "node.id",
            cellRenderer: (props) => {
                if (props.value !== undefined) {
                    return props.value;
                } else {
                    return (
                        <img src="https://www.ag-grid.com/example-assets/loading.gif" />
                    );
                }
            },
            // we don't want to sort by the row index, this doesn't make sense as the point
            // of the row index is to know the row index in what came back from the server
            sortable: false,
            suppressHeaderMenuButton: true,
        },
        {
            field: 'title',
            headerName: 'Title',
            width: 500,
            suppressHeaderMenuButton: true
        },
        {
            field: 'rent',
            headerName: 'Rent',
            width: 80,

            // filterParams: {
            //     filterOptions: ["equals", "lessThan", "greaterThan"],
            //     maxNumConditions: 1,
            // },
        },
        {
            field: 'propertyType',
            headerName: 'Property Type',
            width: 150,
        },
        {
            field: 'postcode',
            headerName: 'Postcode',
            width: 80,
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
            width: 150,
        },

        // {
        //     field: "year",
        //     filter: "agSetColumnFilter",
        //     filterParams: { values: ["2000", "2004", "2008", "2012"] },
        // },
    ]);

    const defaultColDef = useMemo(() => {
        return {
            flex: 1,
            minWidth: 150,
            floatingFilter: true,
        };
    }, []);

    const getRowId = useCallback(function (params) {
        return params.data.id;
    }, []);

    const onGridReady = useCallback(async (params) => {
        const dataSource = {
            rowCount: undefined,
            getRows: async (params) => {
                const pageSize = params.endRow - params.startRow;
                const currentPageNumber = Math.floor(params.endRow / pageSize);

                try {
                    const nextPageData = await searchRentals(currentPageNumber, params.sortModel, params.filterModel);
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
        };
        params.api.setGridOption("datasource", dataSource);
    }, []);
    
    return (
        <>
            <Box sx={{ height: 650, width: '100%' }}>
                <AgGridProvider modules={modules}>
                    <AgGridReact
                        columnDefs={columnDefs}
                        rowBuffer={0}
                        rowModelType='infinite'
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

