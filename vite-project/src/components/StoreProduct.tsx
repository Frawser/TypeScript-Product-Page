import { Card } from "react-bootstrap";
import { formatCurrency } from "../utilities/currency";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

// Define the props for the StoreProduct component
type StoreProductProps = {
  id: number;
  name: string;
  price: number;
  image: string;
};

// Create the StoreProduct component
export function StoreProduct({ id, name, price, image }: StoreProductProps) {
    // Access shopping cart functions from context
    const { getProductQuantity, incrementProductQuantity, decrementProductQuantity, removeProduct } = useShoppingCart();
    
    // Get the quantity of this product in the cart
    const quantity = getProductQuantity(id);

  return (
    // Render a product card
    <Card className="h-100">
      {/* Link only on the product image */}
      <Link to={`/product/${id}`}>
        <Card.Img
          variant="top"
          src={image}
          height="350px"
          style={{ objectFit: "cover", cursor: "pointer" }}
        />
      </Link>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-space-between align-items-baseline mb-4">
          {/* Display product name and price */}
          <span>{name}</span>
          <span className="ms-3 text-muted">{formatCurrency(price)}</span>
        </Card.Title>
        <div className="mt-auto">
            {/* Check if the product is not in the cart */}
            {quantity === 0 ? (
                // Render "Add to Cart" button
                <Button
                  variant="outline-primary"
                  onClick={() => {
                    incrementProductQuantity(id);
                  }}
                >
                  + Add to Cart
                </Button>
            ) : (
                // Render buttons for adjusting quantity and a "Remove" button
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <Button variant="outline-primary" onClick={() => decrementProductQuantity(id)}>-</Button>
                        <span className="mx-2">{quantity}</span>
                        <Button variant="outline-primary" onClick={() => incrementProductQuantity(id)}>+</Button>
                    </div>
                    <Button variant="outline-danger" onClick={() => removeProduct(id)}>Remove</Button>
                </div>
            )}
        </div>
      </Card.Body>
    </Card>
  );
}

