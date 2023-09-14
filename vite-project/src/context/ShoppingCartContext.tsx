import { useContext, createContext, ReactNode, useState } from "react";
import ShoppingCart from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type CartProduct = {
  id: number;
  quantity: number;
};

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

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartProducts, setCartProducts] = useLocalStorage<CartProduct[]>("shopping-cart", []);
  const [cartOpen, setCartOpen] = useState(false);

   const cartQuantity = cartProducts.reduce(
    (quantity: number, product) => quantity + product.quantity, 0)

    const openCart = () => setCartOpen(true);
    const closeCart = () => setCartOpen(false);
    
  function getProductQuantity(productId: number) {
    return (
      cartProducts.find((product) => product.id === productId)?.quantity || 0
    );
  }

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
      {children}
      <ShoppingCart cartOpen={cartOpen} />
    </ShoppingCartContext.Provider>
  );
}
