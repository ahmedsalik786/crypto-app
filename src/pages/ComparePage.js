// import React, { useEffect, useState } from "react";
// import Loader from "../components/common/Loader";
// import Header from "../components/common/Header";
// import SelectCoin from "../components/Compare/SelectCoin";
// import SelectDays from "../components/Coin/SelectDays";
// import { getCoinData } from "../functions/getCoinData";
// import { getCoinPrices } from "../functions/getCoinPrices";
// import { coinObject } from "../functions/convertObject";
// import List from "../components/Dashboard/List";
// import CoinInfo from "../components/Coin/CoinInfo";
// import { settingChartData } from "../functions/settingChartData";
// import LineChart from "../components/Coin/LineChart/LineChart";
// import TogglePriceType from "../components/Coin/TogglePriceType";

// function ComparePage() {
//   const [loading, setLoading] = useState(true);
//   const [crypto1, setCrypto1] = useState("bitcoin");
//   const [crypto2, setCrypto2] = useState("ethereum");
//   const [crypto1Data, setCrypto1Data] = useState({});
//   const [crypto2Data, setCrypto2Data] = useState({});
//   const [days, setDays] = useState(30);
//   const [priceType, setPriceType] = useState("market_caps");
//   const [chartData, setChartData] = useState({});

//   const handlePriceTypeChange = async (e, newType) => {
//     setLoading(true);
//     setPriceType(newType);

//     const prices1 = await getCoinPrices(crypto1, days, newType);
//     const prices2 = await getCoinPrices(crypto2, days, newType);

//     if (prices1 && prices2) {
//       settingChartData(setChartData, prices1, prices2);
//       setLoading(false);
//     } else {
//       console.error("Error: prices1 or prices2 is undefined or empty");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   async function getData() {
//     setLoading(true);
//     const data1 = await getCoinData(crypto1);
//     if (data1) {
//       const data2 = await getCoinData(crypto2);
//       coinObject(setCrypto1Data, data1);
//       if (data2) {
//         coinObject(setCrypto2Data, data2);
//         const prices1 = await getCoinPrices(crypto1, days, priceType);
//         const prices2 = await getCoinPrices(crypto2, days, priceType);
//         settingChartData(setChartData, prices1, prices2);
//         console.log("both price fetched", prices1, prices2);
//         setLoading(false);
//       }
//     }
//   }

//   const handleCoinChange = async (event, isCoin2) => {
//     setLoading(true);
//     if (isCoin2) {
//       setCrypto2(event.target.value);
//       const data = await getCoinData(event.target.value);
//       coinObject(setCrypto2, data);
//       const prices1 = await getCoinPrices(crypto1, days, priceType);
//       const prices2 = await getCoinPrices(crypto2, days, priceType);
//       if (prices1.length > 0 && prices2.length > 0) {
//         console.log("Both prices", prices1, prices2);
//         setLoading(false);
//       }
//     } else {
//       setCrypto1(event.target.value);
//       const data = await getCoinData(event.target.value);
//       coinObject(setCrypto1, data);
//     }
//   };
//   const handleDaysChange = async (e) => {
//     setLoading(true);
//     setDays(e.target.value);
//     const prices1 = await getCoinPrices(crypto1, days, priceType);
//     const prices2 = await getCoinPrices(crypto2, days, priceType);
//     settingChartData(setChartData, prices1, prices2);
//     setLoading(true);
//   };

//   return (
//     <div>
//       <Header />

//       {loading ? (
//         <Loader />
//       ) : (
//         <>
//           <div className="coins-days-flex">
//             <SelectCoin
//               crypto1={crypto1}
//               crypto2={crypto2}
//               handleCoinChange={handleCoinChange}
//             />
//             <SelectDays
//               days={days}
//               handleDaysChange={handleDaysChange}
//               noPTag={true}
//             />
//           </div>
//           <div className="grey-wrapper">
//             <List coin={crypto1Data} />
//           </div>
//           <div className="grey-wrapper">
//             <List coin={crypto2Data} />
//           </div>

//           <div className="grey-wrapper">
//             <TogglePriceType
//               priceType={priceType}
//               handlePriceTypeChange={handlePriceTypeChange}
//             />
//             <LineChart
//               chartData={chartData}
//               priceType={priceType}
//               multiAxis={true}
//             />
//           </div>

//           <CoinInfo heading={crypto1Data.name} desc={crypto1Data.desc} />

//           <CoinInfo heading={crypto2Data.name} desc={crypto2Data.desc} />
//         </>
//       )}
//     </div>
//   );
// }

// export default ComparePage;

import React, { useEffect, useState } from "react";
import CoinInfo from "../components/Coin/CoinInfo";
import LineChart from "../components/Coin/LineChart/LineChart";
import TogglePriceType from "../components/Coin/TogglePriceType";
// import Footer from "../components/Common/Footer/footer";
import Loader from "../components/common/Loader";
import Header from "../components/common/Header";
import SelectCoin from "../components/Compare/SelectCoin";
import List from "../components/Dashboard/List";
import { coinObject } from "../functions/convertObject";
import { get100Coin } from "../functions/get100Coin";
import { getCoinData } from "../functions/getCoinData";
import { getCoinPrices } from "../functions/getCoinPrices";
import { settingChartData } from "../functions/settingChartData";
import Footer from "../components/common/Footer";

function ComparePage() {
  const [allCoins, setAllCoins] = useState([]);
  const [coin1, setCoin1] = useState(allCoins[0]?.id ?? "bitcoin");
  const [coin2, setCoin2] = useState(allCoins[1]?.id ?? "ethereum");
  const [days, setDays] = useState(120);
  const [coin1Data, setCoin1Data] = useState();
  const [coin2Data, setCoin2Data] = useState();
  const [loading, setLoading] = useState(false);
  const [priceType, setPriceType] = useState("market_caps");
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  const handlePriceTypeChange = async (e ,newType) => {
    setLoading(true);
    const newPriceType = e.target.value; // Capture the new priceType directly
    console.log("log newtype",newType)
    setPriceType(newType);
    const prices1 = await getCoinPrices(coin1, days, newType);
    const prices2 = await getCoinPrices(coin2, days, newType);
    console.log("prices1:", prices1);
    console.log("prices2:", prices2);
    settingChartData(setChartData, prices1, coin1Data, coin2Data, prices2);
    setLoading(false);
  };

  const handleCoinChange = async (e, isCoin1) => {
    setLoading(true);
    if (isCoin1) {
      setCoin1(e.target.value);
      const data1 = await getCoinData(e.target.value);
      coinObject(setCoin1Data, data1);
      const prices1 = await getCoinPrices(e.target.value, days, priceType);
      const prices2 = await getCoinPrices(coin2, days, priceType);
      console.log("handle coin change", data1, coin2Data, prices1, prices2);

      settingChartData(setChartData, prices1, data1, coin2Data, prices2);
    } else {
      setCoin2(e.target.value);
      const data2 = await getCoinData(e.target.value);
      coinObject(setCoin2Data, data2);
      const prices1 = await getCoinPrices(coin1, days, priceType);
      const prices2 = await getCoinPrices(e.target.value, days, priceType);
      console.log(
        "handle coin change else block",
        data2,
        coin1Data,
        prices1,
        prices2
      );

      settingChartData(setChartData, prices1, coin1Data, data2, prices2);
    }
    setLoading(false);
  };

  const handleDaysChange = async (e) => {
    setLoading(true);
    setDays(e.target.value);
    const prices1 = await getCoinPrices(coin1, e.target.value, priceType);
    const prices2 = await getCoinPrices(coin2, e.target.value, priceType);
    console.log("handle days change", coin1Data, coin2Data, prices1, prices2);

    settingChartData(setChartData, prices1, coin1Data, coin2Data, prices2);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    const data = await get100Coin();
    if (data) {
      setAllCoins(data);
    }
    const data1 = await getCoinData(coin1);
    const data2 = await getCoinData(coin2);
    coinObject(setCoin1Data, data1);
    coinObject(setCoin2Data, data2);
    console.log("getData",priceType)
    const prices1 = await getCoinPrices(coin1, days, priceType);
    const prices2 = await getCoinPrices(coin2, days, priceType);
    console.log("get data", data1, data2, prices1, prices2);
    settingChartData(setChartData, prices1, coin1Data, coin2Data, prices2);
    setLoading(false);
  };

  return (
    <div>
      <Header />
      {loading || !coin1Data?.id || !coin2Data?.id ? (
        <Loader />
      ) : (
        <>
          <SelectCoin
            allCoins={allCoins}
            coin1={coin1}
            coin2={coin2}
            days={days}
            handleCoinChange={handleCoinChange}
            handleDaysChange={handleDaysChange}
          />
          <div className="grey-wrapper">
            <List coin={coin1Data} delay={0.1} />
          </div>
          <div className="grey-wrapper">
            <List coin={coin2Data} delay={0.2} />
          </div>
          <div className="grey-wrapper">
            <TogglePriceType
              
              handlePriceTypeChange={handlePriceTypeChange} // Pass the function here
              priceType={priceType}
            />
            <LineChart
              chartData={chartData}
              multiAxis={true}
              priceType={priceType}
            />
          </div>
          <CoinInfo name={coin1Data.name} desc={coin1Data.desc} />
          <CoinInfo name={coin2Data.name} desc={coin2Data.desc} />
        </>
      )}
      <Footer />
    </div>
  );
}

export default ComparePage;
