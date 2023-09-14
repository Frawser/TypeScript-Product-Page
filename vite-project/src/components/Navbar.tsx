import {
  Navbar as NavBS,
  Nav,
  NavLink,
  Container,
  Button,
} from "react-bootstrap";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useShoppingCart } from "../context/ShoppingCartContext";

const Navbar = () => {
    const {openCart, cartQuantity} = useShoppingCart()
  return (
    <NavBS bg="dark" variant="dark" sticky="top">
      <Container>
        <Nav className="me-auto">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/products">Products</NavLink>
        </Nav>
        {cartQuantity > 0 && (
        <Button onClick={openCart} style={{ position: "relative" }}>
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
            {cartQuantity}
          </div>
        </Button>)}
      </Container>
    </NavBS>
  );
};

export default Navbar;
