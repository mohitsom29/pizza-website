import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../pages/CartContext";
import "./Navigation.css";
const Navigation = () => {
  const cartstyle = {
    display: "flex",
    background: "orange",
    padding: "6px 12px",
    borderRadius: "50px",
  };

  const { cart } = useContext(CartContext);

  return (
    <>
      <nav className="container flex items-center justify-between">
        <Link to="/">
          <img style={{ height: 45 }} src="/images/logo.png" alt="logo" />
        </Link>

        <ul className="flex items-center">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li className="ml-6">
            <Link to="/products">Products</Link>
          </li>
          <li className="ml-6">
            <Link to="/cart">
              <div style={cartstyle}>
                <span>{cart.totalItems ? cart.totalItems : 0}</span>
                <img className="ml-2" src="/images/cart.png" alt="cart-icon" />
              </div>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
