import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipiesContext from '../context/RecipiesContext';

function SearchBar() {
  const history = useHistory();
  const {
    setsearch,
    meals,
    route,
    setRedirect,
    loading,
    setLoading,
    setIdRecipeDetails,
    setNewUrl,
    setWaitApi,
    waitApi,
    mealsEmpty,
    setMealsEmpty,
    search,
    newUrl,
    setMeals,
    setMeale,
    setDrinke,
  } = useContext(RecipiesContext);
  const [searchType, setsearchType] = useState();
  const [searchText, setsearchText] = useState('');

  useEffect(() => {
    if (search?.searchType) {
      let url = route === 'meals' ? 'https://www.themealdb.com/api/json/v1/1/' : 'https://www.thecocktaildb.com/api/json/v1/1/';
      if (search.searchType === 'Ingredient') url += 'filter.php?i=';
      if (search.searchType === 'Name') url += 'search.php?s=';
      if (search.searchType === 'First letter') url += 'search.php?f=';
      url += search.searchText;
      if (search.searchType === 'First letter'
      && search.searchText.length > 1) {
        return global.alert('Your search must have only 1 (one) character');
      }
      setNewUrl(url);
      setWaitApi(true);
    }
  }, [search]);

  useEffect(() => {
    if (mealsEmpty) {
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  }, [mealsEmpty]);
  useEffect(() => {
    const getApi = async (data) => {
      const ret = await fetch(data);
      const conteudo = await ret.json();
      setLoading(true);
      setMeals(conteudo);
      setMeale(false);
      setDrinke(false);
      if (conteudo[route] === null) {
        setMealsEmpty(true);
      }
    };
    if (waitApi) {
      getApi(newUrl);
    }
  }, [newUrl, waitApi]);

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
