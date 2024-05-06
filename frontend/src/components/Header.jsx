import { Navbar, Nav, Container } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        collapseOnSelect>
        <Container>
          <Navbar.Brand
            as={Link}
            to="/">
            MERN Auth
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link
                as={Link}
                to="/login">
                <FaSignInAlt /> Sign In
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/register">
                <FaSignOutAlt /> Sign Up
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
