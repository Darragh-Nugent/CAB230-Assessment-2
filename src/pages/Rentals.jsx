import React from "react";
import { useState, useEffect } from 'react';

import { Box, Container, Typography } from "@mui/material";

import RentalTable from "../components/RentalTable.jsx";
import AdvancedSearchBox from "../components/AdvancedSearchBox";

export default function Rentals() {
  const [tableFilterModel, setTableFilterModel] = useState({ items: [] });
  const [advancedFilterModel, setAdvancedFilterModel] = useState({
      rent: { min: '', max: '' },
      bedrooms: { min: '', max: '' },
      bathrooms: { min: '', max: '' },
      parkingSpaces: { min: '', max: '' },
      averageRent: { min: '', max: '' },
  });


  return (
    <Box sx={{ bgcolor: 'custom.backgroundLight', minHeight: '100vh', py: 4 }}>

      <Container maxWidth="xl">

        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
          Rental Listings
        </Typography>

        <Box sx={{ mb: 3 }}>
          <AdvancedSearchBox
            filterModel={advancedFilterModel}
            setFilterModel={setAdvancedFilterModel}
          />
        </Box>

        <RentalTable
          tableFilterModel={tableFilterModel}
          setTableFilterModel={setTableFilterModel}
          advancedFilterModel={advancedFilterModel}
          setAdvancedFilterModel={setAdvancedFilterModel}
        />

      </Container>
    </Box>
  );
}
