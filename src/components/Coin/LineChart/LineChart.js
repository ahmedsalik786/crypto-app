import React from "react";
import { Line } from "react-chartjs-2";
import { chart as ChartJS } from "chart.js/auto";
import { convertNumber } from "../../../functions/convertNumber";

function LineChart({ chartData, priceType, multiAxis }) {
  const options = {
    plugins: {
      legend: {
        display: multiAxis ? true : false,
      },
    },
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    scales: {
      crypto1: {
        type:"linear",
        display:true,
        position: "left",
        
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, ticks) {
            if (priceType === "prices") {
              return "INR" + value.toLocaleString();
            } else {
              return "INR" + convertNumber(value);
            }
          },
        },
      },
      crypto2: {
        type:"linear",
        display:true,
        position: "right",
        
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, ticks) {
            if (priceType === "prices") {
              return "INR" + value.toLocaleString();
            } else {
              return "INR" + convertNumber(value);
            }
          },
        },
      },
    },
  };
  return <Line data={chartData} options={options} />;
}

export default LineChart;
