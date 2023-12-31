import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <Navbar expand="md" variant="dark" className="custom-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/">
          React-Query
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/*        <Nav.Link as={NavLink} to="#home">
              Home
            </Nav.Link> */}
            <Nav.Link as={NavLink} to="/random-cat">
              Random Cat
            </Nav.Link>
            <Nav.Link as={NavLink} to="/hacker">
              Search HackerNews
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
