import React, { useState } from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function PaymentScreen() {
  const [paymentMethod, setPaymentMethod] = useState("");
  const navigate = useNavigate();

  const handleContinue = () => {
    if (paymentMethod === "eSewa") {
      navigate("/esewaVerify");
    } else if (paymentMethod === "COD") {
      navigate("/codConfirm");
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h1>Select Payment Method</h1>
          <Form>
            <Form.Group controlId="paymentMethod">
              <Form.Label>Payment Method</Form.Label>
              <Form.Select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="">Select...</option>
                <option value="eSewa">eSewa</option>
                <option value="COD">Cash on Delivery</option>
              </Form.Select>
            </Form.Group>
            <Button
              type="button"
              className="btn-block my-3"
              disabled={!paymentMethod} // Disable until a method is selected
              onClick={handleContinue}
            >
              Continue
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default PaymentScreen;
