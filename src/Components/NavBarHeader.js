import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {
  MDBNavbarBrand,
  MDBTypography
} from 'mdb-react-ui-kit';
function NavbarHeader() {
  return (
    <>
      {['md'].map((expand) => (
        <Navbar key={expand} bg="light" expand={expand} className="mb-2">
          <Container fluid >
          <MDBNavbarBrand href='#'>
            <img
              src='https://www.iiitb.ac.in/includefiles/settings/iiitb-silver-jubilee-logo1.jpg'
              height='50'
              
            />
            
          </MDBNavbarBrand>
          <MDBTypography tag='div' color ="black" className='display-5  '>
          Admin Portal
          </MDBTypography>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end  flex-grow-1 pe-3" style={{

                }}>
                  <Nav.Link href="https://www.iiitb.ac.in/">IIITB Home</Nav.Link>
                  <NavDropdown
                    title="IIITB Links"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="https://www.iiitb.ac.in/">IIITB Portal</NavDropdown.Item>
                    <NavDropdown.Item href="https://www.iiitb.ac.in/faculty">
                      IIITB Faculty
                    </NavDropdown.Item>
                    <NavDropdown.Item href="https://www.iiitb.ac.in/placements-overview">
                      IIITB Placements
                    </NavDropdown.Item>
                    <NavDropdown.Item href="https://www.iiitb.ac.in/academics/masters-programmes/mtech-computer-science-and-engineering">
                      IIITB MTech Placement
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default NavbarHeader;