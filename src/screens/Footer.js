import React from "react";
import { Link } from "react-router-dom";
export default function Footer() {
  return <div><footer className="py-3 border-top">
    <div className="col-md-4" style={{ margin: "0 47%" }}>
      <Link to="/" className="text-decoration-none lh-1">
        <div className="text-muted">© 2023 GoFood, Inc</div>
      </Link>
    </div>
  </footer></div>;
}
