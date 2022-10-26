import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Meals from '../components/Meals';

import renderWithProvider from './RenderWIthProvider';
import Drinks from '../components/Drinks';

describe('teste componente searchbar', () => {
  it('testa botão search no componente Meals', async () => {
    const { history } = renderWithProvider(<Meals />, '/meals');
    const btnSearchBar = screen.getByTestId('search-top-btn');

    expect(btnSearchBar).toBeInTheDocument();

    userEvent.click(btnSearchBar.parentNode);

    const btnSearch = screen.getByTestId('exec-search-btn');

    const input = screen.getByRole('textbox');
    const radioBtnName = screen.getByTestId('name-search-radio');

    userEvent.type(input, 'Brown Stew Chicken');
    userEvent.click(radioBtnName);
    expect(radioBtnName).toBeChecked();
    await userEvent.click(btnSearch);

    const { pathname } = history.location;

    expect(pathname).toBe('/meals');
  });
  it('testa botão search no componente Drinks', () => {
    const { history } = renderWithProvider(<Drinks />, '/drinks');
    const btnSearchBar = screen.getByTestId('search-top-btn');

    expect(btnSearchBar).toBeInTheDocument();

    userEvent.click(btnSearchBar.parentNode);

    const btnSearch = screen.getByTestId('exec-search-btn');

    const input = screen.getByRole('textbox');
    const radioBtnIngredient = screen.getByTestId('ingredient-search-radio');

    userEvent.type(input, 'caipirinha');
    userEvent.click(radioBtnIngredient);
    userEvent.click(btnSearch);

    const { pathname } = history.location;

    expect(pathname).toBe('/drinks');
  });
});
