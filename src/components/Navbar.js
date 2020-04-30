import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { connect } from "react-redux";

function Navbar(props) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="#">
        Market
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-link nav-item active">
            <Link to="/">Shop</Link>
          </li>
          <li className="nav-link nav-item active">
            <Link to="/cart">
              <FaShoppingCart />
              &nbsp;&nbsp;(
              {props.items.addedItems.reduce((prev, cur) => {
                return prev + cur.quantity;
              }, 0)}
              &nbsp;items)
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

const mapStateToProps = (state) => {
  return {
    items: state.item,
  };
};

export default connect(mapStateToProps)(Navbar);
