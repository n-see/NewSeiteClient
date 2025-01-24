import { Navbar, Container } from "react-bootstrap";
import Logo from "../assets/Logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const NavbarComponent = () => {

  const navigate = useNavigate();

  const [greeting, setGreeting] = useState("Welcome")
  

  const logout = () => {
    localStorage.clear();
    navigate("/")
  }

  useEffect(() => {
    const d = new Date();
    const hour = d.getHours();
    if(hour <= 11)
      setGreeting("Good Morning, ")
    if(hour > 11 && hour <= 16)
      setGreeting("Good Afternoon, ")
    if(hour > 16)
      setGreeting("Good Evening, ")
  }, [])
  

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
  
              <Flex alignItems={"center"}>
                <Link to="/Dashboard" className="navTextRight">
                  Dashboard
                </Link>
                {!localStorage.getItem("UserData") ? (
                  <>
                  <Link to="/Login" className="navTextRight">
                  Login
                </Link>
                <Link to="/CreateAccount" className="navTextRight">
                  Create Account
                </Link>
                  </>
              ):
              <>
              <Text color={"white"} ml={"5rem"}  m={0}>{greeting}  user</Text>
              <Button m={0} variant={"plain"} onClick={logout} className="navTextRight">
                  Logout
                </Button>
              </>}
                
              </Flex>
            </Flex>
          </Container>
        </Box>
      </Box>

    );
  };
  
  export default NavbarComponent;
