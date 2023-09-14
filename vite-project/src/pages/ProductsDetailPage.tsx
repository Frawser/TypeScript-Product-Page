import React from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom'; // Import useParams
import ProductDetail from '../components/ProductDetail';
import products from '../data/products.json';

const ProductsDetailPage = () => {
  // Use useParams to get the id from the URL
  const { id } = useParams<{ id: string }>();

  // Convert the id to a number
  const productId = parseInt(id , 10);

  // Find the product with the matching id
  const productToDisplay = products.find(product => product.id === productId);

  return (
    <Container className="mt-3">
      
      {productToDisplay ? (
        <ProductDetail {...productToDisplay}/>
      ) : (
        <div>Product not found.</div>
      )}
    </Container>
  );
};

export default ProductsDetailPage;

