import { Link } from "react-router-dom";

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';

import { logout } from '../models/AuthModel.js';

export default function Nav({ isAuthenticated, setIsAuthenticated }) {
  return (
    <>
      <AppBar position="sticky" color="secondary">
        <Container>
          <Toolbar>
            <HomeIcon />
            <Typography variant="h5" sx={{ flexGrow: 1 }}>
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
                  <Button component={Link} to="/About" color="inherit">
                    My ratings
                  </Button>
                  <Button component={Link} to="/" color="inherit" onClick={() => {
                    logout();
                    setIsAuthenticated(false);
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
