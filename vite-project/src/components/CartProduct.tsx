import { Stack, Button } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import storeProducts from "../data/products.json";
import { formatCurrency } from "../utilities/currency";

type CartProductProps = {
  id: number;
  quantity: number;
};

const CartProduct = ({ id, quantity }: CartProductProps) => {
  const { removeProduct } = useShoppingCart();
  const product = storeProducts.find(i => i.id === id);
  if (product == null) return null;

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
        <img src={product.image} style={{ width: "125px", height: "75px", objectFit: "cover"}} />
        <div className="me-auto">
            <div>
                {product.name} {quantity > 1 && <span className="text-muted" style={{fontSize: ".65rem"}}>x {quantity}</span>}
            </div>
            <div className="text-muted" style={{fontSize: ".65rem"}}>
                {formatCurrency(product.price)}
            </div>
        </div>
        <div>
            {formatCurrency(product.price * quantity)}
        </div>
        <Button variant="outline-danger" size="sm" onClick={() => removeProduct(product.id)}>&times;</Button>

    </Stack>
  )
};

export default CartProduct;
