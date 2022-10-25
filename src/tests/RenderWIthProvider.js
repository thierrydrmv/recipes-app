import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import ContextProvider from '../context/ContextProvider';

export default function RenderWithProvider(children, route = '/') {
  const history = createMemoryHistory({ initialEntries: [route] });
  return {
    ...render(
      <Router history={ history }>
        <ContextProvider>
          { children }
        </ContextProvider>
      </Router>,
    ),
    history,
  };
}
