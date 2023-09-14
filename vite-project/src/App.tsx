import { Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import ProductPage from './pages/ProductPage'
import ProductsDetails from './pages/ProductsDetailPage'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import { ShoppingCartProvider } from './context/ShoppingCartContext'

// Create the main App component
const App = () => {
  return (
    // Wrap the entire application with the ShoppingCartProvider context
    <ShoppingCartProvider>
      {/* Display the Navbar component */}
      <Navbar />

      {/* Create a container for the application content */}
      <Container>
        {/* Define the routing structure using the Routes and Route components */}
        <Routes>
          {/* Route for the home page */}
          <Route path="/" element={<Home />} />

          {/* Route for the product listing page */}
          <Route path="/products" element={<ProductPage />} />

          {/* Route for displaying product details */}
          <Route path="/product/:id" element={<ProductsDetails />} />
        </Routes>
      </Container>
    </ShoppingCartProvider>
  );
}

export default App;
