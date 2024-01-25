import React, { createContext, useContext, useState, useEffect } from "react";

const AdContext = createContext();

export const AdProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isHidePending, setIsHidePending] = useState(false);

  const handleHideAd = () => {
    setIsHidePending(true);
    setIsVisible(false);
  };

  useEffect(() => {
    let timer;

    if (isHidePending) {
      timer = setTimeout(() => {
        setIsHidePending(false);
        setIsVisible(true);
      }, 45000); // 1 minute in milliseconds
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isHidePending]);

  const value = {
    isVisible,
    handleHideAd,
  };

  return <AdContext.Provider value={value}>{children}</AdContext.Provider>;
};

export const useAd = () => {
  const context = useContext(AdContext);
  if (!context) {
    throw new Error("useAd must be used within an AdProvider");
  }
  return context;
};
