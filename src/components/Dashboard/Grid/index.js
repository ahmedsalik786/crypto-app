import React from "react";
import "./style.css";
import TrendingUpRoundedIcon from "@material-ui/icons/TrendingUpRounded";
import TrendingDownRoundedIcon from "@material-ui/icons/TrendingDownRounded";
import { Link } from "react-router-dom";

function Grid({ coin, id }) {
  return (
    <Link to={`/coin/${coin.id}`}>
      <div
        className={`grid-container ${
          coin.price_change_percentage_24h < 0 && "grid-container-red"
        }`}
      >
        <div className="info-flex">
          <img src={coin.image} className="coin-logo" alt={coin.name} />
          <div className="name-col">
            <p className="coin-symbol">{coin.symbol}</p>
            <p className="coin-name">{coin.name}</p>
          </div>
        </div>
        {coin.price_change_percentage_24h < 0 ? (
          <div className="chip-flex">
            <div className="price-chip chip-red">
              {coin.price_change_percentage_24h.toFixed(2)}%
            </div>
            <div className="icon-chip price-chip chip-red">
              <TrendingDownRoundedIcon
                style={{ width: "1rem", height: "2rem" }}
              />
            </div>
          </div>
        ) : (
          <div className="chip-flex">
            <div className=" price-chip">
              {coin.price_change_percentage_24h.toFixed(2)}%
            </div>
            <div className="icon-chip price-chip">
              <TrendingUpRoundedIcon
                style={{ width: "2rem", height: "2rem" }}
              />
            </div>
          </div>
        )}
        <div className="info-container">
          <h3
            className="coin-price"
            style={{
              color:
                coin.price_change_percentage_24h < 0
                  ? "var(--red)"
                  : "var(--green)",
            }}
          >
            ₹ {coin.current_price.toLocaleString()}
          </h3>
        </div>
        <p className="total-volume">
          Total Volume: {coin.total_volume.toLocaleString()}
        </p>
        <p className="total-volume">
          Market Cap: {coin.market_cap.toLocaleString()}
        </p>
      </div>
    </Link>
  );
}

export default Grid;
