import { Offcanvas, Stack } from 'react-bootstrap'
import { useShoppingCart } from '../context/ShoppingCartContext'
import CartProduct from './CartProduct'
import { formatCurrency } from '../utilities/currency'
import storeProduct from '../data/products.json'

type ShoppingCartProps = {
    cartOpen: boolean
}

const ShoppingCart = ({cartOpen}: ShoppingCartProps) => {
    const { closeCart, cartProducts } = useShoppingCart()
  return (
    <Offcanvas show={cartOpen} onHide={closeCart} placement='end'>
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <Stack gap={3}>
                {cartProducts.map(products => (
                <CartProduct key={products.id} {...products} />
                ))}
                <div className="ms-auto fw-bold fs-5">
            Total{" "}
            {formatCurrency(
              cartProducts.reduce((total, cartProduct) => {
                const product = storeProduct.find(i => i.id === cartProduct.id)
                return total + (product?.price || 0) * cartProduct.quantity
              }, 0)
            )}
          </div>
            </Stack>
        </Offcanvas.Body>

    </Offcanvas>
  )
}

export default ShoppingCart