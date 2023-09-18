import React, { useEffect, useState } from "react";
import Header from "../components/common/Header";
import TabsComponent from "../components/Dashboard/Tabs";
import axios from "axios";
import Search from "../components/Dashboard/Search";
import PaginationComponent from "../components/Dashboard/PaginationComponent";
import Loader from "../components/common/Loader";
import BackToTop from "../components/common/BackToTop";
function DashboardPage() {
  const [search, setSearch] = useState("");
  const [coins, setCoins] = useState([]);
  const [page, setPage] = useState(1);
  const [paginatedCoin, setPaginatedCoin] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const onSearchChange = (e) => {
    setSearch(e.target.value);
    console.log(filteredCoins);
  };

  const handlePageChange = (e, value) => {
    setPage(value);
    var previousIndex = (value - 1) * 10;
    setPaginatedCoin(coins.slice(previousIndex, previousIndex + 10));
  };

  var filteredCoins = coins.filter((item) => {
    return (
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.symbol.toLowerCase().includes(search.toLowerCase())
    );
  });

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en"
      )
      .then((response) => {
        setCoins(response.data);
        setPaginatedCoin(response.data.slice(0, 10));
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error>>>", error);
      });
  }, []);

  useEffect(() => {
    console.log(coins);
  }, [coins]);

  return (
    <>
      <Header />

      {isLoading ? (
        <>
        <Loader />
        <BackToTop/>
        </>
      ) : (
        <div>
          <Search search={search} onSearchChange={onSearchChange} />
          <TabsComponent coins={search ? filteredCoins : paginatedCoin} />
          {!search && (
            <PaginationComponent
              page={page}
              handlePageChange={handlePageChange}
            />
          )}
          <BackToTop/>
        </div>
      )}
    </>
  );
}

export default DashboardPage;
