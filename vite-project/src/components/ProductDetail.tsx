import React from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { useShoppingCart } from "../context/ShoppingCartContext";

type ProductDetailProps = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
};

const ProductDetail: React.FC<ProductDetailProps> = ({
  id,
  name,
  price,
  image,
  description,
}) => {
  // Assuming you have a context or state that provides the cart information
  const { getProductQuantity, incrementProductQuantity, decrementProductQuantity, removeProduct } = useShoppingCart();

  // Get the quantity of this product in the cart
  const quantity = getProductQuantity(id);

  return (
    <Container>
      <Row>
        <Col md={4}>
          <Card.Img variant="top" src={image} alt={name} className="rounded w-100" />
        </Col>
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title>{name}</Card.Title>
              <Card.Text>
                <p>Price: ${price}</p>
                <p>Description: {description}</p>
              </Card.Text>
              
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
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;


