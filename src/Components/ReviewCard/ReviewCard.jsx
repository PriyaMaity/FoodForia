import React from "react";
import "./ReviewCard.css";
import avatar1 from "../../assets/avatar1.jpg";
import avatar2 from "../../assets/avatar2.jpg";
import avatar3 from "../../assets/avatar3.jpg";
import avatar4 from "../../assets/avatar4.jpg";
import avatar5 from "../../assets/avatar5.jpg";

const avatarMap = {
  alice: avatar1,
  bob: avatar2,
  charlie: avatar3,
  diana: avatar4,
  edward: avatar5,
};

const ReviewCard = ({ review }) => {
  const { username, date, rating, comment, avatarUrl } = review;

  const chosenAvatar =
    avatarUrl ||
    avatarMap[username.toLowerCase()] ||
    "https://picsum.photos/100/100";
  console.log("Username:", username);

  const renderStars = (stars) => {
    const filledStars = "★".repeat(stars);
    const emptyStars = "☆".repeat(5 - stars);
    return (
      <span className="review-item__stars">
        {filledStars}
        {emptyStars}
      </span>
    );
  };

  return (
    <div className="review-item">
      {/* Avatar and name/date container */}
      <div className="review-item__header">
        <img
          src={chosenAvatar}
          alt={username}
          className="review-item__avatar"
        />
        <div className="review-item__user">
          <div className="review-item__username">{username}</div>
          <div className="review-item__date">{date}</div>
        </div>
      </div>

      {/* Star rating and comment */}
      <div className="review-item__content">
        <div className="review-item__rating">{renderStars(rating)}</div>
        <p className="review-item__comment">{comment}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
