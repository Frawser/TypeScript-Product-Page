// Import necessary components and libraries
import { Offcanvas, Stack } from 'react-bootstrap'
import { useShoppingCart } from '../context/ShoppingCartContext'
import CartProduct from './CartProduct'
import { formatCurrency } from '../utilities/currency'
import storeProduct from '../data/products.json'


type ShoppingCartProps = {
  cartOpen: boolean
}

const ShoppingCart = ({ cartOpen }: ShoppingCartProps) => {
  // Access the shopping cart context to get cart information and functions
  const { closeCart, cartProducts } = useShoppingCart();

  return (
    // Create an offcanvas (side menu) for the shopping cart
    <Offcanvas show={cartOpen} onHide={closeCart} placement='end'>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {/* Display a message if the cart is empty */}
          {cartProducts.length === 0 ? (
            <div className="text-center">Your cart is empty.</div>
          ) : (
            // Display individual cart products using the CartProduct component
            cartProducts.map((product) => (
              <CartProduct key={product.id} {...product} />
            ))
          )}
          {/* Display the total price of the items in the cart */}
          {cartProducts.length > 0 && (
            <div className="ms-auto fw-bold fs-5">
              Total{" "}
              {formatCurrency(
                cartProducts.reduce((total, cartProduct) => {
                  // Find the corresponding product in the store and calculate the total price
                  const product = storeProduct.find((item) => item.id === cartProduct.id);
                  return total + (product?.price || 0) * cartProduct.quantity;
                }, 0)
              )}
            </div>
          )}
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
};


export default ShoppingCart;

