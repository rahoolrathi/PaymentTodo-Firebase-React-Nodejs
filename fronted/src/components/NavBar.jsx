import React, { useState } from "react";
import {
  Container,
  Nav,
  Navbar as BootstrapNavbar,
  Button,
  Dropdown,
  Badge,
  Modal,
} from "react-bootstrap";
import { BellFill } from "react-bootstrap-icons";
import CreatePaymentForm from "./createpaymentForm"; // Ensure correct path

const NavbarComponent = ({ onCreatePayment, notifications }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false); // State for modal visibility

  const handleToggle = () => setShowDropdown(!showDropdown);

  const handleCreatePayment = () => {
    setShowModal(true); // Show modal when Create Payment button is clicked
  };

  const handleCloseModal = () => setShowModal(false); // Close modal

  return (
    <>
      <BootstrapNavbar
        expand="lg"
        className="bg-dark text-light rounded-navbar"
      >
        <Container fluid className="px-3">
          <BootstrapNavbar.Brand
            href="#home"
            className="d-flex align-items-center text-white"
          >
            <img
              src="./applogo.jpg"
              alt="Logo"
              style={{
                height: "40px",
                width: "40px",
                marginRight: "15px",
                borderRadius: "50%",
                overflow: "hidden",
              }}
            />
            <span style={{ color: "white", fontSize: "1.25rem" }}>
              Payment Reminder App
            </span>
          </BootstrapNavbar.Brand>
          <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
          <BootstrapNavbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto"></Nav>
            <div className="d-flex align-items-center">
              <Button
                variant="success"
                className="me-2"
                onClick={handleCreatePayment}
              >
                Create Payment
              </Button>
              <Dropdown show={showDropdown} onToggle={handleToggle}>
                <Dropdown.Toggle
                  as="div"
                  id="notification-dropdown"
                  onClick={handleToggle}
                  style={{ cursor: "pointer", position: "relative" }}
                >
                  <BellFill size={24} className="text-white" />
                  {notifications.length > 0 && (
                    <Badge
                      bg="danger"
                      pill
                      style={{
                        position: "absolute",
                        top: "-5px",
                        right: "-5px",
                        fontSize: "10px",
                      }}
                    >
                      {notifications.length}
                    </Badge>
                  )}
                </Dropdown.Toggle>

                <Dropdown.Menu
                  align="end"
                  className="dropdown-menu-end"
                  style={{ width: "300px" }}
                >
                  <Dropdown.Header>Notifications</Dropdown.Header>
                  {notifications && notifications.length > 0 ? (
                    notifications.map((notification, index) => (
                      <Dropdown.Item
                        key={index}
                        style={{ whiteSpace: "normal" }}
                      >
                        <div className="d-flex align-items-start">
                          <div className="me-3">
                            <i className="bi bi-exclamation-circle-fill"></i>
                          </div>
                          <div>
                            <strong>{notification.message}</strong>
                            <div className="small text-muted">
                              Due Date: {notification.dueDate}
                            </div>
                          </div>
                        </div>
                      </Dropdown.Item>
                    ))
                  ) : (
                    <Dropdown.Item>No new notifications</Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </BootstrapNavbar.Collapse>
        </Container>
      </BootstrapNavbar>

      <Modal show={showModal} onHide={handleCloseModal} centered size="md">
        <Modal.Header closeButton>
          <Modal.Title>Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "600px", overflowY: "hidden" }}>
          <CreatePaymentForm title="Create Payment" />{" "}
          {/* Render the form inside the modal */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NavbarComponent;
