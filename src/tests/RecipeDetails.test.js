import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import RenderWithProvider from './RenderWIthProvider';
import RecipeDetails from '../components/RecipeDetails';

const oneDrink = require('../../cypress/mocks/oneDrink');
const oneMeal = require('../../cypress/mocks/oneMeal');

const LIST_DRINKS = '[lista - de - ingredientes - utilizados - drinks]';
const LIST_MEALS = '[lista - de - ingredientes - utilizados - meals]';

describe('testa a tela recipeDetails', () => {
  beforeEach(() => {
    global.localStorage.setItem('inProgressRecipes', JSON.stringify({
      drinks: {
        178319: LIST_DRINKS,
      },
      meals: {
        52771: LIST_MEALS,
      } }));
  });
  it('testa o componente oneFoodCard', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(oneMeal),
    }));
    await act(async () => {
      RenderWithProvider(<RecipeDetails />, '/meals/52771');
    });
    const btnFixedBottom = screen.getByRole('button', { name: /continue recipe/i });
    const favoriteBtn = screen.getByTestId('favorite-btn');
    const btnShare = screen.getByTestId('share-btn');
    expect(btnFixedBottom).toBeInTheDocument();
    expect(favoriteBtn).toHaveAttribute('src', 'whiteHeartIcon.svg');
    userEvent.click(favoriteBtn);
    expect(favoriteBtn).toHaveAttribute('src', 'blackHeartIcon.svg');
    userEvent.click(btnShare);
    userEvent.click(favoriteBtn);
  });
  it('testa o componente oneDrinkcard', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(oneDrink),
    }));
    const localStorage = JSON.parse(global.localStorage.getItem('inProgressRecipes'));
    expect(localStorage).toEqual({
      drinks: {
        178319: LIST_DRINKS,
      },
      meals: {
        52771: LIST_MEALS,
      } });
    await act(async () => {
      RenderWithProvider(<RecipeDetails />, '/drinks/178319');
    });
    const btnFixedBottom = screen.getByRole('button', { name: /continue recipe/i });
    const favoriteBtn = screen.getByTestId('favorite-btn');
    expect(btnFixedBottom).toBeInTheDocument();
    expect(favoriteBtn).toHaveAttribute('src', 'whiteHeartIcon.svg');
    userEvent.click(favoriteBtn);
    expect(favoriteBtn).toHaveAttribute('src', 'blackHeartIcon.svg');
    userEvent.click(btnFixedBottom);
  });
});
