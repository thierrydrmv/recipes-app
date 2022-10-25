import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import ContextProvider from '../context/ContextProvider';

const RenderWithProvider = (children) => {
  const history = createMemoryHistory();
  return ({
    ...render(
      <Router history={ history }>
        <ContextProvider>
          { children }
        </ContextProvider>
      </Router>,
    ),
    history,
  });
};

export default RenderWithProvider;
