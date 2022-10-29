import React from 'react';
import { screen } from '@testing-library/react';
import RenderWithProvider from './RenderWIthProvider';
import DoneRecipes from '../components/DoneRecipes';

describe('Testa o componente "DoneRecipes"', () => {
  beforeEach(() => {
    const EnviadoneRecipes = [
      {
        id: '52771',
        type: 'meal',
        nationality: 'Italian',
        category: 'Vegetarian',
        alcoholicOrNot: '',
        name: 'Spicy Arrabiata Penne',
        image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
        doneDate: '23/06/2020',
        tags: ['Pasta', 'Curry'],
      },
      {
        id: '178319',
        type: 'drink',
        nationality: '',
        category: 'Cocktail',
        alcoholicOrNot: 'Alcoholic',
        name: 'Aquamarine',
        image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
        doneDate: '23/06/2020',
        tags: [],
      },
    ];
    localStorage.setItem('doneRecipes', JSON.stringify(EnviadoneRecipes));
    RenderWithProvider(<DoneRecipes />);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('Testa se a página contém os botões necessários ', () => {
    expect(screen.getByTestId('filter-by-all-btn')).toBeInTheDocument();
    expect(screen.getByTestId('filter-by-meal-btn')).toBeInTheDocument();
    expect(screen.getByTestId('filter-by-drink-btn')).toBeInTheDocument();
  });

  it('Testa acionamento dos botões ', () => {
    const btns = screen.getAllByRole('button');
    btns.forEach((b) => b.click());
  });
});
