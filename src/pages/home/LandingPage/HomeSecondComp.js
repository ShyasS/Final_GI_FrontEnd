/* eslint-disable global-require */
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import './index.css';

// import required modules

const HomeSecondComp = () => {
  return (
    <div>
      <Container
        className="col-lg-10 col-xxl-9 col-11 mx-auto "
        style={{ paddingTop: '20px', paddingBottom: '20px' }}
        fluid
      >
        <Row className="my-2 col-12 d-flex justify-content-center mx-auto">
          <Col className="col-12 col-lg-5">
            <Image
              style={{
                height: '80vh',
                width: 'auto',
                borderRadius: '30px'
              }}
              src={require('../../../assets/img/IndB5.jpeg')}
              className="HomeSecondImg mx-auto d-block col-lg-12 col-12 "
              fluid
            />
          </Col>
          <Col
            className="col-lg-6  d-flex align-items-center col-12"
            id="HomeSecRightMain"
          >
            <Col>
              <h3
                style={{ color: 'black', fontWeight: '500' }}
                className="HomeSecH1 mt-3 text-center"
              >
                ABOUT RESTAURANT
              </h3>
              <hr className="text-black " />
              <br />
              <h2 className="HomeSecH2 text-center mt-2 text-black">
                ENJOY AN EXCEPTIONAL JOURNEY OF TASTE
              </h2>
              <p style={{ color: 'black', fontSize: '16px' }}>
                Our buzzy food-hall style concept is inspired by international
                dining styles, especially in Asia. Explore the following
                fast-action food stations as busy chefs perform.
              </p>
              <br />
              <p style={{ color: 'black', fontSize: '16px' }}>
                Enjoy a verdant Garden to Glass experience. It’s in the view,
                it’s reflected in the design, and it infuses many drinks. In
                fact, all our delicious fresh ingredients are sustainably picked
                from our Jemima’s Kitchen Garden. Our flourishing range of
                cocktails, spirits, beers and wines are all made with integrity
                and offer something for every guest.
              </p>
            </Col>
            <br />
            {/* <Button style={{ backgroundColor: '#EB003D', padding: '15px 35px', borderRadius: "30px" }}>Know More</Button> */}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomeSecondComp;

//   );
// };

// export default HomeSecondComp;
