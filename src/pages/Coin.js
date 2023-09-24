// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import Header from "../components/common/Header";
// import Loader from "../components/common/Loader";
// import { coinObject } from "../functions/convertObject";
// import List from "../components/Dashboard/List";
// import CoinInfo from "../components/Coin/CoinInfo";
// import { getCoinData } from "../functions/getCoinData";
// import { getCoinPrices } from "../functions/getCoinPrices";
// import LineChart from "../components/Coin/LineChart/LineChart";
// import SelectDays from "../components/Coin/SelectDays";
// import { settingChartData } from "../functions/settingChartData";
// import TogglePriceType from "../components/Coin/TogglePriceType";

// function CoinPage() {
//   const { id } = useParams();
//   const [loading, setLoading] = useState(true);
//   const [coinData, setCoinData] = useState();
//   const [days, setDays] = useState(30);
//   const [chartData, setChartData] = useState({});
//   const [priceType, setPriceType] = useState("prices");

//   useEffect(() => {
//     console.log(coinData);
//   }, [coinData]);

//   useEffect(() => {
//     if (id) {
//       getData();
//     }
//   }, [id]);

//   const handlePriceTypeChange = async (e, newType) => {
//     setLoading(true);
//     setPriceType(newType);
//     try {
//       const prices = await getCoinPrices(id, days, priceType);
//       if (prices && prices.length > 0) {
//         console.log("wohoo");
//         settingChartData(setChartData, prices);
//       }
//     } catch (error) {
//       console.error("Error fetching prices:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDaysChange = async (e) => {
//     setLoading(true);
//     setDays(e.target.value);
//     const prices = await getCoinPrices(id, e.target.value, priceType);
//     if (prices.length > 0) {
//       console.log("wohoo");
//       settingChartData(setChartData, prices);
//       setLoading(false);
//     }
//   };

//   async function getData() {
//     const data = await getCoinData(id);
//     if (data) {
//       coinObject(setCoinData, data);
//       const prices = await getCoinPrices(id, days, priceType);
//       console.log(prices);
//       if (prices.length > 0) {
//         settingChartData(setChartData, prices);
//         setLoading(false);
//       }
//     }
//   }
//   return (
//     <div>
//       <Header />
//       {loading ? (
//         <Loader />
//       ) : (
//         <>
//           <div className="grey-wrapper">
//             <List coin={coinData} />
//           </div>
//           <div className="grey-wrapper">
//             <SelectDays days={days} handleDaysChange={handleDaysChange} />
//             <TogglePriceType
//               priceType={priceType}
//               handlePriceTypeChange={handlePriceTypeChange}
//             />

//             <LineChart chartData={chartData} priceType={priceType} />
//           </div>
//           <CoinInfo heading={coinData.name} desc={coinData.desc} />
//         </>
//       )}
//     </div>
//   );
// }

// export default CoinPage;


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CoinInfo from "../components/Coin/CoinInfo";
import LineChart from "../components/Coin/LineChart/LineChart";
import TogglePriceType from "../components/Coin/TogglePriceType";
import SelectDays from "../components/Coin/SelectDays";
// import Footer from "../components/Common/Footer/footer";
import Header from "../components/common/Header";import Loader from "../components/common/Loader";
import List from "../components/Dashboard/List";
import { coinObject } from "../functions/convertObject";
import { getCoinData } from "../functions/getCoinData";
import { getCoinPrices } from "../functions/getCoinPrices";
import { settingChartData } from "../functions/settingChartData";
import Footer from "../components/common/Footer";

function CoinPage() {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const [loading, setLoading] = useState(false);
  const [days, setDays] = useState(120);
  const [priceType, setPriceType] = useState("prices");
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    getData();
  }, [id]);

  const getData = async () => {
    setLoading(true);
    const data = await getCoinData(id);
    if (data) {
      coinObject(setCoin, data); //For Coin Obj being passed in the List
      const prices = await getCoinPrices(id, days, priceType);
      if (prices) {
        console.log(prices.length)
        settingChartData(setChartData, prices, data);
        setLoading(false);
      }
    }
  };

  const handleDaysChange = async (event) => {
    setLoading(true);
    setDays(event.target.value);
    const prices = await getCoinPrices(id, event.target.value, priceType);
    if (prices) {
      settingChartData(setChartData, prices, coin);
      setLoading(false);
    }
  };

  const handlePriceTypeChange = async (event) => {
    setLoading(true);
    setPriceType(event.target.value);
    console.log("coin price type changed", priceType)
    const prices = await getCoinPrices(id, days, priceType);
    if (prices) {
      settingChartData(setChartData, prices, coin);
    }
    setLoading(false);
  };

  return (
    <div>
      <Header />
      {loading || !coin?.id || !chartData ? (
        <Loader />
      ) : (
        <>
          <div className="grey-wrapper">
            <List coin={coin} delay={0.1} />
          </div>
          <div className="grey-wrapper">
            <SelectDays days={days} handleDaysChange={handleDaysChange} />
            <TogglePriceType
           
              handlePriceTypeChange={handlePriceTypeChange}
              priceType={priceType}
            />
            <LineChart chartData={chartData} priceType={priceType} />
          </div>
          <CoinInfo name={coin.name} desc={coin.desc} />
        </>
      )}
      <Footer />
    </div>
  );
}

export default CoinPage;