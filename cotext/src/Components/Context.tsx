import React, { createContext, useContext, useState, ReactNode } from "react";

interface Product {
  id: number;
  name: string;
  doc: string;
  price: number;
  image: string;
}

interface ProductContextType {
  products: Product[];
  setProducts: (products: Product[]) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};

const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

// Named and Default Exports
export { ProductProvider };
export default ProductProvider;
