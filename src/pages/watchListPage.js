import React, { useEffect, useState } from "react";
import Button from "../components/common/Button/index";
import Header from "../components/common/Header";
import Loader from "../components/common/Loader";
import TabsComponent from "../components/Dashboard/Tabs";
import { get100Coin } from "../functions/get100Coin";
import Footer from "../components/common/Footer";

function WatchlistPage() {
  const coins = JSON.parse(localStorage.getItem("watchlist"));
  const [myWatchlist, setMyWatchlist] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    const allCoins = await get100Coin();
    if (coins) {
      setMyWatchlist(allCoins.filter((item) => coins.includes(item.id)));
    }
    setLoading(false);
  };

  return (
    <div>
      {loading && !coins ? (
        <Loader />
      ) : (
        <div style={{ minHeight: "90vh" }}>
          {myWatchlist?.length == 0 || !coins ? (
            <div>
              <Header />
              <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
                No Items in the Watchlist
              </h1>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <a href="/dashboard">
                  <Button
                    text={"Dashboard"}
                    onClick={() => console.log("Login")}
                    outlined={true}
                  />
                </a>
              </div>
              <Footer />

            </div>
          ) : (
            <div style={{ height: "95vh" }}>
              <Header />
              <TabsComponent coins={myWatchlist} isWatchlistPage={true} />
              <Footer />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default WatchlistPage;
