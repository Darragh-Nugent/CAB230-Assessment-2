import { Link } from "react-router-dom";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import HomeIcon from '@mui/icons-material/Home';



// navigation links
export default function Nav() {
  return (
    // <nav>
    //   <ul>
    //     <li><Link to="/">Home</Link></li>
    //     <li><Link to="/menu">Menu</Link></li>
    //     <li><Link to="/book">Book</Link></li>
    //     <li><Link to="/about">About</Link></li>
    //   </ul>
    // </nav>

    <>
      <AppBar position="sticky" color="primary">
        <Container>
          <Toolbar>
            <HomeIcon />
            <Typography variant="h5" sx = {{flexGrow: 1}}>
              Yo
            </Typography>
            <Button component={Link} to="/" color="inherit">
              Home
            </Button>
            <Button component={Link} to="/About" color="inherit">
              About Us
            </Button>
            <Button component={Link} to="/About" color="inherit">
              Property Search
            </Button>
            <Button component={Link} to="/About" color="inherit">
              My ratings
            </Button>
          </Toolbar>
        </Container>

      </AppBar>
    </>
  );
}
