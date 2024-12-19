import { Navbar, Container } from "react-bootstrap";
import Logo from "../assets/Logo.png";
import { Link, NavLink } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";

const NavbarComponent = () => {
    return (

        <Box className="navbar-wrapper">
        <Navbar className="custom-navbar" data-bs-theme="dark">
          <Container fluid>
            <NavLink to="/">
              <img src={Logo} alt="Siete Logo" className="sieteLogo" />
            </NavLink>
          </Container>
        </Navbar>
  
       
        <Box className="bottom-bar">
          <Container className="bottom-bar-content">
            <Flex justify="space-between" align="center">
           
              <Flex>
                <Link to="/" className="navTextLeft">
                  Home
                </Link>
                <Link to="/Contact" className="navTextLeft">
                  Contact Us
                </Link>
              </Flex>
  
              <Flex>
                <Link to="/Dashboard" className="navTextRight">
                  Dashboard
                </Link>
                <Link to="/Login" className="navTextRight">
                  Login
                </Link>
                <Link to="/CreateAccount" className="navTextRight">
                  Create Account
                </Link>
              </Flex>
            </Flex>
          </Container>
        </Box>
      </Box>

    );
  };
  
  export default NavbarComponent;
