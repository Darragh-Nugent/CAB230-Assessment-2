import React from "react";
import { useState, useEffect } from 'react';

import { Box, Container, Typography, Card } from "@mui/material";

import AGRentalTable from "./components/AGRentalTable.jsx";
import AdvancedSearchBox from "./components/AdvancedSearchBox.jsx"
import { getStates, getPropertyTypes } from "../../api/rentalApi.js"

export default function Rentals() {
  const [states, setStates] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);

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
      let statesData;
      try {
        statesData = await getStates();
      } catch {
        statesData = NULL;
      }

      let propertyTypesData;
      try {
        propertyTypesData = await getPropertyTypes();
      } catch {
        propertyTypesData = NULL;
      }

      setStates(statesData);
      setPropertyTypes(propertyTypesData);
    }

    loadData();
  }, []);


  return (
    <Box sx={{ bgcolor: 'custom.backgroundLight', minHeight: '100vh', py: 4 }}>

      <Container maxWidth="xl">

        <Box sx={{ mb: 3 }}>

          <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
            Rental Listings
          </Typography>

          <Typography variant="body1" color="text.secondary">
            Search and filter properties across Australia
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <AdvancedSearchBox
            filterModel={filterModel}
            setFilterModel={setFilterModel}
            states={states}
            propertyTypes={propertyTypes}
          />
        </Box>

        <Card sx={{
          borderRadius: 3,
          boxShadow: 3,
          bgcolor: 'custom.card',
        }}>
          <AGRentalTable
            filterModel={filterModel}
            setFilterModel={setFilterModel}
          />
        </Card>
      </Container>
    </Box>
  );
}
