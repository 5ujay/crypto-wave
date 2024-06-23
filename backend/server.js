import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

// Route to fetch general coin market data
app.get("/api/coins", async (req, res) => {
  const currency = req.query.currency || "inr";
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}`;

  try {
    const response = await fetch(url, {
      headers: {
        "x-cg-demo-api-key": "CG-TLHDXVQSWg9NzEMmXjk541BN",
      },
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// Route to fetch specific coin details including market data
app.get("/api/coins/:coinId", async (req, res) => {
  const { coinId } = req.params;
  const currency = req.query.currency || "inr";
  const url = `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`;

  try {
    const response = await fetch(url, {
      headers: {
        "x-cg-demo-api-key": "CG-TLHDXVQSWg9NzEMmXjk541BN",
      },
    });
    const coinData = await response.json();
    res.json(coinData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// Route to fetch historical market chart data for a specific coin
app.get("/api/coins/:coinId/history", async (req, res) => {
  const { coinId } = req.params;
  const currency = req.query.currency || "inr";
  const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=10&interval=daily`;

  try {
    const response = await fetch(url, {
      headers: {
        "x-cg-demo-api-key": "CG-TLHDXVQSWg9NzEMmXjk541BN",
      },
    });
    const historyData = await response.json();
    res.json(historyData);
  } catch (error) {
    console.error("Error fetching history data:", error);
    res.status(500).json({ error: "Failed to fetch history data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
