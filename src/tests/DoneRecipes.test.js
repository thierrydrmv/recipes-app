import React from 'react';
import { screen } from '@testing-library/react';
import RenderWithProvider from './RenderWIthProvider';
import DoneRecipes from '../components/DoneRecipes';

describe('Testa o componente "DoneRecipes"', () => {
  beforeEach(() => {
    global.navigator.clipboard = { writeText: jest.fn() };
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
    global.localStorage.setItem('doneRecipes', JSON.stringify(EnviadoneRecipes));
    RenderWithProvider(<DoneRecipes />);
  });

  it('Testa se a página contém os botões necessários ', () => {
    expect(screen.getByTestId('filter-by-all-btn')).toBeInTheDocument();
    expect(screen.getByTestId('filter-by-meal-btn')).toBeInTheDocument();
    expect(screen.getByTestId('filter-by-drink-btn')).toBeInTheDocument();
  });

  it('Testa acionamento dos botões ', () => {
    const btn1 = screen.getByTestId('filter-by-all-btn');
    const btn2 = screen.getByTestId('filter-by-meal-btn');
    const btn3 = screen.getByTestId('filter-by-drink-btn');
    const btn4 = screen.getByTestId('0-share-button');

    btn1.click();
    btn2.click();
    btn3.click();
    btn4.click();
  });
});
