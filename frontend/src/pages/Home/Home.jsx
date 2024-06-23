import React, { useEffect, useState } from "react";
import "./Home.css";
import { useCoin } from "../../context/CoinContext";
import { Link } from "react-router-dom";
const Home = () => {
  const { allCoin, currency } = useCoin();
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState("");

  const hadleSearch = async (e) => {
    e.preventDefault();
    const coins = await allCoin.filter((coin) => {
      return coin.name.toLowerCase().includes(input.toLowerCase());
    });
    setDisplayCoin(coins);
  };

  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);

  return (
    <div className="home">
      <div className="hero">
        <h1>
          Largest <br /> Crypto Marketplace
        </h1>
        <p>
          Welcome to the world's largest cryptocurrency marketplace. trace and
          analyze the current crypto values
        </p>

        <form onSubmit={hadleSearch}>
          <input
            onChange={(e) => {
              setInput(e.target.value);
              if (e.target.value === "") {
                setDisplayCoin(allCoin);
              }
            }}
            value={input}
            type="text"
            placeholder="search crypto..."
            required
            list="coinlist"
          />

          <datalist id="coinlist">
            {allCoin.map((coin, index) => (
              <option key={index} value={coin.name} />
            ))}
          </datalist>

          <button type="submit">Search</button>
        </form>
      </div>

      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{ textAlign: "center" }}>24hr Change</p>
          <p className="market-cap">Market Cap</p>
        </div>

        {displayCoin.slice(0, 10).map((coin, index) => (
          <Link to={`/coin/${coin.id}`} className="table-layout" key={index}>
            <p>{coin.market_cap_rank}</p>
            <div>
              <img src={coin.image} alt="" />
              <p>{coin.name + "-" + coin.symbol}</p>
            </div>
            <p>
              {currency.symbol}
              {coin.current_price.toLocaleString()}
            </p>
            <p
              style={{ textAlign: "center" }}
              className={coin.price_change_percentage_24h > 0 ? "green" : "red"}
            >
              {Math.floor(coin.price_change_percentage_24h * 100) / 100}
            </p>
            <p className="market-cap">
              {currency.symbol}
              {coin.market_cap.toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
