import React, { useState } from "react";
import "./FAQs.css";
import { faqData } from "../Data/FAQs";

export default function FAQs() {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  return (
    <div className="faq-section">
      <h2>FAQs</h2>
      <div className="faq-items">
        {faqData.map((item, index) => (
          <div key={index} className="faq-item">
            <button
              className="faq-question"
              onClick={() => handleToggle(index)}
            >
              {activeIndex === index ? "▼" : "►"} {item.question}
            </button>
            {activeIndex === index && (
              <div className="faq-answer">{item.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
