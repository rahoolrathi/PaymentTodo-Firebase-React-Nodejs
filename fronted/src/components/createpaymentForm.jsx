import React, { useState, useEffect } from "react";
import CustomButton from "./CustomButton";
import CustomInput from "./CustomInput"; // Assuming this is a reusable input component

const CreatePaymentForm = ({
  title,
  onSubmit,
  creatingPayment,
  setError,
  handleCloseModal,
  initialData,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    paymentStatus: "UNPAID",
  });

  const [error, setErrorState] = useState(null); // Local error state

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  useEffect(() => {
    if (initialData) {
      // Populate the form with existing payment data when editing
      console.log(initialData);
      setFormData({
        title: initialData.title,
        description: initialData.description,
        dueDate: initialData.dueDate,
        paymentStatus: initialData.status,
      });
    }
  }, [initialData]);
  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      setErrorState(null); // Clear any previous error
      handleCloseModal(); // Close the modal on successful submission
    } catch (error) {
      setErrorState(error.message || "Error creating payment.");
      //setError(error.message || "Error creating payment."); // Also set the error prop if needed
    }
  };

  return (
    <div className="custom-container">
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form">
          <h2>{title}</h2>

          {/* Title Input */}
          <CustomInput
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
          />

          {/* Description Input */}
          <CustomInput
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />

          {/* Due Date Input */}
          <input
            type="date"
            name="dueDate"
            className="custom-input"
            value={formData.dueDate}
            onChange={handleChange}
            required
          />

          <select
            name="paymentStatus" // Fixed the name to match state
            className="paidOption"
            value={formData.paymentStatus} // Use paymentStatus here
            onChange={handleChange}
          >
            <option value="UNPAID">UNPAID</option>
            <option value="PAID">PAID</option>
          </select>

          <CustomButton type="submit" disabled={creatingPayment}>
            {creatingPayment ? "Creating..." : `${title}`}
          </CustomButton>

          {error && <div className="text-danger">{error}</div>}
        </div>
      </form>
    </div>
  );
};

export default CreatePaymentForm;
