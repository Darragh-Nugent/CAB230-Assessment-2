import React from "react";
import { Box, Container, Typography } from "@mui/material";

import RentalTable from "../components/RentalTable.jsx";
import AdvancedSearchBox from "../components/AdvancedSearchBox";

// export default function Rentals() {
//   return (
//     <main>
//       <AdvancedSearchBox />
//       <RentalTable />
//     </main>
//   );
// }

export default function Rentals() {
  return (
    <Box sx={{ bgcolor: 'custom.backgroundLight', minHeight: '100vh', py: 4 }}>
      
      <Container maxWidth="xl">
        
        {/* Page Title */}
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
          Rental Listings
        </Typography>

        {/* Search */}
        <Box sx={{ mb: 3 }}>
          <AdvancedSearchBox />
        </Box>

        {/* Table */}
        <RentalTable />

      </Container>
    </Box>
  );
}
