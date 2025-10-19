import React, { useEffect, useRef } from "react";
import "./testimonials.css";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import useReviewStore from "../../store/reviewStore";

export default function Testimonials() {
  const scrollRef = useRef();
  const allReviews = useReviewStore(state => state.allReviews);
  const fetchReviews = useReviewStore(state => state.getAllReviews);

  useEffect(() => {
    fetchReviews();
  }, []);

  const scroll = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = 300; // adjust scroll amount
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // ✅ Filter and sort reviews
  const filteredReviews = allReviews
    .filter(item => item.rating >= 4)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // assuming createdAt is available
    .slice(0, 5); // pick top 5

  return (
    <section className="testimonial-section">
      <div className="heading">
        <h2>Our Happy Customers</h2>
        <div className="arrows">
          <FaArrowLeft onClick={() => scroll("left")} />
          <FaArrowRight onClick={() => scroll("right")} />
        </div>
      </div>
      <div className="testimonial-carousel" ref={scrollRef}>
        {filteredReviews.length > 0 ? (
          filteredReviews.map((item, index) => (
            <div className="testimonial-card" key={index}>
              <div className="stars">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <MdOutlineStarPurple500 key={i} />
                ))}
              </div>
              <h4>
                {item.name.split('@')[0]}{" "}
                <span className="verified">
                  <RiVerifiedBadgeFill />
                </span>
              </h4>
              <p>{item.message}</p>
            </div>
          ))
        ) : (
          <p>No high-rated reviews yet!</p>
        )}
      </div>
    </section>
  );
}
