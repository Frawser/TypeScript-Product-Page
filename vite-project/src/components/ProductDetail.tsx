import React from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { useShoppingCart } from "../context/ShoppingCartContext";

// Define the props for the ProductDetail component
type ProductDetailProps = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
};

// Create the ProductDetail component
const ProductDetail: React.FC<ProductDetailProps> = ({
  id,
  name,
  price,
  image,
  description,
}) => {
  // Access the shopping cart context functions
  const { getProductQuantity, incrementProductQuantity, decrementProductQuantity, removeProduct } = useShoppingCart();

  // Get the quantity of this product in the cart
  const quantity = getProductQuantity(id);

  return (
    <Container>
      <Row>
        <Col md={4}>
          {/* Display the product image */}
          <Card.Img variant="top" src={image} alt={name} className="rounded w-100" />
        </Col>
        <Col md={8}>
          <Card>
            <Card.Body>
              {/* Display the product name */}
              <Card.Title>{name}</Card.Title>
              <Card.Text>
                {/* Display the product price */}
                <p>Price: ${price}</p>
                {/* Display the product description */}
                <p>Description: {description}</p>
              </Card.Text>
              
              <div className="mt-auto">
                {/* Check if the product is not in the cart */}
                {quantity === 0 ? (
                  // Render "Add to Cart" button if the product is not in the cart
                  <Button
                    variant="outline-primary"
                    onClick={() => {
                      incrementProductQuantity(id);
                    }}
                  >
                    + Add to Cart
                  </Button>
                ) : (
                  // Render buttons for adjusting quantity and a "Remove" button if the product is in the cart
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      {/* Button to decrease the quantity */}
                      <Button variant="outline-primary" onClick={() => decrementProductQuantity(id)}>-</Button>
                      {/* Display the quantity of the product */}
                      <span className="mx-2">{quantity}</span>
                      {/* Button to increase the quantity */}
                      <Button variant="outline-primary" onClick={() => incrementProductQuantity(id)}>+</Button>
                    </div>
                    {/* Button to remove the product from the cart */}
                    <Button variant="outline-danger" onClick={() => removeProduct(id)}>Remove</Button>
                  </div>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;



