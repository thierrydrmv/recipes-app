import React from 'react';
import PropTypes from 'prop-types';
import RecipiesContext from './RecipiesContext';

function ContextProvider({ children }) {
  return (
    <RecipiesContext.Provider value="">
      {children}
    </RecipiesContext.Provider>
  );
}

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContextProvider;
