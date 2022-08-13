import React, { useEffect, useState } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [sortBy, setSortBy] = useState("Alphabetically")
  const [filterBy, setFilterBy] = useState("Tech")

  useEffect(() => {
    fetch("http://localhost:3001/stocks")
      .then((r) => r.json())
      .then(setStocks);
  }, []);

  function handleAddStock(stockToAdd) {
    const stockInPortfolio = portfolio.find(
      (stock) => stock.id === stockToAdd.id
    )
    if (!stockInPortfolio) {
      setPortfolio([...portfolio, stockToAdd])
    }
  }

  function handleRemoveStock(stockToRemove) {
    setPortfolio((portfolio) => portfolio.filter((stock) => stock.id !== stockToRemove.id))
  }

  const sortedStocks = [...stocks].sort((stockOne, stockTwo) => {
    if (sortBy === "Alphabetically") {
      return stockOne.name.localeCompare(stockTwo.name)
    } else {
      return stockOne.price - stockTwo.price
    }
  })

  const filteredStocks = sortedStocks.filter(
    (stock) => stock.type === filterBy
  );

  return (
    <div>
      <SearchBar 
        sortBy={sortBy}
        onChangeSort={setSortBy}
        filterBy={filterBy}
        onChangeFilter={setFilterBy}
      />
      <div className="row">
        <div className="col-8">
          <StockContainer 
            stocks={filteredStocks} 
            onAddStock={handleAddStock} 
          />
        </div>
        <div className="col-4">
          <PortfolioContainer 
            stocks={portfolio} 
            onRemoveStock={handleRemoveStock}
          />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
