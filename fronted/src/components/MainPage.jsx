import React, { useEffect, useState } from "react";
import NavbarComponent from "./NavBar";
import PaymentCard from "./Paymentcard";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap"; // Import Alert for error messages
import { useLocation } from "react-router-dom";
import axios from "axios"; // Import axios for API requests

const Mainpage = () => {
  const location = useLocation();
  const { token } = location.state || {}; // Access token from state

  console.log("Auth Token:", token);
  const [payments, setPayments] = useState([]); // State to hold payments
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // State to hold error message

  const notifications = [
    { message: "Payment due for Invoice #123", dueDate: "10/15/2024" },
    { message: "Payment received for Invoice #456", dueDate: "10/12/2024" },
  ];

  const handleCreatePayment = () => {
    console.log("Create Payment button clicked!");
  };

  // Fetch payments from the API
  const fetchPayments = async () => {
    setLoading(true); // Start loading
    setError(null); // Reset error state
    try {
      const response = await axios.get(
        "http://localhost:3001/api/paymenttodo/",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the headers
          },
        }
      );
      console.log(response.data.data);
      setPayments(response.data.data); // Set payments from API response
    } catch (error) {
      console.error("Error fetching payments:", error);
      setError(error.response?.data?.message || "Error fetching payments."); // Set error message
    } finally {
      setLoading(false); // Stop loading regardless of success or error
    }
  };

  useEffect(() => {
    fetchPayments(); // Fetch payments on component mount
  }, [token]); // Add token as a dependency

  return (
    <>
      <NavbarComponent
        onCreatePayment={handleCreatePayment}
        notifications={notifications}
      />
      <Container fluid className="mt-2">
        {loading ? ( // Display loader while loading
          <Row
            className="justify-content-center align-items-center"
            style={{ minHeight: "80vh" }}
          >
            <Spinner animation="border" />
          </Row>
        ) : error ? ( // Display error if there is one
          <Row className="justify-content-center">
            <Col md={6}>
              <Alert variant="danger">
                {error} {/* Display the error message */}
              </Alert>
            </Col>
          </Row>
        ) : (
          <Row className="d-flex justify-content-start">
            {" "}
            {/* Align items to the start */}
            {payments.length > 0 ? ( // Check if there are payments
              payments.map((payment, index) => (
                <Col key={index} md="auto" className="mb-4">
                  <PaymentCard
                    title={payment.title}
                    description={payment.description}
                    dueDate={payment.dueDate}
                    status={payment.status}
                  />
                </Col>
              ))
            ) : (
              <Col className="text-center">
                {" "}
                {/* Handle case when no payments are available */}
                <h5>No payments available</h5>
              </Col>
            )}
          </Row>
        )}
      </Container>
    </>
  );
};

export default Mainpage;
