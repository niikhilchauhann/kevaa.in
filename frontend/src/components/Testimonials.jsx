import React, { useRef } from "react";
import "../css/home/testimonials.css";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const testimonials = [
  {
    name: "John Doe",
    message:
      "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
    rating: 5,
  },
  {
    name: "Sarah M.",
    message:
      "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
    rating: 5,
  },
  {
    name: "Alex K.",
    message:
      "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable.",
    rating: 5,
  },
  {
    name: "James L.",
    message:
      "I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
    rating: 5,
  },
  {
    name: "Moona B.",
    message:
      "The selection of clothes is not only diverse but also on-point with the latest trends. Love this site!",
    rating: 5,
  },
];

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
