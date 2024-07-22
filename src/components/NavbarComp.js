import React from "react";
import {Navbar, Nav, Container} from "react-bootstrap";


const NavbarComp = () => {
  // useEffect(() => {
  //   const navbar = document.getElementById('main-navbar');
    
  //   const handleMouseEnter = () => {
  //     navbar.classList.add('navbar-hover');
  //   };

  //   const handleMouseLeave = () => {
  //     navbar.classList.remove('navbar-hover');
  //   };

  //   navbar.addEventListener('mouseenter', handleMouseEnter);
  //   navbar.addEventListener('mouseleave', handleMouseLeave);

  //   return () => {
  //     navbar.removeEventListener('mouseenter', handleMouseEnter);
  //     navbar.removeEventListener('mouseleave', handleMouseLeave);
  //   };
  // }, []);
	return (
    <div className="navbar-custom sticky-top">
    <Navbar id='main-navbar' expand="lg">
      <Container >
        <Navbar.Brand href="#home" className="navbar text-white fw-bold fs-4">Kos Bu Wati</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto text-center">
            <Nav.Link href="#home" className="text-white mx-2">Home</Nav.Link>
            <Nav.Link href="#room" className="text-white mx-2">Room</Nav.Link>
            <Nav.Link href="#book" className="text-white mx-2">Book</Nav.Link>
            <Nav.Link href="#contact" className="text-white mx-2">Contact Us</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  );
};

export default NavbarComp
