import React, { useState, useMemo, useEffect } from 'react';

import PropTypes from 'prop-types';
import RecipiesContext from './RecipiesContext';

function ContextProvider({ children }) {
  const [email, setEmail] = useState('');
  const [pageTitle, setPageTitle] = useState('');
  const [switchSearch, setSwitchSearch] = useState(false);
  const [meals, setMeals] = useState([]);
  const [search, setsearch] = useState({});
  const [route, setRoute] = useState('meals');
  const [newUrl, setNewUrl] = useState('');
  const [redirect, setRedirect] = useState('');
  const [loading, setLoading] = useState(false);
  const [waitApi, setWaitApi] = useState(false);
  const [mealsEmpty, setMealsEmpty] = useState(false);
  const [meat, setMeat] = useState([]);
  const [drinke, setDrinke] = useState(false);
  const [meale, setMeale] = useState(false);
  const [drincat, setDrincat] = useState([]);
  const [drincatBool, setDrincatBool] = useState(false);
  const [mealcat, setMealcat] = useState([]);
  const [mealcatBool, setMealcatBool] = useState(false);

  const contextValue = useMemo(() => (
    { email,
      setEmail,
      pageTitle,
      setPageTitle,
      switchSearch,
      setSwitchSearch,
      meals,
      setMeals,
      search,
      setsearch,
      route,
      setRoute,
      newUrl,
      redirect,
      setRedirect,
      loading,
      setLoading,
      setMeat,
      meat,
      setDrinke,
      drinke,
      meale,
      setMeale,
      setDrincat,
      drincat,
      setMealcat,
      mealcat,
      drincatBool,
      setDrincatBool,
      mealcatBool,
      setMealcatBool,
    }), [email,
    pageTitle,
    switchSearch,
    meals,
    search,
    route,
    newUrl,
    redirect,
    loading,
    meat,
    drinke, meale, drincat, mealcat, drincatBool, mealcatBool]);

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

  return (
    <RecipiesContext.Provider value={ contextValue }>
      {children}
    </RecipiesContext.Provider>
  );
}

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContextProvider;
