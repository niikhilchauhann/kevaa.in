import React, { useRef } from "react";
import "../css/home/testimonials.css";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { testimonials } from "../data/testimonials";


export default function Testimonials() {
  const scrollRef = useRef();

  const scroll = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = 320;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="testimonial-section">
      <div className="heading">
        <h2>OUR HAPPY CUSTOMERS</h2>
        <div className="arrows">
          <FaArrowLeft onClick={() => scroll("left")} />
          <FaArrowRight onClick={() => scroll("right")} />
        </div>
      </div>
      <div className="testimonial-carousel" ref={scrollRef}>
        {testimonials.map((item, index) => (
          <div className="testimonial-card" key={index}>
            <div className="stars">
              {Array.from({ length: item.rating }).map((_, i) => (
                <MdOutlineStarPurple500 key={i} />
              ))}
            </div>
            <h4>
              {item.name}{" "}
              <span className="verified">
                <RiVerifiedBadgeFill />
              </span>
            </h4>
            <p>{item.message}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
