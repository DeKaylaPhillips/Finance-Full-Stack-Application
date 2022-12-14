import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom"
export default function NavBar({firstName, lastName}) {

    return (
        <div>
         <Navbar bg="light" variant="light" fixed="top">
        <Container fluid>
          <Navbar.Brand href="/dashboard">Capital Kay Finance</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/budgetSheet">Budget Sheet</Nav.Link>
            <Nav.Link as={Link} to="/salary-calculator">Salary Calculator</Nav.Link>
            <Nav.Link as={Link} to="/salary-finder">Salary Finder</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Navbar.Text>
              Signed in as:{" "}
              <a href="/dashboard">
                {" "}
                {firstName} {lastName}
              </a>
            </Navbar.Text>
          </Nav>
        </Container>
      </Navbar>      
        </div>  
    )
}