// CoinContext.js

import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const CoinContext = createContext();

export const CoinContextProvider = ({ children }) => {
  const [allCoin, setAllCoin] = useState([]);
  const [currency, setCurrency] = useState({
    name: "inr",
    symbol: "₹",
  });

  useEffect(() => {
    fetchCoinData();
  }, [currency]);

  const fetchCoinData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/coins?currency=${currency.name}`
      );
      setAllCoin(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const contextValue = {
    allCoin,
    currency,
    setCurrency,
  };

  return (
    <CoinContext.Provider value={contextValue}>{children}</CoinContext.Provider>
  );
};

export const useCoin = () => {
  return useContext(CoinContext);
};
