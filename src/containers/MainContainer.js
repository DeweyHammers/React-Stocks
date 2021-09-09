import React, { Component } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "../components/SearchBar";

class MainContainer extends Component {
  state = {
    stocks: [],
    filter: [],
    profile: [],
    checkBoxs: { alph: false, price: false },
  };

  componentDidMount() {
    fetch("http://localhost:3001/stocks")
      .then((resp) => resp.json())
      .then((json) => this.setState({ stocks: json }));
  }

  filterStocks = (search) => {
    const stocks = this.state.stocks.filter((stock) => stock.type === search);
    this.setState({ filter: stocks });
  };

  addStock = (stock) => {
    const check = this.state.profile.filter((s) => s.id === stock.id);
    console.log(check);
    if (check.length === 0) {
      this.setState({ profile: [...this.state.profile, stock] });
    } else {
      this.setState({
        profile: [...this.state.profile.filter((s) => s.id !== stock.id)],
      });
    }
  };

  filterAlphabetically = () => {
    const sorted = this.state.filter.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    this.setState({ filter: sorted });
    if (this.state.checkBoxs.alph === false) {
      this.setState({ checkBoxs: { ...this.state.checkBoxs, alph: true } });
    }
    console.log("clicked");
  };

  filterPrice = () => {
    const sorted = this.state.filter.sort((a, b) => a.price - b.price);
    this.setState({ filter: sorted });
  };

  render() {
    return (
      <div>
        <SearchBar
          filterStocks={this.filterStocks}
          filterAlphabetically={this.filterAlphabetically}
          filterPrice={this.filterPrice}
          checkBoxs={this.state.checkBoxs}
        />

        <div className="row">
          <div className="col-8">
            <StockContainer
              addStock={this.addStock}
              stocks={this.state.filter}
            />
          </div>
          <div className="col-4">
            <PortfolioContainer
              addStock={this.addStock}
              stocks={this.state.profile}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MainContainer;
