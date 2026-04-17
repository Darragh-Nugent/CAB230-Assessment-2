import { Link } from "react-router-dom";
import { useContext } from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import { useAuth } from '../context/AuthContext.jsx';

export default function Nav() {

  const {isAuthenticated, handleLogout} = useAuth();

  return (
    <>
      <AppBar position="sticky" color="secondary">
        <Container>
          <Toolbar>
            <LocationCityIcon sx={{fontSize:40}} />
            <Typography variant="h4" sx={{ flexGrow: 1, ml: 2 }}>
              High Rise
            </Typography>
            <Button component={Link} to="/" color="inherit">
              Home
            </Button>
            <Button component={Link} to="/About" color="inherit">
              About Us
            </Button>
            <Button component={Link} to="/Rentals" color="inherit">
              Property Search
            </Button>

            {
              isAuthenticated ? (
                <>
                  <Button component={Link} to="/Ratings" color="inherit">
                    My ratings
                  </Button>
                  <Button component={Link} to="/" color="inherit" onClick={() => {
                    handleLogout();
                  }}>
                    Log out
                  </Button>
                </>
              )
                :
                <Button component={Link} to="/Login" color="inherit">
                  Login or Sign Up
                </Button>
            }

          </Toolbar>
        </Container>

      </AppBar>
    </>
  );
}
