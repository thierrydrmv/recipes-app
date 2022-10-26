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
    }), [email,
    pageTitle,
    switchSearch,
    meals, search,
    route, newUrl, redirect, loading]);

  useEffect(() => {
    let url = route === 'meals' ? 'https://www.themealdb.com/api/json/v1/1/' : 'https://www.thecocktaildb.com/api/json/v1/1/';
    if (search.searchType === 'Ingredient') url += 'filter.php?i=';
    if (search.searchType === 'Name') url += 'search.php?s=';
    if (search.searchType === 'First letter') url += 'search.php?f=';
    url += search.searchText;
    if (search.searchType === 'First letter'
    && search.searchText.length > 1) {
      return global.alert('Your search must have only 1 (one) character');
    }
    if (search) {
      setNewUrl(url);
    }
  }, [search, route]);

  useEffect(() => {
    const getApi = async (data) => {
      const ret = await fetch(data);
      const conteudo = await ret.json();
      setLoading(true);
      setMeals(conteudo);
    };
    getApi(newUrl);
  }, [newUrl]);

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
