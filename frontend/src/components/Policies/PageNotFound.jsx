import React from "react";
import { useNavigate } from "react-router-dom";
import "./pageNotFound.css"; // Optional: for custom styling
import ScrollToTop from "../Global/ScrollTop";

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className="notfound-container">
      <ScrollToTop/>
      <h1>404</h1>
      <h2>Oops! Page Not Found</h2>
      <p>The page you’re looking for doesn’t exist or has been moved.</p>
      <button onClick={() => navigate("/")}>Go to Home</button>
    </div>
  );
}

export default PageNotFound;
