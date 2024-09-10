import React from "react";
import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./components/screens/HomeScreen";
import SignupScreen from "./components/screens/SignupScreen";
import LoginScreen from "./components/screens/LoginScreen";
import CartScreen from "./components/screens/CartScreen";
import ProductScreen from "./components/screens/ProductScreen";
import PaymentScreen from "./components/screens/payment";
import CashOnDeliveryConfirmationScreen from "./components/screens/CashOnDeliveryConfirmationScreen";
import EsewaVerificationScreen from "./components/screens/EsewaVerificationScreen";
import SuccessScreen from "./components/screens/SuccessScreen";
import OwnerScreen from "./components/screens/OwnerScreen";

export default function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<HomeScreen />}></Route>
        </Routes>
        <Routes>
          <Route exact path="/product/:id" element={<ProductScreen />}></Route>
        </Routes>
        <Routes>
          <Route exact path="/login" element={<LoginScreen />}></Route>
        </Routes>
        <Routes>
          <Route exact path="/signup" element={<SignupScreen />}></Route>
        </Routes>
        <Routes>
          <Route exact path="/ownersc" element={<OwnerScreen />}></Route>
        </Routes>
        
        <Routes>
          <Route exact path="/cart/:id?" element={<CartScreen />}></Route>
        </Routes>
        <Routes>
          <Route path="/payment" element={<PaymentScreen />} />
          <Route path="/esewaVerify" element={<EsewaVerificationScreen />} />
          
        </Routes>
        <Routes>
  {/* Other routes */}
  <Route path="/orderSuccess" element={<SuccessScreen />} />
  <Route path="/codConfirm" element={<CashOnDeliveryConfirmationScreen />} />
</Routes>
      </Router>
    </>
  );
}
