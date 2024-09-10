import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";

function SuccessScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay to show the loading spinner
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds delay

    // Cleanup the timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <Container className="text-center my-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          {loading ? (
            <div>
              <Spinner animation="border" variant="primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
              <p>Processing your order...</p>
            </div>
          ) : (
            <div>
              <FaCheckCircle size={80} color="green" />
              <h2 className="my-3">Order Successful!</h2>
              <p>Thank you for your purchase. Your order has been successfully placed.</p>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default SuccessScreen;
