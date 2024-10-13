import React, { useEffect, useState } from "react";
import NavbarComponent from "./NavBar";
import PaymentCard from "./Paymentcard";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap"; // Import Alert for error messages
import { useLocation } from "react-router-dom";
import axios from "axios"; // Import axios for API requests

const Mainpage = () => {
  const location = useLocation();
  const { token } = location.state || {};

  console.log("Auth Token:", token);
  const [payments, setPayments] = useState([]); // State to hold payments
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [creatingPayment, setCreatingPayment] = useState(false);
  const notifications = [
    { message: "Payment due for Invoice #123", dueDate: "10/15/2024" },
    { message: "Payment received for Invoice #456", dueDate: "10/12/2024" },
  ];

  const handleCreatePayment = async (formData) => {
    setCreatingPayment(true); // Start loading while creating payment
    try {
      const modifiedFormData = {
        ...formData, // Spread the existing form data
        status: formData.paymentStatus, // Rename paymentStatus to status
      };

      delete modifiedFormData.paymentStatus;
      await axios.post(
        "http://localhost:3001/api/paymenttodo",
        modifiedFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the headers
          },
        }
      );
      await fetchPayments(); // Fetch payments again after successful creation
    } catch (error) {
      console.error("Error creating payment:", error);
      setError(error.response?.data?.message || "Error creating payment.");
    } finally {
      setCreatingPayment(false); // Stop loading regardless of success or error
    }
  };

  const handleDeletePayment = async (paymentId) => {
    if (window.confirm("Are you sure you want to delete this payment?")) {
      try {
        await axios.delete(
          `http://localhost:3001/api/paymenttodo/${paymentId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Pass the token in the headers
            },
          }
        );
        await fetchPayments(); // Fetch payments again after successful deletion
      } catch (error) {
        console.error("Error deleting payment:", error);
        setError(error.response?.data?.message || "Error deleting payment."); // Set error message
      }
    }
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
        setError={setError}
      />
      <Container fluid className="mt-2">
        {loading ? (
          <Row
            className="justify-content-center align-items-center"
            style={{ minHeight: "80vh" }}
          >
            <Spinner animation="border" />
          </Row>
        ) : error ? (
          <Row className="justify-content-center">
            <Col md={6}>
              <Alert variant="danger">
                {error} {}
              </Alert>
            </Col>
          </Row>
        ) : (
          <Row className="d-flex justify-content-start">
            {" "}
            {}
            {payments.length > 0 ? (
              payments.map((payment, index) => (
                <Col key={index} md="auto" className="mb-4">
                  <PaymentCard
                    id={payment.id}
                    title={payment.title}
                    description={payment.description}
                    dueDate={payment.dueDate}
                    status={payment.status}
                    onDelete={handleDeletePayment}
                  />
                </Col>
              ))
            ) : (
              <Col className="text-center">
                {" "}
                {}
                <h5>No payments available.Create a new payment!</h5>
              </Col>
            )}
          </Row>
        )}
      </Container>
    </>
  );
};

export default Mainpage;
