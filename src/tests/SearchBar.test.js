import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithProvider from './RenderWIthProvider';
import Meals from '../components/Meals';
import Drinks from '../components/Drinks';

const oneDrink = require('../../cypress/mocks/oneDrink');
const oneMeal = require('../../cypress/mocks/oneMeal');

const SEARCH_TOP_BTN = 'search-top-btn';
const EXECT_SEARCH_BTN = 'exec-search-btn';
const INGREDIENT_SEARCH_RADIO = 'ingredient-search-radio';
const FIRST_LETTER_SEARCH_RADIO = 'first-letter-search-radio';
const NAME_SEARCH_RADIO = 'name-search-radio';

describe('teste componente searchbar', () => {
  it('testa botão search no componente Meals', async () => {
    global.fetch = jest.fn()
      .mockResolvedValue({
        json: jest.fn().mockResolvedValue(oneMeal),
      });
    const { history } = renderWithProvider(<Meals />, '/meals');
    const btnSearchBar = screen.getByTestId(SEARCH_TOP_BTN);

    expect(btnSearchBar).toBeInTheDocument();

    userEvent.click(btnSearchBar.parentNode);

    const btnSearch = screen.getByTestId(EXECT_SEARCH_BTN);

    const input = screen.getByRole('textbox');
    const radioBtnName = screen.getByTestId('name-search-radio');

    userEvent.type(input, 'Brown Stew Chicken');
    userEvent.click(radioBtnName);
    expect(radioBtnName).toBeChecked();
    userEvent.click(btnSearch);

    const { pathname } = history.location;

    expect(pathname).toBe('/meals');
  });
  it('testa botão search no componente Drinks', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(oneDrink),
    }));
    const { history } = renderWithProvider(<Drinks />, '/drinks');
    const btnSearchBar = screen.getByTestId(SEARCH_TOP_BTN);

    userEvent.click(btnSearchBar.parentNode);

    const btnSearch = screen.getByTestId(EXECT_SEARCH_BTN);

    const input = screen.getByRole('textbox');
    const radioBtnIngredient = screen.getByTestId(NAME_SEARCH_RADIO);

    userEvent.type(input, 'butter baby');
    userEvent.click(radioBtnIngredient);
    userEvent.click(btnSearch);
    await waitFor(() => {
      const { pathname } = history.location;

      expect(pathname).toBe('/drinks/178319');
    });
  });
  it('testa botão search no componente Meals', async () => {
    global.fetch = jest.fn()
      .mockResolvedValue({
        json: jest.fn().mockResolvedValue(oneMeal),
      });
    const { history } = renderWithProvider(<Meals />, '/meals');
    const btnSearchBar = screen.getByTestId(SEARCH_TOP_BTN);

    userEvent.click(btnSearchBar.parentNode);

    const btnSearch = screen.getByTestId(EXECT_SEARCH_BTN);

    const input = screen.getByRole('textbox');
    const radioBtnIngredient = screen.getByTestId(NAME_SEARCH_RADIO);

    userEvent.type(input, 'butter baby');
    userEvent.click(radioBtnIngredient);
    userEvent.click(btnSearch);
    await waitFor(() => {
      const { pathname } = history.location;

      expect(pathname).toBe('/meals/52771');
    });
  });
  it('testa o alert', async () => {
    global.fetch = jest.fn()
      .mockResolvedValue({
        json: jest.fn().mockResolvedValue(oneMeal),
      });
    renderWithProvider(<Meals />, '/meals');
    const btnSearchBar = screen.getByTestId(SEARCH_TOP_BTN);

    userEvent.click(btnSearchBar.parentNode);

    const btnSearch = screen.getByTestId(EXECT_SEARCH_BTN);

    const input = screen.getByRole('textbox');
    const radioBtnIngredient = screen.getByTestId(INGREDIENT_SEARCH_RADIO);
    const radioBtnFirstLetter = screen.getByTestId(FIRST_LETTER_SEARCH_RADIO);

    userEvent.type(input, 'aa');
    userEvent.click(radioBtnIngredient);
    userEvent.click(btnSearch);
    userEvent.click(radioBtnFirstLetter);
    userEvent.click(btnSearch);
  });
});
