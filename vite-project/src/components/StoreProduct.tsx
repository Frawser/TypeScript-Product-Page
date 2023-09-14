import { Card } from "react-bootstrap";
import { formatCurrency } from "../utilities/currency";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { Button } from "react-bootstrap";

type StoreProductProps = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export function StoreProduct({ id, name, price, image }: StoreProductProps) {
    const { getProductQuantity, incrementProductQuantity, decrementProductQuantity, removeProduct } = useShoppingCart();
    const quantity = getProductQuantity(id);

  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={image}
        height="350px"
        style={{ objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-space-between align-items-baseline mb-4">
          <span>{name}</span>
          <span className="ms-3 text-muted">{formatCurrency(price)}</span>
        </Card.Title>
        <div className="mt-auto">
            {quantity === 0 ? (
            <Button variant="outline-primary" onClick={() => incrementProductQuantity(id)}>+ Add to Cart</Button>
            ) : (
            <div className="d-flex justify-content-between align-items-center">
                <div>
                <Button variant="outline-primary" onClick={() => decrementProductQuantity(id)}>-</Button>
                <span className="mx-2">{quantity}</span>
                <Button variant="outline-primary" onClick={() => incrementProductQuantity(id)}>+</Button>
                </div>
                <Button variant="outline-danger" onClick={() => removeProduct(id)}>Remove</Button>
            </div>
            )
            }
            
            

        </div>

      </Card.Body>
    </Card>
  );
}
