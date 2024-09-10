import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-dark text-white pt-4 pb-3">
      <Container>
        <Row>
          <Col md={4}>
            <h5>About Us</h5>
            <p>
              At Gadi Bazar, we strive to deliver exceptional online shopping experiences. Explore our extensive collection of products, and enjoy top-notch service and value.
            </p>
          </Col>
          <Col md={4}>
            <h5>Contact Us</h5>
            <p><strong>Address:</strong> 1234 Street Name, City, State, ZIP</p>
            <p><strong>Email:</strong> contact@example.com</p>
            <p><strong>Phone:</strong> (123) 456-7890</p>
          </Col>
          <Col md={4}>
            <h5>Follow Us</h5>
            <div className="d-flex gap-3 mb-3">
              <a href="https://facebook.com" className="text-white" target="_blank" rel="noopener noreferrer">
                <FaFacebook size={24} />
              </a>
              <a href="https://twitter.com" className="text-white" target="_blank" rel="noopener noreferrer">
                <FaTwitter size={24} />
              </a>
              <a href="https://instagram.com" className="text-white" target="_blank" rel="noopener noreferrer">
                <FaInstagram size={24} />
              </a>
              <a href="https://linkedin.com" className="text-white" target="_blank" rel="noopener noreferrer">
                <FaLinkedin size={24} />
              </a>
            </div>
            <h5>Milestones</h5>
            <ul className="list-unstyled">
              <li>2024: Launched new product line.</li>
              <li>2023: Expanded to international markets.</li>
              <li>2022: Reached 1 million customers.</li>
            </ul>
          </Col>
        </Row>
        
        <div className="text-center mt-3">
          <p>&copy; {new Date().getFullYear()} Gadi Bazar. All rights reserved.</p>
          <p>
            <Link to="/privacy-policy" className="text-white">Privacy Policy</Link> | 
            <Link to="/terms-of-service" className="text-white">Terms of Service</Link>
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
