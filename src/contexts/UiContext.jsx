import React, { createContext, useContext, useState } from "react";

const UiContext = createContext();

const UiProvider = ({ children }) => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  const contextValue = { error, loading, setError, setLoading };

  return (
    <UiContext.Provider value={contextValue}>{children}</UiContext.Provider>
  );
};

const useUiContext = () => {
  const ctx = useContext(UiContext);
  if (ctx === undefined) {
    console.log("Context undefined");
    return;
  }
  return ctx;
};

export { UiProvider, useUiContext };
