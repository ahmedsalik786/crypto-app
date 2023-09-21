import React, { useEffect, useState } from "react";
import Loader from "../components/common/Loader";
import Header from "../components/common/Header";
import SelectCoin from "../components/Compare/SelectCoin";
import SelectDays from "../components/Coin/SelectDays";
import { getCoinData } from "../functions/getCoinData";
import { getCoinPrices } from "../functions/getCoinPrices";
import { coinObject } from "../functions/convertObject";
import List from "../components/Dashboard/List";
import CoinInfo from "../components/Coin/CoinInfo";
import { settingChartData } from "../functions/settingChartData";
import LineChart from "../components/Coin/LineChart/LineChart";
import TogglePriceType from "../components/Coin/TogglePriceType";

function ComparePage() {
  const [loading, setLoading] = useState(true);
  const [crypto1, setCrypto1] = useState("bitcoin");
  const [crypto2, setCrypto2] = useState("ethereum");
  const [crypto1Data, setCrypto1Data] = useState({});
  const [crypto2Data, setCrypto2Data] = useState({});
  const [days, setDays] = useState(30);
  const [priceType, setPriceType] = useState("market_caps");
  const [chartData, setChartData] = useState({});

  const handlePriceTypeChange = async (e, newType) => {
    setLoading(true);
    setPriceType(newType);

    const prices1 = await getCoinPrices(crypto1, days, newType);
    const prices2 = await getCoinPrices(crypto2, days, newType);

    if (prices1 && prices2) {
      settingChartData(setChartData, prices1, prices2);
      setLoading(false);
    } else {
      console.error("Error: prices1 or prices2 is undefined or empty");
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    setLoading(true);
    const data1 = await getCoinData(crypto1);
    if (data1) {
      const data2 = await getCoinData(crypto2);
      coinObject(setCrypto1Data, data1);
      if (data2) {
        coinObject(setCrypto2Data, data2);
        const prices1 = await getCoinPrices(crypto1, days, priceType);
        const prices2 = await getCoinPrices(crypto2, days, priceType);
        settingChartData(setChartData, prices1, prices2);
        console.log("both price fetched", prices1, prices2);
        setLoading(false);
      }
    }
  }

  // const handleCoinChange = async (event, isCoin2) => {
  //   setLoading(true);
  //   if (isCoin2) {
  //     setCrypto2(event.target.value);
  //     const data = await getCoinData(event.target.value);
  //     coinObject(setCrypto2, data);
  //     const prices1 = await getCoinPrices(crypto1, days, priceType);
  //     const prices2 = await getCoinPrices(crypto2, days, priceType);
  //     if (prices1.length > 0 && prices2.length > 0) {
  //       console.log("Both prices", prices1, prices2);
  //       setLoading(false);
  //     }
  //   } else {
  //     setCrypto1(event.target.value);
  //     const data = await getCoinData(event.target.value);
  //     coinObject(setCrypto1, data);
  //   }
  // };

  const handleCoinChange = async (event, isCoin2) => {
    setLoading(true);
    if (isCoin2) {
      setCrypto2(event.target.value);
      const data = await getCoinData(event.target.value);
      coinObject(setCrypto2, data);
  
      // Fetch prices and check if they are available
      const prices1 = await getCoinPrices(crypto1, days, priceType);
      const prices2 = await getCoinPrices(event.target.value, days, priceType);
  
      if (prices1 && prices1.length > 0 && prices2 && prices2.length > 0) {
        console.log("Both prices", prices1, prices2);
        setLoading(false);
      } else {
        console.error("Error: Prices are undefined or empty");
        setLoading(false);
      }
    } else {
      setCrypto1(event.target.value);
      const data = await getCoinData(event.target.value);
      coinObject(setCrypto1, data);
  
      // Fetch prices and check if they are available
      const prices1 = await getCoinPrices(event.target.value, days, priceType);
      const prices2 = await getCoinPrices(crypto2, days, priceType);
  
      if (prices1 && prices1.length > 0 && prices2 && prices2.length > 0) {
        console.log("Both prices", prices1, prices2);
        setLoading(false);
      } else {
        console.error("Error: Prices are undefined or empty");
        setLoading(false);
      }
    }
  };
  

  const handleDaysChange = async (e) => {
    setLoading(true);
    setDays(e.target.value);
    const prices1 = await getCoinPrices(crypto1, days, priceType);
    const prices2 = await getCoinPrices(crypto2, days, priceType);
    settingChartData(setChartData, prices1, prices2);
    setLoading(true);
  };

  return (
    <div>
      <Header />

      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="coins-days-flex">
            <SelectCoin
              crypto1={crypto1}
              crypto2={crypto2}
              handleCoinChange={handleCoinChange}
            />
            <SelectDays
              days={days}
              handleDaysChange={handleDaysChange}
              noPTag={true}
            />
          </div>
          <div className="grey-wrapper">
            <List coin={crypto1Data} />
          </div>
          <div className="grey-wrapper">
            <List coin={crypto2Data} />
          </div>

          <div className="grey-wrapper">
            <TogglePriceType
              priceType={priceType}
              handlePriceTypeChange={handlePriceTypeChange}
            />
            <LineChart
              chartData={chartData}
              priceType={priceType}
              multiAxis={true}
            />
          </div>

          <CoinInfo heading={crypto1Data.name} desc={crypto1Data.desc} />

          <CoinInfo heading={crypto2Data.name} desc={crypto2Data.desc} />
        </>
      )}
    </div>
  );
}

export default ComparePage;
