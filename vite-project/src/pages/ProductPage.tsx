import products from "../data/products.json"  
import { Row, Col } from "react-bootstrap"  
import { StoreProduct } from "../components/StoreProduct"  


const ProductPage = () => {
  return (
    <>
       
        
        {/* Create a grid layout with specified column counts for different screen sizes */}
        <Row md={2} xs={1} lg={3} className="g-3 mt-2">
            {/* Map through the product data and render a StoreProduct component for each */}
            {products.map((product) => (
            <Col key={product.id}>
                {/* Render a StoreProduct component and pass product data as props */}
                <StoreProduct {...product}/>
            </Col>
            ))}
        </Row>
    </>
  )
}

export default ProductPage  
