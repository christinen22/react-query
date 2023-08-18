import { Container, Row, Col, Button } from "react-bootstrap";

const HomePage = () => {
  return (
    <>
      <section className="hero-section" id="home">
        <Container className="hero-container">
          <Row className="align-items-center">
            <Col lg={6} md={6} sm={12}>
              <div className="hero-content">
                <h1 className="hero-title">Hi, I'm learning React Query.</h1>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default HomePage;
