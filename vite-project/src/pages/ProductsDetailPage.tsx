import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import ProductDetail from '../components/ProductDetail';
import products from '../data/products.json';

// Create the ProductsDetailPage component
const ProductsDetailPage = () => {
  // Get the 'id' parameter from the URL
  const { id } = useParams<{ id?: string }>(); // Make id optional with `id?: string`

  // Check if 'id' is not provided in the URL
  if (id === undefined) {
    return (
      <Container className="mt-3">
        <div>Product ID not provided.</div>
      </Container>
    );
  }

  // Parse 'id' to an integer
  const productId = parseInt(id, 10);

  // Check if 'id' is not a valid integer
  if (isNaN(productId)) {
    return (
      <Container className="mt-3">
        <div>Invalid product ID.</div>
      </Container>
    );
  }

  // Find the product with the specified 'id' in the 'products' array
  const productToDisplay = products.find((product) => product.id === productId);

  return (
    <Container className="mt-3">
      {/* Display product details if found, otherwise show a message */}
      {productToDisplay ? (
        <ProductDetail {...productToDisplay} />
      ) : (
        <div>Product not found.</div>
      )}
    </Container>
  );
};

export default ProductsDetailPage;
