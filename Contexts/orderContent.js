import React, { createContext, useState, useContext } from "react";

// Create the OrderContext
const OrderContext = createContext();

// Create a custom provider component
export const OrderProvider = ({ children }) => {
  const [orderContent, setOrderContent] = useState([]);

  return (
    <OrderContext.Provider value={{ orderContent, setOrderContent }}>
      {children}
    </OrderContext.Provider>
  );
};

// Create a custom hook to easily access the OrderContext
export const useOrder = () => {
  return useContext(OrderContext);
};
