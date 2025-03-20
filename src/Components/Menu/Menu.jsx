import React, { useRef } from "react";
import { menus } from "../Data/MenuCarousel";
import "./Menu.css";

// Duplicate the items so that the carousel can wrap seamlessly.
const duplicateMenus = [...menus, ...menus];

export default function Menu({
  category,
  setCategory,
  searchTerm,
  setSearchTerm,
}) {
  const menuRef = useRef(null);

  const scrollLeft = () => {
    if (menuRef.current) {
      menuRef.current.scrollBy({
        left: -200,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (menuRef.current) {
      menuRef.current.scrollBy({
        left: 200,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="menu-container">
      <div className="food-options">
        <h3>What would you like to order</h3>
        <input
          type="text"
          placeholder="Search by food or category"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="menus">
        <button onClick={scrollLeft}>
          <i className="fa-solid fa-arrow-left"></i>
        </button>

        <div className="menu-scroll" ref={menuRef}>
          {duplicateMenus.map((menu, idx) => (
            <div
              className="menu-card"
              key={idx}
              onClick={() =>
                setCategory((prev) => (prev === menu.name ? "All" : menu.name))
              }
            >
              <img
                className={category === menu.name ? "active" : ""}
                src={menu.img}
                alt={menu.name}
              />
              <p>{menu.name}</p>
            </div>
          ))}
        </div>

        <button onClick={scrollRight}>
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
      <hr />
    </div>
  );
}
