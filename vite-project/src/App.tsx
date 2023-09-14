import { Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import ProductPage from './pages/ProductPage'
import ProductsDetails from './pages/ProductsDetails'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import { ShoppingCartProvider } from './context/ShoppingCartContext'

const App = () => {
  return (
    <ShoppingCartProvider>
    <Navbar/>
    <Container>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/products-details" element={<ProductsDetails />} />
      </Routes>
    </Container>
  </ShoppingCartProvider>
  )
}

export default App