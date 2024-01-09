import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function NavBar() {
  const { user, logout } = useAuth()
  const { first_name: firstName, last_name: lastName } = user

  return (
    <div>
      <Navbar bg="light" variant="light" fixed="top">
        <Container fluid>
          <Navbar.Brand href="/dashboard">Capital Kay Finance</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/articles">
              News
            </Nav.Link>
            <Nav.Link as={Link} to="/budgetSheet">
              Budget Sheet
            </Nav.Link>
            <Nav.Link as={Link} to="/salaryFinder">
              Salary Finder
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Navbar.Text>
              Logged in as:{" "}
              <a href="/articles">
                {" "}
                {firstName} {lastName}
              </a>{" "}
              <a href="/" onClick={logout}>Logout</a>
            </Navbar.Text>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
