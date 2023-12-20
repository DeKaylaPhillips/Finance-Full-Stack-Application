import axios from "axios";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NavBar({ firstName, lastName }) {
  async function signOut() {
    const response = await axios.post("/api/signOut/")
    console.log(response)
  }
  return (
    <div>
      <Navbar bg="light" variant="light" fixed="top">
        <Container fluid>
          <Navbar.Brand href="/dashboard">Capital Kay Finance</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/articles">
              Dashboard
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
              <a href="/" onClick={() => (signOut)}>Logout</a>
            </Navbar.Text>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
