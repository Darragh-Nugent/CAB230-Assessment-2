import { useState, useEffect, useCallback, useMemo, useRef, } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { Box, Rating } from "@mui/material";
import BedIcon from '@mui/icons-material/Bed';
import GarageIcon from '@mui/icons-material/Garage';
import BathroomIcon from '@mui/icons-material/Bathroom';

import { AllCommunityModule, themeAlpine } from 'ag-grid-community';
import { AgGridProvider, AgGridReact } from 'ag-grid-react';

import { searchRentals } from "../../../api/rentalApi.js";

export default function RentalTable({ filterModel, setFilterModel }) {

    const navigate = useNavigate();

    const modules = [AllCommunityModule];
    const theme = themeAlpine;

    const gridApiRef = useRef(null);

    useEffect(() => {
        if (gridApiRef.current != null) return gridApiRef.current.setGridOption("datasource", createDataSource(filterModel));
    }, [filterModel])

    // Place components in a container component. Otheriwise the grid tries to pass its own parameters into the components
    function RatingHeader(props) {
        if (props.data) {
            return <Rating value={props.value} readOnly />;
        }
    }

    // Add wrapper functions. Otherwise the grid attempts to pass props into the icons
    function BedHeader() {
        return (
            <BedIcon fontSize="small" />
        );
    }

    function BathHeader() {
        return (
            <BathroomIcon fontSize="small" />
        );
    }

    function GarageHeader() {
        return (
            <GarageIcon fontSize="small" />
        );
    }

    function RowLink(props) {
        const { value, data } = props
        return (
            data != null ?
                <Link onClick={() => navigate(`/rentals/${data.id}`)}>
                    {value}
                </Link>
                :
                null
        );
    }

    const defaultColDef = useMemo(() => {
        return {
            filter: false,
            floatingFilter: false,
            sortable: true
        };
    }, []);

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
            valueFormatter: (params) => {
                if (params.value) {
                    `$${params.value}`
                }
            },
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
                innerHeaderComponent: BathHeader,
                innerHeaderComponentParams: {
                    "aria-label": "Bathrooms"
                }
            },
            width: 80,
        },
        {
            field: 'bedrooms',
            headerComponentParams: {
                innerHeaderComponent: BedHeader,
                innerHeaderComponentParams: {
                    "aria-label": "Bedrooms"
                }
            },
            sortable: true,
            width: 80,
        },
        {
            field: 'parkingSpaces',
            headerComponentParams: {
                innerHeaderComponent: GarageHeader,
                innerHeaderComponentParams: {
                    "aria-label": "Parking Spaces"
                }
            },
            width: 80,
        },
        {
            field: 'averageRating',
            headerName: 'Rating',
            width: 160,
            cellRenderer: RatingHeader,
            cellRendererParams: {
                readOnly: true
            }
        },
    ]);

    // Create the source for the data every time the sorting or filtering changes. Otherwise, even when the state variables change
    // it doesn't update the datasource
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
        params.api.setGridOption("datasource", await createDataSource(filterModel));
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
                        rowBuffer={20}
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


