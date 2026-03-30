import React from "react";
import { Link } from "react-router-dom";

const BlogPage = () => {
  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "auto" }}>
      <h1>Crypto Guides & Reviews</h1>

      <div style={{ marginTop: "20px" }}>
        <h3>
          <Link to="/bybit-review">Bybit Review 2026</Link>
        </h3>
        <p>Complete beginner guide to Bybit trading platform.</p>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h3>How to Start Crypto Trading</h3>
        <p>Step-by-step beginner guide (coming soon).</p>
      </div>
    </div>
  );
};

export default BlogPage;
