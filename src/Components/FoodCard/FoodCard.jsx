import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./FoodCard.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  incrementQuantity,
  decrementQuantity,
} from "../../redux/cartSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faTruckFast,
  faClockFour,
} from "@fortawesome/free-solid-svg-icons";

export default function FoodCard({ item }) {
  // const [itemCount, setItemCount] = useState(0);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate();

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

  const handleGetRecipe = () => {
    navigate(`/recipe/${encodeURIComponent(item.name)}`);
  };
  return (
    <div className="foodCard-container">
      <div className="foodCart-img">
        <img src={item.image} alt={item.name} />
        {quantity === 0 ? (
          <FontAwesomeIcon icon={faPlus} id="add" onClick={handleAdd} />
        ) : (
          <div className="add-remove-btns">
            <FontAwesomeIcon
              icon={faMinus}
              id="minus"
              onClick={handleDecrement}
            />
            <p>{quantity}</p>
            <FontAwesomeIcon
              icon={faPlus}
              id="plus"
              onClick={handleIncrement}
            />
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
          <FontAwesomeIcon icon={faTruckFast} /> &nbsp;
          {item.deliveryCharge} • &nbsp;
          <FontAwesomeIcon icon={faClockFour} />
          &nbsp;
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

        <button onClick={handleGetRecipe}>Get Recipe</button>
      </div>
    </div>
  );
}
