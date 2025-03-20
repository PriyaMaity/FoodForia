import React from "react";
import ReviewCard from "../ReviewCard/ReviewCard";

export default function ReviewList({ reviews }) {
  return (
    <div className="reviews-list">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
}
