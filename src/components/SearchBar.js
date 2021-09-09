import React from "react";

const SearchBar = ({
  filterStocks,
  filterAlphabetically,
  filterPrice,
  checkBoxs,
}) => {
  return (
    <div>
      <strong>Sort by:</strong>
      <label>
        <input
          type="radio"
          value="Alphabetically"
          checked={checkBoxs.alph}
          onChange={() => filterAlphabetically()}
        />
        Alphabetically
      </label>
      <label>
        <input
          type="radio"
          value="Price"
          checked={null}
          onChange={() => filterPrice()}
        />
        Price
      </label>
      <br />

      <label>
        <strong>Filter:</strong>
        <select onChange={(event) => filterStocks(event.target.value)}>
          <option value="Tech">Tech</option>
          <option value="Sportswear">Sportswear</option>
          <option value="Finance">Finance</option>
        </select>
      </label>
    </div>
  );
};

export default SearchBar;
