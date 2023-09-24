import React, { useEffect, useState } from "react";
import Header from "../components/common/Header";
import TabsComponent from "../components/Dashboard/Tabs";
import Search from "../components/Dashboard/Search";
import PaginationComponent from "../components/Dashboard/PaginationComponent";
import Loader from "../components/common/Loader";
import BackToTop from "../components/common/BackToTop";
import { get100Coin } from "../functions/get100Coin";
import Footer from "../components/common/Footer";
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
    getData();
    
  }, []);

  const getData = async () => {
      const myCoins=await get100Coin()
      if(myCoins){
        setCoins(myCoins);
        setPaginatedCoin(myCoins.slice(0,10));
        setLoading(false);
      }
      

  }

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
      <Footer/>
    </>
  );
}

export default DashboardPage;
