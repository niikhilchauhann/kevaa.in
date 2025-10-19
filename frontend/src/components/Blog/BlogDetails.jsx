import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import "./BlogDetails.css";
import NavBar from "../Global/NavBar";

const BlogDetails = () => {
  const location = useLocation();
  const { item } = location.state || {};

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!item) {
    return (
      <div className="blog-details-error">
        <h2>Blog not found</h2>
        <Link to="/blog" className="back-btn">
          Go Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <div className="blog-details-container">
        <h1 className="blog-details-title">{item.title}</h1>
        <p className="blog-details-meta">
          By {item.author} • {item.date}
        </p>

        <img
          src={item.image}
          alt={item.title}
          className="blog-details-image"
        />

        <div className="blog-details-content">
          <p>{item.article}</p>
        </div>

        <div className="back-link-container">
          <Link to="/blogs" className="back-btn">
            ← Back to Blogs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
