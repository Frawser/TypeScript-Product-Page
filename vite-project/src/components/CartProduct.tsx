// Import necessary components and functions from external modules
import { Stack, Button } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import storeProducts from "../data/products.json";
import { formatCurrency } from "../utilities/currency";

// Define the props for the CartProduct component
type CartProductProps = {
  id: number;
  quantity: number;
};

// Create the CartProduct component
const CartProduct = ({ id, quantity }: CartProductProps) => {
  // Access the shopping cart context functions
  const { removeProduct, incrementProductQuantity, decrementProductQuantity } = useShoppingCart();
  
  // Find the product with the specified ID in the storeProducts array
  const product = storeProducts.find(i => i.id === id);
  
  // If the product is not found, return null
  if (product == null) return null;

  // Render the product information and controls
  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
        {/* Display the product image */}
        <img src={product.image} style={{ width: "125px", height: "75px", objectFit: "cover"}} />
        
        <div className="me-auto">
            <div>
                {/* Display the product name and quantity if greater than 1 */}
                {product.name} {quantity > 1 && <span className="text-muted" style={{fontSize: ".65rem"}}>x {quantity}</span>}
            </div>
            <div className="text-muted" style={{fontSize: ".65rem"}}>
                {/* Display the formatted product price */}
                {formatCurrency(product.price)}
            </div>
        </div>
        
        {/* Display the total price for the given quantity of the product */}
        <div>
            {formatCurrency(product.price * quantity)}
        </div>
        
        {/* Button to remove the product from the cart */}
        <Button variant="outline-danger" size="sm" onClick={() => removeProduct(product.id)}>&times;</Button>
        
        {/* Button to decrement the quantity of the product in the cart */}
        <Button variant="outline-primary" size="sm" onClick={() => decrementProductQuantity(product.id)}>-</Button>
        
        {/* Button to increment the quantity of the product in the cart */}
        <Button variant="outline-primary" size="sm" onClick={() => incrementProductQuantity(product.id)}>+</Button>
    </Stack>
  )
};


export default CartProduct;

