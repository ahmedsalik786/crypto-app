// import React, { useEffect, useState } from "react";
// import MenuItem from "@material-ui/core/MenuItem";
// import Select from "@material-ui/core/Select";
// import { get100Coin } from "../../../functions/get100Coin";
// import "./style.css";

// function SelectCoin({ crypto1, crypto2, handleCoinChange }) {
//   const [allCoins, setAllcoins] = useState([]);

//   useEffect(() => {
//     getData();
//   }, []);

//   async function getData() {
//     const myCoins = await get100Coin();
//     setAllcoins(myCoins);
//   }
//   // useEffect(() => {
//   //   console.log("salik", allCoins);
//   // }, [allCoins]);

//   return (
//     <div className="coins-flex">
//       <p>Crypto 1</p>
//       <Select
//         value={crypto1}
//         label={crypto1}
//         onChange={(event) => handleCoinChange(event,false)}
//       >
//         {allCoins
//           .filter((item) => item.id !== crypto2)
//           .map((coin, i) => (
//             <MenuItem key={i} value={coin.id}>
//               {coin.name}
//             </MenuItem>
//           ))}
//       </Select>

//       <p>Crypto 2</p>
//       <Select
//         value={crypto2}
//         label={crypto2}
//         onChange={(event) => handleCoinChange(event, true)}
//       >
//         {allCoins
//           .filter((item) => item.id !== crypto1)
//           .map((coin, id) => (
//             <MenuItem key={id} value={coin.id}>
//               {coin.name}{" "}
//             </MenuItem>
//           ))}
//       </Select>
//     </div>
//   );
// }

// export default SelectCoin;



import React, { useEffect, useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { get100Coin } from "../../../functions/get100Coin";
import "./style.css";

function SelectCoin({ crypto1, crypto2, handleCoinChange }) {
  const [allCoins, setAllCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const myCoins = await get100Coin();
      setAllCoins(myCoins);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching coin data:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    console.log("allCoins", allCoins);
  }, [allCoins]);

  return (
    <div className="coins-flex">
      <p>Crypto 1</p>
      <Select
        value={crypto1}
        label={crypto1}
        onChange={(event) => handleCoinChange(event, false)}
      >
        {loading ? (
          <MenuItem value="">Loading...</MenuItem>
        ) : (
          allCoins
            .filter((item) => item.id !== crypto2)
            .map((coin, i) => (
              <MenuItem key={i} value={coin.id}>
                {coin.name}
              </MenuItem>
            ))
        )}
      </Select>

      <p>Crypto 2</p>
      <Select
        value={crypto2}
        label={crypto2}
        onChange={(event) => handleCoinChange(event, true)}
      >
        {loading ? (
          <MenuItem value="">Loading...</MenuItem>
        ) : (
          allCoins
            .filter((item) => item.id !== crypto1)
            .map((coin, id) => (
              <MenuItem key={id} value={coin.id}>
                {coin.name}
              </MenuItem>
            ))
        )}
      </Select>
    </div>
  );
}

export default SelectCoin;
