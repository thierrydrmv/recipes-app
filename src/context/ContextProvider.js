import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import RecipiesContext from './RecipiesContext';

function ContextProvider({ children }) {
  const [email, setEmail] = useState('');
  const [pageTitle, setPageTitle] = useState('');

  const contextValue = useMemo(() => (
    { email, setEmail, pageTitle, setPageTitle }), [email, pageTitle]);

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
