import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithProvider from './RenderWIthProvider';
import SearchBar from '../components/SearchBar';

// const oneDrink = require('../../cypress/mocks/oneDrink');
const oneMeal = require('../../cypress/mocks/oneMeal');

// const SEARCH_TOP_BTN = 'search-top-btn';
// const EXECT_SEARCH_BTN = 'exec-search-btn';

describe('teste componente searchbar', () => {
  afterEach(() => jest.clearAllMocks());
  // it('testa botão search no componente Meals', async () => {
  //   const { history } = renderWithProvider(<Meals />, '/meals');
  //   const btnSearchBar = screen.getByTestId(SEARCH_TOP_BTN);

  //   expect(btnSearchBar).toBeInTheDocument();

  //   userEvent.click(btnSearchBar.parentNode);

  //   const btnSearch = screen.getByTestId(EXECT_SEARCH_BTN);

  //   const input = screen.getByRole('textbox');
  //   const radioBtnName = screen.getByTestId('name-search-radio');

  //   userEvent.type(input, 'Brown Stew Chicken');
  //   userEvent.click(radioBtnName);
  //   expect(radioBtnName).toBeChecked();
  //   userEvent.click(btnSearch);

  //   const { pathname } = history.location;

  //   expect(pathname).toBe('/meals');
  // });
  // it('testa botão search no componente Drinks', async () => {
  //   const { history } = renderWithProvider(<Drinks />, '/drinks');
  //   global.fetch = jest.fn(() => Promise.resolve({
  //     json: () => Promise.resolve(oneDrink),
  //   }));
  //   const btnSearchBar = screen.getByTestId(SEARCH_TOP_BTN);

  //   expect(btnSearchBar).toBeInTheDocument();

  //   userEvent.click(btnSearchBar.parentNode);

  //   const btnSearch = screen.getByTestId(EXECT_SEARCH_BTN);

  //   const input = screen.getByRole('textbox');
  //   const radioBtnIngredient = screen.getByTestId('ingredient-search-radio');

  //   userEvent.type(input, 'butter baby');
  //   userEvent.click(radioBtnIngredient);
  //   userEvent.click(btnSearch);
  //   await waitFor(() => {
  //     const { pathname } = history.location;

  //     expect(pathname).toBe('/drinks/178319');
  //   });
  // });
  // it('testa botão search no componente Meals', async () => {
  //   const { history } = renderWithProvider(<Meals />, '/meals');
  //   global.fetch = jest.fn(() => Promise.resolve({
  //     json: () => Promise.resolve(oneMeal),
  //   }));
  //   const btnSearchBar = screen.getByTestId(SEARCH_TOP_BTN);

  //   expect(btnSearchBar).toBeInTheDocument();

  //   userEvent.click(btnSearchBar.parentNode);

  //   const btnSearch = screen.getByTestId('exec-search-btn');

  //   const input = screen.getByRole('textbox');
  //   const radioBtnIngredient = screen.getByTestId('ingredient-search-radio');

  //   userEvent.type(input, 'butter baby');
  //   userEvent.click(radioBtnIngredient);
  //   userEvent.click(btnSearch);
  //   await waitFor(() => {
  //     const { pathname } = history.location;

  //     expect(pathname).toBe('/meals/52771');
  //   });
  // });
  // it('testa o radio button first letter', async () => {
  //   renderWithProvider(<Drinks />, '/drinks');

  //   const btnSearchBar = screen.getByTestId(SEARCH_TOP_BTN);

  //   userEvent.click(btnSearchBar);

  //   expect(btnSearchBar).toBeInTheDocument();

  //   const btnRadioFirst = screen.getByTestId('first-letter-search-radio');

  //   expect(btnRadioFirst).toBeInTheDocument();

  //   userEvent.click(btnRadioFirst);
  // });
  // it('Testa se há redirecionamento de pagina ao clicar no botão', async () => {
  //   renderWithProvider(<App />);
  //   const emailInp = screen.getByTestId('email-input');
  //   const passInp = screen.getByTestId('password-input');
  //   userEvent.type(emailInp, 'aloalo@hotmail.com');
  //   userEvent.type(passInp, 'ssadasdfghjkl');
  //   const button = screen.getByRole('button', { name: /enter/i });
  //   userEvent.click(button);
  //   const buttonDrinks = await screen.findByAltText(/drinks/i);
  //   userEvent.click(buttonDrinks);
  //   const title = await screen.findByText(/drinks/i);
  //   expect(title).toBeInTheDocument();
  //   await waitFor(() => {
  //     expect(window.location.pathname).toBe('/drinks');
  //   });
  //   const buttonMeals = await screen.findByAltText(/meals/i);
  //   userEvent.click(buttonMeals);
  //   const titleMeals = await screen.findByText(/meals/i);
  //   expect(titleMeals).toBeInTheDocument();
  //   await waitFor(() => {
  //     expect(window.location.pathname).toBe('/meals');
  //   });
  // });
  it('testa componente searchBar', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(oneMeal),
    }));
    const { history } = renderWithProvider(<SearchBar />, '/meals');
    const radioBtnIngredient = screen.getByTestId('ingredient-search-radio');
    const radioBtnName = screen.getByTestId('name-search-radio');
    const radioBtnFirstLetter = screen.getByTestId('first-letter-search-radio');
    const bntPesquisar = screen.getByTestId('exec-search-btn');
    const searchInput = screen.getByTestId('search-input');

    expect(radioBtnIngredient).toBeInTheDocument();
    expect(radioBtnFirstLetter).toBeInTheDocument();
    expect(radioBtnName).toBeInTheDocument();
    expect(bntPesquisar).toBeInTheDocument();
    userEvent.click(radioBtnIngredient);
    userEvent.click(radioBtnFirstLetter);
    userEvent.click(radioBtnName);
    userEvent.type(searchInput, 'Spicy Arrabiata Penne');

    await waitFor(() => {
      userEvent.click(bntPesquisar);
    });
    const { pathname } = history.location;
    expect(pathname).toBe('');
  });
});
