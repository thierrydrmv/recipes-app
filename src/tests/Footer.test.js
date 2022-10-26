import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Footer from '../components/Footer';
import Meals from '../components/Meals';
import renderWithProvider from './RenderWIthProvider';

describe('Testes para o componente Footer', () => {
  it('Testa se a imagem de drinks e meals aparece na tela', () => {
    renderWithProvider(<Footer />);
    const drinkIcon = screen.getByRole('img', { name: /drinks/i });
    const mealIcon = screen.getByRole('img', { name: /meals/i });
    expect(drinkIcon).toBeInTheDocument();
    expect(mealIcon).toBeInTheDocument();
  });
  it('Testa se há redirecionamento de pagina ao clicar no botão', () => {
    renderWithProvider(<Meals />, '/meals');
    const cocktailBtn = screen.getByTestId('drinks-bottom-btn');

    const mealsTitle = screen.getByRole('heading', { name: /meals/i });

    expect(mealsTitle).toBeInTheDocument();

    userEvent.click(cocktailBtn.parentNode);

    const drinksTitle = screen.getByTestId('page-title');

    expect(drinksTitle).toBeInTheDocument();
  });
});
