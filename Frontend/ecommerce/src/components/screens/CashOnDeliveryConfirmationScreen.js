import React, { useState } from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function CashOnDeliveryConfirmationScreen() {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [codDetails, setCodDetails] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });
  const navigate = useNavigate();

  const handleContinue = () => {
    if (paymentMethod === "eSewa") {
      navigate("/esewaVerify");
    } else if (paymentMethod === "COD") {
      // Handle COD submission logic here, e.g., saving details or navigating
      console.log("COD Details:", codDetails);
      navigate("/orderSuccess"); // Navigate to the success screen
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCodDetails({ ...codDetails, [name]: value });
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

            {paymentMethod === "COD" && (
              <div className="my-4">
                <h2>Cash on Delivery Details</h2>
                <Form.Group controlId="codName" className="my-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    name="name"
                    value={codDetails.name}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="codPhone" className="my-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Enter your phone number"
                    name="phone"
                    value={codDetails.phone}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="codEmail" className="my-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    value={codDetails.email}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="codAddress" className="my-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter your address"
                    name="address"
                    value={codDetails.address}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </div>
            )}

            <Button
              type="button"
              className="btn-block my-3"
              disabled={!paymentMethod || (paymentMethod === "COD" && !codDetails.name)}
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

export default CashOnDeliveryConfirmationScreen;
