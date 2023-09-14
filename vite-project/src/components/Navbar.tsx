// Import necessary components and libraries
import {
  Navbar as NavBS,
  Nav,
  NavLink,
  Container,
  Button,
} from "react-bootstrap";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

// Define the Navbar component
const Navbar = () => {
  // Access the shopping cart context to get cart information
  const { openCart, cartQuantity } = useShoppingCart();

  return (
    // Create the navigation bar with a dark theme and sticky to the top
    <NavBS bg="dark" variant="dark" sticky="top">
      <Container>
        {/* Create a navigation menu on the left */}
        <Nav className="me-auto">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/products">Products</NavLink>
        </Nav>
        
        {/* Display the shopping cart icon and quantity if there are items in the cart */}
        {cartQuantity > 0 && (
          <Button onClick={openCart} style={{ position: "relative" }}>
            {/* Display the shopping cart icon */}
            <AiOutlineShoppingCart />
            <div
              className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
              style={{
                color: "white",
                width: "1.5rem",
                height: "1.5rem",
                position: "absolute",
                bottom: 0,
                right: 0,
                transform: "translate(25%, 25%)",
              }}
            >
              {/* Display the quantity of items in the cart */}
              {cartQuantity}
            </div>
          </Button>
        )}
      </Container>
    </NavBS>
  );
};

// Export the Navbar component as the default export
export default Navbar;

