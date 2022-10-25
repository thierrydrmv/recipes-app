import React, { useContext, useState } from 'react';
import RecipiesContext from '../context/RecipiesContext';

function SearchBar() {
  const {
    setsearch } = useContext(RecipiesContext);
  const [searchType, setsearchType] = useState();
  const [searchText, setsearchText] = useState('');

  return (
    <>
      <input
        type="text"
        placeholder="Search"
        data-testid="search-input"
        name="search"
        value={ searchText }
        onChange={ (event) => setsearchText(event.target.value) }
      />
      <label htmlFor="ingredient-search">
        <input
          name="searchType"
          data-testid="ingredient-search-radio"
          type="radio"
          value="Ingredient"
          onChange={ (event) => setsearchType(event.target.value) }
        />
        Ingredient

      </label>
      <label htmlFor="name-search">
        <input
          name="searchType"
          data-testid="name-search-radio"
          type="radio"
          value="Name"
          onChange={ (event) => setsearchType(event.target.value) }
        />
        Name
      </label>
      <label htmlFor="first-letter-search">
        <input
          name="searchType"
          data-testid="first-letter-search-radio"
          type="radio"
          value="First letter"
          onChange={ (event) => setsearchType(event.target.value) }
        />
        First letter
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => { setsearch({ searchType, searchText }); } }
      >
        Pesquisar
      </button>
    </>
  );
}
export default SearchBar;
