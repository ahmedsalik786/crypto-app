import React from "react";
import TrendingUpRoundedIcon from "@material-ui/icons/TrendingUpRounded";
import TrendingDownRoundedIcon from "@material-ui/icons/TrendingDownRounded";
import "./style.css";
import { Tooltip } from "@material-ui/core";
import { convertNumber } from "../../../functions/convertNumber";
import { Link } from "react-router-dom";

function List({ coin, id }) {
  return (
    <Link to={`/coin/${coin.id}`}>
      <tr className="list-row">
        <td className="td-image">
          <Tooltip title="Logo">
            <img src={coin.image} className="coin-logo" alt={coin.name} />
          </Tooltip>
        </td>
        <td>
          <div className="name-col">
            <Tooltip title="Symbol">
              <p className="coin-symbol">{coin.symbol}</p>
            </Tooltip>
            <Tooltip title="Name">
              <p className="coin-name">{coin.name}</p>
            </Tooltip>
          </div>
        </td>
        {coin.price_change_percentage_24h < 0 ? (
          <td className="chip-flex">
            <Tooltip title="Price Change in 24hr">
              <div className="price-chip chip-red">
                {coin.price_change_percentage_24h.toFixed(2)}%
              </div>
            </Tooltip>
            <Tooltip title="DownTrend">
              <div className="icon-chip td-icon price-chip chip-red">
                <TrendingDownRoundedIcon />
              </div>
            </Tooltip>
          </td>
        ) : (
          <td className="chip-flex">
            <Tooltip title="Price Change in 24hr">
              <div className="price-chip">
                {coin.price_change_percentage_24h.toFixed(2)}%
              </div>
            </Tooltip>
            <Tooltip title="UpTrend">
              <div className="icon-chip td-icon price-chip">
                <TrendingUpRoundedIcon />
              </div>
            </Tooltip>
          </td>
        )}
        <td>
          <Tooltip title="Price">
            <h3
              className="coin-price td-centre-align"
              style={{
                color:
                  coin.price_change_percentage_24h < 0
                    ? "var(--red)"
                    : "var(--green)",
              }}
            >
              ₹{coin.current_price.toLocaleString()}
            </h3>
          </Tooltip>
        </td>
        <td>
          <Tooltip title="Total Volume">
            <p className="total-volume td-total-volume td-right-align">
              {coin.total_volume.toLocaleString()}
            </p>
          </Tooltip>
        </td>
        <td className="desktop-td-mkt">
          <Tooltip title="Market Cap">
            <p className="total-volume td-right-align">
            ₹{coin.market_cap.toLocaleString()}
            </p>
          </Tooltip>
        </td>
        <td className="mobile-td-mkt">
          <Tooltip title="Market Cap">
            <p className="total-volume td-right-align">
            ₹{convertNumber(coin.market_cap)}
            </p>
          </Tooltip>
        </td>
      </tr>
    </Link>
  );
}

export default List;
