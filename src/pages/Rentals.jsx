import React from "react";
import { useState, useEffect } from 'react';

import { Box, Container, Typography } from "@mui/material";

import RentalTable from "../components/RentalTable.jsx";
import AGRentalTable from "../components/AGRentalTable.jsx";
import AdvancedSearchBox from "../components/AdvancedSearchBox";
import { getStates, getPropertyTypes } from "../models/RentalModel.jsx"

export default function Rentals() {
  const [states, setStates] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);

  const [tableFilterModel, setTableFilterModel] = useState({ items: [] });
  const [filterModel, setFilterModel] = useState({
    suburb: '',
    state: '',
    postcode: '',
    rent: { min: '', max: '' },
    bathrooms: { min: '', max: '' },
    bedrooms: { min: '', max: '' },
    parkingSpaces: { min: '', max: '' },
    averageRating: { min: '', max: '' },
    propertyTypes: [],
  });


  useEffect(() => {
    async function loadData() {
      const statesData = await getStates();
      const propertyTypesData = await getPropertyTypes();

      setStates(statesData);
      setPropertyTypes(propertyTypesData);
    }

    loadData();
  }, []);


  return (
    <Box sx={{ bgcolor: 'custom.backgroundLight', minHeight: '100vh', py: 4 }}>

      <Container maxWidth="xl">

        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
          Rental Listings
        </Typography>

        <Box sx={{ mb: 3 }}>
          <AdvancedSearchBox
            filterModel={filterModel}
            setFilterModel={setFilterModel}
            states={states}
            propertyTypes={propertyTypes}
          />
        </Box>

        <AGRentalTable 
        filterModel={filterModel} 
        setFilterModel={setFilterModel}
        />

      </Container>
    </Box>
  );
}
