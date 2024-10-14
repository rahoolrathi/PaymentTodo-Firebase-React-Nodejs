import React, { useEffect, useState } from "react";
import NavbarComponent from "./NavBar";
import PaymentCard from "./Paymentcard";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap"; // Import Alert for error messages
import { useLocation } from "react-router-dom";
import axios from "axios"; // Import axios for API requests
import { messaging } from "../firebase";
import { onMessage } from "firebase/messaging";
const Mainpage = () => {
  const token = localStorage.getItem("authToken");

  console.log("Auth Token:", token);
  const [payments, setPayments] = useState([]); // State to hold payments
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [creatingPayment, setCreatingPayment] = useState(false);
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    const setupMessageListener = () => {
      // Listen for foreground messages
      onMessage(messaging, (payload) => {
        console.log("Foreground message received: ", payload);
        const { title, body } = payload.notification;

        // Optionally show an alert or notification in the UI
        alert(`Notification: ${title} - ${body}`);
        fetchNotifications();
      });
    };

    setupMessageListener();
  }, [token]);

  const handleEditPayment = async (paymentId, updatedData) => {
    try {
      const modifiedData = {
        ...updatedData,
        paymentId: paymentId,
        status: updatedData.paymentStatus,
      };

      delete modifiedData.paymentStatus;
      await axios.put("http://localhost:3001/api/paymenttodo/", modifiedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await fetchPayments();
    } catch (error) {
      console.error("Error editing payment:", error);
      setError(error.response?.data?.message || "Error editing payment.");
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/notifaction/", // Adjust the endpoint accordingly
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the headers
          },
        }
      );
      console.log(response.data);
      setNotifications(response.data); // Set notifications from API response
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setError(
        error.response?.data?.message || "Error fetching notifications."
      );
    }
  };

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
    fetchPayments();
    fetchNotifications();
    const intervalId = setInterval(fetchNotifications, 60000); // Run every minute (60,000 milliseconds)

    return () => clearInterval(intervalId);
  }, [token]);

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
                    onEdit={handleEditPayment}
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
