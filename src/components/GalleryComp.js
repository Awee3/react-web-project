import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import Gallery7 from '../assets/gallery/gallery-7.jpg';
import Gallery8 from '../assets/gallery/gallery-8.jpg';
import Gallery9 from '../assets/gallery/gallery-9.jpg';

const GalleryComp = () => {
  return (
    <section id="room">
      <Container 
        fluid 
        className='room-layout'
        data-aos="fade-up" data-aos-duration='2000'
      >
        <div className=" title-holder text-center">
          <h2>Our Room</h2>
        </div>
        <Row>
          <Col sm={4}>
            <div className='holder'>
              <Card>
                <Carousel>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={Gallery7}
                      alt="First slide"
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={Gallery7}
                      alt="Second slide"
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={Gallery7}
                      alt="Third slide"
                    />
                  </Carousel.Item>
                </Carousel>
                <Card.Body>
                  <Card.Title>Single | Rp 1.000.000/bulan</Card.Title>
                  <Card.Text>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Voluptates sequi architecto iure rerum deleniti veniam, cum sint quaerat odit illum, 
                    culpa animi rem ea! Laboriosam ea eum odio nisi autem.
                  </Card.Text>
                  {/* <Card.Text className='text-black-50'>
                    tersedia : 3
                  </Card.Text> */}
                </Card.Body>
              </Card>
            </div>
          </Col>   
                  
          <Col sm={4}>
            <div className='holder'>
              <Card>
                <Carousel>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={Gallery8}
                      alt="First slide"
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={Gallery8}
                      alt="Second slide"
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={Gallery8}
                      alt="Third slide"
                    />
                  </Carousel.Item>
                </Carousel>
                <Card.Body>
                  <Card.Title>Double | Rp 2.000.000/bulan</Card.Title>
                  <Card.Text>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates sequi 
                    architecto iure rerum deleniti veniam, cum sint quaerat odit illum, culpa 
                    animi rem ea! Laboriosam ea eum odio nisi autem.
                  </Card.Text>
                  {/* <Card.Text className='text-black-50'>
                    tersedia : 3
                  </Card.Text> */}
                </Card.Body>
              </Card>
            </div>
          </Col>   

          <Col sm={4}>
            <div className='holder'>
              <Card>
                <Carousel>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={Gallery9}
                      alt="First slide"
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={Gallery9}
                      alt="Second slide"
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={Gallery9}
                      alt="Third slide"
                    />
                  </Carousel.Item>
                </Carousel>
                <Card.Body>
                  <Card.Title>Suite | Rp3.000.000/bulan</Card.Title>
                  <Card.Text>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates sequi 
                    architecto iure rerum deleniti veniam, cum sint quaerat odit illum, culpa 
                    animi rem ea! Laboriosam ea eum odio nisi autem.
                  </Card.Text>
                  {/* <Card.Text className='text-black-50'>
                  tersedia : 3
                  </Card.Text> */}
                </Card.Body>
              </Card>
            </div>
          </Col>         
        </Row>
      </Container>
    </section>
  )
}
                
export default GalleryComp;
