import React from "react";
import { Link } from "react-router-dom";

const BlogPage = () => {
  return (
    <div style={{ padding: "40px" }}>
      <h1>Crypto Blog</h1>

      <h3>
        <Link to="/bybit-review">Bybit Review 2026</Link>
      </h3>
      <p>Learn if Bybit is safe and how to start trading.</p>

      <h3>How to Start Crypto Trading</h3>
      <p>Beginner guide coming soon...</p>
    </div>
  );
};

export default BlogPage;
