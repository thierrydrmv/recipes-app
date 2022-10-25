import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipiesContext from './RecipiesContext';

function ContextProvider({ children }) {
  const [email, setEmail] = useState('');
  const [pageTitle, setPageTitle] = useState('');
  const [switchSearch, setSwitchSearch] = useState(false);
  const [meals, setMeals] = useState([]);
  const [search, setsearch] = useState({});

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
    }), [email, pageTitle, switchSearch, meals, search]);

  async function getApi(url) {
    const ret = await fetch(url);
    const conteudo = await ret.json();
    setMeals(conteudo);
  }

  useEffect(() => {
    console.log(search);
    console.log('chamou função');
    let url = 'https://www.themealdb.com/api/json/v1/1/';
    if (search.searchType === 'Ingredient') url += 'filter.php?i=';
    if (search.searchType === 'Name') url += 'search.php?s=';
    if (search.searchType === 'First letter') url += 'search.php?f=';
    url += search.searchText;
    getApi(url);
    if (search.searchType === 'First letter') url += 'search.php?f=';
  }, [search]);

  console.log(meals);

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
