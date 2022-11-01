import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipiesContext from '../context/RecipiesContext';

function SearchBar() {
  const history = useHistory();
  const {
    setsearch,
    meals,
    route,
    setRedirect, loading, setLoading, setIdRecipeDetails } = useContext(RecipiesContext);
  const [searchType, setsearchType] = useState();
  const [searchText, setsearchText] = useState('');

  useEffect(() => {
    if (meals[route] && loading && meals[route].length === 1) {
      if (route === 'meals') {
        setIdRecipeDetails(`${meals.meals[0].idMeal}`);
        setRedirect(`/meals/${meals.meals[0].idMeal}`);
      } else {
        setIdRecipeDetails(`${meals.drinks[0].idDrink}`);
        setRedirect(`/drinks/${meals.drinks[0].idDrink}`);
      }
    }
    setLoading(false);
  }, [history, loading, meals, route, setLoading, setRedirect, setIdRecipeDetails]);

  const handleSearch = () => {
    setsearch({ searchType, searchText });
  };

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
          id="ingredient-search"
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
          id="name-search"
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
          id="first-letter-search"
          value="First letter"
          onChange={ (event) => setsearchType(event.target.value) }
        />
        First letter
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => { handleSearch(); } }
      >
        Pesquisar
      </button>
    </>
  );
}
export default SearchBar;
