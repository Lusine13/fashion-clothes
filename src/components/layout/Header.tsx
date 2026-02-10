import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header style={{ padding: "16px", borderBottom: "1px solid #ddd" }}>
      <nav style={{ display: "flex", gap: "16px" }}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/cart">Cart</NavLink>
      </nav>
    </header>
  );
};

export default Header;
