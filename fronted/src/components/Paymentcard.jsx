import React, { useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import CreatePaymentForm from "./createpaymentForm"; // Importing your unchanged CreatePaymentForm

const PaymentCard = ({ title, description, dueDate, status }) => {
  const [showModal, setShowModal] = useState(false);

  const handleEditClick = () => {
    setShowModal(true); // Show the modal when "Edit" is clicked
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
  };

  return (
    <>
      <Card className="mb-3" style={{ width: "100%" }}>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <div className="d-flex justify-content-between">
            <div>
              <small>Due: {dueDate}</small>
            </div>
            <div>
              <small>Status: {status}</small>
            </div>
          </div>
          <div className="d-flex justify-content-end mt-3">
            <Button variant="primary" className="me-2" onClick={handleEditClick}>
              Edit
            </Button>
            <Button variant="danger">Delete</Button>
          </div>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <CreatePaymentForm title="Edit Payment" />
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

export default PaymentCard;
