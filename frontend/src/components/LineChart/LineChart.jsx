import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";

const LineChart = ({ historyData }) => {
  const [data, setData] = useState([["Date", "Prices"]]);

  useEffect(() => {
    let dataCopy = [["Date", "Prices"]];
    if (historyData.prices) {
      historyData.prices.map((item) => {
        dataCopy.push([
          `${new Date(item[0]).toLocaleDateString().slice(0, -5)}`,
          item[1],
        ]);
      });
      setData(dataCopy);
    } //22/6/24
  }, [historyData]);

  return <Chart chartType="LineChart" height="100%" data={data} />;
};

export default LineChart;
