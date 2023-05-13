import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Logo from "../img/constlogo.png";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  
  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="/" />
          </Link>
        </div>
        <div className="links">
          <Link className="link" to="music">
            <h6>Music</h6>
          </Link>
          <Link className="link" to="baseball">
            <h6>Baseball</h6>
          </Link>
          <Link className="link" to="disney">
            <h6>Disney</h6>
          </Link>
          <Link className="link" to="science">
            <h6>Science</h6>
          </Link>
          <Link className="link" to="technology">
            <h6>Technology</h6>
          </Link>
          <Link className="link" to="food">
            <h6>Food</h6>
          </Link>
          <span>{currentUser?.username}</span>
          {currentUser ? (
            <span onClick={logout}>Logout</span>
            ) : (
              <Link className="link" to="/login">
                Login
              </Link>
            )}
          <span className="write">
            <Link className="link" to="/write">
              Write
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;