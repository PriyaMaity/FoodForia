import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeItem,
  clearCart,
} from "../../redux/cartSlice";
import "./Cart.css";
import emptyCartGif from "../../assets/empty-cart.gif";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate();

  // Additional states for notes
  const [chefNote, setChefNote] = useState("");
  const [deliveryNote, setDeliveryNote] = useState("");

  // Calculate total
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // If cart is empty, show a placeholder
  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your Cart Is Empty</h2>
        <img src={emptyCartGif} alt="Empty Cart" />
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      <div className="cart-items">
        {cartItems.map((item) => (
          <div className="cart-item" key={item.id}>
            <img src={item.image} alt={item.name} />
            <div className="cart-item-info">
              <h3>{item.name}</h3>
              <p>Price: ₹{item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <div className="cart-item-buttons">
                <button onClick={() => dispatch(decrementQuantity(item.id))}>
                  -
                </button>
                <button onClick={() => dispatch(incrementQuantity(item.id))}>
                  +
                </button>
                <button onClick={() => dispatch(removeItem(item.id))}>
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Notes Section */}
      <div className="cart-notes">
        <div>
          <label>Note to Chef:</label>
          <textarea
            placeholder="Any special requests?"
            rows="3"
            value={chefNote}
            onChange={(e) => setChefNote(e.target.value)}
          />
        </div>
        <div>
          <label>Note to Delivery Team:</label>
          <textarea
            placeholder="Any specific instructions?"
            rows="3"
            value={deliveryNote}
            onChange={(e) => setDeliveryNote(e.target.value)}
          />
        </div>
      </div>

      {/* Cart Total & Actions */}
      <div className="cart-total">
        <h3>Total: ₹{totalPrice}</h3>
      </div>
      <div className="cart-actions">
        <button onClick={() => dispatch(clearCart())}>Reset Cart</button>
        <button onClick={() => navigate("/payment")}>Proceed to Payment</button>
      </div>
    </div>
  );
}
