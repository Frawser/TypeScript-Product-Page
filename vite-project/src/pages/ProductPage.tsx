import products from "../data/products.json"
import { Row, Col } from "react-bootstrap"
import { StoreProduct } from "../components/StoreProduct"

const ProductPage = () => {
  return (
    <>
        <h1>Products</h1>
        <Row md={2} xs={1} lg={3} className="g-3">
            {products.map((product) => (
            <Col key={product.id}>
                <StoreProduct {...product}/>
            </Col>
            ))}
        </Row>
    </>
  )
}

export default ProductPage