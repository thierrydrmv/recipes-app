import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import RenderWithProvider from './RenderWIthProvider';
import FavoriteRecipes from '../components/FavoriteRecipes';

const data = [{
  id: '52771',
  type: 'meal',
  nationality: 'Italian',
  category: 'Vegetarian',
  alcoholicOrNot: '',
  name: 'Spicy Arrabiata Penne',
  image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
},
{
  id: '178319',
  type: 'drink',
  nationality: '',
  category: 'Cocktail',
  alcoholicOrNot: 'Alcoholic',
  name: 'Aquamarine',
  image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
},
];

describe('Testa o componente "FavoriteRecipes"', () => {
  beforeEach(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(data));
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('Testa se a página contém os elementos corretos.', async () => {
    RenderWithProvider(<FavoriteRecipes />);

    const pageTitle = screen.getByRole('heading', {
      name: /favorite recipes/i,
    });
    const allBtn = screen.getByRole('button', {
      name: /all/i,
    });
    const mealsBtn = screen.getByRole('button', {
      name: /meals/i,
    });

    const drinksBtn = screen.getByRole('button', {
      name: /drinks/i,
    });

    expect(pageTitle).toBeInTheDocument();
    expect(allBtn).toBeInTheDocument();
    expect(mealsBtn).toBeInTheDocument();
    expect(drinksBtn).toBeInTheDocument();
  });

  it('Testa se o botão "Meals" mostra apenas comidas.', () => {
    RenderWithProvider(<FavoriteRecipes />);

    const mealsBtn = screen.getByRole('button', {
      name: /meals/i,
    });

    userEvent.click(mealsBtn);

    const mealImg = screen.getByRole('img', {
      name: /spicy arrabiata penne/i,
    });

    const drinkImg = screen.queryByRole('img', {
      name: /aquamarine/i,
    });

    expect(mealImg).toBeInTheDocument();
    expect(drinkImg).toBe(null);
  });

  it('Testa se o botão "Drinks" mostra apenas bebidas.', () => {
    RenderWithProvider(<FavoriteRecipes />);

    const drinksBtn = screen.getByRole('button', {
      name: /drinks/i,
    });

    userEvent.click(drinksBtn);

    const mealImg = screen.queryByRole('img', {
      name: /spicy arrabiata penne/i,
    });

    const drinkImg = screen.queryByRole('img', {
      name: /aquamarine/i,
    });

    expect(mealImg).toBe(null);
    expect(drinkImg).toBeInTheDocument();
  });

  it('Testa se o botão "All" mostra todas as receitas favoritas.', async () => {
    RenderWithProvider(<FavoriteRecipes />);

    const drinksBtn = screen.getByRole('button', {
      name: /drinks/i,
    });
    const allBtn = screen.getByRole('button', {
      name: /all/i,
    });

    const drinkImg = screen.getByRole('img', {
      name: /aquamarine/i,
    });

    userEvent.click(drinksBtn);

    expect(drinkImg).toBeInTheDocument();

    userEvent.click(allBtn);

    const mealImg = screen.getByRole('img', {
      name: /spicy arrabiata penne/i,
    });

    await waitFor(() => {
      expect(mealImg).toBeInTheDocument();
    });

    expect(drinkImg).toBeInTheDocument();
  });

  it('Testa se o botão "Desfavoritar" exclui a receita.', () => {
    RenderWithProvider(<FavoriteRecipes />);

    const mealImg = screen.queryByRole('img', {
      name: /spicy arrabiata penne/i,
    });
    const drinkImg = screen.queryByRole('img', {
      name: /aquamarine/i,
    });
    const removeBtn = screen.getAllByAltText('Remove Favorite');

    expect(mealImg).toBeInTheDocument();
    expect(drinkImg).toBeInTheDocument();

    userEvent.click(removeBtn[1]);

    expect(drinkImg).not.toBeInTheDocument();
  });

  it('Testa se o botão "Compartilhar" funciona corretamente.', async () => {
    global.navigator.clipboard = { writeText: jest.fn() };
    RenderWithProvider(<FavoriteRecipes />);

    const shareBtn = screen.getAllByAltText(/share/i);
    const redirectButton = screen.getByTestId('profile-top-btn');
    await waitFor(() => {
      userEvent.click(shareBtn[0]);
    });

    expect(shareBtn[0]).toBeInTheDocument();

    const copied = await screen.findByTestId('link-copied');

    expect(global.navigator.clipboard.writeText).toBeCalledWith('http://localhost:3000/meals/52771');

    await waitFor(() => {
      expect(copied).toBeInTheDocument();
    });
    userEvent.click(redirectButton.parentNode);
  });
});
