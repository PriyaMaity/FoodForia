import React from "react";
import { Link } from "react-router-dom";
import "./FoodCard.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  incrementQuantity,
  decrementQuantity,
} from "../../redux/cartSlice";

export default function FoodCard({ item }) {
  // const [itemCount, setItemCount] = useState(0);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // Find this item in the Redux cart (if it exists)
  const cartItem = cartItems.find((i) => i.id === item.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAdd = () => {
    dispatch(addItem(item));
  };

  const handleIncrement = () => {
    dispatch(incrementQuantity(item.id));
  };

  const handleDecrement = () => {
    dispatch(decrementQuantity(item.id));
  };
  return (
    <div className="foodCard-container">
      <div className="foodCart-img">
        <img src={item.image} alt={item.name} />
        {quantity === 0 ? (
          <i className="fa-solid fa-plus" id="add" onClick={handleAdd}></i>
        ) : (
          <div className="add-remove-btns">
            <i
              className="fa-solid fa-minus"
              id="minus"
              onClick={handleDecrement}
            ></i>
            <p>{quantity}</p>
            <i
              className="fa-solid fa-plus"
              id="plus"
              onClick={handleIncrement}
            ></i>
          </div>
        )}
      </div>
      <div className="food-info">
        <h3>{item.name}</h3>
        <p>
          Price: ₹{item.price}
          {item.serving}
        </p>
        <p>
          <i className="fa-solid fa-truck-fast"></i> &nbsp;
          {item.deliveryCharge} • <i className="fa-regular fa-clock"></i>&nbsp;
          {item.deliveryTime}
        </p>
      </div>
      <div className="food-actions">
        <button onClick={handleAdd}>Add To Cart</button>
        <button className="cart-btn">
          <Link to="/cart" className="cart-link">
            Go To Cart
          </Link>
        </button>
      </div>
    </div>
  );
}
