import { useContext, createContext, ReactNode, useState } from "react";
import ShoppingCart from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";

// Define the props for ShoppingCartProvider component
type ShoppingCartProviderProps = {
  children: ReactNode;
};

// Define the shape of a CartProduct
type CartProduct = {
  id: number;
  quantity: number;
};

// Define the structure of the ShoppingCartContext
type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  getProductQuantity: (productId: number) => number;
  incrementProductQuantity: (productId: number) => void;
  decrementProductQuantity: (productId: number) => void;
  removeProduct: (productId: number) => void;
  cartQuantity: number;
  cartProducts: CartProduct[];
};

// Create a context for the shopping cart
const ShoppingCartContext = createContext({} as ShoppingCartContext);

// Custom hook for accessing the shopping cart context
export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

// ShoppingCartProvider component manages the shopping cart state
export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  // Initialize cartProducts using local storage
  const [cartProducts, setCartProducts] = useLocalStorage<CartProduct[]>("shopping-cart", []);

  // Initialize the cart open state
  const [cartOpen, setCartOpen] = useState(false);

  // Calculate the total quantity of items in the cart
  const cartQuantity = cartProducts.reduce((quantity: number, product) => quantity + product.quantity, 0);

  // Function to open the cart
  const openCart = () => setCartOpen(true);

  // Function to close the cart
  const closeCart = () => setCartOpen(false);

  // Function to get the quantity of a product in the cart
  function getProductQuantity(productId: number) {
    return (
      cartProducts.find((product) => product.id === productId)?.quantity || 0
    );
  }

  // Function to increment the quantity of a product in the cart
  function incrementProductQuantity(productId: number) {
    setCartProducts((currProducts) => {
      const productIndex = currProducts.findIndex(
        (product) => product.id === productId
      );

      if (productIndex !== -1) {
        return currProducts.map((product, index) => {
          if (index === productIndex) {
            return {
              ...product,
              quantity: product.quantity + 1,
            };
          } else {
            return product;
          }
        });
      } else {
        return [...currProducts, { id: productId, quantity: 1 }];
      }
    });
  }

  // Function to decrement the quantity of a product in the cart
  function decrementProductQuantity(productId: number) {
    setCartProducts((currProducts) => {
      const productIndex = currProducts.findIndex(
        (product) => product.id === productId
      );

      if (productIndex !== -1) {
        return currProducts.map((product, index) => {
          if (index === productIndex) {
            return {
              ...product,
              quantity: product.quantity - 1,
            };
          } else {
            return product;
          }
        });
      } else {
        return [...currProducts, { id: productId, quantity: 1 }];
      }
    });
  }

  // Function to remove a product from the cart
  function removeProduct(productId: number) {
    setCartProducts((prevCartProducts) => {
      const productIndex = prevCartProducts.findIndex(
        (product) => product.id === productId
      );
      if (productIndex === -1) {
        return prevCartProducts;
      }
      const newCartProducts = [...prevCartProducts];
      newCartProducts.splice(productIndex, 1);
      return newCartProducts;
    });
  }

  return (
    // Provide the shopping cart context to its children
    <ShoppingCartContext.Provider
      value={{
        getProductQuantity,
        incrementProductQuantity,
        decrementProductQuantity,
        removeProduct,
        openCart,
        closeCart,
        cartProducts,
        cartQuantity
      }}
    >
      {/* Render the children components */}
      {children}
      
      {/* Render the ShoppingCart component and pass the cartOpen state */}
      <ShoppingCart cartOpen={cartOpen} />
    </ShoppingCartContext.Provider>
  );
}

