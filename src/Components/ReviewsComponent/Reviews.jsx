import React, { useState, useEffect, useMemo, useRef } from "react";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import { app } from "../../Config/firebase";
import ReviewsList from "../ReviewList/ReviewList";
import "./Reviews.css";
import { reviewsData } from "../Data/Reviews";
import FAQs from "../FAQsComponent/FAQs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const customerImages = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxqfyojxMBijikrAeZvgsCyIDMD-rCktUBPw&s",
  "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfjhkUsJa4nFmUhaf69WdfrRca0zbetiMmjQ&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjAMLedZRk2kc2Gg7NC0jRaHIjxa1-vf-b_A&s",
  "https://media.post.rvohealth.io/wp-content/uploads/2021/08/tofu-salad-pineapple-quinoa-vegan-meal-1296x728-header-800x728.png",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJ8Nw_IHsnqN1I0hju49GzBaeP0MLIlLnxgQ&s",
];

export default function Reviews() {
  const db = getFirestore(app);
  const auth = getAuth(app);

  const [authUser, setAuthUser] = useState(null);

  // Start with local reviews (dummy data)
  const [reviews, setReviews] = useState(reviewsData);

  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [sortOption, setSortOption] = useState("top");
  const imagesRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setAuthUser(currentUser);
    });
    return () => unsubscribe();
  }, [auth]);

  // Fetch reviews from Firestore on mount
  useEffect(() => {
    fetchReviews();
  }, [db]);

  const fetchReviews = async () => {
    try {
      const res = await getDocs(collection(db, "reviews"));
      const datas = res.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Combine local data with Firebase data
      const combinedReviews = [...datas, ...reviewsData];
      setReviews(combinedReviews);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  };

  //rating
  const averageRating = useMemo(() => {
    if (reviews.length === 0) {
      return 0;
    }
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return (sum / reviews.length).toFixed(1);
  }, [reviews]);

  // Add a new review
  const handleAddReview = async () => {
    if (!newRating || !newComment) {
      alert("Please provide both a rating and a comment.");
      return;
    }

    const username = authUser?.displayName || authUser?.email || "Guest";

    try {
      const reviewData = {
        username,
        date: new Date().toISOString().split("T")[0],
        rating: Number(newRating),
        comment: newComment,
      };

      await addDoc(collection(db, "reviews"), reviewData);

      // After adding to Firebase, fetch again to get an updated list
      const res = await getDocs(collection(db, "reviews"));
      const datas = res.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Merge with local data again
      const combinedReviews = [...datas, ...reviewsData];
      setReviews(combinedReviews);

      // Clear inputs
      setNewRating(0);
      setNewComment("");
      // Refresh reviews
      fetchReviews();
    } catch (err) {
      console.error("Error adding review:", err);
      alert("Failed to add review. Please try again later.");
    }
  };

  //carousel
  const scrollLeft = () => {
    if (imagesRef.current) {
      imagesRef.current.scrollBy({
        left: -200,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (imagesRef.current) {
      imagesRef.current.scrollBy({
        left: 200,
        behavior: "smooth",
      });
    }
  };

  // reviews
  const sortedReviews = useMemo(() => {
    let sorted = [...reviews];
    switch (sortOption) {
      case "recent":
        sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "highToLow":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "lowToHigh":
        sorted.sort((a, b) => a.rating - b.rating);
        break;
      case "top":
      default:
        sorted.sort((a, b) => b.rating - a.rating);
        break;
    }
    return sorted;
  }, [reviews, sortOption]);

  return (
    <div className="review-container">
      <h2 className="review-title">Reviews</h2>

      {/* Swiper Carousel */}
      <div className="customer-images-container">
        <h3 className="carousel-title">Images From Our Customers</h3>
        <div className="images-carousel">
          <button className="carousel-btn left" onClick={scrollLeft}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <div className="images-scroll" ref={imagesRef}>
            {customerImages.map((img, idx) => (
              <div className="image-card" key={idx}>
                <img src={img} alt={`Customer Dish ${idx + 1}`} />
              </div>
            ))}
          </div>
          <button className="carousel-btn right" onClick={scrollRight}>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>

      {/* New Review Form */}
      <div className="review-form">
        <div className="review-form-left">
          <label htmlFor="reviewComment" className="review-form-label">
            Write Review
          </label>
          <textarea
            id="reviewComment"
            rows="3"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
        </div>
        <div className="review-form-right">
          <div className="rating-group">
            <label htmlFor="reviewRating" className="review-form-label">
              Select Rating:
            </label>
            <select
              id="reviewRating"
              value={newRating}
              onChange={(e) => setNewRating(e.target.value)}
            >
              <option value="0">-- Rating --</option>
              <option value="1">1 - Poor</option>
              <option value="2">2 - Fair</option>
              <option value="3">3 - Good</option>
              <option value="4">4 - Very Good</option>
              <option value="5">5 - Excellent</option>
            </select>
          </div>
          {/* Average Rating */}
          <div className="star-average">
            <span className="star-display">
              {"★".repeat(Math.round(averageRating))}
              {"☆".repeat(5 - Math.round(averageRating))}
            </span>
            <span className="average-rating-text">
              {averageRating} / 5 <strong>Average</strong>
            </span>
          </div>
          <button className="review-add-btn" onClick={handleAddReview}>
            Add
          </button>
        </div>
      </div>

      {/* Sorting Dropdown */}
      <div className="sort-dropdown">
        <label htmlFor="sortReviews">Sort by:</label>
        <select
          id="sortReviews"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="top">Top reviews</option>
          <option value="recent">Most recent</option>
          <option value="highToLow">Rating high to low</option>
          <option value="lowToHigh">Rating low to high</option>
        </select>
      </div>

      {/* Display Reviews */}

      <ReviewsList reviews={sortedReviews} />
      <FAQs />
    </div>
  );
}
