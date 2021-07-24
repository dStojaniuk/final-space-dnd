import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav>
      <div className="logo">Final Space</div>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/list">List</Link>
        <Link to="/list-builder">ListBuilder</Link>
      </div>
    </nav>
  );
}

export default Navbar;
