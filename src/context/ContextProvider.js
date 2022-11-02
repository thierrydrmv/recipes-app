import React, { useState, useMemo } from 'react';

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
  const [idRecipeDetails, setIdRecipeDetails] = useState();
  const [renderOneFood, setRenderOneFood] = useState([]);
  const [cocktailApi, setCocktailApi] = useState([]);
  const [mealApi, setMealApi] = useState([]);

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
      idRecipeDetails,
      setIdRecipeDetails,
      renderOneFood,
      setRenderOneFood,
      mealApi,
      setMealApi,
      cocktailApi,
      setCocktailApi,
      setNewUrl,
      waitApi,
      setWaitApi,
      mealsEmpty,
      setMealsEmpty,
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
    idRecipeDetails, renderOneFood, mealApi, cocktailApi,
    drinke, meale, drincat, mealcat, drincatBool, mealcatBool, waitApi, mealsEmpty]);

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
