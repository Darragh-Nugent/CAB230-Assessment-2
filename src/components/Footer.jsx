import { Typography, Box, Stack, Button, Container } from '@mui/material'

// the footer
export default function Footer() {
  return (
    <Box gap='2' sx={{
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: "secondary.dark",
      color: "secondary.contrastText",
      p: "1em"
    }}>
      <Typography variant="body1" sx={{ mb: 1 }}>
        High Rise
      </Typography>
      <Typography variant="body1">
        Copyright &copy; 2026{" "}
      </Typography>
    </Box>
  );
}
