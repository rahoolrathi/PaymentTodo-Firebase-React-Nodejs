import React from "react";
import CustomButton from "./CustomButton";
import CustomInput from "./CustomInput"; // Assuming this is a reusable input component
// Assuming you have a date picker component

const CreatePaymentForm = ({ title }) => {
  return (
    <div className="custom-container">
      <div className="form-container">
        <div className="form">
          <h2>{title}</h2>
          <CustomInput type="text" placeholder="Title" />
          <CustomInput type="text" placeholder="Description" />
          <input type="date" className="custom-input" placeholder="Due Date" />
          <select class="paidOption">
            <option value="Unpaid">Unpaid</option>
            <option value="Paid">Paid</option>
          </select>
          <CustomButton>Create Payment</CustomButton>
        </div>
      </div>
    </div>
  );
};

export default CreatePaymentForm;
