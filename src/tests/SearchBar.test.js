import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import Meals from '../components/Meals';

import renderWithProvider from './RenderWIthProvider';

describe('teste componente searchbar', () => {
  beforeEach(() => {
    act(() => {
      renderWithProvider(<Meals />);
    });
  });
  it('testa botão search', () => {
    const btnSearch = screen.getByTestId('search-top-btn');

    expect(btnSearch).toBeInTheDocument();

    // expect(btnSearch).toBe('');

    userEvent.click(btnSearch.parentNode);

    const input = screen.getByRole('textbox');
    const radioBtnIngredient = screen.getByTestId('ingredient-search-radio');

    userEvent.type(input, 'chicken');
    userEvent.click(radioBtnIngredient);
  });
});
