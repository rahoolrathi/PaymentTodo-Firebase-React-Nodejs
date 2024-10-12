import React from "react";
import NavbarComponent from "./NavBar";
import PaymentCard from "./Paymentcard";
import { Container, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
const Mainpage = () => {
  const location = useLocation();
  const { token } = location.state || {}; // Access token from state

  console.log("Auth Token:", token);
  const notifications = [
    { message: "Payment due for Invoice #123", dueDate: "10/15/2024" },
    { message: "Payment received for Invoice #456", dueDate: "10/12/2024" },
  ];

  const payments = [
    {
      title: "Invoice #123",
      description: "Payment due for services rendered.",
      dueDate: "10/15/2024",
      status: "Pending",
    },
    {
      title: "Invoice #456",
      description: "Payment received for development project.",
      dueDate: "10/12/2024",
      status: "Completed",
    },
    {
      title: "Invoice #789",
      description: "Payment pending for consulting services.",
      dueDate: "10/20/2024",
      status: "Pending",
    },
  ];

  const handleCreatePayment = () => {
    console.log("Create Payment button clicked!");
  };

  return (
    <>
      <NavbarComponent
        onCreatePayment={handleCreatePayment}
        notifications={notifications}
      />
      {/* Ensure there is no top margin or padding in the container */}
      <Container fluid className="mt-2">
        <Row className="d-flex justify-content-start">
          {" "}
          {/* Align items to the start */}
          {payments.map((payment, index) => (
            <Col key={index} md="auto" className="mb-4">
              <PaymentCard
                title={payment.title}
                description={payment.description}
                dueDate={payment.dueDate}
                status={payment.status}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Mainpage;
