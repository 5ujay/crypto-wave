import React, { useEffect, useState } from "react";
import "./Coin.css";
import { useParams } from "react-router-dom";
import { useCoin } from "../../context/CoinContext";
import loader from "../../assets/loader.gif";
import LineChart from "../../components/LineChart/LineChart";

const Coin = () => {
  const { coinId } = useParams();
  const { currency } = useCoin();

  const [coinData, setCoinData] = useState();
  const [historyData, setHistoryData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/coins/${coinId}?currency=${currency.name}`
        );
        const data = await response.json();
        setCoinData(data);
      } catch (error) {
        console.error("Error fetching coin data:", error);
      }
    };

    const fetchHistoryData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/coins/${coinId}/history?currency=${currency.name}`
        );
        const data = await response.json();
        setHistoryData(data);
      } catch (error) {
        console.error("Error fetching history data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoinData();
    fetchHistoryData();
  }, [coinId, currency]);

  if (loading || !coinData || !historyData) {
    return (
      <div className="loader">
        <img width={100} src={loader} alt="" />
        <p>Loading ...</p>
      </div>
    );
  }

  return (
    <div className="coin">
      <div className="coin-name">
        <img src={coinData.image.large} alt="coin-image" />
        <p>
          <b>
            {coinData.name} ({coinData.symbol.toUpperCase()})
          </b>
        </p>
      </div>

      <div className="coin-chart">
        <LineChart historyData={historyData} />
      </div>

      <div className="coin-info">
        <ul>
          <li>Crypto Market Rank</li>
          <li>{coinData.market_cap_rank}</li>
        </ul>
        <ul>
          <li>Crypto Current Price </li>
          <li>
            {currency.symbol}{" "}
            {coinData.market_data.current_price[currency.name].toLocaleString()}
          </li>
        </ul>
        <ul>
          <li>Market Cap</li>
          <li>
            {currency.symbol}{" "}
            {coinData.market_data.market_cap[currency.name].toLocaleString()}
          </li>
        </ul>
        <ul>
          <li>24 Hour High </li>
          <li>
            {currency.symbol}{" "}
            {coinData.market_data.high_24h[currency.name].toLocaleString()}
          </li>
        </ul>
        <ul>
          <li>24 Hour Low </li>
          <li>
            {currency.symbol}{" "}
            {coinData.market_data.low_24h[currency.name].toLocaleString()}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Coin;
