import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const HeroComp = () => {
  return (
    <div className="hero min-vh-100 " id="home">
    	<Container>
        <Row>
          <Col>
					<h1 className="text-white text-center fs-1 animate__animated animate__fadeInUp"> 
						Selamat Datang Para Perantau
					</h1>
					<p className="text-white text-white-50 text-center animate__animated animate__fadeInUp"> 
						Lorem ipsum, dolor sit amet consectetur 
						adipisicing elit. Eos aut expedita dolorum. 
						Consequatur impedit deleniti eum. Placeat, 
						dolorem tempore? Voluptas repudiandae omnis 
						repellendus minus dolores dolorum, eveniet sint necessitatibus voluptatum.
					</p>
					</Col>
        </Row>
      </Container>
    </div>
	);
};


export default HeroComp
