import error404Img from "../assets/error.jpg";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <img
        src={error404Img}
        alt="404 Not Found"
        style={{ width: "500px", maxWidth: "100%" }}
      />
      <h2>
        <Link to="/" style={{ color: "#007bff", textDecoration: "underline" }}>
          Go back home
        </Link>
      </h2>
    </div>
  );
}
