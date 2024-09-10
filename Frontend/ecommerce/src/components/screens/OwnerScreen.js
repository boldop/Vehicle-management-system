import React, { useEffect } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { Row, Col, Image, ListGroup, Button, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../actions/cartActions";
import Loader from "../Loader";
import Message from "../Message";

function OwnerScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const productId = id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      const existingItem = cartItems.find((item) => item.product === productId);
      if (!existingItem || existingItem.qty !== qty) {
        dispatch(addToCart(productId, qty));
      }
    }
  }, [dispatch, productId, qty, cartItems]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const checkoutHandler = () => {
    navigate("/payment");
  };
  

  return (
    <Container>
      <Row>
        <Col md={18}>
          <h1>Ordered Cars</h1>
          {cartItems.length === 0 ? (
            <Message variant="info">
              Your Cart is Empty <Link to="/">Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.productName} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.product}`}>{item.productName}</Link>
                    </Col>
                    <Col md={2}>Rs. {item.price}</Col>
                    <Col md={3}>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        disabled
                      >
                        {[...Array(item.stockcount).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        
      </Row>
    </Container>
  );
}

export default OwnerScreen;
