import React, { useEffect, useRef, useState } from "react";
import "./Home.css";
import Menu from "../Menu/Menu";
import FoodList from "../FoodList/FoodList";

const imgs = [
  "https://cdn.pixabay.com/photo/2018/11/03/07/07/food-3791530_960_720.jpg",
  "https://cdn.pixabay.com/photo/2022/06/07/20/52/curry-7249247_960_720.jpg",
  "https://cdn.pixabay.com/photo/2017/09/28/18/13/bread-2796393_640.jpg",
  "https://cdn.pixabay.com/photo/2017/03/13/13/39/pancakes-2139844_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/11/06/23/31/breakfast-1804457_960_720.jpg",
];
export default function Home() {
  const [currImg, setCurrImg] = useState(0);
  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const foodListRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrImg((prev) => (prev + 1) % imgs.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Scroll to the FoodList section smoothly when called.
  const scrollToFoodList = () => {
    if (foodListRef.current) {
      foodListRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="home">
      <div className="home-container">
        <div className="home-content">
          <h1>
            FOOD FORIA <br /> <span>For Foodie People</span>
          </h1>
          <p>DELICIOUS FOOD IS WAITING FOR YOU!</p>
          <button className="menu-btn" onClick={scrollToFoodList}>
            Check the Menu ↓
          </button>
        </div>
        <div className="home-img">
          {imgs.map((img, idx) => (
            <div
              className={`slide ${idx === currImg ? "active" : ""}`}
              key={idx}
              style={{ backgroundImage: `url(${img})` }}
            />
          ))}
        </div>
      </div>
      <Menu
        category={category}
        setCategory={setCategory}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <div ref={foodListRef}>
        <FoodList category={category} searchTerm={searchTerm} />
      </div>
    </div>
  );
}
