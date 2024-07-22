import React from 'react'
import {Container, Row, Col} from "react-bootstrap";

const FooterComp = () => {
  return (
    <div id='contact' className='footer pb-3 pt-4'>
      <Container>
        <Row>
          <Col>
            <h3 className='fw-bold text-white'>Kos Bu Wati</h3>
          </Col>
          <Col className='text-end'>
            <a href="https://www.instagram.com/cristiano" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-instagram text-white fs-1 mx-lg-3 mx-2"></i>
            </a>
            <a href="https://twitter.com/elonmusk" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-twitter text-white fs-1 mx-lg-3 mx-2"></i>
            </a>
            <a href="https://www.linkedin.com/in/awee1108" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-linkedin text-white fs-1 mx-lg-3 mx-2"></i>
            </a>
            <a href="https://wa.me/6281519971319" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-whatsapp text-white fs-1 mx-lg-3 mx-2"></i>
            </a>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className='text-center text-white-50'>&copy; Copyright by @ahmd_wildans
              2024, All Right Reserved. </p>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default FooterComp