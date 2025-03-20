import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Payment.css";
import PaymentGIF from "../../assets/payment.gif";

export default function Payment() {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [building, setBuilding] = useState("");
  const [pincode, setPincode] = useState("");
  const [mobile, setMobile] = useState("");
  const [landmark, setLandmark] = useState("");
  const [coupon, setCoupon] = useState("");

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const discount = coupon === "DISCOUNT10" ? 0.1 * totalPrice : 0;
  const netAmount = totalPrice - discount;

  const areAllRequiredFieldsFilled = () => {
    return (
      name.trim() !== "" &&
      address.trim() !== "" &&
      pincode.trim() !== "" &&
      mobile.trim() !== ""
    );
  };

  const handlePayment = () => {
    if (areAllRequiredFieldsFilled()) {
      alert("Payment Successful!");
    } else {
      alert("Please fill in all required fields.");
    }
  };

  return (
    <div className="payment-container">
      <div className="payment-summary">
        <img src={PaymentGIF} alt="Delivery" />
      </div>

      <div className="payment-details">
        <h2>Enter Your Details</h2>

        <div className="user-inputs">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Building No. and Street Name (Optional)"
            value={building}
            onChange={(e) => setBuilding(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Landmark (Optional)"
            value={landmark}
            onChange={(e) => setLandmark(e.target.value)}
          />
        </div>

        <div className="payment-summary-section">
          <p>Amount: ₹{totalPrice}</p>
          <p>Discount: {discount ? `10% OFF` : "0% OFF"}</p>
          <p>Net Amount: ₹{netAmount}</p>
          <div className="coupon-section">
            <input
              type="text"
              placeholder="Enter Coupon Code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
            />
            <button>Apply</button>
          </div>
        </div>

        <div className="payment-actions">
          <button onClick={() => navigate("/cart")}>Back</button>
          <button onClick={handlePayment}>Pay</button>
        </div>
      </div>
    </div>
  );
}
